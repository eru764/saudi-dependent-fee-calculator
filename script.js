function formatNumber(n) {
  return new Intl.NumberFormat("en-US").format(n);
}

function showError(msg) {
  const box = document.getElementById("errorBox");
  box.textContent = msg;
  box.hidden = false;
}

function clearError() {
  const box = document.getElementById("errorBox");
  box.textContent = "";
  box.hidden = true;
}

function parseDateInput(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  // local midnight to avoid timezone shifts
  return new Date(y, m - 1, d);
}

function dateToYMD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Billed months estimate:
 * - counts whole months between dates
 * - if end day > start day, count an extra month (spillover)
 * - minimum 1 if there's any overlap
 */
function billingMonthsBetween(start, end) {
  if (end <= start) return 0;

  const startY = start.getFullYear();
  const startM = start.getMonth();
  const startD = start.getDate();

  const endY = end.getFullYear();
  const endM = end.getMonth();
  const endD = end.getDate();

  let months = (endY * 12 + endM) - (startY * 12 + startM);

  if (endD > startD) months += 1;
  if (months <= 0) months = 1;

  return months;
}

// Fees start date (no charges before this)
const FEE_START = new Date(2017, 6, 1); // 2017-07-01

// Historical schedule (monthly per dependent, SAR)
const FEE_PERIODS = [
  { start: new Date(2017, 6, 1), end: new Date(2018, 6, 1), rate: 100 },
  { start: new Date(2018, 6, 1), end: new Date(2019, 6, 1), rate: 200 },
  { start: new Date(2019, 6, 1), end: new Date(2020, 6, 1), rate: 300 },
  { start: new Date(2020, 6, 1), end: null,              rate: 400 },
];

function overlapRange(aStart, aEnd, bStart, bEnd) {
  const start = aStart > bStart ? aStart : bStart;
  const end = aEnd < bEnd ? aEnd : bEnd;
  return { start, end };
}

const toggleBtn = document.getElementById("toggleBreakdown");
const breakdownWrap = document.getElementById("breakdownWrap");

toggleBtn.addEventListener("click", () => {
  const isOpen = !breakdownWrap.hidden;
  breakdownWrap.hidden = isOpen;
  toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  toggleBtn.textContent = isOpen ? "Show breakdown" : "Hide breakdown";
});

document.getElementById("calcForm").addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();

  const dependents = Number(document.getElementById("dependents").value);
  const expiredSince = parseDateInput(document.getElementById("expiredSince").value);
  const renewUntil = parseDateInput(document.getElementById("renewUntil").value);

  if (!Number.isFinite(dependents) || dependents < 0 || !Number.isInteger(dependents)) {
    return showError("Please enter a valid whole number of dependents (0 or more).");
  }

  if (!expiredSince || !renewUntil) {
    return showError("Please select both dates.");
  }

  if (renewUntil <= expiredSince) {
    return showError('"Renew until" must be after "expired since".');
  }

  // If renewal ends before fees even started => total = 0
  if (renewUntil <= FEE_START) {
    renderResult({
      total: 0,
      rangeLine: `Your selected range ends before fees started (fees start from ${dateToYMD(FEE_START)}).`,
      breakdownItems: [
        `No fees apply because the "renew until" date is before ${dateToYMD(FEE_START)}.`
      ],
    });
    return;
  }

  // Clamp start to fee start to avoid calculating before fees existed
  const effectiveStart = expiredSince < FEE_START ? FEE_START : expiredSince;
  const effectiveEnd = renewUntil;

  let total = 0;
  const breakdownItems = [];

  for (const p of FEE_PERIODS) {
    const periodStart = p.start;
    const periodEnd = p.end ?? new Date(9999, 0, 1);

    const { start, end } = overlapRange(effectiveStart, effectiveEnd, periodStart, periodEnd);
    if (end <= start) continue;

    const months = billingMonthsBetween(start, end);
    const subtotal = dependents * months * p.rate;
    total += subtotal;

    const labelEnd = p.end ? dateToYMD(p.end) : "onward";
    breakdownItems.push(
      `${dateToYMD(p.start)} → ${labelEnd}: ${months} month(s) × SAR ${p.rate} × ${dependents} dependent(s) = SAR ${formatNumber(subtotal)}`
    );
  }

  const originalStartText = dateToYMD(expiredSince);
  const clampedNote = expiredSince < FEE_START
    ? ` (clamped to fee start ${dateToYMD(FEE_START)})`
    : "";

  renderResult({
    total,
    rangeLine: `Range: ${originalStartText}${clampedNote} → ${dateToYMD(renewUntil)} • Dependents: ${dependents}`,
    breakdownItems: breakdownItems.length
      ? breakdownItems
      : ["No overlapping fee periods found for the selected dates."],
  });
});

function renderResult({ total, rangeLine, breakdownItems }) {
  document.getElementById("totalSar").textContent = formatNumber(total);
  document.getElementById("rangeLine").textContent = rangeLine;

  const list = document.getElementById("breakdownList");
  list.innerHTML = "";
  for (const item of breakdownItems) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }

  // reset breakdown UI
  breakdownWrap.hidden = true;
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.textContent = "Show breakdown";

  const result = document.getElementById("result");
  result.hidden = false;
}
