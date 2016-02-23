angular.module("listaTele").service("operadorasAPI", function ($http, config){
	this.getOperadoras = function(){
		return $http.get(config.url + "/operadoras");
	};
});