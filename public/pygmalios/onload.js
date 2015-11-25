(function(){

    var updateSideDashboardMenu = function(){
        [].forEach.call(document.querySelectorAll('.dashboardmenu-item .sidemenu-item-text'), function(element) {
            var title = element.innerHTML;
            element.innerHTML = title.replace(/.*[.][ ]/, '');
        });
    };

    window.setTimeout(function(){
        console.log('pygmalios onload script');

        updateSideDashboardMenu();
    }, 5000);
})();
