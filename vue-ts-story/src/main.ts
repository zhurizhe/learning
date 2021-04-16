import { createApp } from "vue";
import App from "./App.vue";
import Todo from "./components/Todo.vue";
import Home from "./components/Home.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import {Menu, Input, Button, Checkbox} from "ant-design-vue";

const routes = [
  { path: "/", component: Home },
  { path: "/Todo", component: Todo },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(router);
app.use(Menu);
app.use(Input);
app.use(Button);
app.use(Checkbox);
app.mount("#app");
