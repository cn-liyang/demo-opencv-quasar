<script lang="ts" setup>
defineProps<{
  src: string;
}>();
</script>

<template>
  <q-card>
    <img :id="$htmlImageElementId" :src="src" alt="No Image" />
  </q-card>
</template>
