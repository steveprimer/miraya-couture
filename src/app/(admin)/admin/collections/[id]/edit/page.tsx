import { notFound } from "next/navigation";
import EditCollectionForm from "./EditCollectionForm";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminEditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let collection: any = null;

  try {
    const supabase = await createClient();
    const { data: dbCollection, error } = await supabase
      .from("collections")
      .select("*")
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (!error && dbCollection) {
      collection = {
        id: dbCollection.id,
        name: dbCollection.name,
        slug: dbCollection.slug,
        status: dbCollection.status || "Active",
        description: dbCollection.description || "",
        image: dbCollection.image_url || "/images/hero_reframed.jpg",
      };
    }
  } catch (err) {
    console.error("Supabase collection edit query error:", err);
  }

  if (!collection) {
    notFound();
  }

  return <EditCollectionForm collection={collection} />;
}
