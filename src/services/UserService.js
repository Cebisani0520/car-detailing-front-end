import axios from "axios";

const USER_API_BASE_URL = 'http://localhost:8080/user'

class UserService{
    createUser(){
        return axios.post(USER_API_BASE_URL + '/create')
    }
    getUserById(){
        return axios.get(USER_API_BASE_URL + '/getById/{id}')
    }
    updateUser(){
        return axios.post(USER_API_BASE_URL + '/update/{id}')
    }

    deleteUser(){
        return axios.delete(USER_API_BASE_URL + '/delete/{id}')
    }
    getUsers(){
        return axios.get(USER_API_BASE_URL + '/getAll')
    }

}

export default new UserService()