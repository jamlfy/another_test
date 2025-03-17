<template>
  <section>
    <div>
      <h1>{{name}}</h1>
      <p>{{description}}</p>
    </div>
    <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
  </section>
</template>
