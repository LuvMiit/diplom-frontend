<template>
  <div class="page">
      <page/>
        <div>
              <div>
                <label for="front">Спереди:</label>
                <input type="file" id="front" @change="handleFileUpload('Спереди')">
              </div>
              <div>
                <label for="back">Сзади:</label>
                <input type="file" id="back" @change="handleFileUpload('Сзади')">
              </div>
              <div>
                <label for="left">Слева:</label>
                <input type="file" id="left" @change="handleFileUpload('Слева')">
              </div>
              <div>
                <label for="right">Справа:</label>
                <input type="file" id="right" @change="handleFileUpload('Справа')">
              </div>
              <div>
                <label for="inside">Внутри:</label>
                <input type="file" id="inside" @change="handleFileUpload('Внутри')">
              </div>
              <button @click="submitPhotos">Загрузить</button>
              <div v-for="(photo, index) in imageData" :key="index">
                <img :src="photo" :alt="'Photo ' + index">
              </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import { userToken } from "@/store.js";
import Page from "@/components/Page.vue";

export default {
  components: {Page},
  data() {
    return {
      photos: {
        front: null,
        back: null,
        left: null,
        right: null,
        inside: null,
      },
      types:["Спереди", "Сзади", "Слева", "Справа", "Внутри"],
      dates:[],
      uploadedPhotos: [],
      imageData: []
    };
  },
  methods: {
    handleFileUpload(type) {
      this.photos[type] = event.target.files[0];
      this.uploadedPhotos.push(this.photos[type])
    },
    async submitPhotos() {


      for (const type in this.photos) {
        if (this.photos[type]) {
          const formData = new FormData();
          formData.append('image', this.photos[type]);
          formData.append('type', type);
          try {
            const response = await axios.post(`http://localhost:8080/images/post/${this.carPlates}`, formData,
                {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userToken}`
              }
            });
            alert(`${type} photo uploaded successfully`);
          } catch (error) {
            alert(`An error occurred while uploading the ${type} photo`);
          }
        }
      }
    },
    fetchImage() {

      this.dates.forEach(date => {
        this.types.forEach(type => {
          console.log("Type: ", type);
          console.log("Date: ", date);

          axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
          axios.get(`http://localhost:8080/images/get/${this.carPlates}/${type}/${date}`)
              .then(response => {
                this.imageData.push('data:image/png;base64,' + response.data);
              })
              .catch(error => {
                console.error('Error fetching image:', error);
              });
        });
      });
    }
  },
  mounted() {
    this.fetchImage();
  },
  created() {
    this.carPlates = this.$route.query.plates


    let currentDate = new Date();
    this.dates.push(currentDate.toISOString().slice(0,10));
    for (let i = 1; i <= 2; i++) {
      let prevDate = new Date();
      prevDate.setDate(currentDate.getDate() - i);
      this.dates.push(prevDate.toISOString().slice(0,10));
    }
  }
};
</script>
<style scoped>
.page{
  display: flex;

}
</style>