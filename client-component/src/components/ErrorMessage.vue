<template>
  <div class="alert alert-danger error mb-0" role="alert">
    {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ErrorMessage",
  props: ["message"]
}
</script>
<style>
  
</style>