
<template>
  <div>
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
  </div>
</template>
<script>
import { itemsRef } from "../firebase";
import deleteIcon from "../assets/delete.svg";
import pencilIcon from "../assets/pencil.svg";
export default {
  name: "editComponent",
  components: {deleteIcon, pencilIcon },
  firebase: {
    items: itemsRef
  },
  data() {
    return {
      item: "",
       newItem: {
        name: "",
        season: "",
        type: "",
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