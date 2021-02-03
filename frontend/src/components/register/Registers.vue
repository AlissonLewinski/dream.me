<template>
    <div class="register-content">
        <PageTitle title="Registros"/>
        <NewRegister/>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import NewRegister from './NewRegister.vue'

export default {
    name: 'Registers',
    components: {PageTitle, NewRegister}
}
</script>

<style>
    .register-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>