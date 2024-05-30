<template>
  <div class="page">
    <Page/>
    <div class="addPage">
      <p class="logo">Добавление ТС</p>
      <p class="error">{{error}}</p>
      <p v-if="errorPost!=null">ОШИБКА! Машина с таким номером уже существует.</p>
      <div class="addInfo">
        <div class="selectors">
          <div class="selComp">
            <p>Статус</p>
            <StatusSelector @click="loadFilters" v-model="statusFilter"/>
          </div>
          <div class="selComp">
            <p>Тип</p>
            <TypesSelector @click="loadFilters" v-model="typeFilter"/>
          </div>
          <div class="selComp">
            <p >Вид топлива </p>
            <FuelSelector @click="loadFilters" v-model="fuelFilter"/>
          </div>
        </div>

        <div class="selectors">
          <div class="selComp">
            <p>Номерной знак</p>
            <input type="text" placeholder="А111АА111" class="inputPlace" v-model="carPlates">
          </div>
          <div class="selComp2">
            <p>Пробег</p>
            <input type="text" placeholder="100.1 или 100" class="inputPlace" v-model="mileage">
          </div>
        </div>

        <div class="selectors">
          <div class="selComp">
            <p>VIN-номер </p>
            <input type="text" placeholder="Заглавные 17 символов" class="inputPlace" v-model="vin">
          </div>
          <div class="selComp2">
            <p>Санция СМП</p>
            <input type="text" disabled value='ССМП "Красногорская ГЛ"' class="inputPlace">
          </div>
        </div>

        <div class="selectors">
          <div class="selComp">
            <p>Передающая организация</p>
            <input type="text" placeholder="Название организации" class="inputPlace" v-model="sellerCompanyName">
          </div>
          <div class="selComp2">
            <p>ФИО ответственного</p>
            <input type="text" placeholder='Иванов И.И.' class="inputPlace" v-model="fioSeller">
          </div>
        </div>
        <div class="selectors">
          <div class="selComp">
            <p>Марка ТС</p>
            <input type="text" placeholder="Название марки" class="inputPlace" v-model="brand">
          </div>
          <div class="selComp2">
            <p>Год выпуска</p>
            <input type="text" placeholder='гггг' class="inputPlace" v-model="release">
          </div>
        </div>

        <p>    </p>
      </div>
      <div class="btns">
        <button class="saveBut" @click="checkAndSaveData">Сохранить и составить акт приема</button>
        <button class="saveBut" @click="$router.push('cars')">Назад</button>
        <p v-if="responseData!==null">Успешно!</p>
      </div>
    </div>
  </div>

</template>

<script>
import TypesSelector from "@/components/DropLists/TypeSelector.vue";
import StatusSelector from "@/components/DropLists/StatusSelector.vue";
import {selectedFuel, selectedStatus, selectedType, userToken} from "@/store.js";
import FuelSelector from "@/components/DropLists/FuelSelector.vue";
import axios from "axios";
import Page from "@/components/Page.vue";

export default {
  name:'AddPage',
  components: {Page, FuelSelector, StatusSelector, TypesSelector},
  data(){
    return{
      statusFilter: null,
      typeFilter: null,
      fuelFilter: null,
      error:'',
      errorPost:null,
      responseData: null,

      carPlates:null,
      mileage:null,
      vin: null,
      station:'ССМП "Красногорская ГЛ"',
      fioSeller: null,
      sellerCompanyName: null,
      brand: null,
      release: null,
      status: "На проверке"

    }
  },
  methods:{
    checkAndSaveData(){
      this.error = ''
      if(this.statusFilter === null){
        this.error = "Не выбран статус!"
      }
      if(this.typeFilter === null){
        this.error = this.error + " Не выбран тип!"
      }
      if(this.fuelFilter === null){
        this.error = this.error + " Не выбрано топливо!"
      }
      if(this.carPlates === null || this.carPlates.length>9 || this.carPlates.length<8){
        this.error = this.error + " Неверно указан гос.номер ТС!"
      }
      if(this.mileage === null){
        this.error = this.error + " Не указан пробег!"
      }
      if(this.vin === null || this.vin.length !== 17){
        this.error = this.error + " Неверно указан vin-номер ТС!"
      }
      if(this.fioSeller === null ){
        this.error = this.error + " Не указаны ФИО отвественного передающего!"
      }
      if(this.sellerCompanyName === null ){
        this.error = this.error + " Не указано название передающей организации!"
      }
      if(this.brand === null ){
        this.error = this.error + " Не указано название марки ТС!"
      }
      if(this.release === null ){
        this.error = this.error + " Не указана дата выпуска ТС!"
      }
      if(this.error === '') {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
        axios.post("http://localhost:8080/cars/add", {
          carPlates: this.carPlates,
          mileage: this.mileage,
          vin: this.vin,
          stationName: this.station,
          status: this.statusFilter,
          type: this.typeFilter,
          fuel: this.fuelFilter,
          brand: this.brand,
          release: this.release
        })
            .then(response => this.responseData = response.data).catch(error => this.errorPost = error);
      }
    },
    loadFilters(){
      this.statusFilter = selectedStatus
      this.typeFilter = selectedType
      this.fuelFilter = selectedFuel
    }
  },
  watch: {
    responseData: function (){
      alert("ышмуьшщм")
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.post("http://localhost:8080/document/accept", {
        carPlates: this.carPlates,
        mileage: this.mileage,
        vinNumber: this.vin,
        stationName: this.station,
        fioSeller: this.fioSeller,
        sellerCompanyName: this.sellerCompanyName,
        brand: this.brand,
        release: this.release,
        status: this.status

      })
          .catch(error => alert(error));
    }
  }
}
</script>

<style scoped>
.page{
  min-width:1400px;
  display: flex;
  flex-direction: row;
}
.addPage{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inputPlace{
  min-height: 28px;
  min-width: 150px;

  border-radius: 5px;
}
.saveBut{
  min-width: 150px;
  min-height: 40px;

  margin-bottom: 20px;

  font-size: 20px;

  border-radius: 10px;
  transition: transform 200ms ease;
}
.saveBut:active{
  transform: scale(0.9);

}
.error{
  max-width: 800px;
  color: red;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.btns{
  display: flex;
  flex-direction: column;
}
.addInfo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.selectors{
  display: flex;
}
.selComp{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.selComp2{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
</style>