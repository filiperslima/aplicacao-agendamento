"use client";
import { use, useActionState, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface NewPasswordFormProp {
  onSubmit: (prev: any, formData: FormData) => Promise<{ error?: string }>;
}

export default function NewPasswordForm({ onSubmit }: NewPasswordFormProp) {
  const [state, formAction] = useActionState(onSubmit, null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = async () => {
      const hash = window.location.hash.slice(1);
      console.log(hash);
      const params = await new URLSearchParams(hash);
      const token = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      setRefreshToken(refreshToken);
      console.log(token);

      setToken(token);
    };
    handleHash();
  }, []);
  return (
    <Card className="max-w-xl mx-auto mt-4">
      <CardHeader className="text-center  flex flex-col items-center">
        <h1 className="text-2xl font-bold">Recuperação de senha</h1>
      </CardHeader>
      <CardContent>
        <form className=" flex flex-col gap-2 w-full mx-auto p-8" action={formAction}>
          <Input name="token" required id="token" type="hidden" value={token || ""} />
          <Input name="refreshToken" required id="refreshToken" type="hidden" value={refreshToken || ""} />
          <Label htmlFor="password">Nova senha</Label>
          <Input name="password" required id="password" type="password" />
          <Label htmlFor="confirmPassword">Repita a nova senha</Label>
          <Input type="password" required id="confirmPassword" name="confirmPassword" />
          <Button type="submit" className="w-full">
            Enviar
          </Button>
          {state?.error && <p>{state.error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
