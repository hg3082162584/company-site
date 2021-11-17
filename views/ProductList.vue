<template>
  <div class="product">
    <div class="product-content" v-loading="loading">
      <ul class="pro-list">
          <li v-for="(item,index) in proList" :key="index" >
            <router-link :to="{ name: 'products', params: { category: item.category }}">
              <img :src="item.image" />
            </router-link>
          </li>
      </ul>

    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
     proList:[],
     loading: true,
    };
  },
  components: {
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
    let _this = this;
    this.$http
      .all([
        _this.$http.get("home/getHomeRotations"),
      ])
      .then(
        _this.$http.spread((response) => {
          let data = response.data;
          if(data.rspCode == 0){
            _this.proList = data.data.records;  
          }else{
            //todo 错误提示
          }          
          _this.loading = false;
        })
      );
  }
  }
};
</script>

<style lang="scss" scoped>
.pro-list{width:1024px;margin:20px auto;padding:0;list-style: none;}
.pro-list li{width:341px;float: left;margin:0 0 5px 0;padding:0;}
.pro-list li img{width:330px;height:330px;}
</style>