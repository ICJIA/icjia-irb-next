<template>
  <div>
    <v-card
      elevation="1"
      color="grey lighten-5"
      class="mt-6 px-5 pt-3 pb-8 meetingCard"
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
        class="text-right mt-4"
        @click.stop.prevent="meeting.show = !meeting.show"
      >
        <v-icon medium>mdi-chevron-down</v-icon>
      </div>

      <v-slide-y-transition>
        <div v-show="meeting.show" v-if="meeting.show" class="py-3 mt-2">
          <div
            class="mt-2 pl-5 markdown-body meetingCard"
            v-html="render(meeting.markdown)"
          ></div>

          <div class="text-right mt-6">
            <v-btn
              x-small
              color="#0D4474"
              dark
              @click.prevent="$router.push(`${meeting.path}/`)"
              >Link <v-icon right>link</v-icon></v-btn
            >&nbsp;&nbsp;&nbsp;
            <v-icon medium>mdi-chevron-up</v-icon>
          </div>
        </div>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { renderToHtml } from '@/services/markdown'
export default {
  props: {
    meeting: {
      type: Object,
      default: () => {},
    },
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

<style>
.meetingCard {
  cursor: pointer;
}

.meetingDate {
  font-weight: bold;
  font-size: 12px;
  color: #555;
}
.meetingTitle {
  font-weight: bold;
  font-size: 22px;
  color: #555;
}
</style>
