import './assets/main.css'

import {createRouter, createWebHistory} from "vue-router";
import {createApp} from 'vue'
import App from './App.vue'

import LogIn from "@/components/LogIn.vue";
import homePage from "@/components/HomePage.vue";
import Cars from "@/components/CarPages/Cars.vue";
import AddPage from "@/components/CarPages/AddPage.vue";
import RepairsPage from "@/components/CarPages/RepairsPage.vue";
import LoadPhoto from "@/components/Load/LoadPhoto.vue";
import StoragePage from "@/components/StoragePages/StoragePage.vue";
import AddConsumables from "@/components/StoragePages/AddConsumables.vue";
import LoadWord from "@/components/Load/LoadWord.vue";
import CreateWord from "@/components/CarPages/CreateWord.vue";


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

    },{
        name: 'Storage',
        path: '/storage',
        component: StoragePage

    },{
        name: 'AddConsumablePage',
        path: '/addConsum',
        component: AddConsumables

    },{
        name: 'LoadWord',
        path: '/loadWord',
        component: LoadWord

    },{
        name: 'CreateWord',
        path: '/createWord',
        component: CreateWord

    }]
})

const role = null;
const authFlag = false;
const app= createApp(App)
    .use(router)
    .mount('#app')