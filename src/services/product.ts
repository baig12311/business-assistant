import { supabase } from "../lib/supabase";

// get products
export const getProducts =async(businessId:string)=>{
    const {data, error} = await supabase
    .from('products')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', {ascending:false})

    if(error)
    {
        throw new Error(error.message)
    }
    return data
}

// get product by id

export const getProductById = async (productId: string) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};


// delete product
export const deleteProduct = async (productId: string) => {
    const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('image_url')
        .eq('id', productId)
        .single();

    if (fetchError) {
        throw new Error(fetchError.message);
    }

    if (product?.image_url) {
        const imagePath = product.image_url
            .split('/product-images/')[1];

        if (imagePath) {
            const { error: imageError } = await supabase.storage
                .from('product-images')
                .remove([imagePath]);

            if (imageError) {
                throw new Error(imageError.message);
            }
        }
    }

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

    if (error) {
        throw new Error(error.message);
    }
};


// add product
export const addProduct = async ({
    businessId,
    name,
    description,
    price,
    costPrice,
    stockQuantity,
    lowStockThreshold,
    imageUrl,
}: {
    businessId: string;
    name: string;
    description: string;
    price: number;
    costPrice: number;
    stockQuantity: number;
    lowStockThreshold: number;
    imageUrl: string | null;
}) => {
    const { data, error } = await supabase
        .from('products')
        .insert({
            business_id: businessId,
            name,
            description,
            price,
            cost_price: costPrice,
            stock_quantity: stockQuantity,
            low_stock_threshold: lowStockThreshold,
            image_url: imageUrl,
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// update Product
export const updateProduct = async ({
    productId,
    name,
    description,
    price,
    costPrice,
    stockQuantity,
    lowStockThreshold,
    imageUrl,
}: {
    productId: string;
    name: string;
    description: string;
    price: number;
    costPrice: number;
    stockQuantity: number;
    lowStockThreshold: number;
    imageUrl: string | null;
}) => {
    const { data, error } = await supabase
        .from('products')
        .update({
            name,
            description,
            price,
            cost_price: costPrice,
            stock_quantity: stockQuantity,
            low_stock_threshold: lowStockThreshold,
            image_url: imageUrl,
        })
        .eq('id', productId)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};