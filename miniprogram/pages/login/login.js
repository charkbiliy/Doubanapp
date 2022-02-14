// pages/login/login.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  toreg(){
      wx.navigateTo({
        url: '/pages/register/register',
    })
  },
  reg(e){
    if(e.detail.value.uname&&e.detail.value.upass){
      db.collection('users').where({
        uname: e.detail.value.uname,
        upass: e.detail.value.upass
      }).get({
        success: function(res) {
          console.log(res)
          if(res.data.length>0){
            wx:wx.redirectTo({
              url: '/pages/zone/zone',
              success: (res) => {},
            })
          }else{
            wx.showToast({
              title: '用户名不存在或密码错误',
              icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
              duration: 2000     
            }) 
          }
        }
    })
    }else{
      console.log("请检查信息是否输入完整")
    }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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