<?php
if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Template Name: Full Width
 *
 * This template is a full-width version of the page.php template file. It removes the sidebar area.
 *
 * @package WooFramework
 * @subpackage Template
 */
    get_header();
    global $woo_options;
?>

    <div id="content" class="page col-full">


        <?php woo_main_before(); ?>

        <section id="main" class="col-left">
        <?php include('ideas-lunch/main-page.php'); ?>

        </section><!-- /#main -->

        <?php woo_main_after(); ?>

        <?php get_sidebar(); ?>
    </div><!-- /#content -->

<?php get_footer(); ?>
