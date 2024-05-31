<template>
  <div class="myPage">
    <Page/>
    <div class="regWin">
      <p>РЕГИСТРАЦИЯ</p>
      <p>Введите фамилию</p>
      <input class="placeHolder" type="text" v-model="userSurname">
      <p>Введите имя</p>
      <input class="placeHolder" type="text" v-model="userName">
      <p>Введите Отчество (При наличии)</p>
      <input class="placeHolder" type="text" v-model="userPatr">
      <p>Выберите должность</p>
      <PostSelector/>
      <p>Введите логин</p>
      <input class="placeHolder" type="text" v-model="userLogin">
      <p>Введите пароль</p>
      <input class="placeHolder" type="text" v-model="userPass">
      <p>Выберите роль</p>
      <RoleSelector/>
      <button class="btn" @click="register">Зарегистрировать</button>
      <p>{{responseData}}</p>
      <p v-if="responseData!==null">Пользователь зарегистрирован успешно</p>
      <p v-if="error!==null">Ошибка</p>
    </div>
  </div>
</template>

<script>
import Page from "@/components/Page.vue";
import RoleSelector from "@/components/DropLists/RoleSelector.vue";
import PostSelector from "@/components/DropLists/PostSelector.vue";
import {selectedPost, selectedRole, userToken} from "@/store.js";
import axios from "axios";

export default {
  name:'RegisterPage',
  components: {PostSelector, RoleSelector, Page},
  data(){
    return{
      error:null,
      userName: null,
      userSurname: null,
      userPatr:null,
      userPost:null,
      userLogin:null,
      userPass: null,
      userRole: null,
      responseData:null
    }
  },
  methods:{
    register(){
      this.responseData = null
      this.error = null
      this.userRole = selectedRole
      this.userPost=selectedPost

      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.post("http://localhost:8080/staff/register",{
        name: this.userName,
        surname: this.userSurname,
        patronimyc: this.userPatr,
        post: this.userPost,
        login: this.userLogin,
        pass: this.userPass,
        role: this.userRole

      })
          .then(response => this.responseData = response)
          .catch(error => this.error = error)

    }
  }


}
</script>

<style scoped>
.regWin{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.myPage{
  display: flex;
  flex-direction: row;
  min-width: 67vw;
}
.placeHolder{
  border-radius: 5px;
  min-height: 30px;
  min-width: 400px;
  text-align: center;
  font-size: 20px;
  margin:5px;
  margin-bottom:0;
}
.btn{
  margin: 20px;
  border-radius: 7px;
  font-size: 20px;
  padding: 5px
}
</style>