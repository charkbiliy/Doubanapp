// pages/music.js
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = false
innerAudioContext.src = "cloud://cloud1-4g5civ3s1dfa6431.636c-cloud1-4g5civ3s1dfa6431-1308883045/杨宗纬;张碧晨 - 凉凉.mp3" 
innerAudioContext.onPlay(()=>{
  console.log("playing")
})
// innerAudioContext.onE
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picsrc:'../../images/播放.png',
    block:"inline-block",
    none:"none",
    turning:"paused"
  },
  play(e){
    console.log(e.target.dataset.id)
      this.setData({
        block:"none",
        none:"inline-block",
        turning:"running"
        }) 
        innerAudioContext.play()

      },
  pause(e){
    console.log(e.target.dataset.id)
      this.setData({
        block:"inline-block",
        none:"none",
        turning:"paused"
    })
    innerAudioContext.pause()
  },
  save(){
    db.collection('users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        username:"henry2",
        passwd:"123456"

      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
  })
},
select(){
  db.collection('users').where({
    username: "henry",
  }).get({
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  })
},
update(){
  db.collection('users').where({
    username:"henry2"
  }).update({
      data:{
        passwd: "9999"
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
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