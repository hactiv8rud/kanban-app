<template>
    <div>
        <div class="col-4">
            <div class="card">
                <img class="card-img-top" :src="src" :alt="alt">
                <div class="card-body">
                    <h5 class="card-title text-center">{{ tech }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Techstack",
    props: ["tech", "src", "alt" ]
}
</script>
<style></style>