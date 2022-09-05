import { Offcanvas } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import {Stack} from "react-bootstrap"
import {CartItem} from "../components/CartItem"
import { formatMoney } from "../utilities/formatMoney"
import storeItems from "../data/items.json"


type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen} : ShoppingCartProps) {
    const {closeCart, cartItems} = useShoppingCart()
    return (
    <Offcanvas show ={isOpen} onHide = {closeCart} 
    placement = "end" >
            
            <Offcanvas.Title>
                Cart
            </Offcanvas.Title>
            <Offcanvas.Header closeButton>
            <Offcanvas.Body>
                <Stack gap = {3}>
                    {cartItems.map(item =>
                        <CartItem key = {item.id} {...item} />)}

                    <div className="ms-auto fw-bold fs-5">
                        Total {" "}
                        
                        {formatMoney(cartItems.reduce((total,
                        cartItem) => {
                            const item = storeItems.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity},0)

                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
            
        </Offcanvas.Header>
    </Offcanvas> )
}