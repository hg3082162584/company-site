<template>
  <div class="admin">
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-menu-item index="/admin/index">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/admin/products">
            <i class="el-icon-s-goods"></i>
            <span slot="title">经营产品管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/news">
            <i class="el-icon-s-comment"></i>
            <span slot="title">活动资讯管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/storelist">
            <i class="el-icon-s-shop"></i>
            <span slot="title">店铺信息管理</span>
          </el-menu-item>

          <!-- <el-menu-item index="/admin/team">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">团队</span>
          </el-menu-item>

          <el-menu-item index="/admin/enterprise">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">合作企业管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/honor">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">荣誉墙管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">后台用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/dictionary">
            <i class="el-icon-setting"></i>
            <span slot="title">数据字典管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/page">
            <i class="el-icon-setting"></i>
            <span slot="title">测试分页</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
 
      <el-container>
        
        <el-main>
          <div class="base-padding">
            <router-view />
          </div>
        </el-main>
        <el-footer>2021@版权所有</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "admin"
};
</script>

<style lang="scss" soped>
.admin {
  border-top: 1px solid rgb(238, 238, 238);
}


.el-footer {
  line-height: 60px;
}
</style>

<style>


/*
.store tbody td:first-child {
    border-left: 4px solid #1eb5ac;
}
 .store table{
    border-collapse: separate;
    border-spacing: 0 10px;
}
.store .el-table--enable-row-transition .el-table__body td{
 border-top:1px solid #eee;
 border-right:1px solid #eee;
} 
 .store-input{
  float: left;
  width:85%;
} */


.el-menu-item{
  border-bottom:1px solid #eee;
}
</style>
