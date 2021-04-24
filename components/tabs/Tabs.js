// components/tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接受父元素数据
    tabItem:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    passValue(e) {
      // 获取点击的索引值
      const {index} = e.currentTarget.dataset;
      // 子组件向父组件传值，触发父组件的自定义事件
      this.triggerEvent("tabsItemChange",{index});
    }

  }
})
