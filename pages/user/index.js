// pages/user/index.js
// 获取用户信息请求模块
import {GetPermission} from "../../request/get_permission"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义用户信息
    userInfo:[],
    // 定义收藏商品的数组长
    collectLength: String

  },


  /** 
   * GetPermission,调用获取用户信息事件
  */
   getUserInfo(e){
    GetPermission.getUserInfo(e);
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    });
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    });
  },


  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
    // 获取收藏的数组
    const collectLength = wx.getStorageSync("collectList").length;
    this.setData({
      collectLength
    });
  },

 /**
  * getAddress获取地址事件
  */
  getAddress(){
    // 获取收获地址API
   wx.chooseAddress({
     success: (result) => {
    // 将地址信息存入缓存中
    wx.setStorageSync("address", result);
     },
   })
  },
})