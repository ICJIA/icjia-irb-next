<template>
  <div class="text-center my-12" :style="{ 'min-height': `${height}px` }">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="size"
    ></v-progress-circular>
    <div class="mt-12" style="font-size: 12px; font-weight: bold">
      LOADING ...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '100',
    },
    height: {
      type: String,
      default: '500',
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped></style>
