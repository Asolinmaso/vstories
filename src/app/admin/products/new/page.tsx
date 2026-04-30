"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState<{ id: string, name: string, slug: string }[]>([]);
    const [allProducts, setAllProducts] = useState<{ id: string, name: string }[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        short_description: "",
        description: "",
        category: "", // Will default to first category loaded
        stock: "100",
        size: "",
        is_bestseller: false,
        is_new: true,
        ingredients: [] as string[],
        benefits: [] as string[],
        combo_products: [] as string[], // IDs of selected products
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('categories').select('id, name, slug');
            if (data && data.length > 0) {
                setCategories(data);
                // Set default category to the first one if not set
                setFormData(prev => ({ ...prev, category: data[0].slug }));
            }
        };

        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('id, name').order('name');
            if (data) {
                setAllProducts(data);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const [newIngredient, setNewIngredient] = useState("");
    const [newBenefit, setNewBenefit] = useState("");

    const [images, setImages] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Handle numeric fields that might receive "Price ₹250"
        if (name === 'price' || name === 'stock') {
            // Remove non-numeric characters except decimal point
            const sanitized = value.replace(/[^0-9.]/g, '');
            setFormData(prev => ({ ...prev, [name]: sanitized }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Auto-generate slug from name
        if (name === "name") {
            setFormData(prev => ({
                ...prev,
                name: value,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }));
        }
    };

    const addIngredient = () => {
        if (newIngredient.trim()) {
            // Split by comma if user pastes a list
            const items = newIngredient.split(',').map(i => i.trim()).filter(i => i);
            setFormData(prev => ({
                ...prev,
                ingredients: [...prev.ingredients, ...items]
            }));
            setNewIngredient("");
        }
    };

    const removeIngredient = (index: number) => {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const addBenefit = () => {
        if (newBenefit.trim()) {
            // Split by line break or bullet point if user pastes a list
            const items = newBenefit.split(/[\n,•]/).map(b => b.trim()).filter(b => b && b !== '*');
            setFormData(prev => ({
                ...prev,
                benefits: [...prev.benefits, ...items]
            }));
            setNewBenefit("");
        }
    };

    const removeBenefit = (index: number) => {
        setFormData(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }));
    };

    const toggleComboProduct = (productId: string) => {
        setFormData(prev => {
            const current = prev.combo_products || [];
            if (current.includes(productId)) {
                return { ...prev, combo_products: current.filter(id => id !== productId) };
            } else {
                return { ...prev, combo_products: [...current, productId] };
            }
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        // Sanitize filename and prepend timestamp
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const fileName = `${Date.now()}-${sanitizedName}`;
        const filePath = `product-images/${fileName}`;

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('path', filePath);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            setImages([...images, data.url]);

        } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error(`Error uploading image: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = async (index: number, imageUrl: string) => {
        if (!confirm("Are you sure you want to remove this image?")) return;

        try {
            // 1. Update UI immediately
            setImages(prev => prev.filter((_, i) => i !== index));

            // 2. Delete from storage
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: imageUrl }),
            });

            if (!response.ok) {
                console.error("Failed to delete from storage");
                toast.error("Failed to delete image from storage");
            } else {
                toast.success("Image removed");
            }
        } catch (error) {
            console.error("Error removing image:", error);
            toast.error("Error removing image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Get Category ID
            const { data: categoryData } = await supabase
                .from("categories")
                .select("id")
                .eq("slug", formData.category)
                .single();

            if (!categoryData) throw new Error("Invalid category selected");

            // Format Description to include Benefits if they exist
            let finalDescription = formData.description;
            if (formData.benefits.length > 0) {
                finalDescription += `\n\nBenefits:\n` + formData.benefits.map(b => `• ${b}`).join('\n');
            }

            // 2. Insert Product
            const { data: productData, error: productError } = await supabase
                .from("products")
                .insert({
                    name: formData.name,
                    slug: formData.slug,
                    short_description: formData.short_description,
                    description: finalDescription,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    category_id: categoryData.id,
                    images: images,
                    is_new: formData.is_new,
                    is_bestseller: formData.is_bestseller,
                    ingredients: formData.ingredients,
                    combo_product_ids: (formData.category === 'combos' || formData.category === 'combo') ? formData.combo_products : null,
                })
                .select()
                .single();

            if (productError) throw productError;

            // 3. Insert Product Size (if provided)
            if (formData.size) {
                const { error: sizeError } = await supabase
                    .from("product_sizes")
                    .insert({
                        product_id: productData.id,
                        label: formData.size,
                        price: parseFloat(formData.price),
                    });

                if (sizeError) {
                    console.error("Error adding size:", sizeError);
                }
            }

            // Use window.location to force a hard refresh which might be safer than next/router in some abort cases
            // But strict standard is router.push then refresh
            router.push("/admin/products");
            router.refresh();
            toast.success("Product created successfully!");

        } catch (error: any) {
            console.error("Error creating product:", error);
            toast.error(error.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Basic Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="e.g. Herbal Hair Oil"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <textarea
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="Brief summary for product card..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="Product description..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Pricing & Inventory</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input
                                    type="text"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Size / Volume (e.g. 100ml)</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="e.g. 100ml, 50g"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Media & Organization */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Images</h3>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    disabled={uploading}
                                />
                                {uploading ? (
                                    <div className="text-gray-500">Uploading...</div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Click to upload image</p>
                                    </>
                                )}
                            </div>

                            {images.length > 0 && (
                                <div className="grid grid-cols-2 gap-2">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-100">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img}
                                                alt="Product Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx, img)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors z-10"
                                                title="Remove Image"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Organization</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {(formData.category === 'combos' || formData.category === 'combo') && (
                            <div className="pt-4 border-t border-gray-100">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Products for Combo</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                                    {allProducts.map(p => (
                                        <div key={p.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`prod-${p.id}`}
                                                checked={formData.combo_products?.includes(p.id)}
                                                onChange={() => toggleComboProduct(p.id)}
                                                className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                                            />
                                            <label htmlFor={`prod-${p.id}`} className="text-sm text-gray-700 cursor-pointer">
                                                {p.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Select the individual products included in this bundle.</p>
                            </div>
                        )}
                        {/* Bestseller Toggle */}
                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="is_bestseller"
                                name="is_bestseller"
                                checked={formData.is_bestseller}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_bestseller: e.target.checked }))}
                                className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                            />
                            <label htmlFor="is_bestseller" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                                Mark as Best Seller
                            </label>
                        </div>
                        {/* New Toggle */}
                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="is_new"
                                name="is_new"
                                checked={formData.is_new}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_new: e.target.checked }))}
                                className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                            />
                            <label htmlFor="is_new" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                                Mark as New
                            </label>
                        </div>
                    </div>

                    {/* Ingredients Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Ingredients</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="Add ingredient..."
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                                />
                                <button
                                    type="button"
                                    onClick={addIngredient}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.ingredients.map((ing, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                        {ing}
                                        <button type="button" onClick={() => removeIngredient(idx)} className="hover:text-red-500">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Benefits (Added to Description)</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newBenefit}
                                    onChange={(e) => setNewBenefit(e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="Add benefit..."
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                                />
                                <button
                                    type="button"
                                    onClick={addBenefit}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {formData.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start justify-between p-2 bg-gray-50 rounded-lg text-sm">
                                        <span>• {benefit}</span>
                                        <button type="button" onClick={() => removeBenefit(idx)} className="text-gray-400 hover:text-red-500 ml-2">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 lg:col-span-3"
                    >
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
