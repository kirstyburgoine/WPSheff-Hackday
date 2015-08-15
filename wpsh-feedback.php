<?php
defined('ABSPATH') or die("No script kiddies please!");

/**
 * Plugin Name: WPSH Feedback
 * Description: A comments and feedback plugin created during WP Sheffield Hackday - 15.08.2015
 * Version: 1.0
 * Author: Kirsty Burgoine & Samantha Miller
 * Author URI: http://wpsheffield.com
 */

/*
// WP_Comment_Query arguments
$args = array (
	'type' => 'feedback',
	'status' => 'approve'
);

// The Comment Query
$comment_query = new WP_Comment_Query;
$comments = $comment_query->query( $args );


// Comment Loop
if ( $comments ) {
	foreach ( $comments as $comment ) {
		echo '<p>' . $comment->comment_content . '</p>';
	}
} else {
	echo 'No comments found.';
} */

$comment_type = $_POST['new_comment_type'];

function preprocess_comment_handler( $commentdata ) {
    
    unset( $commentdata['comment_type'] );
    return $commentdata;
}
add_filter( 'preprocess_comment' , 'preprocess_comment_handler' );

function set_comment_type( $comment_data ) {

        if (  !isset( $_POST['comment_type'] ) ) {
            return $comment_data;
        }
        if ( get_post_type( $comment_data['comment_post_ID'] ) != matchCPT::$post_type ){
            return $comment_data;
        }
}
?>
