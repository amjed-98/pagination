import type { App } from "vue";
import Pagination from "./pagination/index.vue";

export default {
  install: (app: App) => {
    app.component("Pagination", Pagination);
    app.provide;
  },
};

export { Pagination };
