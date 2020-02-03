/*
 * @Author: guomy 
 * 福利管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-28 20:04:45
 */
<template>
  <div id="moduleBoon">
    <!-- :data="welfareDate.slice((currentPage-1)*pageSize,currentPage* pageSize)" -->
    <!-- <div style="margin-top:1em">
        <el-select @change="welfareChange"  v-model="welfare" clearable placeholder="全部">
        <el-option v-for="item in nameDate" :key="item" :label="item" :value="item"></el-option>
        </el-select>
    </div> -->

      <div class="tableDiv">
      <el-table style="margin-top :3em;font-size: 1.2em;"
        :header-cell-style="{background:'teal',color:'#fff',height:'50px'}" 
        ref="multipleTablewelfareDate"
        :data="welfareList"
        tooltip-effect="dark"
        @selection-change="selectionChange"
      >
      <!-- //teal -->
        <el-table-column   align="center" type="selection" width="50"></el-table-column>
        <el-table-column  align="center" prop="name" width="150" label="福利名称"></el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
              <span
              v-if="scope.row.status==='冻结中'" style="color:red"
              >   {{scope.row.status}} </span>
              <span v-else style="color:green">
                 {{scope.row.status}} 
              </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toFreeze(scope.row)" v-if="scope.row.status==='使用中'" type="warning" size="mini">冻结</el-button>
             <el-button @click="toUse(scope.row)" v-else  type="success" size="mini">使用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- -------------------------------------- -->
    <div>
        <div id="page" style="float:right">
          <el-pagination
          background
          layout="prev, pager, next"
          :total="this.welfareDate.length"
          @current-change="pageChange"
          >
          </el-pagination>
        </div>
        <div id="footDe" style="float:left">
           <el-button  @click="toBatchDelete" size="mini" type="danger" round>删除</el-button>
        </div>
    </div>  
  </div>
</template>

<script>
import { findAllWelfare ,findWelfareById,deleteWelfareById,saveOrUpdateWelfare} from "@/api/welfare.js";
import config from '@/utils/config.js'
export default {
  data() {
    return {
       welfare:"",
       nameDate:[],
       welfareDate:[],
       //批量删除ids
       ids: [],
       currentPage: 1,
       pageSize:0,
    };
  },
  computed: {
    // 冻结功能
     welfareList(){
      let temp = [...this.welfareDate];
      let page = this.currentPage;
      this.pageSize = config.pageSize;
      
      return temp.slice((page-1)*this.pageSize,page* this.pageSize);
    }
  },
  methods: {

   async toFreeze(row){
      this.$set(row,'status','冻结中')
          //访问后台接口 获取状态的值传给后台的保存更新功能 
          try {
            console.log(row)
            // 提醒功能
            let res= await saveOrUpdateWelfare(row)
            if (res.status === 200) {
              config.successMsg(this, "冻结成功");
              this.findAllWel();
            } else {
              config.errorMsg(this, "冻结失败");
            }
          } catch (error) {
            config.errorMsg(this, "冻结失败");
            console.log(error)
          }
        },
         async toUse(row){
      this.$set(row,'status','使用中')
          //访问后台接口 获取状态的值传给后台的保存更新功能 
          try {
            console.log(row)
            // 提醒功能
            let res= await saveOrUpdateWelfare(row)
            if (res.status === 200) {
              config.successMsg(this, "使用成功");
              this.findAllWel();
            } else {
              config.errorMsg(this, "使用失败");
            }
          } catch (error) {
            config.errorMsg(this, "使用失败");
            console.log(error)
          }
        },
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
                  let res = await deleteWelfareById({ id: id });
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
                  config.successMsg(this, "删除成功");
                } else {
                  config.errorMsg(this, "删除失败");
                }
                this.findAllWel();
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
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },
    async welfareChange(id) {
      
      //val 是option的value值
      if (id) {
        console.log(id)
        try {
          let res = await findWelfareById({ id : id });
          this.welfareDate = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过id查找福利信息错误");
        }
      } else {
        this.findAllWel();
      }
    },
     async findAllWel() {
      try {
        let res = await findAllWelfare();
        this.welfareDate = res.data;
        //福利名称数组
        let nameArr = res.data.map(item => {
          this.nameDate.push(item.name)
          return item.name;
        });
        //去重
        this.nameDate = [...new Set(this.nameDate)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    pageChange(currentPage){
      this.currentPage=currentPage
    }
  },
  created() {
    this.findAllWel()
    this.welfareList
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
  .cell{
    height: 50px;
  }
  #footDe{
    margin-top :15px
  }
  #page{
     margin-top :15px
  }
  #moduleBoon{
    margin-left: 10%;
    margin-right: 10%;
  }
</style>