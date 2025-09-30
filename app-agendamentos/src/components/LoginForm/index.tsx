import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function LoginForm() {
  return (
    <Card className="max-w-xl mx-auto mt-4">
      <CardHeader className="text-center text-2xl font-bold">Entrar</CardHeader>
      <CardContent className=" flex flex-col gap-4 w-full mx-auto p-8">
        <Label>Email</Label>
        <Input type="email" />
        <Label>Senha</Label>
        <Input type="password" />

        <Button>Entrar</Button>
      </CardContent>
    </Card>
  );
}
