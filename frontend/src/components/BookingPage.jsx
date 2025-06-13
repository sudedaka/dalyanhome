import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { ChevronLeft, ChevronRight, User, Mail, Phone } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import "./BookingPage.css";

import { useTranslation } from "react-i18next";

const SHEETY_BLOCKED = import.meta.env.VITE_SHEETY_BLOCKED;
const SHEETY_RESERVE = import.meta.env.VITE_SHEETY_RESERVATIONS;

const BookingPage = () => {
  const { t, i18n } = useTranslation();

  const [blockedDates, setBlockedDates] = useState([]);
  const [range, setRange] = useState([null, null]);
  const [hoverDate, setHoverDate] = useState(null);
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    notlar: "",
  });

  useEffect(() => {
    fetch(SHEETY_BLOCKED)
      .then((res) => res.json())
      .then((data) => {
        const rawList = data.blockedDays ?? [];
        const parseDateLocal = (str) => {
          const [y, m, d] = str.split("-").map(Number);
          return new Date(y, m - 1, d);
        };
        const parsed = rawList.map((item) => parseDateLocal(item.date));
        setBlockedDates(parsed);
      })
      .catch((err) => console.error("Fetch blocked dates error:", err));
  }, []);

  const tileDisabled = ({ date, view }) =>
    view === "month" && blockedDates.some((d) => d.toDateString() === date.toDateString());

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";
    const [start, end] = range;
    const isStart = start && date.toDateString() === start.toDateString();
    const isEnd = end && date.toDateString() === end.toDateString();
    if (isStart || isEnd) return "selected";
    if (start && !end && hoverDate) {
      const [min, max] = start < hoverDate ? [start, hoverDate] : [hoverDate, start];
      if (date > min && date < max) return "in-range-hover";
    }
    if (start && end && date > start && date < end) return "in-range";
    if (blockedDates.some((d) => d.toDateString() === date.toDateString()))
      return "unavailable";
    return "available";
  };

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [checkIn, checkOut] = range;
    fetch(SHEETY_RESERVE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reservation: {
          checkIn: checkIn.toISOString().split("T")[0],
          checkOut: checkOut.toISOString().split("T")[0],
          ...form,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => alert(t("booking.alertSuccess")))
      .catch(() => alert(t("booking.alertError")));
  };

  // react-calendar expects a locale code string
  const localeCode = i18n.language === "en" ? "en-US" : "tr";

  return (
    <div id="rezervasyon" className="booking-page-wrapper max-w-5xl mx-auto p-6 space-y-12">
      {/* Availability Calendar */}
      <section className="relative booking-glass">
        <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold">{t("booking.calendarTitle")}</h2>
          <Calendar
            selectRange
            locale={localeCode}
            onChange={(value) => {
              if (!Array.isArray(value)) {
                setRange([value, null]);
                setHoverDate(null);
              } else {
                setRange(value);
                setHoverDate(null);
              }
            }}
            value={range}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
            onMouseLeave={() => setHoverDate(null)}
            prevLabel={<ChevronLeft />}
            nextLabel={<ChevronRight />}
            showDoubleView
            next2Label={null}
            prev2Label={null}
          />
        </div>
      </section>

      {/* Reservation Form */}
      <section className="relative booking-glass">
        <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-teal-600 text-white py-4 px-6">
            <h2 className="text-xl font-semibold">{t("booking.formTitle")}</h2>
          </div>
          <div className="p-8">
            {/* Date Info */}
            <div className="booking-info mb-6">
              <h3 className="text-lg font-bold mb-2">{t("booking.datesTitle")}</h3>
              <p>
                <span className="font-bold">{t("booking.checkIn")}:</span>{" "}
                <span className="font-medium">
                  {range[0] ? range[0].toLocaleDateString(localeCode) : "--------"}
                </span>
              </p>
              <p>
                <span className="font-bold">{t("booking.checkOut")}:</span>{" "}
                <span className="font-medium">
                  {range[1] ? range[1].toLocaleDateString(localeCode) : "--------"}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "ad", icon: User, placeholder: t("booking.firstName"), required: true },
                  { name: "soyad", icon: User, placeholder: t("booking.lastName"), required: true },
                  { name: "email", icon: Mail, placeholder: t("booking.email"), required: true },
                  { name: "telefon", icon: Phone, placeholder: t("booking.phone"), required: false },
                ].map(({ name, icon: Icon, placeholder, required }) => (
                  <div className="relative" key={name}>
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name={name}
                      type={name === "email" ? "email" : "text"}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={onChangeField}
                      required={required}
                      className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">{t("booking.notesLabel")}</label>
                <textarea
                  name="notlar"
                  rows={4}
                  placeholder={t("booking.notesPlaceholder")}
                  value={form.notlar}
                  onChange={onChangeField}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <p className="text-sm text-gray-500">{t("booking.formInfo")}</p>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-shadow shadow-md"
              >
                {t("booking.submitButton")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
