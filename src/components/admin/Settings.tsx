import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="My E-commerce Store" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input id="siteDescription" defaultValue="Your one-stop shop for everything" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input id="contactEmail" type="email" defaultValue="contact@example.com" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Email Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="smtpHost">SMTP Host</Label>
            <Input id="smtpHost" defaultValue="smtp.example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="smtpPort">SMTP Port</Label>
            <Input id="smtpPort" defaultValue="587" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-[200px]">
          Save Settings
        </Button>
      </div>
    </div>
  );
}