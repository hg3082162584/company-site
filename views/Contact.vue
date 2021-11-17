<template>
  <div class="contact">
   <div class="banner"><img src="/images/contact.png"/></div>
    <div class="contact-cont">
        <p>具体合作详情及资料可发送至</p>
        <p>xcq@qq.net</p>
        <p>感谢您对xx的认可</p>
    </div>
  </div>
</template>

<script>
// import Banner from "../components/Banner";
export default {
  components: {
    // Banner
  }
};
</script>

<style lang="scss" scoped>
.contact-cont{
  background:url(/images/mail.png) top center no-repeat;
  color:#373737;
  font-size:16px;
  text-align: center;
  padding-top:110px;
  margin:60px auto 120px auto;
}
.banner{width:100%;margin:0 auto;text-align: center;}

</style>
