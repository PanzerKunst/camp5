<?php while (have_posts()) : the_post(); ?>
    <?php get_template_part('templates/page', 'header'); ?>

    <div role="main">
        <p id="note-on-possible-payment-failure">If you don't see any text below this paragraph, it means the payment
            has failed. Most likely, your card requires 3D Secure, and adding support for 3D Secure is just too much
            work for me this year. If your payment has failed, please Swish the amount to 0768794832, mentioning the
            name and e-mail of each participant you are paying for. I will then do the payment with my own card, and
            send you an e-mail confirming your registration. Thanks for your understanding.</p>
    </div>

    <?php require_once("stripe-config.php");
    require_once("lib/camp5-db.php");

    $checkoutToken = $_POST["stripe-token"];
    $checkoutEmail = $_POST["stripe-email"];
    $checkoutAmount = $_POST["stripe-amount"];

    $customer = \Stripe\Customer::create(array(
        "email" => $checkoutEmail,
        "source" => $checkoutToken
    ));

    $charge = \Stripe\Charge::create(array(
        "customer" => $customer->id,
        "amount" => $checkoutAmount,
        "currency" => "sek"
    ));

    $camp5db = new Camp5Db();
    $camp5db->saveParticipants($_POST["participants"]);
    ?>

    <div role="main">
        <?php get_template_part('templates/content', 'page'); ?>
    </div>
<?php endwhile; ?>
