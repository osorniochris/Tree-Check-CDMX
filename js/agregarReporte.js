$(document).ready(function(){
	$("form#reporte").validetta({
		showErrorMessages : true,
		display : 'bubble',
		bubblePosition: 'bottom',
  		bubbleGapLeft: 40,
  		bubbleGapTop: 5,
  		realTime : true,
  		onValid : function(e){
  			e.preventDefault();
	        	$.ajax({
		            method:"post",
		            url:"../php/agregarReporte.php",
		            data: $("form#reporte").serialize(),
		            cache:false,
		            success:function(resp){
		                var Jresp=$.parseJSON(resp);
		                alert(Jresp);
		                if(Jresp["isSuccess"]==true){
		                    $.alert({
		                        title: 'Ok',
		                        type: 'orange',
		                        content: Jresp["msg"],
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
		                        	$(location).attr('href',"index.html");
    							}
		                    });
		                }
		                else if(Jresp["isSuccess"]==false){
		                	$.alert({
		                        title: 'Error',
		                        type: 'orange',
		                        content: Jresp["msg"],
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
		                        	$(location).attr('href',"reporte.html");
    							}
		                    });
		                }
		            },
		            error:function(){
		                $.alert({
		                    title: 'Error en el servidor, int&eacute;ntelo m&aacute;s tarde',
		                    content: '',
		                    boxWidth: '400px',
		                    type: 'orange',
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