<template>
  <div class="site-wrapper">
    <div class="cards-wrapper">
      <div class="col">
        <div class="card">
          <h2>Pump Settings</h2>
          <div>
            <label for="low-threshold">Pump On Threshold (Low):</label>
            <input type="number" v-model="settings.PUMP_ON_THRESHOLD_LOW" id="low-threshold" />
          </div>
          <div>
            <label for="high-threshold">Pump Off Threshold (High):</label>
            <input type="number" v-model="settings.PUMP_OFF_THRESHOLD_HIGH" id="high-threshold" />
          </div>
        </div>
        <div class="card">
          <h2>Light Settings</h2>
          <div>
            <label for="light-threshold">Max Light Threshold:</label>
            <input type="number" v-model="settings.MAX_LIGHT_THRESHOLD" id="light-threshold" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
      <button class="water-pump-toggle-button" @click="saveSettings">Save Settings</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const settings = ref({
  PUMP_ON_THRESHOLD_LOW: null,
  PUMP_OFF_THRESHOLD_HIGH: null,
  MAX_LIGHT_THRESHOLD: null,
});

const error = ref<string | null>(null);
const success = ref<string | null>(null);

onMounted(() => {
  fetch('http://localhost:3000/getSettings')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch settings');
      return response.json();
    })
    .then((data) => {
      settings.value = data;
      success.value = "Settings loaded successfully!";
    })
    .catch((err) => {
      error.value = `Error fetching settings: ${err.message}`;
    });
});

function saveSettings() {
  error.value = null;
  success.value = null;

  // Проверете дали стойностите са зададени правилно
  if (
    settings.value.PUMP_ON_THRESHOLD_LOW === null ||
    settings.value.PUMP_OFF_THRESHOLD_HIGH === null ||
    settings.value.MAX_LIGHT_THRESHOLD === null
  ) {
    error.value = "All settings fields must be filled out.";
    return;
  }

  fetch('http://localhost:3000/saveSettings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings.value), // Конвертирайте настройките в JSON формат
  })
    .then((response) => {
      if (!response.ok) {
        // Проверете дали сървърът връща грешка
        return response.text().then((text) => {
          throw new Error(`Server responded with error: ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      success.value = data.message || "Settings saved successfully!";
    })
    .catch((err) => {
      error.value = `Error saving settings: ${err.message}`;
    });
}

</script>

<style lang="scss" scoped>
/* Запазва стила от statistics.vue */
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@100;200;300;400;500;600;700;800;900&family=Jost:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@100..900&display=swap');

.site-wrapper {
  margin-top: 150px;
  width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
      width: fit-content;
      gap: 2rem;
    }
  }

  .footer {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .error {
      color: red;
      margin-bottom: 1rem;
      font-weight: bold;
    }

    .success {
      color: green;
      margin-bottom: 1rem;
      font-weight: bold;
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

.water-pump-toggle-button {
  box-sizing: border-box;
  padding: 1rem 2rem;
  border-radius: 50px;

  outline: none;
  border: none;
  cursor: pointer;
  transition: .05s linear;

  &:hover {
    border: 2px grey solid;
  }
}
</style>
