<template>
  <div style="margin-top: 90px">
    <client-only>
      <v-container v-if="doc">
        <v-row>
          <v-col
            cols="12"
            sm="12"
            :md="dynamicFlex()"
            order-md="1"
            order="2"
            order-sm="2"
            class="markdown-body"
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
    this.doc = await this.$content(this.$route.params.slug).fetch()
    this.isLoading = false
  },

  data() {
    return {
      isLoading: true,
      doc: null,
    }
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
      title: this.getMeta().title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.getMeta().description,
        },
      ],
    }
  },
}
</script>
