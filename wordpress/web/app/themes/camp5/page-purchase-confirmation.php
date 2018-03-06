<?php while (have_posts()) : the_post(); ?>
    <?php get_template_part('templates/page', 'header'); ?>

    <?php require_once("stripe-config.php");
    require_once("lib/camp5-db.php");

    $checkoutToken  = $_POST["stripe-token"];
    $checkoutEmail = $_POST["stripe-email"];
    $checkoutAmount = $_POST["stripe-amount"];

    $customer = \Stripe\Customer::create(array(
        "email" => $checkoutEmail,
        "source"  => $checkoutToken
    ));

    $charge = \Stripe\Charge::create(array(
        "customer" => $customer->id,
        "amount"   => $checkoutAmount,
        "currency" => "sek"
    ));

    $camp5db = new Camp5Db();
    $camp5db->saveParticipants($_POST["participants"]);
    ?>

    <div role="main">
        <?php get_template_part('templates/content', 'page'); ?>
    </div>
<?php endwhile; ?>
