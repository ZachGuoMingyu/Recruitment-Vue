/*
 * @Author: guomy 
 * 求职联系页面
 * @Date: 2019-12-23 20:59:21 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-23 21:09:21
 */
<template>
  <div id="wantForjJobConcat">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="求职列表" name="job">
        <span slot="label" style="padding: 0 40px;font-size: 1.2em;">招聘中</span>

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
  name: "wantForjJobConcat",
  data() {
    return {
      activeName: "job"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/wantForJobContact/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
          ::v-deep .el-tabs__item {
    height: 45px;
    line-height: 45px;
}
</style>
