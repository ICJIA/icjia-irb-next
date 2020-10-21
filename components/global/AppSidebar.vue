<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    disable-resize-watcher
    color="grey lighten-4"
  >
    <!-- <v-list dense class="mt-5">
      <div v-for="item in sidebarItems" :key="item.title">
        <div v-if="item.attributes.dividerBefore" class="my-2">
          <v-divider />
        </div>
        <v-list-item link @click="routeToPage(item)">
          <v-list-item-content>
            <h3>
              {{ item.attributes.title }}
            </h3>
          </v-list-item-content>
        </v-list-item>
        <div v-if="item.attributes.dividerAfter" class="my-2">
          <v-divider />
        </div>
      </div>
    </v-list> -->
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from '@/event-bus'
// import _ from 'lodash'
export default {
  props: {
    // siteMeta: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data: () => ({
    drawer: false,
    nav: [],
    tableOfContents: [],
    sidebarItems: null,
  }),
  watch: {},
  // async created() {
  //   const items = this.siteMeta.filter((item) => {
  //     return item.attributes.showInSidebar === true
  //   })
  //   const sortedItems = _.orderBy(items, 'attributes.menuRank')
  //   this.sidebarItems = sortedItems
  // },
  mounted() {
    EventBus.$on('toggleDrawer', () => {
      console.log('open drawer')
      this.drawer = !this.drawer
    })
    EventBus.$on('closeDrawer', () => {
      console.log('close drawer')
      this.drawer = false
    })
  },
  methods: {
    routeToPage(item) {
      // console.log(item);
      this.drawer = false
      this.$router.push(item.path).catch(() => {
        this.$vuetify.goTo(0)
      })
    },
  },
}
</script>
<style>
/* #keep .v-navigation-drawer__border {
  display: none;
} */
</style>
