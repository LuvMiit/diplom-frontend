<template>
  <div class="elements">
    <table class="table" >
        <thead class="tableHead">
          <th class="thComponentNumber">НОМЕР</th>
          <th class="thComponentStatus">СТАТУС</th>
          <th class="thComponentType">ТИП</th>
          <th class="thComponentStation">СТАНЦИЯ</th>
          <th class="thComponent">ПРОБЕГ</th>
          <th class="thComponent">ТОПЛИВО</th>
          <th class="thComponent">VIN</th>
        </thead>
        <tbody class="tableBody">

          <tr v-for="car in data" :key="car.carID" class="tableRow" v-on:click="flag=car.carPlates">
            <td class="tableBodyCompNumber">{{car.carPlates}}</td>
            <td class="tableBodyCompStatus">{{car.status.statusName}}</td>
            <td class="tableBodyCompType">{{car.type.typeName}}</td>
            <td class="tableBodyCompStation">{{car.station.stationName}}</td>
            <td class="tableBodyComp">{{car.mileage}} км</td>
            <td class="tableBodyComp">{{car.fuelType.fuelName}}</td>
            <td class="tableBodyComp">{{car.vinNumber}}</td>
          </tr>
          <tr v-if="flag" >
            <td colspan="2" class="info">
              <p>{{flag}}</p>

              <button @click="flag=false" class="btns">ЗАКРЫТЬ</button>
              <button @click="$router.push({name:'LoadPhotoPage', query:{plates: flag}})" class="btns">Фотографии</button>
              <button @click="$router.push({name:'RepairsPage', query:{plates: flag}})" class="btns">Ремонты</button>
            </td>
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


.thComponent{
  width:200px;
  border-style: solid;
  border-width: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: cornflowerblue;
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
.thComponentType{
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  padding-top: 10px;
  padding-bottom: 10px;

  min-width: 140px;
  max-width: 140px;
}
.thComponentStation{
    border-style: solid;
    border-color: cornflowerblue;
    border-width: 2px;

    padding-top: 10px;
    padding-bottom: 10px;

    min-width: 250px;
    max-width: 250px;
}



.tableBody{
}
.tableRow{
  display: flex;
  align-content: center;
  justify-content: center;
}
.tableRow:hover{
  background-color: mistyrose;
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
.tableBodyCompType{
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
.tableBodyCompStation{
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  padding-top: 10px;
  padding-bottom: 10px;

  text-align: center;
  font-size: 18px;

  min-width: 250px;
  max-width: 250px;
}
.info{
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
}
.btns{
  margin: 20px;
  height: 36px;
  border-radius: 10px;
}

</style>