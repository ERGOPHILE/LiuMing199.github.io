(function(){
    //绘制图
      //创建图表
        //1-创建一个echarts实例
        var myChart1 = echarts.init(document.getElementById('can_left'));
        //2-准备图表单的数据
        //以上都是春哥虚拟的数据，不要当真哦！
        var option1 = {
                // 大标题
    title: {
        text: '2017年注册人数'
      },
      // 提示框组件
      tooltip: {},
      // 图例
      legend: {
        data:['人数']
      },
      // x轴的数据
      xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
      },
      // y 轴的刻度, 根据数据自动生成比较合适
      yAxis: {},
      // 数据
      series: [{
        name: '人数',
        // 表示柱状图
        type: 'bar',
        data: [1000, 1500, 1800, 1200, 1000, 500]
      }]
    };

        //3-将数据传递给echart实例，生成图表
        myChart1.setOption(option1);


          //1-创建一个echarts实例
          var myChart2 = echarts.init(document.getElementById('can_right'));
          //2-准备图表单的数据
          var option2 = {
                  title : {
                      text: '热门品牌销售',
                      subtext: '2017年6月',
                      x:'right'
                  },
                  tooltip : {  //提示工具
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c}--- ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'left',
                      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
                  },
                  series : [
                      {
                          name: '访问来源',
                          type: 'pie',//设置采用什么图
                          radius : '70%', // 圆直径 
                          center: ['50%', '60%'],//左右 上下
                          data:[
                              {value:335, name:'耐克'},
                              {value:310, name:'阿迪'},
                              {value:234, name:'新百伦'},
                              {value:135, name:'李宁'},
                              {value:1548, name:'阿迪王'}
                          ],
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 100,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(255, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
              };
  
          //3-将数据传递给echart实例，生成图表
          myChart2.setOption(option2);
})();