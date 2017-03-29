//index.js
//获取应用实例
Page({
    onTap(){
        /*wx.navigateTo({
          url: '../posts/post'
        })*/
        wx.redirectTo({
          url: '../posts/post'
        })
    }

});