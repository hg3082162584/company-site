<template>
  <div class="home" v-loading="loading">
    <div class="banner">
      <!-- <img :src="banners && banners[0] && banners[0].image" alt="这是banner1" /> -->
      <swiper class="swiper" :options="banswiperOption">
        <swiper-slide v-for="item of banners" :key="item.id">
          <img class="banners-img" :src="item.image" />
        </swiper-slide>
        <div
          class="swiper-pagination swiper-pagination-white"
          slot="pagination"
        ></div>
        <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div>
      </swiper>
    </div>
    <div class="h-title">
      <h3>店铺形象</h3>
      <p class="h-title-border"></p>
    </div>
    <ul class="case-item">
      <li>
        <router-link to="/fstore"
          ><img src="/images/store01.png"
        /></router-link>
      </li>
      <li>
        <router-link to="/pstore"
          ><img src="/images/store02.png"
        /></router-link>
      </li>
      <li>
        <router-link to="/wstore"
          ><img src="/images/store03.png"
        /></router-link>
      </li>
    </ul>

    <div class="h-title">
      <h3>精选品类</h3>
      <p class="h-title-border"></p>
    </div>
    <div class="product-icon-cont">
      <ul>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-01.png" />
            <p>时尚配件</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-02.png" />
            <p>文创礼品</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-03.png" />
            <p>趣味玩具</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-04.png" />
            <p>健康美容</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-05.png" />
            <p>电子生活</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-06.png" />
            <p>服饰鞋靴</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-07.png" />
            <p>出行用品</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-08.png" />
            <p>服饰配件</p></router-link
          >
        </li>
        <li>
          <router-link to="/productlist"
            ><img src="/images/pro-icon-09.png" />
            <p>家居生活</p></router-link
          >
        </li>
      </ul>
    </div>

    <div class="banner">
      <img
        :src="
          (bigs && bigs[0] && bigs[0].image) ||
          '//stc-cms.beisen.com/cmsportal/602125/602125_medias_202184_202184144639294.jpg'
        "
      />
    </div>
    <div class="swiper-cont">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="item of swiperList" :key="item.id">
          <router-link
            :to="{ name: 'products', params: { category: item.category } }"
          >
            <span class="swiper-text">{{ item.content }}</span>
            <img class="swiper-img" :src="item.image" />
          </router-link>
        </swiper-slide>
        　　
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="h-title">
      <h3>关于我们</h3>
      <p class="h-title-border"></p>
    </div>
    <div class="about"><img src="/images/home-aboutus.png" /></div>
  </div>
</template>
 
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      banners: [],
      bigs: [],
      loading: true,
      banswiperOption: {
        slidesPerView: 1,
        spaceBetween: 5,
        autoplay: {
          delay: 5000,
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: {
          delay: 5000,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
      },

      swiperList: [],
    };
  },
  created() {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    let _this = this;
    this.$http.all([_this.$http.get("home/getHomeBanners")]).then(
      _this.$http.spread((response) => {
        let data = response.data;
        if (data.rspCode == 0) {
          _this.banners = data.data.records;
        } else {
          //todo 错误提示
        }
        _this.loading = false;
      })
    );
    this.$http.all([_this.$http.get(`home/getHomeBigs`)]).then(
      _this.$http.spread((response) => {
        let data = response.data;
        if (data.rspCode == 0) {
          _this.bigs = data.data.records;
        } else {
          //todo 错误提示
        }
        _this.loading = false;
      })
    );
    this.$http.all([_this.$http.get(`home/getHomeRotations`)]).then(
      _this.$http.spread((response) => {
        let data = response.data;
        if (data.rspCode == 0) {
          _this.swiperList = data.data.records;
        } else {
          //todo 错误提示
        }
        _this.loading = false;
      })
    );
  },
};
</script>
 
<style lang="scss" scoped>
.swiper-img {
  width: 240px;
}
//经典案例
.case-item {
  width: 1024px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-between;
  li {
    width: 505px;
    list-style: none;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-origin: content-box;
    margin: 0;
    padding: 0;
    position: relative;
    overflow: hidden;

    &:hover {
      .case-item-hover {
        opacity: 1;
        transition: all 0.4s ease-in-out;
      }
    }
  }
}

.home {
  width: 100%;
  height: 100%;
}
.banner {
  width: 1024px;
  margin: 0 auto 10px auto;
  text-align: center;
}
.banner img {
  width: 1024px;
}
.h-title {
  text-align: center;
  width: 1024px;
  padding-top: 20px;
  margin: 20px auto;
}
.h-title h3 {
  color: #373737;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  text-align: center;
}
p.h-title-border {
  border-bottom: 2px solid #888;
  width: 30px;
  margin: 12px auto 50px auto;
}
.swiper-cont {
  width: 1024px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 40px;
}
.banners-img {
  width: 1024px;
  height: 480px;
}

.about {
  // background: url(/images/home-aboutus.png) no-repeat;
  width: 1024px;
  margin: 0 auto 30px auto;
}
.case-item li:first-child {
  width: 1024px;
  margin-bottom: 12px;
}
.content-nav li:last-child {
  padding-right: 0;
  margin-right: 0;
}
.swiper-slide {
  position: relative;
}

a .swiper-text {
  background: #fff;
  color: #000;
  display: none;
  font-size: 24px;
  height: 240px;
  padding-top: 80%;
  opacity: 0.6;
  position: absolute;
  width: 240px;
}
a:hover .swiper-text {
  display: block;
}
.product-icon-cont {
  height: 70px;
  width: 1024px;
  margin: -10px auto 20px auto;
  padding: 0;
}
.product-icon-cont ul {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}
.product-icon-cont ul li {
  list-style: none;
  height: 70px;
  width: 113px;
  margin: 0;
  padding: 0;
  position: relative;
  text-align: center;
}
.product-icon-cont ul li p {
  color: #4f4f4f;
  font-size: 12px;
  font-weight: 600;
  display: block;
  text-align: center;
  margin: 0;
  padding: 0;
  z-index: 100;
}

.product-icon-cont ul li a {
  text-decoration: none;
}

.product-icon-cont ul li p:hover {
  font-size: 14px;
}
.product-icon-cont ul li img:hover {
  width: 52px;
  height: 52px;
}

@media screen and (max-width: 1024px) {
  .h-title,
  .case-item,
  img,
  .product-icon-cont,
  .swiper-cont,
  .about {
    width: 100%;
  }
  .case-item {
    padding: 0;
    margin: 0 auto;
  }
  .case-item li {
    margin: 0 auto;
    padding: 0;
  }
  .banner img,
  .case-item img,
  .swiper-slide img,
  .about img {
    width: 100%;
  }
  .product-icon-cont ul li img {
    left: 0;
  }
  .product-icon-cont ul li p {
    font-size: 14px;
    margin-top: 40px;
  }
}
</style>