<template>
<div class="myPage">
  <Page/>
  <div>
    <button>Регистрация сотрудника</button>
  </div>

</div>
</template>

<script>
import Page from "@/components/Page.vue";

export default {
  name: 'Employee',
  components: {Page},
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.myPage{
  display: flex;
  flex-direction: row;
  border-style: solid;
}
</style>