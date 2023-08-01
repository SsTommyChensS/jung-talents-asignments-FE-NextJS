import axiosConfig from '@/services/axiosConfig';

export function createOrder(data) {
    return axiosConfig.post('/order', data);
}