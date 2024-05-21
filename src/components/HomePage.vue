<template>
  <div><Page/></div>

</template>

<script>
import {nullFilters, userRole} from "@/store.js"

import Cars from "@/components/Cars.vue";
import Storage from "@/components/Storage.vue";
import Crew from "@/components/Crew.vue";
import Repair from "@/components/Repair.vue";
import Register from "@/components/Register.vue";
import Page from "@/components/Page.vue";

export default {
  name: 'HomePage',
  components: {Page}
}

</script>

<style scoped>

</style>