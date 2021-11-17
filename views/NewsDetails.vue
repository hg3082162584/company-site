<template>
  <div class="NewsDetails">
    <banner img="../assets/img/bgtop.jpg" />
    <div class="NewsDetails-product">
      <div class="NewsDetails-product-content">
        <img :src="newsIdList.image" alt />
        <p class="product-title">{{newsIdList.title}}</p>
        <p class="product-time">{{newsIdList.createTime}}</p>
        <p class="product-content">{{newsIdList.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner";
export default {
  name: "NewsDetails",
  components: {
    Banner
  },
  data() {
    return {
      pid: 0,
      newsIdList:[
        {image:null}
      ] 
    };
  },
  created() {
    this.pid = this.$route.params.id;
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$http
        .get(`activity/getActivities/${this.pid}`)
        .then(response => {
          this.newsIdList = response.data.data;  
          window.console.log(this.newsIdList);
        })
        .catch(function(error) {
          window.console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.NewsDetails {
  width: 100%;
  height: 100%;
  //overflow: hidden;
  &-product {
    width: 1200px;
    margin: 20px auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    &-content {
      width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 50px 0;
      
      img {
        width: 100%;
        //height: 500px;
      }
      .product-title {
        font-size: 24px;
        color: #e13834;
        padding: 20px 0 0 0;
      }
      .product-content {
        font-size: 16px;
        font-weight: 400;
        padding: 10px 0;
      }
      .product-time{
        color:#999;
        font-size:14px;
      }
    }
  }
}
</style>