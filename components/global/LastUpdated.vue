<template>
  <div>Last updated: {{ formatDate(updated) }}</div>
</template>

<script>
import { format, parseISO } from 'date-fns'
export default {
  props: {
    updated: {
      type: String,
      default: () => new Date().toJSON().split('T')[0],
    },
  },
  methods: {
    formatDate(d) {
      const temp = new Date(d).toJSON().split('T')[0]
      const myDate = `${temp}T23:59:59.000Z`
      const formattedDate = format(parseISO(myDate), 'MMM dd, yyyy')
      return formattedDate
    },
  },
}
</script>

<style lang="scss" scoped></style>
