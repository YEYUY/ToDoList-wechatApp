Component({
  data: {
    showtab:true,
    selected: 3,
    color: "#7FAFC3",
    selectedColor: "#DAD0C4",
    list: [
      {
        pagePath: "/pages/today/today",
        iconPath: "/images/tabbar/mine.png",
        selectedIconPath: "/images/tabbar/mine_0.png",
        text: "today"
      },
      {
        pagePath: "/pages/task/task",
        iconPath: "/images/tabbar/menu.png",
        selectedIconPath: "/images/tabbar/menu_0.png",
        text: "list"
      },
      {
      pagePath: "/pages/blog/blog",
      iconPath: "/images/tabbar/blog.png",
      selectedIconPath: "/images/tabbar/blog_0.png",
      text: "blog"
      },
      {
    pagePath: "/pages/index/index",
    iconPath: "/images/tabbar/index.png",
    selectedIconPath: "/images/tabbar/index_0.png",
    text: "mine"
      }, 
  ]
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})