图表库选为echarts和对应的小程序组件

微信小程序可以设置云函数每天请求一遍当天数据csv,并解析存入数据库?

处理json转换为对象

> 需求:删去多余字段
>
> 按照日期字符串排序

##### 数据处理

> 使用数据库脚本删除不需要的列

[文档链接](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/update.html)

对指定字段即指定列进行更新

```js
//const _ = db.command
db.collection('vaccineChina').where({
  
}).update({
  data: {
    // 表示指示数据库将字段自增 10
    people_fully_vaccinated: _.remove(),
    people_vaccinated:_.remove(),
    location:_.remove(),
    vaccine:_.remove()
  }
  // 删除不需要的字段:地区默认中国,疫苗种类
  //完成接种人数,接种人数:字段为空,数据中使用total_vaccination
  //记载累计接种数目
})
```

![image-20210502225639923](C:/Users/Lenovo/AppData/Roaming/Typora/typora-user-images/image-20210502225639923.png)

> 更新后

![image-20210502225708012](C:/Users/Lenovo/AppData/Roaming/Typora/typora-user-images/image-20210502225708012.png)

> 数据库操作中实现按照日期排列

tips:

> 监听数据库使用云函数进行数据推送
>
> 可结合模板消息

> 排序
>
> 字符串需进行格式转换
>
> 可以直接使用接种疫苗数量排序



wexin-echart组件使用

组件文件夹`ec-canvas`,内部`echart.js`即为`web`的`echart.js`

可以官网选最新版或者官网`自定义构建`减小组件大小

`ec-canvas`

参照pages/bar目录下页面建立项目

`index.json`

```json
{
  "usingComponents": {
    "ec-canvas": "../../ec-canvas/ec-canvas"
  }
}
```

`wxml`中创建`<ec-canvas>`组件

```html
<view class="container">
  <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

样式问题没有宽高需要参考修改

`ec`是`js`中定UI

```js
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
    ...
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});
```

>  更改option内容即可改变图表

>  如何延迟加载图表？

参见 `pages/lazyLoad` 的例子，可以在获取数据后再初始化数据。

>  一个页面中加载多个图表？

参见 `pages/multiCharts` 的例子。

> 如何保存为图片？
>
> 参见 `pages/saveCanvas` 的例子

建议调试时使用未压缩版本，发布时使用压缩版本，否则文件会太大无法发布

下载的文件放在 `ec-canvas/echarts.js`，**注意一定需要重命名为 `echarts.js`**

> 小程序端如何设置为暗色模式:直接div设置bgcolor

> [Echarts单独数据集声明](https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20dataset%20%E7%AE%A1%E7%90%86%E6%95%B0%E6%8D%AE)
>
> 之前数据只能声明在各个series中
>
> 需要手动切割点横纵坐标,横坐标为一个数组,纵坐标为一个
>
> Echarts4提供数据集dataset声明数据
>
> 

`function initChart`不能改放到页面外,否则报错initChart not defined

this.data.vaccineData无法打印出来的问题

改用LazyLoad示例,点击按钮加载图表

> 直接onshow中使用this.init()调用方法报错undefine
>
> 直接onshow中调用事件监听函数仍有错误,疑似关于onload类函数中的this指向问题
>
> 注释后可以通过点击按钮加载图表

`修改方向`

> https://blog.csdn.net/qq_44776950/article/details/108270724
>
> 将云函数获取到的数据加载到图表中,可参考

