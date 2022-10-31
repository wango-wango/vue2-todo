

<script>
import NavbarVue from './components/Navbar.vue';
export default {
  name: 'App',
  components:{
    NavbarVue
  }
}
</script>
<template>
  <div id="app" class="container">
    <NavbarVue/>
    <img src="./assets/logo.png">
    <router-view/>
    
  </div>
</template>
<style>
*{
  box-sizing: border-box;
}

.container{
  max-width: 50%;
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
