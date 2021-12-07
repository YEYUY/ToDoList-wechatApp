const util = require("../../utils/util")

var API
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isAllTask:{
            type:Boolean,
            value:false,
        },
        unfinishedTasks: {
            type: Array,
            value: []
        },
        finishedTasks:{
            type: Array,
            value: []
        },
        api: {
            type: Object,
            value: {},
        },
        setting: {
            type: Object,
            value: {}
        }
    },

    data: {
        isCloseSlider: false,
        weekArray:[],
        collapse:{
            finished_expand:false,
            unfinished_expand:false
        }
    },

    lifetimes: {
        attached: function () {
            this.setData({
                weekArray: getApp().globalData.weekArray,
                setting:wx.getStorageSync('setting')
            })
        },
        // 在组件在视图层布局完成后执行
        ready: function () {
            API = this.data.api
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tap_collapse(e) {
            var that = this
            var collapse = that.data.collapse
            if (e.currentTarget.id === "finished") {
                collapse.finished_expand = !collapse.finished_expand
            } else {
                collapse.unfinished_expand = !collapse.unfinished_expand
            }
            that.setData({
                collapse
            })
        },

        tapTask(e) {
            this.closeSlider()
            let item = e.currentTarget.dataset.item
            wx.navigateTo({
                url: '/pages/task/task?task=' + JSON.stringify(item),
            })
        },

        closeSlider() {
            this.setData({
                isCloseSlider: true
            })
        },

        tapFinish(e) {
            this.closeSlider()
            util.touchFeedback(this.data.setting)
            var task = e.currentTarget.dataset.item
            task.finished_date = util.getNowDateFormat()
            if (task.end_date) {
                task.end_date = util.setDateFormat(task.end_date)
            } else {
                task.end_date = "0001-01-01T23:59:59.000Z"
            }
            API.finish(task.id, task).then(() => {
                this.triggerEvent('getTaskList')
            })
        },

        tapCancel(e) {
            var task = e.currentTarget.dataset.item
            API.cancelFinish(task.id).then(() => {
                this.triggerEvent('getTaskList')
            })
        },

        tapDeleteTask(e) {
            var that = this
            wx.showActionSheet({
                alertText: "将永久删除该任务，无法撤回",
                itemColor: "#f5222d",
                itemList: ['删除任务'],
                success() {
                    API.delete(e.currentTarget.id).then(() => {
                        that.triggerEvent('getTaskList')
                    })
                },
                fail(res) {
                    console.log(res.errMsg)
                }
            })
        },
    }
})