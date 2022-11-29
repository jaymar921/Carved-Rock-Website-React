export default function cartReducer(cart, action){
    switch(action.type){
        case "empty":
            return [];
        case "updateQuantity": {
            const { quantity, sku } = action;
            return (quantity === 0) 
               ? cart.filter((i) => i.sku !== sku)
               : cart.map((i) => (i.sku === sku ? {...i, quantity} : i));
        }
        case "add":
            const { id, sku } = action;
            const itemInCart = cart.find((i) => i.sku === sku);
        
            //itemInCart.quantity++; // DONT DO THIS; WILL CAUSE BUGS
            if(itemInCart){
              // return new array with the mmatching item replaced
              return cart.map( (i) => 
              i.sku === sku ? {...i, quantity: i.quantity + 1} : i);
            }else{
              // return new array with the new item appended
              return [...cart, { id, sku, quantity: 1}];
            }
            
        default:
            throw new Error(`unhandled action ${action.type}`);
    }
}