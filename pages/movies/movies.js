var app = getApp();
var utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    containerShow:true,
    searchPanelShow:false,
    searchResult:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';    
    this.getMovieListData(inTheatersUrl,'inTheaters','正在热映');
    this.getMovieListData(comingSoonUrl,'comingSoon','即将上映');
    this.getMovieListData(top250Url,'top250','top250');    
  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  getMovieListData: function (url, settedKey, categoryTitle){
    var _this = this;
    wx.request({
      url: url,
      method:'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        _this.processdoubanData(res.data,settedKey,categoryTitle)
      },
      fail: function (error) {

      },
    

    })
  },
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onClearTap:function(){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{}
    })
  },
  processdoubanData: function (moviesDouban, settedKey, categoryTitle){
      var movies = [];
      for(var idx in moviesDouban.subjects){
        var subject = moviesDouban.subjects[idx];
        var title = subject.title;
        if(title.length >= 6){
          title = title.substring(0,6) + '...'
        }
        var temp={
          stars: utils.covertToStarsArray(subject.rating.stars/10),
          title:title,
          average:subject.rating.average,
          coverageURl:subject.images.large,
          movieId:subject.id
        }
        movies.push(temp);
        var readyData = {};
        readyData[settedKey] = {
          'categoryTitle':categoryTitle,
          'movies':movies
        };
        this.setData(readyData)
      }
  },
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})