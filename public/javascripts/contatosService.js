angular.module("listaTele").factory("contatosAPI", function ($http, config) {
	var _getContatos = function () { //"_" significa que é do tipo private
		return $http.get(config.url + "/contatos/obter");
	};

	var _saveContato = function (contato) {
		return $http.post(config.url + "/contatos", contato);
	};

	return {
		getContatos: _getContatos,
		saveContato: _saveContato
	};
});