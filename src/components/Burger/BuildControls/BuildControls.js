import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label:'Meat',type:'Meat'},
    {label:'Cheese',type:'Cheese'},
    {label:'Salad',type:'Salad'},
    {label:'Bacon',type:'Bacon'}
]
const buildControls = (props)=>(
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price}</strong></p>
        {controls.map((control)=><BuildControl 
        key={control.type}
        label={control.label} 
        type={control.type} 
        addIngredient={props.addIngredient.bind(this,control.type)}
        removeIngredient={props.removeIngredient.bind(this,control.type)}
        removeButtonDisabled={props.disabledRemoveButton[control.type]}
        />)}
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.purchase}
        >ORDER NOW</button>
    </div>
)
export default buildControls;