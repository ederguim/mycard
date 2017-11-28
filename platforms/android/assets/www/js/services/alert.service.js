(function () {
    'use strict';

    angular
        .module('card')
        .service('AlertService', AlertService)

    AlertService.$inject = ['$ionicPopup'];

    function AlertService($ionicPopup) {
        this.getAlert = getAlert;
        this.getConfirm = getConfirm;

        function getAlert(title, template, classType, text) {
            var popup = $ionicPopup.alert({
                title: title,
                template: template,
                okText: text || 'OK',
                okType: classType || 'button-dark'
            });
            return popup;
        }

        function getConfirm(title, template, classType, text) {
            var popup = $ionicPopup.confirm({
                title: title,
                template: template,
                okText: text || 'OK',
                okType: classType || 'button-dark'
            });
            return popup;
        }
    }
})();