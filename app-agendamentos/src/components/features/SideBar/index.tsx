"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookDashed, CalendarCheck, Link2, Link2Icon, LinkIcon } from "lucide-react";
import Image from "next/image";
import svg from "../../../../public/logo.png";
const options = [
  {
    title: "Meus eventos",
    url: "home",
    icon: LinkIcon,
  },
  {
    title: "Agendamentos",
    url: "meets",
    icon: CalendarCheck,
  },
];

export function SideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-6 gap-6">
          <SidebarGroupLabel>
            <Image src={svg} alt="logo" width={150} height={150} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="p-4 gap-4">
              {options.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="!h-5 !w-5 stroke-1" />
                        <span className="text-lg font-ligth">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
