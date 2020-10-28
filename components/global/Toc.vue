<template>
  <div
    class="toc"
    :class="{
      'pl-2': $vuetify.breakpoint.xs || $vuetify.breakpoint.xs,
      'pl-10':
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl,
      shaded: $vuetify.breakpoint.xs || $vuetify.breakpoint.xs,
    }"
  >
    <div>
      <div
        ref="anchor"
        style="margin-left: -3px; font-weight: bold; font-size: 14px"
        class="mb-2 hover anchor visible"
        @click="$vuetify.goTo(0)"
      >
        {{ `${heading.toUpperCase()}` }}
      </div>
    </div>

    <div class="divider pl-5">
      <div v-for="(item, index) in toc" :key="index">
        <div
          v-if="item.depth === 2"
          :id="`toc-${item.id}`"
          class="my-3 px-2 tocItem hover"
          style="font-size: 13px; font-weight: 700; color: #555"
          @click="scrollTo(`${item.id}`)"
        >
          {{ `${item.text}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      default: () => [],
    },
    heading: {
      type: String,
      default: 'NAVIGATION',
    },
  },
  computed: {
    tocMap() {
      return this.toc
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let els = null
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop
      if (
        this.$vuetify.breakpoint.md ||
        this.$vuetify.breakpoint.lg ||
        this.$vuetify.breakpoint.xl
      ) {
        els = document.querySelectorAll('h2, h3')
      } else {
        els = document.querySelectorAll('h2')
      }
      const tocLinks = document.querySelectorAll('.tocItem')
      const tocHeadings = document.querySelectorAll('h2')
      // console.log(tocLinks)
      if (scrollPosition < 100) {
        tocLinks.forEach((link) => {
          link.classList.remove('visible')
        })
        this.$refs.anchor.classList.add('visible')
        this.currentHeading = ''
      } else {
        this.$refs.anchor.classList.remove('visible')
      }
      els.forEach((el) => {
        const elTop = el.getBoundingClientRect().top
        // eslint-disable-next-line no-unused-vars
        const elBottom = el.getBoundingClientRect().bottom
        // console.log(el);
        if (elTop < 120) {
          // console.log('elTop: ', elTop)
          // const tocID = el.id.replace(this.appConfig.namespace, 'toc-')
          const tocID = 'toc-' + el.id
          // console.log(tocID)
          const tocEl = document.getElementById(`${tocID}`)
          // console.log(tocEl)
          if (tocEl) {
            // console.log(tocEl)
            tocLinks.forEach((link) => {
              link.classList.remove('visible')
            })
            tocEl.classList.add('visible')
          }
        }
      })
      tocHeadings.forEach((el) => {
        const elTop = el.getBoundingClientRect().top
        // eslint-disable-next-line no-unused-vars
        const elBottom = el.getBoundingClientRect().bottom
        // console.log(el);
        if (elTop < 120) {
          const heading = el.id
          this.currentHeading = heading
        }
      })
    },
    scrollTo(id) {
      this.$vuetify.goTo(`#${id}`, { offset: 12 })
    },
  },
}
</script>

<style>
.divider {
  border-left: 1px solid #ccc;
}
.toc {
  position: -webkit-sticky !important; /* Safari */
  position: sticky !important;
  top: 125px !important;
  font-size: 13px;
}
.visible {
  color: #116bb9 !important;
  font-weight: bold;
}
.anchor {
  padding: 2px 5px 2px 5px;
}
.anchor:hover {
  color: #116bb9;
  background: #eee;
}
.hidden {
  display: none;
}
@media only screen and (max-width: 960px) {
  .divider {
    border-left: 0px solid #ccc !important;
    background: #eee;
    padding: 15px;
  }
  .tocItem:hover {
    background: #ccc !important;
  }
}
</style>
