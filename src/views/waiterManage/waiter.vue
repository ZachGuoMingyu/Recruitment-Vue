/*
 * @Author: guomy 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-29 15:06:10
 */
 <template>
    <div id="CustomerServiceList">
      <div class="main">
        <div class="searchDiv">
          <el-select @change="statusChange" v-model="status" clearable placeholder="状态">
            <el-option v-for="item in statusData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select @change="genderChange" v-model="gender" clearable placeholder="性别">
            <el-option v-for="item in genderData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-dialog title="工作分配" :visible.sync="showfp" width = "60%" > 
            <el-dialog  width="30% " title="经手人信息" :visible.sync="waiterMessage" append-to-body>
              <div>已处理：10</div>
              <div>未处理：5</div>
            </el-dialog>
            <el-table :data="giveData" width="100%">
             <el-table-column prop="jobhunter" label="求职人"></el-table-column>
             <el-table-column prop="contact" label="联系方式"></el-table-column>
             <el-table-column prop="job" label="求职岗位" width="300"></el-table-column>
             <el-table-column prop="waiter" label="经手人">
               <template slot-scope="scope">
                 <el-button @click="waiter" type="text" size="small">{{scope.row.waiter}}</el-button>
               </template>
             </el-table-column>
             <el-table-column prop="time" label="申请时间"></el-table-column>
            </el-table>
         </el-dialog>
     <div class="addWaiterDiv" >
    <template>
          <el-button @click="addWaiter" type="danger" icon="el-icon-circle-plus-outline">添加客服</el-button>
          <el-button type="primary" icon="el-icon-upload">导入客服</el-button>
    </template>
    <el-dialog title="添加客服信息" :visible.sync="addWai">
      <el-form :model="addform" :rules="rules" ref="ruleForm">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth" >
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="realname" label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addform.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
          <el-select clearable v-model="addform.gender" placeholder="请选择性别">
           <el-option v-for="item in genderData" :key="item"  :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
           <el-select clearable v-model="addform.status" placeholder="请选择状态">
             <el-option v-for="item in statusData" :key="item"  :label="item" :value="item"></el-option>
           </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
     </div>
    </div>
        <div class="tableDiv">
        <el-table ref="multipleTable" :data="CustomerServiceList" tooltip-effect="dark" style="width: 100%"
        @selection-change = "selectionChange" :header-cell-style="headClass">
        <el-table-column align="center" type="selection" width="55">
        
        </el-table-column>
        <el-table-column align="center" prop="username" label="用户名">
        
        </el-table-column>
        <el-table-column align="center" prop="realname" label="姓名">
        
        </el-table-column>
        <el-table-column align="center" prop="gender" label="性别">
        
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态" >
        
        </el-table-column>
        <el-table-column align="center" label="分配工作">
          <template slot-scope="scope">
            <el-button @click="toGive(scope.row)" type="text" size="small">分配</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
       <div class="footerDiv">
        <div class="btnDiv">
           <el-button @click="toBatchDelete" type="danger" plain size='mini'>批量删除</el-button>
        </div>
        <div class="pageDiv">
    <el-pagination
          :page-size="pageSize"
          current-page.sync = "currentpage"
          background
          @current-change= "pageChange"
      layout="prev, pager, next"
      :total="CustomerServiceData.length">
    </el-pagination>
        </div>
           <el-dialog title="工作分配"  width = "60%" > 
      <el-dialog  width="30% " title="经手人信息" :visible.sync="waiterMessage" append-to-body>
        <div>已处理：10</div>
        <div>未处理：5</div>
      </el-dialog>
    </el-dialog>
      </div>
      </div>
    </div>
</template>
<script>
import { findAllCustomerService } from "@/api/waiter.js";
import { deleteCustomerServiceById } from "@/api/waiter.js";
import { findCustomerServiceByEducation } from "@/api/waiter.js";
import { findCustomerServiceByGender,saveOrUpdateCustomerService} from "@/api/waiter.js";
import config from'@/utils/config.js'
export default {
  data() {
    return {
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          realname:[
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          gender:[
            { required: true, message: '请输入性别', trigger: 'blur' },
          ],
          status:[
            { required: true, message: '请输入状态', trigger: 'blur' },
          ],
         
        },
      addWai: false,
        addform: {
          username: '',
          realname: '',
          gender: '',
          status: '',  
        },
      //客服分配表
      giveData: [{
          jobhunter: '翟潇闻',
          contact: '15133548798',
          job: '190/天上一休一连锁超市急招营业员',
          waiter:'程一一',
          time:'2019/12/27'
        }, {
         jobhunter: '翟潇闻',
          contact: '15133548798',
          job: '190/天上一休一连锁超市急招营业员',
          waiter:'程一一',
          time:'2019/12/27'
        }, {
          jobhunter: '翟潇闻',
          contact: '15133548798',
          job: '190/天上一休一连锁超市急招营业员',
          waiter:'程一一',
          time:'2019/12/27'
        }, {
          jobhunter: '翟潇闻',
          contact: '15133548798',
          job: '190/天上一休一连锁超市急招营业员',
          waiter:'程一一',
          time:'2019/12/27'
        }],
        formLabelWidth: '120px',
      //客服
      CustomerService:"",
      //状态
      status:"",
      //性别
      gender:"",
      //客服数组
      CustomerServiceData:[],
      //状态数组
      statusData:[],
      //性别数组
      genderData:[],
     currentPage:1,
      //每页条数
      pageSize:config.pageSize,
      //批量删除
      ids:[],
      showfp:false,
      waiterMessage:false,
      addWai:false,
    };
  },
  computed: {
    CustomerServiceList(){
      let temp = [...this.CustomerServiceData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page* pageSize);
    }
  },
  methods: {
     // 表头样式设置
    headClass () {
      return 'background:#008080;color:#fff;height:50px;font-size:16px;'
    },

    //关闭模态框
      beforeClose(){
      //重置表单验证，关闭模态框
      this.$refs["ruleForm"].resetFields();
      this.addWai = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.addWai = false;
    },
    //保存
        toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //保存
          try {
            let res = await saveOrUpdateCustomerService(this.addform);
            if (res.status === 200) {
              this.findAllCs();
              this.addWai = false;
              config.successMsg(this, "添加成功");
            } else {
              config.errorMsg(this, "添加失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "添加失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加客服
    addWaiter(){
      this.addWai =true;
      this.addform={}
    },
    //经手人信息
    waiter(){
      this.waiterMessage =true;
    },
    //分配
    toGive(row){
      this.showfp =true;
    },
    pageChange(page){
      this.currentPage = page;
    },
    //状态发生改变
       async statusChange(val){
         this.gender = '';
         //val是option的value值
         console.log(val);
         if(val){
           try {
           let res = await findCustomerServiceByEducation(
             {status:val});
             this.CustomerServiceData = res.data;
         } catch (error) {
           config.errorMsg(this,'通过状态查找客服信息错误');
         }
       } else{
         this.findAllCs();
       }
     },
    //性别发生改变
       async genderChange(val){
         this.status = '';
         //val是option的value值
         console.log(val);
         if(val){
           try {
           let res = await findCustomerServiceByGender(
             {gender:val});
             this.CustomerServiceData = res.data;
         } catch (error) {
           config.errorMsg(this,'通过性别查找客服信息错误');
         }
       } else{
         this.findAllCs();
       }
     },
//删除
  toDelete(id){
            this.$confirm('是否删除该记录？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          //访问后台接口
          try {
            let res = await
            deleteCustomerServiceById({id:id});
            if(res.status===200){
              config.successMsg(this,'删除成功');
              this.findAllCs();
            }else{
              config.errorMsg(this,'删除失败');
            }
          } catch (error) {
            config.errorMsg(this,'删除失败');
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
        //批量删除
    toBatchDelete(){
      //获取批量删除的id
      let ids = this.ids;
      if(ids.length>0){
        this.$alert('是否删除？', '提示', {
          confirmButtonText: '删除',
          callback: action => {
            if(action==='confirm'){
              let result = [];
              ids.forEach(async id=>{try {
            let res = await
            deleteCustomerServiceById({id:id});
            result.push(res.status);
          } catch (error) {
                result.push(500);
          }
         });
          setTimeout(()=>{
          //判断是否都是200
          let resu = result.every(item => {return item ===200;});
          if(resu){
            config.successMsg(this,"批量删除成功");
          }else{
            config.errorMsg(this,"批量删除失败");
            }
            this.findAllCs();
          },2000);
        }
      }
    });
  }else{
         this.$message({
          message: '请选中要删除的数据',
          type: 'warning'
        });
      }
    },
    //复选框选中切换
    selectionChange(val){
      //val就是选中的对象组成的数组
      // console.log(val)
      let ids = val.map(item =>{return item.id;});
      this .ids = ids;
    },
    //查找所有客服信息
    async findAllCs(){
      try {
       let res = await findAllCustomerService();
       this.CustomerServiceData = res.data; 
       this.currentPage = 1;
       //状态数组
       let statusArr= res.data.map((item)=>{return item.status;})
       this.statusData = [...new Set(statusArr)];//去重
       //性别数组
       let genderArr= res.data.map((item)=>{return item.gender;})
       this.genderData = [...new Set(genderArr)];
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
  },
  created() {
    this.findAllCs();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>

.tableDiv{
  margin-top: 2em;
  width:100%;
  border: 2px solid #008080;
}

.footerDiv{
  overflow: hidden;
  margin-top: 10px;
.btnDiv{
    float: left;
  }
.pageDiv{
    float: right;
  }
}
.addWaiterDiv{
  float: right;
}
.main{
  margin-left: 10%;
  margin-right:10%
}
.searchDiv{
  margin-top: 3em;
}
</style>