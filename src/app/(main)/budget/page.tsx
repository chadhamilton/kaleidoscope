'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Minus,
  Trash2,
  FileText,
  Send,
  CheckCircle,
  X,
  ShoppingBag,
} from 'lucide-react';
import { products, estimateItems, formatCurrency } from '@/lib/mockData';

interface EstimateItem {
  productId: string;
  quantity: number;
}

export default function BudgetPage() {
  const [estimateName, setEstimateName] = useState('My Workspace Estimate');
  const [items, setItems] = useState<EstimateItem[]>(estimateItems);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const subtotal = items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shippingRate = 0.08;
  const installationRate = 0.12;
  const shipping = subtotal * shippingRate;
  const installation = subtotal * installationRate;
  const total = subtotal + shipping + installation;

  const handleSubmitProposal = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
          Budget Estimator
        </h1>
        <p className="text-kc-steel mt-1">
          Build your estimate and submit for a detailed proposal.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Estimate Name */}
          <div className="card p-5">
            <label htmlFor="estimateName" className="block text-sm font-medium text-kc-slate mb-2">
              Estimate Name
            </label>
            <input
              id="estimateName"
              type="text"
              value={estimateName}
              onChange={(e) => setEstimateName(e.target.value)}
              className="input w-full"
              placeholder="Enter a name for your estimate"
            />
          </div>

          {/* Product List */}
          <div className="card p-5">
            <h2 className="font-heading text-lg font-semibold text-kc-slate mb-4">
              Products ({items.length})
            </h2>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-kc-mist mx-auto mb-4" />
                <p className="text-kc-mist mb-4">Your estimate is empty</p>
                <Link href="/products" className="btn-primary">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 p-4 bg-kc-pearl/50 rounded-xl border border-kc-cloud/50 hover:border-kc-cloud transition-colors"
                    >
                      {/* Product Image Placeholder */}
                      <div className="w-16 h-16 bg-kc-cloud/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">
                          {product.category === 'Seating' ? '🪑' : product.category === 'Desks' ? '🖥️' : '📦'}
                        </span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-kc-mist uppercase tracking-wider">
                          {product.manufacturer}
                        </p>
                        <h3 className="font-medium text-kc-slate truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-kc-steel">
                          {formatCurrency(product.price)} each
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-kc-cloud rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="p-2 text-kc-steel hover:bg-kc-pearl transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium text-kc-slate border-x border-kc-cloud min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="p-2 text-kc-steel hover:bg-kc-pearl transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[100px]">
                        <p className="font-bold text-kc-slate">
                          {formatCurrency(product.price * item.quantity)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-kc-mist hover:text-kc-error hover:bg-kc-error/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add More Products Link */}
            {items.length > 0 && (
              <Link
                href="/products"
                className="mt-4 flex items-center gap-2 text-kc-steel hover:text-kc-slate transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add more products</span>
              </Link>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-6">
            <h2 className="font-heading text-lg font-semibold text-kc-slate mb-4">
              Estimate Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-kc-steel">Subtotal</span>
                <span className="font-medium text-kc-slate">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-kc-steel">
                  Est. Shipping ({Math.round(shippingRate * 100)}%)
                </span>
                <span className="font-medium text-kc-slate">
                  {formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-kc-steel">
                  Est. Installation ({Math.round(installationRate * 100)}%)
                </span>
                <span className="font-medium text-kc-slate">
                  {formatCurrency(installation)}
                </span>
              </div>
              <div className="pt-3 border-t border-kc-cloud">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-kc-slate">Estimated Total</span>
                  <span className="text-2xl font-bold text-kc-slate">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSubmitProposal}
                disabled={items.length === 0}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Submit for Proposal
              </button>
              <button
                disabled={items.length === 0}
                className="btn-secondary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileText className="w-5 h-5" />
                Download PDF
              </button>
            </div>

            <p className="text-xs text-kc-mist mt-4 text-center">
              Submitting will send your estimate to our design team for a detailed proposal with pricing discounts.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-slide-up">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 p-1 text-kc-mist hover:text-kc-steel transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-kc-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-kc-success" />
              </div>
              <h3 className="font-heading text-xl font-bold text-kc-slate mb-2">
                Estimate Submitted!
              </h3>
              <p className="text-kc-steel mb-6">
                Your estimate &ldquo;{estimateName}&rdquo; has been sent to our design team. We&apos;ll prepare a detailed proposal with pricing discounts and get back to you within 24-48 hours.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
                <Link href="/dashboard" className="btn-primary flex-1">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
