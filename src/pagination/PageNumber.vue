<template>
  <span
    :class="computedClasses"
    ref="pageRef"
    @click.prevent="onPageChange(page.pageNumber)"
    :style="(page.style as any)"
    >{{ page.pageNumber }}</span
  >
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const emit = defineEmits<{
  (event: "onPageChange", pageNumber: number): void;
}>();
const pageRef = ref<HTMLSpanElement>();

const props = defineProps<{ page: TPage; currentPageNumber: number }>();

type TPage = {
  pageNumber: number;
  style: {
    "--color": string;
    "--background-color": string;
    "--hover-color": string;
    "--hover-bgColor": string;
  };
  activeClass?: string;
  pageClass?: string;
};

const computedClasses = computed<string>(() => {
  const isActiveClass = !!(
    props.page.activeClass && props.currentPageNumber === props.page.pageNumber
  );

  if (isActiveClass) {
    return props.page.activeClass as string;
  }
  const isPageClass =
    props.page.pageClass && props.currentPageNumber !== props.page.pageNumber;

  if (isPageClass) {
    return props.page.pageClass as string;
  }

  return "pageNumber";
});

const onPageChange = (pageNumber: number) => {
  emit("onPageChange", pageNumber);
};

defineExpose({
  page: pageRef,
});
</script>

<style scoped lang="scss">
.pageNumber {
  padding-block: 0.7rem;
  padding-inline: 1rem;
  margin-left: 1.59rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease-in-out;
  user-select: none;
  background-color: var(--background-color);
  color: var(--color);
  &:hover {
    background-color: var(--hover-bgColor);
    color: var(--hover-color);
  }
}
</style>
