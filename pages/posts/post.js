var postData = require('../../data/posts-data');
Page({
  data: {
    imgUrls: [
      {
        'id':0,
        'url':'/images/img1.jpg'
      },{
        'id': 1,
        'url': '/images/img2.jpg'
      },{
        'id': 2,
        'url': '/images/img3.jpg'
      }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 4000,
    duration: 1000
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({ posts_key: postData.postList })
  },
  onPostTap(event) {
    var postId = event.currentTarget.dataset.postid;//取当前元素的data-postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  //事件冒泡处理
  onSwiperTap(event){
    var postId = event.target.dataset.postid;//事件冒泡，取冒泡到的元素的data-postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
});