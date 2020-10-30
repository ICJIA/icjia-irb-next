<template>
  <div>
    <v-card
      elevation="0"
      color="grey lighten-4"
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
        class="text-center mt-8"
        @click.stop.prevent="meeting.show = !meeting.show"
      >
        <!-- <v-icon medium>mdi-chevron-down</v-icon> -->
        <v-btn x-small outlined color="#666" class="mt-10">
          <v-icon medium>mdi-chevron-down</v-icon>
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
              <v-col cols="12" xs="6" sm="6" class="text-center">
                <v-btn
                  x-small
                  color="#0D4474"
                  dark
                  @click.prevent="$router.push(`${meeting.path}/`)"
                  >Link <v-icon right>link</v-icon></v-btn
                >
              </v-col>
              <v-col cols="12" xs="6" sm="6" class="text-center">
                <v-btn x-small outlined>
                  <v-icon medium>mdi-chevron-up</v-icon>
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
