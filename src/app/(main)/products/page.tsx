'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Grid3X3,
  List,
  Heart,
  Clock,
  ChevronDown,
} from 'lucide-react';
import {
  products,
  categories,
  manufacturers,
  formatCurrency,
  formatStatus,
  getStatusColor,
  getStatusBg,
} from '@/lib/mockData';

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price_asc' | 'price_desc' | 'manufacturer';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'name', label: 'Name A-Z' },
    { id: 'price_asc', label: 'Price: Low to High' },
    { id: 'price_desc', label: 'Price: High to Low' },
    { id: 'manufacturer', label: 'Manufacturer' },
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesManufacturer =
        !selectedManufacturer || product.manufacturer === selectedManufacturer;
      return matchesSearch && matchesCategory && matchesManufacturer;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'manufacturer':
          return a.manufacturer.localeCompare(b.manufacturer);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
          Products
        </h1>
        <p className="text-kc-steel mt-1">
          Browse our curated selection of premium office furniture.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white border border-kc-cloud rounded-lg px-4 py-3">
        <Search className="w-5 h-5 text-kc-mist" />
        <input
          type="text"
          placeholder="Search products by name, manufacturer, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-kc-slate placeholder:text-kc-mist"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="card p-5 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-kc-slate mb-3">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedCategory
                      ? 'bg-kc-slate text-white'
                      : 'text-kc-steel hover:bg-kc-pearl'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === category.name
                        ? 'bg-kc-slate text-white'
                        : 'text-kc-steel hover:bg-kc-pearl'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`text-xs ${
                        selectedCategory === category.name
                          ? 'text-white/70'
                          : 'text-kc-mist'
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manufacturers */}
            <div>
              <h3 className="font-medium text-kc-slate mb-3">Manufacturers</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedManufacturer(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedManufacturer
                      ? 'bg-kc-slate text-white'
                      : 'text-kc-steel hover:bg-kc-pearl'
                  }`}
                >
                  All Manufacturers
                </button>
                {manufacturers.map((manufacturer) => (
                  <button
                    key={manufacturer}
                    onClick={() => setSelectedManufacturer(manufacturer)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedManufacturer === manufacturer
                        ? 'bg-kc-slate text-white'
                        : 'text-kc-steel hover:bg-kc-pearl'
                    }`}
                  >
                    {manufacturer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-kc-mist">
              {filteredProducts.length} products found
            </p>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-kc-cloud rounded-lg text-sm text-kc-steel hover:bg-kc-pearl transition-colors"
                >
                  {sortOptions.find((o) => o.id === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSortDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSortDropdown(false)}
                    />
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-kc-cloud z-20 overflow-hidden">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === option.id
                              ? 'bg-kc-slate text-white'
                              : 'text-kc-steel hover:bg-kc-pearl'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white border border-kc-cloud rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-kc-slate text-white'
                      : 'text-kc-mist hover:bg-kc-pearl'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-kc-slate text-white'
                      : 'text-kc-mist hover:bg-kc-pearl'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={`card group animate-slide-up ${
                  viewMode === 'list' ? 'flex items-center gap-6' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Product Image */}
                <div
                  className={`relative bg-kc-pearl overflow-hidden ${
                    viewMode === 'grid'
                      ? 'aspect-square rounded-t-2xl'
                      : 'w-32 h-32 rounded-l-2xl flex-shrink-0'
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={viewMode === 'grid' ? '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw' : '128px'}
                  />
                </div>

                {/* Content */}
                <div className={`p-5 flex-1 ${viewMode === 'list' ? 'py-4' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-kc-mist uppercase tracking-wider mb-1">
                        {product.manufacturer}
                      </p>
                      <h3 className="font-medium text-kc-slate group-hover:text-kc-blue-dark transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-kc-mist mt-1">{product.category}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        favorites.includes(product.id)
                          ? 'text-kc-error bg-kc-error/10'
                          : 'text-kc-mist hover:text-kc-error hover:bg-kc-error/10'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(product.id) ? 'fill-current' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-kc-slate">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        className={`badge text-xs ${getStatusColor(product.stock)} ${getStatusBg(product.stock)}`}
                      >
                        {formatStatus(product.stock)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-xs text-kc-mist">
                    <Clock className="w-3 h-3" />
                    <span>Lead time: {product.leadTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="card p-12 text-center">
              <Search className="w-12 h-12 text-kc-mist mx-auto mb-4" />
              <p className="text-kc-mist">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
