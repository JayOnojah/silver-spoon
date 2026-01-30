import {
  IconFileText,
  IconSettings,
  IconTypography,
  IconPhoto,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
export const navItems: NavItem[] = [
  {
    id: "template",
    label: "Choose Template",
    icon: <IconFileText className="size-5" />,
  },
  {
    id: "branding",
    label: "Branding",
    icon: <IconSettings className="size-5" />,
  },
  {
    id: "content",
    label: "Content",
    icon: <IconTypography className="size-5" />,
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: <IconPhoto className="size-5" />,
  },
  {
    id: "contact",
    label: "Contact Info",
    icon: <IconPhone className="size-5" />,
  },
  {
    id: "domain",
    label: "Domain & Settings",
    icon: <IconWorld className="size-5" />,
  },
];
