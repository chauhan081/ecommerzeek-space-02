import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto flex h-full items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">Welcome to LuxeStore</h1>
            <p className="mt-4 text-xl">
              Discover our curated collection of premium products
            </p>
            <Link to="/shop">
              <Button className="mt-8 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto py-16">
        <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}