// Debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Get question slug
function getSlug() {
  const parts = window.location.pathname.split("/");
  return parts[2] || null;
}

// Check Accepted in submission result panel ONLY
function isAcceptedNow() {
  const result = document.querySelector('[data-e2e-locator="submission-result"]');
  if (!result) return false;

  const text = result.innerText || "";

  return text.toLowerCase().includes("accepted");
}

/* ------------------ STATE ------------------ */

let lastSavedSlug = null;
let submitClicked = false;

/* ------------------ SUBMIT DETECTION ------------------ */

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const text = btn.innerText || "";

  if (text.toLowerCase().includes("submit")) {
    submitClicked = true;
  }
});

/* ------------------ ACCEPTED CHECK ------------------ */

const checkAcceptedAfterSubmit = debounce(() => {
  if (!submitClicked) return;

  if (!isAcceptedNow()) return;

  const slug = getSlug();
  if (!slug) return;

  if (lastSavedSlug === slug) {
    return;
  }

  lastSavedSlug = slug;
  submitClicked = false;

  const solvedAt = Date.now();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  chrome.runtime.sendMessage({
    type: "SOLVED",
    slug: slug,
    solvedAt: solvedAt,
    timezone: timezone
  });
}, 2000);

/* ------------------ OBSERVER ------------------ */

const observer = new MutationObserver(checkAcceptedAfterSubmit);
observer.observe(document.body, {
  subtree: true,
  childList: true,
});
