<template>
  <q-layout view="hHh Lpr lff">
    <MainHeader />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MainHeader from "src/components/MainHeader.vue";
</script>
