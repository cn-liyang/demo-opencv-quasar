<script lang="ts" setup>
defineEmits<{
  (e: "action"): void;
}>();
const route = useRoute();
</script>

<template>
  <q-btn :label="route.meta.title" color="primary" no-caps outline rounded @click.prevent="$emit('action')" />
</template>
