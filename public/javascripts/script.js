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

			$scope.apagarContatos = function (contatos){
				$scope.contatos=contatos.filter(function (cont){
					if (!cont.selecionado){
						carregarContatos();
						return cont;
					}
				});
			};

			$scope.adicionarContatos = function (contato){
				contato.serial = serialGenerator.generate();
				contatosAPI.saveContato(contato).success( function (data){
					$scope.contato = null;
					carregarContatos();
				});
			};

			$scope.mandar = function(contatos){
				var a = contatos.some(function(c){
					return c.selecionado;
				});
				return a;
			}

			$scope.ordenarPor = function(campo){
				$scope.criterioOrdenacao = campo;
				$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
			}

			carregarContatos();

		});	