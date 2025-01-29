<template>
  <div class="site-wrapper">
    <div class="controls">
      <label for="fromDate">From:</label>
      <input type="datetime-local" v-model="fromDate" id="fromDate" />

      <label for="toDate">To:</label>
      <input type="datetime-local" v-model="toDate" id="toDate" />

      <label for="sensor">Sensor:</label>
      <select v-model="selectedSensor" id="sensor">
        <option value="temperature">Temperature</option>
        <option value="humidity">Humidity</option>
        <option value="lux">Lux</option>
        <option value="pump">Pump</option>
        <option value="moisture">Moisture</option>
        <option value="flowrate">Flowrate</option>
      </select>

      <button @click="fetchChartData">Fetch Data</button>
    </div>

    <div class="statistics" v-if="showStatistics">
      <h2>{{ selectedSensor.charAt(0).toUpperCase() + selectedSensor.slice(1) }} Statistics</h2>
      <div v-if="stats[selectedSensor]" class="stats-content">
        <h3>Statistics for selected period</h3>
        <div v-for="(stat, day) in stats[selectedSensor]" :key="day" class="day-stats">
          <p><strong>{{ day }}</strong></p>
          <p>Min: {{ stat.min }}</p>
          <p>Max: {{ stat.max }}</p>
          <p>Avg: {{ stat.avg.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <div v-else class="no-data">
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const fromDate = ref('');
const toDate = ref('');
const selectedSensor = ref('temperature');
const stats = ref<any>({});
const showStatistics = ref(false);
const errorMessage = ref('');

// Функция за извличане на данни от сървъра
async function fetchChartData() {
  if (!fromDate.value || !toDate.value) {
    errorMessage.value = "Both 'From' and 'To' dates must be provided.";
    showStatistics.value = false;
    return;
  }

  try {
    const response = await axios.get('http://localhost:3000/getChartDataByDate', {
      params: {
        fromDate: new Date(fromDate.value).toISOString(),
        toDate: new Date(toDate.value).toISOString(),
        sensor: selectedSensor.value
      }
    });

    if (!Array.isArray(response.data) || response.data.length === 0) {
      errorMessage.value = 'No data found for the selected period.';
      showStatistics.value = false;
      return;
    }

    stats.value[selectedSensor.value] = calculateDailyStatistics(response.data, selectedSensor.value);
    showStatistics.value = true;
    errorMessage.value = '';
  } catch (error) {
    console.error('Error fetching data:', error.response || error.message);
    errorMessage.value = 'An error occurred while fetching the data.';
    showStatistics.value = false;
  }
}

// Функция за изчисляване на дневните статистики
function calculateDailyStatistics(data: any[], sensor: string) {
  const stats: any = {};

  data.forEach((element) => {
    const dateKey = new Date(element.createdAt).toLocaleDateString();

    if (!stats[dateKey]) {
      stats[dateKey] = {
        min: Infinity,
        max: -Infinity,
        total: 0,
        count: 0,
        avg: 0
      };
    }

    const value = element[sensor];
    const dayStats = stats[dateKey];

    dayStats.min = Math.min(dayStats.min, value);
    dayStats.max = Math.max(dayStats.max, value);
    dayStats.total += value;
    dayStats.count++;
    dayStats.avg = dayStats.total / dayStats.count;
  });

  return stats;
}

// Инициализиране на стойности по подразбиране
onMounted(() => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  fromDate.value = pastDate.toISOString().slice(0, 16);
  toDate.value = now.toISOString().slice(0, 16);

  fetchChartData();
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');

.site-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 150px;
  font-family: 'Montserrat', sans-serif;

  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      input,
      select {
        margin-top: 0.5rem;
        padding: 0.5rem;
        font-size: 1rem;
      }
    }

    button {
      margin-top: 1rem;
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

  .statistics {
    margin-top: 2rem;
    width: 100%;
    text-align: center;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .stats-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      .day-stats {
        border: 1px solid #ddd;
        padding: 1rem;
        border-radius: 8px;
        width: 60%;
        background: #f9f9f9;
      }
    }
  }

  .no-data {
    margin-top: 2rem;
    color: red;
    font-weight: bold;
  }
}
</style>
