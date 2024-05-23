<template >
  <div class="page">
      <Page/>
      <div>
        <p class="logo" v-if="!addFlag">Фильтры и действия</p>
        <div class="filters" >
          <StatusSelector @click="loadFilters"  class="selector"/>
          <TypesSelector @click="loadFilters" />
          <button class="addBut" @click="$router.push('addCar')" v-if="!addFlag" >Добавить ТС</button>
        </div>
        <CarTable :data="filterData()" v-if="!addFlag"/>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import {selectedStatus, selectedType, userToken} from "@/store.js";
import CarTable from "@/components/Tables/CarTable.vue";
import StatusSelector from "@/components/DropLists/StatusSelector.vue";
import TypesSelector from "@/components/DropLists/TypeSelector.vue";
import CarPages from "@/components/CarPages/GaragePage.vue";
import GaragePage from "@/components/CarPages/GaragePage.vue";
import PhotoPage from "@/components/CarPages/PhotoPage.vue";
import RepairsPage from "@/components/CarPages/RepairsPage.vue";
import FuelSelector from "@/components/DropLists/FuelSelector.vue";
import AddPage from "@/components/CarPages/AddPage.vue";
import Page from "@/components/Page.vue";

export default {
  name:'Cars',
  components: {
    Page,
    AddPage,
    FuelSelector, RepairsPage, PhotoPage, GaragePage, CarPages, TypesSelector, StatusSelector, CarTable},
  data(){
    return{

      addFlag: false,

      responseData:null,
      statusFilter: null,
      typeFilter:null,
      error:null,
      tableFlag: false
    }
  },
  created() {
      this.tableFlag = true
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.get("http://localhost:8080/cars/all").then(response => this.responseData = response.data).catch(localError=>this.error = localError)
  },
  methods:{
    loadFilters(){
      this.statusFilter = selectedStatus
      this.typeFilter = selectedType
    },
    filterData() {
      let filteredItems = this.responseData;
      if (this.statusFilter ) {
        filteredItems = filteredItems.filter(item => item.status.statusName === this.statusFilter);
      }
      if (this.typeFilter ) {
        filteredItems = filteredItems.filter(item => item.type.typeName === this.typeFilter);
      }
      return filteredItems
    }
  },
  watch:{
    error: function(){
      alert(this.error)
    }
  }
}
</script>

<style scoped>
.page{
  display: flex;
  flex-direction: row;
}

.filters{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.addBut{
  height: 36px;
  margin: 20px;
  border-radius: 10px;
  transition: transform 200ms ease;
}
.addBut:active{
  transform: scale(0.9);

}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>