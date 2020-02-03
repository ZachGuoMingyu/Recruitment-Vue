/*
 * @Author: guomy 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-29 15:38:29
 */
<template>
<div class="qiuzhi">
  <div class="main">
      <div class="btn">

          <el-select clearable @change="dialogProChange(select_input)" v-model="select_input" placeholder="请选择">
            
            <el-option
              v-for="item in this.select_list"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
      </div>
<!-- 表格 -->
  <div class="tabDiv">
    <el-table
    :header-cell-style="headClass"
    :data="this.emplData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    tooltip-effect="dark"
    style="width: 100%"
    >
    <el-table-column
      prop="jobhunter.realname"
      label="求职者"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="jobhunter.telephone"
      label="联系方式"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="employmentId"
      label="求职岗位"
      align="center">
    </el-table-column>
    <el-table-column
      label="简历"
      align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="toSee(scope.row)" >查看</el-button>
      </template>
    </el-table-column>
    <el-table-column
     label="申请时间" 
     prop="askTime"
     align="center"
      >
    </el-table-column>
    </el-table>
  </div>
  <!-- 查看模态框 -->
  <div class="chakan">
<el-dialog :title="Jobhunter.jobhunter?Jobhunter.jobhunter.realname:''" :visible.sync="dialogFormVisible" >
  <el-row :gutter="20">
  <el-col :span="12">
 <div class="seeDiv">
        <span>性别：</span>
        <!-- {{Jobhunter}} -->
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.gender:''}}
      </div>
  </el-col>
  <el-col :span="12"><div class="seeDiv">
        <span>最高学历：</span>
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.education:''}}
      </div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="seeDiv">
        <span>出生年月：</span>
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.birth:''}}
      </div></el-col>
  <el-col :span="12"><div class="seeDiv">
        <span>工作经验：</span>
        {{Jobhunter.jobhunter?Jobhunter.jobhunter.workTime:''}}
      </div> </el-col>
</el-row>
</el-dialog>
</div>
<!-- 分页 -->
    <div class="pagi">
        <el-pagination
          @current-change="currentChange"
          :current-page.sync="currentPage"
          size="mini"
          background
          layout="prev, pager, next"
          :total="emplData.length"
        ></el-pagination>
    </div>
</div>
</div>

</template>

<script>
import { findAllJobhunter } from "@/api/jobhunter.js";
import { findAllEmploymentJobhunter,findAllWithJobhAndEmpl } from '@/api/employmentJobhunter.js';
import config from '@/utils/config.js';

export default {
  data() {
    return {
     
      //当前页
      currentPage: 1,
      pageSize :8,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //扩展数据
      emplData:[],
      JobhunterData:[ ],
      Jobhunter:{
        realname:'',
        gender:'',
        birth:'',
        education:'',
        workTime:'',
      },
      EmploymentJobhunterData:[],
      select_input:'',
      select_list:[]
    };
  },
  computed: {
    jobList() {
      let temp = [...this.emplData];
      let pageSize = config.pageSize;
      let page = this.currentPage;
      return this.emplData.slice((page - 1) * pageSize, page * pageSize);
    },
  },
  methods: {
    async dialogProChange(val) {
      // console.log(val);
      //通过val获取城市
      if(val){
      try {
        console.log(val)
        let test =[];
        this.emplData.forEach(res=>{
          if(res.remark == val)
          test.push(res)
        })
        console.log(test)
        this.emplData = test;
        console.log(this.emplData,'--------')
      } catch (error) {
        console.log(error);
        config.errorMsg(this, "通过省份查找城市失败");
      }}
      else{
        this.findAllwjae();
      }
    },




         // 表头样式设置
    headClass () {
      return 'background:#008080;color:#fff;height:50px;font-size:16px;'
    },

    //   toGuolv(){
          
    //           let res = this.emplData.filter(item => {
    //           return item.remark;
    //         });
    //              this.emplData = res;           
    //  },

      toSee(row){
        this.dialogFormVisible = true;
        this.Jobhunter = { ...row };
      },


    //获取信息
     async findAllwjae(){
        try{
          let msg = await findAllWithJobhAndEmpl();
          this.emplData = msg.data;
          console.log(this.emplData)
          this.emplData.forEach(res=>{
            let index =res.askTime.indexOf("T")
            let index1 =res.askTime.indexOf(".")
            let a = res.askTime.substring(0,index);
            let b = res.askTime.substring(index+1,index1);
            res.askTime = a+" "+b;
          }
          )
          this.emplData.forEach(res=>{
            this.select_list.push(res.remark)
          })
          this.select_list = [... new Set(this.select_list)]
          
        }catch(err){
          config.errorMsg(this,'查找错误');
        }
    },


    currentChange(val) {
      //val是当前点击的页数
      this.currentPage = val;
    },
    //获取求职者数据
      async getJobhunterData(){
        try{
            let res = await findAllJobhunter(); 
            this.JobhunterData = res.data;
            
        }catch (err) {
              config.errorMsg(this,'查找错误');
            }
      },


      //
      //获取求职者数据
      async getEmploymentJobhunterData(){
        try{
            let res = await findAllEmploymentJobhunter(); 
            this.EmploymentJobhunterData = res.data;

        }catch (err) {
              config.errorMsg(this,'查找错误');
            }
      },
  },
  created() {
    this.getJobhunterData();
    this.getEmploymentJobhunterData();
    console.log('调用一次')
    this.findAllwjae();

  },
  mounted() {}
};
</script>
<style scoped lang="scss">
  .pagi {
  float: right;
  margin-top: 10px;
  }
.btn{
  margin-top: 3em;
  margin-bottom: 10px;
}
.seeDiv{
  padding: 10px;
}
.main{
  margin-left: 10%;
  margin-right:10%
}

.tabDiv{
  margin-top: 2em;
  width:100%;
  border: 2px solid #008080;
}
// .chakan{
//   width:100%;
//   border: 2px solid #008080;
// }
</style>