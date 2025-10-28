import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './components/HomePage.vue';
import OperatingStatus from './components/OperatingStatus.vue';
import WaterTankStatus from './components/WaterTankStatus.vue';
import ToiletUsageStatus from './components/ToiletUsageStatus.vue';
import EnergyConsumption from './components/EnergyConsumption.vue';
import TorrTemperature from './components/TorrTemperature.vue';

const routes = [
    { path: '/', name: 'home', component: HomePage},
    { path: '/operatingstatus', name :'Operating Status', component: OperatingStatus},
    { path: '/watertankstatus', name :'Water Tank Status', component: WaterTankStatus},
    { path: '/toiletusagestatus', name :'Toilet Usage Status', component: ToiletUsageStatus},
    { path: '/energyconsumption', name :'Energy Consumption', component: EnergyConsumption},
    { path: '/torrtemperature', name :'Torr Temperature', component: TorrTemperature}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;