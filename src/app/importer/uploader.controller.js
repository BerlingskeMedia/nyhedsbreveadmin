'use strict';

angular
  .module('nyhedsbreveprofiladmin')
  .controller('ImporterUploaderController', ImporterUploaderController);

function ImporterUploaderController($scope, $state, $sce, mdbApiService, toastr) {
  var vm = this;


  $scope.actions = [];
  $scope.validatedUsersIndex = 0;
  $scope.totalUsersCount = 0;
  $scope.totalUsersFound = 0;
  $scope.totalUsersToInsert = 0;

  $scope.addAction = function(){
    $scope.actions.push({
      operation: 'signup',
      type: 'nyhedsbrev',
      id: ''
    });
  }

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
    $scope.fileHasHeader = true;
    $scope.allRowsValidated = false;
    var headerCalculated = false;

    Papa.parse($scope.importFile, {
    	worker: false,
      encoding: 'ISO-8859-1',
      header: $scope.fileHasHeader,
    	step: function(row) {
    		// console.log("Row:", row.data[0]);

        if(row.errors.length > 0){
          console.error(row);
          return;
        } else if(row.data.length > 1){
          console.error('Row has too many data', row.data);
          return;
        }

        if($scope.fileHasHeader && !headerCalculated){
          $scope.headers = Object.keys(row.data[0]);
          $scope.emailHeaderIndex = $scope.headers.indexOf('email');
          headerCalculated = true;
        }

        // var temp = [];
        // if($scope.fileHasHeader){
        //   temp = Object.keys(row.data[0]).map(function(index){ return row.data[0][index]; });
        //   // $scope.rows.push(temp);
        // } else {
        //   // $scope.rows.push(row.data[0]);
        //   temp = row.data[0];
        // }
        // row.data = temp;

        $scope.rows.push(row);
    	},
    	complete: function() {
    		console.log("All done!");
        $scope.$digest();
        $scope.validateUsers();
    	}
    });
  }

  $scope.flattenRowData = function(rowData){
    return Object.keys(rowData[0]).map(function(index){ return rowData[0][index]; });
  }

  $scope.validateUsers = function(){
    $scope.validatedUsersIndex = 0;
    $scope.totalUsersCount = $scope.rows.length;

    if($scope.totalUsersCount === 0){
      return;
    } else {
      validate();
    }

    function validate(){
      var user = $scope.rows[$scope.validatedUsersIndex].data;
      mdbApiService.userSearch({email: user[$scope.emailHeaderIndex]}).then(function(users){

        if (users.length === 0){
          ++$scope.totalUsersToInsert;
          $scope.rows[$scope.validatedUsersIndex].notfound = true;
        } else if (users.length === 1){
          ++$scope.totalUsersFound;
          $scope.rows[$scope.validatedUsersIndex].found = true;
        } else if (users.length > 1){
          $scope.rows[$scope.validatedUsersIndex].manyfound = true;
          $scope.rows[$scope.validatedUsersIndex].errors.push({code: 'TooManyRecords', message: 'Too many records found', row: $scope.validatedUsersIndex});
        }

        if (++$scope.validatedUsersIndex !== $scope.totalUsersCount){
          validate();
        } else {
          $scope.allRowsValidated = true;
        }
      });
    }
  };

  function handleFileSelect(evt) {
    $scope.importFile = evt.target.files[0]; // FileList object
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

    mdbApiService.getLocations().then(function(locations) {
      $scope.locations = locations;
    });
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
