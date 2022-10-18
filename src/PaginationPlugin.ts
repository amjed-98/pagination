import type { App } from "vue";
import { usePagination, Pagination } from "./pagination";

export default {
  install: (app: App) => {
    app.component("Pagination", Pagination);
  },
};

export { Pagination, usePagination };
