(function(){

    var renameTableHeaders = function() {
        [].forEach.call(document.querySelectorAll('.table-panel-table-header-inner'), function(th) {
            th.innerHTML = th.innerHTML.replace('zone_name', 'Zóna');
        });
    };

    var removeTableColumnTime = function() {
        [].forEach.call(document.querySelectorAll('.table-panel-table thead tr'), function(tr) {
            tr.removeChild(tr.childNodes[0]);
            tr.removeChild(tr.childNodes[1]);
        });

        [].forEach.call(document.querySelectorAll('.table-panel-table tbody tr'), function(tr) {
            tr.removeChild(tr.childNodes[0]);
        });
    };

    var removeTableFooter = function() {
        [].forEach.call(document.querySelectorAll('.table-panel-footer'), function(div) {
            div.remove();
        });
    };

    var removeTableControls = function() {
        [].forEach.call(document.querySelectorAll('.table-panel-table-header-controls'), function(span) {
            span.remove();
        });
    };

    angular.element(document).ready(function () {

        window.setTimeout(function(){
            console.log('pygmalios tables script');

            renameTableHeaders();
            removeTableColumnTime();
            removeTableFooter();
            removeTableControls();
        }, 5000);

        var $rootScope = angular.element(document.querySelector('[ng-app],[data-ng-app]') || document).scope();

        $rootScope.onAppEvent('time-range-changed', function(e, time) {
            console.log('time-range-changed');

            window.setTimeout(function(){
                renameTableHeaders();
                removeTableColumnTime();
                removeTableFooter();
                removeTableControls();
            }, 1000);
        }, $rootScope);
    });
})();