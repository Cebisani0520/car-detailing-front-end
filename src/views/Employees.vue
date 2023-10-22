<template>
    <SideBar />
  <div>
    <div class="container mt-4">
      <h2>Employees</h2>
      <button class="btn btn-primary" @click="openAddModal">Add Employee</button>
      <table class="table table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Employee Code</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in employees" :key="e.id">
            <td scope="row">{{e.id}}</td>
            <td scope="row">{{e.employeeCode}}</td>
            <td scope="row">{{e.firstName}}</td>
            <td scope="row">{{e.lastName}}</td>
            <td scope="row">{{e.password}}</td>
            <td scope="row">
                <button class="btn btn-primary" @click="openEditModal(e)">Edit</button>
                <button class="btn btn-danger mx-2" @click="$event => deleteEmployee(e.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
        <!-- Add/Edit Modal -->
    <div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showEditModal }">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Employee</h5>
            <button type="button" class="close" @click="closeEditModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Form content with existing employee data -->
            <form @submit.prevent="updateEmployee">
              <div class="form-group">
                <label for="employeeCode">Employee Code</label>
                <input type="text" class="form-control" id="editeEmployeeCode" required v-model="selectedEmployee.employeeCode">
              </div>
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="editFirstName" required v-model="selectedEmployee.firstName">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" id="editLastName" required v-model="selectedEmployee.lastName">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="editPassword" required v-model="selectedEmployee.password">
              </div>
              <!-- Add more form fields as needed -->
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Add-Employee-Modal -->
    <div class="modal" tabindex="-2" role="dialog" :class="{ 'd-block': showAddModal }">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Employee</h5>
            <button type="button" class="close" @click="closeAddModal">
              <span aria-hidden="true">&times;</span></button>
        </div>
          <div class="modal-body">
            <!--form content-->
            <form @submit.prevent="addEmployee">
              <div class="form-group">
                <label for="employeeCode">Employee Code</label>
                <input type="text" class="form-control" id="addEmployeeCode" required v-model="employee.employeeCode">
              </div>
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="addFirstName" required v-model="employee.firstName">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" id="addLastName" required v-model="employee.lastName">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="addPassword" required v-model="employee.password">
              </div>
              <!-- Add more form fields-->
              <button type="submit" class="btn btn-primary" @submit.prevent="addEmployee">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import EmployeeService from '@/services/EmployeeService';
import { useAuthStore } from '@/stores/auth';

export default {
  components: {SideBar},
  data() {
    return {
      employees: [],
      employee: {
        employeeCode: '',
        firstName: '',
        lastName: '',
        password: ''
      },
      showAddModal: false,
      selectedEmployee: {},
      showEditModal: false,
    }
  },
  methods: {
    
    async getEmployees(){
      try {
        const token = useAuthStore().token;
        const response = await EmployeeService.getEmployees(token);
        this.employees = response.data;
        console.log(response);
      } catch (error) {
        console.error('Error getting Employees: ', error);
      }
      
    },
    async addEmployee(){
      try {
        const token = useAuthStore().token;
        const response = await EmployeeService.createEmployee(this.employee, token);
        console.log('Employee Added Successfully:', response.data);
        await this.getEmployees();
        this.closeAddModal();
        console.log(token);
      } catch (error) {
        console.error('Error Adding Employee', error);
      }
    },
    async deleteEmployee(id){
      try {
        const token = useAuthStore().token;
        const response = await EmployeeService.deleteEmployee(id, token);
        console.log('Deleted Employee Successfully: ', response.data);
        console.log(token);
        await this.getEmployees();
      } catch (error) {
        console.error('Error deleting Employee', error); 
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
    },
    openEditModal(employee) {
      this.selectedEmployee = { ...employee };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    updateEmployee() {
      // Implement update functionality here
    }
  },
  created(){
    this.getEmployees();
  },
}
</script>
<style>
</style>