import React from 'react';
import classes from './Burger.css';
import BugerIngredient from './BugerIngredient/BurgerIngredient'

const burger = (props)=>{
    let transformedIngredients=Object.keys(props.ingredients)
    .map((ing)=>[...Array(props.ingredients[ing])]
    .map((_,i)=><BugerIngredient key={ing+i} type={ing} />))
    .reduce((acc,cur)=>acc.concat(cur),[]);
    if(!transformedIngredients.length){
        transformedIngredients=<p>Please start adding ingredients!</p>
    }
    console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BugerIngredient type="BreadTop" />
           {transformedIngredients}
            <BugerIngredient type="BreadBottom" />
        </div>
    )
}
export default burger; 