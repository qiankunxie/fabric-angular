# fabric-angular
This is for triggering fabric.js in angular1 scope.

## Basic Idea
1. Create fabric service to get window.fabric
2. Wrap creation of canvas in directive by injecting fabric through fabric service.
3. Using link function to inject the canvas instance into your render service. Make sure create link function before angular rendering directive

[Live Example](https://qiankunxie.github.io/fabric-angular/example/) - Achieved by using angular framework, fabric.js and angular-fabric

## Installation
* Webpack

Include dependencies:
```
dependency: {
    "fabric": "1.7.x",
    "angular": "*",
    "fabric-angular": "*"
}
```

Use require() to load module into entry_point file:
```js
var angular = require("angular");
require("fabric");
require("fabric-angular");
```

Run webpack cli to generate bundle file:
`webpack ./your_entry_point.js bundle.js`

Include bundle.js into your index.html:
`<script type="text/javascript" src="bundle.js"></script>`

* Direct way

load farbic.js and angular.js library into your project.

npm install: `npm install fabric-angular --save` or copy fabric-angular.js file into your project lib.

Load fabric-angular.js into your project
```html
	 <script type="text/javascript" src="./lib/angular.min.js"></script>
	 <script type="text/javascript" src="./lib/fabric.min.js"></script>
	 <script type="text/javascript" src="./lib/fabric-angular.js"></script>
```
## Code Example
* angular.module:
```js
var myapp = angular.module('myapp', ['fabricAngular']);
```

* controller: 
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
* yourFabricRenderSrvc:
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
* template
```html
<fabric-canvas options="options"></fabric-canvas>
```

## Motivation
This npm module is for study purpose and will update to support webpack and brower later.

## License
MIT
