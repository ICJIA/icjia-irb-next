<template>
  <div style="margin-top: 90px">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center mb-5">Search IRB</h1>
          <v-text-field
            v-model="q"
            autocomplete="new"
            label="Search IRB site"
            @input="$fetch"
          />
          <div v-if="q && q.length && response.length">
            <pre>{{ response }}</pre>
          </div>
          <div v-if="!q.length && !response.length" class="text-center">
            <h2 style="font-size: 14px; color: #aaa">Enter search term</h2>
          </div>
          <div v-if="!response.length && q.length" class="text-center">
            <h2 style="font-size: 14px">No results</h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable vue/html-self-closing */
export default {
  async fetch() {
    if (this.q.length) {
      this.response = await this.$content('', { deep: true })
        .only(['title', 'description'])
        .limit(15)
        .search(this.q)
        .fetch()
    }
  },
  data() {
    return {
      response: [],
      q: '',
    }
  },
}
</script>
