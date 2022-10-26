<template>
    
    <div>


            <h1> Admin </h1>

            
            <div class="col-12 align-items-center row">

                <v-text-field v-model="search" class="col-11"></v-text-field>

                <button class="col-1 px-4 py-2 saveButton" @click="onSearch"> search </button>

            </div>



            <v-data-table

                :headers="headers"

                :items="tours"

                :items-per-page="10"

                class="elevation-1"

                @update:page="onPageUpdate"

            >



                <template #item="{ item }">
                    

                <tr>
                    <td>  {{ item.id }}</td>
                    <td>  {{ item.name }}</td>
                    <td>  {{ item.country }}</td>
                    <td>  {{ item.status }}</td>

                    <td class="text-center py-3">

                        <a :href=" base + 'admin/edit/' + item.id + `?status=${item.status}`" target="_blank" class="col-auto px-4 py-3 editButton"> Redaktə et</a>
                    </td>
                    
                </tr>



            </template>

            </v-data-table>



    </div>

</template>


<style scoped src="./Admin-Dashboard.css" ></style>

<script src="./Admin-Dashboard.js"></script>