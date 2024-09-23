import Link from "next/link";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";

const Header = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Cookies.remove("token");

      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <header>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-semibold text-xl">
            RM <span className="text-blue-700"> Irfandi .</span>
          </h1>
        </Link>
        {/* Navbar */}
        <div className="flex items-center gap-8">
          <Navbar />
          {/* Button Logout */}
          <div>
            <Button onClick={logout} className="bg-blue-500 hover:bg-blue-800">
              <IoLogOutOutline />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;