<template>
  <div style="margin-top: 90px">
    <client-only>
      <v-container v-if="!isLoading">
        <v-row>
          <v-col
            cols="12"
            sm="12"
            :md="dynamicFlex()"
            order-md="1"
            order="2"
            order-sm="2"
            class="markdown-body"
          >
            <h1>{{ doc.title }}</h1>
            <nuxt-content :document="doc" />
          </v-col>
          <v-col
            v-if="doc.showToc"
            cols="12"
            sm="12"
            md="3"
            order-md="2"
            order="1"
            order-sm="1"
          >
            <toc :toc="doc.toc"></toc>
          </v-col>
          <v-col
            cols="12"
            :md="dynamicFlex()"
            order-md="3"
            order="3"
            order-sm="3"
          >
            <div v-if="meetings && meetings.length">
              <div
                v-for="(meeting, index) in meetings"
                :key="index"
                style="margin-top: -20px"
                class="mb-10 test"
              >
                <MeetingCard :meeting="meeting"></MeetingCard>
              </div>
            </div>
            <div v-else>
              <div
                style="font-weight: bold; font-size: 20px; color: #555"
                class="text-center mt-10"
              >
                No upcoming meetings scheduled.
              </div>
            </div>
            <div class="text-center">
              <v-btn x-small to="/meeting-archive/" outlined class="mt-0"
                >Meeting archive<v-icon x-small right
                  >chevron_right</v-icon
                ></v-btn
              >
            </div>
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
    const now = new Date().toJSON().split('T')[0]
    this.doc = await this.$content('index').fetch()
    this.meetings = await this.$content('meetings')
      .only(['title', 'description', 'scheduled', 'slug', 'markdown', 'path'])
      .where({ scheduled: { $gt: now } })
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
  methods: {
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return '12'
      } else {
        return this.doc.showToc ? '9' : '12'
      }
    },
  },

  head() {
    return {
      title: 'Home',
    }
  },
}
</script>

<style></style>
