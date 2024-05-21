<template>
  <p>ИНФОРМАЦИЯ О РЕГИСТРАЦИИ</p>
  <div class="regWin">
    <input class="placeHolder" type="text" v-model="userName">
    <input class="placeHolder" type="text" v-model="userSurname">
    <input class="placeHolder" type="text" v-model="userPatr">
    <input class="placeHolder" type="text" v-model="userPost">
    <input class="placeHolder" type="text" v-model="userLogin">
    <input class="placeHolder" type="text" v-model="userPass">
    <input class="placeHolder" type="text" v-model="userRolee">
  </div>
</template>

<script>
export default {
  data(){
    return{
      name:'Register',
      userName: null,
      userSurname: null,
      userPatr:null,
      userPost:null,
      userLogin:null,
      userPass: null,
      userRole: null
    }
  }


}
</script>

<style scoped>
.regWin{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>