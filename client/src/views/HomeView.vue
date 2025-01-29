<template>
  <div class="site-wrapper">
    <div class="cards-wrapper">
      <!-- Moisture Card -->
      <div class="card moisture-card">
        <p>Moisture:</p>
        <div class="main-panel">
          <span id="moistureValue">{{ moisture }}</span>
          <!-- Show auto toggle only if logged in -->
          <div v-if="checkForLogin()" class="auto-toggle-container">
            <label for="mode">Auto:</label>
            <input type="checkbox" name="mode" id="auto-switch" v-model="automated" @change="onModeButtonClick">
          </div>
          <!-- Show manual toggle only if not automated and logged in -->
          <div v-if="!automated && checkForLogin()">
            <label class="switch">
              <input type="checkbox" :checked="pumpState === 'On'" @change="togglePumpState">
              <span class="slider"></span>
            </label>
          </div>
          <!-- Show pump state and mode only if logged in -->
          <div v-if="checkForLogin()">
            <p>Current Pump State:</p>
            <span id="pumpState">{{ pumpState }} ({{ automated ? 'Auto' : 'Manual' }})</span>
          </div>
        </div>
        <div class="chart-container">
          <Graph :data="graphData" :labels="graphLabels" title="Moisture Levels" />
        </div>
      </div>

      <!-- Temperature, Light, Humidity, FlowRate Card -->
      <div class="card temperature-card">
        <div class="main-panel">
          <p class="data-time">Last data insert at: {{ lastDataTime }}</p>
          <p>Temperature Air:</p>
          <span id="temperatureValue">{{ temperatureair }}</span>
          <p>Light level:</p>
          <span id="lightValue">{{ light }}</span>
          <p>Humidity:</p>
          <span id="humidityValue">{{ humidity }}</span>
          <p>FlowRate L/s:</p>
          <span id="flowRateValue">{{ flowsensor }}</span>
          <!-- Show IP Address only if logged in -->
          <p v-if="checkForLogin()">IP Address:</p>
          <span v-if="checkForLogin()" id="ipAddressValue">{{ ipAddress }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getLightLevelEvaluation } from '../utils';
import Graph from '../components/Graph.vue';

const api_path = 'http://localhost:3000'; // Define your API path here
const esp_pat = ref('http://localhost:3000'); // Initialize esp_pat as a ref

const graphData = ref([]);
const graphLabels = ref([]);

let moisture = ref('measuring..');
let temperatureair = ref('measuring..');
let humidity = ref('measuring..');
let light = ref('measuring..');
let flowsensor = ref('measuring..');
let pumpState = ref('Off');
let automated = ref(false);
let ipAddress = ref('N/A'); // Initialize IP Address
let lastDataTime = ref('N/A');

onMounted(() => {
  function fetchData() {
    fetch(`${api_path}/getChartData?period=month`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latestData = data[data.length - 1];
          moisture.value = latestData.moisture;
          temperatureair.value = latestData.temperature;
          humidity.value = latestData.humidity;
          light.value = getLightLevelEvaluation(latestData.lux);
          flowsensor.value = latestData.flowrate;
          pumpState.value = latestData.pump ? 'On' : 'Off';
          ipAddress.value = latestData.ip_address; // Set IP Address
          lastDataTime.value = new Date(latestData.createdAt).toLocaleString();
          // Update esp_pat when ipAddress changes
          esp_pat.value = `http://${ipAddress.value}`;
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }

  // Fetch data on mount and then every 2 seconds
  fetchData();
  setInterval(fetchData, 2000);
});

function onModeButtonClick() {
  const url = automated.value ? `${esp_pat.value}/setAutomatedMode` : `${esp_pat.value}/setManualMode`;
  fetch(url)
    .catch(err => console.error('Error setting mode:', err));

  if (automated.value) {
    pumpState.value = 'Off'; // Turn off pump when automated mode is turned on
  }
}

function togglePumpState() {
  const url = pumpState.value === 'Off' ? `${esp_pat.value}/turnOnPump` : `${esp_pat.value}/turnOffPump`;
  
  fetch(url)
    .catch(err => console.error('Error toggling pump state:', err));

  pumpState.value = pumpState.value === 'Off' ? 'On' : 'Off';
}



function checkForLogin() {
  return localStorage.getItem("token") !== null;
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@100;200;300;400;500;600;700;800;900&family=Jost:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@100..900&display=swap');

.site-wrapper {
  margin-top: 150px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .cards-wrapper {
    display: flex;
    max-width: 1000px;
    max-height: 634px;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    box-sizing: border-box;
    gap: 2rem;

    .col {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
      width: fit-content;
      gap: 2rem;
      .card {
        height: 100%;
      }
    }
  }
}

.card {
  font-family: 'Montserrat';
  box-sizing: border-box;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px solid rgba(41, 41, 41, 0.521);
  border-radius: 1rem;
  min-width: 465px;
  .main-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

#moistureValue {
  font-size: 4rem;
  font-weight: 700;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    display: none;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
</style>

