"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/client";
import * as XLSX from "xlsx";
import VCard from "vcf"; // Using the 'vcf' library for vCard creation

export default function Display() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("Name, Phone")
        .order("created_at", { ascending: false });
      if (error) {
        console.log("Error: ", error.message);
      } else {
        setContacts(data);
      }
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(contacts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts.xlsx");
  };

  const exportToVCard = () => {
    const vCards = contacts.map((contact) => {
      const vcard = new VCard();
      vcard.add("fn", contact.Name);
      vcard.add("tel", contact.Phone);
      vcard.add("email", contact.email);
      return vcard.toString();
    });

    const blob = new Blob(vCards, { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contacts.vcf";
    link.click();
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Submitted Contacts</h1>
        {contacts.length ? (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.Phone}>
                  <td>{contact.Name}</td>
                  <td>{contact.Phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No contacts found.</p>
        )}
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToVCard}>Export to vCard</button>
      </div>
    </>
  );
}
