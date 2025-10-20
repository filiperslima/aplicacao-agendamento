import { resetPassword, updatePassword } from "@/app/actions/auth";
import NewPasswordForm from "@/components/features/NewPasswordForm";
import PasswordRecoveryForm from "@/components/features/PasswordRecoveryForm";

export default function ResetPassword() {
  return <NewPasswordForm onSubmit={updatePassword} />;
}
