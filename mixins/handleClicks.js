// import { EventBus } from "@/event-bus";

export const handleClicks = {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleClicks($event) {
      // intercepts <a></a> tag clicks and routes within app
      // $event.preventDefault();
      // const { target } = $event
      const href = $event.target.href
      // const mailto = /mailto/g
      const isAFile = /^.*\.(pdf|doc|docx|xls|xlsx|zip|csv|json|txt)$/i.test(
        href
      )
      // console.log('click')
      if (isAFile) {
        // $event.preventDefault()
        const filename = href.split('/').pop()
        console.log('Download event: ', filename)

        this.$gtag('event', 'irb_file_download', {
          event_category: 'engagement',
          event_label: filename,
        })
        console.log('gtag sent')
      }
    },
  },
}
