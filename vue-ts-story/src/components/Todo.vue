<template>
  <div class="main">
    <h1>Todos</h1>
    <div class="input-wrap">
      <label>内容</label>
      <a-input v-model:value="newTodo"></a-input>
      <a-button @click="addTodo">确定</a-button>
    </div>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <a-checkbox 
          v-if="todo.content.indexOf(newTodo) >= 0 && !todo.editing" 
          v-model:checked="todo.checked"
        >
          {{ todo.content }}
          <a-button class="del" @click="deleteTodo(todo)">删除</a-button>
          <a-button class="edit" @click="editTodo(todo)">编辑</a-button>
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
interface Todo {
  id: Number;
  content: String;
  checked: Boolean;
  editing: Boolean;
}
export default defineComponent({
  name: "Todo",
  setup() {
    const todos = ref<Todo[]>([]);
    const newTodo = ref<String>("");
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: new Date().getTime(),
          content: newTodo.value,
          checked: false,
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
      let saveData = JSON.stringify(todos.value);
      localStorage.todos = saveData;
    });

    const deleteTodo = (todo: Todo) => {
      const index = todos.value.findIndex((t) => t === todo);
      todos.value.splice(index, 1);
    };

    const editTodo = (todo: Todo) => {
      todo.editing = true;
    };
    const saveTodo = (todo: Todo) => {
      todo.editing = false;
    };
    return { todos, newTodo, addTodo, deleteTodo, editTodo, saveTodo };
  },
});
</script>

<style scoped>
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
.input-wrap input {
  width: 300px;
}
.input-wrap .ant-btn {
  width: 80px;
}
li {
  list-style: none;
  text-align: left;
  margin: 10px;
}
.ant-checkbox-wrapper {
  width: 100%;
}
:deep .ant-checkbox-checked + span {
  text-decoration: line-through;
}
li .ant-btn {
  margin-left: 10px;
}
</style>
