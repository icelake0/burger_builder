import React , {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES={
    'Meat':300,
    'Cheese':150,
    'Salad':100,
    'Bacon':200 
}
class BurgerBuilder extends Component{
    state={
        ingredients:{
            'Meat':0,
            'Cheese':0,
            'Salad':0,
            'Bacon':0
        },
        totalPrice:1000,
        purchasable:false,
        purchasing:false
    }
    updatePurchasable = (ingredients)=>{
        const sum=Object.values(ingredients).reduce((arr,cur)=>arr+=cur , 0);
        //console.log('sum',sum);
        const newPurchasable=sum>0;
        //console.log('newPurchasable',newPurchasable);
        this.setState({purchasable:newPurchasable});
        console.log(this.state.purchasable)
    }
    purchaseHandlar= ()=>{
        this.setState({purchasing:true});
    }
    canclepurchaseHandlar = ()=>{
        this.setState({purchasing:false});
    }
    addIngredientHandler = (type)=>{
        const oldCount= this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;
        const oldPrice=this.state.totalPrice;
        const additionalPrice= INGREDIENT_PRICES[type];
        const newPrice=oldPrice+additionalPrice;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchasable(updatedIngredients);
    }
    removeIngredientHandler = (type)=>{
        if(this.state.ingredients[type]){
            const oldCount= this.state.ingredients[type];
            const updatedCount = oldCount-1;
            const updatedIngredients = {...this.state.ingredients}
            updatedIngredients[type] = updatedCount;
            const oldPrice=this.state.totalPrice;
            const removedPrice= INGREDIENT_PRICES[type];
            const newPrice=oldPrice-removedPrice;
            this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
            this.updatePurchasable(updatedIngredients);
        }
    }
    render(){
        let disabledRemoveButton={...this.state.ingredients};
        for(let key in disabledRemoveButton){
            disabledRemoveButton[key] = disabledRemoveButton[key]<=0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.canclepurchaseHandlar}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disabledRemoveButton={disabledRemoveButton}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                purchase={this.purchaseHandlar}
                />
            </Aux>
        )
    }
}
export default BurgerBuilder; 
