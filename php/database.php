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
            $this->conn = mysqli_connect($this->server,$this->user,$this->password,$this->nameDB);
            mysqli_query($this->conn, "SET NAMES 'utf8'"); 
            return $this->conn;
        } catch (PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }
    }

    public function closeConn()
    {
        mysqli_close($this->conn);
    }

}
?>