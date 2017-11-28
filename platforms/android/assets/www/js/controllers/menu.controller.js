(function(){
    'use strict';

    angular
        .module('card')
        .controller('MenuController', MenuController)

    MenuController.$inject = ['MenuService'];

    function MenuController(MenuService) {
        
        var vm = this;
        vm.service = MenuService.getService();

        activate();

        function activate() { }
    }
})();