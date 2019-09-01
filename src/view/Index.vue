<template>

  <el-container>

    <!--侧边栏-->
    <el-aside width="200px">
      <el-menu :collapse="isCollapse" @close="handleClose" @open="handleOpen"
               class="el-menu-vertical-demo" collapse-transition="false" default-active="1-4-1"
               style="background-color: rgba(255,255,255,0.1)">

        <el-radio-group style="margin-bottom: 30px;height: 100%" v-model="isCollapse">
          <el-radio-button :label=true><i class="el-icon-d-arrow-left"></i></el-radio-button>
          <el-radio-button :label=false><i class="el-icon-d-arrow-right"></i></el-radio-button>
          <!--              <el-radio-button v-cloak="!isCollapse" > <i class="el-icon-s-operation" ></i></el-radio-button>-->
        </el-radio-group>

        <el-submenu hide-timeout="10" index="11" style="background-color: rgba(255,255,255,0.1) ">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">反馈</span>
          </template>
          <el-menu-item-group style="background-color: rgba(255,255,255,0.1) ">
            <span slot="title">分组一</span>
            <el-menu-item index="/">提交反馈</el-menu-item>
            <el-menu-item index="1">上传解决方案</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="32">
            <span slot="title">选项4</span>
            <el-menu-item index="3">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="22">
          <i class="el-icon-menu"></i>
          <span slot="title">常见问题</span>
        </el-menu-item>

      </el-menu>
    </el-aside>

    <el-main>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <!--输入框-->
        <el-col :span="12" style="height: 200px;margin-top: 250px">
          <el-autocomplete
            :fetch-suggestions="querySearchAsync"
            @input="input"
            @select="handleSelect"
            clearable='true'
            highlight-first-item="flase"
            placeholder="请输入您的问题"
            prefix-icon="el-icon-s-help"
            style="width: 100%;margin-top: 1%"
            v-model="state">
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <div class=""></div>
        </el-col>
      </el-row>

      <el-row style="height: 10px">
        <el-col :span="24">
          <div class=""></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class=""></div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <el-col :span="8">
              <div class=""></div>
            </el-col>

          </div>
        </el-col>

      </el-row>
      <div>
        <!--抽屉-->
<!--        <el-radio-group v-model="direction">-->
<!--          <el-radio label="ltr">从左往右开</el-radio>-->
<!--          <el-radio label="rtl">从右往左开</el-radio>-->
<!--          <el-radio label="ttb">从上往下开</el-radio>-->
<!--          <el-radio label="btt">从下往上开</el-radio>-->
<!--        </el-radio-group>-->

<!--        <el-button @click="drawer = true" style="margin-left: 11px;" type="primary">-->
<!--          点我打开-->
<!--        </el-button>-->

        <el-drawer
          :before-close="handleCloseC"
          :direction="this.direction"
          :visible.sync="drawer"
          size='100%'
          title="搜索结果">
          <!--展示结果-->
          <el-row style="height: 0px">
            <el-col :span="24">
              <div class=""></div>
            </el-col>
          </el-row>
          <!--第一行 标题 作者-->
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              <i class="el-icon-star-on" style="margin-left:50%"></i>
            </el-col>
            <el-col :span="10">
              <div style="width: 80%">
                <el-input :placeholder="this.resp.title" v-model="input1" :value="this.resp.title" readonly="true">
                  <template slot="prepend">Title</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-star-on" style="margin-left:50%"></i>
            </el-col>
            <el-col :span="10">
              <div style="width: 80%">
                <el-input :placeholder="this.resp.author" v-model="input1">
                  <template slot="prepend">Author</template>
                </el-input>
              </div>
            </el-col>
          </el-row>

          <!--第二行 类型 创建时间-->
          <el-row style="margin-top: 10px">

            <el-col :span="2">
              <i class="el-icon-star-on" style="margin-left:50%"></i>
            </el-col>
            <el-col :span="10">
              <div style="width: 80%">
                <el-input :placeholder="this.resp.category" v-model="input1">
                  <template slot="prepend">Category</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-star-on" style="margin-left:50%"></i>
            </el-col>
            <el-col :span="10">
              <div style="width: 80%">
                <el-input :placeholder="this.resp.create" v-model="input1">
                  <template slot="prepend">Create</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <!-- 第三行 问题内容-->
          <el-row style="margin-top: 30px">
            <el-col :span="2">
              <i class="el-icon-star-on" style="margin-left:50%"></i>
            </el-col>
            <el-col :span="20">
              <el-card class="box-card">
                <el-button type="success" round>解决方案</el-button>
                <div  class="text item">
                  <ul v-for="item in tableData">
                    <li>{{item}}</li>
                  </ul>
                </div>
              </el-card>
            </el-col>
            <el-col :span="2">

            </el-col>
          </el-row>



        </el-drawer>
        <!--抽屉 END-->
      </div>


    </el-main>


  </el-container>

</template>


<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        count: 1,

      };
      return {
        restaurants: [],
        state: '',
        resp:{},
        list: [],
        timeout: null,
        isCollapse: true,
        tableData: [],
        drawer: false,
        direction: 'btt',
      }
    },
    methods: {
      queryAll() {
        class infos {
          value = "";
          // address = "";
          id = "";
          author = "";
          category = "";
          status = "";
          title = "";
          create = "";
          content = "";
        }

        //查询10 条数据
        this.$http.get(this.Base.baseURL + '/ques/').then((resp) => {
          var data = resp.data.data;
          var list = [];
          data.forEach((item, index, arr) => {
            let info = new infos();
            // info.value = item.title;
            // info.address = item.content;
            // info.id = item.id;
            info = item;
            info.value = item.title;
            list.push(info);
            console.log("info: " + JSON.stringify(info));
          });
          this.restaurants = list;
        });
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleCloseC(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        console.log("返回:  " + results[0].value);

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 30 * Math.random());


      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      input(item) {
        console.log("input+> " + item);
      },
      handleSelect(item) {
        console.log("选择+>  " + item.title);
        this.resp=item;
        this.tableData=this.resp.content.split(";")
        console.log("resp+>  " + this.resp.title);

        //  打开抽屉显示结果
        this.drawer = true;
      }
    },
    mounted() {
      this.queryAll();
    }
  };


</script>
<style>
  .el-row {

  }

  .el-col {
    border-radius: 4px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {

  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .text {
    font-size: 14px;
  }


</style>
