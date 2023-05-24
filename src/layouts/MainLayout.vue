<script lang="ts" setup>
const [leftDrawerToggled, leftDrawerToggle] = useToggle();
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <MainLayoutHeader @action="leftDrawerToggle" />
    <MainLayoutDrawerLeft v-model="leftDrawerToggled" />
    <MainLayoutPageContainer>
      <router-view />
    </MainLayoutPageContainer>
    <MainLayoutFooter />
  </q-layout>
</template>
