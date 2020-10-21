<template>
  <v-app>
    <div style="min-height: 100vh !important">
      <AppNav></AppNav>
      <AppSidebar></AppSidebar>
      <nuxt class="" />
    </div>
    <AppFooter></AppFooter>
  </v-app>
</template>
<script>
export default {
  created() {},
}
</script>

<style>
.hover {
  cursor: pointer;
}
</style>
