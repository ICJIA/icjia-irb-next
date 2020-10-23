<template>
  <div style="margin-top: 90px">
    <client-only>
      <v-container v-if="doc">
        <v-row>
          <v-col cols="12" md="9" class="markdown-body">
            <h1>{{ doc.title }}</h1>
            <nuxt-content :document="doc" />
          </v-col>
          <v-col cols="12" md="3">
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
