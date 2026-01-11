import ProductForm from "@/components/admin/ProductForm";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { data } = await supabase.from("products").select("*").eq("id", params.id).single();

    if (!data) notFound();

    return <ProductForm initialData={data as unknown as Product} />;
}
