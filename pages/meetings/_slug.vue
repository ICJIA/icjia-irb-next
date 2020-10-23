<template>
  <client-only>
    <v-container style="margin-top: 90px">
      <v-row>
        <v-col cols="12" md="9" class="markdown-body">
          <h1>{{ doc.title }}</h1>
          <nuxt-content :document="doc" />
        </v-col>
        <v-col cols="12" md="3">
          <toc :toc="doc.toc"></toc>
        </v-col>
      </v-row>
    </v-container>
  </client-only>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const doc = await $content(`meetings/${params.slug}`).fetch()
    return { doc }
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
