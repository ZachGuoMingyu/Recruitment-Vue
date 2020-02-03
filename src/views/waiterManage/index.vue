/*
 * @Author: guomy 
 * 客服管理页面
 * @Date: 2019-12-23 20:59:21 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-28 19:10:29
 */
<template>
  <div id="waiterManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="客服列表" name="waiter">
        <span slot="label" style="padding: 0 40px;font-size: 1.2em;">客服列表</span>
      </el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "waiterManage",
  data() {
    return {
      activeName: "waiter"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/waiterManage/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
 /deep/ .el-tabs__item {
    height: 45px;
    line-height: 45px;
}
</style>
