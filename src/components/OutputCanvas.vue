<script lang="ts" setup>
defineProps<{
  id: string;
}>();
</script>

<template>
  <CardLayout style="max-width: 512px; max-height: 512px">
    <canvas :id="id" style="width: 100%; height: 100%; object-fit: scale-down" />
  </CardLayout>
</template>
