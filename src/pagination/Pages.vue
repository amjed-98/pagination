<template>
  <div class="pages">
    <page-number
      v-for="page in pages"
      :current-page-number="currentPageNumber"
      ref="pagesRef"
      :page="page"
      :key="page.pageNumber"
      @on-page-change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageNumber from "./PageNumber.vue";

const emit = defineEmits<{
  (event: "onPageChange", pageNumber: number): void;
}>();
const props = defineProps<{
  numberOfPages: number;
  currentPageNumber: number;
  activePageStyle?: { color: string; backgroundColor: string };
  activePageClass?: string;
  pageNumberClass?: string;
}>();
const pagesRef = ref();

const defaultPageTheme = {
  "--color": "#A0A7B9",
  "--background-color": "transparent",
  "--hover-color": props.activePageStyle?.color ?? "white",
  "--hover-bgColor": props.activePageStyle?.backgroundColor ?? "#8D00D8",
};

const activePageTheme = {
  ...defaultPageTheme,
  "--color": props.activePageStyle?.color ?? "white",
  "--background-color": props.activePageStyle?.backgroundColor ?? "#8D00D8",
};

type TPage = {
  pageNumber: number;
  style: typeof defaultPageTheme;
  activeClass: typeof props.activePageClass;
  pageClass: typeof props.pageNumberClass;
};

const pages = computed<TPage[]>(() => {
  return Array.from({ length: props.numberOfPages }, (_, i) => {
    const pageNumber = i + 1;
    const style =
      pageNumber === props.currentPageNumber
        ? activePageTheme
        : defaultPageTheme;

    return {
      pageNumber,
      style,
      activeClass: props.activePageClass,
      pageClass: props.pageNumberClass,
    };
  });
});

const onPageChange = (pageNumber: number): void => {
  emit("onPageChange", pageNumber);
};

defineExpose({
  pagesRef,
});
</script>

<style scoped lang="scss">
.pages {
  display: flex;
  overflow: hidden;
  max-width: 44rem;
  justify-content: flex-start;
  padding-bottom: 1rem;
  padding-bottom: 1rem;
  gap: 0.8rem;
}
</style>
