import axios  from 'axios';


export const addPromo = async promo => {
  
    let promoInfo = {};
        
    await axios({
            method: 'post',
            url: '/promo/',
            data: promo
    }).then(response => {
            
        if (response.data.success) {
                promoInfo = response.data.promo;
         }
    }).catch(error=> {
        console.log("add promo data error: ",error);
        
        return error;
    });
        
    
    return promoInfo;
}


export const getPromoList = async () => {

    let promotions = {};
        
    await axios({
            method: 'get',
            url: '/promo/',
            query:{}
    }).then(response => {
        if (response.data.success) {
            promotions = response.data.promotions;
        }
    }).catch(error=> {
        console.log("add promo data error: ",error);
        
        return error;
    });
        
    
    return promotions;
}

export const getPromoItem = async promoCode => {

    let promotions = {};
        
    await axios({
            method: 'get',
            url: '/promo/',
            params:{promoCode}
    }).then(response => {
        if (response.data.success) {
            promotions = response.data.promotions;
        }
    }).catch(error=> {
        console.log("add promo data error: ",error);
        
        return error;
    });
        
    
    return promotions;
}

export const updatePromo = async (promoId, promoData) => {

    let id = {};
        
    await axios({
            method: 'put',
            url: '/promo/',
            data:{promoId,promoData}
    }).then(response => {
        if (response.data.success) {
            id = response.data.promoId;
        }
    }).catch(error=> {
        console.log("add promo data error: ",error);
        
        return error;
    });
        
    
    return id;
}