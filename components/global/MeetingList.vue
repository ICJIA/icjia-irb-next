<template>
  <div>
    <client-only>
      <v-container v-if="!isLoading" fluid>
        <v-row>
          <v-col cols="12" class="markdown-body">
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
  data() {
    return {
      meetings: () => [],
      isLoading: true,
    }
  },
  async created() {
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
}
</script>

<style>
a.v-btn {
  text-decoration: none !important;
}
</style>
