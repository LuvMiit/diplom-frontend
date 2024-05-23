<template>
  <div class="elements">
    <table class="table" >
      <thead class="tableHead">
      <th class="thComponentNumber">Расходник</th>
      <th class="thComponentStatus">Количество</th>
      </thead>
      <tbody class="tableBody">

      <tr v-for="storage in data" :key="storage.consumableName" class="tableRow">
        <td class="tableBodyCompNumber">{{storage.consumableName}}</td>
        <td class="tableBodyCompStatus">{{storage.quantity}}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import TypesSelector from "@/components/DropLists/TypeSelector.vue";
import StatusSelector from "@/components/DropLists/StatusSelector.vue";
import LoadPhoto from "@/components/Load/LoadPhoto.vue";


export default {
  name:'CarTable',
  components: {LoadPhoto, StatusSelector, TypesSelector},
  props:{
    data: null
  },
  data(){
    return{
      flag: false,
      selectedStatus: 'В гараже'
    }
  }
}

</script>

<style scoped>
.elements{
  display: flex;
  justify-content: center;
  min-width: 1000px;
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


.thComponentNumber{
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  text-align: center;
  font-size: 18px;

  padding-top: 15px;
  padding-bottom: 15px;

  min-width: 140px;
  max-width: 140px;
}
.thComponentStatus{
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  padding-top: 10px;
  padding-bottom: 10px;

  min-width: 140px;
  max-width: 140px;
}

.tableRow{
  display: flex;
  align-content: center;
  justify-content: center;
}
.tableRow:hover{
  background-color: mistyrose;
}

.tableBodyCompNumber{
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  text-align: center;
  font-size: 18px;

  padding-top: 15px;
  padding-bottom: 15px;

  min-width: 140px;
  max-width: 140px;
}
.tableBodyCompStatus{
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  text-align: center;
  font-size: 18px;

  padding-top: 15px;
  padding-bottom: 15px;

  min-width: 140px;
  max-width: 140px;
}

</style>