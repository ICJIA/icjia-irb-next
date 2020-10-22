<template>
  <div style="margin-top: 90px">
    <client-only>
      <v-container v-if="!isLoading">
        <v-row>
          <v-col cols="12" class="markdown-body">
            <h1>Meetings</h1>
            <div v-for="(meeting, index) in meetings" :key="index">
              <MeetingCard :meeting="meeting"></MeetingCard>
            </div>
          </v-col>
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
      .only(['title', 'description', 'scheduled', 'slug', 'markdown', 'path'])
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
