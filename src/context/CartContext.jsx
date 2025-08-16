import {useState} from 'react';


function CartContext() {
const [cart,setCart] = useState({});
  return {setCart,cart}
}

export default CartContext