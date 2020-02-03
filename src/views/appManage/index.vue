/*
 * @Author: guomy
 * APP管理页面
 * @Date: 2019-12-22 16:49:20 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-23 21:41:53
 */
<template>
  <div id="appManage">
    <el-tabs type="card"  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="栏目管理" name="category" >    
          <span slot="label" style="padding: 0 40px;font-size: 1.2em;">栏目管理</span>
      </el-tab-pane>
      <el-tab-pane label="热门推荐"  name="hot">
        <span slot="label" style="padding: 0 40px; font-size: 1.2em;">热门推荐</span>
      </el-tab-pane>
      <el-tab-pane label="广告管理" name="adv">
        <span slot="label" style="padding: 0 40px; font-size: 1.2em;">广告管理</span>
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
  name: "appManage",
  data() {
    return {
      activeName: "category"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/appManage/index/" + tab.name);
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
