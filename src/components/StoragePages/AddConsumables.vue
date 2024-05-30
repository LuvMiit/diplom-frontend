<template>
  <div class="page">
      <Page/>
        <div class="information">

          <h1>Добавление расходников с поставки на склад {{$route.query.storage}}</h1>

          <div class="choose">
              <div class="selectorPlace">
                  <h2>Добавление существующих расходников</h2>
                  <ConsumableSelector @click="loadFilters(); responseData=null" class="selector"/>
                  <div class="inpBut">
                    <input placeholder="Введите количество шт." v-model="quantity" class="inputPlace">
                    <button class="addBut" @click="saveData(consumableSelected, quantity)">Добавить</button>
                  </div>
                <p v-if="responseData">Успешно!</p>
              </div>

              <div class="addConsPlace">
                <div class="newPlace">
                  <h2>Добавление новых расходников</h2>
                    <div class="inputs">
                        <input placeholder="Введите название нового расходника"@click="responseDataNew=null;error=null" v-model="newConsumable" class="inputName">
                      <div class="inpBut">
                        <input placeholder="Введите количество шт." v-model="newQuantity" class="inputPlace">
                        <button class="addBut" @click="saveConsumable">Добавить</button>
                        <p v-if="responseDataNew">Новый расходник добавлен в справочник!</p>
                        <p v-if="error">Расходник уже существует!</p>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </div>

  </div>

</template>

<script>
import Page from "@/components/Page.vue";
import StorageSelector from "@/components/DropLists/StorageSelector.vue";
import ConsumableSelector from "@/components/DropLists/ConsumableSelector.vue";
import {selectedConsumable, userToken} from "@/store.js";
import axios from "axios";

export default {
  name: "AddConsumablePage",
  components: {ConsumableSelector, StorageSelector, Page},
  data(){
    return{
      consumableSelected: null,
      newConsumable: null,
      quantity: null,
      newQuantity:null,
      responseData: null,
      responseDataNew: null,
      error:null
    }
  },
  methods:{
    loadFilters(){
      this.consumableSelected = selectedConsumable
    },
    saveData(consumable, quantity){
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.post('http://localhost:8080/consum-storage/save',
          {
            consumableName: consumable,
            quantity: quantity,
            storageAddress: this.$route.query.storage})
          .then(response => this.responseData = response)
          .catch(error => alert(error))
    },
    saveConsumable(){
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.post('http://localhost:8080/consumable/add',
          {
            consumableName: this.newConsumable
          })
          .then(response => this.responseDataNew = response)
          .catch(error => this.error=error)
    }
  },
  watch:{
    responseDataNew: function (){
      this.saveData(this.newConsumable, this.newQuantity)
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
  min-width: 85vw;
}
.information h1{
  text-align: center;
}
.selectorPlace{

  display: flex;
  flex-direction: column;
  border-style: solid;
  border-radius: 30px;
  border-color: coral;
  background-color: mistyrose;
  max-width: 60%;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;

}
.inputPlace{
  font-size: 25px;
  text-align: center;
  margin-right: 45px;
}
.inpBut{
  display:flex;
}
.addBut{
  font-size: 20px;
  padding: 20px;

  border-radius: 10px;
  transition: transform 200ms ease;
}
.addBut:active{
  transform: scale(0.9);
}
.choose{
  border-top-style: solid;
  border-color: deepskyblue;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.inputs{
  display: flex;
  flex-direction: column;
}
.newPlace{
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-radius: 30px;
  border-color: coral;
  background-color: mistyrose;
  //max-width: 60%;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
}
.inputName{
  min-width: 500px;
  margin-bottom: 20px;
  font-size: 25px;
  text-align: center;
}
.inputQ{
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
}
</style>