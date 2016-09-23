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

        if(!headerCalculated){
          var headers = Object.keys(row.data);
          console.log('headers', headers);
          $scope.headers = headers;
          headerMapping = calculateHeadersMapping(headers);
          console.log('headerMapping', headerMapping);
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

  function calculateHeadersMapping(headers){
    return {
      email: findMapping(['Email', 'Email Address', 'Email_Address']),
      fornavn: findMapping(['Fornavn', 'FirstName', 'First Name', 'First_Name']),
      efternavn: findMapping(['Efternavn', 'LastName', 'Last Name', 'Last_Name']),
      postnummer: findMapping(['Postnummer', 'ZipCode']),
      bynavn: findMapping(['Bynavn']),
      land: findMapping(['land']),
      koen: findMapping(['koen']),
      foedselsdato: findMapping(['Foedselsdato', 'Birthyear','Fødselsdato'])
    };

    function findMapping(aliases){
      var temp = aliases.map(function(i){return i.toLowerCase();});
      return headers.find(function(h){
        return temp.indexOf(h.toLowerCase()) > -1;
      });
    }
  }


  $scope.flattenRowData = function(rowData){
    return Object.keys(rowData).map(function(index){ return rowData[index]; });
  }

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

      mdbApiService.userSearch({email: rowData[headerMapping.email]}).then(function(users){

        if (users.length === 0){
          ++$scope.totalUsersToInsert;
          $scope.rows[$scope.validatedUsersIndex].notfound = true;
        } else if (users.length === 1){
          ++$scope.totalUsersFound;
          $scope.rows[$scope.validatedUsersIndex].found = true;
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

  $scope.importUsers = function(){
    alert('Ikke implementeret');
  };

  $scope.downloadResult = function(){

  };

  function handleFileSelect(evt) {
    $scope.rows = [];
    $scope.importFile = evt.target.files[0]; // FileList object
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

  $scope.getCsvSampleFile = function() {
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
    return $sce.trustAsHtml([
      '<a class="" href="data:application/octet-stream,'.concat(encodeURIComponent(csvSample), '">'),
        'Download eksempelfil',
      '</a>'].join(''));
  };
}
