<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package camp5
 */
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer dark-bg" role="contentinfo">
        <p>Har du en fråga?<br/>
            Ställa den i <a href="https://www.facebook.com/groups/camp5" target="_blank">Camp5 Facebook-gruppen</a>!</p>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<!-- FastClick init -->
<script>
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
</script>

</body>
</html>
