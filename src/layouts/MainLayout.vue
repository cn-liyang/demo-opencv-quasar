<script lang="ts" setup>
const [leftDrawerToggled, leftDrawerToggle] = useToggle();
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <MainLayoutHeader @action="leftDrawerToggle" />
    <MainLayoutDrawerLeft v-model="leftDrawerToggled" />
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
