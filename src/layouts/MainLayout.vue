<script lang="ts" setup>
const [leftDrawerToggled, leftDrawerToggle] = useToggle();
const { qPageElement } = useQPageElement();
const { getQPageElementHeight } = useQPageElementGlobalSessionStorage();
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <MainLayoutHeader @action="leftDrawerToggle" />
    <MainLayoutDrawerLeft v-model="leftDrawerToggled" />
    <q-page-container>
      <q-page ref="qPageElement" padding>
        <q-scroll-area :style="`height: ${getQPageElementHeight()}px`">
          <router-view />
        </q-scroll-area>
      </q-page>
    </q-page-container>
    <MainLayoutFooter />
  </q-layout>
</template>
