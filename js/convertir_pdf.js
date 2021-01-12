$(document).ready(function() {
  var data_json = "";
  var dataJSON = "";
  var valores = "";
  $(".boton_imprimir").click(function() {
    $(this).parents("tr").find(".id_reporte").each(function() {
      valores += $(this).html();
    });
    data_json = {reporte: valores};
    dataJSON = JSON.stringify(data_json);
    console.log(dataJSON);
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
});
