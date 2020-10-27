<template>
  <div class="text-center my-12" :style="{ 'min-height': `${height}px` }">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="size"
      :width="width"
    ></v-progress-circular>
    <div
      v-if="!hideText"
      class="mt-12"
      style="font-size: 12px; font-weight: bold"
    >
      LOADING ...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100,
    },
    height: {
      type: String,
      default: '500',
    },
    hideText: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 4,
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped></style>
