import { useState, useRef } from "react";

import { Link } from "expo-router";

import { View, FlatList, SectionList, Text} from "react-native";

import { Product } from "@/components/product";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { useCartStore } from "@/stores/cart-store";

export default function Home(){
    const cartStore = useCartStore()
    const [category, setCategory] = useState('')

    const sectionListRef = useRef<SectionList<ProductProps>>(null)

    const cartQuantityItems = cartStore.products.reduce((acumulador, product ) => acumulador + product.quantity, 0)

    function handleCategorySelect(selectedCateogry: string){
        setCategory(selectedCateogry)

        const sectionIndex = CATEGORIES.findIndex(
            (category) => category === selectedCateogry
        )

        if (sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                animated:true,
                sectionIndex,
                itemIndex: 0
            })
            
        }
    }

    return(
        <View className="bg-slate-900 pt-8 flex-1">
            <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems}/>

            <FlatList 
                data={CATEGORIES}
                keyExtractor={item => item}
                renderItem={( {item} ) => <CategoryButton title={item} onPress={() => handleCategorySelect(item)} isSelected={item === category} />}
                horizontal
                className="max-h-10 mt-5"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap:12, paddingHorizontal: 20}}

            />

            <SectionList 
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item}) => (
                    <Link href={`/product/${item.id}`} asChild>     
                        <Product data={item}/>
                    </Link>
                )}
                renderSectionHeader={({section: {title}}) =>(
                    <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>
                )}
                className="p-5 flex-1" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}
            />
        </View>
    )
}