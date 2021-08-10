import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => { 

    // componentWillMount () {
    //     this.props.onInitPurchase();
    // }
    const checkoutCancelledHandler = () =>{
        props.history.goBack();
    } 

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />
    if(props.ings){
        const purchasedRedirected = props.purchased ? <Redirect to="/" /> : null;
        summary= (
            <div>
                {purchasedRedirected}
                <CheckoutSummary 
                    ingredients = {props.ings}
                    checkoutCancelled = {checkoutCancelledHandler} 
                    checkoutContinued = {checkoutContinuedHandler} />
                <Route 
                    path={props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        )
    }
    return summary;
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return{
//         onInitPurchase : () => dispatch(actions.purchaseInit())
//     }
// }
export default connect(mapStateToProps)(Checkout);