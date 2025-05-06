<template>
    <form @submit.prevent="submit" class="space-y-4">
        <slot></slot>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Сохранить</button>
    </form>
</template>

<script>
export default {
    emits: ['submit'],
    setup(props, { emit }) {
        const submit = () => emit('submit');
        return { submit };
    }
};
</script>