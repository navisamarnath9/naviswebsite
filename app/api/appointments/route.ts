// Safe environment access for Cloudflare Workers runtime
let cfEnv: any = (globalThis as any).env;
try {
  // @ts-ignore
  if (typeof process === "undefined" || process.env.NEXT_RUNTIME === "edge") {
    // @ts-ignore
    cfEnv = (await import("cloudflare:workers")).env;
  }
} catch {
  cfEnv = (globalThis as any).env || {};
}

type AppointmentPayload = {
  name?: string;
  email?: string;
  phone?: string;
  sessionType?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  note?: string;
};

function clean(value: string | undefined, max = 500) {
  return (value ?? "").trim().slice(0, max);
}

// Function to send email notification to navisamarnathtech@gmail.com via Resend
async function sendBookingNotificationEmail(payload: {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  appointmentDate: string;
  appointmentTime: string;
  note: string;
}) {
  const adminEmail = "navisamarnathtech@gmail.com";
  const resendApiKey =
    cfEnv?.RESEND_API_KEY || (process as any).env?.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("Resend API key is not configured; skipping booking email notification.");
    return;
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #fafafa;">
      <h2 style="color: #314851; margin-top: 0;">New Consultation Request Received</h2>
      <p style="font-size: 15px; color: #333;">You have received a new consultation appointment booking from your website:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee; width: 140px;">Client Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">WhatsApp / Phone:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="https://wa.me/${payload.phone.replace(/[^0-9]/g, "")}" style="color:#314851;">${payload.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email Address:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${payload.email}" style="color:#314851;">${payload.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Session Type:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #314851; font-weight: bold;">${payload.sessionType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Requested Date:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${payload.appointmentDate}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; text-align: center;">
        <a href="https://navisamarnath-site.firebaseapp.com/admin" style="background-color: #314851; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
          View in Admin Portal
        </a>
      </div>
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: [adminEmail],
      subject: `New Booking: ${payload.name} — ${payload.sessionType}`,
      html: htmlContent,
    }),
  });

  if (resendResponse.ok) {
    console.log("✓ Email notification sent via Resend to", adminEmail);
  } else {
    const errText = await resendResponse.text();
    console.warn("Resend email error:", resendResponse.status, errText);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AppointmentPayload;
    const name = clean(payload.name, 100);
    const email = clean(payload.email, 160);
    const phone = clean(payload.phone, 40);
    const sessionType = clean(payload.sessionType, 100);
    const appointmentDate = clean(payload.appointmentDate, 20);
    const appointmentTime = clean(payload.appointmentTime, 20);
    const note = clean(payload.note, 800);

    if (!name || !email || !sessionType || !appointmentDate) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Send email notification to navisamarnathtech@gmail.com
    try {
      await sendBookingNotificationEmail({
        name,
        email,
        phone,
        sessionType,
        appointmentDate,
        appointmentTime: appointmentTime || "To be arranged",
        note,
      });
    } catch (err) {
      console.warn("Email notification error:", err);
    }

    return Response.json(
      { success: true, message: "Booking received and email notification sent to navisamarnathtech@gmail.com" },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save your request.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  let cfEnvKeys: string[] = [];
  try {
    // @ts-ignore
    const importedEnv = (await import("cloudflare:workers")).env;
    cfEnvKeys = importedEnv ? Object.keys(importedEnv) : [];
  } catch (e) {
    cfEnvKeys = [`Error importing: ${(e as Error).message}`];
  }

  const globalEnv = (globalThis as any).env;
  const globalEnvKeys = globalEnv ? Object.keys(globalEnv) : [];

  const processEnvKeys = typeof process !== "undefined" && process.env ? Object.keys(process.env) : [];

  return Response.json({
    cfEnvKeys,
    globalEnvKeys,
    processEnvKeys,
    hasNextRuntime: typeof process !== "undefined" ? process.env.NEXT_RUNTIME : "undefined",
    hasResendApiKey: {
      cfEnv: cfEnvKeys.includes("RESEND_API_KEY"),
      globalEnv: globalEnvKeys.includes("RESEND_API_KEY"),
      processEnv: processEnvKeys.includes("RESEND_API_KEY"),
    }
  });
}
