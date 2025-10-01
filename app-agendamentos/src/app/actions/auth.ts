"use server";

import { redirect } from "next/navigation";

/**
 * @TODO  Jogar todas esses fetchs para um service
 */

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  console.log(email, password);
  if (!email || !password) {
    return { error: "Por favor, preencha todos os campos necessários para o login" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log(response);
    const data = await response.json();

    console.log(data);
    if (data.status != 200) {
      return { error: data.message };
    }
  } catch (e) {
    return { error: "Ocorreu um erro ao fazer o login. Tente novamente mais tarde." };
  }
  redirect("/home");
}

export async function register(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  console.log(email, password, name);

  if (!email || !password || !name) {
    return { error: "Por favor, preencha todos os campos necessários para o registro" };
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    const data = await response.json();
    if (data.status != 200) {
      return { error: data.message };
    }
    return data;
  } catch (e) {
    return { error: "Ocorreu um erro ao fazer o registro. Tente novamente mais tarde." };
  }
}

// export async function logout(){} -> depóis do home

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  console.log(email);
  if (!email) {
    return { error: "Por favor, digite um email válido" };
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/reset-password`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (data.status != 200) {
      return { error: data.message };
    }
    return data;
  } catch (e) {
    return { error: "Ocorreu um erro ao resetar a senha. Tente novamente mais tarde." };
  }
}

export async function updatePassword(prevState: any, formData: FormData) {
  const newPassword = formData.get("confirmPassword")?.toString();
  const token = formData.get("token")?.toString();
  const refreshToken = formData.get("refreshToken")?.toString();
  console.log(token);
  if (!newPassword) {
    return { error: "Por favor, digite uma nova senha válida" };
  }
  if (token?.length == 0) {
    return { error: "Token inválido" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/reset-password`, {
      method: "PATCH",
      body: JSON.stringify({
        newPassword: newPassword,
        token: token,
        refreshToken: refreshToken,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status != 200) {
      return { error: data.message };
    }
  } catch (e) {
    return { error: "Ocorreu um erro ao atualizar a senha. Tente novamente mais tarde." };
  }
  redirect("/login");
}
