// pages/zone/zone.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picsrc:"",
    imglist:[],
    videolist:[],
    userInfo:"",
    canIUseGetUserProfile:true,
    hasUserInfo:true
  },
  upload(){
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success (res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //   }
    // })
    let that=this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        wx.showToast({
          title: '上传成功',
          icon: '',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        }) 
        console.log(res)
        console.log(res.tempFiles[0].tempFilePath)
        const path = res.tempFiles[0].tempFilePath
        //path.lastindexof
        let type = path.split(".")
        console.log(type[1])
        wx.cloud.uploadFile({
          cloudPath:Math.random()+"local.png",
          filePath:path,
        }).then(res=>{
          console.log(this)
          console.log(res)
          that.setData({
            picsrc:res.fileID
          })
        }).catch(error=>{
          console.log(error)
        })
      }
    })
  },
  sendnews(){
    let that=this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log(res.tempFiles[0].tempFilePath)
        res.tempFiles.forEach(function(item){
          const path = item.tempFilePath
          //path.lastindexof
          //let type = path.split(".")[1]
          let type=res.type
          console.log(type)
          if(type=="image"){
            console.log("图片")
            wx.cloud.uploadFile({
              cloudPath:Math.random()+"local.png",
              filePath:path,
            }).then(res=>{
              console.log(res)
              console.log(that.data.imglist)
              let arr = that.data.imglist
              arr.push(res.fileID)
              that.setData({
                imglist:arr,
              })
            }).catch(error=>{
              console.log(error)
            })
          }else if(type=="video"){
            console.log("视频")
            wx.cloud.uploadFile({
              cloudPath:Math.random()+"local.mp4",
              filePath:path,
            }).then(res=>{
              console.log(res)
              console.log(that.data.videolist)
              let arr = that.data.videolist
              arr.push(res.fileID)
              that.setData({
                videolist:arr,
              })
            }).catch(error=>{
              console.log(error)
            })
          }
        })
      }
    })
  },
  deletepic(e){
    console.log(e)
    let arr = this.data.imglist
    arr.splice(e.target.dataset.id,1) 
    this.setData({
      imglist:arr
    })
  },
  getUserProfile(res){
   // console.log(res)
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo:res.userInfo,
          picsrc: res.userInfo.avatarUrl,
          hasUserInfo: false
        })
      },
      fail:(res) =>{
        console.log(res)
      }
    })
  },
fn(){
  wx.cloud.callFunction({
    name: 'add',
    //config:{env:'cloud1-4g5civ3s1dfa6431'},
    // 传给云函数的参数
    data: {
      a: 12,
      b: 19,
    }
  }).then(res => {
    console.log(res)
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
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