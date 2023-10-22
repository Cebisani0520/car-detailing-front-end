<template>
    <main>
        <NavBar />
        <div class="my-S">
            <div class="mx-auto w-25" style="max-width: 100%">
                <h2 class="tex-center mb-3">Add Residential</h2>
                <form @submit.prevent="addResidential">
                    <!--Street Address-->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="street_Address" class="form-label">Street Address</label>
                            <input type="text" name="street_Address" id="street_Address" class="form-control" placeholder=" Street Address" required v-model="residential.street_Address">
                        </div>
                    </div>
                    <!--Surburb-->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="surburb" class="form-label">Surburb</label>
                            <input type="text" name="surburb" id="surburb" class="form-control" placeholder="Surburb" required v-model="residential.baseAddress.surburb">
                        </div>
                    </div>
                    
                    <!--City-->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="city" class="form-label">City</label>
                            <input type="text" name="city" id="city" class="form-control" placeholder="City" required v-model="residential.baseAddress.city">
                        </div>
                    </div>

                    <!--State-->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="state" class="form-label">State</label>
                            <input type="text" name="state" id="state" class="form-control" placeholder=" State" required v-model="residential.baseAddress.state">
                        </div>
                    </div>
                    <!--Postal Code-->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="postalCode" class="form-label">Postal Code</label>
                            <input type="text" name="postalCode" id="postalCode" class="form-control" placeholder="Postal Code" required v-model="residential.baseAddress.postalCode">
                        </div>
                    </div>
                      <!--Country-->
                      <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="country" class="form-label">Country</label>
                            <input type="text" name="country" id="country" class="form-control" placeholder="Country" required v-model="residential.baseAddress.country">
                        </div>
                    </div> 

                    <div class="row">
                        <div class="col-md-12 form-group">
                                <input type="submit" value="submit" class="btn btn-primary w-100">
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </main>

</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
    name: 'Add Residential',
    components: {
        NavBar
    },
    data(){
        return {
        residential: 
        {
            id: 5000,
            street_Address: '',
            baseAddress: {
            id : 5000,
            city: '',
            surburb: '',
            state: '',
            postalCode: '',
            country: ''
            }
        }
        
        }
    },
    methods: {
        addResidential(){
            fetch('http://localhost:8080/residential/create', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(this.residential)

            })
            .then(response => response.json())
            .then(data => {
                console.log('Residential Added successfully:', data)
                this.$router.push("/")
            })
            .catch(e => {console.error('Error adding Residential', e);});
        }

    }
}

</script>