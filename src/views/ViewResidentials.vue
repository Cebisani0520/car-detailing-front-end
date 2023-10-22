<template>
    <SideBar />
    <main>
       <!--This the Table-->
        <div class="container">
            <div class="row">
                <div col-md-12>
                    <h1 class="text-center"> View Residentials</h1>

                    <button class="btn btn-primary" @click="openAddModal">Add Residential</button>

                    <table class="table table-striped">
                        <thead>
                                <th scope="col">Street</th>
                                <th scope="col">City</th>
                                <th scope="col">Surburb</th>
                                <th scope="col">State</th>
                                <th scope="col">Postal code</th>
                                <th scope="col">Country</th>
                                <th scope="col">Action</th>
                        </thead>
                        <tbody>
                            <tr v-for="residential in residentials" :key="residential.id">
                                <td scope="row">{{ residential.street_Address }} </td>
                                <td scope="row">{{ residential.baseAddress.city }}</td>
                                <td scope="row">{{ residential.baseAddress.suburb }}</td>
                                <td scope="row">{{ residential.baseAddress.state }}</td>
                                <td scope="row">{{ residential.baseAddress.postalCode }}</td>
                                <td scope="row">{{ residential.baseAddress.country }}</td>
                                <td>
                                    <a class="btn btn-primary" :href="'/edit${residential.id}'"> Edit</a>
                                    <button class="btn btn-danger mx-2" @click="$event => deleteResidential(residential.id)"> Delete</button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>

             <!-- Add-Residential-Modal -->
    <div class="modal" tabindex="-2" role="dialog" :class="{ 'd-block': showAddModal }">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Residential</h5>
            <button type="button" class="close" @click="closeAddModal">
              <span aria-hidden="true">&times;</span></button>
        </div>
          <div class="modal-body">
            <!--form content-->
            <form @submit.prevent="addResidential">
              <div class="form-group">
                <label for="streetAddress">Street Address</label>
                <input type="text" class="form-control" id="streetAddress" required v-model="residential.street_Address">
              </div>
              <div class="form-group">
                <label for="baseCity">City</label>
                <input type="text" class="form-control" id="baseCity" required v-model="residential.baseAddress.city">
              </div>
              <div class="form-group">
                <label for="baseSuburb">Suburb</label>
                <input type="text" class="form-control" id="baseSuburb" required v-model="residential.baseAddress.suburb">
              </div>
              <div class="form-group">
                <label for="baseState">State</label>
                <input type="text" class="form-control" id="baseState" required v-model="residential.baseAddress.state">
              </div>
              <div class="form-group">
                <label for="basePostalCode">Postal Code</label>
                <input type="text" class="form-control" id="basePostalCode" required v-model="residential.baseAddress.postalCode">
              </div>
              <div class="form-group">
                <label for="baseCountry">Country</label>
                <input type="text" class="form-control" id="baseCountry" required v-model="residential.baseAddress.country">
              </div>
              <!-- Add more form fields-->
              <button type="submit" class="btn btn-primary" >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

        </div>



    </main>
</template>

<script>
import ResidentialService from '../services/ResidentialService';
import SideBar from '@/components/SideBar.vue';
import { useAuthStore } from '@/stores/auth';

export default {
    name: 'ViewResidentials',
    components: {SideBar},
    data(){
        return {
            
            residentials : [],
            residential: {
                street_Address: '',
                baseAddress: {
                    city: '',
                    suburb: '',
                    state: '',
                    postalCode: '',
                    country: ''
                }
            },
            showAddModal: false,
        }
    },
    methods : {
        
        async getResidentials(){
            
            try {
                const token = useAuthStore().token;
                const response = await ResidentialService.getResidentials(token);
                this.residentials = response.data;
                
            } catch (error) {
                console.error('Error getting Residential: ', error);  
            }
        },
        
        async addResidential(){
            try {
                const token = useAuthStore().token;
                const response = await ResidentialService.createResidential(this.residential, token);
                console.log('Residential Added Successfully:', response.data, token);
                await this.getResidentials();
                this.closeAddModal();  
            } catch (error) {
                console.error('Error Adding Residential', error);
                
            }

        },
        
        async deleteResidential(id) {
            try {
                const token = useAuthStore().token;
                const response = await ResidentialService.deleteResidential(id, token);
                console.log('Deleted Residential Successfully: ', response.data);
                await this.getResidentials();              
                
            } catch (error) {
                console.error('Error deleting Residential', error); 
                
            }
            // fetch(`http://localhost:8080/residential/delete/${id}`, {
            //     method: 'DELETE'
            // })
            // .then(response => {
            //     if (response.status === 200) {
            //         console.log('Residential deleted successfully.');
            //         this.getResidentials(); // Refresh the list of residentials
            //     } else {
            //         console.error('Failed to delete residential.');
            //     }
            // })
            // .catch(error => {
            //     console.error('Error while deleting residential:', error);
            // });
        },
        openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
    },


    },
    created()  {
    this.getResidentials();

  }
}
</script>