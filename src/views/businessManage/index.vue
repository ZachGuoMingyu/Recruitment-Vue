/*
 * @Author: guomy
 * 商家列表页面
 * @Date: 2019-12-22 16:49:20 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-28 18:54:15
 */
<template>
  <div id="businessManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商家列表" name="business">
        <span slot="label" style="padding: 0 40px;font-size: 1.2em;">商家列表</span>
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
  name: "businessManage",
  data() {
    return {
      activeName: "business"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/businessManage/index/" + tab.name);
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
