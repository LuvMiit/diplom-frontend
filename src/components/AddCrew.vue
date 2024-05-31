<template>
  <div class="addInfo">
      <p>Введите госномер ТС</p>
      <input placeholder="A111AA111" v-model="carPlates">
      <p>Выберите водителя</p>
      <DriversSelector/>
      <button @click="saveData">Сохранить</button>
      <p v-if="responseData">Успешно!</p>
      <p v-if="error">Бригада с таким водителем уже существует!</p>
  </div>
</template>

<script>
import Page from "@/components/Page.vue";
import DriversSelector from "@/components/DropLists/DriversSelector.vue";
import axios from "axios";
import {selectedDriver, userToken} from "@/store.js";

export default {
  name:'AddCrew',
  components: {DriversSelector, Page},
  data(){
    return{
      carPlates: null,
      driver: null,
      responseData:null,
      error: null
    }
  },
  methods:{
    saveData(){
      this.driver = selectedDriver
      this.responseData=null
      this.error = null
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.post('http://localhost:8080/crew/add',{
        carPlates: this.carPlates,
        driver: this.driver
      })
          .then(response => this.responseData = response)
          .catch(error => this.error = error)
    }
  }
}
</script>

<style scoped>
.addInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 83vw;
}
</style>