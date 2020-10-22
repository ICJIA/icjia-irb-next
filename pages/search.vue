<template>
  <div style="margin-top: 90px">
    <v-container
      ><v-col cols="12">
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
              class="my-5"
            >
              <v-card
                elevation="1"
                class="px-5 py-4 info-card"
                color="grey lighten-5"
                @click="route(result.route)"
              >
                <div v-if="result.title">
                  <h2 v-html="result.title"></h2>
                </div>
                <v-card-text v-if="result.description"
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
    })
  },
  methods: {
    route(path) {
      console.log(path)
      this.$router.push(path)
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
}
</script>

<style>
.highlight {
  background: #ffff00;
  font-weight: 900;
  padding: 0px;
  text-transform: uppercase;
}
</style>
