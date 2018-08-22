(function(){


    //区域滚动引用插件的方法
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0003, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        scrollY: true, //是否竖向滚动
        indicators: false,//是否显示滚动条
        bounce: true //是否启用回弹
    });
    //图片轮播
    var gallery = mui('.mui-slider');
        gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});
})();