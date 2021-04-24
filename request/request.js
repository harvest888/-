// 定义发送请求次数
let reqTimes = 0;

// 该模块用于处理请求
export const request=(params)=>{
    reqTimes++;
    // 显示加载中图标
    wx.showLoading({
        title: '努力加载中',
        mask:true
      })
    // 定义公共的url
    const baseUrl ="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
        // spread扩展运算符，接受参数
         ...params,
         url:baseUrl+params.url,
         success:(result)=>{
             resolve(result);
         },
         fail:(err)=>{
             reject("服务器请求错误");
         },
         complete:()=>{
            reqTimes--;
            if(reqTimes===0){
                //  关闭加载中图标
                wx.hideLoading();
            }
            
         }
        });
          
    })
}