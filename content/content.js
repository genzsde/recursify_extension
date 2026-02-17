console.log("Recursify content script loaded");

/* ------------------ HELPERS ------------------ */

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
  console.log("Submission result text:", text);

  return text.toLowerCase().includes("accepted");
}

/* ------------------ STATE ------------------ */

// Prevent duplicate save for same submission
let lastSavedSlug = null;

// Track whether user actually clicked Submit
let submitClicked = false;

/* ------------------ SUBMIT DETECTION ------------------ */

// Detect Submit button click (important: only save after REAL submit)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const text = btn.innerText || "";

  if (text.toLowerCase().includes("submit")) {
    console.log("Submit clicked by user");
    submitClicked = true;
  }
});

/* ------------------ ACCEPTED CHECK ------------------ */

const checkAcceptedAfterSubmit = debounce(() => {
  if (!submitClicked) return;

  console.log("Checking for NEW Accepted result...");

  if (!isAcceptedNow()) return;

  const slug = getSlug();
  if (!slug) return;

  // Prevent duplicate trigger
  if (lastSavedSlug === slug) {
    console.log("Duplicate Accepted ignored:", slug);
    return;
  }

  lastSavedSlug = slug;
  submitClicked = false;

  console.log("NEW ACCEPTED DETECTED:", slug);

  chrome.runtime.sendMessage({
    type: "SOLVED",
    slug: slug,
  });
}, 2000);

/* ------------------ OBSERVER ------------------ */

// Watch for submission result appearing (React updates DOM dynamically)
const observer = new MutationObserver(checkAcceptedAfterSubmit);
observer.observe(document.body, {
  subtree: true,
  childList: true,
});
