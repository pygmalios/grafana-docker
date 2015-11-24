define([
        '../core_module',
    ],
    function (coreModule) {
        "use strict";

        coreModule.controller('LoadDashboardCtrl', function($scope, $routeParams, dashboardLoaderSrv, backendSrv) {

            if (!$routeParams.slug) {

                angular.element(document.body).injector()
                    .get('backendSrv')
                    .search({ query: '', tag: [], starred: false })
                    .then(function(result) {
                        if (result[0]) {
                            dashboardLoaderSrv.loadDashboard(result[0].uri.split('/')[0], result[0].uri.split('/')[1])
                                .then(function(result) {
                                    $scope.initDashboard(result, $scope);
                                });
                        }
                        else {
                            backendSrv.get('/api/dashboards/home').then(function(result) {
                                var meta = result.meta;
                                meta.canSave = meta.canShare = meta.canStar = false;
                                $scope.initDashboard(result, $scope);
                            });
                        }
                    });

                return;
            }

            dashboardLoaderSrv.loadDashboard($routeParams.type, $routeParams.slug).then(function(result) {
                $scope.initDashboard(result, $scope);
            });

        });

        coreModule.controller('DashFromImportCtrl', function($scope, $location, alertSrv) {
            if (!window.grafanaImportDashboard) {
                alertSrv.set('Not found', 'Cannot reload page with unsaved imported dashboard', 'warning', 7000);
                $location.path('');
                return;
            }
            $scope.initDashboard({
                meta: { canShare: false, canStar: false },
                dashboard: window.grafanaImportDashboard
            }, $scope);
        });

        coreModule.controller('NewDashboardCtrl', function($scope) {
            $scope.initDashboard({
                meta: { canStar: false, canShare: false },
                dashboard: {
                    title: "New dashboard",
                    rows: [{ height: '250px', panels:[] }]
                },
            }, $scope);
        });

    });