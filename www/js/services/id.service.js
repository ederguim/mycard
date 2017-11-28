(function(){
    'use strict';

    angular
        .module('card')
        .service('NextVal', NextVal)

    NextVal.$inject = ['ServiceLocal'];

    function NextVal(ServiceLocal) {
        this.next = next;
        function next() {
            var ids = ServiceLocal.get('ids') || [];
            var quant = ids.length;
            var value = quant + 1
            ids.push(value);
            ServiceLocal.set('ids', ids);
            return value;
        }
    }
})();