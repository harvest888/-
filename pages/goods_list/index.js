// pages/goods_list/index.js
import {request} from "../../request/request.js";
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
  // 定义总页数
  pages:"",
  // 商品总条数
  totalLists:"",
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
   * 请求接口https://api-hmugo-web.itheima.net/api/public/v1/goods/search
   */
  getGoodsList(){
    request({url:"/goods/search",data:this.params})
    .then(result =>{
      // 获取商品总条数
      this.totalLists = result.data.message.total;
      // 获取总页数,Math.ceil向上取整函数
      this.pages = Math.ceil(this.totalLists / 10);
      this.setData({
        goodsList:[...result.data.message.goods,...this.data.goodsList],
      });
      // 数据回来关闭下拉刷新窗口
      wx.stopPullDownRefresh();
    },err=>{
      console.log(err);
    });
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
    this.params.pagenum = 1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.params.pagenum>=this.pages){
      // 到底提示
      wx.showToast({
        title: '已经到底啦！',
      })
    }else{
      this.params.pagenum++;
      this.getGoodsList();    
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})