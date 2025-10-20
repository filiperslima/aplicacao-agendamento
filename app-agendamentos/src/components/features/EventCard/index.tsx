import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EventCard() {
  return (
    <Card className="border-l-4 border-l-emerald-600 gap-1">
      <CardHeader className="text-2xl font-bold m-0">Nova reunião</CardHeader>
      <CardContent className="w-7xl text-muted-foreground flex items-center justify-between">
        <div className="w-5xl">
          <div>Duração</div>
          <div>Disponibilidade</div>
        </div>
        <div>
          <a href="" className="text-emerald-600 hover:underline font-medium">
            Copia link
          </a>
          {/* <a href="">xsds</a> */}
        </div>
      </CardContent>
    </Card>
  );
}
