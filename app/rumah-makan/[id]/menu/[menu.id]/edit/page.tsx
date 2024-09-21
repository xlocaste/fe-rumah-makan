'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const Edit = () => {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState(""); 
  const token = Cookies.get("token");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
      const id = params.id;
      const menuId = params['menu.id'];
    if (id && menuId) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios
            .get(`http://127.0.0.1:8000/api/rumah-makan/${id}/menu/${menuId}`)
            .then((response) => {
              const menu = response.data.data;
              setNama(menu.nama);
              setKategori(menu.kategori);
                })
            .catch((error) => console.error("Error fetching menu:", error));
          }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    const id = params.id;
    const menuId = params['menu.id'];
    e.preventDefault();
    if (id && menuId) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/rumah-makan/${id}/menu/${menuId}`, {
          nama,
          kategori,
        });
        alert("update data berhasil");
        router.push(`/rumah-makan/${params.id}/menu`);
      } catch (error) {
        console.error("Error updating Menu:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Menu Rumah Makan
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama"
              >
                Nama Menu
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Menu"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="Code"
              >
                Kategori
              </label>
              <input
                id="kategori"
                type="text"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                placeholder="Kategori"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;