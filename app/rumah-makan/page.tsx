"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import Layout from "@/components/RumahMakan/Layout";

interface  DataRumahMakan{
  id: number;
  nama: string;
  alamat: string;
  jam_buka: string;
  jam_tutup: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const RumahMakan = () => {
  const [daftarRumahMakan, setDaftarRumahMakan] = useState<DataRumahMakan[]>([]);
  const [tutupSementara, setTutupSementara] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get("http://localhost:8000/api/rumah-makan")
      .then((response) => {
        const DataWithStatus = response.data.data.map((item: DataRumahMakan) => {
          const currentTime = new Date();
          const openingTime = new Date();
          const closingTime = new Date();

          const [bukaHour, bukaMinute] = item.jam_buka.split(':').map(Number);
          const [tutupHour, TutupMinute] = item.jam_tutup.split(':').map(Number);

          openingTime.setHours(bukaHour, bukaMinute, 0);
          closingTime.setHours(tutupHour, TutupMinute, 0);

          if (tutupSementara) {
            item.status = 'Tutup Sementara';
          } else {
            item.status = (currentTime >= openingTime && currentTime <= closingTime) ? 'Buka' : 'Tutup';
          }
          return item;
        });
        setDaftarRumahMakan(DataWithStatus);
      })
      .catch((error) => console.error("Error fetching Rumah Makan items:", error));
  }, [tutupSementara]);

  const toggleTutupSementara = () => {
    setTutupSementara(!tutupSementara);
  };

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
  }, []);

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
    <Layout>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Data Rumah Makan
            </h1>
            <div className="mb-6">
            {userRole == "admin" && (
              <Link href="rumah-makan/create">
                <button className="mr-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                  Tambah Rumah Makan
                </button>
              </Link>
            )}
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
                      <p className="text-white pt-2 pb-2 text-center bg-indigo-600 rounded-lg">
                        {ItemRumahMakan.status}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/rumah-makan/${ItemRumahMakan.id}/edit`}>
                        <button type="button" className="px-4 py-1 border-indigo-600 text-indigo-600  rounded-md hover:bg-indigo-600 hover:text-white">
                          Edit
                        </button>
                      </Link>
                        <Link href={`/rumah-makan/${ItemRumahMakan.id}/menu`}>
                        <button className="px-4 py-1 border-indigo-600 text-indigo-600  rounded hover:bg-indigo-600 hover:text-white">
                          Menu
                        </button>
                      </Link>
                      <button onClick={toggleTutupSementara} className="px-4 py-1 border-indigo-600 text-indigo-600  rounded hover:bg-indigo-600 hover:text-white">
                        {tutupSementara ? 'Buka Kembali' : 'Tutup Sementara'}
                      </button>
                      {userRole == "admin" && (
                      <button
                      onClick={() => deletePenugasan(ItemRumahMakan.id)}
                      className="px-4 py-1 bg-indigo-600 border-indigo-600 text-white rounded hover:bg-indigo-800 hover:text-white"
                      >
                        Hapus
                      </button>
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
    </Layout>
  );
};

export default RumahMakan;