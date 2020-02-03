<template>
  <div class="recruiting">
    <div class="main">
    <!-- {{EmploymentTypeData}} -->
    <div class="searchDiv" style="margin-top: 3em;">
      <el-row>
          <div style="float:left;">
     <el-dropdown>
       <el-select @change="EmploymentChange(Employment)"  v-model="Employment" clearable placeholder="职位类型">
          <el-option
          v-for="item in EmploymentDataList"
          :key="item"
          :label="item"
          :value="item">
          </el-option>
       </el-select>
    </el-dropdown>
        </div>
        <div style="float:right;">
        <el-button type="primary" plain>发布职位</el-button>
        <el-button type="success" plain>导入职位</el-button>
        </div>
      </el-row>
    </div>
    <!-- 表格 -->
    <div class="tableDiv">
    <el-table
        :data="EmploymentList"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="selectionChange"
        :header-cell-style="headClass"
      >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column  align="center"  prop="title" label="招聘标题"></el-table-column>
      <el-table-column align="center"   width="100" prop="contactName" label="发布人"></el-table-column>
      <el-table-column align="center"  prop="contactPhone" label="联系方式"></el-table-column>
      <el-table-column  align="center"  width="100" prop="job" label="职位"></el-table-column>
      <el-table-column align="center"  prop="publishTime" label="发布时间">
        <span slot-scope="scope">{{scope.row.publishTime}}</span>
      </el-table-column>
      <el-table-column align="center"  width="100" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
            <el-dialog :title="scope.row.title" :visible.sync="scope.row.show_description" width="35%">
              <div class="seeDiv" align="left">
                <p>
                  <span>行业类型：</span>
                  {{company.industry}}
                </p>

              </div>
              <div class="seeDiv" align="left">
                <p>
                  <span>公司成立时间：</span>
                {{company.establishedTime}}
                </p>
                <p>
                  <span>公司注册资本：</span>
                  {{company.registeredCapital}}
                </p>
                <p>
                  <span>公司规模：</span>
                  {{company.scale}}
                </p>
              </div>
              <div class="seeDiv" align="left">
                  <p class="el-col-12">
                    <span>招收人数:</span>
                    {{scope.row.num}}人
                  </p>
                  <p class="el-col-12">
                    <span>工资:</span>
                    {{scope.row.salary}}
                  </p>
                  <p class="el-col-12">
                    <span>福利:</span>
                    {{scope.row.welfare}}
                  </p>
                  <p class="el-col-12">
                    <span>联系方式:</span>
                    {{scope.row.contactPhone}}
                  </p>
                  
              </div>
              <div class="seeDiv" align="left">
                

              </div>
              <div class="descDiv" style="margin-top: 2em;">&nbsp;&nbsp;&nbsp;&nbsp;{{company.description}}</div>
              <div class="imgDiv">
                <a :href="currentBus.businessLicense" target="_blank">
                  <img src="../../assets/营业执照.jpg" alt width="200" height="150" />
                </a>
              </div>
            </el-dialog> 
          </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="toEdit(scope.row)" type="primary" size="mini">修改</el-button>
          <!-- 修改展示页面 -->
          <el-dialog title="修改招聘信息" :visible.sync="scope.row.show_update" width="50%">
            <el-form :model="currentBus">
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                  <el-form-item label="兼职名称" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.title" ></el-input>
                  </el-form-item></div></el-col>
              </el-row>
              <el-row :gutter="20" >
                <el-col :span="12"><div class="grid-content bg-purple-light"><el-form-item label="选择工种" :label-width="formLabelWidth">
              <el-row >
              <el-select @change="dialogProChange" v-model="scope.row.job" placeholder="请选择活动区域">
                  <el-option label="区域一" v-for="item in EmploymentDataList" :value="item" :key="item":label="item"></el-option>
                 
              </el-select>
                  </el-row>
            </el-form-item></div></el-col>
                    <el-col :span="12">
                      <el-form-item prop="industry" label="招聘人数" :label-width="formLabelWidth" >
                        <el-input v-model="scope.row.num" placeholder="请输入你要招聘的人数"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
    
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple"><el-form-item label="福利" :label-width="formLabelWidth">
                <el-input v-model="scope.row.welfare" placeholder="修改福利水平"></el-input>
              </el-form-item></div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple"><el-form-item label="薪资水平" :label-width="formLabelWidth">
                <el-input v-model="scope.row.salary" placeholder="请输入薪资"></el-input>
              </el-form-item></div></el-col>
              </el-row>
    
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <el-form-item label="职位标签" :label-width="formLabelWidth">
                      <el-input v-model="company.industry" >
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
    
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-form-item label="联系方式" :label-width="formLabelWidth">
                        <el-input v-model="scope.row.contactPhone" >
                        </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple">
                  <el-form-item label="工作时间" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.workingHours">
    
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
              </el-row>
          <el-row>
            <el-col :span="24">
                      <el-form-item prop="location" label="职位描述" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="4" v-model="scope.row.description"></el-input>
                      </el-form-item>
                    </el-col>
          </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" plain @click="postForm(scope.row)">确定</el-button>
            </div>
          </el-dialog>
          <el-button @click="toDelete(scope.row.id)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <!-- foot -->
    <div style="margin-top: 1em;">
      <div class="btnDiv" style="float:left;">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <!-- 页面交换 -->
      <div class="pageDiv" style="float:right;">
           <el-pagination
              :page-size="pageSize"
              :current-page.sync="currentPage"
              background
              layout="prev, pager, next"
              :total="EmploymentData.length">
            </el-pagination>
        </div>
    </div> 
    </div>
  </div>
</template>

<script>
import { findAllEmployment } from "@/api/employment_wh.js";
import config from "@/utils/config.js";
import { deleteEmploymentById } from "@/api/employment_wh.js";
import { findEmploymentByTitle } from "@/api/employment_wh.js";
import { findEmploymentByJob,saveOrUpdateEmployment } from "@/api/employment_wh.js";
import { findBusinessById } from "@/api/business.js"
export default {
  data() {
    return {
      Employment:"",
       dialogVisible: false,
      //当前查看或修改的对象
      currentBus: {},
      //修改模态框汉字宽度
      formLabelWidth:"100px",
      //当前查看的对象
      currentBus:'',
      //修改模态框修饰与否
      editVisible:false,
      //当前查看的对象
      currentEnp:'',
      seeVisible:false,
      currentPage: 1,
      //招聘列表
      // EmploymentList:[],
      //招聘数据
      EmploymentTypeData:[],
      EmploymentData: [],
      pageSize:config.pageSize,
      ids:[],
      msg:[],
      company:{}
    };
  },
  computed: {
    EmploymentList(){
      let temp = [...this.EmploymentData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize)
    },
    EmploymentDataList(){
        this.msg =[];
        this.EmploymentData.forEach(res=>{
        this.msg.push(res.job)  
     });
     this.msg = [...new Set(this.msg)]
    return this.msg;
    
  }
},
  methods: {
    // 表头样式设置
    headClass () {
      return 'background:#008080;color:#fff;height:50px;font-size:16px;'
    },
    //去重
    
    //模态框工种发生改变
    async dialogProChange(val) {
      this.currentBus.city = "";
      try {
        let msg = await findEmploymentByJob({ Employment: val });
        this.EmploymentData = msg.data;
        this.EmploymentData.forEach(res=>{
            let index =res.publishTime.indexOf("T")
            let index1 =res.publishTime.indexOf(".")
            let a = res.publishTime.substring(0,index);
            let b = res.publishTime.substring(index+1,index1);
            res.publishTime = a+" "+b;
            this.$set(res,'show_description',false)
        })
        console.log(this.EmploymentData);
        
        } catch (error) {
        console.log(error);
        config.errorMsg(this, "查找工种失败");
      }
    },
    
    //批量删除
    toBatchDelete() {
      //获取要批量删除的id  this.id
      let ids = this.ids;
      console.log(ids);
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteEmploymentById({ id: id });
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllEmp();
              }, 2000);
            }
          }
        });
      } else {
        this.$message({
          message: "请选中要删除的数据",
          type: "warning"
        });
      }
    },
    //查找所有职业类型信息
    async findAllEmpType() {
      try {
        let res = await findEmploymentByJob();
        this.EmploymentTypeData = res.data;
      } catch (error) {
        console.log(error)
        config.errorMsg(this, "查找错误");
      }
    },
    // 职业发生改变
    async EmploymentChange(val) {
      if (val) {
        try {
          let res = await findEmploymentByJob({ job: val });
          this.EmploymentData = res.data;
          this.EmploymentData.forEach(res=>{
            let index =res.publishTime.indexOf("T")
            let index1 =res.publishTime.indexOf(".")
            let a = res.publishTime.substring(0,index);
            let b = res.publishTime.substring(index+1,index1);
            res.publishTime = a+" "+b;

            this.$set(res,'show_description',false)
          })
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "信息错误");
        }
      } else {
        this.findAllEmp();
      }
    },

    //查看
    async toSee(row){
       try{
         this.company ={} 
         console.log(row)
        row.show_description =true;
        console.log(row.businessId)
        let res  = await findBusinessById({id:row.businessId})
        this.company = res.data;
        console.log(this.company)

       }catch(err){
        console.log(err)
       }

    },
    //编辑
    async toEdit(row){
      try{
        this.company ={} 
        row.show_update =true;
        console.log(row)
        let res  = await findBusinessById({id:row.businessId})
        this.company = res.data;
        console.log(this.company)

       }catch(err){
        console.log(err)
       }
    },
    //页面发生转换
    pageChange(page){
      this.currentPage = page;
    },
    // 提交表单进行修改
    async postForm(row){
      try{
        row.show_update=false;
        let res = await saveOrUpdateEmployment(row);
        this.findAllEmp();
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }catch(err){
        console.log(err)
      }
    },
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      this.ids = val.map(item=>{return item.id});
    
    },
    // 查找所有招聘信息
    async findAllEmp() {
      try {
        let res = await findAllEmployment();
        this.EmploymentData = res.data.reverse();
        this.EmploymentData.forEach(res=>{
            let index =res.publishTime.indexOf("T")
            let index1 =res.publishTime.indexOf(".")
            let a = res.publishTime.substring(0,index);
            let b = res.publishTime.substring(index+1,index1);
            res.publishTime = a+" "+b;
            this.$set(res,'show_description',false)
            this.$set(res,'show_update',false)
        })
        console.log(this.EmploymentData)
      } catch (error) {
        console.log(error,'====')
        config.errorMsg(this, "查找错误");
      }
    },
    
    // 删除按钮
    toDelete(id) {
      //row代表当前要删除的city对象
      this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          //访问后台接口
          //try后面跟着catch
           try {
             console.log("555")
             console.log(id)
            let res = await deleteEmploymentById({id:id});
            console.log(res.status)
            if (res.status===200){
              config.successMsg(this,'删除成功');
            // config.log('删除成功');
              this.findAllEmp();
            }
            else{
              config.erroMsg(this,'删除失败');
              // config.log('删除失败');
            }
          
        }catch(error){
          config.erroMsg(this,'删除失败');
          // config.log('删除失败1');
        }
    })
    }

    },
    created() {
      this.findAllEmp();
      this.findAllEmpType();
    },
    mounted() {}
    };
  </script>
  <style lang="scss" scoped>
  .seeDiv {
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    font-weight: bold;
    span {
      color: #777;
    }
  }
  .main{
  margin-left: 10%;
  margin-right: 10%;
}
  .tableDiv{
  margin-top: 2em;
  width:100%;
  border: 2px solid #008080;
}
.seeDiv::after{
        content:".";
        clear:both;
        display:block;
        height:0;
        overflow:hidden;
        visibility:hidden;
}


  </style>