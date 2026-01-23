import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Lock, Plus } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col gap-8 p-[2%] h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credentials</h1>
          <p className="text-muted-foreground">
            Securely manage API keys, tokens, and secrets used by your workflows.
          </p>
        </div>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Credential
        </Button>
      </div>

      {/* Info Banner */}
      <Card>
        <CardContent className="flex items-start gap-4 p-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Your secrets are encrypted</p>
            <p className="text-sm text-muted-foreground">
              Credentials are stored securely and are only accessible to
              workflows that explicitly reference them.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent">
            <Key className="h-8 w-8 text-primary" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-lg">No credentials added</p>
            <p className="text-sm text-muted-foreground">
              Add credentials to connect workflows with external services like
              APIs, databases, or cloud providers.
            </p>
          </div>

          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add your first credential
          </Button>
        </div>
      </div>
    </div>
  );
}
