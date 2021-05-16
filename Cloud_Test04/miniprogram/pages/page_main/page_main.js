// miniprogram/pages/page_main/page_main.js
Page({

    data: {
        viewNo:0,
        subViewNo:0,
        naviMain:{
            "icon":["today","list","history","user"],
            "text":["今日","列表","历史","我的"],
            "state":["on","off","off","off"]
        },
        views:[{
            "viewName":"today"
        },{
            "viewName":"list",
            "text":["本日","本周","本月","本年"],
            "state":["on","off","off","off"]
        },{
            "viewName":"history"
        },{
            "viewName":"user"}
        ],
        allEvents:[]
    },
    tapNaviBtn: function(e){
        var id = e.currentTarget.id;
        var to = id.charAt(id.length-1);
        var from = this.data.viewNo;
        if(from != to){
            this.setData({
                ["naviMain.state["+to+"]"]:"on",
                ["naviMain.state["+from+"]"]:"off",
                viewNo:to
            })
        }
    },
    tapSubNaviBtn: function(e){
        var view = this.data.viewNo
        var id = e.currentTarget.id;
        var to = id.charAt(id.length-1);
        var from = this.data.subViewNo;
        if(from != to){
            this.setData({
                ["views["+view+"].state["+from+"]"]:"off",
                ["views["+view+"].state["+to+"]"]:"on",
                subViewNo:to
            })
        }
    },
    doDetail:function(e){
        console.log(e);
        console.log(this.data.allEvents)
    },
    doFinish:function(e){

    },
    doDelay:function(e){

    },
    doDelete:function(e){

    },
    openPage_addEvent: function(){
        wx.navigateTo({
            url:"/pages/page_addEvent/page_addEvent"
        });
    },
    onLoad: function (options) {
        const thisPage = this;
        const app = getApp()
        wx.cloud.callFunction({
            name:'getUserInfo',
            complete: res=>{
                app.globalData.ifLogin = true;
                app.globalData.openId = res.result.openId;
            }
        })
        const db = wx.cloud.database();
        db.collection('Events').where({
            _openid: app.globalData.openId
        }).get({
            success:function(res){
                thisPage.setData({
                    allEvents:res.data
                })
            }
        })
    },

})