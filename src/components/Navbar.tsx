import { ShoppingCart, Search, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              LuxeStore
            </Link>
            <div className="ml-10 space-x-6">
              <Link to="/" className="text-gray-600 hover:text-primary">
                Home
              </Link>
              <Link to="/shop" className="text-gray-600 hover:text-primary">
                Shop
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pr-10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => logout()}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </Button>
                </Link>
              )}
              <Link to="/cart">
                <Button variant="ghost" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}