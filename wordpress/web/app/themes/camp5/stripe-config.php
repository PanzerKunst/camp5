<?php
    require_once("vendor/autoload.php");

    $stripe = array(
        "secret_key"      => "sk_live_HXktpL1nH9VW7Dg8No6yZr7V",
        "publishable_key" => "pk_live_BGrpxhPpHFq9duVYIcVQzXCC"
    );

    \Stripe\Stripe::setApiKey($stripe["secret_key"]);
?>
