<template>
  <l-marker :lat-lng="center.coordinates">
    <l-popup v-show="loading">
      <Popup :center="center" />
    </l-popup>
  </l-marker>
</template>

<script>
import Popup from './Popup'

export default {
  name: 'Market',
  components: {
    Popup
  },
  props: {
    center: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.loading = true
  }
}
</script>

<style lang="scss" scoped></style>
