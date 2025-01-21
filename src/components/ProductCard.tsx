import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative rounded-lg border p-4 transition-all hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <p className="mt-1 font-medium">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <Button
        className="mt-4 w-full"
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
}