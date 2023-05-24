<script lang="ts" setup>
const { qPageElement } = useQPageElement();
const { getQPageElementHeight } = useQPageElementGlobalSessionStorage();
</script>

<template>
  <q-page-container>
    <q-page ref="qPageElement" padding>
      <q-scroll-area :style="`height: ${getQPageElementHeight()}px`">
        <slot />
      </q-scroll-area>
    </q-page>
    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn color="primary" fab icon="vertical_align_top" />
    </q-page-sticky>
  </q-page-container>
</template>
