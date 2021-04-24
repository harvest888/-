// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     // 定义标签选项卡数据
     tabs:[
      {
        title: "收藏的店铺",
        isActive: true,
        id:"0"
      },
      {
        title: "收藏的商品",
        isActive: false,
        id:"1"
      },
      {
        title: "关注的商品",
        isActive: false,
        id:"2"
      },
      {
        title: "我的足迹",
        isActive: false,
        id:"3"
      }
    ],
    // 收藏数据
    collectList:[]
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取收藏的数组
    const collectList = wx.getStorageSync("collectList");
    this.setData({
      collectList
    });

    // 获取我的界面传过来的值
    const {index} = options;
    const {tabs}=this.data;
    tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false);
    // 重新赋值
    this.setData({
      tabs:tabs
    });
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