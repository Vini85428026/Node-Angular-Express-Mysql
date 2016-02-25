angular.module("listaTele").directive("mascaraphone", function(){
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl){
			var _formatPhone = function(fone){
				fone = fone.replace(/[^0-9]+/g, ""); //tudo aquilo que não for numero vem vazio
				if(fone.length > 1){
					fone = "(" + fone.substring(0,2) + ")" + fone.substring(2);
				}
				if(fone.length > 7){
					fone = fone.substring(0,8) + "-" + fone.substring(8); //quando for de 0 a 3(0,1,2,3 caract.) ai implementa "-" 
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