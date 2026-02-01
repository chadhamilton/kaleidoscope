'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Shield,
  Leaf,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
} from 'lucide-react';
import {
  products,
  formatCurrency,
  formatStatus,
  getStatusColor,
  getStatusBg,
} from '@/lib/mockData';

type AccordionSection = 'features' | 'dimensions' | 'sustainability' | 'warranty';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = products.find((p) => p.id === params.id);

  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState<AccordionSection[]>(['features']);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-kc-mist mb-4">Product not found</p>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const toggleSection = (section: AccordionSection) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const subtotal = product.price * quantity;

  const accordionSections: { id: AccordionSection; title: string; content: React.ReactNode }[] = [
    {
      id: 'features',
      title: 'Features',
      content: (
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-kc-steel">
              <span className="w-1.5 h-1.5 bg-kc-success rounded-full mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'dimensions',
      title: 'Dimensions',
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-kc-pearl rounded-lg">
            <p className="text-xs text-kc-mist uppercase">Width</p>
            <p className="font-medium text-kc-slate">{product.dimensions.width}&quot;</p>
          </div>
          <div className="text-center p-3 bg-kc-pearl rounded-lg">
            <p className="text-xs text-kc-mist uppercase">Depth</p>
            <p className="font-medium text-kc-slate">{product.dimensions.depth}&quot;</p>
          </div>
          <div className="text-center p-3 bg-kc-pearl rounded-lg">
            <p className="text-xs text-kc-mist uppercase">Height</p>
            <p className="font-medium text-kc-slate">{product.dimensions.height}&quot;</p>
          </div>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      content: (
        <div className="flex items-start gap-3">
          <Leaf className="w-5 h-5 text-kc-success flex-shrink-0 mt-0.5" />
          <p className="text-sm text-kc-steel">{product.sustainability}</p>
        </div>
      ),
    },
    {
      id: 'warranty',
      title: 'Warranty',
      content: (
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-kc-info flex-shrink-0 mt-0.5" />
          <p className="text-sm text-kc-steel">{product.warranty} manufacturer warranty</p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-kc-steel hover:text-kc-slate transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="card aspect-square relative overflow-hidden bg-kc-pearl">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(i)}
                title={`View image ${i + 1}`}
                aria-label={`View ${product.name} image ${i + 1}`}
                className={`w-20 h-20 rounded-lg overflow-hidden relative cursor-pointer transition-all ${
                  selectedImage === i
                    ? 'ring-2 ring-kc-slate ring-offset-2'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-kc-mist uppercase tracking-wider mb-1">
              {product.manufacturer}
            </p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
              {product.name}
            </h1>
            <p className="text-kc-steel mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-kc-slate">
              {formatCurrency(product.price)}
            </p>
            <span
              className={`badge ${getStatusColor(product.stock)} ${getStatusBg(product.stock)}`}
            >
              {formatStatus(product.stock)}
            </span>
          </div>

          {/* Finish Selector */}
          {product.finishes && (
            <div>
              <h3 className="text-sm font-medium text-kc-slate mb-3">Finish</h3>
              <div className="flex flex-wrap gap-2">
                {product.finishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFinish === finish
                        ? 'bg-kc-slate text-white'
                        : 'bg-kc-pearl text-kc-steel hover:bg-kc-cloud border border-kc-cloud'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fabric Selector */}
          {product.fabrics && (
            <div>
              <h3 className="text-sm font-medium text-kc-slate mb-3">Fabric</h3>
              <div className="flex flex-wrap gap-2">
                {product.fabrics.map((fabric) => (
                  <button
                    key={fabric}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFabric === fabric
                        ? 'bg-kc-slate text-white'
                        : 'bg-kc-pearl text-kc-steel hover:bg-kc-cloud border border-kc-cloud'
                    }`}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Estimate */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-kc-cloud rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-kc-steel hover:bg-kc-pearl transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-3 font-medium text-kc-slate border-x border-kc-cloud min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-kc-steel hover:bg-kc-pearl transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-sm text-kc-mist">Subtotal</p>
              <p className="text-xl font-bold text-kc-slate">
                {formatCurrency(subtotal)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href="/budget"
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Estimate
            </Link>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-kc-error/10 border-kc-error text-kc-error'
                  : 'border-kc-cloud text-kc-mist hover:text-kc-error hover:border-kc-error'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-kc-pearl/50 rounded-xl">
            <div className="text-center">
              <Clock className="w-5 h-5 mx-auto text-kc-mist mb-1" />
              <p className="text-xs text-kc-mist">Lead Time</p>
              <p className="text-sm font-medium text-kc-slate">{product.leadTime}</p>
            </div>
            <div className="text-center">
              <Shield className="w-5 h-5 mx-auto text-kc-mist mb-1" />
              <p className="text-xs text-kc-mist">Warranty</p>
              <p className="text-sm font-medium text-kc-slate">{product.warranty}</p>
            </div>
            <div className="text-center">
              <Leaf className="w-5 h-5 mx-auto text-kc-mist mb-1" />
              <p className="text-xs text-kc-mist">Eco</p>
              <p className="text-sm font-medium text-kc-slate">Certified</p>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-2">
            {accordionSections.map((section) => (
              <div key={section.id} className="border border-kc-cloud rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-kc-pearl/50 transition-colors"
                >
                  <span className="font-medium text-kc-slate">{section.title}</span>
                  {expandedSections.includes(section.id) ? (
                    <ChevronUp className="w-5 h-5 text-kc-mist" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-kc-mist" />
                  )}
                </button>
                {expandedSections.includes(section.id) && (
                  <div className="px-4 pb-4">{section.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
