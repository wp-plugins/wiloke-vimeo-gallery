<div id="pi-vimeo-popup-wrapper" style="display:none;">
	
	<div class="container-fluid" style="width: 100%; max-width:100%">
		<div class="row">
				
			<form action="" id="pi-vimeo-form-channel" class="pi_channel pi_only_one pi_form_setting" data-form="channel">
				<div class="form-group">
					<label  class="form-label"><?php _e('Enter channel Link', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item channel_link" name="vimeo_link" value="">
					<code><a target="_blank" href="https://www.youtube.com/watch?v=k8T9vaugs6o">Get</a> channel link</code>
				</div>
			</form>

		<!-- 	<form action="" id="pi-vimeo-form-category" class="pi_user pi_only_one pi_form_setting" data-form="category">
				<div class="form-group">
					<label  class="form-label"><?php _e('Enter Category Link', 'wiloke') ?></label>
					<input type="text" class="form-control pi_item category_link" name="vimeo_link" value="">
					<code><a target="_blank" href="https://vimeo.com/categories">Vimeo Categories</a></code>
				</div>
				<div class="form-group">
					<input type="hidden" class="form-control pi_item" name="type" value="category">
				</div>
			</form> -->

			<form action="" id="pi-vimeo-form-list" class="pi_user pi_only_one pi_form_setting" data-form="list">
				<div class="form-group">
					<label  class="form-label"><?php _e('Enter Vimeo Link', 'wiloke') ?></label>
					<p><code><?php _e("Using comma between each link") ?></code></p>
					<input type="text" class="form-control pi_item list_of_link" name="vimeo_link" value="">
				</div>
			</form>

			
			
			<div class="pi_general_settings">
				<h3 class="pi_click_toggle"><?php _e("General Settings", "wiloke") ?></h3>
				<form action="" id="pi-vimeo-general-settings" class="pi_general pi_form_setting">
					<div class="form-group">
						<label  class="form-label"><?php _e('Skin', 'wiloke') ?></label>
						<select name="skin" id="skin" class="form-control pi_item">
							<option value="darkness"><?php _e("darkness", "wiloke"); ?></option>
							<option value="gallery"><?php _e("gallery", "wiloke"); ?></option>
							<option value="showcase"><?php _e("showcase", "wiloke"); ?></option>
							<option value="horizontal"><?php _e("horizontal", "wiloke"); ?></option>
							<option value="vertical"><?php _e("vertical", "wiloke"); ?></option>
							<option value="light"><?php _e("light", "wiloke"); ?></option>
						</select>
					</div>

					<div class="form-group">
						<label  class="form-label"><?php _e('The page number to show.', 'wiloke') ?></label>
						<p><code><?php _e("Leave empty to get all") ?></code></p>
						<input type="text" class="form-control pi_item" name="page" value="">
					</div>
					<div class="form-group">
						<label  class="form-label"><?php _e('Width.', 'wiloke') ?></label>
						<input type="text" class="form-control pi_item" name="width" value="480">
					</div>
					<div class="form-group">
						<label  class="form-label"><?php _e('Height.', 'wiloke') ?></label>
						<input type="text" class="form-control pi_item" name="height" value="272">
					</div>
				</form>
			</div>

		<div class="form-group">
			<button id="pi-vimeo-save" class="button button-primary pi-popup-save"><?php _e('Save', 'wiloke') ?></button>
			<button id="pi-vimeo-cancel" class="button button-primary pi-popup-cancel"><?php _e('Cancel', 'wiloke') ?></button>
		</div>

	</div>

</div>