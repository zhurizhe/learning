<template>
<div id="main">
  <a-menu mode="inline">
    <a-sub-menu>
      <template #title>
        <router-link  to="/">首页</router-link>
      </template>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <router-link  to="/Helloworld">Helloworld</router-link>
      </template>
    </a-sub-menu>
  </a-menu>
  <router-view />

</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView, RouterLink } from "vue-router";
import "ant-design-vue/dist/antd.css";
export default defineComponent({
  name: "App",
  components: {
    RouterView,
    RouterLink,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#main{
  display: flex;
  flex-direction: row;
}
#main .ant-menu-inline{
  width: 20%;
  min-width: 200px;
}
</style>
