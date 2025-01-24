import { Card } from "@/components/ui/card";
import { BarChart, DollarSign, Package, Users } from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: DollarSign,
      description: "+20.1% from last month",
    },
    {
      title: "Products",
      value: "2,345",
      icon: Package,
      description: "+180 new products",
    },
    {
      title: "Active Users",
      value: "12,234",
      icon: Users,
      description: "+10% from last week",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="mt-1 text-2xl font-semibold">{stat.value}</h3>
                <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
              </div>
              <div className="rounded-full bg-gray-100 p-3">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium">Recent Sales</h3>
        <div className="mt-4 h-[300px]">
          <BarChart className="h-full w-full text-gray-500" />
        </div>
      </Card>
    </div>
  );
}