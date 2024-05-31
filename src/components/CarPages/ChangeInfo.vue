<template>
<div class="myPage">
  <Page/>
  <div class="workSpace">
    <p>Зафиксировать изменения для {{carPlates}}</p>
    <div class="inputs">
      <div class="selectors">
        <div>
          <p>Выберите тип топлива</p>
          <FuelSelector />
        </div>
        <div>
          <p>Выберите тип ТС</p>
          <TypesSelector/>
        </div>
        <div>
          <p>Выберите статуса</p>
          <StatusSelector/>
        </div>

      </div>
      <div class="firstInputs">
        <div>
          <p>Введите новый номер</p>
          <input class="input" placeholder="А111АА111" v-model="newCarPlates">
        </div>
        <div>
          <p>Введите новый ВИН-номер</p>
          <input class="input" placeholder="17 символов" v-model="vinNumber">
        </div>
        <div>
          <p>Введите новую марку</p>
          <input class="input" placeholder="МАРКА" v-model="brand">
        </div>
      </div>
      <div class="secondInputs">
        <div>
          <p>Введите новый год выпуска</p>
          <input class="input" placeholder="ГГГГ" v-model="release">
        </div>
        <div>
          <p>Введите новую дату поступления</p>
          <input class="input" placeholder="ГГГГ-ММ-ДД" v-model="dateStart">
        </div>
        <div>
          <p>Введите новый пробег</p>
          <input class="input" placeholder="100 или 100.1" v-model="mileage">
        </div>
      </div>
      <button @click="saveData">Сохранить</button>
    </div>

  </div>
</div>
</template>

<script >
import Page from "@/components/Page.vue";
import FuelSelector from "@/components/DropLists/FuelSelector.vue";
import TypesSelector from "@/components/DropLists/TypeSelector.vue";
import StatusSelector from "@/components/DropLists/StatusSelector.vue";
import fuelSelector from "@/components/DropLists/FuelSelector.vue";
import {selectedFuel, selectedStatus, selectedType, userToken} from "@/store.js";
import axios from "axios";
export default {
  name: 'ChangeInfo',
  components: {StatusSelector, TypesSelector, FuelSelector, Page},
  data() {
    return{
      oldMileage: null,
      carPlates: null,
      fuel: null,
      type: null,
      status: null,
      newCarPlates: null,
      vinNumber: null,
      brand: null,
      release: null,
      dateStart: null,
      mileage:null,
      inputError: ""
    }
  },
  methods:{
    saveData(){
      this.fuel = selectedFuel
      this.type = selectedType
      this.status = selectedStatus


      if(this.newCarPlates!==null && (this.newCarPlates.length>9 || this.newCarPlates.length<8)){
        this.inputError = this.inputError + " Неверно введен номер ТС!"
      }
      if(this.vinNumber!==null && this.vinNumber.length!==17){
        this.inputError = this.inputError + " Неверно введен ВИН-номер!"
      }
      if(this.release!==null && this.release.length!==4){
        this.inputError = this.inputError + " Неверно введен год выпуска!"
      }
      if(this.dateStart!==null && this.dateStart.length!==10){
        this.inputError = this.inputError + " Неверно введена дата поступления!"
      }
      if(this.mileage!==null && this.mileage<this.oldMileage){
        this.inputError = this.inputError + " Пробег не может быть меньше предыдущего!"
      }

      if(this.inputError!==""){
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
        axios.post("http://localhost:8080/cars/change", {
          newCarPlates: this.newCarPlates,
          oldCarPlates: this.carPlates,
          mileage: this.mileage,
          fuel: this.fuel,
          type: this.type,
          status: this.status,
          vinNumber: this.vinNumber,
          brand: this.brand,
          release: this.release,
          dateStart: this.dateStart
        })
      }
    }
  },
  created() {
      this.carPlates = this.$route.query.plates
      this.oldMileage = this.$route.query.mileage
  }
}
</script>

<style scoped>
.myPage{
  display: flex;
  flex-direction: row;
  min-width:75vw;
  align-items: center;

}
.inputs{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  margin: 20px;
  margin-top: 0;
}
.workSpace{
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-style: solid;
  border-radius: 25px;
margin-top: ;
  max-height: 450px;

}
.workSpace p{
  text-align: center;
}
.selectors{
  display: flex;
  flex-direction: row;
}
.firstInputs{
  display: flex;
  flex-direction: row;
}
.secondInputs{
  display: flex;
  flex-direction: row;
}
</style>