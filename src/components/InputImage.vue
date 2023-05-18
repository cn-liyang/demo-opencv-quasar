<script lang="ts" setup>
defineProps<{
  id: string;
  src: string;
}>();
</script>

<template>
  <CardLayout>
    <img :id="id" :src="src" alt="Input Image" />
  </CardLayout>
</template>
