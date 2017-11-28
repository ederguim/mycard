(function () {
    'use strict';

    angular
        .module('card')
        .service('ServiceLocal', ServiceLocal)

    ServiceLocal.$inject = ['localStorageService'];

    function ServiceLocal(localStorageService) {
        
        var vm = this;
        vm.set = set;
        vm.get = get;
        vm.remove = remove;
        vm.removeAll = removeAll;

        function set(key, value) {
            return localStorageService.set(key, value);
        }

        function get(key) {
            return localStorageService.get(key);
        }

        function remove(key) {
            return localStorageService.remove(key);
        }

        function removeAll(key) {
            return localStorageService.clearAll(key);
        }
    }
})();