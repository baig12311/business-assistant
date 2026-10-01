import { router } from "expo-router"
export const quickActions=[
    {
        title:'Create Order',
        name:'receipt-outline',
        type:'Ionicons',
        onPress: ()=>router.push('/newOrder/NewOrder')
    },
    {
        title:'Add Product',
        name:'cube-outline',
        type:'Ionicons',
        onPress: ()=>router.push('/addProduct/AddProduct')
    },
    {
        title:'Add Customer',
        name:'person-add-outline',
        type:'Ionicons',
        onPress:()=>router.push('/addCustomer/AddCustomer')
    },
    {
        title:'Track Inventory',
        name:'file-tray-full-outline',
        type:'Ionicons',
        onPress:()=>router.push('/inventory/Inventory')
    }
]