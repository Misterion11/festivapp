<template>
  <div class="border border-blue-300 shadow rounded-md p-4 w-2/5 my-12 mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-gray-200 h-10 w-10" />
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-gray-200 rounded" />
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-gray-200 rounded col-span-2" />
            <div class="h-2 bg-gray-200 rounded col-span-1" />
          </div>
          <div class="h-2 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FakeComponent'
}
</script>

<style>

</style>
