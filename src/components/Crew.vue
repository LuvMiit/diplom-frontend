<template>
  <div class="myPage">
    <Page/>
    <div class="info">
      <p>Список команд</p>
      <button @click="newCrew = true">Создать команду</button>
      <AddCrew v-if="newCrew"/>
      <button v-if="newCrew" @click="newCrew=false">Назад</button>
      <CrewTable v-if="!newCrew" :data="responseData"/>
    </div>


  </div>
</template>

<script>
import Page from "@/components/Page.vue";
import CrewTable from "@/components/Tables/CrewTable.vue";
import axios from "axios";
import {userToken} from "@/store.js";
import AddCrew from "@/components/AddCrew.vue";

export default {
  name:'Crew',
  components: {AddCrew, CrewTable, Page},
  data(){
    return{
      newCrew: false,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get('http://localhost:8080/crew/all')
        .then(response => this.responseData = response.data)
        .catch(error => alert(error))

  }
}
</script>

<style scoped>
.myPage{
  display: flex;
  flex-direction: row;
  border-style: solid;
}
.info{
  display: flex;
  flex-direction: column;
  align-items:center;
}
</style>