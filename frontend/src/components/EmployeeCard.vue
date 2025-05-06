<template>
    <div class="border rounded p-4 flex flex-col items-center">
        <img :src="photo" :alt="name" class="w-24 h-24 rounded-full mb-2" />
        <h3 class="text-lg font-semibold">{{ name }}</h3>
        <p class="text-gray-600">{{ position }}</p>
        <p class="text-gray-600">{{ phone }}</p>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        position: String,
        phone: String,
        photo: String
    }
};
</script>