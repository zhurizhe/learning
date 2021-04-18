<template>
  <div class="main">
    <h1>Todos</h1>
    <div class="input-wrap">
      <label>内容</label>
      <a-input v-model="newTodo">
        <template #suffix>
          <span @click="addTodo">确定</span>
        </template>
      </a-input>
    
    </div>
     <ul>
      <li v-for="todo in todos" :key="todo.id">
         <a-checkbox 
          v-if="todo.content.indexOf(newTodo) >= 0 && !todo.editing" 
          v-model="todo.checked"
        >
          {{ todo.content }}
          <a-icon type="delete" @click="deleteTodo(todo)"/>
          <a-icon type="edit" @click="editTodo(todo)"/>
         
        </a-checkbox>
        <a-input v-if="todo.editing" v-model="todo.content">
          <template #suffix>
            <span @click="saveTodo(todo)">确认</span>
          </template>
        </a-input>
      </li>
    </ul>
  </div>
 
</template>
<script>
export default {
  data(){
    return {
      newTodo:'',
      todos:[]
    }
  },
  methods:{
    addTodo(){
      let {newTodo, todos} = this;
      if (newTodo.trim()) {
        todos.push({
          id: new Date().getTime(),
          content: newTodo,
          checked: false,
          editing:false
        });
        this.$set(this, 'newTodo', '');
      }
    },
    deleteTodo(todo) {
       let { todos} = this;
      const index = todos.findIndex((t) => t === todo);
      todos.splice(index, 1);
    },
    editTodo(todo) {
      todo.editing = true;
    },
    saveTodo(todo){
      todo.editing = false;
    },
  }
}
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
/deep/.ant-checkbox-checked + span {
  text-decoration: line-through;
}
li .ant-btn {
  margin-left: 10px;
}
</style>
