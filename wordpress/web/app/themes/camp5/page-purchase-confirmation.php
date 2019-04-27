<?php while (have_posts()) : the_post(); ?>
    <?php get_template_part('templates/page', 'header'); ?>

    <?php require_once("lib/camp5-db.php");

    $camp5db = new Camp5Db();
    $camp5db->saveParticipants($_POST["participants"]);
    ?>

    <div role="main">
        <?php get_template_part('templates/content', 'page'); ?>
    </div>
<?php endwhile; ?>
