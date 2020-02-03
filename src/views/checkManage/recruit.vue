/*
 * @Author: guomy 
 * 招聘审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-23 21:38:39
 */
<template>
  <div id="recruitCheck">
    <div id="recrui_main">
      <!-- 筛选模块 -->
      <div class="row">
        <!-- 职业类型筛选 -->
        <template>
          <el-select v-model="job_value" @change="findemploymentsbyjob(job_value)"  clearable placeholder="职位类型">
            <el-option
              v-for="item in job_list"
              :key="item"
              :label="item"
              :value="item"
              align="center">
            </el-option>
          </el-select>
        </template>
      </div>
      <!-- 表格展示 -->
      <div class="row" style="margin-top: 2em;">
        <el-table
        :data="employments.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%;border :2px solid teal"
        align="center"
        :header-cell-style="{background:'teal',color:'#fff',height:'3.5em',fontSize:'1.1em'}"
        >
        <el-table-column align="center" label="#"  width="90">
          <template slot-scope="scope">
            <input type="checkbox" v-model="checked" :value="scope.row" style="zoom:130%">
          </template>
          
        </el-table-column>
          <el-table-column align="center" label="招聘标题" prop="title"> 

          </el-table-column>
          <el-table-column align="center"   label="发布人" prop="contactName"> 

          </el-table-column>
          <el-table-column align="center" label="联系方式" prop="contactPhone"> 
          </el-table-column>
          <el-table-column align="center" label="招聘职位" prop="job"> 
          </el-table-column>
          <el-table-column align="center" label="发布时间" width="180" prop="publishTime" > 
            <span slot-scope="scope">{{scope.row.publishTime}}</span>
          </el-table-column>
          <el-table-column align="center" width="90" label="招收人数" prop="num" > 
            <span slot-scope="scope">{{scope.row.num}}人</span>
          </el-table-column>
          <el-table-column align="center" width="90" label="详细信息" prop="contactName"> 
            <template slot-scope="scope">
              <el-button type = "text" @click="scope.row.show_description=true">
                查看
              </el-button>
              <!-- 详情页面 -->
              <el-dialog :visible.sync="scope.row.show_description" width="35%" style="text-align: left;padding:0px">
                <!-- 标题 -->
                <span slot="title" style="color: black;text-align: left; font-size: 1.5em; font-weight: bolder;padding-left: 8px;">{{scope.row.title}}</span>
                <!-- 招收条件 -->
                <div class="row" style="border-top: 1px solid #cccccc;border-bottom: 1px solid #cccccc;"> 
                  <div class="row" style=" width: 48%; display: inline-block;" >
                    <p style="font-size: 1.15em;"><span style="font-weight: 600;">职位类型: </span> {{scope.row.job}}</p>
                    <p style="font-size: 1.15em;"><span style="font-weight: 600;">工作时间: </span> {{scope.row.workingHours}}/天</p>
                    <p style="font-size: 1.15em;"><span style="font-weight: 600;">招收人数: </span> {{scope.row.num}}人</p>
                  </div>
                  <!-- 联系方式 -->
                  <div class="row" style=" width: 48%; display: inline-block;">
                    <p style="font-size: 1.15em;"><span style="font-weight: 600;">发布人: </span> {{scope.row.contactName}}</p>
                    <p style="font-size: 1.15em;"><span style="font-weight: 600;">发布时间: </span> {{scope.row.publishTime}}</p>
                    <p style="font-size: 1.15em;"><span style="font-weight: 600;">联系方式: </span> {{scope.row.contactPhone}}</p>
                  </div>
                </div>
                <!-- 详情描述 -->
                <div class="row" style="margin-top: 2em;">
                  <p style="font-size: 1.2em; font-weight: 600;">详情描述 :</p>
                  <p style="text-indent: 2em;font-size: 1.05em;">{{scope.row.description}}</p>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" prop="auditStatus" min-width="180"> 
            <template slot-scope="scope">
              <el-button type="success" size="mini" style="display: inline-block;" v-if="scope.row.auditStatus=='1待审核'" @click="PassEmployment(scope.row)" >通过</el-button>
              <el-button type="danger" size="mini" style="display: inline-block;" v-if="scope.row.auditStatus=='1待审核'" @click="refuseEmployment(scope.row)">拒绝</el-button>
              <span v-if="scope.row.auditStatus=='3审核通过'" style="color: rgb(10, 141, 10);font-weight: bolder;" >审核通过</span>
              <span v-if="scope.row.auditStatus=='2拒绝'" style="color: red;font-weight: bolder;" >拒绝</span>
            </template>
          </el-table-column>

        </el-table
        >
      </div>
      <!-- 分页与批量通过 -->
      <div class="row" style="margin-top: 2em;">
         <!-- 批量通过 -->
         <div class="row" style="float: left;">
          <el-button type="success" @click="ListPass()">批量通过</el-button>
        </div>
        <!-- 分页 -->
        <div class="row" style="float: right;">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :total="employments.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  { FindAllemployments,saveOrUpdateEmployments,FindEmploymentsByJob } from '@/api/employment.js'
export default {
  data() {
    return {
      checked:[],
      jobs:[],
      job_value:'',
      employments:[],
      pageSize:8,
      checked:[],
      currentPage:1,
      show_description:false
      
    };
  },
  computed: {
    job_list(){
      this.employments.forEach(res=>{
        this.jobs.push(res.job)
      })
      this.jobs = [...new Set(this.jobs)]
     return this.jobs
    }
  },
  methods: {
    // 进行招聘信息查找
    async findallEmployment(){
      try{
          let res = await FindAllemployments();
          this.employments = res.data;
          this.employments.forEach(res=>{
            let index =res.publishTime.indexOf("T")
            let index1 =res.publishTime.indexOf(".")
            let a = res.publishTime.substring(0,index);
            let b = res.publishTime.substring(index+1,index1);
            res.publishTime = a+" "+b;

            this.$set(res,'show_description',false)
          })
          // 进行数据的排序
          this.employments.sort((res=>{
            return function(a,b){
              if(a[res]<b[res]){
                return -1;
              }else return 1;
            }
          })('auditStatus'))
      }catch(err){
          this.$notify.error({
          title: '失败',
          message: '查找失败',
      })
    }
  },
       // 处理页
    handleCurrentChange(curPage){
      this.currentPage=curPage
    },
    // 筛选
    async findemploymentsbyjob(job_value){
      if(job_value){
      try{
        let res = await FindEmploymentsByJob({job:job_value});
        this.employments = res.data;
        this.employments.forEach(res=>{
            let index =res.publishTime.indexOf("T")
            let index1 =res.publishTime.indexOf(".")
            let a = res.publishTime.substring(0,index);
            let b = res.publishTime.substring(index+1,index1);
            res.publishTime = a+" "+b;
            this.$set(res,'show_description',false)
          })
        // 进行数据的排序
        this.employments.sort((res=>{
         return function(a,b){
          if(a[res]<b[res]){
            return -1;
          }else return 1;
        }
      })('auditStatus'))
      }catch(err){
        this.$notify.error({
          title:"失败",
          value:"查询失败"
        })
      }
      }
      else{
        this.findallEmployment();
      }
    },
    // 通过
    async PassEmployment(employment){
      try{
        
      //  let date = employment.publishTime.replace(/-/g,'/');
      //  var time =new Date(date).getTime();
      //  this.$set(employment,'publishTime',new Date(date).getTime())
      //  console.log(time)
      employment.auditStatus="3审核通过"
      let res = await saveOrUpdateEmployments(employment);
      if(this.job_value){
        this.findemploymentsbyjob(this.job_value);
      }
      else{
        this.findallEmployment();
      }
    }catch(err){
      console.log(err)
      this.$notify.error({
        title:"失败"
      })
    }
    },
    // 拒绝
   async refuseEmployment(employment){
      try{
        
        //  let date = employment.publishTime.replace(/-/g,'/');
        //  var time =new Date(date).getTime();
        //  this.$set(employment,'publishTime',new Date(date).getTime())
        //  console.log(time)
        employment.auditStatus="2拒绝"
        let res = await saveOrUpdateEmployments(employment);
        if(this.job_value){
          this.findemploymentsbyjob(this.job_value);
        }
        else{
          this.findallEmployment();
        }
      }catch(err){
        console.log(err)
        this.$notify.error({
          title:"失败"
        })
      }
    },
    // 批量通过
   ListPass(){
      try{
       this.checked.forEach(res=>{
          this.PassEmployment(res)
        })
      }catch(err){
        this.$notify.error({
          title:"失败"
        })
      }
    }
  },
  created() {
    this.findallEmployment()
  },
  mounted() {}
};
</script>
<style scoped>
  #recrui_main{
    width:75%;
    margin-left: 10%;
    margin-top: 3em;
  }
  /deep/ .el-dialog__header{
    background-color: #ffffff;
  }
  /deep/ .el-dialog__close{
    color:black;
  }
  /deep/ .el-dialog__body{
    padding:0px;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;

  }
</style>