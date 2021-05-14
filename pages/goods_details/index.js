// pages/goods_details/index.js
import {request} from "../../request/request.js";
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否有商品详情
    isShow : false,
    // 定义商品详情接收数组
    goodsDetailsItem: {
      num:"",
      flag:"",
    },
    isCollect: Boolean,
    // 定义用户信息
    userInfo: String
  },
  // 定义接口参数
  params: {
    goods_id: ''
  },
  // 定义点击放大图片的url
  largeImgUrl:{},

 // 获取商品的详细信息
  /**
   * 请求数据库goods_detail
   */
 getGoodsDetalis(){
   // 显示加载中图标
   wx.showLoading({
    title: '努力加载中',
    mask:true
  });
  db.collection('goods_detail').where({
    goods_id: this.params.goods_id
  }).get().then(result =>{
     //  关闭加载中图标
     wx.hideLoading();
    console.log(result);
    this.setData({
      isShow: true,
      // 简化接受的参数，优化性能
      goodsDetailsItem:{
        goods_price:result.data[0].message.goods_price,
        goods_name:result.data[0].message.goods_name,
        pics:result.data[0].message.pics,
        goods_id:result.data[0].message.goods_id,
        goods_small_logo:result.data[0].message.goods_small_logo,
        // 正则，部分手机不支持.webp格式图片
        goods_introduce:result.data[0].message.goods_introduce.replace(/\.webp/g,'.jpg'),
      }
    });
    this.largeImgUrl = this.data.goodsDetailsItem.pics;
  });
 },
   /**
   * largeImg放大图片事件
   */  
  largeImg(e){
    const Imgurl = this.largeImgUrl.map(v=>v.pics_mid);
    const index = e.currentTarget.dataset.index;
    //调用 wx.previewImage API
    wx.previewImage({
      current: Imgurl[index], // 当前显示图片的http链接
      urls: Imgurl // 需要预览的图片http链接列表
    })
  },
    /**
     * 加入购物车功能
    */
     addCart(){
       if( !this.data.userInfo.nickName) {
        wx.switchTab({
          url: '/pages/user/index'
        });
          //  弹窗提示
          wx.showToast({
            title: '请先登录',
            icon: 'error',
            // true  
            mask: true
          });
       }
      else {
         // 获取缓存中的购物车 数组,短路语法
    let cart = wx.getStorageSync("cart") || [];
    //  判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.data.goodsDetailsItem.goods_id);
    if (index === -1) {
      //  不存在 第一次添加
      this.data.goodsDetailsItem.num = 1;
      this.data.goodsDetailsItem.flag = true;
      cart.push(this.data.goodsDetailsItem);
    } else {
      //  已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    //  把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    //  弹窗提示
    wx.showToast({
      title: '已经到购物车啦！',
      icon: 'success',
      // true  
      mask: true
    });
      }
     },
      /**
     * 立即购买功能
    */
  pay() {
    if( !this.data.userInfo.nickName) {
      wx.switchTab({
        url: '/pages/user/index'
      });
        //  弹窗提示
        wx.showToast({
          title: '请先登录',
          icon: 'error',
          // true  
          mask: true
        });
     }
    else {
      this.addCart();
      wx.navigateTo({
        url: '/pages/user_pay/index',
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    });
    // 给接口参数赋值
    this.params.goods_id = options.goods_id;
    this.getGoodsDetalis();
    const collectList =  wx.getStorageSync("collectList") || [];
    this.isCollect();
  },

  /**
   * collect收藏/取消收藏按钮
   */
   collect(){
    let collectList = wx.getStorageSync("collectList") || [];
    let index = collectList.findIndex(v => v.goods_id === this.data.goodsDetailsItem.goods_id);
    let isCollect = collectList.some(v => v.goods_id === this.data.goodsDetailsItem.goods_id);
    if (!isCollect) {
      this.data.goodsDetailsItem.isCollect =true;
      collectList.push(this.data.goodsDetailsItem);
      wx.setStorageSync("collectList", collectList);
    } else{
      this.data.goodsDetailsItem.isCollect =false;
      collectList.splice(index,1);
      wx.setStorageSync("collectList", collectList);
    }
    this.isCollect();

   },
   

   /**
    * 判断是否被收藏
    */
   isCollect(){
    const that =this;
    let collectList = wx.getStorageSync("collectList") || [];
    const isCollect = collectList.some(v =>that.params.goods_id == v.goods_id);
    this.setData({
      isCollect
    });
   }
})