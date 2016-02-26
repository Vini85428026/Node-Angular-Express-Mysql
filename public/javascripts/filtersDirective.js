angular.module("listaTele").directive("mascaradata", function($filter){
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {
			var _formatDate = function (date) {
				date = date.replace(/[^0-9]+/g, "");
				if(date.length > 2) {
					date = date.substring(0,2) + "/" + date.substring(2);
				}
				if(date.length > 5) {
					date = date.substring(0,5) + "/" + date.substring(5,9);
				}
				return date;
			};

			element.bind("keyup", function () {
				ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
				ctrl.$render();
			});
		}
	};
});


angular.module("listaTele").directive("mascaraphone", function(){
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl){
			var _formatPhone = function(fone){
				fone = fone.replace(/[^0-9]+/g, ""); //tudo aquilo que não for numero vem vazio
				if(fone.length > 1){
					fone = "(" + fone.substring(0,2) + ")" + fone.substring(2);
				}

				if(fone.length > 4){
					fone = fone.substring(0,4) + " " + fone.substring(4);
				}

				if(fone.length > 9){
					fone = fone.substring(0,9) + "-" + fone.substring(9); //quando for de 0 a 3(0,1,2,3 caract.) ai implementa "-" 
				}
				return fone;
				
			};

			element.bind("keyup", function () {
				ctrl.$setViewValue(_formatPhone(ctrl.$viewValue));
				ctrl.$render();
			});		
		}
	};
});