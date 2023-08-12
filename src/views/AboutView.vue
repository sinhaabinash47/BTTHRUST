<template>
  <div class="about">
    <h1>data {{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg:"abinash"
    }
  },
  props: {
    msg: String,
  },
};
</script>
