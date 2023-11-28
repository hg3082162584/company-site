<template>
  <div class="news">
    <el-button type="primary" @click="openDialog()">新增</el-button>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="category" label="类别">
        <template slot-scope="scope">{{
          scope.row.category == 1 ? "开业活动" : "IP活动"
        }}</template>
      </el-table-column>
      <el-table-column prop="image" label="图片">
        <template slot-scope="scope">
          <!-- <img style="width:100%" :src="imgserver + scope.row.Img" alt /> -->
          <img style="width: 200px" :src="scope.row.image" alt />
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容">
        <template slot-scope="scope">
          <p v-if="scope.row.content.length > 100">
            {{ scope.row.content.substring(0, 100) }} ...
          </p>
          <p v-else>{{ scope.row.content }}</p>
        </template>
      </el-table-column>

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
    <!--  -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="formData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-radio v-model="formData.category" :label="1">开业活动</el-radio>
          <el-radio v-model="formData.category" :label="2">IP活动</el-radio>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action=""
            ref="newSmallDialog"
            :auto-upload="false"
            :http-request="newsCreateOrModify"
            :show-file-list="false"
            :on-change="handleChange"
            :on-success="handleSuccess"
          >
            <img v-if="formData.image" :src="formData.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateOrModify()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "loginNews",
  data() {
    return {
      query: {
        accessToken: null,
      },
      options: {},
      headers: {},
      tableData: [],
      formData: {
        id: "",
        title: "",
        image: "",
        category: "",
        content: "",
        createUserId: "001134",
        modifyUserid: "001134",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      loading: true,
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
          "https://api" +
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
    handleChange(file, fileList) {
      this.formData.image = URL.createObjectURL(file.raw);
    },
    handleSuccess(response, file, fileList) {
      if (response.rspCode === 0) {
        this.loading = false;
        this.dialogFormVisible = false;
        this.loadData();
      } else {
        this.$message({
          message: response.rspMsg || "上传错误",
          type: "error",
        });
      }
    },

    loadData() {
      this.loading = true;
      this.$http
        .get("activity/getActivities")
        .then((response) => {
          // window.console.log(response);
          this.tableData = response.data.data.records;
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
      this.formData.title = "";
      this.formData.image = "";
      this.formData.category = 1;
      this.formData.content = "";
      this.formData.createTime = new Date();

      this.dialogFormVisible = true;
    },
    newsCreateOrModify(params) {
      let _this = this;
      let newsUrl = null;
      if (!this.formData.id) {
        newsUrl = "activity/addActivity";
        this.loading = true;
      } else {
        newsUrl = "activity/updateActivity";
        this.loading = true;
      }
      let form = new FormData();
      form.append("file", params.file);
      for (let key in this.formData) {
        form.append(key, this.formData[key]);
      }

      this.$http
          .post(newsUrl, form, this.options)
          .then((response) => {
            _this.loading = false;
            if(response.data.rspCode === 0){
              _this.$refs.newSmallDialog.uploadFiles.length = 0;
              _this.$message({
                message: "创建成功！",
                type: "success",
              });
              _this.dialogFormVisible = false;
              _this.loadData();
            }else{
              _this.$message({
                message: "创建失败！",
                type: "success",
              });
            }
          })
          .catch((e) => {
            _this.$message({
              message: "网络或程序异常！" + e,
              type: "error",
            });
          });
    },
    handleCreateOrModify() {
      let uploadFiles = this.$refs.newSmallDialog.uploadFiles;
      if (uploadFiles.length === 0) {
        this.newsCreateOrModify({});
      } else {
        this.$refs.newSmallDialog.submit();
      }
    },
    //编辑
    handleEdit(index, row) {
      //index:第几行   row:这一行的数据
      window.console.log(index, row);
      this.formData = row;
      this.formData.modifyUserId = this.query.userId;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 已确认删除
          // 调接口删除
          this.loading = true;
          this.$http
            .post(`activity/delActivity`, { id: row.id }, this.options)
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
  border: 1px dashed #d9d9d9;
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
