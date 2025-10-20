"use client";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import svg from "../../../../public/logo.png";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";

import Link from "next/link";

interface LoginFormProp {
  onSubmit: (prevState: any, formData: FormData) => Promise<{ error?: string }>;
}

export function LoginForm({ onSubmit }: LoginFormProp) {
  const [state, formAction] = useActionState(onSubmit, null);
  return (
    <Card className="max-w-xl mx-auto mt-4">
      <CardHeader className="text-center  flex flex-col items-center">
        <div className="w-26 h-26  rounded-2xl">
          <Image src={svg} alt="logo" width={100} height={100} />
        </div>
        <h1 className="text-2xl font-bold">Seja muito bem vindo</h1>
        <h5>Entre com suas credenciais</h5>
      </CardHeader>
      <CardContent className="">
        <form action={formAction} className=" flex flex-col gap-4 w-full mx-auto p-8">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" />
          <Label htmlFor="password">Senha</Label>
          <Input type="password" name="password" id="password" />
          {state?.error && <p>{state.error}</p>}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-2">
        <div className="flex justify-between gap-3">
          <p>Não possui uma conta?</p>{" "}
          <Link href="/register" className="text-sky-400 hover:text-sky-600 hover:underline ">
            Registre-se
          </Link>
        </div>
        <Link href="/recovery" className="text-sky-400 hover:text-sky-600 hover:underline ">
          Esqueceu a senha?
        </Link>
      </CardFooter>
    </Card>
  );
}
