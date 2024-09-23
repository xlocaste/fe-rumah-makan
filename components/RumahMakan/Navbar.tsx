import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    nama: "home",
    path: "/",
  },
  {
    nama: "rumah makan",
    path: "/rumah-makan",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8 container mx-auto py-4">
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.path}
            className={`${
              link.path === pathname &&
              "text-blue-400 border-b-2 border-blue-400"
            } capitalize font-medium hover:text-blue-700 transition-all`}
          >
            {link.nama}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;