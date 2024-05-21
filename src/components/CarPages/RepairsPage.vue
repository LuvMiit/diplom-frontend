<template>
  <div class="page">
    <Page/>

    <div class="workSpace">
      <p class="logoPlates"> Список ремонтов для {{carPlates}}</p>
      <div class="elements">

        <table class="table" >
          <thead class="tableHead">
          <th class="thComponent">Дата</th>
          <th class="thComponent">Механик</th>
          <th class="thComponent">Операции</th>
          <th class="thComponent">Расходники</th>
          </thead>
          <tbody class="tableBody">
          <tr v-for="repair in responseData" :key="repair.maintenanceID" class="tableRow">
            <td class="tableBodyComp">{{repair.date}}</td>
            <td class="tableBodyComp">{{repair.surName}} {{repair.firstName}} {{repair.patronimyc}}</td>
            <td class="tableBodyComp">{{loadOperations(repair)}}</td>
            <td class="tableBodyComp">{{loadConsumables(repair)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <button class="backBut" @click="$router.push('cars')">Назад</button>
    </div>
  </div>
</template>

<script>
import TypesSelector from "@/components/DropLists/TypeSelector.vue";
import Page from "@/components/Page.vue";
import StatusSelector from "@/components/DropLists/StatusSelector.vue";
import CarTable from "@/components/Tables/CarTable.vue";
import axios from "axios";
import {userToken} from "@/store.js";

export default {
  name:'RepairsPage',
  components: {CarTable, StatusSelector, Page, TypesSelector},
  data(){
    return{
      carPlates: null,
      responseData: null,
      error:null,
      operations:[],
      consumables: [],
      resultOperations:null,
      resultConsumables: null
    }
  },
  methods:{
    loadOperations(repair){
      this.operations = repair.usedOperations
      this.resultOperations= ''
      console.log(this.operations.length)
      for(let i=0; i<this.operations.length-1;i++){
        let element = this.operations[i].operationName +', '
        this.resultOperations = this.resultOperations + element
      }
      this.resultOperations = this.resultOperations + this.operations[this.operations.length-1 ].operationName
      return this.resultOperations
    },
    loadConsumables(repair){
      this.consumables = repair.usedConsumables
      this.resultConsumables= ''
      for(let i=0; i<this.consumables.length-1;i++){
        let element = this.consumables[i].consumableName +', '
        this.resultConsumables = this.resultConsumables + element
      }
      this.resultConsumables = this.resultConsumables + this.consumables[this.consumables.length-1 ].consumableName
      return this.resultConsumables
    }
  },
  created() {
    this.carPlates = this.$route.query.plates
    console.log(this.carPlates)
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get(`http://localhost:8080/maintenance/${this.carPlates}`)
        .then(response=> this.responseData = response.data)
        .catch(localError => this.error = localError)
  }
}
</script>

<style scoped>
.workSpace{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logoPlates{
  font-size: 20px;
}
.page{
  display: flex;
  flex-direction: row;
}
.elements{
  display: flex;
  justify-content: center;
  min-width: 1600px;
}
.table {
  margin: 20px;
  display: flex;
  flex-direction: column;


  border-style: solid;
  border-width: 2px;
  border-color: cornflowerblue;
  border-radius: 6px;
}
.tableHead{
  display:flex;
}
.thComponentPlates{
  width:120px;
  border-style: solid;
  border-width: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: cornflowerblue;
}
.thComponent{
  width:200px;
  border-style: solid;
  border-width: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: cornflowerblue;
}

.tableRow{
  display: flex;
  align-content: center;
  justify-content: center;
}
.tableRow:hover{
  background-color: mistyrose;
}
.tableBodyCompPlates{
  max-width: 120px;
  min-width: 120px;

  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  text-align: center;
  font-size: 18px;

  padding-top: 15px;
  padding-bottom: 15px;
}
.tableBodyComp{
  max-width: 200px;
  min-width: 200px;

  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  text-align: center;
  font-size: 18px;

  padding-top: 15px;
  padding-bottom: 15px;
}
.backBut{
  border-radius: 10px;
  font-size: 20px;
  min-height: 40px;
  min-width: 100px;
}
</style>