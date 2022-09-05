import { useContext, createContext, ReactNode, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart"
import {useLocalStorage} from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children:ReactNode
}
type cartItem = {
    id: number
    quantity: number
}

type shoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    
    getItem: (id: number) => number
    increaseItem: (id: number) => void
    decreaseItem: (id: number) => void
    removeItem: (id: number) => void
    cartQuantity: number
    cartItems: cartItem[]
}

const shoppingCartContext = createContext({} as shoppingCartContext)


export function useShoppingCart() {
    return useContext(shoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<cartItem[]>("shopping-cart", [])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0 )
    
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)


    
    function getItem(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseItem(id:number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)== null) {
                return [...currItems, {id, quantity:1}] }
                else{ 
                    return currItems.map(item => {
                        if (item.id == id) {
                            return {...item, quantity: item.quantity + 1}
                        } else{
                            return item
                        }
                    })

            } 
        })
    }

    function decreaseItem(id:number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id) 
            }
            else{ 
                    return currItems.map(item => {
                        if (item.id == id) {
                            return {...item, quantity: item.quantity - 1}
                        } else{
                            return item
                        }
                    })

            } 
        })
    }


    function removeItem(id:number) {
        setCartItems(currItems => {
            return currItems.filter(item =>  item.id !== id)
        } )
    }




    return (
         <shoppingCartContext.Provider 
         value = {{
             getItem, 
             increaseItem, 
             decreaseItem, 
             removeItem,
             openCart,
             closeCart,
             cartItems,
             cartQuantity,
             }}>
        {children}
        <ShoppingCart isOpen = {isOpen}  />

    </shoppingCartContext.Provider>
    )
}