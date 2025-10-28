<!-- src/views/Home.vue -->
<template>
  <div id="home">
    <!-- section 1: Heading--> 
    <section class="hero">
      <div class="container">
        <h1>Welcome to Smart Toilet Dashboard</h1>
        <p>Monitor: status, tank, energy and temperature</p>
      </div>
    </section>

    <!-- section 2: Content with boxes-->
    <section class="content">
      <div class="container">
        <!--Row 1 3 boxes-->
        <div class="row row-1">
          <div class="card">
            <h2>Operating Status</h2>
            <p>Status : {{ latestValue === 1 ? "ON" : latestValue === 0 ? "OFF" : "OFF" }}</p>
            <p>Last Update: {{ latestLabel }}</p>
            <button @click="gotoOperatingStatus">View History</button>
          </div>

          <div class="card">
            <h2>Waste-tank Status</h2>
            <p>Status : {{ latestWaterTankValue === 1 ? "ON" : latestWaterTankValue === 0 ? "OFF" : "OFF" }}</p>
            <p>Last Update: {{ latestWaterTankLabel }}</p>
            <button @click="gotoWaterTankStatus">View History</button>
          </div>

          <div class="card">
            <h2>Energy Consumption</h2>
            <p>Real time: {{ latestEnergyConsumptionValue }} kWh</p>
            <p>Last Update: {{ latestEnergyConsumptionLabel }}</p>
            <button @click="gotoEnergyConsumption">View History</button>
          </div>
        </div>

        <!-- Row 2 : 2 Boxes-->
        <div class="row row-2">
          <div class="card">
            <h2>Toilet Usage</h2>
            <p>Status : {{ latestToiletUsageValue === 1 ? "ON" : latestToiletUsageValue === 0 ? "OFF" : "OFF" }}</p>
            <p>Last Update: {{ latestToiletUsageLabel }}</p>
            <button @click="gotoToiletUsageStatus">View History</button>
          </div>

          <div class="card">
            <h2>Torrefaction Temperature</h2>
            <p>T1: {{ latestTorrTemperatureValue1 }} °C </p>
            <p>T2: {{ latestTorrTemperatureValue2 }} °C </p>
            <button @click="gotoTorrTemperature">View History</button>
          </div>
        </div>
      </div>

    </section>

    <!-- Section 3: Footer-->
    <footer class="site-footer">
      <div class="container">
        © 2025 Cranfield. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

/* Router functions for buttons */
const router = useRouter();

function gotoOperatingStatus() {
  router.push('/operatingstatus');
}

function gotoWaterTankStatus() {
  router.push('/watertankstatus');
}

function gotoToiletUsageStatus() {
  router.push('/toiletusagestatus');
}

function gotoEnergyConsumption() {
  router.push('/energyconsumption');
}

function gotoTorrTemperature() {
  router.push('/torrtemperature');
}
/* Functions to fetch and display latest data*/

/*1. Operating Status */
const latestValue = ref(null);
const latestLabel = ref(null);
const loading = ref(false);
const error = ref(false);
/*
function formatLocal(iso) {
  if (!iso) return "-";
  const date = new Date(iso);
  return date.toLocaleString();
}*/

async function fetchLatestOperatingStatus() {
  loading.value = true;
  error.value = false;
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/operating_status_latest');
    latestLabel.value = response.data.label;
    latestValue.value = response.data.value;
  } catch(e) {
    console.error('Error fetching latest operating status:', e);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

/*2. Water-tank Level */
const latestWaterTankValue = ref(null);
const latestWaterTankLabel = ref(null);
const loadingWaterTank = ref(false);
const errorWaterTank = ref(false);

async function fetchLatestWaterTankStatus() {
  loading.value = true;
  error.value = false;
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/water_tank_level_latest');
    latestWaterTankLabel.value = response.data.label;
    latestWaterTankValue.value = response.data.value;
  } catch(e) {
    console.error('Error fetching latest water tank status:', e);
    errorWaterTank.value = true;
  } finally {
    loadingWaterTank.value = false;
  }
}

/*3. Energy Consumption */
const latestEnergyConsumptionValue = ref(null);
const latestEnergyConsumptionLabel = ref(null);
const loadingEnergyConsumption = ref(false);
const errorEnergyConsumption = ref(false);

async function fetchLatestEnergyConsumption() {
  loadingEnergyConsumption.value = true;
  errorEnergyConsumption.value = false;
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/energy_consumption_latest');
    latestEnergyConsumptionLabel.value = response.data.label;
    latestEnergyConsumptionValue.value = response.data.value;
  } catch(e) {
    console.error('Error fetching latest energy consumption status:', e);
    errorEnergyConsumption.value = true;
  } finally {
    loadingEnergyConsumption.value = false;
  }
}

/*4. Toilet Usage */
const latestToiletUsageValue = ref(null);
const latestToiletUsageLabel = ref(null);
const loadingToiletUsage = ref(false);
const errorToiletUsage = ref(false);

async function fetchLatestToiletUsageStatus() {
  loadingToiletUsage.value = true;
  errorToiletUsage.value = false;
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/toilet_usage_latest');
    latestToiletUsageLabel.value = response.data.label;
    latestToiletUsageValue.value = response.data.value;
  } catch(e) {
    console.error('Error fetching latest toilet usage status:', e);
    errorToiletUsage.value = true;
  } finally {
    loadingToiletUsage.value = false;
  }
}

/*5. Torrefaction Temperature */
const latestTorrTemperatureValue1 = ref(null);
const latestTorrTemperatureValue2 = ref(null);
const latestTorrTemperatureLabel = ref(null);
const loadingTorrTemperature = ref(false);
const errorTorrTemperature = ref(false);

async function fetchLatestTorrTemperatures() {
  loadingTorrTemperature.value = true;
  errorTorrTemperature.value = false;
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/torr_temperatures_latest');
    latestTorrTemperatureLabel.value = response.data.label;
    latestTorrTemperatureValue1.value = response.data.value1;
    latestTorrTemperatureValue2.value = response.data.value2;
  } catch(e) {
    console.error('Error fetching latest torr temperature status:', e);
    errorTorrTemperature.value = true;
  } finally {
    loadingTorrTemperature.value = false;
  }
}

/* Fetch data on component mount */
onMounted( () => {
  fetchLatestOperatingStatus();
  fetchLatestWaterTankStatus();
  fetchLatestToiletUsageStatus();
  fetchLatestEnergyConsumption();
  fetchLatestTorrTemperatures();
});

</script>

<style>
html, body { margin:0; padding: 0; box-sizing: border-box; }
</style>

<style scoped>
/* copy your existing CSS from the previous App.vue for the home layout */
:root {
  --deep-blue: #0b3d91;
  --grey-bg: #243957a5;
  --white: #ffffff;
  --black: #000000;
  --container-max: 3000px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* section 1 */
.hero {
  background: var(--deep-blue);
  color: white;
  padding: 30px 0;
  text-align: center;
}

/* section 2 */
.content {
  background-image: linear-gradient(to bottom right, #151818bc, #e3e8ea5c);
  padding: 40px 0;
}
.row {
  display:flex;
  gap:20px;
  flex-wrap:wrap;
  justify-content:center;
  margin-bottom:24px;
  /*border-style: solid;*/
  padding: 20px;
}
.card {
  background: var(--white);
  padding: 18px 18px;
  border-left: 5px solid var(--deep-blue);
  border-radius: 8px;
  text-align: center;
  width: 200px;
  height: 180px;
  /*box-shadow: 0 6px 18px rgba(12,24,40,0.06);
  flex: 0 1 300px;
  min-width:220px;
  max-width:340px;*/
}
.card h2 { margin:0 0 10px; font-size:18px; }
.card p { margin:6px 0; color:#333; }

/* footer */
.site-footer {
  background: var(--black);
  color: white;
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
}
</style>
