"use client";

import { FormEvent, useState } from "react";

const times = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

interface BookingFormProps {
  defaultService?: string;
}

export default function BookingForm({ defaultService }: BookingFormProps) {
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      sessionType: String(form.get("sessionType") ?? ""),
      appointmentDate: String(form.get("appointmentDate") ?? ""),
      appointmentTime: selectedTime,
      note: String(form.get("note") ?? ""),
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Please try again.");

      setStatus("success");
      setMessage(
        `Thank you, ${payload.name.split(" ")[0]}. Your request for ${payload.appointmentDate} at ${selectedTime} is in. We’ll confirm by email within one business day.`
      );
      event.currentTarget.reset();
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
    <form className="booking-form" onSubmit={submitBooking} id="booking-form-element">
      <div className="form-heading">
        <div>
          <span>Complimentary consultation</span>
          <h3>Find your starting point</h3>
        </div>
        <b aria-hidden="true">↗</b>
      </div>

      <div className="field">
        <label htmlFor="sessionType">I’m interested in</label>
        <select
          id="sessionType"
          name="sessionType"
          required
          defaultValue={defaultService || "Free 15-minute consultation"}
        >
          <option>Free 15-minute consultation</option>
          <option>Individual therapy</option>
          <option>Personal coaching</option>
          <option>Couples therapy</option>
          <option>Group session</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="appointmentDate">Preferred date</label>
        <input
          id="appointmentDate"
          name="appointmentDate"
          type="date"
          required
        />
      </div>

      <fieldset className="field">
        <legend>Preferred time</legend>
        <div className="time-grid">
          {times.map((time) => (
            <button
              className={selectedTime === time ? "time active" : "time"}
              type="button"
              key={time}
              onClick={() => setSelectedTime(time)}
              aria-pressed={selectedTime === time}
            >
              {time}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="phone">
          Phone <span>(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 555 000 0000"
        />
      </div>

      <div className="field">
        <label htmlFor="note">
          What would you like support with? <span>(optional)</span>
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="A short note is plenty."
        />
      </div>

      <label className="consent">
        <input type="checkbox" required />
        <span>
          I understand this is a request and is not confirmed until I
          receive an email.
        </span>
      </label>

      <button
        className="button submit-button"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? "Sending request…"
          : "Request this conversation"}{" "}
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
