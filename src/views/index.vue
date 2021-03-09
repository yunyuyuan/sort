<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index",
}
</script>

<style lang="scss">
body, html{
  font-size: 16px;
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
  outline: none;
  flex-shrink: 0;
  &[flex]{
    display: flex;
    align-items: center;
  }
}
input, textarea, select{
  padding: .4rem .8rem;
  border-radius: .2rem;
  font-size: .9rem;
  border: 1px solid #bdbdbd;
  background: white;
  transition: border .15s linear;
  &:hover{
    border-color: gray;
  }
  &:focus{
    border-color: #395bff;
  }
}

#app{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>