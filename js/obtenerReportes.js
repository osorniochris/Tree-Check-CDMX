$(document).ready(function(){
    $.ajax({
        method:"post",
        url:"php/obtenerReportes.php",
        cache:false,
        success:function(resp){
            var Jresp= JSON.parse(JSON.stringify(resp));
            console.log(Jresp);
            if(Jresp.isSuccess == true){
                //Se obtiene la tabla del DOM
                var table = document.getElementById('tbl');

                //Por cada reporte recibido
                var i;
                for (i = 0; i < Jresp.data.length; i++) {
                    //Se crea una fila vacía
                    var row = table.insertRow(i + 1);

                    //Se crean las celdas respectivas a los datos necesarios
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);

                    //Se insertan los valores correspondientes en las celdas
                    cell1.innerHTML = Jresp.data[i]["id_reporte"];
                    cell1.className = 'id_reporte';
                    cell2.innerHTML = Jresp.data[i]["nombre_persona"];
                    cell3.innerHTML = Jresp.data[i]["email_persona"];
                    cell4.innerHTML = Jresp.data[i]["fecha_reporte"];
                    cell5.innerHTML = Jresp.data[i]["estatus_reporte"];
                    cell6.innerHTML = "<i class=\"boton_imprimir fas fa-file-pdf\"></i>&nbsp<i class=\"fas fa-edit\"></i>";
                }

                var mi = document.getElementsByTagName('footer')[0];
                var script= document.createElement('script');
                script.src= './js/convertir_pdf.js';
                mi.appendChild(script);
            }
            else if(Jresp.isSuccess == false){
                $.alert({
                    title: 'Informaci&oacute;n',
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
});
