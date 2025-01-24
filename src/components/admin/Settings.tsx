import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export function Settings() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    site_name: "",
    site_description: "",
    contact_email: "",
    smtp_host: "",
    smtp_port: "",
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (newSettings: typeof formData) => {
      const { error } = await supabase
        .from('settings')
        .upsert(newSettings);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings Saved",
        description: "Your settings have been saved successfully.",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="site_name">Site Name</Label>
            <Input 
              id="site_name" 
              value={formData.site_name} 
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="site_description">Site Description</Label>
            <Input 
              id="site_description" 
              value={formData.site_description}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input 
              id="contact_email" 
              type="email" 
              value={formData.contact_email}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Email Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="smtp_host">SMTP Host</Label>
            <Input 
              id="smtp_host" 
              value={formData.smtp_host}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="smtp_port">SMTP Port</Label>
            <Input 
              id="smtp_port" 
              value={formData.smtp_port}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          className="min-w-[200px]"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}