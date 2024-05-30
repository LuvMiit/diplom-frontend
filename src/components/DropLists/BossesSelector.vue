<template>
  <div class="dropList">
    <select class="list" v-model="boss">
      <option disabled value="">Выберите представителя</option>
      <option v-for="data in responseData" :key="data.id">{{data.post}} {{data.fio}}</option>
    </select>
  </div>
</template>

<script>
import {setBoss, setFuel, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'BossesSelector',
  data() {
    return {
      boss: null,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/staff/bosses")
        .then(response => this.responseData = response.data)
        .catch(localError => alert(localError))
  },
  watch:{
    boss: function (){
        setBoss(this.boss)
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