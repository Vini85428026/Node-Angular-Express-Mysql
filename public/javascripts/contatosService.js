angular.module("listaTele").factory("contatosAPI", function ($http, config) {
	var _getContatos = function () { //"_" significa que é do tipo private
		return $http.get(config.url + "/contatos/obter");
	};

	var _updateContatos = function(codigo){
		return $http.post(config.url + "/contatos/" + codigo)
	};

	var _salvarEdicao = function(list){
		return $http.post(config.url + "/contatos/editar", list)
	};

	var _delContatos = function(id) {
		return $http.delete(config.url + "/contatos/" + id);
	};

	var _saveContato = function (contato) {
		return $http.post(config.url + "/contatos", contato);
	};

	return {
		getContatos: _getContatos,
		updateContatos: _updateContatos,
		salvarEdicao: _salvarEdicao,
		delContatos: _delContatos,
		saveContato: _saveContato
	};
});