<script lang="ts" setup>
defineProps<{
  src: string;
}>();
</script>

<template>
  <CardLayout>
    <img :id="$htmlImageElementId" :src="src" alt="Input Image" />
  </CardLayout>
</template>
