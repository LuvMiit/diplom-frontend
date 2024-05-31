<template>
  <div class="dropList">
    <select class="list" v-model="post">
      <option disabled value="">Выберите топливо</option>
      <option>Без фильтра</option>
      <option v-for="data in responseData" :key="data.postID">{{data.postName}}</option>
    </select>
  </div>
</template>

<script>
import {setPost, userToken} from "@/store.js";
import axios from "axios";
export default {
  name: 'PostSelector',
  data() {
    return {
      post: null,
      responseData: null
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    axios.get("http://localhost:8080/post/all")
        .then(response => this.responseData = response.data)
        .catch(localError => alert(localError))
  },
  watch:{
    post: function (){
      setPost(this.post)
    }
  }
}
</script>

<style scoped>
.dropList{
  display: flex;
}
.list{
  margin-bottom: 20px;
  padding: 5px 3px 5px 2px;
  font-size: 20px;
  text-align: center;

  border-radius: 5px;
}
</style>