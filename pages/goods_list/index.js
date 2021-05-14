// pages/goods_list/index.js
import {request} from "../../request/request.js";
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义标签选项卡数据
    tabs:[
      {
        title: "综合",
        isActive: true,
        id:"0"
      },
      {
        title: "销量",
        isActive: false,
        id:"1"
      },
      {
        title: "价格",
        isActive: false,
        id:"2"
      }
    ],
    // 接受数组
    goodsList:[],
  },
  // 定义接口要的传参
  params:{
    query:"",
    cid:"",
    pagenum:"",
    pagesize:"10"
  },
  // 监听子组件传值得事件
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

 // 获取商品列表
  /**
   * 
   */
  getGoodsList(){
    wx.showLoading({
      title: '努力加载中',
      mask:true
    });
    db.collection('goods_list').where({
      name: this.params.cid
    }).get().then(res=>{
       //  关闭加载中图标
       wx.hideLoading();
       console.log(res)
       this.setData({
         goodsList:[...res.data[0].message.goods,...this.data.goodsList],
       });
       // 数据回来关闭下拉刷新窗口
       wx.stopPullDownRefresh();
    
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options为页面参数
    this.params.cid = options.cid || "";
    this.params.query = options.query || "";
    this.getGoodsList();
  },
  // 获取商品列表数据
  

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
    this.setData({
      goodsList:[]
    });
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     // 到底提示
     wx.showToast({
      title: '已经到底啦！',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})