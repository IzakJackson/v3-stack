<script setup lang="ts">
import { BeakerIcon } from '@heroicons/vue/24/solid';
const { $client } = useNuxtApp();

const hello = await $client.hello.useQuery({ text: 'client' });
</script>

<template>
  <div>
    <h1 class="mb-4 text-3xl font-extrabold capitalize">Hello world</h1>
    <Button v-if="hello.data.value">
      {{ hello.data?.value.greeting }}
    </Button>
  </div>
</template>
