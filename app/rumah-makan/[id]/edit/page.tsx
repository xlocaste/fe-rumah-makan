"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const Edit = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jam_buka, setJamBuka] = useState("");
  const [jam_tutup, setJamTutup] = useState("");
  const token = Cookies.get("token");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    axios
  }, []);

  useEffect(() => {
    // const id = params.id;
    const {id} = params
    if (id) {
      axios
        .get(`http://localhost:8000/api/rumah-makan/${id}`)
        .then((response) => {
          const rumah_makan = response.data.data;
          setNama(rumah_makan.nama);
          setAlamat(rumah_makan.alamat);
          setJamBuka(rumah_makan.jam_buka);
          setJamTutup(rumah_makan.jam_tutup);
            })
        .catch((error) => console.error("Error fetching rumah-makan:", error));
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        await axios.put(`http://localhost:8000/api/rumah-makan/${id}`, {
          nama,
          alamat,
          jam_buka,
          jam_tutup,
        });
        alert("update data berhasil");
        router.push("/rumah-makan");
      } catch (error) {
        console.error("Error updating Rumah Makan:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Rumah Makan
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama"
              >
                Nama Rumah Makan
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Rumah Makan"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="Code"
              >
                Alamat
              </label>
              <input
                id="alamat"
                type="numeric"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="jam_buka"
              >
                Jam Buka
              </label>
              <input
                id="jam_buka"
                type="time"
                value={jam_buka}
                onChange={(e) => setJamBuka(e.target.value)}
                placeholder="Jam Buka"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="jam_tutup"
              >
                Jam Tutup
              </label>
              <input
                id="jam_tutup"
                type="time"
                value={jam_tutup}
                onChange={(e) => setJamTutup(e.target.value)}
                placeholder="Jam Tutup"
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