import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { setPromoList } from "../../../redux/admin/admin.action";
import { selectPromotionList } from "../../../redux/admin/admin.selector";
import { getPromoList } from '../../../redux/admin/admin.util';

import PromoItem from './promo-item.component';

import CustomButton from "../../custom-button/custom-button.component";

import './promo-code.styles.scss';



// class PromoList extends React.Component{
const PromoList = ({ setPromoList, promotionList = [] }) => {
    useEffect(() => {
        getPromoList().then((response) => {
            setPromoList(response);
        });
    }, [setPromoList]);
    return (
        <div className="promo-list-container">
            <div className="buttons">
                <CustomButton id="custom-toggle"> <a href={"/admin/addpromo/"}>Add New Promo</a></CustomButton>
            </div>

            {promotionList && promotionList.length ? promotionList.filter((item, index) => item).map((item, index) => (
                <PromoItem key={item.id} item={item} serialNo={index + 1} />
            )) : ''}
        </div>
    )
}

// constructor(props) {
//     super();

//     this.state = {
//         promotionList: []
//     }
// }
// componentDidMount(){

//     const { setPromoList } = this.props;

//     // try {
//     //     new Promise((resolve, reject) => {

//     //     });
//     // } catch (error) {
//     //     console.error("Error : ", error);
//     // }
// }


// render() {

//     const { promotionList } = this.props;

// }

// }

const mapStateToProps = createStructuredSelector({
    promotionList: selectPromotionList
})

const mapDispatchToProps = dispatch => ({
    setPromoList: promotions => dispatch(setPromoList(promotions))
})

export default connect(mapStateToProps, mapDispatchToProps)(PromoList);