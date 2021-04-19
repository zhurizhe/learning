<template>
  <div class="main">
    <h1>Todos</h1>
    <div class="input-wrap">
      <label>内容</label>
      <a-input v-model:value="newTodo">
        <template #addonAfter>
            <span @click="addTodo">确认</span>
          </template>
      </a-input>
    </div>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <a-checkbox 
          v-if="todo.content.indexOf(newTodo) >= 0 && !todo.editing" 
          v-model:checked="todo.checked"
        >
          <span class="content">{{ todo.content }}</span>
          <delete-outlined @click="deleteTodo(todo)" />
          <form-outlined @click="editTodo(todo)" />
        </a-checkbox>
        <a-input v-if="todo.editing" v-model:value="todo.content">
          <template #addonAfter>
            <span @click="saveTodo(todo)">确认</span>
          </template>
        </a-input>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  onBeforeMount,
} from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons-vue";
interface Todo {
  id: Number;
  content: String;
  checked: Boolean;
  editing: Boolean;
}
export default defineComponent({
  name: "Todo",
  components:{
    DeleteOutlined,
    FormOutlined,
  },
  setup() {
    const todos = ref<Todo[]>([]);
    const newTodo = ref<String>("");
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: new Date().getTime(),
          content: newTodo.value,
          checked: false,
          editing: false,
        });
        newTodo.value = "";
      }
    };
    onBeforeMount(() => {
      if (localStorage.todos) {
        let data = JSON.parse(localStorage.todos);
        if (Array.isArray(data)) {
          todos.value = data;
        }
      }
    });
    onBeforeRouteLeave(() => {
      saveToLocalStorage();
    });
    const saveToLocalStorage = () => {
      let saveData = JSON.stringify(todos.value);
      localStorage.todos = saveData;
    };
    const deleteTodo = (todo: Todo) => {
      const index = todos.value.findIndex((t) => t === todo);
      todos.value.splice(index, 1);
      saveToLocalStorage();
    };

    const editTodo = (todo: Todo) => {
      todo.editing = true;
      saveToLocalStorage();
    };
    const saveTodo = (todo: Todo) => {
      todo.editing = false;
      saveToLocalStorage();
    };
    return { todos, newTodo, addTodo, deleteTodo, editTodo, saveTodo };
  },
});
</script>

<style lang="postcss" scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
  width: 100px;
}

.main {
  width: 100%;
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.input-wrap {
  display: flex;
  width: 100%;
  align-items: center;
}
.input-wrap .ant-input-group-wrapper {
  width: 300px;
}
:deep .anticon {
  margin:0 10px;
}
li {
  list-style: none;
  text-align: left;
  margin: 10px;
  max-width: 600px;
}
.ant-checkbox-wrapper {
  width: 100%;
  display: flex;
}
:deep .ant-checkbox + span{
    display: flex;
}
:deep .ant-checkbox + span span:first-child{
    width: max-content;
    min-width: 200px;
}
:deep .ant-checkbox-checked + span {
  text-decoration: line-through;
 
}
li .ant-btn {
  margin-left: 10px;
}
</style>
