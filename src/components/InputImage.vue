<script lang="ts" setup>
defineProps<{
  src: string;
}>();
</script>

<template>
  <q-card>
    <q-img :id="$htmlImageElementId" :src="src" block />
  </q-card>
</template>
