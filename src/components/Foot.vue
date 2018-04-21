<template>
  <footer class="footer">
    <div class="footer__powered">
      <p>Powered by</p>
      <img src="../assets/vue.png" width="20px" alt="Vue">
      <p>and</p>
      <img src="../assets/firebase.png" width="20px" alt="Vue">
    </div>
    <div class="footer__contact">
      <a class="footer__contact__copyright" href="http://hectororia.com">Made with
        <i class="fa fa-heart"></i> by oria_hector</a>
      <a class="footer__contact__copyright" href="http://hectororia.com/contact.php">
        <i class="fa fa-envelope-open-o"></i> Contact me!</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "foot"
};
</script>

<style lang='scss' scoped>
@import "../styles/foot.scss";
</style>
