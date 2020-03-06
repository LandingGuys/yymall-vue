<template>
  <div v-html="body">
    {{body}}
  </div>
</template>
<script>
export default {
  name: 'alipay',
  data(){
    return{
      body: ''
    }
  },
  mounted(){
    let form = this.$route.params.body
    this.body = form
    // console.log(this.body)
    this.$nextTick(() =>{
     document.getElementById('bestPayForm').submit();
    })
  }
  
}
</script>
<style  scoped>

</style>