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

    window.setTimeout(function(){
        console.log('pygmalios tables script');

        renameTableHeaders();
        removeTableColumnTime();
    }, 5000);

})();