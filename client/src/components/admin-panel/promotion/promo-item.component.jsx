import React from 'react';

import {Link} from 'react-router-dom';
import moment from 'moment';

import './promo-item.styles.scss';



const PromoItem = ({id, item, serialNo}) => {
    return (
        <div className="promo-item-header">
            <div className="serialNo">
                {serialNo}
            </div>
            <div className="promo-code">
                {item.promoCode}
            </div>
            <div className="start-date">
                {moment(item.startDate).format("DD-MM-YYYY")}
            </div>
            <div className="end-date">
                {moment(item.endDate).format("DD-MM-YYYY")}
            </div>
            <div className="discount">
                {item.discountRate}
            </div>
            <div className="edit">
                <Link to ={{ pathname: '/admin/addpromo', state: item }} >  <input type="button" className="edit-button" value={"Edit"} /></Link>
            </div>
            <div className="status">
                <input type="button" className={`${item.isActive ? 'active': 'expired'} active-status`} disabled value={item.isActive ? 'Active' : "Expired"} />
            </div>
        </div>
    )
}

export default PromoItem