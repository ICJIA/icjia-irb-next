<template>
  <div>
    <v-card
      outlined
      elevation="1"
      class="mt-6 px-5 pt-3 pb-8"
      @click.native="meeting.show = !meeting.show"
    >
      <div v-if="meeting.scheduled" class="meetingDate text-right">
        {{ formatDate(meeting.scheduled) }}
      </div>
      <div v-if="meeting.title" class="meetingTitle">
        {{ meeting.title }}
      </div>

      <div
        v-if="meeting.description && !meeting.show"
        class="meetingDescription mt-3"
      >
        {{ meeting.description }}
      </div>
      <div
        v-if="!meeting.show"
        class="text-right mt-8"
        @click.stop.prevent="meeting.show = !meeting.show"
      >
        <v-btn x-small outlined color="#000" class="mt-10">
          Read more
          <!-- <v-icon x-small>mdi-chevron-down</v-icon> -->

          <span
            class="mdi mdi-chevron-down"
            aria-label="Show full meeting information"
            aria-hidden="true"
            style="color: black"
          ></span>
        </v-btn>
      </div>

      <v-slide-y-transition>
        <div v-show="meeting.show" v-if="meeting.show" class="py-3 mt-2">
          <div
            class="mt-2 pl-5 markdown-body meetingCard"
            v-html="render(meeting.markdown)"
          ></div>

          <v-container class="mt-5">
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn
                  x-small
                  color="#0D4474"
                  dark
                  @click.prevent="$router.push(`${meeting.path}/`)"
                  >Link
                  <!-- <v-icon right>link</v-icon> -->
                  <span
                    class="mdi mdi-link"
                    aria-label="Go to the direct link for the meeting information"
                    aria-hidden="true"
                  ></span>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { renderToHtml } from '@/services/markdown'
// eslint-disable-next-line no-unused-vars
import { fixButtonText } from '@/a11y'

export default {
  props: {
    meeting: {
      type: Object,
      default: () => {},
    },
  },
  async mounted() {
    await this.$nextTick()
    console.log('mounted')
  },
  methods: {
    formatDate(scheduled) {
      return format(new Date(`${scheduled}T00:00`), 'LLLL dd, yyyy')
    },
    render(md) {
      return renderToHtml(md)
    },
  },
}
</script>

<style></style>
