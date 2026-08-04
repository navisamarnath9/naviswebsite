"use client";

import { FormEvent, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

interface BookingFormProps {
  defaultService?: string;
  simple?: boolean;
}

export default function BookingForm({ defaultService }: BookingFormProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formElement = event.currentTarget;

    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      sessionType: defaultService || "Complimentary consultation",
      appointmentDate: new Date().toISOString().slice(0, 10),
      appointmentTime: "To be arranged via WhatsApp",
      note: "WhatsApp consultation request",
    };

    try {
      let firestoreSucceeded = false;
      try {
        await addDoc(collection(db, "bookings"), {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          sessionType: payload.sessionType,
          appointmentDate: payload.appointmentDate,
          appointmentTime: payload.appointmentTime,
          note: payload.note,
          status: "requested",
          createdAt: new Date().toISOString(),
        });
        firestoreSucceeded = true;
      } catch (fsErr) {
        console.warn("Firestore booking storage failed:", fsErr);
      }

      let apiSucceeded = false;
      try {
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          apiSucceeded = true;
        }
      } catch (apiErr) {
        console.warn("D1 API backup booking failed:", apiErr);
      }

      if (!firestoreSucceeded && !apiSucceeded) {
        throw new Error("We couldn’t save your request. Please verify your connection.");
      }

      setStatus("success");
      setMessage(
        `Thank you, ${payload.name.split(" ")[0]}. Your message is in. We’ll reach out to you via WhatsApp shortly.`
      );
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t send your request. Please try again."
      );
    }
  }

  return (
    <form
      className="booking-form simple-booking-form"
      onSubmit={submitBooking}
      id="booking-form-element"
    >
      <div className="form-heading">
        <div>
          <span>Complimentary consultation</span>
          <h3>Let’s start a conversation</h3>
        </div>
        <b aria-hidden="true">↗</b>
      </div>

      <div className="field">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Your full name"
        />
      </div>

      <div className="field">
        <label htmlFor="phone">WhatsApp Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 99999 99999"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </div>

      <button
        className="button submit-button"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending request…" : "Request Consultation"}{" "}
        <ArrowIcon />
      </button>

      {message && (
        <div className={`form-message ${status}`} role="status">
          {message}
        </div>
      )}
    </form>
  );
}
