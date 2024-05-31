<template>
  <div>
    <button @click="fetchWordDocument">Fetch Word Document</button>
    <p>{{wordDocument}}</p>
    <button v-if="wordDocument" @click="downloadWordDocument">Download Word Document</button>
  </div>
</template>

<script>
import axios from 'axios';
import {userToken} from "@/store.js";

export default {
  data() {
    return {
      wordDocument: null
    };
  },
  methods: {
    async fetchWordDocument() {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
        axios.get(
            `http://localhost:8080/document/get/А777АА777/Прием`,
            { responseType: 'arraybuffer' })
            .then(response =>  this.wordDocument = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),''))
      )
            .catch(error=>alert(error))
        }catch (error){
          alert(error)
        }

      },
    downloadWordDocument() {
      // Create an anchor element to trigger download
      try{
      const link = document.createElement('a');
      link.href = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + this.wordDocument;
      link.download = 'document.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      }catch (error){
        alert(error)
      }
    }
  }
}
</script>