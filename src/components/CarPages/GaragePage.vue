<template>
  <p class="page">Гараж</p>
</template>

<script>

export default {
  name:'GaragePage',
  data(){
    return{
    localGarageFlag:true
    }
  }
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