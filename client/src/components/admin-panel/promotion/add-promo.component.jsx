import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import moment from 'moment'

import FormInput from "../../form-input/form-input.component";
import CustomButton from "../../custom-button/custom-button.component";

import ToggleSwitch from '../../custom-button/toggle-button.component';
import { isActivePromo } from "../../../redux/admin/admin.action";
import { selectIsActivePromo } from "../../../redux/admin/admin.selector";

import { updatePromo } from "../../../redux/admin/admin.util";
import { addPromo } from "../../../redux/admin/admin.util";

import './add-promo.styles.scss';

// class AddPromo extends React.Component {

//     constructor(props) {
//         super();

//         this.state = {
//             promoId: "",
//             promoCode: "",
//             discountRate: "",
//             useTime: "",
//             startDate: "",
//             endDate: ""
//         }
//     }



//     componentDidMount() {

//         let { location, isActivePromo } = this.props;
//         let propItem = location && location.state ? location.state : {};


//         this.setState({
//             promoId: propItem.id,
//             promoCode: propItem.promoCode,
//             startDate: propItem && propItem.startDate ? moment(propItem.startDate).toDate() : "",
//             endDate: propItem && propItem.endDate ? moment(propItem.endDate).toDate() : "",
//             discountRate: propItem.discountRate,
//             useTime: propItem.useTime,
//         });

//         isActivePromo(propItem.isActive)
//     }

//     render() {
//         let { promoId, promoCode, startDate, endDate, discountRate, useTime } = this.state;

//         let { isActivePromo, selectActivePromo } = this.props;


//     }
// }

const AddPromo = ({ isActivePromo, selectActivePromo, promo =
    {}, location }) => {
    console.log("wow: ", promo, location)
    let handleChange = event => {

        const { name, value } = event.target;
        console.log("wow: ", name, value, location)
        promo[name] = value;
        console.log("wow: ", promo)
    }

    let handleSubmit = event => {

        event.preventDefault();


        try {

            let promoData = {
                promoCode: promo.promoCode,
                startDate: promo.startDate,
                endDate: promo.endDate,
                discountRate: promo.discountRate
            };

            if (promo && promo.promoId) {
                new Promise((resolve, reject) => {
                    updatePromo(promo.promoId, promoData).then((response) => {
                        resolve(response);
                    });
                });
            } else {
                new Promise((resolve, reject) => {
                    addPromo(promoData).then((response) => {
                        resolve(response);
                    });
                });
            }

            // this.setState({
            promo.promoId = '';
            promo.promoCode = '';
            promo.startDate = "";
            promo.endDate = '';
            promo.discountRate = "";
            promo.useTime = '';
            promo.isActive = false;
            // });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let propItem = location && location.state ? location.state : {};


        // this.setState({
        promo.promoId = propItem.id;
        promo.promoCode = propItem.promoCode;
        promo.startDate = propItem && propItem.startDate ? moment(propItem.startDate).toDate() : "";
        promo.endDate = propItem && propItem.endDate ? moment(propItem.endDate).toDate() : "";
        promo.discountRate = propItem.discountRate;
        promo.useTime = propItem.useTime;
        // });

        isActivePromo(propItem.isActive)
    }, [isActivePromo]);
    let { promoId, promoCode, startDate, endDate, discountRate, useTime } = promo
    return (
        <div className="form-container">
            <form className="promo-form col-md-4" onSubmit={handleSubmit}>
                <FormInput type="text" value={promoCode} name="promoCode" handleChange={handleChange} label="Promo Code" required />
                <FormInput type="date" value={startDate} name="startDate" handleChange={handleChange} label="Start Date" required />
                <FormInput type="date" value={endDate} name="endDate" handleChange={handleChange} label="End Date" required />
                <FormInput type="text" value={discountRate} name="discountRate" handleChange={handleChange} label="Discount Rate" required />
                <FormInput type="text" value={useTime} name="useTime" handleChange={handleChange} label="Use Time" />

                <div className="promo-type-section">
                    <div className="promo-type-text">Active </div>
                    <ToggleSwitch isOn={selectActivePromo} onText={'Yes'} offText={"No"} onColor={'#00B55B'} onChange={(e) => isActivePromo(!selectActivePromo)} />
                </div>

                <div className="buttons">
                    <CustomButton id="custom-toggle" type="submit"> {promoId ? 'Update' : 'Add'}</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectActivePromo: selectIsActivePromo
})


const mapDispatchToProps = dispatch => ({
    isActivePromo: isActive => dispatch(isActivePromo(isActive))
})



export default connect(mapStateToProps, mapDispatchToProps)(AddPromo);