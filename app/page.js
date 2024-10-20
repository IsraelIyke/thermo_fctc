"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/client";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber } = formData;
    const { data, error } = await supabase

      .from("contacts")
      .insert([{ Name: fullName, Phone: phoneNumber }]);
    if (error) {
      console.log("Error: ", error.message);
    } else {
      console.log("Data inserted:", data);
      setFormData({ fullName: "", phoneNumber: "" }); // Reset form
    }
    console.log("sent");
  };

  return (
    <>
      {/* <Navbar /> */}

      <nav>
        <h1>FCTC</h1>
      </nav>

      <div className="form-container">
        <h1>Welcome</h1>
        <h2>Thermodynamics: From confusion to clarity Contact Info Page</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
