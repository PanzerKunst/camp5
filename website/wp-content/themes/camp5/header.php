<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package camp5
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:fb="http://ogp.me/ns/fb#">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:image" content="/wp-content/themes/camp5/images/rv-project.jpg" />

<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'camp5' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
        <div class="site-branding" style="background-image: url(<?php header_image(); ?>)">
            <div>
                <a href="/" class="site-title"><?php bloginfo( 'name' ); ?></a>
            </div>

            <span>Photo thanks to <a href="http://rvproj.com" target="_blank">The RV Project</a></span>

            <h1 class="site-description"><?php bloginfo( 'description' ); ?></h1>
            <p>07-13 &nbsp;juni&nbsp; 2015</p>
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
