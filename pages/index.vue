<template>
  <div style="margin-top: 90px">
    <client-only>
      <v-container v-if="doc">
        <v-row>
          <v-col cols="12" md="9" class="markdown-body">
            <h1>{{ doc.title }}</h1>
            <nuxt-content :document="doc" />
          </v-col>
          <v-col cols="12" md="3">
            <toc :toc="doc.toc" :heading="doc.title"></toc>
          </v-col>
          <div></div>
        </v-row>
      </v-container>
      <v-container v-else>
        <Loader></Loader>
      </v-container>
    </client-only>
  </div>
</template>

<script>
// import { EventBus } from '@/event-bus'
export default {
  data() {
    return {
      isLoading: true,
      doc: null,
    }
  },

  async created() {
    this.doc = await this.$content('index').fetch()
    this.isLoading = false
  },

  head() {
    return {
      titleTemplate: `%s`,
      title: 'Home',
    }
  },
}
</script>
