<template>
  <div class="dropList">
    <select v-model="type" class="list" >
      <option disabled value="">Выберите тип ТС</option>
      <option>Без фильтра</option>
      <option v-for="data in responseData" :key="data.typeID">{{data.typeName}}</option>
    </select>
  </div>
</template>

<script>
import {setFuel, setStatus, setType, userToken} from "@/store.js";
import axios from "axios";

export default {
  name:'typesSelector',
  data(){
    return{
      responseData: null,
      type:null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/types/all").then(response => this.responseData = response.data).catch(localError=>this.error = localError)
  },
  watch:{
    type: function (){
      if(this.type !== 'Без фильтра') {
        setType(this.type)
      }else(
          setType(null)
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

  min-width: 203px;
}
</style>