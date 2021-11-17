<template>
  <div class="news">
    <banner title="活动资讯" />
    <div class="news-section" v-loading="loading">
      <div class="news-section-content">
        <div class="content-nav">
          <div
            class="content-nav-btn"
            :class="{'content-nav-active':category == 1}"
            @click="category = 1"
          >
            <span>开业活动</span>
          </div>
          <div
            class="content-nav-btn"
            :class="{'content-nav-active':category == 2}"
            @click="category = 2 "
          >
            <span>IP活动</span>
          </div>
        </div>

        <div class="content-nav-item">
          <div class="item-list" v-for="(item,index) in newsList" :key="index">
            <div class="item-img" v-lazy:background-image="item.image"></div>

            <p class="item-list-title">{{item.title}}</p>
            <p class="item-list-content">{{item.content}}</p>
            <div class="item-list-more">
              <router-link
                class="text-decoration"
                :to="{ name: 'newsdetails', params: { id: item.id }}"
              >
                <img src="../assets/img/sanjiao.png" />
                <span>more</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner";
export default {
  name: "news",
  components: {
    Banner
  },
  data() {
    return {
      loading: true,
      newsList: [],
      category: 1
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$http
        .get(`activity/getActivities?type=${this.category}`)
        .then(response => {
          //console.log(response);
          this.newsList = response.data.data.records;  
          this.loading = false;
          //window.console.log(this.newsList);
        })
        .catch(function(error) {
          window.console.log(error);
        });
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    category(type) {
      window.console.log(type);
      this.loadData();
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.news {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &-section {
    width: 100%;
    //height: 1600px;

    &-content {
      width: 1024px;
      //height: 1600px;
      margin: 0 auto 20px auto;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      padding-bottom:20px;
      padding-left:10px;
      .content-nav {
        width: 400px;
        height: 55px;
        margin: 0 auto;
        display: flex;
        //justify-content: center;
        align-items: center;
        position: relative;
        bottom: 30px;
        border: 1px solid #53adad;

        &-btn {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f8f8;
          transition: all 0.2s;
        }

        .content-nav-active {
          background-color: #53adad;
          color: #fff;
        }
      }

      .content-nav-item {
        width: 1024px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .item-list {
          width: 320px;
          height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 10px 8px;
          border: 1px solid #eee;

          &:hover {
            border: 1px solid #fff;
            box-shadow: 0 0 5px 2px #bfd3e0;
          }
          .item-img {
            width: 300px;
            height: 210px;
            background-color: #cecece;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            background-origin: content-box;
          }

          &-title {
            width: 300px;
            height: 60px;
            color: #15669e;
            font-size: 22px;
            padding: 0 10px;
            margin: 20px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            border-left: 1px solid #15669e;
          }

          &-content {
            width: 273px;
            height: 100px;
            font-size: 14px;
            color: gray;

            // 文本长度处理 begin
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            white-space: normal !important;
            word-wrap: break-word;
            // 文本长度处理 ending
          }

          &-more {
            width: 273px;
            padding-top: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            img {
              width: 12px;
              height: 12px;
            }
            span {
              color: #e13834;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
  .text-decoration {
    text-decoration: none;
  }
}
</style>