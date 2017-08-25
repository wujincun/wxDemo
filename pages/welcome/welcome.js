//index.js
//获取应用实例
Page({
  onTap() {
    wx.switchTab({
      url: '../posts/post'//不可以与导航路径相同，要不不生效
    })
  }
});