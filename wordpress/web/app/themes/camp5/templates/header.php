<?php use Roots\Sage\BmWeekSthlm; ?>

<header class="banner" id="site-header">
    <div class="container" <?= BmWeekSthlm\header_style(); ?>>
        <h1><?php bloginfo('name'); ?></h1>
        <div class="centered-contents">
            <span class="title"><?php bloginfo('description'); ?></span>
        </div>
        <div class="centered-contents">
            <div class="subtext">
                <p class="subtext-dates">10-17<span>June</span>2018</p>
                <p class="subtext-location">Åland</p>
            </div>
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
    </nav>
</header>
