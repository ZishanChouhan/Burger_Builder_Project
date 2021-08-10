import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect, useDispatch, useSelector } from 'react-redux';

// const BurgerBuilder = props => {
//   //  constructor(props){
//   //    super(props);
//   //    this.state = {

//   //    }

//   // state = {
//     // ings : null,
//     // {
//     //   salad : 0,
//     //   mayonnaise : 0,
//     //   cheese : 0,
//     //   meat : 0
//     // }
//     // purchasing: false,
//   // }

//   const [purchasing, setPurchasing] = useState(false);
//   const { onInitIngredients } = props;

//   useEffect(() => {
//     onInitIngredients();
//   }, [onInitIngredients]);

//   const updatePurchaseState = (ingredients) => {
    
//     const sum = Object.keys(ingredients)
//       .map(igkey => {
//         return ingredients[igkey];
//       })
//       .reduce((sum, el) => {
//         return sum + el;
//       },0);
    
//       return sum > 0;
//   }
  
//   const purchaseCancelHandler = () => {
//     setPurchasing(false);
//   }
  
//   const purchaseContinueHandler = () => {
//     // alert('You continue!');
//       props.onInitPurchased();
//       props.history.push('/checkout');
//   }

//   const purchaseHandler = () => {
//       if(props.isAuthenticated){
//         setPurchasing(true);
//       }else{
//         props.onSetAuthRedirectPath('/checkout');
//         props.history.push('/auth');
//       }
//   }

//       const disabledInfo = {
//         ...props.ings
//       };
//       for(const key in disabledInfo){
//         disabledInfo[key] = disabledInfo[key] <= 0;
//       }

//       let orderSummary = null;
      
//       let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

//       if(props.ings){

//           burger = (
//               <Aux>
//                   <Burger ingredients = {props.ings}/>
//                   <BuildControls
//                       ingredientAdded={props.onIngredientsAdded}
//                       ingredientRemoved={props.onIngredientsRemoved}
//                       disabled={disabledInfo}
//                       price={props.price}
//                       ordered={purchaseHandler}
//                       isAuth={props.isAuthenticated}
//                       purchasable={updatePurchaseState(props.ings)}/>
//               </Aux>
//           )
          
//           orderSummary = (<OrderSummery 
//               ingredients={props.ings}
//               price={props.price}
//               purchaseCancelled = {purchaseCancelHandler}
//               purchaseContinued = {purchaseContinueHandler}/>
//           )
//       }
      
//       // if(loading){
//       //     orderSummary = <Spinner />
//       // }

//         return(
//         <Aux>
//             <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
//                 {orderSummary}
//             </Modal>
//             {burger}
//         </Aux>
//         );
    
// }  

  
// const mapStateToProps = state => {
//     return{
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchased: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios));

const BurgerBuilder = props => {
  //  constructor(props){
  //    super(props);
  //    this.state = {

  //    }

  // state = {
    // ings : null,
    // {
    //   salad : 0,
    //   mayonnaise : 0,
    //   cheese : 0,
    //   meat : 0
    // }
    // purchasing: false,
  // }

  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients
  });

  const price = useSelector(state => state.burgerBuilder.totalPrice);

  const error = useSelector(state => state.burgerBuilder.ingredients);

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onIngredientsAdded= (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientsRemoved= (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients= useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchased= () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath= (path) => dispatch(actions.setAuthRedirectPath(path));

  // const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      },0);
    
      return sum > 0;
  }
  
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }
  
  const purchaseContinueHandler = () => {
    // alert('You continue!');
      onInitPurchased();
      props.history.push('/checkout');
  }

  const purchaseHandler = () => {
      if(isAuthenticated){
        setPurchasing(true);
      }else{
        onSetAuthRedirectPath('/checkout');
        props.history.push('/auth');
      }
  }

      const disabledInfo = {
        ...ings
      };
      for(const key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
      }

      let orderSummary = null;
      
      let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>

      if(ings){

          burger = (
              <Aux>
                  <Burger ingredients = {ings}/>
                  <BuildControls
                      ingredientAdded={onIngredientsAdded}
                      ingredientRemoved={onIngredientsRemoved}
                      disabled={disabledInfo}
                      price={price}
                      ordered={purchaseHandler}
                      isAuth={isAuthenticated}
                      purchasable={updatePurchaseState(ings)}/>
              </Aux>
          )
          
          orderSummary = (<OrderSummery 
              ingredients={ings}
              price={price}
              purchaseCancelled = {purchaseCancelHandler}
              purchaseContinued = {purchaseContinueHandler}/>
          )
      }
      
      // if(loading){
      //     orderSummary = <Spinner />
      // }

        return(
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
        );
    
}  

  
// const mapStateToProps = state => {
//     return{
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchased: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }


export default withErrorHandler( BurgerBuilder, axios);