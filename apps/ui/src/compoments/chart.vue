<script setup>
import ProgressSpinner from 'primevue/progressspinner';
import Chart from 'primevue/chart';
import { stock } from '../store';
import { ref } from 'vue';
const props = defineProps({
  stock: String,
});

const chartData = ref([]);
const isLoading = ref(true);

onWatch(
  () => props.idStock,
  (e) => {
    stock.getHisotrical(e).then((data) => {
      isLoading.value = false;
      chartData.value = data;
    });
  }
);
</script>

<template>
  <section>
    <ProgressSpinner v-if="isLoading" />
    <Chart
      v-if="!isLoading"
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-[30rem]"
    />
  </section>
</template>
