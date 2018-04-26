
<template>
  <div>
    <div class="users">
      <div class="users__hector" @click="toggleHector" :class="{active: usuario === 'Hector'}"></div>
     <div class="users__lola" @click="toggleLola" :class="{active: usuario === 'Lola'}"></div>
    </div>
     <div class="seasons">
      <div class="seasons__summer" @click="toggleSummer" :class="{active: estacion === 'Summer'}"></div>
     <div class="seasons__winter" @click="toggleWinter" :class="{active: estacion === 'Winter'}"></div>
    </div>

    <h1> {{estacion}} Suitcase for {{usuario}}</h1>
    <h2>total items added: {{items.length}}</h2>

    <div>
      <label>Add a new item</label>
      <input type="text" v-model="item" />
      <select v-model="newItem.season">
        <option disabled value>Season</option>
        <option value="summer" selected>Summer</option>
        <option value="winter">Winter</option>
        <option value="all">All</option>
      </select>
      <select v-model="newItem.kind">
        <option disabled value>Type</option>
        <option value="toilet" selected>Toiltet bag</option>
        <option value="electronics">Electronics</option>
        <option value="clothes">Clothes</option>
      </select>
      <button @click="submitItem()">Add</button>
    </div>
    <div>
      <ul>
        <li v-for="item of filterItems" v-bind:key="item['.key']" :class="{clothes: item.kind == 'clothes',
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
    items: itemsRef.orderByChild('kind')
  },
  data() {
    return {
      item: "",
      usuario: "Hector",
      estacion: "Summer",
      newItem: {
        name: "",
        season: "",
        kind: "",
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
  computed: {
    filterItems() {
      return this.items.filter((item) => item.user == this.usuario);
    }
  },
  methods: {
    submitItem() {
      itemsRef.push({
        name: this.item,
        edit: false,
        season: this.newItem.season,
        kind: this.newItem.kind,
        user: this.usuario,
        packed: this.newItem.packed
      });
      this.newItem.name = "";
      this.newItem.season = "";
      this.newItem.kind = "";
      this.newItem.user = "";
      this.newItem.packed = false;
      this.item = "";
    },
    removeItem(key) {
      itemsRef.child(key).remove();
    },
    toggleHector: function() {
        this.usuario = 'Hector'
    },
     toggleSummer: function() {
        this.estacion = 'Summer'
    },
     toggleWinter: function() {
        this.estacion = 'Winter'
    },
     toggleLola: function() {
        this.usuario = 'Lola'
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

