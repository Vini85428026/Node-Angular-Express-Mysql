angular.module("listaTele").directive("acordions", function(){ //ajeitar o accordion
	return{
		controller: function($scope, $element, $attrs){
			var acordions = [];

			this.registerAcordions = function(acordion){
				acordions.push(acordion);
			};

			this.closeAll = function(){
				acordions.forEach(function (acordion){
					acordion.isOpened = false;
				})
			}
		}
	};
});

angular.module("listaTele").directive("acordion", function(){
	return {
		templateUrl: "view/accordion.html",
		transclude: true,
		scope: {
			title: "@"
		},
		require: "^acordions",
		link: function(scope, element, attrs, ctrl){
			ctrl.registerAcordions(scope);
			scope.open = function(){
				ctrl.closeAll();
				scope.isOpened=true;
			}
		}
	};
});