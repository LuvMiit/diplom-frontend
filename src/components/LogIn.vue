<template class="loginPage">

    <div class="loginMenu" >
      <h1 class="header">Вход</h1>
      <div>
        <input class="loginPlaceholder" type="text" v-model="userLogin" placeholder="Логин">
      </div>
        <input class="passPlaceholder" type="password" v-model="userPass" placeholder="Пароль">
      <div>
        <button class="enterButton" @click="sendCredentials()" >Войти</button>
        <p v-if="error !== null">Неверные логин или пароль!</p>
      </div>
    </div>

</template>



<script>
import axios from "axios";
import {setToken, setAuthFlag, setRole, getConsole} from "@/store.js";

export default {

  data() {
    return {
      userLogin: null,
      userPass: null,
      userRole: null,
      userToken: null,
      responseData: null,
      authFlag: null,
      error: null
    }

  },
  methods: {
    sendCredentials() {
      console.log("Данные: " + this.userLogin, this.userPass)
      axios.post("http://localhost:8080/auth/login", {login: this.userLogin, password: this.userPass})
          .then(response => this.responseData = response.data).catch(error => this.error = error.data);
      console.log("ERROR " + this.error)
    },

  },
  watch: {

    // Вотчер для переменной
    responseData: function (newValue, oldValue) {
      this.userRole = this.responseData.role
      this.userToken = this.responseData.jwtToken
      this.authFlag = true;
      setAuthFlag(this.authFlag)
      setToken(this.userToken)
      setRole(this.userRole)
      getConsole()
      // alert(this.userRole+this.userToken+this.authFlag)
      this.$router.push({name: 'home'})
    }
  }
}
</script>



<style scoped>
.header{
font-size: 50px;
}
.loginMenu{
  text-align: center;
  width: 600px;
  height: 400px;
  background: cyan;
  border-radius: 30px;
  border-bottom-color: darkslategrey;
  border-style: solid;
  margin-left: 110%;
  margin-top: 50%;
}
.loginPlaceholder{
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  text-align: center;
}
.passPlaceholder{
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}
.enterButton{
  margin-top: 50px;
  border-radius: 10px;
  width: 150px;
  height: 60px;
  background-color: gold;
  transition: transform 500ms ease;
}
.enterButton:active{
transform: scale(0.9) translateY(-5px);
}
</style>