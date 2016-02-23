angular.module("listaTele").directive("msg", function(){
	return {
		templateUrl: "view/teste.html",
		replace: true,
		restrict: "E", 
		scope :{
			title : "@", 
		},
		transclude: true
	};
});

	/*
		restrict: 
		A = ao atributo - div alert
		E = ao elemento - alert
		C  = a classe - class="alert"

	*/