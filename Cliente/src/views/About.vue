<template>
    <div class="about">
        <Weather></Weather>
    </div>
</template>


<script>
    import Weather from '@/components/VueWeather';

    export default {
        name: 'about',
        components: {
            Weather
        }
    }

</script>