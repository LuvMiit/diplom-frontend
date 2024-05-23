<template>
  <div class="dropList">
    <select class="list" v-model="storage">
      <option disabled value="">Выберите склад</option>
      <option v-for="storage in responseData" :key="storage.storageID">{{storage.storageAddress}}</option>
    </select>
  </div>
</template>

<script>
import {selectedStatus, setFuel, setStatus, setStorage, setType, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: 'StorageSelector',
  data() {
    return {
      storage: null,
      responseData: null
    }
  },
  methods:{

  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/storage/all")
        .then(response => this.responseData = response.data)
        .catch(localError => this.error = localError)
  },
  watch:{
    storage: function (){
      if(this.storage !== 'Без фильтра') {
        setStorage(this.storage)
      }else(
          setStorage(null)
      )
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