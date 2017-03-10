/* fabric-angular.js / v1.0.1 / (c) 2017 Qiankun Xie/ MIT Licence */

'format amd';
/* global define */

(function () {
	'use strict';

	function isUndefinedOrNull(val) {
		return angular.isUndefined(val) || val === null;
	}

	function requireFabric() {
		try {
			return require('fabricjs'); // Using nw.js or browserify?
		} catch (e) {
			throw new Error('Please install fabric via npm.');
		}
	}

	function angularFabric(angular, fabric) {

		if(typeof fabric === 'undefined') {
			if(typeof require === 'function') {
				moment = requireFabric();
			}else{
				throw new Error('Fabric cannot be found by fabric-angular!');
			}
		}

		angular.module('fabricAngular', [])


	}

	var isElectron = window && window.process && window.process.type;
	if (typeof define === 'function' && define.amd) {
		define(['angular', 'fabric'], angularFabric);
	} else if (typeof module !== 'undefined' && module && module.exports && (typeof require === 'function') && !isElectron) {
		module.exports = angularFabric(require('angular'), require('moment'));
	} else {
		angularFabric(angular, (typeof global !== 'undefined' ? global : window).fabric);
	}
})();