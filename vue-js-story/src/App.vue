<template>
  <div id="app">
    <a-menu mode="inline">
      <a-menu-item>
        <router-link to="/">Home</router-link> |
      </a-menu-item>
      <a-menu-item>
      <router-link to="/Todo">Todo</router-link>
      </a-menu-item>
    </a-menu>
   
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: row;
}
#app .ant-menu-inline{
  width: 20%;
  min-width: 200px;
}
</style>
