<template>
  <div class="cases">
    <el-tabs type="border-card">
      <el-tab-pane label="产品大图">
        <div class="tab-cont">
          <el-button size="small" type="primary" @click="openBigsDialog()"
          >点击上传
          </el-button
          >
          <div class="el-upload__tip" style="padding-bottom: 15px">
            参考尺寸：1200px(宽) x 500px(高)
          </div>

          <el-table
              border
              :data="proBigTableData"
              v-loading="loading"
              style="width: 100%"
          >

            <el-table-column prop="category" label="品类"></el-table-column>
            <el-table-column prop="image" label="图片">
              <template slot-scope="scope">
                <img style="width: 200px" :src="scope.row.image" alt/>
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
                    @click="bigHandleEdit(scope.$index, scope.row)"
                ></el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="bigHandleDelete(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="产品大图" :visible.sync="bigsDialogFormVisible">
            <el-form :model="bigsFormData">
              <el-form-item label="品类" :label-width="formLabelWidth">
                <el-select v-model="bigsFormData.category" autocomplete="off">
                  <el-option value="时尚配件" label="时尚配件"/>
                  <el-option value="文创礼品" label="文创礼品"/>
                  <el-option value="趣味玩具" label="趣味玩具"/>
                  <el-option value="健康美容" label="健康美容"/>
                  <el-option value="电子生活" label="电子生活"/>
                  <el-option value="服饰鞋靴" label="服饰鞋靴"/>
                  <el-option value="出行用品" label="出行用品"/>
                  <el-option value="服饰配件" label="服饰配件"/>
                  <el-option value="家居生活" label="家居生活"/>
                </el-select>
              </el-form-item>
              <el-form-item label="图片" :label-width="formLabelWidth">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="bigsCreateOrModifyBack"
                    ref="addProductBigsDialog"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="bigsHandleChange"
                    :on-success="bigsHandleSuccess"
                    :on-error="handleError"
                >
                  <img
                      v-if="bigsFormData.image"
                      :src="bigsFormData.image"
                      class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="bigsFormData.seq" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input
                    v-model="bigsFormData.content"
                    autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="bigsDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="bigsHandleCreateOrModify()"
              >确 定
              </el-button
              >
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>

      <el-tab-pane label="产品小图">
        <div class="tab-cont">
          <el-button size="small" type="primary" @click="openSmallDialog()"
          >点击上传
          </el-button
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
                <img style="width: 200px" :src="scope.row.image" alt/>
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
          <el-dialog title="产品小图" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
              <el-form-item label="品类" :label-width="formLabelWidth">
                <el-select v-model="formData.category" autocomplete="off">
                  <el-option value="时尚配件" label="时尚配件"/>
                  <el-option value="文创礼品" label="文创礼品"/>
                  <el-option value="趣味玩具" label="趣味玩具"/>
                  <el-option value="健康美容" label="健康美容"/>
                  <el-option value="电子生活" label="电子生活"/>
                  <el-option value="服饰鞋靴" label="服饰鞋靴"/>
                  <el-option value="出行用品" label="出行用品"/>
                  <el-option value="服饰配件" label="服饰配件"/>
                  <el-option value="家居生活" label="家居生活"/>
                </el-select>
              </el-form-item>
              <el-form-item label="图片" :label-width="formLabelWidth">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="createOrModifyBack"
                    ref="addProductSmallsDialog"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                >
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
              >确 定
              </el-button
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
      bigsDialogFormVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      proBigTableData: [],
      query: {
        accessToken: null,
      },
      tableData: [
        {
          image: null
        }
      ],
      bigsFormData: {
        id: null,
        content: null,
        category: null,
        seq: 1,
        image: null,
        createUserId: '000',
        modifyUserid: '000',
      },
      formData: {
        id: null,
        content: null,
        category: null,
        seq: 1,
        image: null,
        createUserId: '001134',
        modifyUserid: '001134',
      },
      options: {},
      productBigs: [],
      productSmalls: [],

    };
  },
  mounted() {
    this.loadProductBigs();
    this.loadProductSmalls();
  },
  created() {
    this.query = Object.assign({}, this.$route.query);
    if (this.query.accessToken) {
      this.formData.createUserId = this.query.userId;
      this.formData.modifyUserid = this.query.userId;

      this.bigsFormData.createUserId = this.query.userId;
      this.bigsFormData.modifyUserid = this.query.userId;
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
              "https://api?accessToken=" +
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
    // handleRemove(file) {
    //   console.log(file);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    handleError(response, file,) {
      console.log(file);
    },
    bigsHandleChange(file) {
      this.bigsFormData.image = URL.createObjectURL(file.raw);
    },
    bigsHandleSuccess(response) {
      if (response.rspCode === 0) {
        this.loading = false;
        this.bigsDialogFormVisible = false;
        this.loadProductBigs();
      } else {
        this.$message({
          message: response.rspMsg || "上传错误",
          type: "error",
        });
      }
    },
    handleChange(file) {
      this.formData.image = URL.createObjectURL(file.raw);
    },
    handleSuccess(response) {
      if (response.rspCode === 0) {
        this.loading = false;
        this.dialogFormVisible = false;
        this.loadProductSmalls();
      } else {
        this.$message({
          message: response.rspMsg || "上传错误",
          type: "error",
        });
      }
    },
    loadProductBigs() {
      this.loading = true;
      this.$http
          .get("product/getProductBigs")
          .then((response) => {
            window.console.log(response);
            this.proBigTableData = response.data.data.records;
            this.loading = false;
          })
          .catch((e) => {
            this.$message({
              message: "网络或程序异常！" + e,
              type: "error",
            });
          });
    },
    openBigsDialog() {
      // 清除数据
      this.bigsFormData.id = 0;
      this.bigsFormData.image = "";
      this.bigsFormData.content = "";
      this.bigsFormData.createTime = new Date();
      this.bigsDialogFormVisible = true;
    },
    bigsCreateOrModifyBack(params) {
      let _this = this;
      let rotationUrl = null;
      if (!this.bigsFormData.id) {
        // ID 无效时 视为新增
        rotationUrl = "product/addProductBig";
        this.loading = true;
      } else {
        rotationUrl = "product/updateProductBig";
        this.loading = true;
      }
      let form = new FormData();
      form.append("file", params.file);
      for (let key in this.bigsFormData) {
        form.append(key, this.bigsFormData[key]);
      }
      this.$http
          .post(rotationUrl, form, this.options)
          .then((response) => {
            _this.$refs.addProductBigsDialog.uploadFiles.length = 0;
            this.loading = false;
            this.$message({
              message: "创建成功！",
              type: "success",
            });
            this.bigsDialogFormVisible = false;
            _this.loadProductBigs();
          })
          .catch((e) => {
            this.$message({
              message: "网络或程序异常！" + e,
              type: "error",
            });
          });
    },
    // 新增
    bigsHandleCreateOrModify() {
      window.console.log(this.bigsFormData);
      let uploadFiles = this.$refs.addProductBigsDialog.uploadFiles;
      console.log(uploadFiles)
      if (uploadFiles.length === 0) {
        this.bigsCreateOrModifyBack({});
      } else {
        this.$refs.addProductBigsDialog.submit();
      }
    },
    bigHandleEdit(index, row) {
      window.console.log(index, row);
      this.bigsFormData = row;
      this.bigsDialogFormVisible = true;
    },
    bigHandleDelete(index, row) {
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
            let _this = this;
            this.$http
                .post(`product/delProductBig`, {id: row.id}, this.options)
                .then((response) => {
                  this.loading = false;
                  window.console.log(response);
                  this.$message({
                    message: "删除成功！",
                    type: "success",
                  });
                  _this.loadProductBigs();
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

    loadProductSmalls() {
      this.loading = true;
      this.$http
          .get("product/getProductSmalls")
          .then((response) => {
            window.console.log(response);
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
    openSmallDialog() {
      // 清除数据
      this.formData.id = 0;
      this.formData.image = "";
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
        rotationUrl = "product/addProductSmall";
        this.loading = true;
      } else {
        rotationUrl = "product/updateProductSmall";
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
            _this.$refs.addProductSmallsDialog.uploadFiles.length = 0;
            this.loading = false;
            this.$message({
              message: "创建成功！",
              type: "success",
            });
            this.dialogFormVisible = false;
            _this.loadProductSmalls();
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
      let uploadFiles = this.$refs.addProductSmallsDialog.uploadFiles;
      console.log(uploadFiles)
      if (uploadFiles.length === 0) {
        this.createOrModifyBack({});
      } else {
        this.$refs.addProductSmallsDialog.submit();
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
                .post(`product/delProductSmall`, {id: row.id}, this.options)
                .then((response) => {
                  _this.loading = false;
                  window.console.log(response);
                  _this.$message({
                    message: "删除成功！",
                    type: "success",
                  });
                  _this.loadProductSmalls();
                })
                .catch((e) => {
                  _this.$message({
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
  },
};
</script>

<style>
.el-table {
  margin-top: 20px;
}

.upload-demo1 {
  padding: 0 0 5px 5px;
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

.el-button--primary:focus, .el-button--primary:hover {
  background: #1cafae;
  border-color: #1cafae;
}

.dialog-footer {
  border-top: 1px solid #eee;
  text-align: center;
  padding: 20px;
}

</style>
