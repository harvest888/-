// pages/home/index.js
// 导入request请求模块
import {request} from "../../request/request.js"

// 连接数据库
const db = wx.cloud.database()
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
   * 查询数据库表home_banner
   */
  getSwiperList(){
     db.collection('home_banner').doc('1ace8ef16093e95a00ac5aff0491b3ec').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      this.setData({
        swiperList: res.data.message
      })
      console.log(res)
    })
  },
  // 获取分类导航数据
  /**
   * 请求数据库home_nav
   */
  getNavList(){
    db.collection('home_nav').doc('658e9e576093f5ea0c2e0c8f5236493e').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      this.setData({
        navlist: res.data.message
      })
      console.log(res)
    })
  },
  // 获取分类展示数据
  /**
   * 请求数据库home_floor
   */
  getClassifiedDisplay(){
    db.collection('home_floor').doc('5b00f9706093f6d408f6d4593a62b7fc').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      this.setData({
        displayList: res.data.message
      })
      console.log(res)
    })
  }
})