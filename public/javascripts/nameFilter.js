angular.module("listaTele").filter("name", function(){
	return function(input){
		var listaNomes = input.split(" ");
		var listaNomesFormater = listaNomes.map(function(nome){
			if(nome === "da" || nome === "de") return nome;
			return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
		});
		return listaNomesFormater.join(" ");
	};
});