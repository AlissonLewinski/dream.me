<template>

        <router-link class="notebook-item-link" :to="`/cadernos/${notebook.id}`">
            <div class="book">
                <div
                    class="book__cover"
                    :style="`background-image: url(${notebook.icon});`"
                >
                    <div class="book__detail">
                        {{
                            notebook.name ?
                                notebook.name.length > 35 ? notebook.name.substring(0, 32) + '...' : notebook.name
                            :
                                ''
                        }}
                    </div>
                </div>
                <div class="book__page ruled"></div>
            </div>
        </router-link>

</template>

<script>

export default {
    name: "NotebookItem",
    props: { notebook: Object },
}
</script>

<style src="./NotebookItem.css">
</style>

<style>
    .notebooks-content a {
        margin: 28px 32px;
    }
</style>