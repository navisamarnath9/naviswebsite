"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

import EditableImage from "@/components/EditableImage";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

const serviceJpgMap: Record<string, string> = {
  "Individual Therapy": "/Individual Therapy.jpg",
  "Couples/Family Therapy": "/Couple.jpg",
  "Coaching": "/Coaching.jpg",
  "Group Sessions": "/Group Sessions.jpg",
  "individual": "/Individual Therapy.jpg",
  "couples": "/Couple.jpg",
  "coaching": "/Coaching.jpg",
  "groups": "/Group Sessions.jpg",
};

export default function BookSessionPage() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service") ?? undefined;
  const bookingImage = (selectedService && serviceJpgMap[selectedService]) || "/Individual Therapy.jpg";

  return (
    <main id="top" className="sample-home book-session-page">
      <Navbar />

      <div id="main-content" className="sample-surface">
        <section className="service-booking sample-section" id="booking-section">
          <div className="service-booking-copy">
            <div className="service-booking-full-image">
              <EditableImage
                defaultSrc={bookingImage}
                alt="Navisamarnath consultation session"
                fill
                unoptimized
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="service-booking-full-img"
              />
            </div>
          </div>
          <div className="service-booking-form-wrapper">
            <BookingForm defaultService={selectedService} />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
