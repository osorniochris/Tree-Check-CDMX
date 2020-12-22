<?php 
    require( './database.php' );
    require( './response.php' );

    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization");

    $data = json_decode( file_get_contents('php://input') );

    $query = "call cancelar_reporte($data->id);";
    $db = new database();
    $result  = mysqli_query($db->getConn(), $query);
    
    $msj = "";
    $id = "";
    $obs = "";
    $estatus = "";
    $fecha = "";
    if($rows = mysqli_fetch_array($result)){
        $msj .= $rows["AVISO"];
    }
    $db->closeConn();

    $success = false;
    $dato = null;
    if(strcasecmp($msj,"Reporte cancelado")==0){
        $success = true;
        $query = "call seleccionar_reporte($data->id);";
        $db = new database();
        $result  = mysqli_query($db->getConn(), $query);
        
        if($rows = mysqli_fetch_array($result)){
            $id .= $rows["id_reporte"]; 
            $obs .= $rows["observaciones"];  
            $estatus .= $rows["estatus_reporte"]; 
            $fecha .= $rows["fecha_reporte"];
        }
        $dato = array($id, $obs, $estatus, $fecha);
        $db->closeConn();
    }
    
    $response = new response($dato, $success, $msj);

    echo json_encode($response);
?>