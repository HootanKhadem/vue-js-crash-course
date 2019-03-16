import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        title: "TodoList",
        toDos: []
    },
    getters: {
      countCompletedTodos: state => {
          let counter = 0;
          for (let i = 0; i < state.toDos.length; i++) {
              if (state.toDos[i].completed === true) {
                  counter++
              }
          }
          return counter
      }  
    },
    mutations: {
        ADD_TODO: (state, newTodo) => {
            const { title , completed } = newTodo;
            axios.post("https://jsonplaceholder.typicode.com/todos", {
                title,
                completed
            }).then(res => state.toDos = [...state.toDos, res.data]).catch();
        },
        LOAD_TODOS: (state) => {
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(res => state.toDos = res.data)
                .catch(err => console.log(err));
        }
    },
    actions: {
        loadTodos: (context) => {
            context.commit('LOAD_TODOS')
        },

    }
});
