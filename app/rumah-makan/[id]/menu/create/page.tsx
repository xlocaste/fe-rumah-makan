/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Create = ({ params }: { params: { id: string } }) => {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/menu", {
        nama,
        kategori,
        rumah_makan_id : params.id,
      });
      router.push(`/rumah-makan/${params.id}/menu`);
    } catch (error) {
      console.error("Error creating rumah makan:", error);
    }
  };

  //   console.log('daftarPaslon', daftarPaslon);
  //   console.log('daftarPaslon lenght', daftarPaslon.length);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Rumah Makan
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama Menu
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Menu"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="kategori"
              className="block text-gray-700 font-medium mb-1"
            >
              Kategori
            </label>
            <input
              id="kategori"
              type="text"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              placeholder="Kategori"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;