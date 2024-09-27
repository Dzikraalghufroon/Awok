import React, { useState } from "react";
import Styles from "./popup.module.css"; // Asumsi kamu menggunakan CSS Modules

const PopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ nama: "", pass: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Kirim data ke fungsi di komponen App
  };

  if (!isOpen) return null; // Jangan tampilkan pop-up jika tidak dibuka

  return (
    <div className={Styles.popup}>
      <div className={Styles.popupContent}>
        <button onClick={onClose} className={Styles.closeButton}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Nama:
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Pass:
            <input
              type="text"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
