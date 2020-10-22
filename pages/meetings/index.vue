<template>
  <div style="margin-top: 90px">
    <client-only>
      <v-container v-if="!isLoading">
        <v-row>
          <v-col cols="12" class="markdown-body">
            <h1>Meetings</h1>
            <div v-if="meetings && meetings.length">
              <div v-for="(meeting, index) in meetings" :key="index">
                <MeetingCard :data="meeting"></MeetingCard>
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
export default {
  async fetch() {
    // console.log(now)
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
      meetings: () => [],
      isLoading: true,
    }
  },
}
</script>

<style>
a.v-btn {
  text-decoration: none !important;
}
</style>
