import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
// import axiosInstance from "@/lib/axiosInstane";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;



  try {
   const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;


    console.log(user)

    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome {user.name}</p>
      </div>
    );
  } catch {
    redirect("/login");
  }
}