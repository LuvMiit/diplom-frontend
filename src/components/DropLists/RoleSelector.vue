<template>
  <div class="dropList">
    <select class="list" v-model="role">
      <option disabled value="">Выберите топливо</option>
      <option v-for="data in responseData" :key="data.roleID">{{data.roleName}}</option>
    </select>
  </div>
</template>

<script>
import {setFuel, setSelectedRole, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'RoleSelector',
  data() {
    return {
      role: null,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/role/all")
        .then(response => this.responseData = response.data)
        .catch(localError => alert(localError))
  },
  watch:{
    role: function (){
        setSelectedRole(this.role)
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