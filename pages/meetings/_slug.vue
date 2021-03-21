<template>
  <client-only>
    <v-container v-if="doc" style="margin-top: 90px" role="main">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          :md="dynamicFlex()"
          order-md="1"
          order="2"
          order-sm="2"
          class="markdown-body dynamic-content"
          @click="handleClicks"
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
      </v-row>
    </v-container>
    <v-container v-else>
      <Loader></Loader>
    </v-container>
  </client-only>
</template>

<script>
import { handleClicks } from '@/mixins/handleClicks'
import { fixNuxtContentHeadings } from '@/a11y'
export default {
  mixins: [handleClicks],
  async asyncData({ $content, params }) {
    const doc = await $content(`meetings/${params.slug}`).fetch()
    return { doc }
  },
  data() {},
  async mounted() {
    await this.$nextTick()
    fixNuxtContentHeadings('h2, h3')
  },
  methods: {
    getMeta() {
      const metaObj = {}
      if (!this.isLoading) {
        metaObj.title = this.doc.title
        metaObj.description =
          this.doc.description || "ICJIA's Institutional Review Board"
      }
      return metaObj
    },
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
      title: this.doc.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.doc.description || "ICJIA's Institutional Review Board",
        },
      ],
    }
  },
}
</script>
