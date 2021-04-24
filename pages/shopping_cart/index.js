// pages/shopping_cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 定义存入地址的缓存对象
    address:{},
    // 定义存入加入购物车商品的缓存对象
    cart_goods:[],
    // 定义全选状态
    AllFlag:Boolean,
    // 定义选购商品的总数量
    TotalNum:Number,
    // 定义选购商品的总价格
    TotalPrice:Number

  },
  /**
   *  获取用户信息事件
   */
  getUserInfo: function(e){
    console.log(e);
  },


  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
    // 获取缓存中的地址信息
    const address=wx.getStorageSync("address");
    // 获取一添加购物车的缓存
    const cart_goods=wx.getStorageSync("cart")||[];
    this.setData({
      address
    });
    this.SetGoodsCart(cart_goods);
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
   * flagChange复选框事件
   */
   flagChange(e){
    const goodsId = e.currentTarget.dataset.id;
    let {cart_goods} = this.data;
    let index = cart_goods.findIndex(v=>v.goods_id===goodsId);
    // 点击状态取反
    cart_goods[index].flag = !cart_goods[index].flag;
    // 将更改后的数组重新存入本地缓存中
    wx.setStorageSync("cart",cart_goods);
    // 重新计算价格数量
    this.SetGoodsCart(cart_goods);
   },


   /**
    * changeAllFlag 全选按钮改变事件
    */
    changeAllFlag(){
      let {cart_goods,AllFlag} = this.data;
      AllFlag = !AllFlag;
      cart_goods.forEach(v=>v.flag=AllFlag);
      this.SetGoodsCart(cart_goods);
      // 将更改后的数组重新存入本地缓存中
      wx.setStorageSync("cart",cart_goods);
    },


    /**
     * cutNum,减少数量
     */
    cutNum(e){
      let {cart_goods} = this.data;
      let {goods_id} = e.currentTarget.dataset;
      let index = cart_goods.findIndex(v=>v.goods_id===goods_id);
      cart_goods[index].num -=1;
      // 判断，如果商品价格等于0时，删除该商品
      const that = this;
      if(cart_goods[index].num<1){
        wx.showModal({
          title: '提示',
          content: '确认移除该商品吗？',
          success (res) {
            if (res.confirm) {
              // 在数组中删除改商品
              cart_goods.splice(index,1);
              // 将更改后的数组重新存入本地缓存中
              wx.setStorageSync("cart",cart_goods);
              // 重新计算价格数量
              that.SetGoodsCart(cart_goods);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

      // 将更改后的数组重新存入本地缓存中
      wx.setStorageSync("cart",cart_goods);
      // 重新计算价格数量
      this.SetGoodsCart(cart_goods);
    },


    /**
     * addNum,添加数量
     */
    addNum(e){
      let {cart_goods} = this.data;
      let {goods_id} = e.currentTarget.dataset;
      let index = cart_goods.findIndex(v=>v.goods_id===goods_id);
      cart_goods[index].num +=1;
      // 将更改后的数组重新存入本地缓存中
      wx.setStorageSync("cart",cart_goods);
      // 重新计算价格数量
      this.SetGoodsCart(cart_goods);
    },


    /**
     *  pay支付方法
     */
    pay(){
      const {address,TotalNum} = this.data;
      const that = this;
       // 判断是否选择商品
       if(TotalNum===0){
        wx.showToast({
          title: '您还没有选购商品',
          icon: 'error',
          duration: 2000
        });
        return;
      };
      // 判断是否选择收货地址
      if(!address.userName){
        wx.showModal({
          title: '提示',
          content: '请选择您的收货地址',
          success (res) {
            if (res.confirm) {
              // 直接调用选择收货地址方法
              that.getAddress();
            } 
          }
        });
        return;
      };
      // 都满足跳到订单确认界面
      wx.navigateTo({
        url: '/pages/user_pay/index',
      });
    },

   /**
   * 封装价格数量改变的方法
   */
  SetGoodsCart(cart_goods){
     // 获取一添加购物车的缓存
     const AllFlag = cart_goods.length? cart_goods.every(v=>v.flag):false;
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
       cart_goods,
       AllFlag,
       TotalNum,
       TotalPrice
     });
  },
})