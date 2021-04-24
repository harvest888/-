// pages/search/index.js
// 引入请求模块
import {request} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue:String,
    // 搜索商品的信息
    serchInfoList:[],
    // 定义状态位
    isFocus:false

  },


  /** 
   * inputValue
   */
   inputValue(e){
    this.setData({
      isFocus:true,
    })
    const {value} = e.detail;
    // trim()去除字符串的头尾空格:
    if(!value.trim()){
      return;
    }
    // 查询数据
    const {data} = wx.getStorageSync("localData");
    this.searchGoods(data,value);
   },


  /** 
   * 数据查询方法
  */
  searchGoods(array,key){
    const that = this;
    array.forEach(v => {
      // console.log(v.children);
      v.children.forEach(v=>{
        if(v.children){
          v.children.forEach(v=>{
            if(v.cat_name==key){
              let serchInfoList = [];
              serchInfoList.push(v);
              that.setData({
                // 赋值回去
                serchInfoList:serchInfoList
              })
            }
          })
        }
       
      })
    });
  },


  /** 
   * cancel取消事件
  */
  cancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      serchInfoList:[]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const info = wx.getStorageSync("");
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