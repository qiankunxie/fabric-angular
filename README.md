# fabric-angular
This is for triggering fabric.js in angular1 scope.

## Basic Idea
1. Create fabric service to get window.fabric
2. Wrap creation of canvas in directive by injecting fabric through fabric service.
3. Using link function to inject the canvas instance into your render service. Make sure create link function before angular rendering directive

[Live Example](https://qiankunxie.github.io/fabric-angular/example/) - Achieved by using angular framework, fabric.js and angular-fabric

## Installation
1. load farbic.js and angular.js library into your project.
2. npm: `npm install fabric-angular --save` or copy fabric-angular.js file into your project lib.
3. load fabric-angular.js into your project

## Code Example
1. index.html:
```html
	 	<script type="text/javascript" src="./lib/angular.min.js"></script>
	 	<script type="text/javascript" src="./lib/fabric.min.js"></script>
	 	<script type="text/javascript" src="./lib/fabric-angular.js"></script>
```

2. angular.module:
```js
var myapp = angular.module('myapp', ['fabricAngular']);
```

3. controller: 
```js
.controller('TestController', ['$scope', 'FabricLink','yourFabricRenderSrvc', function($scope, FabricLink, yourFabricRenderSrvc) {
  // set link function
  FabricLink.setLink(function (canvasInstance) {
    yourFabricRenderSrvc.init(canvasInstance);
  });
  // init options
  $scope.options = {
    height: 400,
    width: 400
  }
}]);
```
4. yourFabricRenderSrvc:
```js
.factory('FabricRender', ['fabric', function(fabric){
  var canvas;
  function render () {
    if (!canvas) {
      return;
    }
  // your render logic with provided canvas instance
  }
  function init (canvasInstance) {
    canvas = canvasInstance;
    render();
  }
  return {
    init: init
    // do some clean up by exporting destory function
  };
}])
```

## Motivation
This npm module is for study purpose and will update to support webpack and brower later.

## License
MIT
