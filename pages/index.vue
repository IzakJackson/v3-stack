<script setup lang="ts">
import { BeakerIcon } from '@heroicons/vue/24/solid';

const { $client } = useNuxtApp();

const hello = await $client.hello.useQuery({ text: 'client' });
</script>

<template>
  <div>
    <h1 class="text-4xl font-extrabold tracking-tight capitalize scroll-m-20 lg:text-5xl">
      Hello world
    </h1>
    <Button v-if="hello.data.value" class="mt-4">
      {{ hello.data?.value.greeting }}
    </Button>
  </div>
</template>
