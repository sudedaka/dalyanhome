import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    fetch(import.meta.env.VITE_SHEETY_BLOCKED)
      .then((res) => res.json())
      .then((data) => {
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

  const localeCode = i18n.language === "en" ? "en-US" : "tr";

  return (
    <div
      id="rezervasyon"
      className="booking-page-wrapper max-w-full mx-auto p-4 sm:p-6 space-y-12"
    >
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
    </div>
  );
}
