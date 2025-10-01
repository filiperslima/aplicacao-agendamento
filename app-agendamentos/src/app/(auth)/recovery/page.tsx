import { resetPassword } from "@/app/actions/auth";
import PasswordRecoveryForm from "@/components/PasswordRecoveryForm";

export default function PasswordRecovery() {
  return <PasswordRecoveryForm onSubmit={resetPassword} />;
}
