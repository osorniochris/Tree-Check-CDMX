$(document).ready(function(){
	$("form#reporte").validetta({
		showErrorMessages : true,
		display : 'bubble',
		bubblePosition: 'bottom',
  		bubbleGapLeft: 40,
  		bubbleGapTop: 5,
  		realTime : true,
  		onValid : function(e){
			var data = {id: 1, mail: $("#mail").val(), 
			obs:$("#obs").val(), img:$("#img-name").val(), 
			tipo: $("select#motivo").children("option:selected").val(), fecha:$("#fecha").val()};

			var dataJSON = JSON.stringify(data);

			console.log(dataJSON)
  			e.preventDefault();
	        	$.ajax({
		            method:"post",
		            url:"php/agregarReporte.php",
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