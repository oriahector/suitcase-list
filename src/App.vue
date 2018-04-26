<template>
  <div id="app">
    <h1>The definitve app to not forgive anything</h1>
    <add-item></add-item>
    <foot></foot>
  </div>
</template>

<script>
import { suitcasesRef } from './firebase';
import Foot from './components/Foot';
// import AddSuitcase from './components/AddSuitcase';
import AddItem from './components/AddItem';
export default {
  name: 'app',
  components: { Foot, AddItem },
  firebase: {
  suitcases: suitcasesRef
  }
}
</script>
<style lang='scss'>
@import "/styles/reset.scss";
@import "/styles/base.scss";

</style>
