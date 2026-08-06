import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname = "/") {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(url.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the production home page and all service links", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Navisamarnath \| Counselling, Psychotherapy &amp; Coaching<\/title>/i);
  assert.match(html, /href="\/services\/individual"/);
  assert.match(html, /href="\/services\/coaching"/);
  assert.match(html, /href="\/services\/couples"/);
  assert.match(html, /href="\/services\/groups"/);
  assert.match(html, /Recent writing/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

const services = [
  {
    id: "individual",
    name: "Individual Therapy",
    why: "Why Therapy?",
    benefits: "Benefits of Therapy",
    related: ["Couples/Family Therapy", "Coaching", "Group Sessions"],
  },
  {
    id: "couples",
    name: "Couples/Family Therapy",
    why: "Why Couples Therapy?",
    benefits: "Benefits of Couples Therapy",
    related: ["Individual Therapy", "Coaching", "Group Sessions"],
  },
  {
    id: "coaching",
    name: "Coaching",
    why: "Why Coaching?",
    benefits: "Benefits of Coaching",
    related: ["Individual Therapy", "Couples/Family Therapy", "Group Sessions"],
  },
  {
    id: "groups",
    name: "Group Sessions",
    why: "Why Join Group Sessions?",
    benefits: "Benefits of Group Sessions",
    related: ["Individual Therapy", "Couples/Family Therapy", "Coaching"],
  },
];

for (const service of services) {
  test(`server-renders every section and related card for ${service.id}`, async () => {
    const response = await render(`/services/${service.id}`);
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.ok(html.includes(service.name), `missing ${service.name}`);
    assert.ok(html.includes(service.why), `missing ${service.why}`);
    assert.ok(html.includes(service.benefits), `missing ${service.benefits}`);
    assert.match(html, /How we work/);
    assert.match(html, /More ways to work together/);

    for (const relatedName of service.related) {
      assert.ok(html.includes(relatedName), `missing related card ${relatedName}`);
    }
  });
}
