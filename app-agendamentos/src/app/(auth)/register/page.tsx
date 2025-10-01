import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { login, register } from "../../actions/auth";
import { SignUpForm } from "@/components/SignUpForm";

export default function Register() {
  return <SignUpForm onSubmit={register} />;
}
