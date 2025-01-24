import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase, isSupabaseConnected } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductForm } from "./ProductForm";

export function Products() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isSupabaseConnected()) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Connection Error</AlertTitle>
        <AlertDescription>
          Please connect to Supabase first. Click the Supabase menu in the top right to connect.
        </AlertDescription>
      </Alert>
    );
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newProduct: any) => {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          category: newProduct.category,
          price: parseFloat(newProduct.price),
          description: newProduct.description,
          image: newProduct.image,
        }])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product added",
        description: "New product has been added successfully.",
      });
      setShowAddForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully.",
      });
    },
  });

  const handleAddProduct = (data: any) => {
    addMutation.mutate(data);
  };

  const handleEditProduct = (id: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product ${id}`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Product
        </Button>
      </div>

      <ProductForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={handleAddProduct}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditProduct(product.id)}
                  className="inline-flex items-center gap-1"
                >
                  <Pencil size={16} />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
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
  );
}