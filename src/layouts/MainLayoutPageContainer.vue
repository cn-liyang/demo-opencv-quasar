<script lang="ts" setup>
const { qPageElement } = useQPageElement();
</script>

<template>
  <q-page-container>
    <q-page ref="qPageElement" padding>
      <slot />
      <q-page-scroller :offset="[18, 18]" :scroll-offset="200" position="bottom-right">
        <q-btn color="accent" fab glossy icon="vertical_align_top" />
      </q-page-scroller>
    </q-page>
  </q-page-container>
</template>
