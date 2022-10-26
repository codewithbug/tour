<template>
    <div class="col-11 mx-auto pt-5 px-0 mainContainer">


        <div v-if="emailChecked && successDialogIsActive" class="col-12  col-xl-8 col-lg-9 my-5  px-lg-5 margin-auto dialogContainer">

            <p class="col-12 text-center successIcon"> <font-awesome-icon icon="fas fa-check-circle" /> </p>

            <p class="col-12 text-center successMsg"> Hesabınız uğurla təsdiqləndi ! Artiq hesabınıza giriş edə bilərsiniz ! </p>

        </div>

        <div v-if="emailChecked && !successDialogIsActive" class="col-12  col-xl-8 col-lg-9 my-5  px-lg-5 margin-auto dialogContainer">

            <p class="col-12 text-center errorIcon"> <font-awesome-icon icon="fas fa-times-circle" /> </p>

            <p class="col-12 text-center errorMsg"> Xəta baş verdi ! </p>
            

        </div>

        <div v-if="!emailChecked" class="col-12  col-xl-8 col-lg-9 my-5  px-lg-5 margin-auto dialogContainer">

            <div class="spinner-border text-primary mx-auto" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            

        </div>


    </div>
</template>

<style scoped src="./Email-Verify-Successfull.css"></style>
<script src="./Email-Verify-Successfull.js"></script>