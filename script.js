// script.js (FULL) — months + days prorated estimate
// Daily proration uses: daily = monthlyRate / 30 (estimate)

function formatNumber(n) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);
}

function showError(msg) {
  const box = document.getElementById("errorBox");
  if (!box) return;
  box.textContent = msg;
  box.hidden = false;
}

function clearError() {
  const box = document.getElementById("errorBox");
  if (!box) return;
  box.textContent = "";
  box.hidden = true;
}

function parseDateInput(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d); // local date at midnight
}

function dateToYMD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysInMonth(year, monthIndex0) {
  // monthIndex0 is 0-11
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

function addMonthsClamped(date, monthsToAdd) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  const targetMonth = m + monthsToAdd;
  const targetYear = y + Math.floor(targetMonth / 12);
  const targetMonthIndex = ((targetMonth % 12) + 12) % 12;

  const dim = daysInMonth(targetYear, targetMonthIndex);
  const clampedDay = Math.min(d, dim);

  return new Date(targetYear, targetMonthIndex, clampedDay);
}

function utcDayNumber(d) {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000;
}

function diffDaysUTC(start, end) {
  // end-exclusive day difference (safe vs DST)
  return Math.max(0, Math.round(utcDayNumber(end) - utcDayNumber(start)));
}

/**
 * Split [start, end) into full calendar months + remaining days.
 * Example: Jan 1 -> Feb 15 = 1 month + 14 days.
 */
function splitMonthsAndDays(start, end) {
  if (end <= start) return { months: 0, days: 0 };

  let months = 0;
  let cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());

  while (true) {
    const next = addMonthsClamped(cursor, 1);
    if (next <= end) {
      months += 1;
      cursor = next;
    } else {
      break;
    }
  }

  const days = diffDaysUTC(cursor, end);
  return { months, days };
}

function overlap(aStart, aEnd, bStart, bEnd) {
  const start = aStart > bStart ? aStart : bStart;
  const end = aEnd < bEnd ? aEnd : bEnd;
  return { start, end };
}

// Fees start date (NO charges before this)
const FEE_START = new Date(2017, 6, 1); // 2017-07-01

// Historical monthly fee per dependent (SAR)
const PERIODS = [
  { start: new Date(2017, 6, 1), end: new Date(2018, 6, 1), rate: 100 },
  { start: new Date(2018, 6, 1), end: new Date(2019, 6, 1), rate: 200 },
  { start: new Date(2019, 6, 1), end: new Date(2020, 6, 1), rate: 300 },
  { start: new Date(2020, 6, 1), end: null,              rate: 400 },
];

// Breakdown toggle (only exists on calculator page)
const toggleBtn = document.getElementById("toggleBreakdown");
const breakdownWrap = document.getElementById("breakdownWrap");

if (toggleBtn && breakdownWrap) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = !breakdownWrap.hidden;
    breakdownWrap.hidden = isOpen;
    toggleBtn.setAttribute("aria-expanded", String(!isOpen));
    // lang.js may overwrite this label; keep English fallback
    toggleBtn.textContent = isOpen ? "Show breakdown" : "Hide breakdown";
  });
}

const form = document.getElementById("calcForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearError();

    const dependents = Number(document.getElementById("dependents")?.value);
    const expiredSince = parseDateInput(document.getElementById("expiredSince")?.value);
    const renewUntil = parseDateInput(document.getElementById("renewUntil")?.value);

    if (!Number.isFinite(dependents) || dependents < 0 || !Number.isInteger(dependents)) {
      return showError("Please enter a valid whole number of dependents (0 or more).");
    }
    if (!expiredSince || !renewUntil) {
      return showError("Please select both dates.");
    }
    if (renewUntil <= expiredSince) {
      return showError('"Renew until" must be after "expired since".');
    }

    // If renewal ends before fee start: total is 0 by design
    if (renewUntil <= FEE_START) {
      return renderResult({
        total: 0,
        rangeLine: `No fee: your renewal ends before fees started (${dateToYMD(FEE_START)}).`,
        breakdownItems: [
          `Fees only apply from ${dateToYMD(FEE_START)} onward.`,
        ],
      });
    }

    // Clamp start so we never charge before 2017-07-01
    const effectiveStart = expiredSince < FEE_START ? FEE_START : expiredSince;
    const effectiveEnd = renewUntil;

    let total = 0;
    const breakdownItems = [];

    for (const p of PERIODS) {
      const pStart = p.start;
      const pEnd = p.end ?? new Date(9999, 0, 1);

      const { start, end } = overlap(effectiveStart, effectiveEnd, pStart, pEnd);
      if (end <= start) continue;

      const { months, days } = splitMonthsAndDays(start, end);

      const dailyRate = p.rate / 30; // estimate
      const subtotal =
        dependents * (months * p.rate + days * dailyRate);

      total += subtotal;

      breakdownItems.push(
        `${dateToYMD(pStart)} → ${p.end ? dateToYMD(p.end) : "onward"}: ` +
        `${months} month(s) + ${days} day(s) × ` +
        `${dependents} dependent(s) = SAR ${formatNumber(subtotal)} ` +
        `(monthly SAR ${p.rate}, daily ≈ SAR ${formatNumber(dailyRate)})`
      );
    }

    const clampNote = expiredSince < FEE_START
      ? ` (start clamped to ${dateToYMD(FEE_START)})`
      : "";

    breakdownItems.push(
      `Proration note: days are estimated using monthly/30. Official systems may bill monthly and can differ.`
    );

    renderResult({
      total,
      rangeLine: `Range: ${dateToYMD(expiredSince)}${clampNote} → ${dateToYMD(renewUntil)} • Dependents: ${dependents}`,
      breakdownItems,
    });
  });
}

function renderResult({ total, rangeLine, breakdownItems }) {
  const totalEl = document.getElementById("totalSar");
  const rangeEl = document.getElementById("rangeLine");
  const list = document.getElementById("breakdownList");
  const resultBox = document.getElementById("result");

  if (totalEl) totalEl.textContent = formatNumber(total);
  if (rangeEl) rangeEl.textContent = rangeLine;

  if (list) {
    list.innerHTML = "";
    for (const item of breakdownItems) {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    }
  }

  if (breakdownWrap && toggleBtn) {
    breakdownWrap.hidden = true;
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.textContent = "Show breakdown";
  }

  if (resultBox) resultBox.hidden = false;
}
