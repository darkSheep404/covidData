
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function setOption(chart,option) {
  chart.setOption(option);
}

Page({
  onShareAppMessage: res => {
    return {
      title: '疫苗接种折线图！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  onLoad(){
    var that=this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get_vaccine_data',
      success: function (res) {
        //提取数据--返回的数据为res.result.云函数处定义的字段名.data
        var data = res.result.vaccineData.data
        that.setData({
          vaccineData: data
        })
        //that.data.vaccineData={data:2020};
      },
      fail: console.error
    })

    //无法打印出that.data.vaccineData,不清楚为什么取不到值
    // console.log(that.data)
    // console.log("换行")
    // console.log(that.data.vaccineData)
   
  },
  onReady: function () {
    // 获取组件
    console.log(this.data)
    var temp=this.data
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
  },
  
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    vaccineData:{},
    option : {
      dataset: {
        // 用 dimensions 指定了维度的顺序。直角坐标系中，
        // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
        // 完成映射，参见后文。
        dimensions: ['date', 'total_vaccinations'],
        source:[{date:'2020-12-31',total_vaccinations:100},{date:'2021-12-31',total_vaccinations:200}]
    },
      xAxis: {
          type: 'category',
          //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          //data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
      }]
    }
  },

  // 点击按钮后初始化图表
  initChart: function () {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      console.log(this.data)
      console.log(this.data.vaccineData)
      var that=this
      //并非改变视图层,直接=赋值
      this.data.option.dataset.source=this.data.vaccineData
      // this.setData({
      //  option:that.data.vaccineData
      // })
      console.log(this.data)
      setOption(chart,this.data.option);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  onShow:function(){

    var that = this;
    //this.initChart();
  },
  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  }
});
