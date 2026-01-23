import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, CheckCircle } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8 p-[2%] h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription, usage, and payment details.
          </p>
        </div>

        <Button variant="outline">
          <CreditCard className="h-4 w-4 mr-2" />
          Manage Payment Method
        </Button>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Current Plan
            <Badge variant="secondary">Free</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Free Plan</p>
              <p className="text-sm text-muted-foreground">
                Ideal for getting started with basic workflows.
              </p>
            </div>

            <Button>
              Upgrade Plan
            </Button>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <Feature text="Up to 5 workflows" />
            <Feature text="Community support" />
            <Feature text="Basic execution limits" />
          </ul>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UsageStat label="Workflows" value="3 / 5" />
          <UsageStat label="Executions this month" value="120 / 500" />
          <UsageStat label="Active credentials" value="2" />
        </CardContent>
      </Card>

      {/* Invoices / History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          No invoices yet. Upgrade to a paid plan to unlock billing history.
        </CardContent>
      </Card>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle className="h-4 w-4 text-primary" />
      {text}
    </li>
  );
}

function UsageStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
