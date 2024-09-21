"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

interface TableRumahMakan {
    id: number;
    nama: string;
    alamat: string;
    jam_buka: string;
    jam_tutup: string;
    created_at: string;
    updated_at: string;
}
interface  DataMenu{
    id: number;
    nama: string;
    kategori: string;
    stok: string;
    rumah_makan_id: string;
    created_at: string;
    updated_at: string;
    rumah_makan: TableRumahMakan;
}

const Menu = () => {
  const [daftarMenu, setDaftarMenu] = useState<DataMenu[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const token = Cookies.get("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const {id} = params
    axios
      .get(`http://localhost:8000/api/rumah-makan/${id}/menu`)
      .then((response) => setDaftarMenu(response.data.data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const token = Cookies.get("token");
          if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const userResponse = await axios.get("http://localhost:8000/api/user");
            setUserRole(userResponse.data.role);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unused-expressions
    axios
  }, []);

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Cookies.remove("token");

      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const deleteMenu = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/menu/${id}`)
      .then(() =>
        setDaftarMenu(daftarMenu.filter((daftarMenu) => daftarMenu.id !== id))
      )
      .catch((error) => console.error("Error deleting menu:", error));
    alert("hapus data berhasil");
  };

  return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Data Rumah Makan
            </h1>
            <div className="mb-6">
            {userRole == "pemilikUsaha" && (
              <Link href="menu/create">
                <button className="mr-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Menu
                </button>
              </Link>
            )}
              <Link href="/rumah-makan">
                <button className="mr-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Rumah Makan
                </button>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>

            {daftarMenu.length > 0 ? (
              <ul>
                {daftarMenu.map((ItemRumahMakan) => (
                  <li
                    key={ItemRumahMakan.id}
                    className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                  <p className="text-black">
                        Rumah Makan : {ItemRumahMakan.rumah_makan.nama}
                      </p>
                      <p className="text-black">
                        Nama Menu : {ItemRumahMakan.nama}
                      </p>
                      <p className="text-black">
                        Kategori : {ItemRumahMakan.kategori}
                      </p>
                      <p className="text-black">
                        Stok : {ItemRumahMakan.stok}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                    {userRole == "pemilikUsaha" && (
                      <Link href={`/rumah-makan/${ItemRumahMakan.rumah_makan.id}/menu/${ItemRumahMakan.id}/edit`}>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                          Edit
                        </button>
                      </Link>
                    )}
                    {userRole == "pemilikUsaha" && (
                      <button
                      onClick={() => deleteMenu(ItemRumahMakan.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Hapus dari Daftar
                      </button>
                    )}
                    </div>
                    
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-bold flex justify-center items-center">
                Daftar Menu Kosong.
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Menu;