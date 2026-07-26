import { env } from "cloudflare:workers";

const createTableSql = `CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  session_type TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'requested',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const createIndexSql =
  "CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments (appointment_date, appointment_time)";

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

    if (!name || !email || !sessionType || !appointmentDate || !appointmentTime) {
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

    if (!env.DB) {
      throw new Error("Appointment storage is unavailable.");
    }

    await env.DB.batch([
      env.DB.prepare(createTableSql),
      env.DB.prepare(createIndexSql),
    ]);

    const result = await env.DB.prepare(
      `INSERT INTO appointments
        (name, email, phone, session_type, appointment_date, appointment_time, note)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        name,
        email,
        phone,
        sessionType,
        appointmentDate,
        appointmentTime,
        note,
      )
      .run();

    return Response.json(
      { appointment: { id: result.meta.last_row_id, status: "requested" } },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save your request.";
    return Response.json({ error: message }, { status: 500 });
  }
}
