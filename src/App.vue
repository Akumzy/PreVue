<template>
  <div id="app">
    <NavBar imageUrl="../src/assets/logo.png"></NavBar>
    <section class="section">
      <router-view/>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '@/scss/index.scss';
$navbar-breakpoint: 414px;

@mixin my-touch {
  @media screen and (max-width: $navbar-breakpoint - 1px) {
    @content;
  }
}

@mixin my-desktop {
  @media screen and (min-width: $navbar-breakpoint) {
    @content;
  }
}

@import '~bulma';
@import '~buefy/src/scss/buefy';

#app {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  > * {
    width: 100%;
  }
  > nav {
    height: 50px;
  }
  > section {
    height: calc(100% - 50px);
    padding: 0;
  }
}
</style>
