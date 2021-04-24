export const GetPermission = {
    //  getUserInfo,获取用户信息
  getUserInfo(e){
    //  获取用户信息,昵称，性别......
    const {userInfo} = e.detail;
    console.log(userInfo);
    // 将用户信息存入缓存中
    wx.setStorageSync("userInfo",userInfo);
 }
}