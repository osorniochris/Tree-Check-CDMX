<?php 
    require( './database.php' );
    require( './response.php' );

    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization");

    $data = json_decode( file_get_contents('php://input') );

    $query = "call agregar_reporte($data->id, '$data->mail', '$data->obs', '$data->img', '$data->tipo');";
    $db = new database();
    $result  = mysqli_query($db->getConn(), $query);
    
    $msj = "";
    if($rows = mysqli_fetch_array($result)){
        $msj .= $rows["AVISO"];
    }
    $db->closeConn();

    $success = false;
    if(strcasecmp($msj,"Reporte enviado con éxito")==0){
    	$success = true;
    }

    $response = new response(null, $success, $msj);

    echo json_encode($response);


?>