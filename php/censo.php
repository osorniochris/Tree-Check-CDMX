<?php
	require( './database.php' );
    require( './response.php' );

    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization");

    $data = json_decode(file_get_contents('php://input'));

    $query = "call agregar_arbol('$data->lat', '$data->lon', '', '$data->ncomun', '$data->dtronco', '$data->acarbono', '$data->ccarbono', '$data->rcont', '$data->beneficios', '$data->img');";
 	$db = new database();
    $result  = mysqli_query($db->getConn(), $query);
    
    $msj = "";
    if($rows = mysqli_fetch_array($result)){
        $msj .= $rows["AVISO"];
    }
    $db->closeConn();

    $success = false;
    if(strcasecmp($msj,"Árbol agregado correctamente :)")==0){
    	$success = true;
    }

    $response = new response(null, $success, $msj);

    echo json_encode($response);


?>   
 
