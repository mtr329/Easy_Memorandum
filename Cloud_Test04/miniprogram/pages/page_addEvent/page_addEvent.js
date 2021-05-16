Page({

    data: {
        limitType:"point",
        timeType:"once",
        nowTime:[],
    },
    choseLimitType:function(e){
        this.setData({limitType:e.detail.value})
    },
    choseTimeType:function(e){
        this.setData({timeType:e.detail.value})
    },
    submitForm:function(e){
        var addData = e.detail.value;
        addData.condition = "unfinished";
        const db = wx.cloud.database();
        db.collection('Events').add({
            data:addData,
            success:function(res){               
                wx.showModal({
                    title: '添加成功',
                    showCancel:false,
                    confirmColor: "#4169E1"
                })           
            },
            fail:function(){
                wx.showModal({
                    title: '添加失败',
                    content:'请稍后重试，或检查网络连接',
                    showCancel:false,
                    confirmColor: "#4169E1"
                })   
            }
        })
    },
    toMainPage:function(){
        wx.showModal({
            content:"取消添加并返回上一页",
            showCancel:true,
            confirmText:"确认",
            confirmColor: "#000000",
            cancelText: "再看看",
            cancelColor: "#000000",
            success: function(res){
                if(res.confirm){
                    wx.navigateBack()
                }
            }
        })
    },
    onLoad: function (options) {
        var time = new Date();
        var arr=[time.getFullYear(),time.getMonth()+1,time.getDate(),time.getHours(),time.getMinutes(),time.getSeconds(),time.getMilliseconds()];
        this.setData({nowTime:arr});
    },

    onUnload: function () {
        
    },
 
})