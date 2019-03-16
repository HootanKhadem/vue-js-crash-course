<template>
    <div>
        <form @submit="addTodo">
            <input type="text" v-model="title" name="title" placeholder="Add Todo ...">
            <input type="submit" value="Submit" class="btn">
        </form>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: "AddTodo",
        data() {
            return {
                title: ''
            };
        },
        methods: {
            ...mapMutations([
                'ADD_TODO'
            ]),

            addTodo(e) {
                e.preventDefault();
                const newTodo = {
                    title: this.title,
                    completed: false
                };
                this.ADD_TODO(newTodo);
                this.title = "";
            }
        }
    };
</script>

<style scoped>

    form {
        display: flex;
    }

    input[type="text"] {
        flex: 10;
        padding: 5px;
    }

    input[type="submit"] {
        flex: 2;
    }

</style>