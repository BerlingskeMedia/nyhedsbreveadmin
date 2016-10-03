'use strict';

angular
  .module('nyhedsbreveprofiladmin')
  .controller('ImporterUploaderController', ImporterUploaderController);

function ImporterUploaderController($scope, $state, $sce, mdbApiService, toastr){
  var vm = this;

  // Fields in ExactTarget!!!!!!!!!!!!!!!!!
  // {"key": "Email Addresses.Email Address"},
  // {"key": "Email Demographics.Permissions"},
  // {"key": "Email Demographics.Newsletters"},
  // {"key": "Email Demographics.Interests"},
  // {"key": "Email Demographics.FirstName"},
  // {"key": "Email Demographics.LastName"},
  // {"key": "Email Demographics.Mailoptout"},
  // {"key": "Email Demographics.Robinson"},
  // {"key": "Email Demographics.Contacts ID"},
  // {"key": "Email Demographics.ExternalId"},
  // {"key": "Email Demographics.Birthyear"},
  // {"key": "Email Demographics.Sex"},
  // {"key": "Email Demographics.ZipCode"},
  // {"key": "Email Demographics.ZipCodeOther"}

  var headerMappings = [
    {
      mdbName: 'email',
      aliases: ['EmailAddress', 'Email Address', 'Email_Address'],
      etName: 'Email Address'
    },
    {
      mdbName: 'fornavn',
      aliases: ['FirstName', 'First Name', 'First_Name'],
      etName: 'FirstName'
    },
    {
      mdbName: 'efternavn',
      aliases: ['LastName', 'Last Name', 'Last_Name'],
      etName: 'LastName'
    },
    {
      mdbName: 'postnummer',
      aliases: ['ZipCode', 'Zip Code', 'Zip_Code', 'PostalCode', 'Postal Code', 'Postal_Code'],
      etName: 'ZipCode'
    },
    {
      mdbName: 'bynavn',
      aliases: ['City'],
      etName: null
    },
    {
      mdbName: 'land',
      aliases: ['Country'],
      etName: null
    },
    {
      mdbName: 'koen',
      aliases: ['Sex'],
      etName: 'Sex'
    },
    {
      mdbName: 'foedselsdato',
      aliases: ['Birthyear', 'Fødselsdato'],
      etName: 'Birthyear'
    }
  ];

  $scope.actions = [];

  $scope.addAction = function(){
    $scope.actions.push({
      operation: 'signup',
      type: 'nyhedsbrev',
      id: ''
    });
  };

  $scope.removeAction = function(index){
    $scope.actions.splice(index, 1);
  };

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob){
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  function resetFileScopeData(){
    $scope.headers = [];
    $scope.rows = [];

    $scope.allRowsParsed = false;
    $scope.totalUsersCount = 0;

    $scope.allRowsValidated = false;
    $scope.validatedUsersIndex = 0;
    $scope.totalUsersFound = 0;
    $scope.totalUsersErrors = 0;
    $scope.totalUsersToInsert = 0;
    $scope.percentValidated = 0;

    $scope.allRowsImported = false;
    $scope.importedUsersIndex = 0;
    $scope.totalUsersInserted = 0;
    $scope.totalUsersUpdated = 0;
    $scope.percentImported = 0;
  }


  $scope.parseFileContent = function(){
    if($scope.importFile === undefined){
      return;
    }

    resetFileScopeData();
    $scope.parsingFile = true;
    var headerCalculated = false;

    Papa.parse($scope.importFile, {
    	worker: false,
      encoding: 'UTF-8',
      // encoding: 'ISO-8859-1',
      // encoding: 'windows-1252',
      header: true,
    	step: function(row){

        if(row.errors.length > 0){
          console.error(row);
          return;
        } else if(row.data.length > 1){
          console.error('Row has too many data', row.data);
          return;
        }

        row.data = row.data[0];
        $scope.rows.push(row);
        ++$scope.totalUsersCount;

        if(!headerCalculated){
          calculateHeadersMapping(row.data);
          headerCalculated = true;
        }
    	},
    	complete: function(){
        console.log("All parsed!");
        $scope.allRowsParsed = true;
        $scope.parsingFile = false;
        $scope.totalUsersCount = $scope.rows.length;
        $scope.$digest();
    	}
    });
  };


  function calculateHeadersMapping(rowData){
    var csvHeaders = Object.keys(rowData);

    $scope.headers = csvHeaders.map(function(header){
      var mapping = headerMappings.find(function(m){
        if (header.toLowerCase() === m.mdbName.toLowerCase()){
          return true;
        } else {
          var temp = m.aliases.map(function(a){return a.toLowerCase();});
          return temp.indexOf(header.toLowerCase()) > -1;
        }
      });

      return {
        mapped: mapping !== undefined,
        mdbName: mapping !== undefined ? mapping.mdbName : null,
        etName: mapping !== undefined ? mapping.etName : null,
        csvName: header
      };
    });

    console.log('header mappings', $scope.headers);
  }

  function findMapped(key){
    return $scope.headers.find(function(header){
      return header.mdbName === key;
    });
  }


  $scope.flattenRowData = function(rowData){
    return Object.keys(rowData).map(function(index){ return rowData[index]; });
  };

  $scope.validateUsers = function(){
    $scope.validatingUsers = true;
    $scope.validatedUsersIndex = 0;
    $scope.totalUsersFound = 0;
    $scope.totalUsersErrors = 0;
    $scope.totalUsersToInsert = 0;
    $scope.percentValidated = 0;

    if($scope.totalUsersCount === 0){
      return;
    } else {
      validate();
    }

    function validate(){
      var row =$scope.rows[$scope.validatedUsersIndex],
          email = row.data[findMapped('email').csvName];

      if (email === ''){
        row.emailmissing = true;
        row.errors.push('Email missing');
        row.errors.push({code: 'EmailMissing', message: 'Email missing', row: $scope.validatedUsersIndex});
        setEmptyMdbData(row);
        console.error(row);
        rowValidationEnd();
        return;
      }

      mdbApiService.userSearch({email: email}).then(function(users){

        if (users.length === 0){
          ++$scope.totalUsersToInsert;
          row.notfound = true;
          setEmptyMdbData(row)
        } else if (users.length === 1){
          ++$scope.totalUsersFound;
          row.found = true;
          mdbApiService.getUser(users[0].ekstern_id, '?optouts=1&permissions=1').then(setMdbData(row));
        } else if (users.length > 1){
          row.error = true;
          row.errors.push({code: 'TooManyRecords', message: 'Too many records found', row: $scope.validatedUsersIndex});
          console.error(row);
          ++$scope.totalUsersErrors;
        }

        rowValidationEnd();
      }, function(error){
        row.error = true;
        row.errors.push(error);
        setEmptyMdbData(row);
        ++$scope.totalUsersErrors;
        rowValidationEnd();
      });
    }

    function rowValidationEnd(){
      if (++$scope.validatedUsersIndex !== $scope.totalUsersCount){
        validate();
      } else {
        console.log("All validated!");
        $scope.allRowsValidated = true;
        $scope.validatingUsers = false;
      }

      $scope.percentValidated = Math.ceil($scope.validatedUsersIndex / ($scope.totalUsersCount / 100 ));
    }
  };

  function setMdbData(row){
    return function(user){
      if (row.error || row.errors.length > 1 || user === undefined || user === null){
        setEmptyMdbData(row);
      } else {
        row.mdbdata = {
          user_id: user.user_id,
          ekstern_id: user.ekstern_id,
          nyhedsbreve: etPimping(user.nyhedsbreve),
          interesser: etPimping(user.interesser),
          permissions: etPimping(user.permissions),
          optouts: etPimping(user.optouts.map(function(o){return o.type_id;}))
        };
      }
    };
  }

  function setEmptyMdbData(row){
    row.mdbdata = {
      user_id: null,
      ekstern_id: null,
      nyhedsbreve: '',
      interesser: '',
      permissions: '',
      optouts: ''
    };
  }

  function etPimping(input){
    if (input === undefined || !input instanceof Array){
      return null;
    } else if (input.length === 0){
      return '';
    } else {
      return '|'.concat(input.join('|'), '|');
    }
  }

  $scope.importUsers = function(){
    $scope.importingUsers = true;
    // $scope.totalUsersToInsert = 0;
    $scope.importedUsersIndex = 0;
    $scope.totalUsersInserted = 0;
    $scope.percentImported = 0;

    if($scope.totalUsersCount === 0){
      return;
    } else {
      importUser();
    }

    $scope.allRowsImported = true;

    function importUser(){
      var row =$scope.rows[$scope.importedUsersIndex],
          ekstern_id = row.mdbdata.ekstern_id;

      if (ekstern_id === null){

      } else {

      }
    }

    function userImportedEnd(){
      if (++$scope.importedUsersIndex !== $scope.totalUsersCount){
        validate();
      } else {
        $scope.importingUsers = false;
      }
    }
  };

  $scope.downloadResult = function(){
    // var resultContent = $scope.rows.filter(rowsWithErrors).map(function(row){
    var resultContent = $scope.rows.map(function(row){
      var data = {};
      if (row.data !== null && row.data !== undefined){
        copyObject(row.data, data);
      }
      if (row.mdbdata !== null && row.mdbdata !== undefined){
        copyObject(row.mdbdata, data);
      }
      return data;
    });

    function rowsWithErrors(row){
      return !(row.error || row.errors.length > 1);
    }

    function copyObject(fromObject, toObject){
      Object.keys(fromObject).forEach(function(key){
        toObject[key] = fromObject[key];
      });
    }

    var csvResult = Papa.unparse(resultContent, {delimiter:';', encoding: 'UTF-8'});
    var filename = $scope.importFile.name;
    filename = filename.substring(0, filename.indexOf('.')).concat('_importresult_', Date.now(), '.csv');
    download(filename, csvResult);
  };

  function handleFileSelect(evt){
    resetFileScopeData();
    $scope.importFile = evt.target.files[0]; // FileList object
    // $scope.$digest();
  }
  document.getElementById('importFile').addEventListener('change', handleFileSelect, false);

  mdbApiService.then(activate);

  function activate(){
    // TODO: Mark importer is ready

    $scope.interesser = [];
    $scope.nyhedsbreve = [];
    $scope.permissions = [];
    $scope.optouts = [];
    $scope.locations = [];

    mdbApiService.getInteresserFull().then(function(all){
      all.forEach(function(interesse){
        $scope.interesser.push({
          interesse_id: interesse.interesse_id,
          interesse_navn: interesse.interesse_navn
        });
        interesse.subinterests.forEach(function(subinterest){
          subinterest.interesse_navn = interesse.interesse_navn + ' > ' + subinterest.interesse_navn;
          $scope.interesser.push({
            interesse_id: subinterest.interesse_id,
            interesse_navn: subinterest.interesse_navn
          });
        });
      });
    });

    mdbApiService.getNyhedsbreve().then(function(nyhedsbreve){
      $scope.nyhedsbreve = nyhedsbreve;
    });

    mdbApiService.getPermissions().then(function(permissions){
      $scope.permissions = permissions;
    });

    mdbApiService.getOptoutTypes().then(function(optouts){
      $scope.optouts = optouts;
    });

    // mdbApiService.getLocations().then(function(locations){
    //   $scope.locations = locations;
    // });
  }

  $scope.downloadCsvSampleFile = function(){
    // email;fornavn;efternavn;co_navn;vejnavn;husnummer;husbogstav;etage;sidedoer;stednavn;bynavn;postnummer;postnummer_dk;land;firma;firma_adresse;lande_kode;udland_flag;alder;foedselsaar;foedselsdato;koen;telefon;mobil;komvej_kode;status_kode;bbs_abo_nr;mol_bbs_nr;robinson_flag
    var csvSample = Papa.unparse([[
      'email',
      'fornavn',
      'efternavn',
      'postnummer',
      'bynavn',
      'land',
      'koen',
      'foedselsdato']], {delimiter:';'});

      download('sample.csv', csvSample);
  };

  function download(filename, text){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
