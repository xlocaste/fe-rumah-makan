/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Layout from "@/components/RumahMakan/Layout";

const Create = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jam_buka, setJamBuka] = useState("");
  const [jam_tutup, setJamTutup] = useState("");
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/rumah-makan", {
        nama,
        alamat,
        jam_buka,
        jam_tutup,
      });
      router.push("/rumah-makan");
    } catch (error) {
      console.error("Error creating rumah makan:", error);
    }
  };

  return (
    <Layout>
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
              Nama Rumah Makan
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Rumah Makan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="alamat"
              className="block text-gray-700 font-medium mb-1"
            >
              Alamat
            </label>
            <input
              id="alamat"
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Alamat"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="jam_buka"
              className="block text-gray-700 font-medium mb-1"
            >
              Jam Buka
            </label>
            <input
              id="jam_buka"
              type="time"
              value={jam_buka}
              onChange={(e) => setJamBuka(e.target.value)}
              placeholder="Jam Buka"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="jam_tutup"
              className="block text-gray-700 font-medium mb-1"
            >
              Jam Tutup
            </label>
            <input
              id="jam_tutup"
              type="time"
              value={jam_tutup}
              onChange={(e) => setJamTutup(e.target.value)}
              placeholder="Jam Tutup"
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
    </Layout>
  );
};

export default Create;