import {toast} from 'react-toastify'

export const handleSuccess = (msg) => {
    toast.success(msg, {
        postition: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        postition: 'top-right'
    })
}