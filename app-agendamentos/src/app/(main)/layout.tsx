import { SideBar } from "@/components/features/SideBar";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideBar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
