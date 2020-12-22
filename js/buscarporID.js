$(document).ready(function(){
	$("form#buscar").validetta({
		showErrorMessages : true,
		display : 'bubble',
		bubblePosition: 'bottom',
  		bubbleGapLeft: 40,
  		bubbleGapTop: 5,
  		realTime : true,
  		onValid : function(e){
			var data = {id: $("#reporte_id").val()};

			var dataJSON = JSON.stringify(data);

			console.log(dataJSON)
  			e.preventDefault();
	        	$.ajax({
		            method:"post",
		            url:"php/buscarporID.php",
		            data: dataJSON,
		            cache:false,
		            success:function(resp){
		                var Jresp= JSON.parse(JSON.stringify(resp));
		                if(Jresp.isSuccess == true){
		                    /*$.alert({
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
		                        onDestroy: function () {*/
					                var info = Jresp.data + '';
					                var res = info.split(",");
					                $("#id_").text(res[0]);
					                $("#obs_").text(res[1]);
					                $("#estatus_").text(res[2]);
					                $("#fecha_").text(res[3]);
					                $("#cancelar").removeAttr('disabled');
    							/*}
		                    });*/
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
		                        	$(location).attr('href',"consulta.html");
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