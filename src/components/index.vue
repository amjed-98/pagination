<template>
  <div
    :class="['pagination', paginationContainerClass]"
    :id="paginationContainerId"
    @wheel.prevent="handleMouseWheelScroll"
  >
    <button class="btn prev-btn" @click.prevent="onPageChange('prev')">
      <component
        :is="prevArrowsLabel"
        v-if="typeof prevArrowsLabel === 'object'"
      />
      <template v-else>
        {{ prevArrowsLabel ?? "❮" }}
      </template>
    </button>

    <vue-pages
      ref="pagesRef"
      :current-page-number="currentPageNumber"
      :number-of-pages="numberOfPages"
      :active-page-style="activePageStyle"
      :page-number-class="pageClass"
      :active-page-class="activePageClass"
      @on-page-change="onPageChange"
    />

    <button class="btn next-btn" @click.prevent="onPageChange('next')">
      <component
        :is="nextArrowsLabel"
        v-if="typeof nextArrowsLabel === 'object'"
      />
      <template v-else>
        {{ nextArrowsLabel ?? "❯" }}
      </template>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, type Component } from "vue";
import VuePages from "./Pages.vue";

const emit = defineEmits<{
  (even: "onPageChange", action: number): void;
}>();

const props = defineProps<{
  currentPageNumber: number;
  itemsPerPage?: number;
  numberOfPages: number;
  nextArrowsLabel?: string | Component;
  prevArrowsLabel?: string | Component;
  activePageStyle?: { color: string; backgroundColor: string };
  pageClass?: string;
  activePageClass?: string;
  paginationContainerClass?: string;
  paginationContainerId?: string;
}>();

const pagesRef = ref<{ pagesRef: { page: HTMLSpanElement }[] }>();

const onPageChange = (action: number | "next" | "prev"): void => {
  const pageNumber =
    action === "next"
      ? props.currentPageNumber + 1
      : action === "prev"
      ? props.currentPageNumber - 1
      : action;

  emit("onPageChange", pageNumber);
  scrollToPageNumber(pageNumber);
};

const scrollToPageNumber = (pageNumber: number) => {
  const pageRef = pagesRef.value?.pagesRef.find(
    ({ page }) => +(page?.innerText || "") === pageNumber
  )?.page;

  pageRef?.scrollIntoView();
};

const handleMouseWheelScroll = (e: WheelEvent) => {
  const target = e.target as HTMLDivElement;

  target.scrollLeft += e.deltaY * 2;
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding-block: 4rem;
  margin-top: 1rem;

  .btn {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 1.5rem;
    transition: all 0.1s ease-in-out;
    border-radius: 50%;
    padding: 0.5rem;
  }
}
</style>
