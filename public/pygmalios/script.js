define(['angular'], function(angular){
  
  (function(){

    var setTimeRange = function() {

      var timeRange = angular.element(document.body).injector().get('timeSrv').timeRange();
      var query = '?start_datetime=' + new Date(timeRange.from._d).toISOString() + '&end_datetime=' + new Date(timeRange.to._d).toISOString();
      console.log(query);

      [].forEach.call(document.querySelectorAll('iframe'), function(iframe) {
        var src = iframe.getAttribute('src').split('?')[0];
        iframe.setAttribute('src', src + query);
      });
    };

    angular.element(document).ready(function () {

      setTimeRange();
      var $rootScope = angular.element(document.querySelector('[ng-app],[data-ng-app]') || document).scope();

      $rootScope.onAppEvent('time-range-changed', function(e, time) {
        console.log('time-range-changed');
        setTimeRange();
      }, $rootScope);
    });

  })();
});
