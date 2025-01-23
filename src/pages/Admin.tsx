import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/data/products";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  const location = useLocation();

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Product",
      description: `Editing product ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Product",
      description: `Deleting product ${id}`,
    });
  };

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Adding new product",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {location.pathname === "/admin"
                  ? "Dashboard"
                  : location.pathname.split("/").pop()?.charAt(0).toUpperCase() +
                    location.pathname.split("/").pop()?.slice(1)}
              </h1>
              <p className="mt-2 text-gray-600">
                {location.pathname === "/admin"
                  ? "Welcome to your admin dashboard"
                  : `Manage your ${location.pathname.split("/").pop()}`}
              </p>
            </div>
            {location.pathname.includes("/products") && (
              <Button
                onClick={handleAddProduct}
                className="flex items-center gap-2"
              >
                <Plus size={20} />
                Add New Product
              </Button>
            )}
          </div>

          {(location.pathname === "/admin/products" ||
            location.pathname === "/admin") && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">All Products</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product.id)}
                          className="inline-flex items-center gap-1"
                        >
                          <Pencil size={16} />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}