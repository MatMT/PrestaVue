<script setup>
import { ref, computed, watch } from "vue";
import Header from "./components/Header.vue";
import Button from "./components/Button.vue";
import { calcularTotalpagar } from "./helpers";

const cantidad = ref(1000);
const meses = ref(6);
const total = ref(0);
const MIN = 0;
const MAX = 2000;
const STEP = 100;

const formatearDinero = (valor) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(valor);
};

watch([cantidad, meses], () => {
  total.value = calcularTotalpagar(cantidad.value, meses.value);
});

const pagoMensual = computed(() => {
  return total.value / meses.value;
});

const handleChangeDecremento = () => {
  if (cantidad.value <= MIN) {
    alert("Cantidad no válida");
    return;
  }

  cantidad.value -= STEP;
};

const handleChangeIncremento = () => {
  if (cantidad.value >= MAX) {
    alert("Cantidad no válida");
    return;
  }

  cantidad.value += STEP;
};
</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-slate-950 shadow p-10 rounded-md">
    <Header />

    <div class="flex justify-between mt-10">
      <Button :operador="'-'" @fn="handleChangeDecremento" />

      <Button :operador="'+'" @fn="handleChangeIncremento" />
    </div>

    <div class="my-5 text-white">
      <input
        type="range"
        name=""
        id=""
        class="w-full accent-blue-500 hover:accent-blue-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="cantidad"
      />

      <p class="text-center my-10 text-5xl font-extrabold text-emerald-500">
        {{ formatearDinero(cantidad) }}
      </p>

      <h2 class="text-2xl font-extrabold text-gray-200 text-center">
        Elige un <span class="text-emerald-500">Plazo </span> a pagar
      </h2>

      <select
        name=""
        id=""
        class="w-full p-2 bg-gray-200 border border-gray-100 rounded-lg text-black mt-6 text-xl text-center"
        value="meses"
        v-model.number="meses"
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>
    </div>

    <div v-if="total > 0" class="my-5 space-y-3 p-5 bg-slate-800">
      <h2 class="text-2xl font-extrabold text-gray-200 text-center">
        Resumen <span class="text-emerald-500">de pagos</span>
      </h2>

      <p class="text-xl text-center text-gray-200 font-bold">Meses</p>
      <p class="text-xl text-center text-gray-200 font-bold">
        Total a pagar: {{ formatearDinero(total) }}
      </p>
      <p class="text-xl text-center text-gray-200 font-bold">
        Mensualidad: {{ formatearDinero(pagoMensual) }}
      </p>
    </div>

    <p v-else class="text-center font-bold text-blue-400 text-xl">
      - Añade una cantidad y un plazo a pagar -
    </p>

    <p class="text-center font-bold text-white text-xl">EliDev 👨‍💻</p>
  </div>
</template>
