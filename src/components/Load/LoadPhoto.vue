<template>
  <div class="page">
      <page/>
        <div class = "workspace">
              <div class="load">
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
              </div>
          <p>Фотоотчеты для {{carPlates}}</p>
          <div v-for="(group, date) in groupedImageData" :key="date">
            <h2>{{ date }}</h2>
            <div class="photos">
              <div v-for="(photo, index) in group" :key="index">
                <img :src="photo.src" alt="photo" class="photo">
              </div>
            </div>
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
      imageData: [],
      carPlates: null

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
          axios.get(
              `http://localhost:8080/images/get/${this.carPlates}/${type}/${date}`,
              { responseType: 'arraybuffer' })
              .then(response => {
            // Преобразуем массив байтов в формат base64

            const base64String = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),''));
            // Формируем строку для отображения изображения
            this.imageData.push({
              src: `data:image/png;base64,${base64String}`,
              date: date
            });
          })
          .catch(error => {
            // Обрабатываем ошибку запроса
            console.error('Error fetching image data:', error);
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
    for (let i = 1; i <= 1; i++) {
      let prevDate = new Date();
      prevDate.setDate(currentDate.getDate() - 1);
      this.dates.push(prevDate.toISOString().slice(0,10));
    }
  },
  computed: {
    // Группировка изображений по датам
    groupedImageData() {
      const groupedData = {};
      this.imageData.forEach(image => {
        if (!groupedData[image.date]) {
          groupedData[image.date] = [];
        }
        groupedData[image.date].push(image);
      });
      return groupedData;
    }
  }
};
</script>
<style scoped>
.page{
  display: flex;
  flex-direction: row;
}
.photos{
  display: flex;
  flex-direction: row;

  border-style: solid;
  border-radius: 20px;

  background-color: mistyrose;

  margin: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.photo{
  max-width: 300px;
 }
.load{
  display: flex;
  flex-direction: column;
}
.workspace{
  display: flex;
  flex-direction: column;
}
</style>