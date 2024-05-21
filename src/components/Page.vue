<template>
  <div class="homepage">
    <div class="left-bar">
      <nav>
        <p class="bar-item" v-if="userRole === 'ROLE_ADMIN'"  @click="activeComponent='cars'; nullFilters();$router.push('cars')">Транспорт</p>
        <p class="bar-item" v-if="userRole === 'ROLE_ADMIN'" @click="activeComponent='storage'; nullFilters()">Склад</p>
        <p class="bar-item" v-if="userRole === 'ROLE_ADMIN'" @click="activeComponent='crew'; nullFilters()">Команды</p>
        <p class="bar-item" v-if="userRole === 'ROLE_ADMIN'" @click="activeComponent='repair'; nullFilters()">Ремонт</p>
        <p class="bar-item" v-if="userRole === 'ROLE_ADMIN'" @click="activeComponent='register'; nullFilters()">Регистрация сотрудника</p>
      </nav>
      <button class="exit-btn">Выйти</button>
    </div>

<!--    <div class="contentSpace">-->
<!--      <Cars v-if="activeComponent === 'cars'"/>-->
<!--      <Storage v-if="activeComponent === 'storage'"/>-->
<!--      <Crew v-if="activeComponent === 'crew'"/>-->
<!--      <Repair v-if="activeComponent === 'repair'"/>-->
<!--      <Register v-if="activeComponent === 'register'"/>-->
<!--    </div>-->
  </div>
</template>

<script>
import {nullFilters, userRole} from "@/store.js"

import Cars from "@/components/Cars.vue";
import Storage from "@/components/Storage.vue";
import Crew from "@/components/Crew.vue";
import Repair from "@/components/Repair.vue";
import Register from "@/components/Register.vue";

export default {
  name: 'Page',
  methods: {nullFilters},
  components: {Register, Repair, Crew, Storage},
  data(){
    return{
      activeComponent:null,
      userRole: userRole
    }
  },
  created(){
    console.log(this.userRole)
  }

}

</script>

<style scoped>
.left-bar{
  width: 15vw;
  min-height: 100%;
  background: #0B3549;
  margin:0;
  padding:0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

}
.bar-item{
  font: white;
  padding-left: 0px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0;
  font-size: 20px;
  text-align: center;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;

  border-style: solid;
  border-top-style: unset;
  border-bottom-color: darkcyan;
  border-bottom-width: 1px;
  border-left-color: darkcyan;
  border-left-width: 1px;
  border-right-width: 0;
  border-bottom-right-radius: 50px;
  transition: transform 300ms ease;
}
.bar-item:active{
  background: white;
  transform: scale(0.97);

}
.bar-item:hover{
  background-color: #1E455B;
}
.exit-btn{
  font-size: 30px;

  transition: transform 300ms ease;
  border-radius: 20px;
  margin: 50px

}
.exit-btn:active{
  background: grey;
  transform: scale(0.9) translateY(-0.5px);
}
.homepage{
  display: flex;
  margin:0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
}
.contentSpace{

  min-height: 100vh;
}
</style>