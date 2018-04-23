
(function($,window,doc){
  var pageFn ={};
  pageFn = {
    init:function () {
      this.navAutoChange();
      this.navFn();
      this.getMenuFn(0);
      this.loadHtml(0,"0-0-0");
    },
    data:{
      getMenuUrl:"./json/menu",
      tag:0,
    },
    /*
    * 导航自适应
    * */
    navAutoChange:function () {
      var $li = $(".nav_li");
      var liWidth = $li.width();
      var maxWidth = ($li.length)*liWidth;
      var $more_li = $(".more_li");
      var $more_nav = $(".more_nav");
      windowResize();
      $more_li.on("mouseover",function () {
        $(".tri_icon").show();
        $more_nav.show();
      }).on("mouseout",function () {
        $(".tri_icon").hide();
        $more_nav.hide();
      });
      $(window).resize(function () {
        window.setTimeout(windowResize, 100)
      });
      function windowResize(){
        var $navWrap = $(".navWrap");
        var nowWidth = $navWrap.width();
        var n=0;
        if(nowWidth<maxWidth){
          $more_li.show();
          $li.show();
          $more_nav.empty();
          n= Math.ceil((maxWidth - nowWidth)/liWidth)+2;
          for(var i=1;i<n;i++){
            $li.eq(-i).hide();
            $li.eq("-"+i).clone(true).appendTo($more_nav).show();
          }
        }else{
          $li.show();
          $more_li.hide();
          $more_nav.empty();
        }
      }
    },
    /*
    * 导航点击事件函数
    * */
    navFn:function(){
      var _this = this;
      $(".nav_li_a").on("click",function(){
        if($(this).closest(".nav_li").hasClass("nav_li_act")){
          return;
        }
        $(".nav_li").removeClass("nav_li_act");
        $(this).parent().addClass("nav_li_act");
        var _tag = $(this).data("tag");
        var defaultUid = _tag+"-0-0";
        _this.data.tag = _tag;
        _this.getMenuFn(_tag);
        _this.loadHtml(_tag,defaultUid);

      })
    },
    /*
    * 获取左侧菜单
    *
    * */
    getMenuFn:function (n) {
      var _this = this;
      var $sideMenu = $(".side-menu");
      $.ajax({
        url:_this.data.getMenuUrl+n+".json",
        type:"GET",
        dataType:"json",
        success:function (result) {
          if(result.code =="200"){
            var dataArray = result.data;
            $sideMenu.empty();
            for(var i =0;i<dataArray.length;i++){
              var tempStr ="";
              for(var j=0;j<dataArray[i].menuChild.length;j++){
                var childStr = '<li><a class="target" tabindex="-1" href="javascript:void(0);" target="indexFrame"  data-uri='
                                +dataArray[i].menuChild[j].uri+ '><i class="fa fa-fw fa-cny"></i>'
                                +dataArray[i].menuChild[j].menuName+'</a></li>';
                tempStr+= childStr
              }
              var str = '<li><a><i class="fa fa-pencil-square-o"></i>'
                        +dataArray[i].menuName+'<span class="fa fa-chevron-down"></span></a><ul class="nav child_menu" style="">'
                        +tempStr+'</ul></li>';
              $sideMenu.append(str)
            }
            _this.loadContentFn();
            $("body").append('<script type="text/javascript" src="lib/custom/custom.min.js"></script>');

          }
        }
      })
    },
    /*
    * 加载内容区
    * */
    loadContentFn:function () {
      var _this = this;
      var $container = $(".container");
      var $target = $(".target");

      $target.on("click",function (event) {
        /*阻止冒泡*/
        event.stopPropagation? event.stopPropagation():event.cancelBubble=true;
        var uri = $(this).data("uri");
        var tag = _this.data.tag;

        if($(this).parent().hasClass("active")){
          return;
        }
        $(".side-menu").find(".active").removeClass("active");

        $container.empty();
        _this.loadHtml(tag,uri);

        return false;
      })
    },
    /*
    * 加载html
    * */
    loadHtml:function(tag,uri){
      var _this =this;
      var $container = $(".container");
      $.ajax({
        url:"./views/page"+tag+"/"+uri+".html",
        success:function(data){
          $container.html(data);
          _this.loadJs(tag,uri);
        }
      });
    },
    /*
    * 加载js
    * */
    loadJs:function (tag,uri){
    $.ajax({
      url:"./js/page"+tag+"/"+uri+".js"
    });
  }


  };
  $(function(){
    pageFn.init();
  })

})(jQuery,window,document);
