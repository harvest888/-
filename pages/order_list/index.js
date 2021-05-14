// pages/order_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     // 定义标签选项卡数据
     tabs:[
      {
        title: "全部",
        isActive: true,
        id:"0"
      },
      {
        title: "待付款",
        isActive: false,
        id:"1"
      },
      {
        title: "待收货",
        isActive: false,
        id:"2"
      },
      {
        title: "退货/换货",
        isActive: false,
        id:"3"
      }
    ],
     // 定义已买商品的缓存对象
     pay_goods:[],
    //  待付款商品
     waitpayGoods:[]
  },


   /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
      // 获取我的界面传过来的值
      const {index} = options;
      const {tabs}=this.data;
      // 判断是否有值
      if(index){
        tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false);
      // 重新赋值
      this.setData({
        tabs:tabs
      });
      }
    },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
    let pay_goods=wx.getStorageSync("payGoods")||[];
    let waitpayGoods = wx.getStorageSync("waitpayGoods")||[];
    this.setData({
      pay_goods,
      waitpayGoods
    });
  },

  /** 
   *  监听子组件传值得事件
  */
  getItemChange(e){
    // 获取子组件传过来的索引值
    const {index} = e.detail;
    // 修改定义的标题数组
    const {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 重新赋值
    this.setData({
      tabs:tabs
    });
  },


 /** 
  * 
 */ 
  
})