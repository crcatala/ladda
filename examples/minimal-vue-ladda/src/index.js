import Vue from 'vue';

import api from './api';

new Vue({
  el: '#app',
  template: `
    <div>
      <h1>Search Hacker News with Ladda</h1>
      <p>There shouldn't be a second network request, when you search for something twice.</p>
      <input v-model="query">
      <button v-on:click="onSearch">Search</button>
      <div v-for="item in list">
        {{item.title}}
      </div>
    </div>
  `,
  data: {
    list: [],
    query: '',
  },
  methods: {
    onSearch() {
      api.hackernews.getList(this.query).then(hits => this.list = hits);
    },
  }
});
