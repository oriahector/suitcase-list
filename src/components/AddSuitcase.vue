
<template>
  <div>
    <h2>total suitcases added: {{suitcases.length}}</h2>
    <label>Add a new suitcase</label>
    <input type="text" v-model="item" />
    <button @click="submitItem()">Add</button>
    <ul>
      <li v-for="suitcase of suitcases" v-bind:key="suitcase['.key']">{{suitcase.name}}</li>
    </ul>
  </div>
</template>

<script>
import { suitcasesRef } from "../firebase";
export default {
  name: "addSuitcase",
  firebase: {
    items: suitcasesRef
  },
  data() {
    return {
      item: "Berta Summer"
    };
  },
  methods: {
    submitItem() {
      suitcasesRef.push({ name: this.item, edit: false });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../styles/items.scss";
</style>

