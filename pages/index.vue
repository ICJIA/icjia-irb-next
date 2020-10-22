<template>
  <div style="margin-top: 90px">
    <client-only>
      <v-container v-if="!isLoading">
        <v-row>
          <v-col cols="12" md="9" class="markdown-body">
            <h1>{{ doc.title }}</h1>
            <nuxt-content :document="doc" />
          </v-col>
          <v-col cols="12" md="3">
            <toc :toc="doc.toc"></toc>
          </v-col>
          <v-col cols="12" md="9">
            {{ meetings }}
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
  async fetch() {
    this.doc = await this.$content('index').fetch()
    this.meetings = await this.$content('meetings')
      .only(['title', 'description', 'scheduled', 'slug', 'markdown'])
      .sortBy('scheduled', 'desc')
      .fetch()
    this.meetings = this.meetings.map((meeting) => ({
      ...meeting,
      show: false,
    }))
    this.isLoading = false
  },
  data() {
    return {
      isLoading: true,
      doc: null,
      meetings: null,
    }
  },
  created() {},
  mounted() {},

  head() {
    return {
      titleTemplate: `%s`,
      title: 'Home',
    }
  },
}
</script>
