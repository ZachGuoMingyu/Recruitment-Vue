/*
 * @Author: guomy 
 * 商家审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: zachGmymymy
 * @Last Modified time: 2020-02-03 10:51:43
 */
<template>
  <div id="businessCheck">
    <div class="row" id="check_main">
      <!-- 筛选模块 -->
      <div class="row" style="margin-bottom: 2em;">
        <!-- 根据省份筛选 -->
        <template>
          <el-select v-model="province_value"  clearable placeholder="省份" @change="provinceAndcity(province_value)">
            <el-option
              v-for="province in provinceList"
              :key="province"
              :label="province"
              :value="province"
              align="center">
            </el-option>
          </el-select>
        </template>
        <!-- 根据城市筛选 -->
        <template>
          <el-select v-model="city_value" clearable placeholder="城市" @change="FindBusinessByCiyt(city_value)">
            <el-option
              v-for="city in citysList"
              :key="city"
              :label="city"
              :value="city"
              align="center">
            </el-option>
          </el-select>
        </template>
        <!-- 根据规模筛选 -->
        <template>
          <el-select v-model="scale_value" clearable placeholder="规模" @change="FindBusinessByScale(scale_value)">
            <el-option
              v-for="scale in scaleList"
              :key="scale"
              :label="scale"
              :value="scale"
              align="center">
            </el-option>
          </el-select>
        </template>
      </div>
      <!-- 审核展示页面 -->
      <div class="row">
        <!-- table表 -->
        <template >
          <el-table
            :data="business.slice(pageSize*(currentPage-1),pageSize*currentPage)"
            style="width: 100%;border :2px solid teal"
            align="center"
            :header-cell-style="{background:'teal',color:'#fff',height:'3.5em',fontSize:'1.1em'}"
            >
            <el-table-column width="70" align="center" label="#">
              <template slot-scope="scope">
                <input type="checkbox" v-model="checked" :value="scope.row.id" style="zoom:130%">
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="公司名称"
              width="180"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="contactName"
              label="申请人"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="contactPhone"
              label="联系方式"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              
              label="所在地"
              width="100"
              align="center">
                <span slot-scope="scope">{{scope.row.province}}-{{scope.row.city}}</span>
            </el-table-column>
            <el-table-column
              prop="industry"
              label="行业类型"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              label="公司规模"
              width="100"
              align="center">
              <span slot-scope="scope">{{scope.row.scale}}人</span>
            </el-table-column>
            <el-table-column
              label="详情"
              align="center">
              <template slot-scope="scope">
                <el-button type = "text" @click="scope.row.show_description=true">
                  查看
                </el-button>
                <el-dialog :visible.sync="scope.row.show_description" width="35%" style="text-align: left;padding:0px">
                  <span slot="title" style="color: black;text-align: left; font-size: 1.5em; font-weight: bolder;padding-left: 8px;">{{scope.row.name}}</span>
                  <!-- 类型 -->
                  <div class="row" style="text-align: left; border-bottom:1px #cccccc solid;border-top:#cccccc 1px solid;" >
                    <!-- 行业类型 -->
                    <p style="font-size: 1.1em; color: #778877;">类型:{{scope.row.industry}}</p>
                    <!--  公司规模 -->
                    <p style="font-size: 1.1em; color: #778877;">规模:{{scope.row.scale}}人</p>
                  </div>
                  <!-- 公司重要信息 -->
                  <div class="row" style="border-bottom:1px #cccccc solid ;">
                    <p  style="font-size: 1.1em; color: #778877;">成立时间:{{scope.row.establishedTime}}</p>
                    <p  style="font-size: 1.1em; color: #778877;">注册资本:{{scope.row.registeredCapital}}</p>
                  </div>
                  <!-- 详细信息 -->
                  <div class="row" style="border-bottom:1px #cccccc solid ;">
                    <p>{{scope.row.description}}</p>
                  </div>
                  <!-- 营业执照 -->
                  <div class="row" style="text-align: center;">
                    <img src="../../assets/营业执照.jpg" alt="" width="60%">
                  </div>
                </el-dialog>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="操作"
              min-width="180"
              align="center">
              <template slot-scope="scope" >
                <el-button type="success" size="mini" style="display: inline-block;" v-if="scope.row.status=='1待审核'" @click="updateBusinessC(scope.$index)">通过</el-button>
                <el-button type="danger" size="mini" style="display: inline-block;" v-if="scope.row.status=='1待审核'" @click="updateBusinessJ(scope.$index)">拒绝</el-button>
                <span v-if="scope.row.status=='3审核通过'" style="color: rgb(10, 141, 10);font-weight: bolder;" >审核通过</span>
                <span v-if="scope.row.status=='2拒绝'" style="color: red;font-weight: bolder;" >拒绝</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!-- 批量删除 -->
      <div class="row" style="margin-top: 2em;">
        <!-- 批量删除 -->
        <div class="row" style="float: left;">
          <el-button type="danger" @click="deleteListBusiness">批量删除</el-button>
        </div>
        <!-- 分页 -->
        <div class="row" style="float: right;">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :total="business.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { findAllBusiness,deleteBusinessById,saveOrUpdateBusiness,findBusinessByProvince ,findBusinessByCity,findBusinessByScale} from '@/api/business.js'
  import { findAllCity,findAllProvince } from '@/api/city.js'
export default {
  data() {
    return {
      provinces:[],
      citys:[],
      scales:[],
      IScitys:true,
      options_value:'',
      business:[],
      checked:[],
      // 显示多少页
      pageSize:8,
      // 当前页
      currentPage:1,
      business1:{},
      province_value:'',
      city_value:'',
      scale_value:''
    };
  },
  computed: {
    // 对省份的去重列表
    provinceList(){
      this.business.forEach(res=>{
        this.provinces.push(res.province)
      });
      this.provinces = [...new Set(this.provinces)]
      return this.provinces
    },
       // 规模的去重列表
    scaleList(){
    this.business.forEach(res=>{
        this.scales.push(res.scale)
    });
    this.scales = [...new Set(this.scales)]
    return this.scales
    },
    
    citysList(){
      if(this.IScitys){
      this.business.forEach(res=>{
        this.citys.push(res.city)
    });}
    this.citys = [...new Set(this.citys)]
    return this.citys
    }

  },
  methods: {
    // 查找所有的商家
    async findAllBusiness (){
      try{
      let res = await findAllBusiness();
      this.business = res.data.reverse();
      this.business.forEach(res=>{
        this.$set(res,'show_description',false)
      })
      this.business.sort((res=>{
          return function(a,b){
            if (a[res]<b[res]){
              return -1;
            }else return 1;
          }
        })('status'))
        
      }catch(err){
        this.$notify.error({
          title: "错误",  
          message: "查找失败"
        });
      }
    },
    // 筛选框 (并且进行城市的查找)
    async provinceAndcity(province){
      this.currentPage=1;
      this.city_value='';
      this.scale_value='';
      this.IScitys=false
      if(province){
      try{
        this.citys =[];
        this.city_value='';
      let res = await findAllProvince();
      let demo =null;
      res.data.forEach(msg=>{
        if(province==msg.name){
          demo =msg.id;
        }
      })
      let TextMsg  =  await  findAllCity();
      TextMsg.data.forEach(Tmsg=>{
        if(Tmsg.provinceId==demo){
          this.citys.push(Tmsg.name)
        }
      })
        this.citys = [...new Set(this.citys)];
        console.log(this.citys)
       let s =  await findBusinessByProvince({province:province})
       this.business = s.data.reverse();
      //  进行排序处理
       this.business.sort((res=>{
          return function(a,b){
            if (a[res]<b[res]){
              return -1;
            }else return 1;
          }
        })('status'))
        this.business.forEach(res=>{
        this.$set(res,'show_description',false)
      })
      }catch(err){
        this.$notify.error({
          title: "错误",  
          message: "审核失败"
        });
      }
    }else{
      this.citys=[];
      this.IScitys=true
      this.findAllBusiness();
    }
    },
    // 根据城市查找
    async FindBusinessByCiyt(city){
      if(city){
      this.currentPage=1;
      this.scale_value =''
      try{
        let res = await findBusinessByCity({city:city});
        this.business = res.data.reverse();
        this.business.sort((res=>{
          return function(a,b){
            if (a[res]<b[res]){
              return -1;
            }else return 1;
          }
        })('status'))
        this.business.forEach(res=>{
        this.$set(res,'show_description',false)
      })
      }catch(err){
        this.$notify.error({
          title: "错误",  
          message: "查找失败"
        });
      }
    }else{
      this.findAllBusiness()
    }
    },
    // 批量删除
    async deleteListBusiness(){
      try{
         await this.checked.forEach( async msg=>{
          let res = await deleteBusinessById({id:msg});
          
          if((this.city_value!=''&&this.province_value!='')||(this.city_value!=''&&this.province_value=='')){
            console.log("1进入")
            this.FindBusinessByCiyt(this.city_value);
          }
          if(this.city_value==''&&this.province_value!=''){
            let s =  await findBusinessByProvince({province:this.province_value})
            this.business = s.data;
            console.log("2进入");
            //  进行排序处理
            this.business.sort((res=>{
            return function(a,b){
            if (a[res]<b[res]){
              return -1;
            }else return 1;
          }
         })('status'))
          }
          if(this.city_value==''&&this.province_value==''&&this.scale_value==''){
            console.log("3进入")
            this.findAllBusiness();
          }
          if(this.scale_value!=''){
            console.log("4进入")
            this.FindBusinessByScale(this.scale_value);
          }
        })
        
      }catch(err){
        this.$notify.error({
          title: "错误",  
          message: "删除失败"
        });
      }
    },
    // 处理页
    handleCurrentChange(curPage){
      this.currentPage=curPage
    },
    // 审核通过
    async updateBusinessC(index){
      try{
        
        this.business[index].status='3审核通过';
        let res = await saveOrUpdateBusiness(this.business[index]);
        if((this.city_value!=''&&this.province_value!='')||(this.city_value!=''&&this.province_value=='')){
            console.log("1进入")
            this.FindBusinessByCiyt(this.city_value);
          }
          if(this.city_value==''&&this.province_value!=''){
            let s =  await findBusinessByProvince({province:this.province_value})
            this.business = s.data;
            console.log("2进入")
            //  进行排序处理
            this.business.sort((res=>{
            return function(a,b){
            if (a[res]<b[res]){
              return -1;
            }else return 1;
          }
         })('status'))
          }
          if(this.city_value==''&&this.province_value==''&&this.scale_value==''){
            console.log("3进入")
            this.findAllBusiness();
          }
          if(this.scale_value!=''){
            console.log("4进入")
            this.FindBusinessByScale(this.scale_value);
          }
      }catch(err){
        this.$notify.error({
          title: "错误",  
          message: "审核失败"
        });
      }
    },
    // 审核拒绝
    async updateBusinessJ(index){
      try{
        this.business[index].status='2拒绝';
        let res = await saveOrUpdateBusiness(this.business[index]);
        if(this.city_value!=''&&this.province_value!=''){
            console.log("1进入")
            this.FindBusinessByCiyt(this.city_value);
          }
          if(this.city_value==''&&this.province_value!=''){
            let s =  await findBusinessByProvince({province:this.province_value})
            this.business = s.data;
            console.log("2进入")
            //  进行排序处理
            this.business.sort((res=>{
            return function(a,b){
            if (a[res]<b[res]){
              return -1;
            }else return 1;
          }
         })('status'))
          }
          if(this.city_value==''&&this.province_value==''&&this.scale_value==''){
            console.log("3进入")
            this.findAllBusiness();
          }
          if(this.scale_value!=''){
            console.log("4进入")
            this.FindBusinessByScale(this.scale_value);
          }
      }catch(err){
        this.$notify.error({
          title: "错误",  
          message: "审核失败"
        });
      }
    },
    // 通规模筛选
    async FindBusinessByScale(scale_value){
      this.province_value='';
      this.currentPage=1;
      this.city_value=''
      if(scale_value){
      try{
      let res = await findBusinessByScale({scale:scale_value});
      this.business = res.data.reverse();
      
            //  进行排序处理
            this.business.sort((res=>{
          return function(a,b){
            if (a[res]<b[res]){
              return -1;
            }else return 1;
          }
        })('status'))
        this.business.forEach(res=>{
        this.$set(res,'show_description',false)
      })
      }catch(err){
        this.$notify.error({
          title: "错误",  
          message: "审核失败"
        });
      }
    }else{
      this.findAllBusiness();
    }

    }
  },
  created() {
    this.findAllBusiness();
  },
  mounted() {}
};
</script>
<style scoped>
  #check_main{
    width:75%;
    margin-left: 10%;
    margin-top: 3em;
  }
  .el-dialog__header{
    background-color: #ffffff;
  }
  .el-dialog__close{
    color:black;
  }
  .el-dialog__body{
    padding:0px;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;

  }
</style>