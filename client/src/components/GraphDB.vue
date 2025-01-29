<template>
  <LineChart
    id="hello"
    :chartData="testData"
    :options="options"
    :ref="chartRef"
  />
</template>

<script lang="ts" setup>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { computed } from 'vue';
import { type Ref, ref } from 'vue';

const chartRef = ref();

Chart.register(...registerables);

const props = defineProps<{
    data: any,
}>();

const testData = computed(() => ({
  labels: props.data,
  datasets: [
    {
      label: 'Temperature',
      data: props.data,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));

const options = ref({
  responsive: true,
  maintainAspectRatio: false
});

</script>

<style>
</style>