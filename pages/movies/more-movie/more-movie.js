// pages/movies/more-movie/more-movie.js
var app = getApp();
var utils = require ('../../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:'', 
    navigateTitle: "",
    requestUrl:'',
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = ""
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case "top250":
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.data.requestUrl = dataUrl;
    utils.http(dataUrl, this.processdoubanData)
  },
  processdoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        stars: utils.covertToStarsArray(subject.rating.stars / 10),
        title: title,
        average: subject.rating.average,
        coverageURl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    // 上拉加载，数据concat
    var totalMovies = {};
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies = movies;
      this.data.isEmpty = false
    }
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
    this.data.totalCount += 20;    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function () {

      }
    })
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
    this.data.movies = {};
    this.data.isEmpty = true;
    var refreshUrl = this.data.requestUrl + '?start=0&count=20';
    utils.http(refreshUrl, this.processdoubanData)
    wx.showNavigationBarLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    utils.http(nextUrl, this.processdoubanData)
    wx.showNavigationBarLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})