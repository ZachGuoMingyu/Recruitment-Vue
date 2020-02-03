/*
 * @Author: guomy 
 * @Date: 2019-12-28 09:08:51 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-29 16:14:22
 */
<template>
  <div id="userList">
    <div class="main">
      <div class="row">
      <!-- 添加用户按钮 -->
      <div class="addbtnDiv">
          <el-button @click="toAdd" type="danger" icon="el-icon-circle-plus-outline">添加用户</el-button>
          <el-button @click="toIn" type="primary" icon="el-icon-upload">导入用户</el-button>
      </div>
      <!-- 按条件查找选择框 -->
      <div class="searchDiv">
         <el-select @change="educationChange"  v-model="education" clearable placeholder="学历" >
            <el-option v-for="item in educationData" :key="item"  :label="item" :value="item"></el-option>
         </el-select>
         <el-select @change="genderChange" v-model="gender" clearable placeholder="性别" >
            <el-option v-for="item in genderData" :key="item" :label="item" :value="item"> </el-option>
         </el-select>
      </div>
    </div>

    <!-- 表格 -->
    <div class="tableDiv">
        <el-table @selection-change="selectionChange" :data="userList" :header-cell-style="headClass" >
          <el-table-column align="center" type="selection" ></el-table-column>
          <!-- <el-table-column prop="id" label="id" width="180"></el-table-column> -->
          <el-table-column align="center" prop="username" label="用户名" ></el-table-column>
          <el-table-column align="center" prop="realname" label="姓名" ></el-table-column>
          <el-table-column align="center" prop="telephone" label="手机" ></el-table-column>
          <el-table-column align="center" prop="gender" label="性别" ></el-table-column>
          <el-table-column align="center" prop="birth" label="出生年月" ></el-table-column>
          <el-table-column align="center" prop="education" label="最高学历" ></el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="toEdit(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="toSingleDelete(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>

    <!-- 修改模态框 -->
    <el-dialog title="修改用户信息" :visible.sync="editVisible" width="60%" :before-close="beforeClose">
      <el-form :model="editUser" :rules="rules" ref="ruleForm">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
              <el-input v-model="editUser.username" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="realname" label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="editUser.realname" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="telephone" label="手机号" :label-width="formLabelWidth">
              <el-input v-model="editUser.telephone" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="birth" label="出生年月" :label-width="formLabelWidth">
              <el-input v-model="editUser.birth" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="education" label="学历" :label-width="formLabelWidth">
              <el-select clearable v-model="editUser.education" placeholder="请选择学历">
                <el-option v-for="item in educationData" :key="item"  :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
              <el-select clearable v-model="editUser.gender" placeholder="请选择性别">
                <el-option v-for="item in genderData" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="toSave('ruleForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" :visible.sync="addVisible"  :before-close="beforeClose">
      <el-form :model="user" :rules="rules" ref="ruleForm">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
              <el-input v-model="user.username" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="realname" label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="user.realname" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="telephone" label="手机号" :label-width="formLabelWidth">
              <el-input v-model="user.telephone" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="birth" label="出生年月" :label-width="formLabelWidth">
              <el-input v-model="user.birth" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="education" label="学历" :label-width="formLabelWidth">
              <el-select clearable v-model="user.education" placeholder="请选择学历">
                <el-option v-for="item in educationData" :key="item"  :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
              <el-select clearable v-model="user.gender" placeholder="请选择性别">
                <el-option v-for="item in genderData" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="toAddSave('ruleForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 导入用户模态框 -->
    <el-dialog title="导入说明" :visible.sync="inVisible"  :before-close="beforeClose">
      <el-form :model="inuser" :rules="rules" ref="ruleForm">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="注意:" >
              <span>使用导入功能请按照模板表格规定的字段去填写对应信息，您可以点击按钮下载模板表格，填写后在下提交 ：</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-button type="primary" plain size="mini">下载模板</el-button>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple align="center">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传.docx文件，且不超过2M</div>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="toInSave('ruleForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <div class="footerDiv">
        <!-- 多个删除按钮 -->
        <el-button @click="toBatchDelete" type="danger" plain size="mini">批量删除</el-button>
        <!-- 分页 -->
        <div class="page">
          <el-pagination background layout="prev, pager, next" :page-size="pageSize" @current-change="currentChange" :current-page.sync="currentPage" :total="userData.length"></el-pagination>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import {saveOrUpdateJobhunter,findAllJobhunter,deleteJobhunterById,findJobhunterByEducation,findJobhunterByGender} from '@/api/user.js';
import config from '@/utils/config.js';
export default {

  data() {
    return {
      //用户
      user:{
        username:'',
        realname:'',
        telephone:'',
        birth:'',
        education:'',
        gender:'',
      },
      //导入用户
      inuser:{},
      //学历
      education:'',
      //性别
      gender:'',
      //用户数组
      userData:[],
      //学历数组
      educationData:[],
      //性别数组
      genderData:[],
      //分页
      currentPage:1,
      pageSize:config.pageSize,
      //批量删除ids
      ids: [],
      //需要修改的对象
      editUser:'',
      //修改模态框标题名称的所占宽度
      formLabelWidth:'80px',
      //修改模态框显示与否
      editVisible:false,
      //校验规则
      rules: {
        // trigger: 'blur' ,失焦的时候校验。
        //trigger: 'change'，发生改变的时候进行校验有无选择，若没有选择，就提示让用户进行选择
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          birth: [
            { required: true, message: '请输入出生年月', trigger: 'blur' }
          ],
          education: [
            { required: true, message: '请选择学历', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
        },
        addVisible:false,
        inVisible:false,
    };
  },
  computed: {
    //分页数据
    userList(){
      let temp = [...this.userData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize);
    }
  },
  methods: {
    //查找所有用户信息
    async findAllUser(){
      try{
        let res = await findAllJobhunter();
        this.userData = res.data;
        //学历数组
        let educationArr = res.data.map((item)=>{
          return item.education;
       })
       this.educationData = [...new Set(educationArr)];
       //性别数组
        let genderArr = res.data.map((item)=>{
          return item.gender;
       })
       this.genderData = [...new Set(genderArr)];
      }catch(error){
        config.errorMsg(this,'查找错误');
      }
      },
    //页数发生改变
    currentChange(page){
      this.currentPage = page;
    },
    //添加按钮
    toAdd(){
      this.addVisible = true;
      this.user = {};
    },
    //导入按钮
    toIn(){
      this.inVisible = true;
      this.user = {};
    },
    //编辑
    toEdit(row){
      //对象：花括号，数组：中括号
      this.editUser= {...row};
      this.editVisible = true;
    },
    //添加模态框保存
    toAddSave(formName){
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          //保存
          try {
            let res = await saveOrUpdateJobhunter(this.user);
            if(res.status === 200){
              this.findAllUser();
              this.addVisible = false;
              config.successMsg(this,'修改成功');
            }else{
              config.errorMsg(this,'修改失败');
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this,'修改失败');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改模态框保存
    toSave(formName){
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          //保存
          try {
            let res = await saveOrUpdateJobhunter(this.editUser);
            if(res.status === 200){
              this.findAllUser();
              this.editVisible = false;
              config.successMsg(this,'修改成功');
            }else{
              config.errorMsg(this,'修改失败');
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this,'修改失败');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //导入模态框保存
    toInSave(formName){
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          //保存
          try {
            let res = await saveOrUpdateJobhunter(this.inuser);
            if(res.status === 200){
              this.findAllUser();
              this.inVisible = false;
              config.successMsg(this,'修改成功');
            }else{
              config.errorMsg(this,'修改失败');
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this,'修改失败');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //关闭模态框
    toCancel(formName){
      //重置表单验证,关闭模态框
      this.$refs[formName].resetFields();
      this.editVisible = false;
      this.addVisible = false;
      this.inVisible = false;
    },
    beforeClose(){
      this.$refs['ruleForm'].resetFields();
      this.editVisible = false;
      this.inVisible = false;
      this.addVisible = false;
    },
    //单个删除
    async toSingleDelete(id){
      // alert("删除");
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteJobhunterById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllUser();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },
    //多个删除
    toBatchDelete() {
      //获取要批量删除的id  this.ids
      let ids = this.ids;
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteJobhunterById({ id: id });
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
                this.findAllUser();
              });
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
    // 表头样式设置
    headClass () {
      return 'background:#008080;color:#fff;height:50px;font-size:16px;'
    },
    //学历发生改变
    async educationChange(val){
      this.gender = '';
      //val 是当前选中的option的value值
      // console.log(val);
      if(val){
         try {
        //如果单单写province，就只是传递一个值，应该这样写：{province:val}
        let res = await findJobhunterByEducation({education:val});
        this.userData = res.data;
        this.currentPage = 1;
      } catch (error) {
        config.errorMsg(this,'通过学历查找客服信息错误');
      }
      }else{
        this.findAllUser();
      }
    },
    //性别发生改变
    async genderChange(val){
      this.education = '';
      //val 是当前选中的option的value值
      // console.log(val);
      if(val){
         try {
        //如果单单写province，就只是传递一个值，应该这样写：{province:val}
        let res = await findJobhunterByGender({gender:val});
        this.userData = res.data;
        this.currentPage = 1;
      } catch (error) {
        config.errorMsg(this,'通过学历查找客服信息错误');
      }
      }else{
        this.findAllUser();
      }
    },

  },
  created() {
    this.findAllUser();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.main{
  margin-left: 10%;
  margin-right: 10%;
}
.searchDiv{
  margin-top: 3em;
}
.tableDiv{
  margin-top: 2em;
  width:100%;
  border: 2px solid #008080;
}
.addbtnDiv{
  float: right;
}
.footerDiv{
  overflow: hidden;
    margin-top: 10px;

  .deleteDiv{
    float: left;
  }
  .page{
    float: right;
  }
}
</style>