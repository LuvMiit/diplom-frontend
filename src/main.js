import './assets/main.css'

import {createRouter, createWebHistory} from "vue-router";
import {createApp} from 'vue'
import App from './App.vue'

import LogIn from "@/components/LogIn.vue";
import homePage from "@/components/HomePage.vue";
import Cars from "@/components/Cars.vue";
import AddPage from "@/components/CarPages/AddPage.vue";
import RepairsPage from "@/components/CarPages/RepairsPage.vue";
import LoadPhoto from "@/components/Load/LoadPhoto.vue";


const router = createRouter({
    history: createWebHistory(),
    routes:[{
        name: 'login',
        path: '/login',
        alias:'/',
        component: LogIn

    },{
        name: 'home',
        path: '/home',
        component: homePage

    },{
        name: 'cars',
        path: '/cars',
        component: Cars

    },{
        name: 'AddPage',
        path: '/addCar',
        component: AddPage

    },{
        name: 'RepairsPage',
        path: '/repairs-car',
        component: RepairsPage

    },{
        name: 'LoadPhotoPage',
        path: '/loadPhoto',
        component: LoadPhoto

    }]
})

const role = null;
const authFlag = false;
const app= createApp(App)
    .use(router)
    .mount('#app')