import { useRouter } from "next/router";
import { NextPageWithLayout } from "../layouts/NextPageWithLayout";
import CustomLayout from "../layouts/CustomLayout";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { Product } from "@/types/ProductData";

const ProductDetail: React.FC<Product> = (props) => {
    // You can access the slug from dynamic routing with router.query.
    // const router = useRouter();

    return <div>
        <h1 className="text-lg font-bold">Product Detail</h1>
        <div className="grid grid-cols-1">
            <div>
                Product ID: {props.id}
            </div>
            <div>
                Name: {props.title}
            </div>
            <div>
                Description: {props.description}
            </div>
            <div>
                Price: ${props.price}
            </div>
            <div>
                Discount: {props.discountPercentage}
            </div>
        </div>
    </div>
}

const ProductDetailPage: NextPageWithLayout<Product> = (props) => {
    return <ProductDetail {...props}></ProductDetail>;
}

ProductDetailPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <CustomLayout>
            {page}
        </CustomLayout>
    )
}

export const getServerSideProps: GetServerSideProps<Product> = async (context) => {
    const { id } = context.query;
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    const data = (await response.json() as unknown) as Product;
    return {
        props: data
    };
}

export default ProductDetailPage;