/* fabric-angular.js / v1.0.1 / (c) 2017 Qiankun Xie/ MIT Licence */

'format amd';
/* global define */

(function () {
	'use strict';

	function requireFabric() {
		try {
			return require('fabric'); // Using webpack or browserify?
		} catch (e) {
			throw new Error('Please install fabric via npm.');
		}
	}

	function angularFabric(angular, fabric) {

		if(typeof fabric === 'undefined') {
			if(typeof require === 'function') {
				fabric = requireFabric();
			}else{
				throw new Error('Fabric cannot be found by fabric-angular!');
			}
		}

		angular.module('fabricAngular', [])

		.factory('fabric', ['$window', function($window) {
            if (!$window.fabric) {
                return {};
            }
        	return $window.fabric;
        }])

        .service('FabricLink', function () {
            var self = this;
            self.execute = angular.noop;

            this.setLink = function (link) {
                self.execute = link;
            };
        })

        .directive('fabricCanvas', ['fabric', 'FabricLink', '$window', '$rootScope', function (fabric, FabricLink, $window, $rootScope) {
            var canvasId = 'fabric-canvas-'+Math.floor((Math.random() * 1000));
            return {
                restrict: 'E',
    			template: '<canvas id="'+canvasId+'"></canvas>',
    			scope: {
                    options: '='
    			},
                link: function (scope, element, attrs) {

                    var canvasInstance,
                        options,
                        height,
                        width;

                    options = scope.options || {};

                    if (options.type && options.type === 'static') {
                        canvasInstance = new fabric.StaticCanvas(canvasId);
                    } else {
                        canvasInstance = new fabric.Canvas(canvasId);
                    }

                    function setSize () {
                        if (options.height && options.height === 'full') {
                            height = $window.innerHeight;
                        } else {
                            height = options.height || 300;
                        }

                        if (options.width && options.width === 'full') {
                            width = $window.innerWidth;
                        } else {
                            width = options.width || 300;
                        }
                    }
                    setSize();

                    angular.element($window).on('resize', function () {
                        setSize();
                        $rootScope.$broadcast('window-resize-fabric');
                    });

                    canvasInstance.setDimensions({width: width, height: height});
                    FabricLink.execute(canvasInstance);
                }
            };

        }]);

	}

	var isElectron = window && window.process && window.process.type;
	if (typeof define === 'function' && define.amd) {
		define(['angular', 'fabric'], angularFabric);
	} else if (typeof module !== 'undefined' && module && module.exports && (typeof require === 'function') && !isElectron) {
		module.exports = angularFabric(require('angular'), require('fabric'));
	} else {
		angularFabric(angular, (typeof global !== 'undefined' ? global : window).fabric);
	}
})();