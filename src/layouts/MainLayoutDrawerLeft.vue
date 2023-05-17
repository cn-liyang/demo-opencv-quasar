<template>
  <q-drawer behavior="desktop" elevated overlay>
    <q-list>
      <q-item v-for="i in $mainChildren" :key="i.path" :href="i.meta.link" clickable tag="a" target="_blank">
        <q-item-section avatar>
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
