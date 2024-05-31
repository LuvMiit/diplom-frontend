<template>
  <div class="dropList">
    <select class="list" v-model="driver">
      <option disabled value="">Таб. номер/ФИО</option>
      <option v-for="data in responseData" :key="data.driverID">{{data.driverID}} {{data.fio}}</option>
    </select>
  </div>
</template>

<script>
import {setDriver, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'DriversSelector',
  data() {
    return {
      driver: null,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/staff/drivers")
        .then(response => this.responseData = response.data)
        .catch(localError => alert(localError))
  },
  watch:{
    driver: function (){
      setDriver(this.driver)
    }
  }
}
</script>

<style scoped>
.dropList{
  display: flex;
}
.list{
  margin-bottom: 20px;
  padding: 5px 3px 5px 2px;
  font-size: 20px;
  text-align: center;

  border-radius: 5px;
}
</style>