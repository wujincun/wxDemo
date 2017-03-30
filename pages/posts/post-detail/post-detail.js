let postsDetailData = require('../../../data/posts-data')
let app = getApp();
Page({
    data: {
        isPlayingMusic:false
    },
    onLoad(option){
        //let globalData = app.globalData;
        let postId = option.id;
        this.data.postId = postId;
        let postData = postsDetailData.postList[postId]
        this.setData({
            postData: postData
        });
        //wx.setStorageSync('key', '英雄联盟');
        wx.setStorageSync('key', {
            game: '英雄联盟',
            develop: '我啊'
        });
        let postsCollected = wx.getStorageSync('posts_collected');
        if (postsCollected) {
            let postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            });
        } else {
            let postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected)
        }
        /*监听音乐*/
        wx.onBackgroundAudioPlay(()=>{
            this.setData({
                isPlayingMusic:true
            })
        });
        wx.onBackgroundAudioPause(()=>{
            this.setData({
                isPlayingMusic:false
            })
        });

    },
    onCollectionTap(event){
        let postsCollected = wx.getStorageSync('posts_collected');
        let postCollected = postsCollected[this.data.postId];
        postCollected = !postCollected;
        postsCollected[this.data.postId] = postCollected;
        wx.setStorageSync('posts_collected', postsCollected)
        this.setData({
            collected: postCollected
        });
        wx.showToast({
            title: postCollected ? '收藏成功' : '取消收藏',
            duration: 1000
        })
    },
    onShareTap(event){
        //wx.removeStorageSync('key');
        wx.clearStorageSync()
    },
    onMusicTap(event){
        let isPlayingMusic = this.data.isPlayingMusic;
        let postId = this.data.postId;
        let thisMusicData = postsDetailData.postList[postId].music;
        if(isPlayingMusic){
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic : false
            });
        }else{
            wx.playBackgroundAudio({
                dataUrl: thisMusicData.dataUrl,
                title: thisMusicData.title,
                coverImgUrl: thisMusicData.coverImgUrl
            });
            this.setData({
                isPlayingMusic : true
            });
        }
    }
});