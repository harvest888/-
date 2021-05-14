// pages/category/index.js
// 导入request请求模块
import {request} from "../../request/request.js"
// 连接数据库
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据库返回的分类数据
    categoryList: Array,
    // 将要显示的左侧菜单数据
    leftList: Array,
    // 右侧的内容
    rightContent: Array,
    // 定义索引，被点击时激活类
    nowIndex: 0,
    storageData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 做本地存储，缓存
    // 获取缓存
    const storageData = wx.getStorageSync("localData");
    // 数据为空重新请求
    if (!storageData) {
      this.getCategory();
    }else{
      // 有数据定义过期时间
      if(Date.now() - storageData.time > 10000){
        // 重新发送请求
        this.getCategory();
      }else{
        // 使用本地数据渲染
        this.categoryList = storageData.data;
        let leftList = this.categoryList.map(v=>v.cat_name);
        let rightContent = this.categoryList[0].children;
         this.setData({
           leftList:leftList,
           rightContent:rightContent
         });
      }
    }
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
  // 自定义方法
  // 获取分类展示数据
  /**
   * 请求数据库category_goods
   */
  getCategory(){
    // 显示加载中图标
    wx.showLoading({
      title: '努力加载中',
      mask:true
    });
    db.collection('category_goods').doc('247d14ad6093f77f0097511548835c78').get().then(res => {
        //  关闭加载中图标
        wx.hideLoading();
      this.categoryList = res.data.message;
      // 将数据存入本地
      wx.setStorageSync("localData",{time:Date.now(),data: this.categoryList})
      // map 遍历
     let leftList = this.categoryList.map(v=>v.cat_name);
     let rightContent = this.categoryList[0].children;
      this.setData({
        leftList:leftList,
        rightContent:rightContent
      });
      console.log(res)
    })
  },
  // 左侧菜单的点击事件
  clickTitle(e) {
    const index = e.currentTarget.dataset.index
    let rightContent = this.categoryList[index].children;
    this.setData({
      nowIndex:index,
      rightContent:rightContent
    });
   
  }
})