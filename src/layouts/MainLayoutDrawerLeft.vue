<script lang="ts" setup></script>

<template>
  <q-drawer behavior="desktop" elevated overlay>
    <q-list>
      <q-item v-for="i in $mainChildren" :key="i.path" v-ripple :to="i.path" clickable exact>
        <q-item-section v-if="i.meta?.icon" avatar>
          <q-icon :name="i.meta.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ i.meta.title }}</q-item-label>
          <q-item-label caption>{{ i.meta.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
