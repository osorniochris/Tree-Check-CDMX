$(document).ready(function() {
  var data_json = "";
  var dataJSON = "";
  var valores = "";
  var idrep = "";
  $(".boton_imprimir").click(function() {
    $(this).parents("tr").find(".id_reporte").each(function() {
      valores += $(this).html();
    });
    data_json = {reporte: valores};
    dataJSON = JSON.stringify(data_json);
    console.log(dataJSON);
    alert(dataJSON);
    $.ajax({
        method:"POST",
        url:"php/print_view.php",
        data: dataJSON,
        cache:false,
        success:function(resp){
          var Jresp = JSON.parse(JSON.stringify(resp));
          console.log(Jresp);
            if(Jresp.isSuccess == true || Jresp.isSuccess == "true" ){
                 alert('El reporte se ha descargo en la carpeta del proyecto')
            }
            else if(Jresp.isSuccess == false){
              alert(Jresp.msg)
              alert("Algo sucedió al convertir el reporte. Intenta de nuevo");
            }
        },
        error:function(){
          alert("ERROR DEL SERVIDOR")
        }
    });

    valores = "";
  });

  $(".cambiarEdo").click(function() {
    var confirma = confirm("¿Desea actualizar el estado del reporte?");
      if (confirma == true){
        $(this).parents("tr").find(".id_reporte").each(function() {
          idrep += $(this).html() + "\n";
        });
        data_json = {id: idrep};
        dataJSON = JSON.stringify(data_json);
        console.log(dataJSON);

        $.ajax({
            method:"POST",
            url:"php/cambiarEdoReporte.php",
            data: dataJSON,
            cache:false,
            success:function(resp){
              var Jresp = JSON.parse(JSON.stringify(resp));
              console.log(Jresp);
                if(Jresp.isSuccess == true){
                  $.alert({
                    title: '-',
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
                      $(location).attr('href',"prueba_2.html");
                    }
                  });
                }
                else if(Jresp.isSuccess == false){
                  $.alert({
                        title: 'No se pudo actualizar el estado',
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
        idrep = "";
      }
  });

});