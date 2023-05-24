<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <q-footer class="bg-secondary text-white" elevated>
    <q-toolbar>
      <q-btn
        v-if="route.meta?.link"
        :href="route.meta.link"
        :label="route.meta.link"
        dense
        flat
        icon="link"
        no-caps
        no-wrap
        ripple
        target="_blank"
        type="a"
      />
    </q-toolbar>
  </q-footer>
</template>
