import { createApp } from "vue";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./components/Home.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import {Menu} from "ant-design-vue";

const routes = [
  { path: "/", component: Home },
  { path: "/Helloworld", component: HelloWorld },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(router);
app.use(Menu);
app.mount("#app");
