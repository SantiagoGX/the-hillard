const ICAL_URL =
  'https://app.guesty.com/api/public/icalendar-dashboard-api/export/34915312-1b7a-44b7-b3d1-ef01cce2f7b8';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function fmt(s) {
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const res = await fetch(ICAL_URL);
    const text = await res.text();

    const ranges = [];
    const re = /DTSTART[^:]*:(\d{8})[\s\S]*?DTEND[^:]*:(\d{8})/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      // iCal DTEND is exclusive — subtract 1 day so checkout date is bookable
      ranges.push({ from: fmt(m[1]), to: addDays(fmt(m[2]), -1) });
    }

    return new Response(JSON.stringify(ranges), {
      headers: {
        ...CORS,
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=300',
      },
    });
  },
};
