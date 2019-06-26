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

<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/ideas-lunch/css/styles.css">
<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic,100,100italic' rel='stylesheet' type='text/css'>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<style>
    .material-icons {
        color: #503281;
        font-size: 16px;
        vertical-align: sub;
    }

    .date {
      display: block;
      width: 60px;
      height: 60px;
      background: #fff;
      text-align: center;
      font-family: 'Helvetica', sans-serif;
      position: relative;
      box-shadow: 0 0 3px #bbb;
      border-radius: 5px;
  }

  .date .binds {
      position: absolute;
      height: 9px;
      width: 40px;
      background: transparent;
      border: 2px solid #9782B3;
      border-width: 0 5px;
      top: -4px;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 1;
  }

  .date .month {
      background: #523080;
      display: block;
      padding: 3px 0;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      border-radius: 5px;
      position: relative;
  }

  .date .month::after {
      content: " ";
      display: block;
      position: absolute;
      width: 100%;
      height: 5px;
      background: #523080;
      bottom: 0;
  }

  .date .day {
      display: block;
      margin: 9px 0 0 0;
      font-size: 20px;
      color: #523080;
  }

  .date.past {

  }

  .date.past .binds {
    border-color: #999;
}

.date.past .month {
    background: #555;
}

.date.past .month::after {
    background: #555;
}

.date.past .day {
  color: #555;
}

.date .year {
    display: block;
    margin-top: 15px;
    opacity: 0.6;
}
</style>

<div id="content" class="page col-full">


    <?php woo_main_before(); ?>

    <?php $categories = '476,377'; ?>

    <section id="main" class="col-left">

        <h1>Upcoming Events</h1>


        <?php
        $query = new WP_Query( array(
            'cat' => $categories,
            'post_status' => 'publish',
            'post_type' => 'post',
            'posts_per_page' => -1,
            'meta_query' =>
            array(
                'relation' => 'AND',
                array(
                    'key' => 'event_date',
                    'compare' => 'EXISTS',
                    ),
                array(
                  'key' => 'event_date',
                  'value' => date("Y-m-d"),
                  'compare' => '>=',
                  'type' => 'DATE'
                  )
                )
            ) );
            ?>
            <?php if ( $query->have_posts() ) : ?>
            <?php while ( $query->have_posts() ) : $query->the_post(); ?>
            <?php $meta = get_post_meta(get_the_ID()); ?>
            <?php $event_date = strtotime($meta['event_date'][0]); ?>

            <div class="item">
                <div class="item-content">
                    <div style="display: inline-block; width: 12%;">
                        <div class="date">
                            <span class="binds"></span>
                            <span class="month"><?php echo date('M', $event_date); ?></span>
                            <span class="day"><?php echo date('d', $event_date); ?></span>
                            <span class="year"><?php echo date('Y', $event_date); ?></span>
                        </div>
                    </div>
                    <div style="display: inline-block; width: 87%; vertical-align: top;">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <div class="post-content">
                            <h4><?php echo $meta['subtitle'][0]; ?></h4>
                            <div class="item-description">
                                <?php the_excerpt(); ?>
                                <a href="<?php the_permalink(); ?>">Read More <i class="material-icons">launch</i></a>
                                <p>Categories: <?php the_category( $separator = ', ' ); ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    <?php else: ?>
    <div class="item">
        <div class="item-content">
            <p>Check back soon for the next event.</p>
        </div>
    </div>
<?php endif; ?>


<h1>Past Events</h1>


<?php
$query = new WP_Query( array(
    'cat' => $categories,
    'post_status' => 'publish',
    'post_type' => 'post',
    'posts_per_page' => 25,
    'meta_query' =>
    array(
        'relation' => 'AND',
        array(
            'key' => 'event_date',
            'compare' => 'EXISTS',
            ),
        array(
          'key' => 'event_date',
          'value' => date("Y-m-d"),
          'compare' => '<',
          'type' => 'DATE'
          )
        )
    ) );
    ?>
    <?php if ( $query->have_posts() ) : ?>
    <?php while ( $query->have_posts() ) : $query->the_post(); ?>
    <?php $meta = get_post_meta(get_the_ID()); ?>
    <?php $event_date = strtotime($meta['event_date'][0]); ?>

    <div class="item">
        <div class="item-content">
            <div style="display: inline-block; width: 12%;">
                <div class="date past">
                    <span class="binds"></span>
                    <span class="month"><?php echo date('M', $event_date); ?></span>
                    <span class="day"><?php echo date('d', $event_date); ?></span>
                    <span class="year"><?php echo date('Y', $event_date); ?></span>
                </div>
            </div>
            <div style="display: inline-block; width: 87%; vertical-align: top;">
                <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                <div class="post-content">
                    <h4><?php echo $meta['subtitle'][0]; ?></h4>
                    <div class="item-description">
                        <?php the_excerpt(); ?>
                        <p><a href="<?php the_permalink(); ?>">Read More <i class="material-icons">launch</i></a></p>
                        <p>Categories: <?php the_category( $separator = ', ' ); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endwhile; ?>
<?php wp_reset_postdata(); ?>
<?php endif; ?>


</section><!-- /#main -->

<?php woo_main_after(); ?>

<?php get_sidebar(); ?>
</div><!-- /#content -->

<?php get_footer(); ?>
