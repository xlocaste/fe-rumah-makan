"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface  DataRumahMakan{
  id: number;
  nama: string;
  alamat: string;
  jam_buka: string;
  jam_tutup: string;
  created_at: string;
  updated_at: string;
}

const RumahMakan = () => {
  const [daftarRumahMakan, setDaftarRumahMakan] = useState<DataRumahMakan[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("http://localhost:8000/api/rumah-makan")
      .then((response) => setDaftarRumahMakan(response.data.data))
      .catch((error) => console.error("Error fetching Rumah Makan items:", error));
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

  const deletePenugasan = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/rumah-makan/${id}`)
      .then(() =>
        setDaftarRumahMakan(daftarRumahMakan.filter((daftarRumahMakan) => daftarRumahMakan.id !== id))
      )
      .catch((error) => console.error("Error deleting rumah-makan:", error));
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
            {userRole == "admin" && (
              <Link href="rumah-makan/create">
                <button className="mr-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Rumah Makan
                </button>
              </Link>
            )}
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>

            {daftarRumahMakan.length > 0 ? (
              <ul>
                {daftarRumahMakan.map((ItemRumahMakan) => (
                  <li
                    key={ItemRumahMakan.id}
                    className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="text-black">
                        Nama Rumah Makan : {ItemRumahMakan.nama}
                      </p>
                      <p className="text-black">
                        Alamat : {ItemRumahMakan.alamat}
                      </p>
                      <p className="text-black">
                        Jam Buka : {ItemRumahMakan.jam_buka} Sampai {ItemRumahMakan.jam_tutup}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                    {userRole == "admin" && (
                      <Link href={`/rumah-makan/${ItemRumahMakan.id}/edit`}>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                          Edit
                        </button>
                      </Link>
                    )}
                    {userRole == "admin" && (
                      <button
                      onClick={() => deletePenugasan(ItemRumahMakan.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Hapus dari Daftar
                      </button>
                    )}
                    {userRole == "pemilikUsaha" && (
                        <Link href={`/rumah-makan/${ItemRumahMakan.id}/edit`}>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                          Menu
                        </button>
                      </Link>
                    )}
                    </div>
                    
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-bold flex justify-center items-center">
                Daftar Rumah Makan Kosong.
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default RumahMakan;