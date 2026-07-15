export const SkeletonLoading = () => {
  return (
    <div class="h-12 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
  );
};

export const SpinnerLoading = () => {
  return (
    // <!-- From Uiverse.io by devAaus -->
    <div class="flex h-full w-full flex-col items-center justify-center gap-4">
      <div class="flex size-28 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-blue-500 text-4xl text-blue-500">
        <div class="flex size-24 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-500 text-2xl text-red-500"></div>
      </div>
    </div>
  );
};

export const DotLoading = () => {
  return (
    // <!-- From Uiverse.io by Javierrocadev -->
    <div class="flex h-full flex-row items-center justify-center gap-2">
      <div class="h-4 w-4 animate-bounce rounded-full bg-olive-800 dark:bg-olive-500"></div>
      <div class="h-4 w-4 animate-bounce rounded-full bg-olive-800 [animation-delay:-.3s] dark:bg-olive-500"></div>
      <div class="h-4 w-4 animate-bounce rounded-full bg-olive-800 [animation-delay:-.5s] dark:bg-olive-500"></div>
    </div>
  );
};
