(function(){

    [].forEach.call(document.querySelectorAll('.dashboardmenu-item .sidemenu-item-text'), function(element) {
        var title = element.innerHTML;
        element.innerHTML = title.replace(/.*[.][ ]/, '');
    });

})();
