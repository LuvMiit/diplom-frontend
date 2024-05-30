<template>
  <div class="page">
    <Page/>
    <div class="information">
      <div class="selButtLogo">
          <h1 class="logo">Выберите склад</h1>
            <div>
              <StorageSelector @click="loadFilters" class="selector"/>
            </div>
        <div class="btns">
          <button class="addButton" @click="$router.push({name:'AddConsumablePage',
                  query:{storage: storageFilter}})" v-if="storageFilter">Зафиксировать поставку</button>
        </div>
      </div>
            <StorageTable :data="filterData()" v-if="responseData!=null"/>
    </div>
</div>
</template>

<script>
import Page from "@/components/Page.vue";
import StorageSelector from "@/components/DropLists/StorageSelector.vue";
import StorageTable from "@/components/Tables/StorageTable.vue";
import axios from "axios";
import {selectedStorage, userToken} from "@/store.js";

export default {
  name: "StoragePage",
  components: {StorageTable, StorageSelector, Page},
  data(){
    return{
      responseData:null,
      storageFilter: null
    }
  },
  methods:{
    filterData() {
      let filteredItems = this.responseData;
      // if (this.storageFilter ) {
      //   filteredItems = filteredItems.filter(item => item.storageAddress === this.storageFilter);
      // }
      return filteredItems
    },
    loadData(){
      axios.defaults.headers.common['Authorization']=`Bearer ${userToken}`
      axios.get(`http://localhost:8080/consum-storage/all/${selectedStorage}`)
          .then(response => this.responseData = response.data)
          .catch(error => alert(error))
    },
    loadFilters(){
      this.storageFilter = selectedStorage
    }
  },
  watch:{
    storageFilter: function(){
      this.loadData()
    }
  }
}
</script>

<style scoped>
.page{
  display: flex;
  flex-direction: row;

}
.information{
  display: flex;
  flex-direction: column;
  min-width: 1600px;
}
.information h1{
  text-align: center;
}
.showButton{
  max-width: 200px;
  padding: 10px;
  border-radius: 10px;
  transition: transform 200ms ease;
}
.showButton:active{
  background-color: lightsteelblue;
  transform: scale(0.9);
}
.selButtLogo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btns{
  display: flex;
}

.addButton{
  margin-left: 20px;
  border-radius: 10px;
  transition: transform 200ms ease;
}
.addButton:active{
  background-color: lightsteelblue;
  transform: scale(0.9);
}
</style>