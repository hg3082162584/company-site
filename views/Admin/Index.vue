<template>
  <div class="cases">
    <el-tabs type="border-card" v-model="defaultTab" @tab-click="tableClick">
      <el-tab-pane name="Banner">
        <span slot="label"><i class="el-icon-date"></i> banner编辑</span>
        <div class="tab-cont">
          <el-upload
            class="upload-demo1"
            action="home/addHomeBanner"
            :data="{ createUserId: userId }"
            :on-remove="handleBannerRemove"
            :file-list="bannerList"
            :on-success="handleBannerSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              参考尺寸：1024px(宽) x 480px(高)
            </div>
          </el-upload>

          <!-- <el-button type="success" plain>保存</el-button> -->
        </div>
      </el-tab-pane>

      <el-tab-pane label="广告编辑" name="Ad" lazy>
        <div class="tab-cont">
          <el-upload
            class="upload-demo1"
            action="home/addHomeBig"
            :data="{ createUserId: userId }"
            :on-remove="handleAdRemove"
            :file-list="adList"
            :on-success="handleAdSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              参考尺寸：1024px(宽) x 405px(高)
            </div>
          </el-upload>

          <!-- <el-button type="success" plain>保存</el-button> -->
        </div>
      </el-tab-pane>

      <el-tab-pane label="轮播图" name="Rotation" lazy>
        <div class="tab-cont">
          <el-button size="small" type="primary" @click="openDialog()"
            >点击上传</el-button
          >
          <div class="el-upload__tip" style="padding-bottom: 15px">
            参考尺寸：400px(宽) x 400px(高)
          </div>

          <el-table
            border
            :data="tableData"
            v-loading="loading"
            style="width: 100%"
          >
            <el-table-column prop="category" label="品类"></el-table-column>
            <el-table-column prop="image" label="图片">
              <template slot-scope="scope">
                <img style="width: 200px" :src="scope.row.image" alt />
              </template>
            </el-table-column>
            <el-table-column
              prop="seq"
              label="排序"
              width="100"
            ></el-table-column>
            <el-table-column prop="content" label="描述"></el-table-column>
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
          <el-dialog title="轮播图" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
              <el-form-item label="品类" :label-width="formLabelWidth">
                <el-select v-model="formData.category" autocomplete="off">
                  <el-option value="时尚配件" label="时尚配件" />
                  <el-option value="文创礼品" label="文创礼品" />
                  <el-option value="趣味玩具" label="趣味玩具" />
                  <el-option value="健康美容" label="健康美容" />
                  <el-option value="电子生活" label="电子生活" />
                  <el-option value="服饰鞋靴" label="服饰鞋靴" />
                  <el-option value="出行用品" label="出行用品" />
                  <el-option value="服饰配件" label="服饰配件" />
                  <el-option value="家居生活" label="家居生活" />
                </el-select>
              </el-form-item>
              <el-form-item label="图片" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :http-request="createOrModifyBack"
                  ref="addHomeRotationDialog"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="handleChange"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                >
                  <!-- <img v-if="formData.Img" :src="imgserver+formData.Img" class="avatar" /> -->
                  <img
                    v-if="formData.image"
                    :src="formData.image"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="formData.seq" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      query: {
        accessToken: null,
      },
      tableData: [
        {
          image: null,
        },
      ],
      userId: "001134",
      defaultTab: "Banner",
      formData: {
        id: null,
        content: null,
        category: null,
        seq: 1,
        image: null,
        createUserId: "001134",
        modifyUserid: "001134",
      },
      options: {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      },
      bannerList: [],
      adList: [],
      RotationList: [],
    };
  },
  mounted() {
    this.loadBannerList();
    // this.loadAdList();
    // this.loadRoationList();
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
    tableClick(tab) {
      if (tab.name === "Banner") {
        this.loadBannerList();
      } else if (tab.name === "Ad") {
        this.loadAdList();
      } else if (tab.name === "Rotation") {
        this.loadRoationList();
      }
    },

    handlePreview(file) {
      console.log(file);
    },
    handleError(response, file) {
      console.log(file);
    },
    handleChange(file) {
      this.formData.image = URL.createObjectURL(file.raw);
    },
    handleSuccess(response) {
      if (response.rspCode === 0) {
        this.loading = false;
        this.dialogFormVisible = false;
        this.loadRoationList();
      } else {
        this.$message({
          message: response.rspMsg || "上传错误",
          type: "error",
        });
      }
    },
    handleBannerSuccess(response) {
      if (response.rspCode === 0) {
        this.loading = false;
        this.loadBannerList();
      } else {
        this.$message({
          message: response.rspMsg || "上传错误",
          type: "error",
        });
      }
    },

    handleAdSuccess(response) {
      if (response.rspCode === 0) {
        this.loading = false;
        this.loadAdList();
      } else {
        this.$message({
          message: response.rspMsg || "上传错误",
          type: "error",
        });
      }
    },
    handleBannerRemove(file, fileList) {
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
            .post(`home/delHomeBanner`, { id: file.id }, this.options)
            .then((response) => {
              this.loading = false;
              window.console.log(response);
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.loadBannerList();
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

    handleAdRemove(file, fileList) {
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
            .post(`home/delHomeBig`, { id: file.id }, this.options)
            .then((response) => {
              this.loading = false;
              window.console.log(response);
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.loadBannerList();
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
    loadRoationList() {
      this.loading = true;
      this.$http
        .get("home/getHomeRotations")
        .then((response) => {
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
    loadBannerList() {
      this.loading = true;
      let _this = this;
      this.$http
        .get("home/getHomeBanners")
        .then((response) => {
          this.loading = false;
          let result = response.data;
          if (result.rspCode == 0) {
            _this.bannerList.length = 0;
            result.data.records.forEach((element) => {
              let index = element.image.lastIndexOf("/");
              _this.bannerList.push({
                id: element.id,
                name: element.image.substr(0, index),
                url: element.image,
              });
            });
          }
        })
        .catch((e) => {
          this.$message({
            message: "网络或程序异常！" + e,
            type: "error",
          });
        });
    },
    loadAdList() {
      this.loading = true;
      let _this = this;
      this.$http
        .get("home/getHomeBigs")
        .then((response) => {
          this.loading = false;
          let result = response.data;
          if (result.rspCode == 0) {
            _this.adList.length = 0;
            result.data.records.forEach((element) => {
              let index = element.image.lastIndexOf("/");
              _this.adList.push({
                id: element.id,
                name: element.image.substr(0, index),
                url: element.image,
              });
            });
          }
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
      this.formData.image = "";
      this.formData.remark = "";
      this.formData.content = "";
      this.formData.createTime = new Date();

      this.dialogFormVisible = true;
    },
    createOrModifyBack(params) {
      console.log(params);
      let _this = this;
      let rotationUrl = null;
      if (!this.formData.id) {
        // ID 无效时 视为新增
        rotationUrl = "home/addHomeRotation";
        this.loading = true;
      } else {
        rotationUrl = "home/updateHomeRotation";
        this.loading = true;
      }
      let form = new FormData();
      form.append("file", params.file);
      for (let key in this.formData) {
        form.append(key, this.formData[key]);
      }
      this.$http
        .post(rotationUrl, form, this.options)
        .then((response) => {
          _this.$refs.addHomeRotationDialog.uploadFiles.length = 0;
          this.loading = false;
          this.$message({
            message: "创建成功！",
            type: "success",
          });
          this.dialogFormVisible = false;
          _this.loadRoationList();
        })
        .catch((e) => {
          this.$message({
            message: "网络或程序异常！" + e,
            type: "error",
          });
        });
    },
    // 新增
    handleCreateOrModify() {
      window.console.log(this.formData);
      //window.console.log(JSON.stringify(this.formData));
      let uploadFiles = this.$refs.addHomeRotationDialog.uploadFiles;
      console.log(uploadFiles);
      if (uploadFiles.length === 0) {
        this.createOrModifyBack({});
      } else {
        this.$refs.addHomeRotationDialog.submit();
      }
    },
    handleEdit(index, row) {
      window.console.log(index, row);
      this.formData = row;
      this.formData.modifyUserId = this.query.userId;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      let _this = this;
      window.console.log(index, row);
      this.$confirm("此操作将永久此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 已确认删除
          // 调接口删除
          _this.loading = true;
          _this.$http
            .post(`home/delHomeRotation`, { id: row.id }, this.options)
            .then((response) => {
              _this.loading = false;
              window.console.log(response);
              _this.$message({
                message: "删除成功！",
                type: "success",
              });
              _this.loadRoationList();
            })
            .catch((e) => {
              _this.$message({
                message: "网络或程序异常！" + e,
                type: "error",
              });
            });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //时间格式化
    dateFormat: function (row) {
      //row 表示一行数据, createTime 表示要格式化的字段名称
      let t = new Date(row.createTime);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
  },
};
</script>

<style soped>
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

.upload-demo1 .el-upload-list--picture .el-upload-list__item {
  height: 250px;
}
.upload-demo1 .el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 500px;
  height: 230px;
  margin-right: 20px;
}
</style>
