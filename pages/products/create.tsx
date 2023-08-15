import { NextPageWithLayout } from "../../components/layouts/NextPageWithLayout";
import CustomLayout from "../../components/layouts/CustomLayout";
import { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import { Product } from "@/types/ProductData";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductFormSchema = z.object({
    title: z.string().nonempty('Nama tidak boleh kosong'),
    description: z.string().nonempty('Deskripsi tidak boleh kosong').min(8).max(32),
    price: z.number({invalid_type_error: 'Harga harus dalam bentuk angka.'}).nonnegative('Harga tidak boleh kurang dari 0'),
    discountPercentage: z.number({invalid_type_error: 'Diskon harus dalam bentuk angka.'}).max(50, 'Diskon tidak boleh lebih dari 50%'),
    rating: z.number({invalid_type_error: 'Rating harus dalam bentuk angka.'}).max(5, 'Rating tidak boleh lebih dari 5'),
});

type ProductForm = z.infer<typeof ProductFormSchema>;

const CreateProduct: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<ProductForm>({
        resolver: zodResolver(ProductFormSchema),
        mode: 'onBlur'
    });

    async function onSubmit(form: ProductForm) {
        try {
            setIsSubmitting(true);
            await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
              })
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return <div>
        <h1 className="text-lg font-bold">Product Detail</h1>
        <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input {...register('title')} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <p className="mb-4 text-red-500">{errors.title?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <input {...register('description')} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <p className="mb-4 text-red-500">{errors.description?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Price
                    </label>
                    <input {...register('price', { valueAsNumber: true })} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                    <p className="mb-4 text-red-500">{errors.price?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Discount
                    </label>
                    <input {...register('discountPercentage', { valueAsNumber: true })} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                    <p className="mb-4 text-red-500">{errors.discountPercentage?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Rating
                    </label>
                    <input {...register('rating', { valueAsNumber: true })} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                    <p className="mb-4 text-red-500">{errors.rating?.message}</p>
                </div>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={ `text-white font-bold py-2 px-4 rounded ` + (isSubmitting ? 'bg-blue-200 hover:bg-blue-100' : 'bg-blue-500 hover:bg-blue-700 ') }>
                Submit
            </button>
        </form>
    </div>
}

const CreateProductPage: NextPageWithLayout<Product> = () => {
    return <CreateProduct></CreateProduct>;
}

CreateProductPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <CustomLayout>
            {page}
        </CustomLayout>
    )
}

export default CreateProductPage;