// src/admin/AdminDashboard.jsx  (tam & temiz)
import React, { useState, useEffect } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import { database } from "../firebase";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState({});
  const [form, setForm] = useState({
    girisTarihi: "",
    cikisTarihi: "",
    musteriAdi: "",
    kapora: "",
    kalan: "",
    toplamUcret: "",
    notlar: "",
  });
  const [editId, setEditId] = useState(null);

  /* ------------------- VERİ OKUMA ------------------- */
  useEffect(() => {
    const dbRef = ref(database, "/reservations"); 
    const unsubscribe = onValue(dbRef, (snap) => {
      setBookings(snap.val() || {});
    });
    return () => unsubscribe();
  }, []);

  /* ------------------- FORM HANDLER ------------------- */
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      kapora: Number(form.kapora) || 0,
      kalan: Number(form.kalan) || 0,
      toplamUcret: Number(form.toplamUcret) || 0,
    };

    try {
      if (editId) {
      await update(ref(database, `/reservations/${editId}`), data); 
      } else {
      await push(ref(database, "/reservations"), data); 
      }
      setForm({
        girisTarihi: "",
        cikisTarihi: "",
        musteriAdi: "",
        kapora: "",
        kalan: "",
        toplamUcret: "",
        notlar: "",
      });
      setEditId(null);
    } catch (err) {
      alert("Yazma hatası: " + err.message);
    }
  };

  /* ------------------- DÜZENLE / SİL ------------------- */
  const handleEdit = (id) => {
    const r = bookings[id];
    if (!r) return;
    setForm({ ...r });
    setEditId(id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await remove(ref(database, `/reservations/${id}`));
    } catch (err) {
      alert("Silme hatası: " + err.message);
    }
  };

  /* ------------------- UI ------------------- */
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Paneli – Rezervasyonlar</h1>

      {/* ------- FORM ------- */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
        {[
          ["musteriAdi", "Müşteri Adı"],
          ["girisTarihi", "Giriş (dd.MM.yyyy)"],
          ["cikisTarihi", "Çıkış (dd.MM.yyyy)"],
          ["kapora", "Kapora"],
          ["kalan", "Kalan"],
          ["toplamUcret", "Toplam Ücret"],
        ].map(([name, ph]) => (
          <input
            key={name}
            name={name}
            placeholder={ph}
            value={form[name]}
            onChange={handleChange}
            className="border p-2 rounded"
            required={["musteriAdi", "girisTarihi", "cikisTarihi"].includes(
              name
            )}
          />
        ))}
        <textarea
          name="notlar"
          placeholder="Notlar"
          value={form.notlar}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {editId ? "Güncelle" : "Ekle"}
        </button>
      </form>

      {/* ------- TABLO ------- */}
      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            {[
              "Müşteri",
              "Giriş",
              "Çıkış",
              "Kapora",
              "Kalan",
              "Toplam",
              "Notlar",
              "İşlem",
            ].map((h) => (
              <th key={h} className="border p-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(bookings).map(([id, r]) => (
            <tr key={id} className="hover:bg-gray-50">
              <td className="border p-2">{r.musteriAdi}</td>
              <td className="border p-2">{r.girisTarihi}</td>
              <td className="border p-2">{r.cikisTarihi}</td>
              <td className="border p-2">{r.kapora}</td>
              <td className="border p-2">{r.kalan}</td>
              <td className="border p-2">{r.toplamUcret}</td>
              <td className="border p-2">{r.notlar}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(id)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
          {Object.keys(bookings).length === 0 && (
            <tr>
        <td colSpan="8" className="text-center p-4 text-gray-500">
                Kayıt bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
