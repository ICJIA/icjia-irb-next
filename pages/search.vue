<template>
  <div style="margin-top: 90px">
    <v-container
      ><v-col cols="12">
        <h1>Search IRB</h1>
        <v-form class="pl-2">
          <v-text-field
            ref="textfield"
            v-model="query"
            label="Search"
            placeholder="Search IRB"
            @input="instantSearch"
          />
          <div style="font-size: 12px" class="text-right mb-9">
            {{ queryResults.length }} result{{ resultNumber }}
          </div>

          <div v-if="query && query.length">
            <div
              v-for="(result, index) in queryResults"
              :key="index"
              class="my-8"
            >
              <v-card
                elevation="1"
                class="px-5 py-6 info-card"
                color="grey lighten-5"
                @click="route(result)"
              >
                <v-btn
                  v-if="result.file"
                  color="#0d4474"
                  fab
                  small
                  absolute
                  top
                  left
                  dark
                  @click="route(result)"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                </v-btn>

                <div
                  v-if="result.file"
                  class="text-right"
                  style="
                    font-weight: bold;
                    font-size: 12px;
                    margin-top: 5px;
                    color: #0d4474;
                    text-transform: uppercase;
                  "
                >
                  <div style="display: inline" v-html="result.type"></div>
                </div>

                <div v-if="result.title">
                  <h2 v-html="result.title"></h2>
                </div>
                <v-card-text
                  v-if="result.description && result.type === 'content'"
                  ><div v-html="result.description"></div
                ></v-card-text>

                <v-card-text
                  v-if="result.headings"
                  style="margin-top: -15px; margin-left: 15px"
                >
                  <h3 v-html="displayHeadings(result.headings)"></h3>
                </v-card-text>
              </v-card>
            </div>
            <!-- {{ queryResults }} -->
          </div>
        </v-form>
      </v-col></v-container
    >
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Fuse from 'fuse.js'
import _ from 'lodash'
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    const x = a[key]
    const y = b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}
const highlight = (fuseSearchResult, highlightClassName = 'highlight') => {
  const set = (obj, path, value) => {
    const pathValue = path.split('.')
    let i
    for (i = 0; i < pathValue.length - 1; i++) {
      obj = obj[pathValue[i]]
    }
    obj[pathValue[i]] = value
  }
  const generateHighlightedText = (inputText, regions = []) => {
    let content = ''
    let nextUnhighlightedRegionStartingIndex = 0
    regions.forEach((region) => {
      const lastRegionNextIndex = region[1] + 1
      content += [
        inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        `<span class="${highlightClassName}">`,
        inputText.substring(region[0], lastRegionNextIndex),
        '</span>',
      ].join('')
      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex
    })
    content += inputText.substring(nextUnhighlightedRegionStartingIndex)
    return content
  }
  return fuseSearchResult
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const highlightedItem = Object.assign({}, item)
      matches.forEach((match) => {
        set(
          highlightedItem,
          match.key,
          generateHighlightedText(match.value, match.indices)
        )
      })
      return highlightedItem
    })
}
export default {
  data() {
    return {
      query: '',
      queryResults: [],
      content: '',
      fuse: null,
      resultNumber: 's',
    }
  },
  created() {
    this.fuse = new Fuse(
      this.$store.state.searchIndex,
      this.$store.state.appConfig.search
    )
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.textfield.focus()
      this.query = ''
    })
  },
  methods: {
    route(item) {
      if (item.type === 'content') {
        this.$router.push(item.route)
      } else {
        console.log('file download: ', item.route)
        window.open(`/irb${item.route}`)
        // TODO: Add download event here for Google
      }
    },
    instantSearch() {
      this.queryResults = highlight(this.fuse.search(this.query))
      // console.log(this.queryResults)
    },
    displayHeadings(headings) {
      if (typeof headings === 'string') {
        return headings
      }
      return null
    },
  },
  head() {
    return {
      title: 'Search',
    }
  },
}
</script>

<style>
.highlight {
  background: #ffff00;
  font-weight: 900;
  padding: 0px;
}
</style>
