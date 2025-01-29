<template>
  <div class="site-wrapper">
    <div class="controls">
      <button @click="setPeriod('day')">1 Day</button>
      <button @click="setPeriod('week')">1 Week</button>
      <button @click="setPeriod('month')">1 Month</button>
      <button @click="setPeriod('3months')">3 Months</button>
      <button @click="setPeriod('6months')">6 Months</button>
      <button @click="setPeriod('year')">1 Year</button>
      <button @click="setPeriod('all')">All</button>
    </div>
    <div v-if="noData" class="no-data">No data for the selected {{ periodText }}</div>
    <div v-else class="cards-wrapper">
      <div class="col">
        <div class="card">
          <Graph :title="`Temperature`" :data="valuesTemp" :labels="times" />
        </div>
        <div class="card">
          <Graph :title="`Humidity`" :data="valuesHum" :labels="times" />
        </div>
        <div class="card">
          <Graph :title="`Moisture in %`" :data="valuesMoisture" :labels="times" />
        </div>
      </div>
      <div class="col">
        <div class="card">
          <Graph :title="`Lux`" :data="valuesLux" :labels="times" />
        </div>
        <div class="card">
          <Graph :title="`Pump`" :data="valuesPump" :labels="times" />
        </div>
        <div class="card">
          <Graph :title="`Flowrate L/s`" :data="valuesFlowrate" :labels="times" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Graph from '../components/Graph.vue';

const valuesTemp = ref([]);
const valuesHum = ref([]);
const valuesLux = ref([]);
const valuesPump = ref([]);
const valuesMoisture = ref([]);
const valuesFlowrate = ref([]);
const times = ref([]);
const noData = ref(false);

const period = ref('day');
const periodText = ref('');

async function fetchChartData() {
  try {
    const response = await fetch(`http://localhost:3000/getChartData?period=${period.value}`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn('No data found for the selected period');
        noData.value = true;
        updatePeriodText();
        clearData();
        return;
      }
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      noData.value = true;
      updatePeriodText();
      clearData();
      return;
    }

    noData.value = false;
    valuesTemp.value = data.map((item) => item.temperature);
    valuesHum.value = data.map((item) => item.humidity);
    valuesLux.value = data.map((item) => item.lux);
    valuesPump.value = data.map((item) => item.pump);
    valuesMoisture.value = data.map((item) => item.moisture);
    valuesFlowrate.value = data.map((item) => item.flowrate);
    times.value = data.map((item) =>
      new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    noData.value = true;
    updatePeriodText();
    clearData();
  }
}

function clearData() {
  valuesTemp.value = [];
  valuesHum.value = [];
  valuesLux.value = [];
  valuesPump.value = [];
  valuesMoisture.value = [];
  valuesFlowrate.value = [];
  times.value = [];
}

function updatePeriodText() {
  const periodMap = {
    day: 'day',
    week: 'week',
    month: 'month',
    '3months': '3 months',
    '6months': '6 months',
    year: 'year',
    all: 'all time',
  };
  periodText.value = periodMap[period.value] || 'selected period';
}

function setPeriod(newPeriod) {
  period.value = newPeriod;
  updatePeriodText();
  fetchChartData();
}

onMounted(() => {
  updatePeriodText();
  fetchChartData();
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');

.site-wrapper {
  margin-top: 150px; /* Основно разстояние за страницата */
  width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: center;

    button {
      padding: 0.7rem 1.5rem;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .no-data {
    margin-top: 1rem;
    color: #ff9800;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .cards-wrapper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    box-sizing: border-box;
    padding: 2rem;
    gap: 2rem;

    .col {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
      gap: 2rem;
    }
  }
}

.card {
  font-family: 'Montserrat';
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px solid rgba(41, 41, 41, 0.521);
  border-radius: 1rem;
}
</style>
