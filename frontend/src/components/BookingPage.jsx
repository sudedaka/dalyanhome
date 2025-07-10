import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Loader,
} from "lucide-react";
import "react-calendar/dist/Calendar.css";
import "./BookingPage.css";

import { useTranslation } from "react-i18next";
import useIsMobile from "../hooks/useIsMobile";

export default function BookingPage() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();

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

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_SHEETY_BLOCKED)
      .then((res) => res.json())
      .then((data) => {
        // Tarih parse fonksiyonu, format: "7/12/2025" (MM/DD/YYYY)
        const parseDate = (str) => {
          if (!str) return null;
          const [month, day, year] = str.split("/");
          return new Date(year, month - 1, day);
        };

        const blockedRanges = data.blockedDays || [];

        let allBlockedDates = [];

        blockedRanges.forEach((item) => {
          const start = parseDate(item["girişTarihi"]);
          const end = parseDate(item["çıkışTarihi"]);

          if (!start || !end || isNaN(start) || isNaN(end)) return;

          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            allBlockedDates.push(new Date(d));
          }
        });

        setBlockedDates(allBlockedDates);
      })
      .catch(console.error);
  }, []);

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const tileDisabled = ({ date, view }) =>
    view === "month" && blockedDates.some((d) => isSameDay(d, date));

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    const [start, end] = range;
    const isStart = isSameDay(date, start);
    const isEnd = isSameDay(date, end);

    if (isStart || isEnd) return "selected";

    if (start && !end && hoverDate) {
      const [min, max] = start < hoverDate ? [start, hoverDate] : [hoverDate, start];
      if (date > min && date < max) return "in-range-hover";
    }

    if (start && end && date > start && date < end) return "in-range";

    if (blockedDates.some((d) => isSameDay(d, date))) return "unavailable";

    return "available";
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const [checkIn, checkOut] = range;

    if (
      !checkIn ||
      !checkOut ||
      !form.ad.trim() ||
      !form.soyad.trim() ||
      !form.email.trim()
    ) {
      showFeedback(
        "error",
        t("booking.validationError") ||
          "Lütfen tüm zorunlu alanları ve tarihleri doldurun."
      );
      return;
    }

    showFeedback("loading", t("booking.submitting"));

    fetch(import.meta.env.VITE_SHEETY_RESERVATIONS, {
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
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        showFeedback("success", t("booking.alertSuccess"));
        setForm({ ad: "", soyad: "", email: "", telefon: "", notlar: "" });
        setRange([null, null]);
      })
      .catch(() => showFeedback("error", t("booking.alertError")));
  };

  const localeCode = i18n.language === "en" ? "en-US" : "tr";

  return (
    <div
      id="rezervasyon"
      className="booking-page-wrapper max-w-full mx-auto p-4 sm:p-6 space-y-12"
    >
      {feedback && (
        <div className="feedback-overlay">
          {feedback.type === "loading" && <Loader className="spinner" />}
          <p className="feedback-message">{feedback.message}</p>
        </div>
      )}

      <section className="relative booking-glass">
        <div className="glass-container p-8 w-full max-w-md md:max-w-3xl lg:max-w-5xl mx-auto">
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
            showDoubleView={!isMobile}
            next2Label={null}
            prev2Label={null}
          />
        </div>
      </section>

      <section className="booking-form glass-container max-w-md md:max-w-3xl lg:max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6">{t("booking.formTitle")}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="ad">{t("booking.firstName")}</label>
            <input
              id="ad"
              name="ad"
              type="text"
              placeholder={t("booking.firstNamePlaceholder")}
              value={form.ad}
              onChange={(e) => setForm({ ...form, ad: e.target.value })}
              required
              autoComplete="given-name"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="soyad">{t("booking.lastName")}</label>
            <input
              id="soyad"
              name="soyad"
              type="text"
              placeholder={t("booking.lastNamePlaceholder")}
              value={form.soyad}
              onChange={(e) => setForm({ ...form, soyad: e.target.value })}
              required
              autoComplete="family-name"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t("booking.email")}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t("booking.emailPlaceholder")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefon">{t("booking.phone")}</label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              placeholder={t("booking.phonePlaceholder")}
              value={form.telefon}
              onChange={(e) => setForm({ ...form, telefon: e.target.value })}
              autoComplete="tel"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notlar">{t("booking.notes")}</label>
            <textarea
              id="notlar"
              name="notlar"
              placeholder={t("booking.notesPlaceholder")}
              value={form.notlar}
              onChange={(e) => setForm({ ...form, notlar: e.target.value })}
              className="textarea"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={feedback?.type === "loading"}
          >
            {t("booking.submit")}
          </button>
        </form>
      </section>
    </div>
  );
}
