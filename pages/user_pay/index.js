// pages/shopping_cart/index.js
// 获取用户信息请求模块
import {GetPermission} from "../../request/get_permission"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 定义存入地址的缓存对象
    address:{},
    // 定义存入加入购物车商品的缓存对象
    cart_goods:[],
    // 定义选购商品的总数量
    TotalNum:Number,
    // 定义选购商品的总价格
    TotalPrice:Number,
    // 定义用户信息
    userInfo:[],
    // 定义已经购买的商品
    payGoods:[]
  },


  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
    // 获取缓存中的地址信息
    const address=wx.getStorageSync("address");
    // 获取一添加购物车的缓存
    let cart_goods=wx.getStorageSync("cart")||[];
    // 拿到选中的商品
    cart_goods=cart_goods.filter(v=>v.flag);
   // 总价格和总数量
   let TotalNum = 0;
   let TotalPrice = 0;
   cart_goods.forEach(v=>{
    if(v.flag){
      TotalNum+=v.num;
      TotalPrice+=v.num*v.goods_price;
    }
  });
  this.setData({
    address,
    cart_goods,
    TotalNum,
    TotalPrice,
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
 * getAddress获取地址的方法
 * */ 
  getAddress(){
    // 获取收获地址API
   wx.chooseAddress({
     success: (result) => {
    // 将地址信息存入缓存中
    wx.setStorageSync("address", result);
     },
   })
  },


  /**
   * payment支付方法
   */
   payment(){
     const that = this;
     const msg = '支付金额 : '
    wx.showModal({
      title: '支付',
      content: `${msg}` + this.data.TotalPrice,
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/order_list/index',
          });
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          });
          // payGoods
          let payGoods = wx.getStorageSync("payGoods")||[];
          payGoods = (that.data.cart_goods).concat(payGoods)
          // 支付成功后，将已加入购物车的商品删除，购买的商品重新存入缓存
          wx.setStorageSync("payGoods",payGoods);
          // 获取购物车的缓存
          let noPay_goods=wx.getStorageSync("cart")||[];
          // 拿到没有支付的商品的商品
          noPay_goods=noPay_goods.filter(v=>{
            if(v.flag === false){
              return true;
            }
          });
        //  把没有支付的商品重新丢回购物车中
         wx.setStorageSync("cart",noPay_goods);
        // 将没有支付的商品放入待付款中
        wx.setStorageSync("waitpayGoods",noPay_goods);
        } else if (res.cancel) {
          wx.showToast({
            title: '支付取消',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
   },


  //  getUserInfo
  getUserInfo(e){
    GetPermission.getUserInfo(e);
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    });
   },
})