<template>
<div id = "torrtemperature">
    <!-- Section 1 -->
    <section class="hero">
      <div class="container">
        <h1>Torr Temperature</h1>
        <p class="hero-desc">Time vs Torr Temperature (°C)</p>
      </div>
    </section>

    <!-- Section 2 -->
    <section class="content">
        <div class="container">
            <div class="card chart-card">
                <h3>Torr Temperature 1 vs Time</h3>

                <div class = "chart-area">
                    <canvas ref="statusChartRef1" aria-label="Torr Temperature 1 vs time"></canvas>
                </div>
            </div>

            <div class="card chart-card" style="max-width: 1000px;">
                <h3>Torr Temperature 2 vs Time</h3>
                <div class = "chart-area">
                    <canvas ref="statusChartRef2" aria-label="Torr Temperature 2 vs time"></canvas>
                </div>
            </div>

            <div v-if="loading1 || loading2" class="loader">Loading data.....</div>
            <div v-if="error1 || error2" class="error">Error loading data. see console</div>
            
            <div class="BTD">
              <router-link to="/">Back to Dashboard</router-link>
            </div>
        </div>
    </section>

    <!--section 3-->
    <footer class="site-footer">
      <div class="container">© 2025 Cranfield. All rights reserved.</div>
    </footer>
    
</div>    
</template>


<script setup>
import {ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const statusChartRef1 = ref(null);
const statusChartRef2 = ref(null);
let chartInstance1 = null;
let chartInstance2 = null;

const loading1 = ref(false);
const loading2 = ref(false);
const error1 = ref(false);
const error2 = ref(false);

function buildChart(ctx, label){
    return new Chart(ctx,{
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: label,
                    data: [],
                    borderColor: "#0b3d91",
                    backgroundColor: "rgba(11,61,145,0.12)",
                    fill: true,
                    tension: 0.2,
                    pointRadius: 2,
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x:{
                    display: true,
                    title: {display: true, text: "Time"},
                    ticks:{
                        maxRotation: 45,
                        minRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                },
                
                y: {
                    display: true,
                    title: {display: true, text: "Temperature (°C)"},
                    beginAtZero: false,
                    ticks: {
                        stepSize: 1,
                        callback: (v) => `${v.toFixed(1)} °C`
                    }
                }
            },

            plugins: {
                legend: {display: false}
            }
        }
    });
}

function updateChart(chart, labels, values) {
    if (!chart) return;
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.update();
}

async function loadData() {
    loading1.value = loading2.value = true;
    error1.value = error2.value = false;
    try {
        const resp = await axios.get("http://127.0.0.1:5000/api/torr_temperatures");
        const payload = resp.data || {};
        const labels = payload.labels || [];
        const values1 = (payload.values1 || []).map(v => Number(v));
        const values2 = (payload.values2 || []).map(v => Number(v));

        updateChart(chartInstance1, labels, values1);
        updateChart(chartInstance2, labels, values2);
    } catch (e) {
        console.error("Failed to load torr temperatures: ", e);
        error1.value = error2.value = true;
    } finally {
        loading1.value = loading2.value = false;
    }
}

onMounted(() => {
    const ctx1 = statusChartRef1.value.getContext("2d");
    const ctx2 = statusChartRef2.value.getContext("2d");

    chartInstance1 = buildChart(ctx1, "Torr Temperature 1 (°C)");
    chartInstance2 = buildChart(ctx2, "Torr Temperature 2 (°C)");

    loadData();
});

onBeforeUnmount(() => {
    if (chartInstance1) {
        chartInstance1.destroy();
        chartInstance1 = null;
    }
    if (chartInstance2) {
        chartInstance2.destroy();
        chartInstance2 = null;
    }
})
</script>


<style>
:root {
  --deep-blue: #0b3d91;
  --white: #ffffff;
  --black: #000000;
  --container-max: 1000px;
}
#torrtemperature {
  font-family: Arial, Helvetica, sans-serif;
  color: #111;
}

/* center container */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 18px;
}

/* Section 1 */
.hero {
  background: var(--deep-blue);
  color: var(--white);
  padding: 36px 0;
}
.hero h1 {
  margin: 0 0 8px;
  font-size: 28px;
}
.hero-desc {
  margin: 0;
  opacity: 0.9;
}

/* Section 2*/
.content {
  background-image: linear-gradient(to bottom right, #151818bc, #e3e8ea5c);;
  padding: 28px 0;
}
.chart-card {
  background: var(--white);
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  min-height: 320px;
  display: flex;
  flex-direction: column;
}
.chart-area {
  position: relative;
  flex: 1 1 auto;
  min-height: 240px;
  margin-top: 12px;
}
 
.chart-area canvas { width: 100% !important; height: 100% !important; }


.loader { margin-top: 12px; color: #666; }
.error { margin-top: 12px; color: crimson; }

.BTD {
  text-align: center;
  padding: 20px
}


.site-footer {
  background: var(--black);
  color: var(--white);
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
}
</style>