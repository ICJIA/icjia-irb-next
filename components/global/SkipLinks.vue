<template>
  <div role="navigation" aria-label="Skip Links">
    <a id="skip-content" class="offscreen" href="#main" aria-label="Skip Link">
      Skip to Main Content
    </a>
    |
    <a
      id="skip-ie11"
      class="offscreen"
      href="/irb/ie11/"
      aria-label="Skip to IE11 friendly"
    >
      Skip to Internet Explorer friendly site
    </a>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
a.offscreen {
  position: absolute !important;
  left: -1000px !important;
  top: -1000px !important;
  width: 1px !important;
  height: 1px !important;
  text-align: left !important;
  overflow: hidden !important;
}

a.offscreen:focus,
a.offscreen:active,
a.offscreen:hover {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: auto !important;
  height: auto !important;
  overflow: visible !important;
  background-color: #fff !important;
  border: 1px dotted #000 !important;
  z-index: 10000 !important;
}
</style>
