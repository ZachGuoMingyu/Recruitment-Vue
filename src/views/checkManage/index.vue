/*
 * @Author: guomy
 * 审核模块页面
 * @Date: 2019-12-22 16:49:20 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-23 21:39:35
 */
<template>
  <div id="checkManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商家审核" name="business">
        <span slot="label" style="padding: 0 40px;font-size: 1.2em;">商家列表</span>
      </el-tab-pane>
      <el-tab-pane label="招聘审核" name="recruit">
        <span slot="label" style="padding: 0 40px;font-size: 1.2em;">招聘审核</span>
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
  name: "checkManage",
  data() {
    return {
      activeName: "business"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/checkManage/index/" + tab.name);
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
