
$(document).ready(function(){
	$("form#censo").validetta({
		showErrorMessages : true,
		display : 'bubble',
		bubblePosition: 'bottom',
  		bubbleGapLeft: 40,
  		bubbleGapTop: 5,
  		realTime : true,
  		onValid : function(e){
			var data = {lat: $("#lat").val(), lon: $("#lon").val(), ncomun: $("#ncomun").val(),
						dtronco: $("#dtronco").val(), acarbono: $("#acarbono").val(), 
						ccarbono: $("#ccarbono").val(), rcont: $("#rcont").val(), 
						beneficios: $("#beneficios").val(), img: $("#img-name").val()};

			var dataJSON = JSON.stringify(data);

			console.log(dataJSON)
  			e.preventDefault();
	        	$.ajax({
		            method:"post",
		            url:"php/censo.php",
		            data: dataJSON,
		            cache:false,
		            success:function(resp){
		                var Jresp= JSON.parse(JSON.stringify(resp));
		                alert(JSON.stringify(resp));
		                if(Jresp.isSuccess == true){
		                    $.alert({
		                        title: 'Ok',
		                        content: Jresp.msg,
		                        icon: 'fas fa-globe',
		                        theme: 'material',
		                        useBootstrap: false,
		                        boxWidth: '400px',
		                        buttons: {
		                            Ok:{
		                                text: 'Ok',
		                                btnClass: 'btn-green',
		                            },
		                        },
		                        onDestroy: function () {
		                        	$(location).attr('href',"index.html");
    							}
		                    });
		                }
		                else if(Jresp.isSuccess == false){
		                	$.alert({
		                        title: 'Error',
		                        content: Jresp.msg,
		                        icon: 'fas fa-globe',
		                        theme: 'material',
		                        useBootstrap: false,
		                        boxWidth: '400px',
		                        buttons: {
		                            Ok:{
		                                text: 'Ok',
		                                btnClass: 'btn-red',
		                            },
		                        },
		                        onDestroy: function () {
		                        	$(location).attr('href',"censo.html");
    							}
		                    });
		                }
		            },
		            error:function(){
		                $.alert({
		                    title: 'Error en el servidor, int&eacute;ntelo m&aacute;s tarde',
		                    content: '',
		                    boxWidth: '400px',
		                    theme: 'material',
		                    useBootstrap: false,
		                    buttons: {
		                        Entendido:{
		                            text: 'Entendido',
		                            btnClass: 'btn-red',
		                        },
		                    }
		                });
		            }
		        });
  		},
  		onError : function(e){
    		e.preventDefault();
  		}
	
	});
});
