<script lang="ts" setup>
defineProps<{
  id: string;
}>();
</script>

<template>
  <CardLayout>
    <canvas :id="id" />
  </CardLayout>
</template>
