//OrderSummary
import React from 'react';
import Aux from '../../../hoc/Aux';
const OrderSummary= (props)=>{
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((ingKey)=><li key={ingKey}>{ingKey} : {props.ingredients[ingKey]}</li>)
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the fallowing ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
}
export default OrderSummary;