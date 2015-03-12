<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package camp5
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'camp5' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer centered-contents">
		<?php edit_post_link( __( 'Edit', 'camp5' ), '<span class="edit-link">', '</span>' ); ?>
        <a href="/"><i class="fa fa-home"></i></a>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
