import { onMounted, reactive, ref, type Ref } from "vue";

type ReturnType<TPageItems> = {
  handlePageChange: (pageNumber: number) => void;
  pageItems: { data: TPageItems };
  currentPageNumber: Ref<number>;
  numberOfPages: number;
};

type TParams<TPageItems> = {
  initialPageNumber?: number;
  itemsPerPage?: number;
  items: TPageItems;
};

const usePagination = <TPageItems extends any[]>({
  initialPageNumber = 1,
  itemsPerPage = 10,
  items,
}: TParams<TPageItems>) => {
  if (initialPageNumber <= 0)
    console.error("Please provide an an initial page Number greater than 0");

  const currentPageNumber = ref(initialPageNumber);
  const pageItems = reactive<{ data: TPageItems[] }>({ data: [] });
  const numberOfPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber: number): void => {
    const isLastPage = pageNumber - 1 === numberOfPages;
    const isFirstPage = pageNumber + 1 === 1;

    if (isLastPage) return;
    if (isFirstPage) return;

    currentPageNumber.value = pageNumber;

    const start = (currentPageNumber.value - 1) * itemsPerPage;
    const end = currentPageNumber.value * itemsPerPage;

    pageItems.data = items.slice(start, end);
  };

  onMounted(() => {
    const start = (currentPageNumber.value - 1) * itemsPerPage;
    const end = currentPageNumber.value * itemsPerPage;

    pageItems.data = items.slice(start, end);
  });

  return {
    handlePageChange,
    pageItems,
    currentPageNumber,
    numberOfPages,
  } as ReturnType<TPageItems>;
};

export default usePagination;
