import axios from "@/axios.js";

export default class TodoService {
    static async getTodoLists() {
        try {
            const { data: todoLists } = await axios.get('/api/todolists');
            return todoLists;
        } catch (error) {
            throw error;
        }
    }

    static async getTodoList(id) {
        try {
            const { data: todoList } = await axios.get(`/api/todolists/${id}`);
            return todoList;
        } catch (error) {
            throw error;
        }
    }

    static async addTodoList(data) {
        try {
            const { data: todoList } = await axios.post('/api/todolists', data);
            return todoList;
        } catch (error) {
            throw error;
        }
    }

    static async updateTodoList(id, data) {
        try {
            const { data: todoList } = await axios.patch(`/api/todolists/${id}`, data);
            return todoList;
        } catch (error) {
            throw error;
        }
    }

    static async removeTodoList(id) {
        try {
            await axios.delete(`/api/todolists/${id}`);
        } catch (error) {
            throw error;
        }
    }

    static async addTodoItem(name, deadline, tag_name, todoListId) {
        try {
            const { data: todoItem } = await axios.post('/api/todoitems', {
                name,
                deadline,
                tag_name,
                todo_list_id: todoListId
            });
            return todoItem;
        } catch (error) {
            throw error;
        }
    }

    static async updateTodoItem(id, data) {
        try {
            const { data: todoItem } = await axios.patch(`/api/todoitems/${id}`, data);
            return todoItem;
        } catch (error) {
            throw error;
        }
    }

    static async removeTodoItem(id) {
        try {
            await axios.delete(`/api/todoitems/${id}`);
        } catch (error) {
            throw error;
        }
    }
}
