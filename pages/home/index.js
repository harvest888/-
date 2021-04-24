// pages/home/index.js
// 导入request请求模块
import {request} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义轮播图数组
    swiperList: Array,
    // 定义分类导航数组
    navlist: Array,
    // 定义分类展示数据数组
    displayList: Array
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求获取轮播图数据
    this.getSwiperList();
    // 发送请求获取导航数据
    this.getNavList();
    // 发送请求获取分类展示数据
    this.getClassifiedDisplay();
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

  },

  //  自定义方法

  // 获取轮播图数据
  /**
   * 请求接口 https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
   */
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result =>{
      this.setData({
        swiperList: result.data.message
      })
    },err=>{
      console.log(err);
    });
  },
  // 获取分类导航数据
  /**
   * 请求接口 https://api-hmugo-web.itheima.net/api/public/v1/home/catitems
   */
  getNavList(){
    request({url:"/home/catitems"})
    .then(result =>{
      this.setData({
        navlist: result.data.message
      })
    },err=>{
      console.log(err);
    });
  },
  // 获取分类展示数据
  /**
   * 请求接口 https://api-hmugo-web.itheima.net/api/public/v1/home/floordata
   */
  getClassifiedDisplay(){
    request({url:"/home/floordata"})
    .then(result =>{
      this.setData({
        displayList: result.data.message
      })
    },err=>{
      console.log(err);
    });
  }
})