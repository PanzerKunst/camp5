<?php
class Camp5Db {
    private $conn = null;


    public function __construct() {
        $conn = new mysqli("127.0.0.1", "root", "AcB65oRo!F", "wp_camp5");

        if ($conn->connect_errno) {
            echo "Failed to connect to MySQL: " . $conn->connect_error;
        }

        $this->conn = $conn;

        $this->_createTableIfNeeded();
    }


    public function saveParticipants($participants) {
        foreach ($participants as $p) {
            $this->_insertParticipant($p);
        }
    }


    private function _createTableIfNeeded() {
        $query = <<<EOD
        create table if not exists registrations (
          id BIGINT NOT NULL AUTO_INCREMENT,
          full_name VARCHAR(255) NOT NULL,
          email_address VARCHAR(255) NOT NULL,
          created_at TIMESTAMP NOT NULL,
          PRIMARY KEY (id)
        );
EOD;

        $this->conn->query($query);
    }


    private function _insertParticipant($p) {
        $name = $p["name"];
        $email = $p["email"];

        $query = <<<EOD
        insert into registrations (full_name, email_address, created_at)
        values("$name", "$email", now());
EOD;

        $this->conn->query($query);
    }
}
?>
