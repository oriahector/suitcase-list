
<template>
  <div>
    <h1>Summer suitcase for Héctor</h1>
    <h2>total items added: {{items.length}}</h2>
    <div>
      <label>Add a new item</label>
      <input type="text" v-model="item" />
      <select v-model="newItem.season" form="carform">
        <option disabled value>Season</option>
        <option value="summer" selected>Summer</option>
        <option value="winter">Winter</option>
        <option value="all">All</option>
      </select>
      <select v-model="newItem.kind" form="carform">
        <option disabled value>Type</option>
        <option value="toilet" selected>Toiltet bag</option>
        <option value="electronics">Electronics</option>
        <option value="clothes">Clothes</option>
      </select>
      <button @click="submitItem()">Add</button>
    </div>
    <div>
      <ul>
        <li v-for="item of items" v-bind:key="item['.key']" :class="{clothes: item.kind == 'clothes',
                 electronics: item.kind == 'electronics',
                 toilet: item.kind == 'toilet',
                 packed: item.packed}">
          <sunIcon width="28px" v-if="item.season == 'summer'" />
          <flakeIcon width="28px" v-if="item.season == 'winter'" />
          <allIcon width="28px" height="28px" v-if="item.season == 'all'" />
          <p @click="item.packed = !item.packed">{{item.name}}</p>
          <div v-if="!item.edit">
            <button @click="removeItem(item['.key'])">
              <delete-icon width="28px"></delete-icon>
            </button>
            <button @click="setEditItem(item['.key'])">
              <pencil-icon width="28px" height="28px"></pencil-icon>
            </button>
          </div>
          <div v-else>
            <input type="text" v-model="item.name">
            <select v-model="editItem.season">
              <option disabled value>Season</option>
              <option value="summer" selected>Summer</option>
              <option value="winter">Winter</option>
              <option value="all">All</option>
            </select>
            <select v-model="editItem.kind">
              <option disabled value>Type</option>
              <option value="toilet" selected>Toiltet bag</option>
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothes</option>
            </select>
            <button @click="saveEdit(item)">Save</button>
            <button @click="cancelEdit(item['.key'])">Cancel</button>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { itemsRef } from "../firebase";
import EditComponent from "./EditComponent";
import sunIcon from "../assets/sun.svg";
import flakeIcon from "../assets/scarf.svg";
import deleteIcon from "../assets/delete.svg";
import pencilIcon from "../assets/pencil.svg";
import allIcon from "../assets/all.svg";
export default {
  name: "addItem",
  components: { EditComponent, sunIcon, flakeIcon, deleteIcon, pencilIcon, allIcon},
  firebase: {
    items: itemsRef
  },
  data() {
    return {
      item: "",
      newItem: {
        name: "",
        season: "",
        kind: "",
        user: "",
        packed: false
      },
       editItem: {
        name: "",
        season: "",
        kind: "",
        user: "",
        packed: false
      }
    };
  },
  methods: {
    submitItem() {
      itemsRef.push({
        name: this.item,
        edit: false,
        season: this.newItem.season,
        kind: this.newItem.kind,
        packed: this.newItem.packed
      });
      this.newItem.name = "";
      this.newItem.season = "";
      this.newItem.kind = "";
      this.newItem.packed = false;
      this.item = "";
    },
    removeItem(key) {
      itemsRef.child(key).remove();
    },
    setEditItem(key) {
      itemsRef.child(key).update({ edit: true });
    },
    cancelEdit(key) {
      itemsRef.child(key).update({ edit: false });
    },
    saveEdit(item) {
      const key = item[".key"];
      itemsRef.child(key).set({
       name: item.name,
        edit: false,
        season: this.editItem.season,
        kind: this.editItem.kind,
        packed: this.editItem.packed
      });
       this.newItem.name = "";
      this.newItem.season = "";
      this.newItem.kind = "";
      this.newItem.packed = false;
      this.item = "";
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../styles/items.scss";
</style>

