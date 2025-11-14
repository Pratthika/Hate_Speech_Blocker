// content.js
console.log("Hate Speech Blocker (DEBUG Version) starting...");

const blocklist = {
  "english": [
    "arse", "arsehead", "arsehole", "ass", "ass hole", "asshole", "bastard", "bitch", "bloody", "bollocks",
    "breast", "brotherfucker", "bugger", "bullshit", "child-fucker", "christ on a bike", "christ on a cracker",
    "cock", "cocksucker", "crap", "cunt", "dammit", "damn", "damned", "damn it", "dick", "dick-head", "dickhead",
    "dumb ass", "dumb-ass", "dumbass", "dyke", "fag", "faggot", "fart", "father-fucker", "fatherfucker",
    "fuck", "fucked", "fucker", "fucking", "fuck yourself", "god dammit", "goddammit", "god damn", "goddamn",
    "goddamned", "goddamnit", "godsdamn", "hell", "holy shit", "horseshit", "in shit", "jackarse", "jack-ass",
    "jackass", "jesus christ", "jesus fuck", "jesus harold christ", "jesus h. christ", "jesus, mary and joseph",
    "jesus wept", "kike", "kiss my ass", "mental", "mother fucker", "mother-fucker", "motherfucker",
    "nigga", "nigra", "penis", "pigfucker", "piss", "poop", "prick", "pussy", "retarded cunt", "shit", "shit ass",
    "shite", "shut your ass", "sibling fucker", "sisterfuck", "sisterfucker", "slut", "son of a bitch",
    "son of a whore", "spastic", "sweet jesus", "tranny", "twat", "wanker", "whore", "vagina"
  ],
  "hindi": [
    "guddha naku", "guddha pagala dengutha", "aathu pooku", "aathulu", "aathulu peeku", "aathulu peekutha",
    "aati mokka", "aatu leni mogga", "akka bokka lO naa sulla", "akka nee pooku dengutha", "amma pooku ki baanisa",
    "amma pooku lo arati pandu", "aritipandu mogga", "attha pooku dengina alldu", "bochu", "bosudi",
    "chilipiga thittatam", "chitthu pooka", "cutlet etthi guddha lo pettuko", "dengithe dayyalu pudatai", "dengu",
    "dhani puku lo erugu", "doola lanja", "erri pooka", "erugu", "gaadida pichaloda", "gaja madda", "gajji modda",
    "golli cheeku ra kodaka", "golli chekutha lanja", "gudda", "gudda naaku", "guddha cheeku", "gudha kindha kovvu pattindha",
    "hasta prayogam chai", "jinniappa", "kammani pooku", "kojja", "kojja munda", "konamodda",
    "kuddda chinchi pagal dengutha", "kukka -pooka", "kukka sulli", "kutha chimpi para dengutha (kcpd)",
    "kuthuru vongudu..alludu dhengudu", "lafoot lanja", "langa vippavae lanjaa", "lanja", "lanja - kodka",
    "lanja munda", "lanja pooka", "lanjakodka", "leki puku", "malvika", "marmangam", "modda", "modda cheeku lanja",
    "modda kuduvu", "modda naaku", "modda notlo petti dengutha", "modda, lavada, daddu, magatanam", "muchchika, chanu mona",
    "muddy lo velu petuko", "naa modda gudu", "ne akka nu denga", "ne akkan ma kukka dengha", "ne amma ni denga",
    "ne amma pukkulo naa modda", "ne jathini kukka denga", "ne mama puku denga", "ne notlo naa suli", "ne pookula na sulli",
    "nee aali pookulo rampam", "nee akkaani dengaa", "nee akkanu denga", "nee alini dengaa", "nee amma guddani denga",
    "nee amma kuttani denga", "nee amma puku lo sulli", "nee amma roju na modda cheekuthundi", "nee ammani dengaa",
    "nee ammanu denga", "nee ammanu dnegu", "nee kooturu ni denga", "nee notlo naa sulli", "nee pallu super",
    "nee payal madhyalo na sulli", "nee pellaanni denga", "nee pooku chekutha", "nee pooku lo na gudda",
    "nee pukulo naa sulli", "ni akkani pandulu denga", "ni gudha la gudu pedtha", "ni pukla na madda", "nihar", "banda pooku",
    "ninnu dengutha", "nuvvu nee yendipoyina sulli", "paaki munda", "pedda salladhi", "pichi pukoda", "pichi pukudaana",
    "piyya thinnu", "poi voungu ra", "pooku", "pooku pagaldenguta", "poooku chinchu", "pucci na kodaka", "pukku naaku",
    "puku peka adistha", "puthhi", "sachinoda", "sallu dengutha", "sanalo bochho", "shaata", "sravan", "konda verri pooku",
    "sulii", "sulli pattu", "teja", "adivi pooku", "teja trivikram", "thurku valagodtha", "vattakai", "vattalu",
    "vedhava", "verri puka", "vongo petti dengutha lanja"
  ],
  "tamil": [
    "otha", "watha", "ommala", "ommaley", "wommala", "okkala oli", "wokkala oli", "thayoli", "thevidiya",
    "punda", "panda", "bunda", "loosu", "loosu punda", "loosu panda", "loosu bunda", "koodhi", "loosu koodhi",
    "mayiraandi", "poramboku", "pannaada", "paradesi", "soothu", "kurudu", "sevudu", "mundam", "oombu",
    "mazhumatta koodhi", "kena p", "okuradhu", "othuta", "puluthi", "lavadegabaal", "lavade", "lavada", "fuck",
    "asshole", "motherfucker", "shit", "hoe", "bitch", "slut", "gigolo", "gawk", "backshot", "fingering", "69",
    "wet", "dick", "hard", "blowjob", "handjob", "nigga", "black", "asian", "pin", "pound",
    "தாயொழி", "ஓத்தா", "தெவிடியாப்பிள்ளை", "சூத்தமூடு", "பீ", "தெவிடியா", "புண்டை", "ஊம்பாதவாயா",
    "நக்கிட்டுப்போ", "ஓத்திட்டுப்போ", "ஓம்மால", "ஓக்காளி", "புண்டை மவனே", "பொச்சு", "சுன்னி", "பூல்", "பூலு",
    "குசு", "நாயே", "முலை", "அறிவு கெட்ட கூதி"
  ],
  "telugu": [
    "aad", "aand", "bahenchod", "behenchod", "bhenchod", "bhenchodd", "b.c.", "bc", "bakchod", "bakchodd",
    "bakchodi", "bevda", "bewda", "bevdey", "bewday", "bevakoof", "bevkoof", "bevkuf", "bewakoof", "bewkoof",
    "bewkuf", "bhadua", "bhaduaa", "bhadva", "bhadvaa", "bhadwa", "bhadwaa", "bhosada", "bhosda", "bhosdaa",
    "bhosdike", "bhonsdike", "bsdk", "b.s.d.k", "bhosdiki", "bhosdiwala", "bhosdiwale", "bhosadchodal",
    "bhosadchod", "babbe", "babbey", "bube", "bubey", "bur", "burr", "buurr", "buur", "charsi", "chooche",
    "choochi", "chuchi", "chhod", "chod", "chodd", "chudne", "chudney", "chudwa", "chudwaa", "chudwane",
    "chudwaane", "choot", "chut", "chute", "chutia", "chutiya", "chutiye", "chuttad", "chutad", "dalaal", "dalal",
    "dalle", "dalley", "fattu", "gadha", "gadhe", "gadhalund", "gaand", "gand", "gandu", "gandfat", "gandfut",
    "gandiya", "gandiye", "goo", "gu", "gote", "gotey", "gotte", "hag", "haggu", "hagne", "hagney", "harami", "haramjada", "haraamjaada", "haramzyada", "haraamzyaada", "haraamjaade",
    "haraamzaade", "haraamkhor", "haramkhor", "jhat", "jhaat", "jhaatu", "jhatu", "kutta", "kutte", "kuttey",
    "kutia", "kutiya", "kuttiya", "kutti", "landi", "landy", "laude", "laudey", "laura", "lora", "lauda", "ling",
    "loda", "lode", "lund", "launda", "lounde", "laundey", "laundi", "loundi", "laundiya", "loundiya", "lulli",
    "maar", "maro", "marunga", "madarchod", "madarchodd", "madarchood", "madarchoot", "madarchut", "m.c.", "mc",
    "mamme", "mammey", "moot", "mut", "mootne", "mutne", "mooth", "muth", "nunni", "nunnu", "paaji", "paji",
    "pesaab", "pesab", "peshaab", "peshab", "pilla", "pillay", "pille", "pilley", "pisaab", "pisab", "pkmkb",
    "porkistan", "raand", "rand", "randi", "randy", "suar", "tatte", "tatti", "tatty", "ullu"
  ],
  "violent": ["kill", "attack", "violence", "rape", "bomb"]
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
  const API_KEY = 'AIzaSyCw85lrqDIlhPn9UKUfqJr4X_5gj87sODA'; 
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