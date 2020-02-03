/*
 * @Author: guomy 
 * 城市管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-23 21:07:46
 */
<template>
  <div id="moduleCity">
        <!-- 添加职位按钮 -->
        <div class="row" id="adv_btn">
          <el-button type="warning" @click="new_city_add=true"><i class="el-icon-circle-plus-outline" >添加省份</i></el-button>
        </div>
        <!-- 职位模块 -->
        <div class="row el-col-24">
          <!-- 使用卡片的形式展示 -->
          <!-- 主体内容 -->
          <div class="el-col-6 adv_model contact"  style="height:280px;display: inline-block;" v-for="province in provinces">
            <!-- 名称 -->
            <div class="row adv_model_title">
              
              <el-popover
                  width="160"
                  placement="top"
                  v-model="province.title_show">
                  <p>是否删除一个省份?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="province.title_show = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="deelteprovince(province.id)">确定</el-button>
                  </div>
                <el-button type="text" slot="reference" style="margin-left:90%;color:#fff;" ><i class="el-icon-circle-close" style="font-size: 1.5em;"></i></el-button>
              </el-popover>
              <p style="height: 0.1em; padding-bottom: 0.5em;margin: 0px;position: relative;bottom: 2em;">{{province.name}}</p>
            </div>
            <!-- 内容 -->
            <div class="row adv_model_context" style="height: 120px;overflow: auto;" >
              <!-- 标签的管理  (删除修改) -->
              <div style="display: inline" v-for="city in citys" >
                <div style="display: inline-block;margin-left: 1em;"  v-if="city.provinceId==province.id">
                <el-popover width="50" v-model="city.visible" :close-delay="0" :open-delay="0">
                  <div style="text-align: center; margin: 0">
                    <el-button size="mini" type="danger" @click="deleteCity(city.id,city)">删除</el-button>
                  </div>
                  <el-button slot="reference" style="border: 0px solid black;" >
                    <span style="color: black;font-size: 1.5em;">{{city.name}}</span>
                  </el-button>
                </el-popover>
              </div>
            </div>
            </div>
            <div class="row" style="margin-left: 10%;" > 
              <div class="el-col-24" id="city_input_add">
                <el-input v-model="province.input" @change="addCity(province.id,province.input,province)">
                  <template slot="append">
                    <el-button type="primary" style="border-radius: 0px;" @click="addCity(province.id,province.input,province)">添加</el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <!-- 添加省份模块 -->
        <el-dialog title="添加省份" :visible.sync="new_city_add" width="30%" center>
          <el-form>
            <el-form-item label="城市:"label-width="10%">
              <el-input v-model="province.name" @change="addprovince"></el-input>
            </el-form-item>
            <el-button type = "primary" style="margin-left: 30%; width: 40%;" @click="addprovince">添加</el-button>
          </el-form>
        </el-dialog>
  </div>
</template>

<script>
  import { findAllCity,findAllProvince,deleteCityByid,ToaddCity,ToaddProvince,deleteProvince } from "@/api/city.js"
export default {
  data() {
    return {
      adv_add:false,
      // 存储获取到的城市
      citys:[],
      // 存取获取到的省份
      provinces:[],
      // 添加城市 传到后台的参数
      City:{
        name:"",
        provinceId:""
      },
      // 
      new_city_add:false,
      // 添加省份 传到后台的参数
      province:{
        name:"",
      },
      // 删除省份
      delete_province:{
        id:""
      },
    };
  },
  computed: {},
  methods: {
    // 查找所有的城市
    async findAllData(){
      try{
        let res =await findAllCity();
        this.citys = res.data;
      }catch(err){
        this.$notify.error({
          title: "错误",
          message: "查找失败1"
        });
      }
    },
    // 查找所有的省份
    async findAllProvince(){
      try{
        let res = await findAllProvince();
        this.provinces = res.data.reverse();
        provinces.forEach(msg=>{
          this.$set(msg,'input','');
          // 用于判断删除省份
          this.$set(msg,'title_show',false)
          this.$set(msg,'visible',false)
        });
      }
      catch(err){
       
      }
    },
    // 删除对应id的城市
    async deleteCity(id,city){
      try{
      
      let res= await deleteCityByid(id);
        if(res.status==200){
          this.findAllData();
          city.visible=false;
          this.$message({
            message:"删除成功",
            type: 'success'
          })
        }
      }catch(err){
        this.$notifi.error({
          title:"错误",
          message:"删除失败"
        })
      } 
    },
    // 添加城市
    async addCity(provinceId,citysname,province){
      
        let ListCity = citysname.split(",");
        let res =await findAllCity();
        this.City =res.data
        this.City.provinceId =provinceId;
        for (let city in ListCity){
          this.City.name =ListCity[city]
          console.log(ListCity[city])
          let es = await ToaddCity(this.City);
          let msg = await findAllCity();
          this.citys = msg.data
        }
        province.input="";
     
    },
    // 添加省份
    async addprovince(){
      try{
        if(this.province.name!=""&&this.province.name!=null){
        let res = await ToaddProvince(this.province);
        this.findAllProvince();
        this.new_city_add=false;
        this.province.name="";
        this.$message({
          message: '添加省份成功',
          type: 'success'
        });
        }
        else{
          this.$message.error('添加省份失败');
          this.new_city_add=false;
          this.province.name="";
        }
      }catch(err){
        
      }
    },
    // 删除城市
    async deelteprovince(province_id){
      try{
        this.delete_province.id=province_id;
        let res =await deleteProvince(this.delete_province);
        this.findAllProvince();
      }catch(err){
        
      }
    }
  },
 
  created() {
    this.findAllData();
    this.findAllProvince();
  },
  mounted() {}
};
</script>
<style scoped>
    #adv_btn{
    margin-top: 0.5em;
    margin-left: 90%;
  }
  .adv_model_title{
    margin-left: 10%;
    margin-top: 1em;
    width: 90%;
    background-color: teal;
    color: #fff;
    font-size: 1.2em;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-align: center;
  }
  .adv_model_context{
    margin-left: 10%;
    width:90%;
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    padding-left: 0.8em;
    padding-right: 0.8em;
    border-left: teal 1px solid;
    border-right: teal 1px solid;
  }
  #city_input_add{
    border-left: teal 1px solid;
    border-right: teal 1px solid;
    border-bottom:teal 1px solid ;
  }
  /deep/ .el-input-group__append button{
    background-color: rgb(91, 156, 241);
    color: #fff;
  }
 
 
</style>