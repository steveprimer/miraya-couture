"use client";

import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";

export default function DeleteCollectionButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("Are you sure you want to remove this collection?")) {
          e.preventDefault();
        }
      }}
      className="p-1.5 md:p-2 text-[#121212]/50 hover:text-red-600 hover:bg-black/5 rounded transition-all disabled:opacity-50 cursor-pointer"
      title="Delete Collection"
    >
      {pending ? (
        <span className="text-[10px] text-red-500">...</span>
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
