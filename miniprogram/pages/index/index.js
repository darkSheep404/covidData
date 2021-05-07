import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height, dpr) {
  
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
    darkmode:true
  });
  canvas.setChart(chart);
  var option = {
    darkmode:true,
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [{
        name: 'Pressure',
        type: 'gauge',
        detail: {
            formatter: '{value}'
        },
        data: [{
            value: 21
        }]
    }]
};
//分割线
//分割线
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },
 
  onShareAppMessage: function (res) {
    return {
      title: '新冠疫苗',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  toccp:function(event){
    console.log("123");
    wx.navigateTo({
      url:'../ccp/index'
    })
  },
  tocondition:function(event){
    console.log("123");
    wx.navigateTo({
      url:'../condition/index'
    })
  },
  toattention:function(event){
    console.log("123");
    wx.navigateTo({
      url:'../attention/index'
    })
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});
