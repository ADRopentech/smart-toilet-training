<template>
<div id = "operatingstatus">
    <!-- Section 1 -->
    <section class="hero">
      <div class="container">
        <h1>Operating Status</h1>
        <p class="hero-desc">Time vs Operating Status — 1 means "ON", 0 means "OFF".</p>
      </div>
    </section>

    <!-- Section 2 -->
    <section class="content">
        <div class="container">
            <div class="card chart-card">
                <h3>Operating Status vs time</h3>

                <div class = "chart-area">
                    <canvas ref="statusChartRef" aria-label="Operating Status vs time"></canvas>
                </div>

                <div v-if="loading" class=" loader">Loading data.....</div>
                <div v-if="error" class="error">Error loading data. see console</div>
            </div>
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

const statusChartRef = ref(null);
let chartInstance = null;

const loading = ref(false);
const error = ref(false);

function buildChart(ctx){
    return new Chart(ctx,{
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Operating Status",
                    data: [],
                    borderColor: "#0b3d91",
                    backgroundColor: "rgba(11,61,145,0.12)",
                    fill: true,
                    tension: 0.05,
                    pointRadius: 2,
                    stepped: true
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
                    title: {display: true, text: "Operating Status"},
                    suggestedMin: -0.2,
                    suggestedMax: 1.2,
                    ticks: {
                        stepSize: 1,
                        callback: (v) => (v === 1 ? "ON" : v === 0 ? "OFF" : v)
                    }
                }
            },

            plugins: {
                legend: {display: false}
            }
        }
    })
}

function updateChart(labels, values) {
    if (!chartInstance) return;
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = values;
    chartInstance.update();
}

async function loadData() {
    loading.value = true;
    error.value = false;
    try {
        const resp = await axios.get("http://127.0.0.1:5000/api/operating_status");
        const payload = resp.data || {};
        const labels = payload.labels || [];
        const values = (payload.values || []).map(v => Number(v));

        updateChart(labels, values);
    } catch (e) {
        console.error("Failed to load operating status: ", e);
        error.value = true;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    const ctx = statusChartRef.value.getContext("2d");
    chartInstance = buildChart(ctx);

    loadData();
});

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
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
#operatingstatus {
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