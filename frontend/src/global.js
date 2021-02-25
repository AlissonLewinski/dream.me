import Vue from 'vue'

export const userKey = '__dream_me_user'
export const baseApiUrl = process.env.VUE_APP_API_URL

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.$toast.open({
                message: e.response.data,
                position: 'top-right',
                type: 'error',
                duration: 4000
            })
    } else if(typeof e === 'string') {
        Vue.$toast.open({
            message: 'a',
            position: 'top-right',
            type: 'error',
            duration: 4000
        })
    } else {
        Vue.$toast.open({
            message: 'Erro inesperado',
            position: 'top-right',
            type: 'error',
            duration: 4000
        })
    }
}