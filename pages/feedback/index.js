// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上传的图片
    chooseImg:[]
  },

  /**
   * ChooseImg选择图片事件
   */
   ChooseImg(){
     const that = this;
    //  调用获取本地图片api
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          chooseImg:[...tempFilePaths,...that.data.chooseImg]
        });
      }
    })
   },

   /**
    * delete删除图片事件
    */
    delete(e){
      const {index} = e.currentTarget.dataset;
      let {chooseImg} = this.data;
      chooseImg.splice(index,1);
      this.setData({
        chooseImg
      });
    }
})