<?php
/*
Plugin Name:  Wiloke Vimeo Gallery
Plugin URI: http://test.wiloke.com/wp-content/uploads/2015/03/wiloke-vimeo-gallery.zip
Author URI: wiloke.com
Author: wiloke
Version: 1.1
Description: The easiest way to create beautiful Vimeo galleries on your WordPress site.
License: Under GPL2

Copyright 2014 wiloke (email : piratesmorefun@gmail.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as 
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/


define('PI_VIMEO_URL', plugin_dir_url(__FILE__));
define('PI_VIMEO_PATH', plugin_dir_path(__FILE__));

add_action('wp_enqueue_scripts', 'pi_vimeo_scripts');
add_action('admin_enqueue_scripts', 'pi_vimeo_admin_scripts');
 
function pi_vimeo_admin_scripts()
{
	wp_register_style('pi_bootstrap', PI_VIMEO_URL . 'assets/bootstrap/bootstrap.css', array(), '1.0');
	wp_enqueue_style('pi_bootstrap');

	wp_register_style('pi_vimeo_main', PI_VIMEO_URL . 'admin/source/css/main.css', array(), '1.0');
	wp_enqueue_style('pi_vimeo_main');

	wp_localize_script('jquery', 'PI_VIMEO_URL', PI_VIMEO_URL);
}

function pi_vimeo_scripts()
{
	wp_register_script('pi_html5gallery', PI_VIMEO_URL . 'assets/html5gallery/html5gallery.js', array(), '1.0', true);
	wp_enqueue_script('pi_html5gallery');

	wp_register_script('pi_vimeo_main', PI_VIMEO_URL . 'source/js/main.js', array(), '1.0', true);
	wp_enqueue_script('pi_vimeo_main');
}

add_action('admin_footer', 'pi_vimeo_popup_settings');

add_filter('mce_buttons', 'pi_vimeo_add_button');
function pi_vimeo_add_button($buttons)
{
	array_push($buttons, "pi_vimeo_gallery");
	return $buttons;
}

add_filter('mce_external_plugins', 'pi_vimeo_js');
function pi_vimeo_js($js)
{
	$js['pi_vimeo_gallery'] = PI_VIMEO_URL . 'admin/source/js/shortcode.js';
	return $js;
}

add_shortcode('pi_vimeo_gallery', 'pi_vimeo_gallery_builder');
function pi_vimeo_gallery_builder($atts)
{
	$atts = shortcode_atts(
		array(
			'skin'=>'horizontal',
			'vimeo_link'=>'',
			'page'=>0,
			'type'=>'chanel',
			'width'=>480,
			'height'=>272
		), $atts
	);
	$thumbnail ="";
	$id 	   ="";
	if ( !empty($atts['vimeo_link']) )
	{
		if ( $atts['type'] != 'list'  )
		{
			$id = explode("/", $atts['vimeo_link']);
			$id = array_pop($id);
		}else{
			$aVimeoId = explode(",", $atts['vimeo_link']);
			$listVimeo = "";

			foreach ( $aVimeoId as $link )
			{
				$parse = explode("/", $link);
				$vimeoID = array_pop($parse);
				$id .= $vimeoID . ",";
				$hash = unserialize(file_get_contents("https://vimeo.com/api/v2/video/$vimeoID.php"));
			 	$thumbnail .= $hash[0]['thumbnail_medium'] . ','; 
			}
			$thumbnail = ltrim($thumbnail, ",");
			
			$thumbnail = urlencode($thumbnail);

			
			$id = trim($id, ",");
		}
	}else{
		$id = 0;
	}
	

	$output = "";
	$output .= '<div style="display:none;margin:0 auto;" class="html5gallery pi_html5gallery" data-thumbnail="'.$thumbnail.'" data-skin="'.$atts['skin'].'" data-width="'.$atts['width'].'" data-id="'.$id.'" data-height="'.$atts['height'].'" data-page="'.$atts['page'].'" data-type="'.$atts['type'].'" data-resizemode="fill">';
	$output .= '</div>';
	return $output;
}

function pi_vimeo_popup_settings()
{
	include (PI_VIMEO_PATH . 'tools/popup.php');
}