<template>
  <p class="page">Гараж</p>
</template>

<script>
import {garageFlag, setGarageFlag} from "@/store.js";

export default {
  name:'GaragePage',
  data(){
    return{
    localGarageFlag:true
    }
  },
  methods: {
    garageFlag() {
      return garageFlag
    },
    returnToGarage(){
      this.localGarageFlag = garageFlag
    },
    loadGarageFlag(){
      this.localGarageFlag=garageFlag
    }
  },
  props:[

  ]
}
</script>

<style scoped>
.page{
  padding: 20px;

  border-style: solid;
  border-color: cornflowerblue;
  border-right-width: 3px;

  font-size: 20px;
}
.page:hover{
  background-color: lightsteelblue;
}
</style>