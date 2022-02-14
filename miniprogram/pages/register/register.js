// pages/register/register.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
  },
  reg(e){
    if(e.detail.value.uname&&e.detail.value.upass){
      console.log(e)
      db.collection('users').where({
        uname: e.detail.value.uname,
      }).get({
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          console.log(res.data.length)
          if(res.data.length>0){
            wx.showToast({
              title: '用户名已存在',
              icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
              duration: 2000     
            }) 
            console.log("用户名已存在")
          }else{
            wx.showToast({
              title: '注册成功',
              icon: '',    //如果要纯文本，不要icon，将值设为'none'
              duration: 2000     
            }) 
            db.collection("users").add({
              data:{
                uname:e.detail.value.uname,
                upass:e.detail.value.upass
              },
              success:function(res){
                console.log(res)
                if(res){
                  wx.navigateTo({
                    url: '/pages/login/login',
                })
                }
              }
            })
          }
        }
      })
    }else{
      console.log("信息不完整，请检查")
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