<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo"/>
    <Todo v-bind:toDos=toDos v-on:del-todo="deleteTodo"/>
  </div>
</template>

<script>
    import Todo from '../components/Todo'
    import AddTodo from '../components/AddTodo'
    import axios from 'axios';

    export default {
        name: 'Home',
        components: {
            Todo,
            AddTodo
        },
        data() {
            return {
                toDos: []
            }
        },
        methods: {
            deleteTodo(id) {
                axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.toDos =
                    this.toDos.filter(todo => todo.id !== id)).catch()
            },
            addTodo(newTodo) {
                const {title, completed} = newTodo;
                axios.post("https://jsonplaceholder.typicode.com/todos", {
                    title,
                    completed
                }).then(res => this.toDos = [...this.toDos, res.data]).catch();

            }
        },
        created() {
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(res => this.toDos = res.data)
                .catch(err => console.log(err))
        }
    }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

  .btn:hover {
    background: #666;
  }
</style>
