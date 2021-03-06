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

			$scope.exibireditar = function(selec,cdg){
				if(selec == 'edit'){
					contatosAPI.updateContatos(cdg).success(function (data){
						$scope.lista = data.result[0];
					});
				}
			};

			$scope.editarContatos = function(valores){
				contatosAPI.salvarEdicao(valores).success(function (data){
					location.href="http://localhost:3000/";
					carregarContatos();
				});
			};

			$scope.ordenarPor = function(campo){
				$scope.criterioOrdenacao = campo;
				$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
			}

			carregarContatos();

		});	