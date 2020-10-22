<template>
  <div>
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
    <div class="text-center">
      <v-btn x-small to="/meetings" outlined class="mt-10"
        >Archive <v-icon x-small right>chevron_right</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const now = new Date().toJSON().split('T')[0]
    // console.log(now)
    this.meetings = await this.$content('meetings')
      .only(['title', 'description', 'scheduled', 'slug', 'markdown'])
      .where({ scheduled: { $gt: now } })
      .sortBy('scheduled', 'asc')
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
