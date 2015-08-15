<?php
defined('ABSPATH') or die("No script kiddies please!");

/**
 * Plugin Name: WPSH Feedback
 * Description: A comments and feedback plugin created during WP Sheffield Hackday - 15.08.2015
 * Version: 1.0
 * Author: Kirsty Burgoine & Samantha Miller
 * Author URI: http://wpsheffield.com
 */

// New data for comment type passed through hidden field on comment form
$comment_type = $_POST['new_comment_type'];

function preprocess_comment_handler( $commentdata ) {
    
    // Check if the parameter is passed through the form
    if (  !isset( $_POST['new_comment_type'] ) ) {
    // If not return the standard comment_data
            return $comment_data;
    
    } else {
    	// else unset the comment type and set it to feedback
    	unset( $commentdata['comment_type'] );
    	$commentdata['comment_type'] = 'feedback';

    	return $commentdata;
	}
}
?>
