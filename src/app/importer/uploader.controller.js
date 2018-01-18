'use strict';

angular
  .module('nyhedsbreveprofiladmin')
  .controller('ImporterUploaderController', ImporterUploaderController);

function ImporterUploaderController($scope, $state, $sce, mdbApiService, toastr){
  var vm = this;

  var globalRows = [];

  $scope.importFileEncoding = 'UTF-8';

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob){
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  document.getElementById('importFile').addEventListener('change', handleFileSelect, false);

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
      aliases: ['EmailAddress', 'Email Address', 'Email_Address', 'E-mail'],
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
    // {
    //   mdbName: 'land',
    //   aliases: ['Country'],
    //   etName: null
    // },
    {
      mdbName: 'mobil',
      aliases: ['Mobil'],
      etName: null
    },
    {
      mdbName: 'telefon',
      aliases: ['Telefon'],
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
    },
    {
      mdbName: 'user_id',
      aliases: [],
      etName: 'SubscriberKey'
    },
    {
      mdbName: 'ekstern_id',
      aliases: [],
      etName: 'ExternalId'
    },
    {
      mdbName: 'permissions',
      aliases: [],
      etName: 'Permissions'
    },
    {
      mdbName: 'nyhedsbreve',
      aliases: [],
      etName: 'Newsletters'
    },
    {
      mdbName: 'interesser',
      aliases: [],
      etName: 'Interests'
    },
    {
      mdbName: 'optouts',
      aliases: [],
      etName: 'Mailoptout'
    }
  ];

  $scope.actions = [];

  $scope.addAction = function(){
    $scope.actions.push({
      operation: 'signup',
      type: 'nyhedsbrev',
      id: ''
    });

    // This is set to that the import can be run again if more actions are added.
    $scope.allRowsImported = false;
  };

  $scope.removeAction = function(index){
    $scope.actions.splice(index, 1);
  };

  function locationTekstIsMissing(){
    var location_tekst = $scope.location_tekst;
    var location_missing = location_tekst === undefined || location_tekst === null && location_tekst.trim().length === 0;
    $scope.location_missing = location_missing;
    return location_missing;
  }

  $scope.location_change = function(){
    locationTekstIsMissing()
  };

  function handleFileSelect(evt){
    resetFileScopeData();
    $scope.importFile = evt.target.files[0]; // FileList object
    $scope.fileSelected = true;
    $scope.$apply();
    $scope.runParse(50);
  }

  function resetFileScopeData(){
    $scope.headers = [];


    $scope.allRowsParsed = false;
    $scope.totalRowCount = 0;

    $scope.allRowsValidated = false;
    $scope.validatedRowIndex = 0;
    $scope.totalUsersFound = 0;
    $scope.totalValidationErrors = 0;
    $scope.totalUsersToInsert = 0;
    $scope.percentValidated = 0;

    $scope.allRowsImported = false;
    $scope.importedUsersIndex = 0;
    $scope.totalUsersInserted = 0;
    $scope.totalUsersUpdated = 0;
    $scope.totalImportErrors = 0;
    $scope.totalUsersNoChanges = 0;
    $scope.percentImported = 0;
  }

  $scope.importFileEncoding_change = function(){
    if($scope.fileSelected){
      $scope.runParse(50);
    }
  }


  $scope.runParse = function(preview){
    if($scope.importFile === undefined){
      toastr.warning('Vælg fil');
      return;
    }

    if (preview === undefined || preview === null || typeof preview !== 'number' || preview < 0){
      preview = 0;
    } else {
      $scope.previewRows = [];
    }

    resetFileScopeData();
    $scope.parseRunning = true;
    $scope.validationRunning = false;  // Just to be sure that this has not been set to false any case of any exceptions.
    $scope.importRunning = false; // Just to be sure that this has not been set to false any case of any exceptions.

    var headerCalculated = false;

    Papa.parse($scope.importFile, {
      preview: preview,
    	worker: false,
      // delimiter: '',
      // delimiter: '\r\n',
      // encoding: 'UTF-8',
      // encoding: 'ISO-8859-1',
      // encoding: 'windows-1252',
      encoding: $scope.importFileEncoding,
      header: true,
      skipEmptyLines: true,
    	step: function(row, parser){

        if(row.errors.length > 0){
          console.error(row);
          return;
        } else if(row.data.length > 1){
          console.error('Row has too many data', row.data);
          return;
        } else if (allFieldsNullOrEmpty(row.data[0])){
          return;
        }

        row.data = cleanUpFields(row.data[0]);

        if (preview > 0){
          $scope.previewRows.push(row);

          if ($scope.previewRows.length === preview){
            $scope.parseRunning = false;
            $scope.$digest();
            toastr.success('Preview indlæst');
            console.log("Preview parsed!");
          }

        } else {

          globalRows.push(row);
          ++$scope.totalRowCount;

        }

        if(!headerCalculated){
          calculateHeadersMapping(row.data);
          headerCalculated = true;
        }
    	},
    	complete: function(){
        // In the case the file is shorter than the preview range and complete-handler is hit,
        // we'll copy the $scope.previewRows array (by value), so the validation can continue.
        if (preview > 0){
          globalRows = $scope.previewRows.slice();
          $scope.totalRowCount = globalRows.length;
        }

        $scope.allRowsParsed = true;
        $scope.$digest();

        // We're setting parseRunning to false after $digest, so that the validate-button
        //  does not look ready while the rows are being digested.
        $scope.parseRunning = false;

        // But we need to run another $digest so that the "Parse"-button is not disabled forever.
        $scope.$digest();
        toastr.success('Alle rækker indlæst');
        console.log("All parsed!");
    	}
    });

    function allFieldsNullOrEmpty(data){
      return Object.keys(data).every(function(k){
        return data[k] === null || data[k] === '';
      });
    }

    function cleanUpFields(data){
      var temp = {};
      Object.keys(data).forEach(function (k){
        var key = replaceNullAndEmpty(k);
        temp[key] = replaceNullAndEmpty(data[k]);
      });
      return temp;
    }

    function replaceNullAndEmpty(input){
      return input.replace(/\0/g, '').trim();
    }
  };


  function calculateHeadersMapping(rowData){
    var csvHeaders = Object.keys(rowData);

    $scope.headers = csvHeaders.map(function(org_header){
      var header = org_header.toLowerCase();
      var mapping = headerMappings.find(function(m){
        if (header === m.mdbName.toLowerCase()){
          return true;
        } else {
          var temp = m.aliases.map(function(a){return a.toLowerCase();});
          return temp.indexOf(header) > -1;
        }
      });

      return {
        mapped: mapping !== undefined,
        mdbName: mapping !== undefined ? mapping.mdbName : null,
        etName: mapping !== undefined ? mapping.etName : null,
        csvName: org_header
      };
    });

    console.log('header mappings', $scope.headers);
  }

  function findMappedHeaders(key){
    if (key === undefined){
      return $scope.headers.filter(function(header){
        return header.mapped === true;
      });
    } else {
      return $scope.headers.find(function(header){
        return header.mdbName === key;
      });
    }
  }


  $scope.flattenRowData = function(rowData){
    return Object.keys(rowData).map(function(index){ return rowData[index]; });
  };

  $scope.runValidation = function(){
    $scope.validatedRowIndex = 0;
    $scope.totalUsersFound = 0;
    $scope.totalValidationErrors = 0;
    $scope.totalUsersToInsert = 0;
    $scope.percentValidated = 0;

    var temp = findMappedHeaders('email');
    if (temp === undefined){
      toastr.error('Email ikke mappet');
      return;
    }

    var csvEmailHeaderName = temp.csvName;

    if(globalRows.length === 0){
      return;
    }

    $scope.validationRunning = true;
    $scope.importRunning = false; // Just to be sure that this has not been set to false any case of any exceptions.

    $scope.validationStarted = getFormattetTimetamp();

    validateRow();

    function validateRow(){
      var row = globalRows[$scope.validatedRowIndex];

      var email = row.data[csvEmailHeaderName];

      if (email === undefined || email === null || email === ''){
        row.error = true;
        row.errors.push({code: 'EmailMissing', message: 'Email missing', row: $scope.validatedRowIndex});
        setEmptyMdbData(row);
        console.error(row);
        writeToErrorLog('Email missing in row ' + ($scope.validatedRowIndex + 1));
        ++$scope.totalValidationErrors;
        rowValidationEnd();
        return;
      }

      mdbApiService.searchUser({email: email}).then(function(users){
        if (users.length === 0){
          ++$scope.totalUsersToInsert;
          setEmptyMdbData(row)
          rowValidationEnd();
        } else if (users.length === 1){
          ++$scope.totalUsersFound;
          mdbApiService.getUser(users[0].ekstern_id, '?optouts=1&permissions=1').then(function(user){
            // I know this is the same if-statement as in setMdbData(). Just to be safe.
            if (row.error || row.errors.length > 1 || user === undefined || user === null){
              setEmptyMdbData(row);
            } else {
              setMdbData(row, user)
            }

            rowValidationEnd();
          });
        } else if (users.length > 1){
          ++$scope.totalValidationErrors;
          row.error = true;
          row.errors.push({code: 'TooManyRecords', message: 'Too many records found', row: $scope.validatedRowIndex});
          console.error(row);
          writeToErrorLog('Too many records found for email ' + email);
          rowValidationEnd();
        }
      }, function(error){
        ++$scope.totalValidationErrors;
        row.error = true;
        row.errors.push(error);
        writeToErrorLog(error);
        setEmptyMdbData(row);
        rowValidationEnd();
      });
    }

    function rowValidationEnd(){
      if (++$scope.validatedRowIndex !== globalRows.length){
        validateRow();
      } else {
        toastr.success('Alle rækker valideret');
        console.log("All validated!");
        $scope.validationEnded = getFormattetTimetamp();
        $scope.allRowsValidated = true;
        $scope.validationRunning = false;
      }

      $scope.percentValidated = Math.ceil($scope.validatedRowIndex / (globalRows.length / 100 ));
    }
  };


  function setMdbData(row, user){
    if (row.error || user === undefined || user === null){
      setEmptyMdbData(row);
    } else {
      row.mdbuser = user;
      row.mdbdata = {
        user_id: user.user_id,
        ekstern_id: user.ekstern_id,
        nyhedsbreve: etPimping(user.nyhedsbreve),
        interesser: etPimping(user.interesser),
        permissions: etPimping(user.permissions),
        optouts: etPimping(user.optouts)
      };
    }
  }

  function setEmptyMdbData(row){
    row.mdbuser = {
      nyhedsbreve: [],
      interesser: [],
      permissions: [],
      optouts: []
    };
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
    if (input === undefined || input === null || !input instanceof Array){
      return null;
    } else if (input.length === 0){
      return '';
    } else if (typeof input[0] === 'object' && Object.keys(input[0]).some(function(k){return k === 'type_id';})) {
      // In case this is the optouts-array-of-object, which has the type_id key.
      return etPimping(input.map(function(o){return o.type_id;}));
    } else {
      return '|'.concat(input.join('|'), '|');
    }
  }

  $scope.runImport = function(){

    $scope.allRowsImported = false;
    $scope.importedUsersIndex = 0;
    $scope.totalUsersInserted = 0;
    $scope.totalUsersUpdated = 0;
    $scope.totalImportErrors = 0;
    $scope.totalUsersNoChanges = 0;
    $scope.percentImported = 0;

    var mappedHeaders = findMappedHeaders();
    console.log('mappedHeaders', mappedHeaders);
    console.log('actions', $scope.actions);

    var foundUsersMustBeUpdated = $scope.actions.length > 0 || mappedHeaders.some(otherThanEmail);
    console.log('foundUsersMustBeUpdated', foundUsersMustBeUpdated);

    var rowsToImport = globalRows.filter(function(row){
      return row.error !== true;
    });

    if(rowsToImport.length === 0){
      toastr.warning('Ingen rækker at importere');
      return;
    }

    $scope.importRunning = true;
    console.log('$scope.location_id', $scope.location_id);
    if ($scope.location_id === undefined || $scope.location_id === null){
      createLocation(importUser);
    } else {
      importUser();
    }

    $scope.importStarted = getFormattetTimetamp();

    function createLocation(callback){
      var location_tekst =$scope.location_tekst;
      console.log('location_tekst', location_tekst);
      if(locationTekstIsMissing()){
        toastr.warning('Lokation mangler');
        $scope.importRunning = false;
        return;
      }

      location_tekst = location_tekst.trim();
      mdbApiService.createLocation(location_tekst).then(function(response){
        $scope.location_created = true;
        $scope.location_error = null;
        $scope.location_id = response.location_id;
        callback();
      }, function (errorResponse){
        $scope.location_error = errorResponse.error !== undefined ? errorResponse.error : 'Fejl ved oprettelse';
        $scope.importRunning = false;
      });
    }

    function importUser(){


      var row = rowsToImport[$scope.importedUsersIndex],
          ekstern_id = row.mdbdata.ekstern_id,
          payload = createUserPayload(row);

      // // FOR TESTING
      // console.log('payload', payload);
      // userImportedEnd();
      // return;

      if (ekstern_id !== undefined && ekstern_id !== null && ekstern_id !== ''){
        payload.ekstern_id = ekstern_id;
        if (foundUsersMustBeUpdated){
          mdbApiService.updateUser(payload).then(updateUserSuccess, mdbError);
        } else {
          row.error = false;
          ++$scope.totalUsersNoChanges;
          userImportedEnd();
        }
      } else {
        mdbApiService.createUser(payload).then(createUserSuccess, mdbError);
      }


      function createUserSuccess(response){
        mdbApiService.getUser(response.ekstern_id).then(function(user) {
          row.error = false;
          setMdbData(row, user);
          ++$scope.totalUsersInserted;
          userImportedEnd();
        });
      }

      function updateUserSuccess(response){
        row.error = false;
        setMdbData(row, response);
        ++$scope.totalUsersUpdated;
        userImportedEnd();
      }

      function mdbError(response){
        console.error(response);
        row.error = true;
        row.errors.push(response.statusText);
        writeToErrorLog(response.statusText + ' when importing ' + payload.email);
        ++$scope.totalImportErrors;
        userImportedEnd();
      }
    }

    function otherThanEmail(header){
      return header.mdbName !== 'email';
    }

    function createUserPayload(row){
      var user = Object.assign({}, row.mdbuser);

      // mappedHeaders.forEach(function(h){
      //   user[h.mdbName] = row.data[h.csvName];
      // });

      for(var i = 0; i < mappedHeaders.length; i++){
        var h = mappedHeaders[i];
        user[h.mdbName] = row.data[h.csvName];
      }

      user.nyhedsbreve = user.nyhedsbreve.concat($scope.actions.filter(filterActions('signup', 'nyhedsbrev')).map(actionIdAsInt));
      user.permissions = user.permissions.concat($scope.actions.filter(filterActions('signup', 'permission')).map(actionIdAsInt));
      user.interesser = user.interesser.concat($scope.actions.filter(filterActions('signup', 'interesse')).map(actionIdAsInt));
      user.optouts = user.optouts.concat($scope.actions.filter(filterActions('signup', 'optout')).map(actionIdAsInt));

      user.nyhedsbreve = user.nyhedsbreve.filter(filterIds('signout', 'nyhedsbrev'));
      user.permissions = user.permissions.filter(filterIds('signout', 'permission'));
      user.interesser = user.interesser.filter(filterIds('signout', 'interesse'));
      user.optouts = user.optouts.filter(filterIds('signout', 'optout'));

      user.location_id = $scope.location_id;

      return user;

      function filterIds(operation, type){
        var temp = $scope.actions.filter(filterActions(operation, type)).map(actionIdAsInt);
        return function (id){
          return temp.indexOf(id) === -1;
        }
      }

      function filterActions(operation, type){
        return function(action){
          return action.operation === operation && action.type === type && action.id !== '';
        };
      }

      function actionIdAsInt(action){
        return parseInt(action.id);
      }
    }

    function userImportedEnd(){
      if (++$scope.importedUsersIndex !== rowsToImport.length){
        importUser();
      } else {
        toastr.success('Alle rækker importeret');
        console.log('All rows imported');
        $scope.importEnded = getFormattetTimetamp();
        $scope.importRunning = false;
        $scope.allRowsImported = true;
      }

      $scope.percentImported = Math.ceil($scope.importedUsersIndex / (rowsToImport.length / 100 ));
    }
  };


  $scope.downloadResult = function(){
    var resultContent = globalRows
    .filter(function(row){
      return row.error !== true;
    })
    .map(function(row){
      var data = {};
      if (row.data !== null && row.data !== undefined){
        copyObject(data, row.data);
      }
      if (row.mdbdata !== null && row.mdbdata !== undefined){
        copyObject(data, row.mdbdata);
      }
      return data;
    });

    var csvResult = Papa.unparse(resultContent, {delimiter:',', encoding: 'UTF-8'});
    var filename = $scope.importFile.name;
    filename = filename.substring(0, filename.indexOf('.')).concat('_importresult_', Date.now(), '.csv');
    download(filename, csvResult);

    function copyObject(toObject, fromObject){
      Object.keys(fromObject).forEach(function(key){
        var header = headerMappings.find(function(m){
          return m.mdbName === key;
        });

        if (header !== undefined && header.etName !== null && header.etName !== ''){
          toObject[header.etName] = fromObject[key];
        } else {
          toObject[key] = fromObject[key];
        }
      });
    }
  };


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

    mdbApiService.getNyhedsbreve('orderBy=nyhedsbrev_navn').then(function(nyhedsbreve){
      $scope.nyhedsbreve = nyhedsbreve;
    });

    mdbApiService.getPermissions('orderBy=nyhedsbrev_navn').then(function(permissions){
      $scope.permissions = permissions;
    });

    mdbApiService.getOptoutTypes('orderBy=type_desc').then(function(optouts){
      $scope.optouts = optouts;
    });
  }


  var errorLog = document.getElementById('errorLog');
  function writeToErrorLog(errorText){
    angular.element(errorLog).append('<div><em>' + getFormattetTimetamp() + '</em>: ' + errorText + '</div>');
  }


  $scope.downloadCsvSampleFile = function(){
    var csvSample = Papa.unparse([[
      'email',
      'fornavn',
      'efternavn',
      'postnummer',
      'bynavn',
      'koen']], {delimiter:';'});

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

  function getFormattetTimetamp(){
    var temp = new Date();
    return ''.concat(leadingZero(temp.getHours()), ':', leadingZero(temp.getMinutes()));

    function leadingZero(input){
      return ("0" + input).slice (-2);
    }
  }
}
