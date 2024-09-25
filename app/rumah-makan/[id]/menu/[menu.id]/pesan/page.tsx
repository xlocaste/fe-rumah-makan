'use client'
import axios from "axios";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import Layout from "@/components/RumahMakan/Layout";

const Edit = () => {
  const [jumlah_pesan, setJumlahPesan] = useState("");
  const token = Cookies.get("token");
  const params = useParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    const id = params.id;
    const menuId = params['menu.id'];
    e.preventDefault();
    if (id && menuId) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await axios.post(`http://127.0.0.1:8000/api/pesan-menu/${menuId}`, {
          jumlah_pesan,
        });
        alert("Pemesanan berhasil");
        router.push(`/rumah-makan/${params.id}/menu`);
      } catch (error) {
        console.error("Error Function Pesanan:", error);
      }
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Pesanan
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama"
              >
                Jumlah Pesanan
              </label>
              <input
                id="jumlah_pesan"
                type="number"
                value={jumlah_pesan}
                onChange={(e) => setJumlahPesan(e.target.value)}
                placeholder="Jumlah Pesanan"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Edit;