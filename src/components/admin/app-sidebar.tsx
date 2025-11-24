"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ICONS } from "@/constants/icons.enum";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overviews",
      url: "#",
      icon: ICONS.OVERVIEW,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: ICONS.USER,
      items: [
        {
          title: "View Users",
          url: "/admin/users/view-users",
        },
      ],
    },
    {
      title: "Patients",
      url: "#",
      icon: ICONS.PATIENT,
      items: [
        {
          title: "View Patients",
          url: "/patient",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
