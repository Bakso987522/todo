import axios from "@/axios.js";

export default class TodoService {
    static async getTodoLists() {
        const { data: todoLists } = await axios.get('/api/todolists');
        return todoLists;
    }

    static async getTodoList(id) {
        const { data: todoList } = await axios.get(`/api/todolists/${id}`);
        return todoList;
    }
    static async addTodoList(data) {
        const { data: todoList } = await axios.post('/api/todolists', data);
        return todoList;
    }

    static async addTodoItem(name, deadline, tag_name, todoListId) {
        const { data: todoItem } = await axios.post('/api/todoitems', {
            name,
            deadline,
            tag_name,
            todo_list_id: todoListId
        });
        return todoItem;
    }
    static async updateTodoItem(id, data){
        const {data: todoItem} = await axios.patch(`/api/todoitems/${id}`, data)
    }
    static async removeTodoItem(id) {
        await axios.delete(`/api/todoitems/${id}`);
    }
}
