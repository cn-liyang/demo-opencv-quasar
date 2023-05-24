<script lang="ts" setup>
defineEmits<{
  (e: "action"): void;
}>();
</script>

<template>
  <q-header class="bg-primary text-white" elevated>
    <q-toolbar>
      <q-btn aria-label="Menu" dense flat icon="menu" round @click.prevent="$emit('action')" />
      <q-toolbar-title>Demo OpenCV.js in Quasar</q-toolbar-title>
      <span>Quasar v{{ $q.version }}</span>
    </q-toolbar>
  </q-header>
</template>
