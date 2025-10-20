"use client";
import { useActionState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import Link from "next/link";

interface PasswordRecoveryFormProp {
  onSubmit: (prev: any, formData: FormData) => Promise<{ error?: string }>;
}

export default function PasswordRecoveryForm({ onSubmit }: PasswordRecoveryFormProp) {
  const [state, formAction] = useActionState(onSubmit, null);
  return (
    <Card className="max-w-xl mx-auto mt-4">
      <CardHeader className="text-center  flex flex-col items-center">
        <h1 className="text-2xl font-bold">Recuperação de senha</h1>
      </CardHeader>
      <CardContent>
        <form className=" flex flex-col gap-2 w-full mx-auto p-8" action={formAction}>
          <Label htmlFor="email">Email</Label>
          <Input name="email" required id="email" type="email" />
          <Button type="submit" className="w-full">
            Enviar
          </Button>
          {state?.error && <p>{state.error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-2">
        <Link href="/login" className="text-sky-400 hover:text-sky-600 hover:underline ">
          Voltar ao Login
        </Link>
      </CardFooter>
    </Card>
  );
}
