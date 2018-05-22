<template>
  <div>
    details
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: null
      }
    },
    mounted() {
      this.getDetails()
    },
    methods: {
      getDetails() {
        axios.get('/user?ID=12345')
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

</script>

<style>
</style>