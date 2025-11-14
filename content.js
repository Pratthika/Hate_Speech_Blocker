// content.js
console.log("Hate Speech Blocker (DEBUG Version) starting...");

const blocklist = {
 //hate speech blocklist set of words
};

let normalizedSet = new Set();
let phraseList = [];
let regexList = [];
let enabled = true;

// Leet/symbol substitutions
const LEET_MAP = {
  a: "[a@4]", b: "[b8]", c: "[c(\\{\\[]", d: "[d]", e: "[e3]",
  f: "[f]", g: "[g9]", h: "[h#]", i: "[i1!|]", j: "[j]",
  k: "[k]", l: "[l1|!]", m: "[m]", n: "[n]", o: "[o0]",
  p: "[p]", q: "[q]", r: "[r]", s: "[s5$]", t: "[t7+]",
  u: "[u]", v: "[v]", w: "[w]", x: "[x]", y: "[y]", z: "[z2]"
};

function normalizeForLookup(s) {
  if (!s || typeof s !== "string") return "";
  return s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

function generateFlexiblePattern(word) {
  return Array.from(word).map(ch => LEET_MAP[ch.toLowerCase()] || ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("");
}

function makeRegexFromWord(word) {
  const cleaned = word.replace(/\s+/g, "");
  // We now allow 2-letter words to be checked.
  if (cleaned.length <= 1) return null; 
  try { return new RegExp("\\b" + generateFlexiblePattern(cleaned) + "(?=\\W|$)", "i"); } 
  catch (e) { return null; }
}

// Load blocklist
function loadBlocklistDirect() {
  Object.keys(blocklist).forEach(k => {
    const arr = blocklist[k];
    if (!Array.isArray(arr)) return;
    arr.forEach(item => {
      const norm = normalizeForLookup(item);
      if (!norm) return;
      if (norm.includes(" ")) phraseList.push(norm);
      else normalizedSet.add(norm);
    });
  });

  normalizedSet.forEach(word => {
    const r = makeRegexFromWord(word);
    if (r) regexList.push(r);
  });

  phraseList.forEach(phrase => {
    const escaped = phrase.split(" ").map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+");
    regexList.push(new RegExp(escaped, "i"));
  });

  console.log("Blocklist loaded:", { words: normalizedSet.size, phrases: phraseList.length, regexes: regexList.length });
  
  // --- ADD THIS NEW LINE ---
  console.log("🧪 DEBUG: The full regexList is:", regexList);
}

// ---------------------------------------------
// 2️⃣ PERSPECTIVE API SETUP (DEBUG VERSION)
// ---------------------------------------------
async function isAIHateSpeech(text) {
  const API_KEY = 'api_key'; 
  if (API_KEY === 'PASTE_YOUR_API_KEY_HERE') {
    console.warn("🔧 DEBUG: API Key is not set.");
    return false;
  }

  console.log(`🤖 DEBUG: Sending to API for analysis: "${text}"`);

  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;
  const requestBody = {
    comment: { text: text },
    requestedAttributes: { TOXICITY: {}, INSULT: {}, THREAT: {}, IDENTITY_ATTACK: {} },
    languages: ['en']
  };

  try {
    console.log("📡 DEBUG: Sending fetch request...");
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });

    console.log("📡 DEBUG: Fetch response received. Status:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ DEBUG: Perspective API Error Response:", errorData);
      return false;
    }

    const data = await response.json();
    console.log("✅ DEBUG: API Success! Received data:", data);

    const toxicityScore = data.attributeScores.TOXICITY?.summaryScore?.value || 0;
    const insultScore = data.attributeScores.INSULT?.summaryScore?.value || 0;
    const threatScore = data.attributeScores.THREAT?.summaryScore?.value || 0;
    const identityScore = data.attributeScores.IDENTITY_ATTACK?.summaryScore?.value || 0;

    console.log(`📊 DEBUG: Scores - Toxicity: ${toxicityScore}, Insult: ${insultScore}, Threat: ${threatScore}, Identity: ${identityScore}`);

    const isToxic = toxicityScore > 0.5;
    const isInsult = insultScore > 0.5;
    const isThreat = threatScore > 0.5;
    const isIdentityAttack = identityScore > 0.5;

    const finalResult = isToxic || isInsult || isThreat || isIdentityAttack;
    console.log(`🏁 DEBUG: Final AI decision: ${finalResult}`);

    return finalResult;

  } catch (err) {
    console.error("❌ DEBUG: CRITICAL: API fetch request failed:", err);
    return false;
  }
}

// ---------------------------------------------
// 3️⃣ Detection Logic
// ---------------------------------------------
function isBlocklistHateful(text) {
  if (!text) return false;
  const norm = normalizeForLookup(text);
  console.log(`🔎 SUPER DEBUG: Checking text "${text}" (normalized: "${norm}") against ${regexList.length} regexes.`);
  
  for (const r of regexList) {
    if (r.test(norm)) {
      console.log(`🔎 SUPER DEBUG: MATCH FOUND! Regex "${r}" matched "${norm}".`);
      return true;
    }
  }
  
  console.log(`🔎 SUPER DEBUG: No match found for "${norm}".`);
  return false;
}

// --- UI Functions ---
function showWarningForInput(input, message = "🛑 Potentially harmful comment — posting disabled") {
  removeWarningForInput(input);
  const warning = document.createElement("div");
  warning.className = "hsb-warning";
  warning.style.color = "white";
  warning.style.background = "#d9534f";
  warning.style.padding = "4px 8px";
  warning.style.borderRadius = "6px";
  warning.style.display = "inline-block";
  warning.style.marginTop = "4px";
  warning.style.fontSize = "12px";
  warning.innerText = message;
  try { input.parentNode?.insertBefore(warning, input.nextSibling); } catch(e){}
}

function removeWarningForInput(input) {
  try { input.parentNode?.querySelector(".hsb-warning")?.remove(); } catch(e){}
}

function setButtonDisabled(button, disable) {
  if (!button) return;
  if (disable) {
    button.dataset.hsbPrevDisabled = button.disabled ? "1" : "0";
    if ("disabled" in button) button.disabled = true;
    button.style.opacity = "0.5";
    button.style.pointerEvents = "none";
    button.dataset.hsbBlocked = "1";
  } else {
    if ("disabled" in button) button.disabled = button.dataset.hsbPrevDisabled === "1";
    button.style.opacity = "";
    button.style.pointerEvents = "";
    button.dataset.hsbBlocked = "0";
  }
}

function blockInteractionOnHate(input, hateful) {
  const isFocused = document.activeElement === input;
  if (hateful && isFocused) {
    if (!document.body.classList.contains("hsb-block-active")) {
      document.body.classList.add("hsb-block-active");
      document.body.style.pointerEvents = "none";
      input.style.pointerEvents = "auto";
      showWarningForInput(input, "🛑 Hateful content detected. All interactions disabled until cleared.");
      console.log("🚫 DEBUG: Mouse and Keyboard interactions BLOCKED.");
    }
  } else {
    if (document.body.classList.contains("hsb-block-active")) {
      document.body.classList.remove("hsb-block-active");
      document.body.style.pointerEvents = "auto";
      removeWarningForInput(input);
      console.log("✅ DEBUG: Mouse and Keyboard interactions RE-ENABLED.");
    }
  }
}

// --- Input Handling ---
const inputTimers = new WeakMap();
async function handleInputDebounced(input, platform) {
  if (!enabled) return;
  if (inputTimers.has(input)) clearTimeout(inputTimers.get(input));
  
  const timer = setTimeout(async () => {
    try {
      const text = getTextFromInput(input);
      const isBlocklist = isBlocklistHateful(text);
      const isAI = await isAIHateSpeech(text);
      const hateful = isBlocklist || isAI;

      const postButton = findButtonForPlatform(input, platform);
      if (hateful) {
        setButtonDisabled(postButton, true);
        const reason = isBlocklist ? 'Blocklist' : 'AI Model';
        showWarningForInput(input, reason === 'Blocklist' ? 'blocklist' : 'ai');

        // --- NEW: Save to history and stats ---
        saveBlockedComment(text, platform.name, reason);

      } else {
        setButtonDisabled(postButton, false);
        removeWarningForInput(input);
      }
      blockInteractionOnHate(input, hateful);
    } catch (e) { console.error("handleInput error", e); }
  }, 500);
  inputTimers.set(input, timer);
}

// --- NEW: Function to save blocked comment data ---
function saveBlockedComment(comment, platform, reason) {
    const entry = {
        timestamp: new Date().toISOString(),
        platform: platform,
        comment: comment,
        reason: reason
    };

    // Save to history
    chrome.storage.local.get({ history: [] }, function(data) {
        data.history.push(entry);
        chrome.storage.local.set({ history: data.history });
    });

    // Save to activity log
    chrome.storage.local.get({ activityLog: [] }, function(data) {
        data.activityLog.push(entry);
        chrome.storage.local.set({ activityLog: data.activityLog });
    });

    // Update stats
    chrome.storage.local.get({ stats: { today: 0, week: 0, total: 0 } }, function(data) {
        data.stats.today++;
        data.stats.week++;
        data.stats.total++;
        chrome.storage.local.set({ stats: data.stats });
    });
}

// --- Helper Functions ---
function getTextFromInput(input) {
  if (!input) return "";
  if (input.tagName === "TEXTAREA" || input.tagName === "INPUT") return input.value;
  if (input.isContentEditable) return input.innerText || input.textContent || "";
  return input.textContent || input.innerText || "";
}

function findButtonForPlatform(input, platform) {
  try {
    const form = input.closest("form, div, article") || document;
    let btns = form.querySelectorAll(platform.buttonSelector);
    if (!btns.length) btns = document.querySelectorAll(platform.buttonSelector);
    if (platform.name === "Instagram") {
      for (let b of btns) if (b.innerText.trim() === "Post") return b;
      return null;
    }
    return btns[0] || null;
  } catch (e) { return null; }
}

function attachToInput(input, platform) {
  if (!input || input.dataset.hsbAttached) return;
  input.dataset.hsbAttached = "1";
  input.addEventListener("input", () => handleInputDebounced(input, platform));
  input.addEventListener("focus", () => handleInputDebounced(input, platform));
}

// --- Platform Configs & Setup ---
const PLATFORM_CONFIGS = [
  { name: "Twitter/X", inputSelector: 'div[role="textbox"]', buttonSelector: 'div[data-testid="tweetButtonInline"], div[data-testid="tweetButton"], div[data-testid="reply"] button' },
  { name: "Facebook", inputSelector: 'div[role="textbox"][contenteditable="true"], textarea[name="xhpc_message"]', buttonSelector: 'div[aria-label="Comment"][role="button"], button[type="submit"][data-testid="react-composer-post-button"]' },
  { name: "Instagram", inputSelector: 'textarea[aria-label^="Add a comment"], textarea[aria-label="Add a comment…"]', buttonSelector: 'div[role="button"][tabindex="0"]' },
  { name: "YouTube", inputSelector: 'ytd-commentbox #contenteditable-root, #placeholder-area', buttonSelector: '#submit-button tp-yt-paper-button, #submit-button button, #submit-button' }
];

function setupGlobalObserver() {
  const observer = new MutationObserver(() => {
    PLATFORM_CONFIGS.forEach(platform => {
      document.querySelectorAll(platform.inputSelector).forEach(input => {
        if (!input.dataset.hsbAttached) attachToInput(input, platform);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  console.log("✅ DEBUG: Global MutationObserver active.");
  PLATFORM_CONFIGS.forEach(platform => {
    document.querySelectorAll(platform.inputSelector).forEach(input => attachToInput(input, platform));
  });
}

function setupGlobalInteractionBlocker() {
  // This single listener handles both mouse clicks and keyboard presses
  document.addEventListener("click", (e) => {
    // Only block if our "hate block" is active
    if (document.body.classList.contains("hsb-block-active")) {
      e.preventDefault();
      e.stopImmediatePropagation();
      console.log("🚫 Blocked mouse click due to hateful content.");
    }
  }, true); // Use capture phase to intercept before Facebook

  document.addEventListener("keydown", (e) => {
    // Only block if our "hate block" is active
    if (document.body.classList.contains("hsb-block-active")) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log("🚫 Blocked Enter key submission due to hateful content.");
      }
    }
  }, true); // Use capture phase

  console.log("✅ Global Interaction Blocker (Mouse + Keyboard) active.");
}

function watchEnabledFlag() {
  if (chrome?.storage?.local) {
    chrome.storage.local.get({ enabled: true }, (res) => { enabled = !!res.enabled; });
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.enabled) enabled = !!changes.enabled.newValue;
    });
  }
}

// ----------------------------------------------------------------------
// NEW: Inject CSS for the cursor
// ----------------------------------------------------------------------
function injectCursorBlockCSS() {
  const styleId = 'hsb-cursor-block-style';
  // Check if we've already added the style to avoid duplicates
  if (document.getElementById(styleId)) {
    return;
  }

  const css = `
    body.hsb-block-active button,
    body.hsb-block-active [role="button"],
    body.hsb-block-active div[aria-label*="Comment"],
    body.hsb-block-active div[aria-label*="Post"],
    body.hsb-block-active div[aria-label*="Reply"],
    body.hsb-block-active div[aria-label*="Send"] {
      cursor: not-allowed !important;
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);
  console.log("✅ CSS for cursor blocking injected.");
}

// ----------------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------------
(function init() {
  loadBlocklistDirect();
  watchEnabledFlag();
  setupGlobalObserver();
  setupGlobalInteractionBlocker();
  injectCursorBlockCSS();
  console.log("Hate Speech Blocker (DEBUG Version) initialized.");

})();
