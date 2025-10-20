"use client";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import Image from "next/image";
import svg from "../../../../public/logo.png";
import Link from "next/link";
import { useActionState } from "react";

interface SignUpFormProp {
  onSubmit: (prevState: any, formData: FormData) => Promise<{ error?: string }>;
}

export function SignUpForm({ onSubmit }: SignUpFormProp) {
  const [state, formAction] = useActionState(onSubmit, null);
  return (
    <Card className="max-w-xl mx-auto mt-1">
      <CardHeader className="text-center  flex flex-col items-center">
        <div className="w-26 h-26  rounded-2xl">
          <Image src={svg} alt="logo" width={100} height={100} />
        </div>
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <h5>Preencha os campos abaixo para criar sua conta e aproveitar nossos serviços.</h5>
      </CardHeader>
      <CardContent>
        <form action={formAction} className=" flex flex-col gap-2 w-full mx-auto p-8">
          <Label htmlFor="name">Nome</Label>
          <Input name="name" required id="name" type="text" />
          <Label htmlFor="email">Email</Label>
          <Input name="email" required id="email" type="email" />
          <Label htmlFor="password">Senha</Label>
          <Input name="password" required id="password" type="password" />
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input type="password" required id="confirmPassword" name="confirmPassword" />
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
        {state?.error && <p>{state.error}</p>}
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <p>Já possui uma conta?</p>{" "}
        <Link href="/login" className="text-sky-400 hover:text-sky-600 hover:underline ">
          Entrar
        </Link>
      </CardFooter>
    </Card>
  );
}
