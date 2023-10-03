import axios from 'axios';

const baseUrl = process.env.BASE_URL || '';

export const addOrder = async itemPrice => {

    let order = {};

    await axios({
        method: 'post',
        url: baseUrl + '/order/',
        data: { itemPrice }
    }).then(response => {
        if (response.data.success) {
            order = response.data.order;
        }
    }).catch(error => {
        console.log("add order data error: ", error);

        return error;
    });

    return order;
}

export const getOrders = async status => {
    let orders = [];

    await axios({
        method: 'get',
        url: baseUrl + '/order/',
        params: { status }
    }).then(response => {
        if (response.data.success) {
            orders = response.data.orders;
        }
    }).catch(error => {
        console.log("add order data error: ", error);

        return error;
    });

    return orders;
}

export const updateOrderItem = async (id, status) => {
    let order = [];

    await axios({
        method: 'put',
        url: baseUrl + '/order/',
        data: { status, id }
    }).then(response => {
        if (response.data.success) {
            order = response.data.order;
        }
    }).catch(error => {
        console.log("add order data error: ", error);

        return error;
    });

    return order;
}