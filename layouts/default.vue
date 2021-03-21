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
    <script type="text/javascript">
      /*<![CDATA[*/

      ;(function () {
        var sz = document.createElement('script')
        sz.type = 'text/javascript'
        sz.async = true

        sz.src = '//siteimproveanalytics.com/js/siteanalyze_6123065.js'

        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(sz, s)
      })()

      /*]]>*/
    </script>
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
