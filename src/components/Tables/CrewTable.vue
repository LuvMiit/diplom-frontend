<template>
<div class="tableInfo">
  <table class="table" >

    <thead class="tableHead">
    <th class="thComponentNumber">НОМЕР БРИГАДЫ</th>
    <th class="thComponentNumber">ГОСНОМЕР ТС</th>
    <th class="thComponentStatus">ВОДИТЕЛЬ</th>
    </thead>

    <tbody class="tableBody">
      <tr v-for="crew in paginatedData" :key="crew.crewNumber" class="tableRow">
        <td class="tableBodyCompNumber">{{crew.crewNumber}}</td>
        <td class="tableBodyCompNumber">{{crew.carPlates}}</td>
        <td class="tableBodyCompNumber">{{crew.driver}}</td>
      </tr>
    </tbody>

  </table>
  <div>
    <button @click="prevPage" :disabled="currentPage === 1" class="pgBut">Предыдущая</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pgBut">Следующая</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'CrewTable',
  props:{
    data:null
  },
  data(){
    return{
      itemsPerPage: 10,
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      this.flag=false
      if (this.currentPage < this.totalPages) {
        this.currentPage++;

      }
    },
    prevPage() {
      this.flag=false
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
</script>



<style scoped>
.pgBut{
  border-radius: 10px;
  padding: 10px;
  transition: transform 200ms ease;
}
.pgBut:active{
  transform: scale(0.9);

}
.table {
  margin: 20px;
  display: flex;
  flex-direction: column;

  border-style: solid;
  border-width: 2px;
  border-color: cornflowerblue;
  border-radius: 6px;
}
.tableHead{
  display:flex;
}
.thComponentNumber{
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  text-align: center;
  font-size: 18px;

  padding-top: 15px;
  padding-bottom: 15px;

  min-width: 140px;
  max-width: 140px;
}
.thComponentStatus{
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  padding-top: 10px;
  padding-bottom: 10px;

  min-width: 140px;
  max-width: 140px;
}



.tableInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 83vw;
}
.tableRow{
  display: flex;
  align-content: center;
  justify-content: center;
}
.tableRow:hover{
  background-color: mistyrose;
}
.tableBodyCompNumber{
  border-style: solid;
  border-color: cornflowerblue;
  border-width: 2px;

  text-align: center;
  font-size: 18px;

  padding-top: 15px;
  padding-bottom: 15px;

  min-width: 140px;
  max-width: 140px;
}
</style>