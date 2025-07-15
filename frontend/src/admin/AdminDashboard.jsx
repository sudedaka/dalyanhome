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

  useEffect(() => {
    const dbRef = ref(database, "/reservations");
    const unsubscribe = onValue(dbRef, (snap) => {
      setBookings(snap.val() || {});
    });
    return () => unsubscribe();
  }, []);

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

  // Fiyatları TL biçiminde gösterir
  function formatTL(amount) {
    if (!amount && amount !== 0) return "";
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Paneli – Rezervasyonlar</h1>

      {/* ------- FORM ------- */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 mb-12 max-w-md mx-auto px-4"
      >
        {[
          ["musteriAdi", "Ad - Soyad"],
          ["girisTarihi", "Giriş Tarihi (dd.MM.yyyy)"],
          ["cikisTarihi", "Çıkış Tarihi (dd.MM.yyyy)"],
          ["kapora", "Kapora (₺)"],
          ["kalan", "Kalan (₺)"],
          ["toplamUcret", "Toplam Ücret (₺)"],
        ].map(([name, label]) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="mb-1 font-medium text-gray-700 select-none"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              placeholder={label}
              value={form[name]}
              onChange={handleChange}
              className="border p-2 rounded text-sm"
              required={["musteriAdi", "girisTarihi", "cikisTarihi"].includes(
                name
              )}
              inputMode={["kapora", "kalan", "toplamUcret"].includes(name) ? "numeric" : "text"}
            />
          </div>
        ))}
        <div className="flex flex-col">
          <label
            htmlFor="notlar"
            className="mb-1 font-medium text-gray-700 select-none"
          >
            Notlar
          </label>
          <textarea
            id="notlar"
            name="notlar"
            placeholder="Notlar"
            value={form.notlar}
            onChange={handleChange}
            className="border p-2 rounded resize-y text-sm"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition mt-4"
        >
          {editId ? "Güncelle" : "Ekle"}
        </button>
      </form>

      {/* ------- TABLO ------- */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border min-w-[700px]">
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
                <th
                  key={h}
                  className="border p-2 whitespace-nowrap text-left text-sm"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(bookings).map(([id, r]) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border p-2 whitespace-nowrap text-sm">
                  {r.musteriAdi}
                </td>
                <td className="border p-2 whitespace-nowrap text-sm">
                  {r.girisTarihi}
                </td>
                <td className="border p-2 whitespace-nowrap text-sm">
                  {r.cikisTarihi}
                </td>
                <td className="border p-2 whitespace-nowrap text-sm">
                  {formatTL(r.kapora)}
                </td>
                <td className="border p-2 whitespace-nowrap text-sm">
                  {formatTL(r.kalan)}
                </td>
                <td className="border p-2 whitespace-nowrap text-sm">
                  {formatTL(r.toplamUcret)}
                </td>
                <td className="border p-2 max-w-xs truncate text-sm">
                  {r.notlar}
                </td>
                <td className="border p-2 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(id)}
                    className="bg-yellow-400 px-3 py-1 rounded text-sm"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
            {Object.keys(bookings).length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-4 text-gray-500 text-sm"
                >
                  Kayıt bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
