import React from "react";
import { useTranslation } from "react-i18next";

function BookingForm({ initialCheckIn, initialCheckOut }) {
  const { t } = useTranslation();
const [successMessage, setSuccessMessage] = React.useState("");

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: initialCheckIn || "",
    checkOut: initialCheckOut || "",
    notes: ""
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      checkIn: initialCheckIn || "",
      checkOut: initialCheckOut || "",
    }));
  }, [initialCheckIn, initialCheckOut]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      alert(t("booking.validationError"));
      return;
    }

    setLoading(true);

    const SHEETY_API_URL = import.meta.env.VITE_SHEETY_RESERVATIONS;

    const payload = {
      reservation: {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        notes: formData.notes,
      },
    };

    try {
      const res = await fetch(SHEETY_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");

      setSuccessMessage(t("booking.alertSuccess") || "Başarıyla gönderildi!");

      setTimeout(() => setSuccessMessage(""), 3000);


      // Formu sıfırla
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        checkIn: initialCheckIn || "",
        checkOut: initialCheckOut || "",
        notes: ""
      });
    } catch (error) {
      console.error(error);
      alert(t("booking.alertError") || "Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="booking-glass max-w-4xl w-full rounded-3xl shadow-lg bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 mt-16"
      style={{ color: "#806b4e" }}
    >
      <style>{`
        input::placeholder, textarea::placeholder {
          color: #806b4e;
          opacity: 1;
        }
      `}</style>

      <h3
        className="text-3xl font-bold mb-8 text-center drop-shadow-md"
        style={{ color: "#806b4e" }}
      >
        {t("booking.formTitle")}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <label className="block">
            <span className="block mb-2 text-sm font-semibold" style={{ color: "#806b4e" }}>
              {t("booking.firstName")}
            </span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder={`${t("booking.firstName")} girin`}
              className="w-full rounded-lg border py-3 px-4 text-lg shadow-sm transition focus:outline-none focus:ring-4"
              style={{ color: "#806b4e", borderColor: "#554839" }}
              onFocus={e => (e.target.style.borderColor = "#806b4e")}
              onBlur={e => (e.target.style.borderColor = "#554839")}
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="block mb-2 text-sm font-semibold" style={{ color: "#806b4e" }}>
              {t("booking.lastName")}
            </span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder={`${t("booking.lastName")} girin`}
              className="w-full rounded-lg border py-3 px-4 text-lg shadow-sm transition focus:outline-none focus:ring-4"
              style={{ color: "#806b4e", borderColor: "#554839" }}
              onFocus={e => (e.target.style.borderColor = "#806b4e")}
              onBlur={e => (e.target.style.borderColor = "#554839")}
              disabled={loading}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <label className="block">
            <span className="block mb-2 text-sm font-semibold" style={{ color: "#806b4e" }}>
              {t("booking.email")}
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="w-full rounded-lg border py-3 px-4 text-lg shadow-sm transition focus:outline-none focus:ring-4"
              style={{ color: "#806b4e", borderColor: "#554839" }}
              onFocus={e => (e.target.style.borderColor = "#806b4e")}
              onBlur={e => (e.target.style.borderColor = "#554839")}
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="block mb-2 text-sm font-semibold" style={{ color: "#806b4e" }}>
              {t("booking.phone")}
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+90 555 123 4567"
              className="w-full rounded-lg border py-3 px-4 text-lg shadow-sm transition focus:outline-none focus:ring-4"
              style={{ color: "#806b4e", borderColor: "#554839" }}
              onFocus={e => (e.target.style.borderColor = "#806b4e")}
              onBlur={e => (e.target.style.borderColor = "#554839")}
              disabled={loading}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <label className="block">
            <span className="block mb-2 text-sm font-semibold" style={{ color: "#806b4e" }}>
              {t("booking.checkIn")}
            </span>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="w-full rounded-lg border py-3 px-4 text-lg shadow-sm transition focus:outline-none focus:ring-4"
              style={{ color: "#806b4e", borderColor: "#554839" }}
              onFocus={e => (e.target.style.borderColor = "#806b4e")}
              onBlur={e => (e.target.style.borderColor = "#554839")}
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="block mb-2 text-sm font-semibold" style={{ color: "#806b4e" }}>
              {t("booking.checkOut")}
            </span>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="w-full rounded-lg border py-3 px-4 text-lg shadow-sm transition focus:outline-none focus:ring-4"
              style={{ color: "#806b4e", borderColor: "#554839" }}
              onFocus={e => (e.target.style.borderColor = "#806b4e")}
              onBlur={e => (e.target.style.borderColor = "#554839")}
              disabled={loading}
            />
          </label>
        </div>

        <label className="block">
          <span className="block mb-2 text-sm font-semibold" style={{ color: "#806b4e" }}>
            {t("booking.notesLabel")}
          </span>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder={t("booking.notesPlaceholder")}
            rows={5}
            className="w-full rounded-lg border py-3 px-4 text-lg shadow-sm resize-none transition focus:outline-none focus:ring-4"
            style={{ color: "#806b4e", borderColor: "#554839" }}
            onFocus={e => (e.target.style.borderColor = "#806b4e")}
            onBlur={e => (e.target.style.borderColor = "#554839")}
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-500 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(to right, #806b4e, #6f5a3f, #554839)",
            color: "#ffffff",
            backgroundSize: "200% 100%",
            backgroundPosition: "left center",
          }}
          onMouseEnter={e => {
            if (!loading) e.currentTarget.style.backgroundPosition = "right center";
          }}
          onMouseLeave={e => {
            if (!loading) e.currentTarget.style.backgroundPosition = "left center";
          }}
        >
          {loading ? t("booking.submitting") || "Gönderiliyor..." : t("booking.submitButton")}
        </button>
            {successMessage && (
        <div className="success-message" style={{ color: "green", marginBottom: "1rem" }}>
          {successMessage}
        </div>
      )}

      </form>
    </div>
  );
}

export default BookingForm;
