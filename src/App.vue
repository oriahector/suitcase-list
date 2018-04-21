<template>
  <div id="app">
    <h1>The definitve app to not forgive anything</h1>
    <suitcaseIcon width="50px"/>
    <!-- <add-suitcase></add-suitcase> -->
    <add-item></add-item>
    <!-- <foot></foot> -->
  </div>
</template>

<script>
import { suitcasesRef } from './firebase';
import Foot from './components/Foot';
// import AddSuitcase from './components/AddSuitcase';
import AddItem from './components/AddItem';
import suitcaseIcon from './assets/suitcase.svg';
export default {
  name: 'app',
  components: { Foot, AddItem, suitcaseIcon },
  firebase: {
  suitcases: suitcasesRef
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
