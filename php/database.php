<?php

class database
{
    public $user;
    public $password;
    public $server;
    public $nameDB;

    public $conn;

    public function __construct()
    {
        $database_info = json_decode( file_get_contents("../config.json") ); 
        $this->user = $database_info->database->user;
        $this->password = $database_info->database->password;
        $this->server = $database_info->database->server;
        $this->nameDB = $database_info->database->nameDB;
    }

    public function getConn()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->server
                . ";dbname=" . $this->nameDB
                , $this->user, $this->password);
            $this->conn->exec("set names uft8");
            return $this->conn;
        } catch (PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }
    }

}
?>