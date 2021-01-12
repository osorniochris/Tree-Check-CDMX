<?php
  require( './response.php' );
  require( './database.php' );
  require './../libs/vendor/autoload.php';
  use Spipu\Html2Pdf\Html2Pdf;
  $html2pdf = new Html2pdf('P', 'A4', 'es', 'true', 'UTF-8');

  header('Content-Type: application/json');
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization");

  $data = json_decode( file_get_contents('php://input') );
  $arreglo = array();
  $msj = "sin mensaje";
  $id_reporte = $data->reporte;

  if($id_reporte == null || $id_reporte == ""){
    $success = false;
    $msj = "Hubo un problema al recibir el ID del reporte;";
  }else{
    $success = true;
    $msj = "Reporte recibido";

    $query = "call obtener_reporte_admin($id_reporte);";
    $db = new database();
    $result  = mysqli_query($db->getConn(), $query);


    while($rows = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $arreglo[] = $rows;
    }
    $db->closeConn();

    $nombre_persona = $arreglo[0]['nombre_persona'];
    $email_persona = $arreglo[0]['email_persona'];
    $fecha_reporte = $arreglo[0]['fecha_reporte'];
    $observaciones = $arreglo[0]['observaciones'];
    $estatus_reporte = $arreglo[0]['estatus_reporte'];
    $imagen_reporte = $arreglo[0]['imagen_reporte'];
    $latitud = $arreglo[0]['latitud'];
    $longitud = $arreglo[0]['longitud'];
  }
  $html_reporte = "
  <!DOCTYPE html>
  <html lang='es'>
    <head>
      <meta charset='utf-8'>
      <title>Generador de PDFs con PHP</title>

      <style media='screen' media='text/css'>

        .cont {
          height: 100%;
          width: 100%;
          margin: 0%;
        }
        .cabecera{
          width: 95%;
          padding: 10px;
          margin-left: 2.5%;
          margin-top: 2%;
          height: 10%;
        }
        .cabecera h1{
          text-align: left;
        }
        .cabecera img{
          width: 200px;
          height: 50px;
          float: right;
        }

        .fila_uno{
          width: 100%;
          height: 25%;
        }
        .fila_dos{
          width: 100%;
          height: 25%;
        }
        .fila_tres{
          width: 100%;
          height: 25%;
        }
        .fila_uno p{
          margin-left: 4%;
        }

        table {
          font-family: Helvetica,arial,helvetica;
          font-size: 16px;
          border-collapse: collapse;
          border: none;
          width: 45%;
          margin-left: 3%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        .comentarios{
          width: 95%;
          margin-left: 2.5%;
          padding: 10px;
          font-size: 15px;
          text-align: justify;
        }

        .foto_arbol{
          width: 95%;
          margin-left: 2.5%;
          padding: 10px;
        }

        .img_report{
          margin-left: 12%;
        }
      </style>

    </head>
    <body>
      <div class='cont'>

        <div class='cabecera'>
          <img class='cabecera' src='./../images/Logo3Ch.jpg'>
          <h1>MI REPORTE DE ÁRBOL</h1><br><hr>
        </div>

        <div class='cont_reporte'>
          <div class='fila_uno' >
            <p><h2>Reporte # $id_reporte</h2></p>

            <table>
                <tr>
                    <td><div class='float'><b>Nombre:</b> $nombre_persona </div></td>
                    <td><div class='float'><b>Fecha y hora del reporte:</b> $fecha_reporte </div></td>
                </tr>
                <tr>
                    <td><div class='float'><b>User Email</b> $email_persona </div></td>
                    <td><div class='float'><b>Report Status:</b> $estatus_reporte </div></td>
                </tr>
                <tr>
                    <td colspan='2'><div  class='float'> <b>Tree Location:</b> Latitud: $latitud, Longitud: $longitud </div></td>
                </tr>
            </table>
          </div>
          <div class='fila_dos'>
            <div class='comentarios'>
              <h3><b>Comentarios</b></h3>
              <p>
                $observaciones
              </p>
            </div>
          </div>
          <div class='fila_tres'>
            <div class='foto_arbol'>
              <h3><b>Fotografía del árbol</b></h3>
              <img class='img_report' src='$imagen_reporte' width='500px;' height='300px;'>
            </div>
          </div>
        </div>

      </div>

    </body>
  </html>

  ";
  $html2pdf->writeHTML($html_reporte);
  $html2pdf->Output('F:\wamp64\www\tree_check\Tree-Check-CDMX\Reporte'.$id_reporte.'.pdf', 'F');
  $response = new response(null, $success, $msj);
  echo json_encode($response);
?>
