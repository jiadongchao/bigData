
(function($,window,doc){
  var pageFn ={};
  pageFn = {
    init:function () {
      this.getData()
    },
    getData:function () {
      var _this = this;
      $.ajax({
        url:"./json/echartJson/0-0-0.json",
        type:"GET",
        dataType:"json",
        success:function (result) {
          _this.echartFn("echart0",result)
        }
      })
    },
    echartFn: function (id,option){
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption(option,true);
  }

  };
  $(function(){
    pageFn.init();
  })

})(jQuery,window,document);