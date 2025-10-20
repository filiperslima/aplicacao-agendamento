import { LoginForm } from "@/components/features/LoginForm";
import { login } from "../../actions/auth";

export default function Login() {
  return <LoginForm onSubmit={login} />;
}
