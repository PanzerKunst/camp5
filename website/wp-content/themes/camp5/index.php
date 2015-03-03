<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package camp5
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">


        <?php wp_nav_menu(
            array(
                'theme_location'  => 'primary',
                'walker' => new Walker_Index_All_Pages_As_Single()
            )
        ); ?>

    </main>
</div>

<?php get_footer(); ?>

<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function () {
        CBR.Controllers.Index();
    });
</script>
