import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component{
    render(){
        let ingredient = null;
        if(this.props.type==='BreadTop'){
            ingredient = 
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
        }else{
            ingredient=<div className={classes[this.props.type]}></div>;
        }
        return ingredient;
    }
    // switch(props.type){
    //     case 'bread-bottom': 
    //         ingredient=<div className={classes.BreadBottom}></div>;
    //         break;
    //     case 'bottom-top':
    //     ingredient = 
    //             <div className={classes.BreadTop}>
    //                 <div className={classes.Seeds1}>></div>
    //                 <div className={classes.Seeds2}>></div>
    //             </div>
    //         break;
    // }
};
BurgerIngredient.PropTypes = {
    type: PropTypes.string.isRequired,
    //type: PropTypes.oneOf(['BreadBottom', 'BreadTop', 'Seeds1', 'Seeds2', 'Meat', 'Cheese', 'Salad', 'Bacon']),
}
export default BurgerIngredient;