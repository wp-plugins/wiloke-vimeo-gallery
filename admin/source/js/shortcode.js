;(function($, window, document, undefined){
	"use strict"

	$(document).ready(function()
	{
		var imgPlaceholder = PI_VIMEO_URL + 'admin/asset/placeholder.png',
			_oFormControl  = {
				list: '#pi-vimeo-form-list',
				channel: '#pi-vimeo-form-channel'
			};

		tinymce.PluginManager.add('pi_vimeo_gallery', function( editor, url ) 
		{
			editor.addButton('pi_vimeo_gallery',
			{
					text: 'Wiloke Vimeo Gallery',
			       	icon: false,
			       	type: 'menubutton',
			       	menu: [
			       		{	
							text: 'channel',
							onclick: function()
							{ 	
								$(".pi_form_setting").removeClass("active");
								tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId=pi-vimeo-popup-wrapper");
								$(".pi_only_one").addClass("hidden");
								$("#pi-vimeo-form-channel").addClass("active").removeClass("hidden");
							},
						},
						{
							text: 'List',
							onclick: function()
							{ 	
								$(".pi_form_setting").removeClass("active");
								tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId=pi-vimeo-popup-wrapper");
								$(".pi_only_one").addClass("hidden");
								$("#pi-vimeo-form-list").addClass("active").removeClass("hidden");
							},
						}
			       	]
			});

			editor.onBeforeSetContent.add(function(ed, o)
			{
				o.content = piReplaceShortcodeWithImg(o.content, ed);
			})



			editor.onExecCommand.add( function(ed, cmd)
			{
				if (cmd === 'mceInsertContent')
				{	
					var _getContent = tinyMCE.activeEditor.getContent();
					tinyMCE.activeEditor.setContent( piReplaceShortcodeWithImg(_getContent, ed) );
				}
			})

			editor.onPostProcess.add(function(ed, o) 
			{
				if (o.get)
				{
					o.content = piReplaceImgWithShortcode(o.content);
				}
			});

			editor.onInit.add(function(ed)
			{
				piEditShortcode(ed);
			})

		})
			
		function piEditShortcode(ed)
		{
			var _self = this, $oInfo = {}, _params = ['vimeo_link', 'type', 'skin', 'page', 'width', 'height'];
			ed.on( 'mousedown', function( event ) 
			{
				var _target,  _getData, $shortcodeId, parseData, _regex, $control = $("#pi-vimeo-popup-wrapper"), $formControl="";
				_target = event.target;
				
				if ( _target  )
				{
					if ( $(_target).attr("data-command") == "pi-vimeo-edit" )
					{
						parseData = function(s, n)
						{
							n = new RegExp(n + '=[\"\']([^\"\']+)[\'\"]', 'g').exec(s);
							return n ? tinymce.DOM.decode(n[1]) : '';
						}

					 	if($(_target).attr("data-mce-selected") == 1)
						{
							_getData = $(_target).data("shortcodes");
							$shortcodeId = parseData(_getData, 'data_shortcodeid');						
							
							for ( var i in _params )
							{
								_regex 	= new RegExp(_params[i]+'=\'([^\']*)', 'g');
								_target = _regex.exec(_getData)
								
								_target = _target ? _target[1] : "";

								/*=========================================*/
								/*	Hidden Other Setting
								/*=========================================*/
								if ( _params[i] == 'type' )
								{
									$(".pi_only_one").addClass("hidden");
									$(_oFormControl[_target]).addClass("active").removeClass("hidden");
									console.log(_oFormControl[_target]);
								}


								$control.find("[name='"+_params[i]+"']").val(_target);


							}
							tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId=pi-vimeo-popup-wrapper");
						}
					}
				}		
			})
		}

		function piReplaceShortcodeWithImg(co, ed)
		{

			var reg;
			reg = new RegExp('\\[(pi_vimeo_gallery)([^\\]]*)\\]', 'g');
			return co.replace( reg, function(match, shortcode, attr)
			{
				return "<img data-mce-placeholder='true' src='"+imgPlaceholder+"' class=\'pi-edit-vimeo-gallery data-mce-placeholder mceItem\'  data-shortcodes='"+tinymce.DOM.encode(attr)+"' data-command=\'pi-vimeo-edit\'>";
			})
		}

		function piReplaceImgWithShortcode(co)
		{
			var _gAttrs, _shortcode;
			function getAttrs(s, n)
			{
				n = new RegExp(n + '=\"([^\"]+)\"', 'g').exec(s);
				if ( n )
				{
					return tinymce.DOM.decode(n[1]);
				}else{
					return '';
				}
			};

			function getShortcode(s, n)
			{
				n = new RegExp(n + '=[\"\']([^\"\']+)[\'\"]', 'g').exec(s);
				return n  ? tinymce.DOM.decode(n[1]) : '';
			}

			return co.replace(/(?:<p[^>]+>)*(<img[^>]+>)(?:<\/p>)*/g, function(match, img)
			{
			 	_gAttrs      = getAttrs(img, 'data-shortcodes');
			 	_shortcode   = getShortcode(img, 'data_shortcodeid');

				if ( _shortcode == 'pi_vimeo_gallery' )
				{
					return '['+tinymce.trim(_shortcode)+' '+tinymce.trim(_gAttrs)+']';
				}
				return match;
			})			
		}


		if ( !$().pi_toggle )
		{
			$.fn.pi_toggle = function()
			{
				var _class = "";
				$(this).click(function()
				{	

					_class = $(this).data("pattern");
					if ( typeof _class !='undefined' )
					{
						$(this).nextUntil(_class).slideToggle();
					}else{
						$(this).nextAll().slideToggle();
					}
					
					return false;
				});
			}
		}


		function pi_reset()
		{
			document.getElementById("pi-vimeo-form-channel").reset();
			document.getElementById("pi-vimeo-form-list").reset();		
		}
		

		if ( !$().getContent )
		{
			$.fn.getContent = function()
			{
				var $items = $(this).find(".pi_item"), _aSettings = [], _setting;
				
				$items.each(function()
				{
					_setting  = $(this).attr("name") + "='" + $(this).val() + "'";
					_aSettings.push(_setting);
				})
				
				_setting = _aSettings.join(" ");
				_setting = _setting.trim();

				return _setting;
			}
		}

		
		$(".pi_toggle").pi_toggle();
		$(".pi_click_toggle").pi_toggle();

		$("#pi-vimeo-save").click(function()
		{
			var _settings = "", _generalSettings="", _currentHandle, _allow=true, _type="";

			_currentHandle = $(".pi_form_setting.active").data("form");

			switch ( _currentHandle )
			{
				case 'channel':
					if ( $(".channel_link").val() == "" )
					{
						_allow = false;
					}
					break;

				case 'category':
					if ( $(".category_link").val() == "" )
					{
						_allow = false;
					}
					break;
				case 'list':
					if ( $(".list_of_link").val() == "" )
					{
						_allow = false;
					}
					break;
			}

			if ( _allow == true )
			{
				_settings = $(".pi_form_setting.active").getContent();
				_generalSettings = $("#pi-vimeo-general-settings").getContent();
				_type 	= $(".pi_form_setting.active").data("form");
				_settings = '<div class="pi_vimeo_gallery_wrapper">[pi_vimeo_gallery '+ _settings + ' type=\''+_type+'\' ' +_generalSettings+' data_shortcodeid=\'pi_vimeo_gallery\']</div>';
				tinyMCE.activeEditor.execCommand('mceInsertContent', 0, _settings);
				pi_reset();
				tb_remove();
			}else{
				alert("Please fill all required");
			}
			return false;
		})

		$("#pi-vimeo-cancel").click(function(){
			pi_reset();
			tb_remove();
		})

		
	})
})(jQuery, window, document);