import fetcher from "@/functions/fetcher";
import { ProductData } from "@/types/ProductData";
import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";
import CustomLayout from "../../components/layouts/CustomLayout";
import { NextPageWithLayout } from "../../components/layouts/NextPageWithLayout";
import Link from "next/link";

const ProductIndex: React.FC = () => {
    const { data, error, isLoading, isValidating } = useSWR<ProductData>('https://dummyjson.com/products', fetcher);

    if (isValidating) {
        console.log('loading...');
        return <p>
            Loading...
        </p>
    }

    return <div>
        <h1 className="text-lg font-bold">Product List</h1>

        <p>Below are our products:</p>
        <div className="overflow-x-scroll bg-white">
            <table className="table-auto min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products.map(product => {
                        return (<tr key={product.id} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4">
                                <Link className="underline" href={`/products/${product.id}`}>{product.title}</Link>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {product.description}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                ${product.price}
                            </td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

const ProductIndexPage: NextPageWithLayout = () => {
    return <ProductIndex></ProductIndex>;
}

ProductIndexPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <CustomLayout>
            {page}
        </CustomLayout>
    )
}

export default ProductIndexPage;