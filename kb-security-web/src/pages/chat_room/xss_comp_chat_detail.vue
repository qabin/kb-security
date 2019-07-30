<template>
  <div>
    <!--<div v-html="data.content"></div>-->
    <div :id="model.id" class="font-13"></div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'xss_comp_chat_detail',
    props: {
      model: {}
    },
    // computed: {
    //   div_id () {
    //     if (this.data.id) {
    //       this.xss_hack()
    //     }
    //   }
    // },
    // watch:{
    //   div_id(){
    //     this.xss_hack()
    //   }
    // },
    methods: {
      xss_hack () {
        $('#' + this.model.id).html(this.model.content || '无聊天内容信息！')
      }
    },
    mounted () {
      this.xss_hack()
    },
    updated () {
      this.xss_hack()
    }
  }
</script>

<style scoped>

</style>
