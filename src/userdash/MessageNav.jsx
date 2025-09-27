
"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {  HiUser } from "react-icons/hi";

export function MessageNav() {
  return (
    <Sidebar aria-label="Sidebar with content separator example" 
    className="mb-0 bottom-0"
    >
        <div>
            <img src="" alt="" />
            <input type="text" 
            className="px-2 py-2 w-full rounded-lg border border-1-gray-500 focus:border-green-500"
            placeholder="Search/Start New Chat"
            />
        </div>
      <SidebarItems > 
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiUser}>
            User 1
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            User 2
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            User 3
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            User 4
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            User 5
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            User 5
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            User 6
          </SidebarItem>
        </SidebarItemGroup>
        {/* <SidebarItemGroup>
          <SidebarItem href="#" icon={HiUser}>
            Upgrade to Pro
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Documentation
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Help
          </SidebarItem>
        </SidebarItemGroup> */}
      </SidebarItems>
    </Sidebar>
  );
} export default MessageNav