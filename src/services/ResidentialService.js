import axios from "axios";

const RESIDENTIAL_API_BASE_URL = 'http://localhost:8080/residential'

class ResidentialService{
    createResidential(){
        return axios.post(RESIDENTIAL_API_BASE_URL + '/create')
    }
    getResidentials(){
        return axios.get(RESIDENTIAL_API_BASE_URL + '/getAll')
    }
    deleteResidential(){
        return axios.delete(RESIDENTIAL_API_BASE_URL + '/delete/{id}')
    }
    updateResidential(){
        
    }

}

export default new ResidentialService()