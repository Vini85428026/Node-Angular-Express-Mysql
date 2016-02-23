/*Criando um modulo*/ 
		angular.module("listaTele", []);
		/* Lendo um modulo */
		angular.module("listaTele").controller("listaCtrl", function ($scope, $filter, contatosAPI, operadorasAPI, serialGenerator) /*contatosAPI é o nome da factory*/{
			
			$scope.app = "Lista Telefônica";
			$scope.contatos = [];

			var carregarContatos = function(){
				contatosAPI.getContatos().success(function(data){
					$scope.contatos = data;
				}).error(function(data,status){
					$scope.message = "Aconteceu um erro!";
				});
			};

			$scope.apagarContatos = function (id){
				contatosAPI.delContatos(id).success(function (data){
					carregarContatos();
				});
			};

			$scope.adicionarContatos = function (contato){
				contato.serial = serialGenerator.generate();
				contatosAPI.saveContato(contato).success( function (data){
					$scope.contato = null;
					carregarContatos();
				});
			};

			$scope.editar = function(selec,cdg){
				$scope.contato = null;
				if(selec == 'edit'){
					exibir(cdg);
				}
			};

			var exibir = function(codigo){
				contatosAPI.updateContatos(codigo).success(function (data){
					$scope.lista = null;
					carregarContatos(); 
				});
			};

			$scope.ordenarPor = function(campo){
				$scope.criterioOrdenacao = campo;
				$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
			}

			carregarContatos();

		});	