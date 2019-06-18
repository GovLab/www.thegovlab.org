<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/ideas-lunch/css/styles.css">
<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic,100,100italic' rel='stylesheet' type='text/css'>
<div id="ideas-lunch-page" class="l-centered">
<img id="title-banner" src="http://images.thegovlab.org/wordpress/wp-content/uploads/2014/02/title-banner.png" alt="Ideas Lunch">
<?php if ( have_posts() ) : ?>
    <?php /* The loop */ ?>
    <?php while ( have_posts() ) : the_post(); ?>
    <?php $meta = get_post_meta(get_the_ID()); ?>

        <div class="item">
            <img class="featured-image" src="<?php echo wp_get_attachment_url(get_post_thumbnail_id(get_the_ID())) ?>" alt="">
            <span class="more">+</span>
            <div class="item-content">
            <h3><?php the_title(); ?></h3>
                <div class="post-content">
                <h4><?php echo $meta['subtitle'][0]; ?></h4>
                    <div class="item-description">
                        <p><?php the_content(); ?></p>
                    </div>
                </div>
            </div>
        </div>
    <?php endwhile; ?>
<?php endif; ?>
</div>

<script src="<?php bloginfo('template_directory'); ?>/ideas-lunch/jquery-1.10.2.min.js"></script>
<script>

    $( ".item:first" ).addClass('active');
    $('.more').click(function() {
        $(this).siblings('.item-content').slideToggle();
        $(this).parent().toggleClass('active');
    })
</script>
