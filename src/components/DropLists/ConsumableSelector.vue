<template>
  <div class="dropList">
    <select class="list" v-model="consumable">
      <option disabled value="">Выберите расходник</option>
      <option v-for="consumable in responseData" :key="consumable">{{consumable.consumableName}}</option>
    </select>
  </div>
</template>

<script>
import {setConsumable, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'ConsumableSelector',
  data() {
    return {
      consumable: null,
      responseData: null
    }
  },
  methods:{

  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/consumable/all")
        .then(response => this.responseData = response.data)
        .catch(localError => this.error = localError)
  },
  watch:{
    consumable: function (){
        setConsumable(this.consumable)
    }
  }
}
</script>

<style scoped>
.dropList{
  display: flex;
  flex-direction: column;
}
.list{
  margin-bottom: 20px;
  padding: 5px 3px 5px 2px;
  font-size: 20px;
  min-width: 500px;
  text-align: center;
  border-radius: 5px;
}
</style>