<template>
<div class="myPage">
  <Page/>
  <div class="workSpace">
    <div class="info">
      <p>Сформировать акт передачи для {{carPlates}}</p>
      <BossesSelector  v-model="infoMyCompany"/>
      <div class="inputs">

        <p>Введите название передающей организации</p>
        <input placeholder="Название компании" class="placeHolder" v-model="sellerCompanyName">
        <p>Введите ФИО представителя передающей организации</p>
        <input placeholder="Иванов И.И." class="placeHolder" v-model="fioSellerCompany" @click="loadFilters">
        <button @click="saveData">Сохранить</button>
      </div>
    </div>
    <div class="minus">
      <p>Сформировать акт списания для {{carPlates}}</p>
      <BossesSelector  v-model="infoMyCompany"/>
      <p>Введите причину списания</p>
      <input placeholder="Причина" class="placeHolder" v-model="reason">
      <p>Введите табельный номер гл. механика</p>
      <input placeholder="Номер" class="placeHolder" v-model="idMech" @click="loadFilters">
      <button @click="saveDataSpis">Сохранить</button>
    </div>
  </div>
</div>
</template>

<script>
import Page from "@/components/Page.vue";
import BossesSelector from "@/components/DropLists/BossesSelector.vue";
import axios from "axios";
import {selectedBoss, selectedFuel, selectedStatus, selectedType, userToken} from "@/store.js";

export default {
  name:'CreateWord',
  components: {BossesSelector, Page},
  data(){
    return{
      carPlates: null,
      status: "На проверке",
      sellerCompanyName: null,
      fioSellerCompany: null,
      infoMyCompany: null,
      idMech: null,
      reason: null
    }
  },
  methods:{
    saveData(){
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.post(
        "http://localhost:8080/document/bcast",{
            carPlates: this.carPlates,
            sellerCompanyName: this.sellerCompanyName,
            fioSeller: this.fioSellerCompany,
            infoMyCompany: this.infoMyCompany,
            typeDocument: "Передача",
            status: this.status
          })
    },
    loadFilters(){
      this.infoMyCompany = selectedBoss
    },
    saveDataSpis(){
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.post(
          "http://localhost:8080/document/writedown",{
            carPlates: this.carPlates,
            mechID: this.idMech,
            infoMyCompany: this.infoMyCompany,
            status: this.status,
            reason: this.reason
          })
    }
  },
  created() {
    this.carPlates = this.$route.query.plates
  }
}
</script>

<style scoped>
.myPage{
  display: flex;
  flex-direction: row;
  border-style: solid;
  min-width: 90vw;
}
.myPage p{
  text-align: center;
}
.workSpace{
  display: flex;
  flex-direction: row;
  align-items: center;

}
.inputs{
  display: flex;
  flex-direction: column;
}
.placeHolder{
  font-size: 20px;
  min-width: 500px;
  text-align: center;
}
.info{
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-radius: 20px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 10px;
  margin-right: 20px;
}
.minus{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-style: solid;
  border-radius: 20px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 10px;
  margin-right: 20px;
}
</style>