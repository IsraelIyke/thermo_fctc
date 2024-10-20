"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/client";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber, email } = formData;
    const { data, error } = await supabase

      .from("contacts")
      .insert([{ Name: fullName, Phone: phoneNumber, email }]);
    if (error) {
      console.log("Error: ", error.message);
    } else {
      console.log("Data inserted:", data);
      setFormData({ fullName: "", phoneNumber: "", email: "" }); // Reset form
    }
    console.log("sent");
  };

  return (
    <>
      {/* <Navbar /> */}

      {/* <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
        <h1>My App</h1>
      </nav> */}

      <div style={{ padding: "20px" }}>
        <h1>Submit Your Info</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{ background: "black", height: "4rem" }}
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
          <input
            style={{ background: "black", height: "4rem" }}
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            required
          />
          <input
            style={{ background: "black", height: "4rem" }}
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* <Footer /> */}
      <footer
        style={{
          padding: "10px",
          backgroundColor: "#333",
          color: "#fff",
          marginTop: "auto",
        }}
      >
        <p>Footer Content</p>
      </footer>
    </>
  );
}
