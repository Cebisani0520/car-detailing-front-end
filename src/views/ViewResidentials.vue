<template>
    <main>
        <NavBar />
        <!--This the Table-->
        <div class="container">
            <div class="row">
                <div col-md-12>
                    <h1 class="text-center"> View Residentials</h1>

                    <a href="/add" class="btn btn-primary"> Add Residential</a>

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
                                <td scope="row">{{ residential.street_Address }}</td>
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

        </div>



    </main>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import ResidentialService from '../services/ResidentialService';
import SideBar from '../components/SideBar.vue';

export default {
    name: 'ViewResidentials',
    components: {
        NavBar
    },
    data(){
        return {
            residentials : []
        }
    },
    methods : {
        getResidentials(){

            ResidentialService.getResidentials().then((response) => {
            this.residentials = response.data;
            console.log(response)
            });
        },
        createResidential(){
            const randomnId = this.$uuid.v4();
            console.log(randomnId)

            this.getResidentials()

        },
        
        deleteResidential(id) {
            fetch(`http://localhost:8080/residential/delete/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('Residential deleted successfully.');
                    this.getResidentials(); // Refresh the list of residentials
                } else {
                    console.error('Failed to delete residential.');
                }
            })
            .catch(error => {
                console.error('Error while deleting residential:', error);
            });
        }


    },
    created()  {
    this.getResidentials();
    this.createResidential();


  }
}
</script>