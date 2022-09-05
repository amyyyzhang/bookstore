import{Button,Stack} from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"

import storeItems from "../data/items.json"
import { formatMoney } from "../utilities/formatMoney"

type CartItemProps = {
    id:number
    quantity: number
}

export function CartItem({id, quantity} : CartItemProps) {
    const { removeItem } = useShoppingCart()
    const item = storeItems.find(i => i.id == id)
    if (item == null) return null

    return (
        <Stack direction = "horizontal" gap = {2} className = "d-flex align-items-center" >
            <img src = {item.imgUrl} style = {{ width: "125px",
            height: "100px", objectFit: "cover"}}/>

            <div className = "me-auto">
                <div>
                    {item.name} {quantity > 1 && 
                    <span className = "text-muted" style = {{fontSize: ".65rem"}}> x{quantity}</span>}
                </div>
                <div className = "text-muted" style = {{fontSize: ".75rem"
                }}>{formatMoney(item.price)}

                </div>
            </div> 
            <div> {formatMoney(item.price * quantity)}</div>
            <Button variant = "outline-danger" size = "sm" onClick = {()=> removeItem(item.id)}>&times;
            </Button>
        </Stack>
    )

}