import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import "./BookingPage.css";
import BookingForm from "./BookingForm";
import { useTranslation } from "react-i18next";
import useIsMobile from "../hooks/useIsMobile";

export default function BookingPage() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();

  const [blockedDates, setBlockedDates] = useState([]);
  const [range, setRange] = useState([null, null]);
  const [hoverDate, setHoverDate] = useState(null);

  const [formDates, setFormDates] = useState({
    checkIn: "",
    checkOut: "",
  });

  // Geçerli tarih kontrolü
  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  // Tarih parse fonksiyonu, format fark etmeksizin local saat 00:00 olarak oluşturuyor
  const parseDate = (str) => {
    if (!str) return null;

    str = str.trim();

    if (str.includes(".")) {
      // Gün.Ay.Yıl formatı
      const [day, month, year] = str.split(".");
      if (!day || !month || !year) return null;
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return isValidDate(date) ? date : null;
    }

    if (str.includes("/")) {
      // Ay/Gün/Yıl formatı
      const [month, day, year] = str.split("/");
      if (!day || !month || !year) return null;
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return isValidDate(date) ? date : null;
    }

    if (str.includes("-")) {
      // ISO format yyyy-mm-dd
      const [year, month, day] = str.split("-");
      if (!day || !month || !year) return null;
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return isValidDate(date) ? date : null;
    }

    return null;
  };

  useEffect(() => {
       fetch(import.meta.env.VITE_SHEETY_BLOCKED_DAYS)
      .then((res) => res.json())
      .then((data) => {
        const blockedRanges = data.blockedDays || [];
        let allBlockedDates = [];

        blockedRanges.forEach((item) => {
          const start = parseDate(item["girisTarihi"]);
          const end = parseDate(item["cikisTarihi"]);

          if (!start || !end) return;

          // start ve end dahil tüm günleri blockedDates içine ekle
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            allBlockedDates.push(new Date(d));
          }
        });

        setBlockedDates(allBlockedDates);
      })
      .catch(console.error);
  }, [i18n.language]);

  // İki tarihi aynı gün olarak kontrol et
  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Takvimde engellenmiş günleri seçilemez yap
  const tileDisabled = ({ date, view }) =>
    view === "month" && blockedDates.some((d) => isSameDay(d, date));

  // Takvimde seçilen ve engellenmiş günler için class ataması
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

  const localeCode = i18n.language === "en" ? "en-US" : "tr";

  // Tarihi yyyy-mm-dd formatına çevir
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Takvimde tarih aralığı değiştiğinde formu güncelle
  const onRangeChange = (value) => {
    setRange(value);

    if (Array.isArray(value) && value.length === 2) {
      setFormDates({
        checkIn: formatDate(value[0]),
        checkOut: formatDate(value[1]),
      });
    } else if (value instanceof Date) {
      setFormDates({
        checkIn: formatDate(value),
        checkOut: "",
      });
    } else {
      setFormDates({ checkIn: "", checkOut: "" });
    }

    setHoverDate(null);
  };

  return (
    <div
      id="rezervasyon"
      className="booking-page-wrapper max-w-full mx-auto p-4 sm:p-6 space-y-12"
    >
      <section className="relative booking-glass">
        <div className="glass-container p-8 w-full max-w-md md:max-w-3xl lg:max-w-5xl mx-auto">
          {/* Görseller */}
          <img
            src="/pink-flower.png"
            alt="Pembe çiçek"
            className="absolute top-[clamp(-30px,-10vw,-60px)] right-[clamp(-20px,-6vw,-40px)] md:top-[clamp(-50px,-6vw,-20px)] md:right-[clamp(-40px,-5vw,-30px)] w-[clamp(100px,20vw,240px)] h-auto z-30"
          />
          <img
            src="/pink2-flower.png"
            alt="Sarı çiçek"
            className="absolute top-[clamp(-80px,-14vw,-140px)] left-[clamp(-20px,-6vw,-40px)] md:top-[clamp(-100px,-12vw,-140px)] md:left-[clamp(-40px,-5vw,-30px)] w-[clamp(100px,20vw,240px)] h-auto z-30"
          />

          <h2 className="text-2xl font-semibold text-[#695843]">{t("booking.calendarTitle")}</h2>

          <Calendar
            selectRange
            locale={localeCode}
            onChange={onRangeChange}
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

          <BookingForm
            initialCheckIn={formDates.checkIn}
            initialCheckOut={formDates.checkOut}
          />
        </div>
      </section>
    </div>
  );
}
