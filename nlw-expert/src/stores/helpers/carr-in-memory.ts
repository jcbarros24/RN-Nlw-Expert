import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function Add(products: ProductCartProps[], newProduct: ProductProps){
    const existingProduct = products.find(({ id }) => newProduct.id === id)

    if (existingProduct) {
        return products.map((product)=> product.id  === existingProduct.id ?
    {...product, quantity: product.quantity + 1} : product )
    }

    return [...products, { ... newProduct, quantity: 1}]
}

export function Remove(products: ProductCartProps[], productRemovedId: string){
    const updateProducts = products.map((product) =>
    product.id === productRemovedId ? {
        ...product,
        quantity: product.quantity > 1 ? product.quantity - 1 : 0
    } : product)

    return updateProducts.filter((product) => product.quantity > 0)
}