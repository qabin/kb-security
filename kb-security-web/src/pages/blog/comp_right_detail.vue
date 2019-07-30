<template>
  <div v-html="this.content" class="text-left"></div>
</template>

<script>
  export default {
    name: 'comp_right_detail',
    data: () => ({
      content: null
    }),
    methods: {
      refresh_content (data) {
        this.content = data
      }
    },
  }
</script>

<style scoped>

</style>
