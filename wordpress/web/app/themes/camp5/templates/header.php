<?php use Roots\Sage\BmWeekSthlm; ?>

<header class="banner" id="site-header">
    <div class="container" <?= BmWeekSthlm\header_style(); ?>>
        <h1><?php bloginfo('name'); ?></h1>
        <div class="centered-contents">
            <span class="title"><?php bloginfo('description'); ?></span>
        </div>
        <div class="centered-contents">
            <span class="subtext">11-18<span>June</span>2017</span>
        </div>
    </div>
    <nav class="nav-primary centered-contents">
        <?php
        if (has_nav_menu('primary_navigation')) :
            wp_nav_menu([
                'theme_location' => 'primary_navigation',
                'menu_class' => 'nav styleless',
                'walker' => new BmWeekSthlm\Walker_Main_Menu()
            ]);
        endif;
        ?>
        <a href="#site-header">Top</a>
    </nav>
</header>
