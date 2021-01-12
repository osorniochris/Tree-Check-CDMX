<?php 
    require( './database.php' );
    require( './response.php' );

    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization");

    $query = "call obtener_todos_reportes();";
    $db = new database();
    $result  = mysqli_query($db->getConn(), $query);
    
    $arreglo = array();
    while($rows = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $arreglo[] = $rows;
    }
    $db->closeConn();

    $success = false;
    $msj = "No hay reportes registrados";
    if( sizeof($arreglo) > 0 ){
        $success = true;
        $msj = "Ok";
    }

    $response = new response($arreglo, $success, $msj);

    echo json_encode($response);
?>