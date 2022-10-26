<template>
    <div>

        <h1 class="mb-5"> Admin vip tours </h1>


        <div class="col-12 px-0 vipToursContainer">

            <div class="col-12 px-0 mb-5 text-right addTourSection">

                <v-text-field class="col-auto" hide-details solo placeholder="Tour id" v-model="newVipTour.tourId"></v-text-field>
                <v-text-field class="col-auto ml-3" hide-details solo placeholder="Vip days" v-model="newVipTour.vipTourDays"></v-text-field>

                <button class="col-auto  ml-3 addVipTourButton" @click="sendData">

                     <span v-show="spinnerIsActive" class="spinner-border mr-1 loadingSpinner " role="status" aria-hidden="true"></span>  
                     Add Tour
                     
                 </button>

            </div>

            <v-data-table

                :headers="headers"

                :items="vipTours"

                :items-per-page="10"

                class="elevation-1"

                @update:page="onPageUpdate"

            >



                <template #item="{ item , index }">
                    

                <tr>
                    <td>  {{ item.id }}</td>
                    <td>  {{ item.name }}</td>
                    <td>  {{ item.country }}</td>
                    <td>  {{ item.status }}</td>

                    <td class="text-center py-3">

                        <button class="col-auto px-4 py-3 deleteButton" @click="openDeleteDialog(item , index)"> Siyahıdan sil</button>
                    </td>

                    
                </tr>



            </template>

            </v-data-table>


        </div>

                    <!------  Delete Dialog  ------>

                    <v-dialog v-model="deleteDialogIsActive" class="px-0" max-width="500">


                    <v-card>

                        <v-card-title class="col-12 mb-3 deleteDialogTitle">

                        Silinsin ?
                        
                        </v-card-title>

                        <v-card-text class="col-12 deleteDialogText">
                        "{{ currentDeletedTour.name }}" - adlı tur silinəcək !
                        </v-card-text>

                        <v-card-actions>
                            
                        <v-spacer></v-spacer>

                        <v-btn class="col-auto px-3 py-3 mr-3 cancelDeleteButton" text @click="closeDeleteDialog()">
                            Xeyr
                        </v-btn>

                        <v-btn class="col-auto px-3 py-3 confirmDeleteButton" text @click="deleteTour()">

                            <span v-show="deleteButtonSpinnerIsActive" class="spinner-border mr-1 loadingSpinner " role="status" aria-hidden="true"></span>  
                            
                            Bəli

                        </v-btn>

                        </v-card-actions>

                    </v-card>

                    </v-dialog>



                    <!--      Snackbar Container      -->
                <div class="text-center">

                        <v-snackbar v-model="snackbarOpened" :timeout="2000" color="red accent-2" :class="currentSnackbarType">
                            
                           {{ snackbarMessage }}

                            <template v-slot:action="{ attrs }">

                                <v-btn class="closeSnackbarBtn" color="blue" text v-bind="attrs" @click="snackbarOpened = false">
                                    Bağla
                                </v-btn>

                            </template>

                        </v-snackbar>

                </div>

    </div>
</template>

<style scoped src="./Admin-Vip-Tours.css"></style>
<script src="./Admin-Vip-Tours.js"></script>