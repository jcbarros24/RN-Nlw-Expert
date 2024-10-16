import { useState } from "react";

import { View, FlatList, SectionList, Text} from "react-native";

import { Product } from "@/components/product";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";

export default function Home(){

    const [category, setCategory] = useState('')

    function handleCategorySelect(selectedCateogry: string){
        setCategory(selectedCateogry)
    }


    return(
        <View className="bg-slate-900 pt-8 flex-1">
            <Header title="Faça seu pedido" cartQuantityItems={4}/>

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
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item}) => (
                    <Product data={item}/>
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