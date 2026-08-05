"use client";

import { use, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { getServiceById, servicesData } from "@/lib/servicesData";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function getBenefitIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("emotional") || t.includes("intimacy") || t.includes("relationship") || t.includes("respect") || t.includes("bond")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }
  if (t.includes("awareness") || t.includes("clarity") || t.includes("understanding") || t.includes("perspective") || t.includes("focus")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    );
  }
  if (t.includes("stress") || t.includes("coping") || t.includes("problem") || t.includes("protection") || t.includes("care")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (t.includes("resilience") || t.includes("performance") || t.includes("growth") || t.includes("setback")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    );
  }
  if (t.includes("confidence") || t.includes("empowerment") || t.includes("fulfillment") || t.includes("decision")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (t.includes("belonging") || t.includes("communication") || t.includes("partnership") || t.includes("team") || t.includes("shared")) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}



export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams =
    typeof (params as Promise<{ id: string }>)?.then === "function"
      ? use(params as Promise<{ id: string }>)
      : (params as { id: string });
  const service = getServiceById(resolvedParams.id);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.classList.add("motion-ready");
    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  if (!service) {
    return (
      <main id="top" className="sample-home service-detail-page">
        <Navbar />
        <section className="service-not-found">
          <p className="sample-overline">404 · Service not found</p>
          <h1>This page has moved.</h1>
          <p>
            The service you are looking for is no longer available at this
            address.
          </p>
          <Link href="/services" className="service-text-link">
            <span aria-hidden="true">←</span> Explore all services
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const otherServices = servicesData.filter((item) => item.id !== service.id);

  return (
    <main className="sample-home service-detail-page" id="top" ref={rootRef}>
      <a className="sample-skip" href="#main-content">
        Skip to main content
      </a>
      <Navbar />

      <section className="service-detail-hero" aria-labelledby="service-heading">
        <div className="service-detail-hero-copy">
          <Link className="service-back-link" href="/#top" scroll>
            <span aria-hidden="true">←</span> Back to home
          </Link>

          <div className="service-detail-title-wrap">
            <p className="sample-overline">
              {service.number} · {service.badge}
            </p>
            <h1 id="service-heading">{service.name}</h1>
            <p className="service-detail-deck">{service.heroHeadline}</p>
            <p className="service-detail-intro">{service.heroIntro}</p>
          </div>

          <div className="service-detail-actions">
            <a href="#booking-section">
              {service.ctaButtonText} <Arrow />
            </a>
            <a href="#service-overview">Discover the approach ↓</a>
          </div>
        </div>

        <div className="service-detail-hero-media">
          <Image
            src={service.image}
            alt={`${service.name} at Navisamarnath`}
            fill
            priority
            unoptimized
            sizes="(max-width: 760px) 100vw, 43vw"
            className="service-detail-hero-image"
          />
          <div className="service-detail-image-wash" />
          <p className="service-detail-image-note">
            Thoughtful support
            <br />
            shaped around you
          </p>
        </div>
      </section>

      <div className="sample-surface" id="main-content">
        <section className="service-overview sample-section" id="service-overview">
          <p className="sample-side-label" data-reveal>
            The invitation
          </p>
          <div className="service-overview-copy" data-reveal>
            <p className="sample-overline">A place to begin</p>
            <h2>{service.whyTitle}</h2>
          </div>
          <div className="service-overview-note" data-reveal>
            <p>{service.whySubheading}</p>
            <span>Private · Personal · Evidence-based</span>
          </div>
        </section>

        <section className="service-reasons sample-section" aria-label={service.whyTitle}>
          <div className="service-reasons-visual" data-reveal>
            <div className="service-reasons-image">
              <Image
                src={service.whyReasons[0]?.image || service.image}
                alt="A calm, supportive setting"
                fill
                unoptimized
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
            <p>
              Change can begin quietly—with space to notice, understand, and
              choose what comes next.
            </p>
          </div>

          <div className="service-reasons-list">
            {service.whyReasons.map((reason) => (
              <article key={reason.title} data-reveal>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="service-benefits sample-section">
          <div className="service-benefits-heading" data-reveal>
            <p className="sample-overline">What can shift</p>
            <h2>{service.benefitsTitle}</h2>
            <p>
              Not a promise of perfection—an opportunity to meet life with more
              clarity, flexibility, and trust in yourself.
            </p>
          </div>

          <div className="service-benefits-grid">
            {service.benefitsItems.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                style={{ "--card-delay": `${index * 55}ms` } as React.CSSProperties}
              >
                <div className="service-benefit-copy">
                  <div className="service-benefit-header">
                    <div className="service-benefit-icon" title={item.title}>
                      {getBenefitIcon(item.title)}
                    </div>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="service-approach sample-section">
          <div className="sample-section-heading">
            <p className="sample-side-label" data-reveal>
              The framework
            </p>
            <div data-reveal>
              <p className="sample-overline">How we work</p>
              <h2>{service.modalitiesTitle}</h2>
            </div>
            {service.modalitiesIntro && <p data-reveal>{service.modalitiesIntro}</p>}
          </div>

          <div className="sample-approach-list" data-reveal>
            {service.modalitiesItems.map((modality) => (
              <article key={modality.name}>
                <h3>{modality.name}</h3>
                <p>{modality.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-booking sample-section" id="booking-section">
          <div className="service-booking-copy" data-reveal>
            <div className="service-booking-full-image">
              <Image
                src={service.bookingImage || "/Individual Therapy.jpg"}
                alt="Navisamarnath consultation session"
                fill
                unoptimized
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="service-booking-full-img"
              />
            </div>
          </div>
          <div className="service-booking-form-wrapper" data-reveal>
            <BookingForm defaultService={service.name} />
          </div>
        </section>

        <section className="service-more sample-section">
          <div className="service-more-heading" data-reveal>
            <p className="sample-side-label">More ways to work together</p>
            <h2>Support shaped around real life.</h2>
          </div>

          <div className="service-more-grid">
            {otherServices.map((other, index) => (
              <Link
                href={`/services/${other.id}`}
                key={other.id}
                data-reveal
                style={{ "--card-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <div className="service-more-image">
                  <Image
                    src={other.image}
                    alt={`${other.name} service`}
                    fill
                    unoptimized
                    sizes="(max-width: 760px) 100vw, 33vw"
                    className="service-more-img"
                  />
                </div>
                <div className="service-more-card-header">
                  <p>{other.badge}</p>
                  <span>{other.number}</span>
                </div>
                <h3>{other.name}</h3>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
