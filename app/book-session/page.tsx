"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

import Image from "next/image";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function BookSessionPage() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service") ?? undefined;

  return (
    <main id="top" className="sample-home book-session-page">
      <Navbar />

      <div id="main-content" className="sample-surface">
        <section className="service-booking sample-section" id="booking-section">
          <div className="service-booking-copy">
            <div className="service-booking-full-image">
              <Image
                src="/DSC_5301c.jpg"
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
