<?php while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/page', 'header'); ?>
  <?php get_template_part('templates/content', 'page'); ?>
<?php endwhile; ?>

<?php require_once("stripe-init.php");
    $_SESSION['membershipPriceInOre'] = 45000;

    $stripePaymentIntent = \Stripe\PaymentIntent::create([
        "amount" => $_SESSION['membershipPriceInOre'],
        "currency" => "sek",
        "payment_method_types" => ["card"],
        "description" => "Camp5 Membership - Early Bird"
    ]);

    $_SESSION['stripePaymentIntent'] = $stripePaymentIntent;
?>

<input type="hidden" id="stripe-payment-intent" value="<?= htmlspecialchars(json_encode($_SESSION['stripePaymentIntent']), ENT_QUOTES, 'UTF-8') ?>" />

<script src="https://js.stripe.com/v3/"></script>

<div role="main"></div>
