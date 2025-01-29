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
    title: any,
    data: any,
    labels: any
}>();

const testData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title,
      data: props.data,
      backgroundColor: ['rgb(0, 213, 142)'],
    },
  ],
}));

const options = ref({
  responsive: true,
  maintainAspectRatio: true
});

</script>

<style>
</style>