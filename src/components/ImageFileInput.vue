<script lang="ts" setup>
defineEmits<{
  (e: "action", file: File): void;
}>();

const { notifyNegative } = useQNotify();

function fileRejected(files: FileList) {
  notifyNegative(`${files[0].name} 验证失败，请检查！`);
}
</script>

<template>
  <q-file
    :max-file-size="1024 * 1024 * 8"
    accept=".png, .jpg, .jpeg"
    label=".png, .jpg, ≤ 8M"
    outlined
    rounded
    @rejected="fileRejected"
    @update:model-value="(v) => $emit('action', v)"
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>
