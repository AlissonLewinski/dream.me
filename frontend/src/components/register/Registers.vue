<template>
    <div class="register-content">
        <PageTitle title="Registros"/>
        <NewRegister :loadRegisters="loadRegisters"/>

        <div class="registers">
            <RegisterItem v-for="register in registers" :key="register.id" :title="register.title"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import PageTitle from '../template/PageTitle.vue'
import NewRegister from './NewRegister.vue'
import RegisterItem from './RegisterItem.vue'

export default {
    name: 'Registers',
    components: {PageTitle, NewRegister, RegisterItem},
    data: function() {
        return {
            registers: []
        }
    },
    methods: {
        loadRegisters() {
            axios.get(`${baseApiUrl}/registers`)
                .then(res => this.registers = res.data)
        }
    },
    mounted() {
        this.loadRegisters()
    }
}
</script>

<style>
    .register-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .registers {
        box-sizing: border-box;
        width: 900px;
        max-width: 95vw;
    }
</style>