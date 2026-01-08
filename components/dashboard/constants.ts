export interface User {
  id: string;
  name: string;
  role: string;
  country: string;
  uploads: number;
}

export interface Upload {
  id: string;
  title: string;
  type: "Image" | "Video" | "Document";
  owner: string;
  status: "Approved" | "Pending" | "Rejected";
}

export interface ChartData {
  name: string;
  value1: number;
  value2?: number;
}

export interface StatsData {
  label: string;
  value: string;
  icon: string;
  isActive?: boolean;
  isDark?: boolean;
}
export interface ContentItem {
  id: string;
  title: string;
  contentId: string;
  type: "Image" | "Video";
  owner: string;
  updated: string;
  status: "Approved" | "Flagged" | "Pending";
}

export interface UserTableItem {
  id: string;
  name: string;
  email: string;
  country: string;
  role: string;
  status: "Active" | "Suspended";
  uploads: number;
}

export interface FlaggedItem {
  id: string;
  title: string;
  owner: string;
  type: "Document" | "Image" | "Video";
  status: "Flagged" | "Pending";
}
export interface MyUploadItem {
  id: string;
  title: string;
  type: "Image" | "Video" | "Document";
  status: "Approved" | "Pending";
  updated: string;
}

export interface WaitingListItem {
  id: string;
  fullName: string;
  email: string;
  location: string;
  role: string;
  expertise: string;
  experience: string;
}

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: "1",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Approved",
  },
  {
    id: "2",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Flagged",
  },
  {
    id: "3",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Video",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Approved",
  },
  {
    id: "4",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Pending",
  },
  {
    id: "5",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Flagged",
  },
  {
    id: "6",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Video",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Approved",
  },
  {
    id: "7",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Pending",
  },
  {
    id: "8",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Flagged",
  },
  {
    id: "9",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Video",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Approved",
  },
  {
    id: "10",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Pending",
  },
  {
    id: "11",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Flagged",
  },
  {
    id: "12",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Video",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Approved",
  },
  {
    id: "13",
    title: "African architecture House",
    contentId: "AFID023",
    type: "Image",
    owner: "Dim Moi",
    updated: "2025-12-06",
    status: "Pending",
  },
];

export const RECENT_UPLOADS: Upload[] = [
  {
    id: "1",
    title: "African architecture House",
    type: "Image",
    owner: "Dim Moi",
    status: "Approved",
  },
  {
    id: "2",
    title: "African architecture House",
    type: "Image",
    owner: "Dim Moi",
    status: "Approved",
  },
  {
    id: "3",
    title: "African architecture House",
    type: "Image",
    owner: "Dim Moi",
    status: "Approved",
  },
  {
    id: "4",
    title: "African architecture House",
    type: "Image",
    owner: "Dim Moi",
    status: "Pending",
  },
];

export const NEWEST_MEMBERS: User[] = [
  {
    id: "1",
    name: "Dipa roi",
    role: "Marketer",
    country: "India",
    uploads: 77,
  },
  {
    id: "2",
    name: "Dipa roi",
    role: "Marketer",
    country: "India",
    uploads: 77,
  },
  {
    id: "3",
    name: "Dipa roi",
    role: "Marketer",
    country: "India",
    uploads: 77,
  },
  {
    id: "4",
    name: "Dipa roi",
    role: "Marketer",
    country: "India",
    uploads: 77,
  },
  {
    id: "5",
    name: "Dipa roi",
    role: "Marketer",
    country: "India",
    uploads: 77,
  },
  {
    id: "6",
    name: "Dipa roi",
    role: "Marketer",
    country: "India",
    uploads: 77,
  },
];

export const UPLOAD_STATS: ChartData[] = [
  { name: "Jan", value1: 4000, value2: 2400 },
  { name: "Feb", value1: 3000, value2: 1398 },
  { name: "Mar", value1: 2000, value2: 4000 },
  { name: "Apr", value1: 2780, value2: 3908 },
  { name: "May", value1: 1890, value2: 4800 },
  { name: "Jun", value1: 2390, value2: 3800 },
  { name: "Jul", value1: 3490, value2: 4300 },
];

export const ACTIVE_USER_STATS: ChartData[] = [
  { name: "Jan", value1: 65 },
  { name: "Mar", value1: 59 },
  { name: "Jun", value1: 30 },
  { name: "Aug", value1: 45 },
  { name: "Oct", value1: 60 },
  { name: "Dec", value1: 55 },
];

export const STATS_CARDS: StatsData[] = [
  { label: "Total users", value: "3.2K", icon: "user" },
  { label: "Total Uploads", value: "1.2K", icon: "upload" },
  { label: "Active (30d)", value: "1.3K", icon: "activity" },
  { label: "Forums", value: "79", icon: "flag" },
];

export const OVERVIEW_CHART_DATA = [
  { name: "Jan", value: 2700 },
  { name: "Feb", value: 2400 },
  { name: "Mar", value: 3100 },
  { name: "Apr", value: 4200 },
  { name: "May", value: 3500 },
  { name: "Jun", value: 3200 },
  { name: "Jul", value: 2700 },
  { name: "Aug", value: 3400 },
];

export const ACTIVITY_ITEMS = [
  {
    id: "1",
    title: "Maraniu Rinus Photo Set",
    type: "Image",
    status: "Published",
  },
  {
    id: "2",
    title: "Maraniu Rinus Photo Set",
    type: "Image",
    status: "Published",
  },
  {
    id: "3",
    title: "Maraniu Rinus Photo Set",
    type: "Image",
    status: "In Review",
  },
  {
    id: "4",
    title: "Maraniu Rinus Photo Set",
    type: "Image",
    status: "Published",
  },
  {
    id: "5",
    title: "Maraniu Rinus Photo Set",
    type: "Image",
    status: "Rejected",
  },
  {
    id: "6",
    title: "Maraniu Rinus Photo Set",
    type: "Image",
    status: "Published",
  },
];

export const USER_TABLE_ITEMS: UserTableItem[] = [
  {
    id: "1",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "2",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "3",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "4",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Suspended",
    uploads: 58,
  },
  {
    id: "5",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "6",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "7",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "8",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "9",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "10",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "11",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
  {
    id: "12",
    name: "Jon Ibrai",
    email: "Jonlbrai@gmail.com",
    country: "Image",
    role: "Member",
    status: "Active",
    uploads: 58,
  },
];

export const FLAGGED_ITEMS: FlaggedItem[] = [
  {
    id: "1",
    title: "Sedma house photo set",
    owner: "Lebo D",
    type: "Document",
    status: "Flagged",
  },
  {
    id: "2",
    title: "Sedma house photo set",
    owner: "Lebo D",
    type: "Document",
    status: "Flagged",
  },
  {
    id: "3",
    title: "Sedma house photo set",
    owner: "Lebo D",
    type: "Document",
    status: "Flagged",
  },
  {
    id: "4",
    title: "Sedma house photo set",
    owner: "Lebo D",
    type: "Document",
    status: "Flagged",
  },
  {
    id: "5",
    title: "Sedma house photo set",
    owner: "Lebo D",
    type: "Document",
    status: "Flagged",
  },
];

export const MY_UPLOADS_ITEMS: MyUploadItem[] = [
  {
    id: "1",
    title: "African architecture House",
    type: "Image",
    status: "Approved",
    updated: "20/12/25",
  },
  {
    id: "2",
    title: "African architecture House",
    type: "Image",
    status: "Approved",
    updated: "20/12/25",
  },
  {
    id: "3",
    title: "African architecture House",
    type: "Image",
    status: "Approved",
    updated: "20/12/25",
  },
  {
    id: "4",
    title: "African architecture House",
    type: "Image",
    status: "Pending",
    updated: "20/12/25",
  },
  {
    id: "5",
    title: "African architecture House",
    type: "Image",
    status: "Approved",
    updated: "20/12/25",
  },
  {
    id: "6",
    title: "African architecture House",
    type: "Image",
    status: "Approved",
    updated: "20/12/25",
  },
  {
    id: "7",
    title: "African architecture House",
    type: "Image",
    status: "Approved",
    updated: "20/12/25",
  },
  {
    id: "8",
    title: "African architecture House",
    type: "Image",
    status: "Pending",
    updated: "20/12/25",
  },
];

export const WAITING_LIST_ITEMS: WaitingListItem[] = [
  {
    id: "1",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Builder",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "2",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Architect",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "3",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Designer",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "4",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Student",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "5",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Architect",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "6",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Designer",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "7",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Designer",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "8",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Student",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "9",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Student",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "10",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Student",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "11",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Student",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "12",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Architect",
    expertise: "Interior",
    experience: "2 Year",
  },
  {
    id: "13",
    fullName: "Md. Rafiul Islam",
    email: "example@gmail.com",
    location: "South Africa ( Uganda)",
    role: "Architect",
    expertise: "Interior",
    experience: "2 Year",
  },
];
