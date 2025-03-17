<script setup>
import ProgressSpinner from 'primevue/progressspinner';

import Chart from '../compoments/chart';
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { stock } from '../store'

const route = useRoute()
const isLoading = ref(true);
const stock = ref({});

watch(
  () => route.params.stock,
  (newId) => {
    stock.getStock(newId)
      .then(data => {
        isLoading.value = false;
        stock.value = data;
      })
  }
);
</script>

<template>
  <section>

    <div>
      <h1>{{stock.name}}</h1>
      <p>{{stock.description}}</p>
    </div>

    <Chart 
      :stock="route.params.stock"
    />


  </section>
</template>
