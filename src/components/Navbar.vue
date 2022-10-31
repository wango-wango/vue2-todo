<template>
    <b-nav tabs>
    <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
    <b-nav-item><router-link to="/todo">todoList</router-link></b-nav-item>
    <b-nav-item disabled>Another Link</b-nav-item>
  </b-nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data () {
      return {
        data: ''
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  a {
    color: #42b983;
  }
  </style>
  