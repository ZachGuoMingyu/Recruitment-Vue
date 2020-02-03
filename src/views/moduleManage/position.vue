/*
 * @Author: guomy 
 * 职位管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-28 19:43:39
 */
<template>
  <div id="modulePosition">
     <div id="but">
      <!-- 添加类型 -->
    <el-button @click="newCard" style="margin-left:80%;" icon="el-icon-circle-plus-outline" type="warning" size="small" round >添加类型</el-button>
    </div>

      <div  style="margin-top:20px;">
        <el-card class="box-card" shadow="hover"  v-if="card" >
        <div slot="header" class="clearfix" >
          <span>{{input}}</span>
          <el-button style="float: right; padding: 3px 0;font-size: 2em;color: #fff;" type="text" @click="card=false">×</el-button>
          <el-input @change="newinp(input)" v-if="inp" style="width:120px" v-model="input" placeholder="请输入类型"></el-input>
        </div>
        
        <div>
        <el-button  class="button-new-tag">新增</el-button>
        </div>
      </el-card>
    </div>



    <div  style="margin-top:15px; margin-bottom: 10em;" >
      <el-card class="box-card" shadow="hover"  v-for="item in jobTypeData"  :key="item.id" style="background-color: #ffe;margin-top: 3em;" >
        <div slot="header" class="clearfix" >
          <span >{{item.name}}</span>
        </div>
        <div v-for="pro in jobData" :key="pro.id">
        <el-tag class="tag" style="font-size: 1.2em;padding-left: 1.2em;padding-right: 1.2em;"  v-if="item.id===pro.jobTypeId" closable  @close="delete_job(pro.id)"> 
          {{pro.name}}
        </el-tag>
        </div >
         <el-button v-if="!item.show_add" class="button-new-tag"  type="success" plain  @click="item.show_add=true">+ 新增</el-button>

              <el-input style="width:15%;"
              class="input-new-tag"
              v-if="item.show_add"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="add_job(item.id,inputValue,item)"
              
            >
            </el-input>
         <!-- <el-button v-if="!item.show_add" class="button-new-tag" size="small" type="success" plain  @click="item.show_add=true">+ 新增</el-button> -->
        <div>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>
import { findAllJobs ,saveOrUpdateJobs,deleteJobsById} from "@/api/Job.js";
import { findAllJobTypes , findJobTypeById,saveOrUpdateJobType} from "@/api/jobtype.js";
import config from '@/utils/config.js'
export default {
  data() {
    return {
      input: '',
      job:'',
      statusData:[],
      jobData:[],
      jobTypeData:[],
      //控制新增卡片的显示
      card:false,
      inp:true,
      inputValue:''
    };
  },
  computed: {},
  methods: {
    // 添加类型
   async newinp(name){
      this.inp = false;
     try {
            console.log(name)
            // 提醒功能
            this.card=false;
            let res= await saveOrUpdateJobType({name:name})
            if (res.status === 200) {
              config.successMsg(this, "添加成功");
              this.findAllJobType();
              this.input=''
            } else {
              config.errorMsg(this, "添加");
            }
            
          } catch (error) {
            config.errorMsg(this, "添加");
            console.log(error)
          }
    },
     //控制新增卡片的显示
    newCard(){
      this.card = true;
      this.inp =true;
        // this.card='ture';
        // console.log(card)
    },
      async findAllJobType() {
      try {
        let res = await findAllJobTypes();
        this.jobTypeData = res.data.reverse();
        this.jobTypeData.forEach(res=>{
          this.$set(res,'show_add',false )
        })
       
      } catch (error) {
        config.errorMsg(this, "查找错误");
        console.log(error)
      }
    },
    async findAllJob() {
      try {
        let res = await findAllJobs();
        this.jobData = res.data;
        
          let statusArr = res.data.map(item => {
          return item.status;
        });
        //去重
        this.statusData = [...new Set(statusArr)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    async add_job(jobtypeId,name,show)
    {
      this.$set(show,'show_add',false)
      
      console.log(this.jobTypeData)
      console.log(this.jobData)
    let job = {jobTypeId:jobtypeId,name:name,status:'使用中'}
    console.log(job)
    let res = await saveOrUpdateJobs(job)
    this.findAllJob();
    this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.inputValue=''
  },
  async delete_job(id){
   try{
     console.log(id);
    let res = await deleteJobsById({id:id})
    console.log(res.status)
    this.findAllJob();
   } catch(err){
     
   }
  }
  },

  created() {
    this.findAllJob();
    this.findAllJobType();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
  .but{
     float: left;
  }
 .text {
    font-size: 14px;
  }
  .tag{
    float: left;
    margin-right: 10px;
    margin-bottom: 10px
  }
  .item {
    margin-bottom: 8px;
  }
  .el-card__header{
    height: 20px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
/deep/ .el-tag{
  height: 40px;
  line-height: 40px;
}
  .box-card {
    width: 70%;
    margin:0 auto;
    margin-top: 20px;
  }
   .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 20px;
    padding-top: 0;
    padding-bottom: 0;
  }
#content{
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  
}
/deep/ .el-card__header{
  background-color: teal;
  color: #fff;
}
/deep/ .button-new-tag{
  height: 40px;
  line-height: 40px;
}
</style>