<template>
  <div>
    <SkipLinks></SkipLinks>
    <v-app>
      <div style="min-height: 100vh !important">
        <AppNav></AppNav>
        <AppSidebar></AppSidebar>
        <nuxt id="main" class="" />
      </div>
      <AppFooter></AppFooter>
    </v-app>
  </div>
</template>
<script>
export default {
  created() {},
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://icjia.illinois.gov/irb' + this.$route.path,
        },
      ],
    }
  },
}
</script>

<style>
.hover {
  cursor: pointer;
}
</style>
