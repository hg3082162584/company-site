<template>
  <div class="product">
    <div class="banner"><img :src="banners[0].image" alt="这是banner"></div>
    <div class="product-content" v-loading="loading">
      <ul class="pro-list">
          <li v-for="(item,index) in proList" :key="index" >
              <img :src="item.image" />
          </li>
      </ul>

    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      pid: "",
      loading: true,
      banners:[{
        image:null
      }],
      proList:[],
    };
  },
  created() {
    this.pid = this.$route.params.category;
  },
 mounted() {
    let _this = this;
    this.$http
      .all([
        _this.$http.get(`product/getCategoryDetails?category=${this.pid}`),
      ])
      .then(
        _this.$http.spread((response) => {
          let data = response.data;
          if(data.rspCode == 0){
            _this.banners = data.data.productBigs;  
            _this.proList = data.data.productSmalls;  
          }else{
            //todo 错误提示
          }          
          _this.loading = false;
        })
      );

  }
};
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  height: 100%;
}

.product-content {
  width: 1024px;
  margin: 0 auto;
  background-color: #fff;
}

.banner{width:100%;margin:10px auto;text-align: center;}
.banner img{width:1024px;height:400px;}
.pro-list{width:1024px;margin:10px auto;list-style: none;text-align: left;padding:0;}
.pro-list li{width:341px;float: left;margin:10px auto;padding:0;}
.pro-list li img{width:335px;height:335px;}
</style>