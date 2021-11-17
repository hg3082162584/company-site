<template>
  <div class="go-in">
    <div class="banner"><img src="/images/about.png"></div>
    <div class="section">
      <div class="section-content">
           <!-- <p class="s-line"></p> -->
           <div class="s-text">
畹町，将前沿的时尚资讯、潮流趋势与生活体验相结合，
<p>以设计美学为本源，用独特的想象力表现零售行业的全新模式，</p>
打造清新乐趣舒适自然的生活理念。
           </div>
           <p class="center"><img src="/images/about-01.png"></p>
           <!-- <p class="s-line"></p> -->
           <div class="s-text">
成熟买手团队，紧跟时尚潮流，
<p>10大系列商品，急速全球采货</p>
<p>5000余款时尚单品，上万款SKU</p>
周周上新，无限扩容
           </div>
           <p class="center"><img src="/images/about-02.png"></p>
           <!-- <p class="s-line"></p> -->
           <div class="s-text">
畹町，致力于打造具沉浸式购物场景，
<p>成为最具影响力的轻时尚微百货品牌。</p>
<p>未来3年快速抢占市场份额，</p>
覆盖全国一二三四线城市核心商圈，辐射东南亚地区市场。
           </div>
          <p class="about-footer"><img src="/images/about-footer.png"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },

 
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.go-in {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .section {
    width: 100%;
    &-content {
      width: 1024px;
      margin: 0 auto;
      background-color: #fff;
     } 
    }  
  }  


.banner{width:100%;margin:0 auto 20px auto;text-align: center;}
.banner img{width:1024px;}
.s-line{background:url(/images/line.png) no-repeat;width:17px;height:33px;margin:60px auto 0 auto;}
.s-text{color:#5f5f5f; margin:60px auto 70px auto;font-size:16px;font-weight:400;text-align:center;line-height: 160%;width:60%;}
.about-footer{text-align:center;margin:100px auto 100px auto;}
.center{text-align:center}
</style>