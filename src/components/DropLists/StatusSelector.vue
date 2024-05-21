<template>
  <div class="dropList">
    <select class="list" v-model="status">
      <option disabled value="">Выберите статус</option>
      <option>Без фильтра</option>
      <option v-for="data in responseData" :key="data.statusID">{{data.statusName}}</option>
    </select>
  </div>
</template>

<script>
import {selectedStatus, setFuel, setStatus, setType, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'statusSelector',
  data() {
    return {
      status: null,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/status/all").then(response => this.responseData = response.data).catch(localError => this.error = localError)
  },
  watch:{
    status: function (){
      if(this.status !== 'Без фильтра') {
        setStatus(this.status)
      }else(
          setStatus(null)
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
  min-width: 203px;
  text-align: center;
  border-radius: 5px;
}
</style>