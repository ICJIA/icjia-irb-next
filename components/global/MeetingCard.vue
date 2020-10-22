<template>
  <div>
    <v-card
      elevation="1"
      color="grey lighten-5"
      class="mt-6 px-5 py-3 meetingCard"
    >
      <div
        class="meetingDate text-right"
        @click.prevent="data.show = !data.show"
      >
        {{ formatDate(data.scheduled) }}
      </div>
      <div class="meetingTitle" @click.prevent="data.show = !data.show">
        {{ data.title }}
      </div>

      <div
        v-if="!data.show"
        class="meetingDescription mt-3"
        @click.prevent="data.show = !data.show"
      >
        {{ data.description }}
      </div>

      <v-slide-y-transition>
        <div v-show="data.show" class="py-3 mt-2">
          <div
            class="mt-2 pl-5 markdown-body meetingCard"
            @click.prevent="data.show = !data.show"
            v-html="render(data.markdown)"
          ></div>
          <div class="text-right mt-3">
            <v-btn x-small @click.prevent="$router.push(data.path)"
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
    data: {
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
