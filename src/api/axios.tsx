import axios from 'axios';

export default axios.create({
    baseURL: 'https://pren-todo-api.herokuapp.com'
});