"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/client";

export default function Home() {
  const [lightSwitch, setLightSwitch] = useState();

  function handleClick() {
    setLightSwitch((prev) => !prev);
  }

  useEffect(() => {
    sendData();
  }, [lightSwitch]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let { data: iot, error } = await supabase
      .from("iot")
      .select("switch")
      .eq("id", "1");
    setLightSwitch(iot[0].switch);
  }

  async function sendData() {
    try {
      const { data, error } = await supabase
        .from("iot")
        .update({ switch: lightSwitch })
        .eq("id", "1")
        .select();
    } catch (err) {
      console.log(err);
    } finally {
      let { data: iot, error } = await supabase
        .from("iot")
        .select("switch")
        .eq("id", "1");
      setLightSwitch(iot[0].switch);
    }
  }
  return (
    <div className="container">
      <button
        style={{
          color: lightSwitch ? "green" : "red",
          border: lightSwitch ? "1px solid green" : "1px solid red",
        }}
        className="button"
        onClick={handleClick}
      >
        {lightSwitch ? "ON" : "OFF"}
      </button>
    </div>
  );
}
