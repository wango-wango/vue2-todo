import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import todo from "@/components/todoList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/todo",
      name: "todo",
      component: todo
    }
  ]
});
