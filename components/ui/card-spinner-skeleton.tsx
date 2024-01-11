import { Loader2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function CardSpinnerSkeleton({ title }: { title: string}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Loader2Icon className="animate-spin h-10 w-10 text-gray-700" />
      </CardContent>
    </Card>
  );
}

