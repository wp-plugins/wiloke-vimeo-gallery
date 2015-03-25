;(function($){
    "use strict";

    $(document).ready(function(){
        var $container = $(".pi_html5gallery"), _length = $container.length;

        if ( _length > 0 )
        {   
            var $self, _i = 1, _url, _page, _id, _keepmoving=true;
            $container.each(function(order, o)
            {

                $self = $(this);
                _id = $self.data("id");

                if ( _id != '0' )
                {
                    _page = $self.data("page") != '0' && $self.data("page") != '' ? '?page='+parseInt($self.data("page")) : '';
                    
                    switch($self.data("type"))
                    {
                        case 'channel':
                            _url= 'https://vimeo.com/api/v2/channel/'+_id+'/videos.json'+_page;
                             _keepmoving = true;
                        break;
                        case 'category':
                            _url= 'https://api.vimeo.com/categories/'+_id;
                        break;
                        case 'list':
                            var _urls, _vimeoThumb;
                            _url            = _id.split(",");
                            _vimeoThumb     = $self.data("thumbnail");
                            _vimeoThumb     = decodeURIComponent(_vimeoThumb);
                            _vimeoThumb     = _vimeoThumb.split(",");
                            _urls           = "";
                            for ( var __i in _url )
                            {
                                $self.append('<a href="http://player.vimeo.com/video/'+_url[__i]+'"><img src="'+_vimeoThumb[__i]+'" alt="Vimeo Gallery"></a>');
                            }
                            _keepmoving = false;
                        break;
                    }
                    console.log(_keepmoving);
                    if (_keepmoving)
                    {
                        loadAjax($self, _url, _i, _length);
                    }else{
                        if ( _i == _length  )
                        {
                            loadStyle();
                           
                        }
                    }

                }else{
                    $self.html("<code class='text-center' style='text-align:center; display:block; border: 1px solid red'>Please enter vimeo link</code>")
                }
                _i++;
            })
        }

        function loadAjax($self, _url, _i, _length)
        {
            $.ajax(
            {
                dataType: "json",
                asyns: false,
                type: "get",
                url:_url,
                success: function(res)
                {   
                    var len = res.length;
                    for ( var i in res )
                    {   
                        $self.append('<a href="http://player.vimeo.com/video/'+res[i]['id']+'?title=0&amp;byline=0&amp;portrait=0"><img src="'+res[i]['thumbnail_medium']+'" alt="'+res[i]['title']+'"></a>');
                       
                        if ( _i == _length  && (i == len - 1) )
                        {
                            loadStyle();
                        }
                    }
                },
                error: function(res)
                {
                    $self.html("<code style='font-weight:bold; font-size: 20px; text-align:center; display:block;color:red;'>Not Found Video</code>");
                    $self.css({display:'block'});
                }
            })
        }

        function loadStyle()
        {
            for (var p = document.getElementsByTagName("script"), q = "", n = 0; n < p.length; n++) p[n].src && p[n].src.match(/html5gallery\.js/i) && (q = p[n].src.substr(0, p[n].src.lastIndexOf("/") + 1));
            p = !1;
            if ("undefined" == typeof jQuery) p = !0;
            else if (n = jQuery.fn.jquery.split("."), 1 > n[0] || 1 == n[0] && 6 > n[1]) p = !0;
            if (p) {
                var p = document.getElementsByTagName("head")[0],
                    r = document.createElement("script");
                r.setAttribute("type", "text/javascript");
                r.readyState ? r.onreadystatechange = function() {
                    if ("loaded" == r.readyState || "complete" ==
                        r.readyState) r.onreadystatechange = null, loadHtml5Gallery(q)
                } : r.onload = function() {
                    loadHtml5Gallery(q)
                };
                r.setAttribute("src", q + "jquery.js");
                p.appendChild(r)
            } else loadHtml5Gallery(q)
        }

    })

})(jQuery)