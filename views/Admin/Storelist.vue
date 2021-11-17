<template>
  <div class="store">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="openDialog()">新增数据</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="search" placeholder="输入关键字搜索">
          <i slot="prefix" class="el-input__icon el-icon-search"></i
        ></el-input>
      </el-col>
    </el-row>
    <el-table
      border
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      v-loading="loading"
      style="width: 100%"
    >
      <!-- <el-table-column prop="id" label="序号" width="80"></el-table-column> -->
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="name" label="店铺名称"></el-table-column>
      <el-table-column prop="address" label="店铺地址"></el-table-column>
      <el-table-column prop="tel" label="联系电话"></el-table-column>
      <el-table-column prop="openTime" label="营业时间"></el-table-column>
      <el-table-column prop="longitude" label="经度"></el-table-column>
      <el-table-column prop="latitude" label="纬度"></el-table-column>
      <el-table-column prop="seq" label="排序" width="100"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="排序">
          <el-input v-model="formData.seq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="formData.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址">
          <el-input v-model="formData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-input v-model="formData.openTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="formData.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="formData.latitude" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item
    v-for="(domain, index) in formData.domains"
    label="店铺信息"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '店铺信息不能为空', trigger: 'blur'
    }"
  >  
  <div class="store-input">
    <el-input placeholder="请输入店铺名称"></el-input>
    <el-input placeholder="请输入店铺地址"></el-input>
    <el-input placeholder="请输入联系电话"></el-input>
    <el-input placeholder="请输入营业时间"></el-input>
  </div>  
    <el-button type="danger"  @click.prevent="removeDomain(domain)" style="margin-left:20px">删除</el-button>
  </el-form-item> 
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
     <el-button type="primary" plain @click="addDomain">新增店铺</el-button> 
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateOrModify()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div style="margin-top: 20px">
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="totalCount"
        :current-page="pageIndex"
        :page-size="pageSize"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: 1,
      pageIndex:1,
      pageSize: 10,
      totalCount: 0,
      search: "",
      loading: true,
      dialogFormVisible: false,
      tableData: [],
      query: {
        userId:null,
        accessToken: null,
      },
      formData: {
        // domains: [{
        //       value: ''
        //     }],
        id: "",
        seq: 1,
        city: "",
        name: "",
        address: "",
        tel: "",
        openTime: "",
        longitude: "",
        latitude: "",
        createUserId: "001134",
        modifyUserid: "001134",
      },
      options: {},
    };
  },
  mounted() {
    this.loadData();
  },
  created() {
    this.query = Object.assign({}, this.$route.query);
    if (this.query.accessToken) {
      this.formData.createUserId = this.query.userId;
      this.formData.modifyUserid = this.query.userId;
      this.validAccessToken();
    }
    if (!this.query.accessToken) {
      this.disappear = false;
      this.$message.error("非法的访问方式，页面将自动关闭");
      setTimeout(function () {
        window.opener = null;
        window.open("about:blank", "_top").close();
      }, 1500);
    }
  },
  methods: {
    validAccessToken() {
      this.$http
        .post(
          "https://gateway.ihotwind.cn/web-user/sso/validAccessToken?accessToken=" +
            this.query.accessToken
        )
        .then((response) => {
          this.loading = false;
          let result = response.data;
          if (result.rspCode != 0) {
            this.$message.error("非法的访问方式，页面将自动关闭");
            setTimeout(function () {
              window.opener = null;
              window.open("about:blank", "_top").close();
            }, 1500);
          }
        })
        .catch((e) => {
          this.$message({
            message: "网络或程序异常！" + e,
            type: "error",
          });
        });
    },
    loadData() {
      this.loading = true;
      this.$http
        .get(
          `store/getStores?offset=${this.offset - 1}&pageSize=${this.pageSize}`
        )
        .then((response) => {
          window.console.log(response);
          this.tableData = response.data.data.records;
          this.totalCount = response.data.data.totalCount;
          this.loading = false;
        })
        .catch((e) => {
          this.$message({
            message: "网络或程序异常！" + e,
            type: "error",
          });
        });
    },
    openDialog() {
      // 清除数据
      this.formData.id = 0;
      this.formData.LoginName = "";
      this.formData.Password = "";
      this.formData.IsAction = true;
      this.formData.CreateTime = new Date();

      this.dialogFormVisible = true;
    },
    // 新增
    handleCreateOrModify() {
      window.console.log(this.formData);
      if (!this.formData.id) {
        // ID 无效时 视为新增
        this.loading = true;
        this.$http
          .post("store/addStore", this.formData, this.options)
          .then((response) => {
            this.loading = false;
            window.console.log(response);
            this.$message({
              message: "创建成功！",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.loadData();
          })
          .catch((e) => {
            this.$message({
              message: "网络或程序异常！" + e,
              type: "error",
            });
          });
      } else {
        this.loading = true;
        this.$http
          .post("store/updateStore", this.formData, this.options)
          .then((response) => {
            this.loading = false;
            window.console.log(response);
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.loadData();
          })
          .catch((e) => {
            this.$message({
              message: "网络或程序异常！" + e,
              type: "error",
            });
          });
      }
    },
    handleEdit(index, row) {
      window.console.log(index, row);
      this.formData = row;
      this.formData.modifyUserId = this.query.userId;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 已确认删除
          // 调接口删除
          this.loading = true;
          this.$http
            .post(`store/delStore`, { id: row.id }, this.options)
            .then((response) => {
              this.loading = false;
              window.console.log(response);
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.loadData();
            })
            .catch((e) => {
              this.$message({
                message: "网络或程序异常！" + e,
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //时间格式化
    dateFormat: function (row) {
      //row 表示一行数据, CreateTime 表示要格式化的字段名称
      let t = new Date(row.CreateTime);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },

    removeDomain(item) {
      var index = this.formData.domains.indexOf(item);
      if (index !== -1) {
        this.formData.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.formData.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    currentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.offset = val;
      this.loadData();
    },
    sizeChange(val) {
      window.console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadData();
    },
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-table {
  margin-top: 20px;
}
.upload-demo1 {
  padding: 0 0 5px 5px;
}

.el-button--success.is-plain {
  color: #00bcb4;
  background: #ebfbfa;
  border-color: #bceae8;
  margin: 10px 5px;
}
.el-button--success.is-plain:hover {
  color: #ebfbfa;
  background: #00bcb4;
  border-color: #00bcb4;
}
.el-aside .el-menu-item.is-active {
  background: #00bcb4;
  color: #fff;
}
.el-button--primary {
  background: #00bcb4;
  border-color: #00bcb4;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background: #1cafae;
  border-color: #1cafae;
}

.dialog-footer {
  border-top: 1px solid #eee;
  text-align: center;
  padding: 20px;
}
</style>