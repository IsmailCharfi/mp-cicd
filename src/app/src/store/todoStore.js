import Vue from "vue";
import Vuex from "vuex";
import Toastify from "toastify-js";

Vue.use(Vuex);

const toast = (text, error = false) => {
  Toastify({
    text,
    duration: 1500,
    style: {
      background: error
        ? "linear-gradient(to right, #ff0000, #c70039)"
        : "linear-gradient(to right, #00b09b, #4cff8a)",
    },
  }).showToast();
};

const fetchAll = async () => {
  const response = await fetch(`/api/todos`);

  if (response.ok) {
    return await response.json();
  } else {
    return [];
  }
};

export const todoStore = new Vuex.Store({
  state: {
    items: [],
  },
  getters: {
    items: (state) => {
      return state.items;
    },
    completedItems: (state) => {
      return state.items.filter((item) => item.completed);
    },
    totalItems: (state) => {
      return state.items.length;
    },
    totalCompletedItems: (state, getters) => {
      return getters.completedItems.length;
    },
  },
  mutations: {
    setItems: async (state) => {
      state.items = await fetchAll();
    },
    addItem: async (state, payload) => {
      const response = await fetch(`/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { message } = await response.json();
        toast(message);
        state.items = await fetchAll();
      } else {
        toast("Error", true);
      }
    },
    updateItem: async (state, payload) => {
      const response = await fetch(`/api/todos/${payload.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { message } = await response.json();
        toast(message);
        state.items = await fetchAll();
      } else {
        toast("Error", true);
      }
    },
    deleteItem: async (state, payload) => {
      const response = await fetch(`/api/todos/${payload}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const { message } = await response.json();
        toast(message);
        state.items = await fetchAll(state.API_PATH);
      } else {
        toast("Error", true);
      }
    },
  },
});
