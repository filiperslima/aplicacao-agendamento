import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export default function Login() {
  const register = (
    <Card className="max-w-xl mx-auto mt-1">
      <CardHeader className="text-center text-2xl font-bold">Cadastre-se</CardHeader>
      <CardContent className=" flex flex-col gap-6 w-full mx-auto p-8">
        <Label>Nome</Label>
        <Input type="text" />
        <Label>Email</Label>
        <Input type="email" />
        <Label>Senha</Label>
        <Input type="password" />
        <Label>Confirmar Senha</Label>
        <Input type="password" />
        <Button>Cadastrar</Button>
      </CardContent>
    </Card>
  );

  return <LoginForm />;
}
