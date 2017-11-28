(function () {
  'use strict';
  angular.module('card', ['ionic', 'ngCordova', 'LocalStorageModule', 'ui.utils.masks']);
})();

(function () {
  'use strict';

  angular
    .module('card')
    .run(run)

  run.$inject = ['$ionicPlatform'];

  function run($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }

}());

(function () {
  'use strict';

  angular
    .module('card')
    .config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider, $cordovaCalendar) {

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuController as vm'
      })

      .state('app.cartao', {
        url: '/cartao/:idCartao',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/cartao.html',
            controller: 'CartaoController as vm'
          }
        }
      })
      .state('app.despesa', {
        url: '/despesa/:idCartao',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/despesa.html',
            controller: 'DespesaController as vm'
          }
        }
      })
      .state('app.list', {
        url: '/list',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/list.html',
            controller: 'ListController as vm'
          }
        }
      })
      .state('app.cadastro', {
        url: '/cadastro',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/cadastro.html',
            controller: 'CadastroController as vm'
          }
        }
      });
    $urlRouterProvider.otherwise('/app/list');
  }

}());
