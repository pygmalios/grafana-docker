(function(){

    var parseQuery = function (querystring) {
        querystring = querystring.indexOf('?') < 0 ? '?' + querystring : querystring;
        querystring = querystring.substring(querystring.indexOf('?')+1);

        if (querystring.length == 0) {
            return {};
        }

        querystring = querystring.split('&');
        var params = {}, pair, d = decodeURIComponent;

        for (var i = querystring.length - 1; i >= 0; i--) {
            pair = querystring[i].split('=');
            params[d(pair[0])] = d(pair[1]);
        }

        return params;
    };

    var buildQuery = function(params) {
        var query = '?';
        var keys = Object.keys(params);

        for (var i=0; i<keys.length; i++) {
            query += keys[i] + '=' + params[keys[i]];
            if (i<keys.length - 1) {
                query += '&';
            }
        }

        return query;
    };

    var setQueryParams = function() {

        var context = angular.element(document.body).injector().get('contextSrv');
        var operation_id = window.pygmalios.getOperation(context.user.orgId);
        var timeRange = angular.element(document.body).injector().get('timeSrv').timeRange();

        [].forEach.call(document.querySelectorAll('iframe'), function(iframe) {
            var src = iframe.getAttribute('src').split('?')[0];

            var params = parseQuery(iframe.getAttribute('src'));
            params.operation_id = operation_id;
            params.start_datetime = new Date(timeRange.from._d).toISOString();
            params.end_datetime = new Date(timeRange.to._d).toISOString();
            var query = buildQuery(params);

            console.log(params);
            console.log(query);

            iframe.setAttribute('src', src + query);
        });
    };

    angular.element(document).ready(function () {

        setQueryParams();
        var $rootScope = angular.element(document.querySelector('[ng-app],[data-ng-app]') || document).scope();

        $rootScope.onAppEvent('time-range-changed', function(e, time) {
            console.log('time-range-changed');
            setQueryParams();
        }, $rootScope);
    });

})();
