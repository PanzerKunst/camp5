<?php while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/page', 'header'); ?>
  <?php get_template_part('templates/content', 'page'); ?>
<?php endwhile; ?>

<?php require_once("stripe-config.php"); ?>

<script src="https://checkout.stripe.com/checkout.js"></script>

<div role="main"></div>
