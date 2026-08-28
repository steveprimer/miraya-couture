import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteCollectionButton from "@/components/admin/DeleteCollectionButton";
import { Plus, Edit3 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function CollectionsDashboard() {
  let collections: any[] = [];

  try {
    const supabase = await createClient();
    const { data: dbCollections, error } = await supabase
      .from("collections")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && dbCollections && dbCollections.length > 0) {
      collections = dbCollections.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        status: c.status || "Active",
        description: c.description || "",
        image: c.image_url || "/images/hero_reframed.jpg",
      }));
    }
  } catch (err) {
    console.error("Supabase collections error:", err);
  }

  // Fallback to initial collections if DB is empty
  if (collections.length === 0) {
    collections = [
      {
        id: "reframed",
        name: "Reframed",
        slug: "reframed",
        status: "Active",
        description: "Architectural silhouettes interwoven with signature cutdana embroidery.",
        image: "/images/hero_reframed.jpg",
      },
      {
        id: "capsule",
        name: "Capsule Collection",
        slug: "capsule-collection",
        status: "Active",
        description: "Contemporary pret sets and tailored separates designed for effortless elegance.",
        image: "/images/rheia_skirt_set.jpg",
      },
      {
        id: "runway",
        name: "From The Runway",
        slug: "from-the-runway",
        status: "Active",
        description: "Haute couture runway statement pieces with cascading drapes.",
        image: "/images/emma_runway.jpg",
      },
      {
        id: "everblooming",
        name: "Everblooming Embroidery",
        slug: "everblooming-embroidery",
        status: "Active",
        description: "Artisanal floral motifs handcrafted in raw silk and micro-tulle.",
        image: "/images/amelia_lehenga.jpg",
      },
    ];
  }

  async function deleteCollectionAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    try {
      const adminSupabase = createAdminClient();
      await adminSupabase.from("collections").delete().eq("id", id);
    } catch (e) {
      console.error("Delete collection error:", e);
    }
    revalidatePath("/admin/collections");
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header matching Serene */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4 border-b border-[#E4E0D7] pb-6">
        <div>
          <h1
            className="text-4xl font-light italic text-[#121212] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Collections
          </h1>
          <p className="text-[#121212]/50 mt-2 text-sm font-light">
            Organize your couture pieces into runway drops, bridal exhibits, and capsule stories.
          </p>
        </div>
        <Link
          href="/admin/collections/new"
          className="bg-[#121212] text-[#F7F5F0] hover:bg-[#7A1C30] px-6 py-3 text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-md shadow-black/10 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </Link>
      </div>

      {collections.length === 0 ? (
        <div className="bg-white border border-[#E4E0D7] p-12 text-center shadow-xs">
          <p className="text-sm text-[#121212]/60 mb-4 font-light">
            No collections created yet.
          </p>
          <Link
            href="/admin/collections/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] text-white text-xs uppercase tracking-widest hover:bg-[#7A1C30] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Collection</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile Data List matching Serene */}
          <div className="md:hidden flex flex-col gap-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white p-4 border border-[#E4E0D7] shadow-xs flex flex-col gap-3"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-16 bg-[#EAE7DF] border border-[#E4E0D7] overflow-hidden shrink-0 relative flex items-center justify-center">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3
                        className="font-normal text-[#121212] text-base truncate"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {collection.name}
                      </h3>
                      <div className="flex gap-1 shrink-0">
                        <Link
                          href={`/admin/collections/${collection.id}/edit`}
                          className="p-1.5 text-[#121212]/50 hover:text-[#121212] hover:bg-black/5 rounded transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <form action={deleteCollectionAction}>
                          <input type="hidden" name="id" value={collection.id} />
                          <DeleteCollectionButton />
                        </form>
                      </div>
                    </div>
                    <span className="text-xs text-[#121212]/60 font-mono mt-0.5 truncate">
                      {collection.slug}
                    </span>
                    <div className="mt-auto pt-2">
                      <span className="text-[9px] font-medium uppercase tracking-widest px-2 py-1 border inline-block bg-emerald-50 text-emerald-800 border-emerald-200">
                        {collection.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Data Table matching Serene */}
          <div className="hidden md:block bg-white border border-[#E4E0D7] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[#E4E0D7] bg-[#F7F5F0]/60">
                    <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest w-24">
                      Cover
                    </th>
                    <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest">
                      Name
                    </th>
                    <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest">
                      Slug
                    </th>
                    <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest text-center">
                      Status
                    </th>
                    <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E0D7]/60">
                  {collections.map((collection) => (
                    <tr
                      key={collection.id}
                      className="hover:bg-[#F7F5F0]/40 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="w-16 h-12 bg-[#EAE7DF] border border-[#E4E0D7] overflow-hidden shrink-0 relative">
                          <Image
                            src={collection.image}
                            alt={collection.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="font-normal text-[#121212] text-sm"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {collection.name}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[#121212]/60 font-mono text-xs">
                        {collection.slug}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest border bg-emerald-50 text-emerald-800 border-emerald-200">
                          {collection.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 items-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/admin/collections/${collection.id}/edit`}
                            className="p-2 text-[#121212]/50 hover:text-[#7A1C30] hover:bg-black/5 transition-all"
                            title="Edit Collection"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <form action={deleteCollectionAction}>
                            <input type="hidden" name="id" value={collection.id} />
                            <DeleteCollectionButton />
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
