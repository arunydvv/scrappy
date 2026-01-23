import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Layers, Zap, GitBranch } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 px-6 py-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Build, automate, and manage workflows with ease
        </h1>

        <p className="text-muted-foreground max-w-2xl">
          Scrappy helps you design powerful workflows to automate tasks,
          orchestrate processes, and ship faster — without unnecessary
          complexity.
        </p>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/workflows">Get Started</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/docs">View Docs</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Layers className="h-6 w-6" />}
          title="Visual Workflows"
          description="Create and manage workflows with a clear, structured visual model."
        />

        <FeatureCard
          icon={<GitBranch className="h-6 w-6" />}
          title="Flexible Logic"
          description="Design workflows that adapt to your business logic and conditions."
        />

        <FeatureCard
          icon={<Zap className="h-6 w-6" />}
          title="Fast Execution"
          description="Run workflows efficiently with reliable execution and clear status."
        />
      </section>

      {/* CTA */}
      <section className="rounded-lg border p-8 text-center flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">
          Start building your first workflow
        </h2>

        <p className="text-muted-foreground">
          Create a workflow in minutes and iterate as your needs grow.
        </p>

        <Button className="w-fit mx-auto" asChild>
          <Link href="/workflows">Create Workflow</Link>
        </Button>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-6 flex flex-col gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
