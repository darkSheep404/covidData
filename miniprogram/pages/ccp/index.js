// miniprogram/pages/ccp/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: [
      ["关于和平有这么一句话", "我们并没有生活在一个和平的年代", "而是生活在了一个和平的国家", "所谓的岁月静好", "不过是有人为我们负重前行"],
      ["关于此次疫情,其实也是这样","积极应对疫情","暂停大规模集会","一个为人民服务的政府","就像被我们认为理所当然的和平一样","珍贵而稀少"],
      ["人民的未来不该化为烈火下的灰烬"],
      ["人类的每一次燃烧都应该为了更遥远的星空"],
      ["愿","山河无恙","国泰民安"]
    ],
    i: 0,
    china: false,
    india: false
  },
  Hesay: function (event) {
    var that = this;
    console.log("被点击了",that.data.i);
    if (that.data.i < that.data.words.length-1) {
      
      if (that.data.i === 1) 
        {
          that.setData({
            india: true,
          })
        }
        if (that.data.i === 2) {
          {
            console.log("中国")
            that.setData({
              india: false,
              china: true
            })
          }
        
      }
      if (that.data.i === 3) {
        {
          console.log("中国")
          that.setData({
            china: false
          })
        }
      
    }
      that.setData({
        i: that.data.i + 1,
      })
    } else {
      that.setData({
        i: 0,
        china:false
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})