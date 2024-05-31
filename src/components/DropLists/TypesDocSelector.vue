<template>
  <div class="dropList">
    <select class="list" v-model="type">
      <option disabled value="">Выберите тип документа</option>
      <option v-for="data in responseData" :key="data.typeID">{{data.typeName}}</option>
    </select>
  </div>
</template>

<script>
import {setDocType, setFuel, setSelectedRole, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'DocTypeSelector',
  data() {
    return {
      type: null,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/docTypes/all")
        .then(response => this.responseData = response.data)
        .catch(localError => alert(localError))
  },
  watch:{
    type: function (){
      setDocType(this.type)
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