"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase-browser";
import { Plus, Edit2, Trash2, Search, X, Check, Layers, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    product_count?: number;
}

interface FormState {
    name: string;
    slug: string;
    description: string;
    image: string;
}

const EMPTY_FORM: FormState = { name: "", slug: "", description: "", image: "" };

function generateSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch categories with product count via a join
            const { data, error } = await supabase
                .from("categories")
                .select("id, name, slug, description, image")
                .order("name", { ascending: true });

            if (error) throw error;

            // Fetch product counts separately
            const cats = data || [];
            const countsPromises = cats.map(async (cat) => {
                const { count } = await supabase
                    .from("products")
                    .select("*", { count: "exact", head: true })
                    .eq("category_id", cat.id);
                return { ...cat, product_count: count || 0 };
            });

            const catsWithCounts = await Promise.all(countsPromises);
            setCategories(catsWithCounts);
        } catch (err: any) {
            console.error(err);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const openAddForm = () => {
        setEditId(null);
        setFormData(EMPTY_FORM);
        setShowForm(true);
    };

    const openEditForm = (cat: Category) => {
        setEditId(cat.id);
        setFormData({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || "",
            image: cat.image || "",
        });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        setFormData(EMPTY_FORM);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name,
            // Only auto-generate slug if we are adding (not editing existing slug manually)
            slug: editId ? prev.slug : generateSlug(name),
        }));
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
        }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.slug.trim()) {
            toast.error("Name and slug are required");
            return;
        }

        setSaving(true);
        try {
            if (editId) {
                // Update existing
                const { error } = await supabase
                    .from("categories")
                    .update({
                        name: formData.name.trim(),
                        slug: formData.slug.trim(),
                        description: formData.description.trim(),
                        image: formData.image.trim(),
                    })
                    .eq("id", editId);

                if (error) throw error;
                toast.success("Category updated!");
            } else {
                // Insert new
                const { error } = await supabase.from("categories").insert({
                    name: formData.name.trim(),
                    slug: formData.slug.trim(),
                    description: formData.description.trim(),
                    image: formData.image.trim(),
                });

                if (error) throw error;
                toast.success("Category created!");
            }

            closeForm();
            fetchCategories();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to save category");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (cat: Category) => {
        if (cat.product_count && cat.product_count > 0) {
            toast.error(
                `Cannot delete — ${cat.product_count} product(s) are assigned to this category. Reassign them first.`
            );
            return;
        }
        setDeleteId(cat.id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            const { error } = await supabase.from("categories").delete().eq("id", deleteId);
            if (error) throw error;
            toast.success("Category deleted");
            setDeleteId(null);
            fetchCategories();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete category");
        } finally {
            setDeleting(false);
        }
    };

    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">Categories</h1>
                    <p className="text-gray-500 mt-1">
                        Manage product categories shown in the navbar &amp; shop filters
                    </p>
                </div>
                <button
                    onClick={openAddForm}
                    className="btn-primary flex items-center gap-2"
                    id="add-category-btn"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Category</span>
                </button>
            </div>

            {/* Info Banner */}
            <div className="mb-6 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                <p>
                    Categories added here will automatically appear in the{" "}
                    <span className="font-semibold">Navbar Products dropdown</span> and the{" "}
                    <span className="font-semibold">Shop page filters</span>. Products can then be assigned
                    to these categories from the Products admin page.
                </p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Slug (URL)</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-center">Products</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={5} className="px-6 py-5">
                                            <div className="h-5 bg-gray-100 animate-pulse rounded-lg w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 text-gray-400">
                                            <Layers className="w-10 h-10 opacity-30" />
                                            <p className="font-medium text-gray-500">No categories found</p>
                                            <button
                                                onClick={openAddForm}
                                                className="mt-2 text-sm text-[var(--primary)] font-medium hover:underline"
                                            >
                                                + Add your first category
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {cat.image ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={cat.image}
                                                        alt={cat.name}
                                                        className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0 border border-gray-100"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                                                        <Layers className="w-5 h-5 text-[var(--primary)]/60" />
                                                    </div>
                                                )}
                                                <span className="font-semibold text-gray-900">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-mono">
                                                /shop/{cat.slug}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                            {cat.description || <span className="text-gray-300 italic">No description</span>}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                                                    (cat.product_count || 0) > 0
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-400"
                                                }`}
                                            >
                                                {cat.product_count || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditForm(cat)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={closeForm}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 400 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                                        <Layers className="w-5 h-5 text-[var(--primary)]" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editId ? "Edit Category" : "Add New Category"}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeForm}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Category Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        required
                                        placeholder="e.g. Hair Care"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none text-sm transition-all"
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Slug (URL path) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all">
                                        <span className="px-3 py-2.5 bg-gray-50 text-gray-400 text-sm border-r border-gray-200 whitespace-nowrap">
                                            /shop/
                                        </span>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={handleSlugChange}
                                            required
                                            placeholder="hair-care"
                                            className="flex-1 px-3 py-2.5 outline-none text-sm bg-white"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Only lowercase letters, numbers and hyphens
                                    </p>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData((p) => ({ ...p, description: e.target.value }))
                                        }
                                        rows={2}
                                        placeholder="Short description shown on the shop page..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none text-sm transition-all resize-none"
                                    />
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) =>
                                            setFormData((p) => ({ ...p, image: e.target.value }))
                                        }
                                        placeholder="https://... or /images/category.png"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none text-sm transition-all"
                                    />
                                    {formData.image && (
                                        <div className="mt-2 flex items-center gap-2">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                            <span className="text-xs text-gray-400">Preview</span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={closeForm}
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 btn-primary flex items-center justify-center gap-2 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4" />
                                                {editId ? "Save Changes" : "Create Category"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Dialog */}
            <AnimatePresence>
                {deleteId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setDeleteId(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
                        >
                            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-7 h-7 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Category?</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                This action cannot be undone. The category will be removed from the navbar and shop filters.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {deleting ? (
                                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Delete"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
