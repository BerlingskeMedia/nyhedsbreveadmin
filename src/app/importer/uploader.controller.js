'use strict';

angular
  .module('nyhedsbreveprofiladmin')
  .controller('ImporterUploaderController', ImporterUploaderController);

function ImporterUploaderController($scope, $state, $sce, mdbApiService, toastr) {
  var vm = this;

  var headerMapping = {};

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
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }


  $scope.parseFileContent = function(){
    if($scope.importFile === undefined){
      return;
    }

    $scope.headers = [];
    $scope.rows = [];
    $scope.totalUsersCount = 0;
    $scope.allRowsParsed = false;
    $scope.allRowsValidated = false;
    var headerCalculated = false;

    Papa.parse($scope.importFile, {
    	worker: false,
      encoding: 'ISO-8859-1',
      header: true,
    	step: function(row) {

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
          // var csvHeaders = Object.keys(row.data);
          // headerMapping = calculateHeadersMapping(row.data);
          // console.log('headerMapping', headerMapping);
          // $scope.headers = headerMapping;
          headerCalculated = true;
        }
    	},
    	complete: function() {
    		console.log("All parsed!");
        $scope.allRowsParsed = true;
        $scope.$digest();
    	}
    });
  };

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

  function calculateHeadersMapping(rowData){
    var csvHeaders = Object.keys(rowData);

    var mappings = [
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

    $scope.headers = csvHeaders.map(function(header){
      var mapping = mappings.find(function(m){
        if (header.toLowerCase() === m.mdbName.toLowerCase()) {
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

    console.log('headerMapping', $scope.headers);
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
    $scope.validatedUsersIndex = 0;
    $scope.totalUsersCount = $scope.rows.length;
    $scope.totalUsersFound = 0;
    $scope.totalUsersToInsert = 0;
    $scope.percentValidated = 0;

    if($scope.totalUsersCount === 0){
      return;
    } else {
      validate();
    }

    function validate(){
      var rowData = $scope.rows[$scope.validatedUsersIndex].data;

      mdbApiService.userSearch({email: rowData[findMapped('email').csvName]}).then(function(users){

        if (users.length === 0){
          ++$scope.totalUsersToInsert;
          $scope.rows[$scope.validatedUsersIndex].notfound = true;
          setEmptyMdbData($scope.rows[$scope.validatedUsersIndex])
        } else if (users.length === 1){
          ++$scope.totalUsersFound;
          $scope.rows[$scope.validatedUsersIndex].found = true;
          mdbApiService.getUser(users[0].ekstern_id, '?optouts=1&permissions=1').then(setMdbData($scope.rows[$scope.validatedUsersIndex]));
        } else if (users.length > 1){
          $scope.rows[$scope.validatedUsersIndex].error = true;
          $scope.rows[$scope.validatedUsersIndex].errors.push({code: 'TooManyRecords', message: 'Too many records found', row: $scope.validatedUsersIndex});
        }

        if (++$scope.validatedUsersIndex !== $scope.totalUsersCount){
          validate();
        } else {
          console.log("All validated!");
          $scope.allRowsValidated = true;
        }

        $scope.percentValidated = Math.ceil($scope.validatedUsersIndex / ($scope.totalUsersCount / 100 ));
      });
    }
  };

  function setMdbData(row){
    return function(user){
      row.mdbdata = {
        user_id: user.user_id,
        ekstern_id: user.ekstern_id,
        nyhedsbreve: etPimping(user.nyhedsbreve),
        interesser: etPimping(user.interesser),
        permissions: etPimping(user.permissions),
        optouts: etPimping(user.optouts.map(function(o){return o.type_id;}))
      };
    };
  }

  function setEmptyMdbData(row){
    row.mdbdata = {
      user_id: '',
      ekstern_id: '',
      nyhedsbreve: '',
      interesser: '',
      permissions: '',
      optouts: ''
    };
  }

  function etPimping(input){
    if (input === undefined || !input instanceof Array){
      return null;
    }
    return '|'.concat(input.join('|'), '|');
  }

  $scope.importUsers = function(){
    $scope.allRowsImported = true;
    alert('Ikke implementeret');
  };

  $scope.downloadResult = function(){
    var resultContent = $scope.rows.map(function(row){
      if (row.error || row.errors.length > 1){
        return;
      }

      var data = {};
      if (row.data !== null && row.data !== undefined) {
        copyObject(row.data, data);
      }
      if (row.mdbdata !== null && row.mdbdata !== undefined) {
        copyObject(row.mdbdata, data);
      }
      return data;
    });

    function copyObject(fromObject, toObject){
      Object.keys(fromObject).forEach(function(key){
        toObject[key] = fromObject[key];
      });
    }

    var csvResult = Papa.unparse(resultContent, {delimiter:';'});
    var filename = $scope.importFile.name;
    filename = filename.substring(0, filename.indexOf('.')).concat('_importresult_', Date.now(), '.csv');
    download(filename, csvResult);
  };

  function handleFileSelect(evt) {
    $scope.rows = [];
    $scope.validatedUsersIndex = 0;
    $scope.totalUsersCount = 0;
    $scope.totalUsersFound = 0;
    $scope.totalUsersToInsert = 0;
    $scope.percentValidated = 0;
    $scope.importFile = evt.target.files[0]; // FileList object
    $scope.allRowsParsed = false;
    $scope.allRowsValidated = false;
    $scope.allRowsImported = false;
    $scope.$digest();
  }
  document.getElementById('importFile').addEventListener('change', handleFileSelect, false);

  mdbApiService.then(activate);

  function activate() {
    // TODO: Mark importer is ready

    $scope.interesser = [];
    $scope.nyhedsbreve = [];
    $scope.permissions = [];
    $scope.optouts = [];
    $scope.locations = [];

    mdbApiService.getInteresserFull().then(function(all) {
      all.forEach(function (interesse) {
        $scope.interesser.push({
          interesse_id: interesse.interesse_id,
          interesse_navn: interesse.interesse_navn
        });
        interesse.subinterests.forEach(function (subinterest) {
          subinterest.interesse_navn = interesse.interesse_navn + ' > ' + subinterest.interesse_navn;
          $scope.interesser.push({
            interesse_id: subinterest.interesse_id,
            interesse_navn: subinterest.interesse_navn
          });
        });
      });
    });

    mdbApiService.getNyhedsbreve().then(function(nyhedsbreve) {
      $scope.nyhedsbreve = nyhedsbreve;
    });

    mdbApiService.getPermissions().then(function(permissions) {
      $scope.permissions = permissions;
    });

    mdbApiService.getOptoutTypes().then(function(optouts) {
      $scope.optouts = optouts;
    });

    // mdbApiService.getLocations().then(function(locations) {
    //   $scope.locations = locations;
    // });
  }

  $scope.downloadCsvSampleFile = function() {
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

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
