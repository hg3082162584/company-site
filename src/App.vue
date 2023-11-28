<template>

  <div id="app">
    <el-container>
      <el-header style="height:100px;" v-if="showHeader">
        <div class="logo">
          <img src="/images/toplogo.png" alt />
        </div>
        <el-menu
          :default-active="defaultActive"
          class="el-menu"
          mode="horizontal"
          @select="handleSelect"
          :router="router"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/about">品牌简介</el-menu-item>
          <el-menu-item index="/productlist">经营产品</el-menu-item>
          <el-menu-item index="/news">活动资讯</el-menu-item>
          <el-menu-item index="/storeList">店铺信息</el-menu-item>
          <el-menu-item index="/contact">合作联系</el-menu-item>
          <el-menu-item index="" key="zhiye"><a href='#' target='_blank'>加入我们</a></el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <div class="footer" v-if="showHeader">
        <div class="footer-content">
          <ul class="content-nav">
            <li>
              <span>xxx有限公司</span>
              <span>地址：北京市朝阳区xx路xxxx号</span>
            </li>

            <li>
              <span>咨询热线：400-400-400</span>
              <span><a href="https://beian.miit.gov.cn/" target="_blank">京ICP备0000号</a></span>
            </li>
            <li class="footer-right">
              <transition name="el-zoom-in-center">
                <div class="code-wrapper" v-show="show">
                   <img src="/images/footer-wechat.png" alt=""/>
                </div>
                </transition>
                <!-- <button @click="goToSina"></button>
                <button></button>
                <button @click="goToXiaohs"></button>
                <button @click="goToTaobao"></button> -->
                <span><a href="" target='_blank'><img src="/images/footer-sina.png"/></a></span>
                <button @click="show = !show"><img src="/images/footer-wx.png"/></button>
                <span><a href="" target='_blank'><img src="/images/footer-xh.png"/></a></span>
                <span><a href="" target='_blank'><img src="/images/footer-taobao.png"/></a></span>
            </li>
          </ul>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHeader:true,
      router: true,
      defaultActive: "/",
      isShow: false,
      show:false,
    };
  },
  methods: {
    handleSelect(key) {
      this.isShow = this.defaultActive != key;
      window.console.log(this.isShow);
    },
    // goToSina(){
    //   this.$router.push('https://weibo.com/u/1');
    // },

  },
  watch:{
  $route(to,from){
    this.showHeader = to.path.indexOf("admin") === -1;
  }
}
};

</script>

<style lang="scss" scoped>
body,img,div,p,span,h3{
  margin:0;padding:0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 1024px;
  margin: 0 auto;
  padding:0;
}

  .logo {
    width: 60px;
    margin:20px 0;
}
.logo img{
  width:60px;
}

.el-main {
  padding: 0 !important;
}

.footer {
  width: 100%;
  height: auto;
  &-content {
    background:url(/images/footer-logo.png) left center no-repeat;
    width: 1024px;
    margin: 0 auto 10px auto;
    display: flex;
    justify-content: space-between;
    .content-nav {
      width:100%;
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 10px;
        margin-top:5px;
        p {
          font-size: 12px;
          color: #5f5f5f;
          padding: 10px 0;
        }
        span {
          color: #5f5f5f;
          font-size: 12px;
          font-weight: 400;
          padding: 2px 0;
        }
      }
    }

  }
  .copyright {
    span {
      color: #5f5f5f;
      line-height: 30px;
    }
  }
}

.el-menu{padding-top:10px;}
.el-menu--horizontal>.el-menu-item{font-size:18px;font-weight:400;color:#373737;margin:0 10px;}
.el-menu.el-menu--horizontal{border-bottom:0;}
.el-menu--horizontal>.el-menu-item.is-active{border-color:#00bcb4;}
.el-menu--horizontal>.el-menu-item:hover{color:#000;}
.case-item li:first-child{width:1024px;margin-bottom:30px;}

.content-nav li:nth-child(2){border-left:2px solid #9d9d9d;border-right:2px solid #9d9d9d;margin:5px 25px 0 25px;padding:0 40px;}
.content-nav li:last-child{padding:0;margin:0;flex-direction:row;position: relative;}
// .footer-right{background:url(/images/footer-icon.png) 50% 50% no-repeat;height:60px;width:480px;}
.code-wrapper{position: absolute;z-index:1000;top:-250px;left:40px;}
.code-wrapper img{border:1px solid #eee;}
.footer-right button{border:0;background:none;cursor:pointer;}
.footer-right img{margin:0 15px;}
.footer-right img:last-child{margin-right:0;}
.el-header a{text-decoration:none;}

@media screen and (max-width:1024px){
 .el-menu--horizontal>.el-menu-item{float:none;}
  .el-header{width:100%;}
  img{width:100%;}
  .banner img{width:100%; }
  .el-menu{display:flex;margin:0;padding:0;}
  .el-menu li{margin:0;padding:5px}
  .el-menu-item{font-size:12px;}
}
.content-nav a{
  color:#5f5f5f;
  text-decoration: none;
  }
</style>
