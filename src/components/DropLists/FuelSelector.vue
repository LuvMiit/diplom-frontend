<template>
  <div class="dropList">
    <select class="list" v-model="fuel">
      <option disabled value="">Выберите топливо</option>
      <option>Без фильтра</option>
      <option v-for="data in responseData" :key="data.fuelID">{{data.fuelName}}</option>
    </select>
  </div>
</template>

<script>
import {setFuel, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'FuelSelector',
  data() {
    return {
      fuel: null,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/fuel-types/all").then(response => this.responseData = response.data).catch(localError => this.error = localError)
  },
  watch:{
    fuel: function (){
      if(this.fuel !== 'Без фильтра') {
        setFuel(this.fuel)
      }else(
          setFuel(null)
      )
    }
  }
}
</script>

<style scoped>
.dropList{
  display: flex;
  //margin: 20px;
}
.list{
  margin-bottom: 20px;
  padding: 5px 3px 5px 2px;
  font-size: 20px;
  text-align: center;

  border-radius: 5px;
}
</style>