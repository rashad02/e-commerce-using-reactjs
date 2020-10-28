import React from 'react';
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

class AddPromo extends React.Component {

    constructor(props) {
        super();

        this.state = {
            promoId: "",
            promoCode: "",
            discountRate: "",
            useTime: "",
            startDate: "",
            endDate: ""
        }
    }

    handleChange = event => {

        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleSubmit = event => {

        event.preventDefault();

        const { promoId, promoCode, startDate, endDate, discountRate } = this.state;

        try {

            let promoData = {
                promoCode,
                startDate,
                endDate,
                discountRate
            };

            if (promoId) {
                new Promise((resolve, reject) => {
                    updatePromo(promoId, promoData).then((response) => {
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

            this.setState({
                promoId: '',
                promoCode: '',
                startDate: "",
                endDate: '',
                discountRate: "",
                useTime: '',
                isActive: false
            });
        } catch (error) {
            console.log(error);
        }



    }

    componentDidMount() {

        let { location, isActivePromo } = this.props;
        let propItem = location && location.state ? location.state : {};


        this.setState({
            promoId: propItem.id,
            promoCode: propItem.promoCode,
            startDate: propItem && propItem.startDate ? moment(propItem.startDate).toDate() : "",
            endDate:  propItem && propItem.endDate ? moment(propItem.endDate).toDate(): "",
            discountRate: propItem.discountRate,
            useTime: propItem.useTime,
        });

        isActivePromo(propItem.isActive)
    }

    render() {
        let { promoId, promoCode, startDate, endDate, discountRate, useTime } = this.state;

        let { isActivePromo, selectActivePromo } = this.props;

        return (
            <div className="form-container">
                <form className="promo-form col-md-4" onSubmit={this.handleSubmit}>
                    <FormInput type="text" value={promoCode} name="promoCode" handleChange={this.handleChange} label="Promo Code" required />
                    <FormInput type="date" value={startDate} name="startDate" handleChange={this.handleChange} label="Start Date" required />
                    <FormInput type="date" value={endDate} name="endDate" handleChange={this.handleChange} label="End Date" required />
                    <FormInput type="text" value={discountRate} name="discountRate" handleChange={this.handleChange} label="Discount Rate" required />
                    <FormInput type="text" value={useTime} name="useTime" handleChange={this.handleChange} label="Use Time" />

                    <div className="promo-type-section">
                        <div className="promo-type-text">Active </div>
                        <ToggleSwitch isOn={selectActivePromo} onText={'Yes'} offText={"No"} onColor={'#00B55B'} onChange={(e) => isActivePromo(!selectActivePromo)} />
                    </div>

                    <div className="buttons">
                        <CustomButton id="custom-toggle" type="submit"> {promoId ? 'Update': 'Add'}</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    selectActivePromo: selectIsActivePromo
})


const mapDispatchToProps = dispatch => ({
    isActivePromo: isActive => dispatch(isActivePromo(isActive))
})



export default connect(mapStateToProps, mapDispatchToProps)(AddPromo);