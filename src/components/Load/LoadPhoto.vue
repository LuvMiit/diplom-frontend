<template>
  <div>
    <input type="file" @change="handleFileUpload">
    <button @click="submitPhoto">Submit</button>
    <img :src="imageData" alt="Photo from server" />
    <p>{{responseData}}</p>
  </div>

</template>

<script>
import axios from 'axios';
import {userToken} from "@/store.js";

export default {
  data() {
    return {
      photo: null,
      carPlates: null,
      imageData: null,
      responseData: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.photo = event.target.files[0];
    },
    async submitPhoto() {
      let formData = new FormData();
      formData.append('image', this.photo);

      try {
        await axios.post(`http://localhost:8080/images/post/${this.carPlates}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`
          }
        });
        alert('Photo uploaded successfully');
      } catch (error) {
        alert('An error occurred while uploading the photo');
      }
    },
    fetchImage() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
      axios.get(`http://localhost:8080/images/get`, { responseType: 'arraybuffer' })
          .then(response => {
            // Преобразуем массив байтов в формат base64
            const base64String = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),''));
            // Формируем строку для отображения изображения
            this.imageData = `data:image/png;base64,${base64String}`;
          })
          .catch(error => {
            // Обрабатываем ошибку запроса
            console.error('Error fetching image data:', error);
          });
    }
  },
  mounted() {
    this.fetchImage();
  }
  // created() {
  //   this.carPlates = this.$route.query.plates
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
  //   axios.get('http://localhost:8080/images/get')
  //       .then(response => this.responseData = response)
  //       .catch(error => console.log(error));
  // }
};
</script>