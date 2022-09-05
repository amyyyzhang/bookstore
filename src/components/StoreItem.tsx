import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import { formatMoney } from "../utilities/formatMoney"


type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const {getItem, increaseItem, decreaseItem, removeItem} = useShoppingCart()
    
    const quantity = getItem(id)
    return <Card className="h-100">
        <Card.Img variant = "top" 
        src = {imgUrl} 
        
        width = "50px"
        
    
        style = {
        {objectFit: "cover",
        flex: 1,
        }} />

        <Card.Body className = "d-flex flex-column">
            <Card.Title className = 
            "d-flex justify-content-between align-items-baseline mb-4">
                <span className = "fs-2">{name}</span>
                <span className = "ms-2 text-muted"> {formatMoney(price)} </span>
            </Card.Title>
            <div className = "mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={()=> increaseItem(id)}>  + Add to Cart</Button>

                ): <div className = "d-flex align-items-center flex-column"
                    style = {{gap:".5 rem"}}>
                        <div className = "d-flex align-items-center justify-content-center"  
                        style = {{gap:".5 rem"}}>
                            <Button onClick={()=> decreaseItem(id)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity}</span>
                                in cart
                            </div>
                                <Button onClick={()=> increaseItem(id)}>+</Button>
                            </div>
                            <Button onClick={()=> removeItem(id)} variant = "danger" size = "sm">Remove</Button>
                        </div>
                       
                    }

            </div>
        </Card.Body>
    </Card>
    

}