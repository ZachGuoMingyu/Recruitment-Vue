/*
 * @Author: guomy 
 * @Date: 2019-12-28 17:35:04 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-28 20:03:00
 */

<template>
  <div id="businessList">
    <div class="main">
    <div class="searchDiv">
      <el-select @change="provinceChange" v-model="province" clearable placeholder="省份">
        <el-option
          v-for="item in provinceData"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select @change="cityChange" v-model="city" clearable placeholder="城市">
        <el-option v-for="item in cityData" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select @change="industryChange" v-model="industry" clearable placeholder="行业">
        <el-option v-for="item in industryData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select @change="scaleChange" v-model="scale" clearable placeholder="规模">
        <el-option v-for="item in scaleData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="businessList"
        tooltip-effect="dark"
        style="width: 100%;font-size: 1.1em;"
        @selection-change="selectionChange" :header-cell-style="headClass"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="contactName" width="150" label="联系人"></el-table-column>
        <el-table-column align="center" prop="industry"  label="行业"></el-table-column>
        <el-table-column align="center" width="180" label="所在地">
          <template slot-scope="scope">{{scope.row.province}}-{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column align="center" prop="scale" label="公司规模"></el-table-column>
        <el-table-column align="center" label="详情"  width="100">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="150" >
          <template slot-scope="scope">
            <el-button type="primary" @click="toEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="danger" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footerDiv">
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="businessData.length"
        ></el-pagination>
      </div>
    </div>
    <!-- 查看模态框 -->
    <el-dialog :title="currentBus.name" :visible.sync="seeVisible">
      <span slot="title" style="color: black;text-align: left; font-size: 1.5em; font-weight: bolder;padding-left: 8px;">{{currentBus.name}}</span>
      <!-- 类型 -->
      <div class="row" style="text-align: left; border-bottom:1px #cccccc solid;border-top:#cccccc 1px solid;" >
        <!-- 行业类型 -->
        <p style="font-size: 1.1em; color: #778877;"><span>类型:</span>{{currentBus.industry}}</p>
        <!--  公司规模 -->
        <p style="font-size: 1.1em; color: #778877;"><span>规模:</span>{{currentBus.scale}}人</p>
      </div>
      <!-- 公司重要信息 -->
      <div class="row" style="border-bottom:1px #cccccc solid ;">
        <p  style="font-size: 1.1em; color: #778877;"><span>成立时间:</span>{{currentBus.establishedTime}}</p>
        <p  style="font-size: 1.1em; color: #778877;"><span>注册资本:</span>{{currentBus.registeredCapital}}</p>
      </div>
      <!-- 详细信息 -->
      <div class="row" style="border-bottom:1px #cccccc solid ;">
        <p>{{currentBus.description}}</p>
      </div>
      <!-- 营业执照 -->
      <div class="row" style="text-align: center;">
        <img src="../../assets/营业执照.jpg" alt="" width="50%">
      </div>
      
    </el-dialog>
    <!-- 修改模态框 -->
    <el-dialog title="修改商家信息" :visible.sync="editVisible" width="60%">
      <el-form :model="currentBus" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name" label="公司名称" :label-width="formLabelWidth">
              <el-input v-model="currentBus.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="industry" label="所属行业" :label-width="formLabelWidth">
              <el-input v-model="currentBus.industry"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="scale" label="公司规模" :label-width="formLabelWidth">
              <el-input v-model="currentBus.scale"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="所在城市" :label-width="formLabelWidth">
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="province">
                    <el-select
                      clearable
                      @change="dialogProChange"
                      v-model="currentBus.province"
                      placeholder="请选择省份">
                      <el-option
                        v-for="item in provinceData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="city">
                    <el-select clearable v-model="currentBus.city" placeholder="请选择城市">
                      <el-option
                        v-for="item in provinceCityData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="contactName" label="联系人" :label-width="formLabelWidth">
              <el-input v-model="currentBus.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="currentBus.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="location" label="详细地址" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="currentBus.location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="description" label="公司简介" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="currentBus.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { findAllProvince } from "@/api/province_zhuyanling.js";
import { findAllCity, findCityByProvinceId } from "@/api/city_zhuyanling.js";
import {
  findAllBusiness,
  findBusinessByProvince,
  findBusinessByCity,
  findBusinessByIndustry,
  findBusinessByScale,
  deleteBusinessById,
  saveOrUpdateBusiness
} from "@/api/business.js";
import config from "@/utils/config.js";
export default {
  data() {
    return {
      //省份
      province: "",
      //城市
      city: "",
      //行业
      industry: "",
      //规模
      scale: "",
      //省份数组
      provinceData: [],
      //城市数组
      cityData: [],
      //行业数组
      industryData: [],
      //规模数组
      scaleData: [],
      //商家数组
      businessData: [],
      //商家列表，表格数据
      // businessList: [],
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: config.pageSize,
      //批量删除ids
      ids: [],
      //当前查看或修改的对象
      currentBus: {},
      //查看模态框显示与否
      seeVisible: false,
      //修改模态框显示与否
      editVisible: false,
      //修改模态框标题名称所占宽度
      formLabelWidth: "80px",
      //省份对应的城市信息
      provinceCityData: [],
      //校验规则
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        industry: [
          { required: true, message: "请输入行业类型", trigger: "blur" }
        ],
        scale: [{ required: true, message: "请输入公司规模", trigger: "blur" }],
        contactName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入公司简介", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }]
      }
    };
  },
  computed: {
    //分页数据
    businessList() {
      let temp = [...this.businessData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    //保存
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //通过验证
          let province = this.currentBus.province;
          // console.log(province);
          // console.log(typeof province);
          // console.log(+province);    NaN  8
          //如果省份发生更改
          if (+province) {
            //将省份id处理为省份名字，过滤省份数组
            let result = this.provinceData.filter(item => {
              return item.id === +province;
            })[0];
            // result 是省份对象
            this.currentBus.province = result.name;
          }
          //保存
          try {
            let res = await saveOrUpdateBusiness(this.currentBus);
            if (res.status === 200) {
              this.findAllBus();
              this.editVisible = false;
              config.successMsg(this, "修改成功");
            } else {
              config.errorMsg(this, "修改失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "修改失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //模态框省份发生改变
    async dialogProChange(val) {
      // console.log(val);
      //重置城市下拉列表
      this.currentBus.city = "";
      //通过省份id获取城市
      try {
        let res = await findCityByProvinceId({ provinceId: val });
        this.provinceCityData = res.data;
      } catch (error) {
        console.log(error);
        config.errorMsg(this, "通过省份查找城市失败");
      }
    },
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },
    //省份发生改变
    async provinceChange(val) {
      this.city = "";
      this.industry = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByProvince({ province: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过省份查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //城市发生改变
    async cityChange(val) {
      this.province = "";
      this.industry = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByCity({ city: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过城市查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //行业发生改变
    async industryChange(val) {
      this.province = "";
      this.city = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByIndustry({ industry: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过行业查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //规模发生改变
    async scaleChange(val) {
      this.province = "";
      this.city = "";
      this.industry = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByScale({ scale: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过规模查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //查看
    toSee(row) {
      this.currentBus = { ...row };
      this.seeVisible = true;
    },
    //编辑
    toEdit(row) {
      this.currentBus = { ...row };
      this.editVisible = true;
    },
    //删除
    toDelete(id) {
      // alert("删除");
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteBusinessById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllBus();
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
    //批量删除
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
                  let res = await deleteBusinessById({ id: id });
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
                this.findAllBus();
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
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },
    //查找所有省份信息
    async findAllPro() {
      try {
        let res = await findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查找所有城市信息
    async findAllCi() {
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查找所有的商家信息
    async findAllBus() {
      try {
        let res = await findAllBusiness();
        this.businessData = res.data.reverse();
        this.currentPage = 1;
        //行业数组
        let industryArr = res.data.map(item => {
          return item.industry;
        });
        //去重
        this.industryData = [...new Set(industryArr)];
        //规模数组
        let scaleArr = res.data.map(item => {
          return item.scale;
        });
        //去重
        this.scaleData = [...new Set(scaleArr)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
      // 表头样式设置
    headClass () {
      return 'background:#008080;color:#fff;height:50px;font-size:16px;'
    },
  },
  created() {
    this.findAllPro();
    this.findAllCi();
    this.findAllBus();
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
.footerDiv {
  overflow: hidden;
  margin-top: 10px;
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
  }
}
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
  span {
    color: #777;
  }
}
.descDiv {
  font-weight: bold;
  color: #777;
  font-size: 12px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.imgDiv {
  text-align: center;
}
.dialog-footer {
  text-align: center;
  margin-top: -30px;
}
.main{
  margin-left: 10%;
  margin-right: 10%;
}
.searchDiv{
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