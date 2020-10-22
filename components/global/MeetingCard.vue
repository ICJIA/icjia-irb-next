<template>
  <div>
    <v-card
      v-if="meeting"
      elevation="1"
      color="grey lighten-5"
      class="mt-6 px-5 py-3 meetingCard"
    >
      <div
        v-if="meeting && meeting.scheduled"
        class="meetingDate text-right"
        @click.prevent="meeting.show = !meeting.show"
      >
        {{ formatDate(meeting.scheduled) }}
      </div>
      <div
        v-if="meeting && meeting.title"
        class="meetingTitle"
        @click.prevent="meeting.show = !meeting.show"
      >
        {{ meeting.title }}
      </div>

      <div
        v-if="meeting && meeting.description"
        class="meetingDescription mt-3"
        @click.prevent="meeting.show = !meeting.show"
      >
        {{ meeting.description }}
      </div>

      <v-slide-y-transition>
        <div
          v-show="meeting.show"
          v-if="meeting && meeting.show"
          class="py-3 mt-2"
        >
          <div
            class="mt-2 pl-5 markdown-body meetingCard"
            @click.prevent="meeting.show = !meeting.show"
            v-html="render(meeting.markdown)"
          ></div>
          {{ meeting.path }}
          <div class="text-right mt-3">
            <v-btn x-small @click.prevent="$router.push(meeting.path)"
              >Link <v-icon right>link</v-icon></v-btn
            >
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
