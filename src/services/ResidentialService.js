import axios from "axios";

const RESIDENTIAL_API_BASE_URL = 'http://localhost:8080/residential'

class ResidentialService{
    createResidential(residentialData, accessToken){
        return axios.post(`${RESIDENTIAL_API_BASE_URL}/create`, residentialData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    getResidentials(accessToken){
        return axios.get(`${RESIDENTIAL_API_BASE_URL}/getAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    async deleteResidential(id, accessToken){
        return await axios.delete(`${RESIDENTIAL_API_BASE_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    updateResidential(id, data, accessToken){
        return axios.post(`${RESIDENTIAL_API_BASE_URL}/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });  
    }

}

export default new ResidentialService()