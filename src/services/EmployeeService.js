import axios from "axios";

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/employees'

class EmployeeService{
    createEmployee(employeesData, accessToken) {
        return axios.post(`${EMPLOYEE_API_BASE_URL}/create`, employeesData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    getEmployees(accessToken) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/getAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    async deleteEmployee(id, accessToken) {
        return await axios.delete(`${EMPLOYEE_API_BASE_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
        update(id, data, accessToken) {
        return axios.post(`${EMPLOYEE_API_BASE_URL}/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}

export default new EmployeeService()