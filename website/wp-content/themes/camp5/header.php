<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package camp5
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'camp5' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
        <div class="site-branding">
            <span class="site-title"><?php bloginfo( 'name' ); ?></span>
            <h1 class="site-description"><?php bloginfo( 'description' ); ?></h1>
            <p>7 till 13 juni 2015</p>
        </div><!-- .site-branding -->
        <div id="menu-btn-wrapper">
            <button class="styleless"></button>
        </div>
		<nav id="site-navigation" class="main-navigation" role="navigation">
            <?php wp_nav_menu(
                array(
                    'theme_location' => 'primary',
                    'menu_class' => 'menu styleless',
                    'walker' => new Walker_Main_Menu()
                )
            ); ?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
