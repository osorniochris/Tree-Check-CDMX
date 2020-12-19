<?php 
    require( './database.php' );
    require( './response.php' );

    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization");

    $data = json_decode( file_get_contents('php://input') );

    $query = "call agregar_reporte($data->id, '$data->email', '$data->observaciones', '$data->img', '$data->tipo');";
    $db = new database();
    $db->getConn();
    $result  = mysqli_query($db,$query);
    
    if($rows = mysqli_fetch_array($result)){
        $msj .= $rows["AVISO"];
    }

    $succes = false;
    if(strcasecmp($msj,'Reporte enviado con éxito')==0){
    	$success = true;
    }

    $response = new response(null, $succes, $msj);

    echo json_encode($response);


?>