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
        <p>Do you have a question?<br/>
            Ask it in <a href="https://www.facebook.com/groups/862995873723559" target="_blank">the Camp5 Facebook group</a>!</p>
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
