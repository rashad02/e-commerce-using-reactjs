import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || '';

export const addPromo = async promo => {

    let promoInfo = {};

    await axios({
        method: 'post',
        url: baseUrl + '/promo/',
        data: promo
    }).then(response => {

        if (response.data.success) {
            promoInfo = response.data.promo;
        }
    }).catch(error => {
        console.log("add promo data error: ", error);

        return error;
    });


    return promoInfo;
}


export const getPromoList = async () => {

    let promotions = {};

    await axios({
        method: 'get',
        url: baseUrl + '/promo/',
        query: {}
    }).then(response => {
        if (response.data.success) {
            promotions = response.data.promotions;
        }
    }).catch(error => {
        console.log("add promo data error: ", error);

        return error;
    });


    return promotions;
}

export const getPromoItem = async promoCode => {

    let promotions = {};

    await axios({
        method: 'get',
        url: baseUrl + '/promo/',
        params: { promoCode }
    }).then(response => {
        if (response.data.success) {
            promotions = response.data.promotions;
        }
    }).catch(error => {
        console.log("add promo data error: ", error);

        return error;
    });


    return promotions;
}

export const updatePromo = async (promoId, promoData) => {

    let id = {};

    await axios({
        method: 'put',
        url: baseUrl + '/promo/',
        data: { promoId, promoData }
    }).then(response => {
        if (response.data.success) {
            id = response.data.promoId;
        }
    }).catch(error => {
        console.log("add promo data error: ", error);

        return error;
    });


    return id;
}