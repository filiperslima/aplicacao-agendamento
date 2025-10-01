import { resetPassword, updatePassword } from "@/app/actions/auth";
import NewPasswordForm from "@/components/NewPasswordForm";
import PasswordRecoveryForm from "@/components/PasswordRecoveryForm";

export default function ResetPassword() {
  return <NewPasswordForm onSubmit={updatePassword} />;
}
