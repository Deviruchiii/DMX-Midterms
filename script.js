/* =====================================================
   THE DIGITAL MEDIA ARCANA - script.js
   Sections:
   1. Card data (edit your content here!)
   2. Grab page elements
   3. Build the cards from the data
   4. Flip a card
   5. Description bubble (open / close / position)
   6. Audio toggle
   7. Start the page
   ===================================================== */


/* ---------- 1. CARD DATA ----------
   Each { ... } is one card. To add a card, copy one block and edit it;
   the grid adds a new card (and a new row when needed) automatically.

   accent = the stained-glass color of the card's keyword pill and title bar.
   To change it, write one of: "blue", "amber", "magenta", "violet".

   image = the picture on the face-up card. The files live in the images/ folder.
   To swap one, put the new file in images/ and change the path here
   Use a PNG with a transparent background (about 520 px wide), so the card color shows through. */
const cards = [
  {
    numeral: "I",
    title: "THE ARCHITECT",
    concept: "Geometric Primitives",
    subtitle: "Geometric Primitives",
    keyword: "BUILDING BLOCKS",
    accent: "blue",
    image: "images/geometric-primitives.png",
    imageAlt: "Icon of a cone, a sphere and a cube drawn as simple outlined shapes",
    description: "Geometric primitives are the simplest shapes a vector image is made from. They include lines, polylines, circles, rectangles, ellipses, and polygons. Even a detailed illustration, like a car, is just many primitives layered and combined. Because each primitive is stored as math instead of pixels, it stays sharp at any size."
  },
  {
    numeral: "II",
    title: "THE WEAVER",
    concept: "Bézier Curves",
    subtitle: "Bézier Curves",
    keyword: "SMOOTH PATHS",
    accent: "amber",
    image: "images/bezier-curve.png",
    imageAlt: "Icon of a pen tool drawing a curve with anchor points and control handles",
    description: "A Bézier curve is a parametric curve named after Pierre Bézier, who used it to design Renault car bodies in the 1960s. A cubic Bézier is defined by four points. P0 and P3 are where the curve starts and ends, and P1 and P2 are control points that pull the curve into shape. Unlike a polygonal line made of short straight segments, a Bézier curve looks smooth at every scale."
  },
  {
    numeral: "III",
    title: "THE PRINTER",
    concept: "EPS",
    subtitle: "EPS (Encapsulated PostScript)",
    keyword: "PRINT STANDARD",
    accent: "magenta",
    image: "images/eps.png",
    imageAlt: "EPS file icon with a pen nib on it",
    description: "EPS is Adobe's format from the 1980s and has long been the standard interchange format of the print industry. It is a PostScript-based file that describes an image or drawing, so it works directly with PostScript printers. Designers still use it to send logos and artwork to print shops."
  },
  {
    numeral: "IV",
    title: "THE ILLUSTRATOR",
    concept: "Ai",
    subtitle: "Ai (Adobe Illustrator)",
    keyword: "NATIVE FORMAT",
    accent: "violet",
    image: "images/ai.png",
    imageAlt: "Adobe Illustrator logo: orange letters Ai on a dark square",
    description: "Ai is the native file format of Adobe Illustrator, first released in 1987. It stores single-page vector artwork and began as a modified version of the EPS format. Because Illustrator is an industry-standard tool, Ai files are widely supported across design software."
  },
  {
    numeral: "V",
    title: "THE SCRIBE",
    concept: "SVG",
    subtitle: "SVG (Scalable Vector Graphics)",
    keyword: "OPEN STANDARD",
    accent: "blue",
    image: "images/svg.png",
    imageAlt: "SVG file icon showing a curve with anchor points",
    description: "SVG is the W3C's standard vector format, introduced in 1999. It is written in XML, so you can open an SVG and read its shapes as plain text code. It also supports interactivity and animation, which is why browsers can display it natively. The card backs on this site are SVG."
  },
  {
    numeral: "VI",
    title: "THE PHANTOM",
    concept: "SWF",
    subtitle: "SWF (ShockWave Flash)",
    keyword: "WEB ANIMATION",
    accent: "amber",
    image: "images/swf.png",
    imageAlt: "SWF file icon with the red Flash logo",
    description: "SWF is the Flash file format, created by Macromedia in 1996 and later acquired by Adobe. Its name comes from \"ShockWave Flash.\" It powered animated websites, games, and cartoons in the early web, but browsers phased it out after Flash Player reached end of life in 2020."
  },
  {
    numeral: "VII",
    title: "THE GIANT",
    concept: "Scaling",
    subtitle: "Scaling Transformation",
    keyword: "ZOOM",
    accent: "magenta",
    image: "images/scale.png",
    imageAlt: "Icon of a small square growing into a larger square, with an arrow",
    description: "Scaling changes the size of an object by expanding or compressing its dimensions. It works by multiplying the original coordinates by a scaling factor: X′ = X · Sx and Y′ = Y · Sy. Because vectors are stored as coordinates, scaling them up never causes pixelation."
  },
  {
    numeral: "VIII",
    title: "THE WHEEL",
    concept: "Rotation",
    subtitle: "Rotation Transformation",
    keyword: "ANGLED SPIN",
    accent: "violet",
    image: "images/rotate.png",
    imageAlt: "3D cube with a circular arrow around it, showing rotation",
    description: "Rotation turns an object by a particular angle, called theta (θ), around its origin. Every point in the shape is repositioned using that angle while the shape itself stays intact. In code, this is the <code>rotate()</code> function."
  },
  {
    numeral: "IX",
    title: "THE TRAVELER",
    concept: "Translation",
    subtitle: "Translation",
    keyword: "DIRECTIONAL SHIFT",
    accent: "blue",
    image: "images/translation.png",
    imageAlt: "Icon of a square with arrows pointing up, down, left and right",
    description: "Translation moves an object to a different position on the screen without changing its size or shape. Each point is moved by adding translation values to its original coordinates: X′ = X + tx and Y′ = Y + ty. In code, this is the <code>translate()</code> function."
  }
];


/* ---------- 2. GRAB PAGE ELEMENTS ----------
   document.getElementById finds an element by its id in index.html. */
const cardGrid = document.getElementById("card-grid");
const gridWrapper = document.getElementById("grid-wrapper");
const bubble = document.getElementById("bubble");
const bubbleTitle = document.getElementById("bubble-title");
const bubbleBody = document.getElementById("bubble-body");
const bubbleClose = document.getElementById("bubble-close");
const backdrop = document.getElementById("backdrop");
const siteHeader = document.querySelector(".site-header");
const audio = document.getElementById("ambient-audio");
const audioToggle = document.getElementById("audio-toggle");
const audioIcon = document.getElementById("audio-icon");

// Checks if the user's device asks for less animation
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Variables that remember the current state
const cardButtons = [];   // list of all card <button> elements
let activeIndex = null;   // which card is flipped right now (null = none)


/* ---------- 3. BUILD THE CARDS FROM THE DATA ---------- */

/* CARD BACK (GRAPHICS REQUIREMENT): the same artwork as images/card-back.svg,
   written as inline SVG so the browser draws it as real vector shapes.
   - stroke="currentColor" takes the gold color set on .card-back-art in style.css.
   - The small 4-point stars use <use href="#spark">. The "spark" shape is defined
     ONCE in index.html (the hidden SVG sprite), not once per card, so the page
     never has two elements with the same id. */
const cardBackSvg = `
  <svg class="card-back-art" viewBox="0 0 260 420" aria-hidden="true">
    <!-- Card body -->
    <rect class="card-back-body" x="1" y="1" width="258" height="418" rx="16" stroke="currentColor" stroke-width="2"/>

    <!-- Double frame: outer line + inner cut corners -->
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="14" width="232" height="392" rx="8" stroke-width="1.2"/>
      <path d="M26 40 L26 30 Q26 26 30 26 L40 26 M220 26 L230 26 Q234 26 234 30 L234 40 M234 380 L234 390 Q234 394 230 394 L220 394 M40 394 L30 394 Q26 394 26 390 L26 380" stroke-width="1"/>
    </g>

    <!-- Top: small sun -->
    <g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" transform="translate(130 62)">
      <circle r="7"/>
      <path d="M0 -12 V-17 M0 12 V17 M-12 0 H-17 M12 0 H17"/>
      <path d="M8.5 -8.5 L12 -12 M-8.5 -8.5 L-12 -12 M8.5 8.5 L12 12 M-8.5 8.5 L-12 12"/>
    </g>

    <!-- Center: all-seeing eye inside a sunburst ring -->
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(130 210)">
      <g stroke-width="1.2">
        <path d="M0 -62 V-84 M0 62 V84 M-62 0 H-84 M62 0 H84"/>
        <path d="M44 -44 L60 -60 M-44 -44 L-60 -60 M44 44 L60 60 M-44 44 L-60 60"/>
        <path d="M24 -57 L31 -77 M-24 -57 L-31 -77 M24 57 L31 77 M-24 57 L-31 77"/>
        <path d="M57 -24 L77 -31 M-57 -24 L-77 -31 M57 24 L77 31 M-57 24 L-77 31"/>
      </g>
      <circle r="56" stroke-width="1.4"/>
      <circle r="48" stroke-width="0.8" stroke-dasharray="2 4"/>
      <path d="M-34 0 Q0 -30 34 0 Q0 30 -34 0 Z" stroke-width="1.6"/>
      <circle r="13" stroke-width="1.4"/>
      <circle r="5" fill="currentColor" stroke="none"/>
      <path d="M0 -26 V-34 M-16 -22 L-20 -29 M16 -22 L20 -29" stroke-width="1.2"/>
    </g>

    <!-- Bottom: crescent moon -->
    <path d="M140 338 A22 22 0 1 1 118 318 A17 17 0 1 0 140 338 Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>

    <!-- Stars. The four small ones twinkle (see "twinkle" in style.css). -->
    <g fill="currentColor">
      <use href="#spark" x="130" y="372"/>
      <g class="card-back-stars">
        <use href="#spark" x="52" y="120" transform="translate(52 120) scale(0.6) translate(-52 -120)"/>
        <use href="#spark" x="208" y="120" transform="translate(208 120) scale(0.6) translate(-208 -120)"/>
        <use href="#spark" x="52" y="300" transform="translate(52 300) scale(0.6) translate(-52 -300)"/>
        <use href="#spark" x="208" y="300" transform="translate(208 300) scale(0.6) translate(-208 -300)"/>
      </g>
      <circle cx="70" cy="80" r="1.4"/><circle cx="190" cy="80" r="1.4"/>
      <circle cx="70" cy="345" r="1.4"/><circle cx="190" cy="345" r="1.4"/>
      <circle cx="40" cy="210" r="1.4"/><circle cx="220" cy="210" r="1.4"/>
    </g>
  </svg>
`;

function buildCards() {
  // forEach runs the code below once for every card in the array
  cards.forEach(function (data, index) {

    // Create a list item to hold the card
    const item = document.createElement("li");

    // Write the card's HTML. ${...} inserts values from the data.
    item.innerHTML = `
      <button class="card" type="button" aria-pressed="false" data-accent="${data.accent}"
              aria-label="Card ${index + 1} of ${cards.length}, face down. Press to reveal.">
        <span class="card-inner">

          <!-- FACE DOWN (back of the card): inline SVG, see cardBackSvg above -->
          <span class="card-face card-back">${cardBackSvg}</span>

          <!-- FACE UP (front of the card) -->
          <span class="card-face card-front">
            <span class="card-numeral">${data.numeral}</span>
            <img class="card-image" src="${data.image}" alt="${data.imageAlt}"
                 width="224" height="230" loading="lazy">
            <span class="card-title">${data.title}</span>
            <span class="card-subtitle">${data.subtitle}</span>
            <span class="card-keyword">${data.keyword}</span>
          </span>

        </span>
      </button>
    `;

    // Find the button we just made and listen for clicks on it
    const button = item.querySelector(".card");
    button.addEventListener("click", function () {
      handleCardClick(index);
    });

    cardButtons.push(button);   // remember it
    cardGrid.appendChild(item); // put it on the page
  });
}


/* ---------- 4. FLIP A CARD ---------- */

// Runs whenever a card is clicked
function handleCardClick(index) {

  // Case 1: the card is already flipped -> put it back and close the bubble
  if (activeIndex === index) {
    putCardBack(false);
    return;
  }

  // Case 2: a different card is flipped -> flip that one back first
  if (activeIndex !== null) {
    closeBubble(false);
    flipCard(activeIndex, false);
  }

  // Case 3: flip the clicked card, then show the bubble AFTER the flip ends
  activeIndex = index;
  fillBubble(index);      // write the text first, so the bubble's size is known
  flipCard(index, true);
  waitForFlip(index, function () {
    openBubble(index);
  });
}

// Puts the drawn card back in the grid, face down, and closes the bubble.
// If returnFocus is true, keyboard focus goes back to the card.
function putCardBack(returnFocus) {
  if (activeIndex === null) return;

  closeBubble(returnFocus);
  flipCard(activeIndex, false);
  activeIndex = null;
}

// Turns a card face up (true) or face down (false).
// Face up also "draws" the card: it rises to the middle of the screen and grows.
function flipCard(index, faceUp) {
  const button = cardButtons[index];
  const data = cards[index];

  if (faceUp) placeDrawnCard(index);                // tell the CSS where to move the card

  button.classList.toggle("flipped", faceUp);       // adds/removes the "flipped" class
  backdrop.classList.toggle("show", faceUp);        // dim the page behind a drawn card
  document.documentElement.classList.toggle("card-drawn", faceUp);  // stop page scrolling (style.css)
  button.setAttribute("aria-pressed", faceUp);      // tells screen readers the state

  // Update the label that screen readers announce
  if (faceUp) {
    button.setAttribute("aria-label", data.numeral + ", " + data.title + ". Press to flip back.");
  } else {
    button.setAttribute("aria-label", "Card " + (index + 1) + " of " + cards.length + ", face down. Press to reveal.");
  }
}

const bubbleWidth = 300;  // must match the width in style.css
const bubbleGap = 12;     // space between the drawn card and the bubble

// Works out where a drawn card should sit on the screen and how big it should be.
// Returns the move (x, y), the scale, and the card's final left/right/top edges.
function getDrawnPosition(index) {
  // The <li> is the card's slot in the grid. It never moves, so we measure from it.
  const slot = cardButtons[index].parentElement.getBoundingClientRect();

  const isPhone = window.innerWidth < 640;
  const margin = isPhone ? 16 : 24;                             // breathing room around the card
  const screenWidth = document.body.clientWidth;                // page width without the scrollbar
  const screenHeight = window.innerHeight;

  // On phones the drawn card covers the header (see style.css), so the header takes no space
  const headerBottom = isPhone ? 0 : Math.max(siteHeader.getBoundingClientRect().bottom, 0);

  // Space kept free for the bubble: beside the card, or (on phones) the bottom sheet
  const sideSpace = isPhone ? 0 : bubbleGap + bubbleWidth;
  const bottomSpace = isPhone ? bubble.offsetHeight : 0;

  const freeWidth = screenWidth - sideSpace - margin * 2;
  const freeHeight = screenHeight - headerBottom - bottomSpace - margin * 2;

  // Grow up to 1.5x, but never bigger than the free space (and never tiny)
  let scale = Math.min(1.5, freeWidth / slot.width, freeHeight / slot.height);
  scale = Math.max(scale, 0.6);

  // The middle of the free space is where the card's centre should end up
  const centerX = (screenWidth - sideSpace) / 2;
  const centerY = headerBottom + (screenHeight - headerBottom - bottomSpace) / 2;

  const width = slot.width * scale;
  const height = slot.height * scale;

  return {
    x: centerX - (slot.left + slot.width / 2),
    y: centerY - (slot.top + slot.height / 2),
    scale: scale,
    left: centerX - width / 2,
    right: centerX + width / 2,
    top: centerY - height / 2
  };
}

// Stores the move and scale as CSS variables; ".card.flipped" in style.css uses them
function placeDrawnCard(index) {
  const position = getDrawnPosition(index);
  const button = cardButtons[index];

  button.style.setProperty("--zoom-x", position.x + "px");
  button.style.setProperty("--zoom-y", position.y + "px");
  button.style.setProperty("--zoom-scale", position.scale);
}

// Waits until the flip animation is finished, then runs "callback"
function waitForFlip(index, callback) {
  const inner = cardButtons[index].querySelector(".card-inner");

  // If reduced motion is on there is no rotation, so just wait a short moment
  if (reduceMotion.matches) {
    setTimeout(function () {
      if (activeIndex === index) callback();
    }, 300);
    return;
  }

  // "transitionend" fires when the CSS animation finishes
  inner.addEventListener("transitionend", function () {
    // Only continue if this card is still the active one
    if (activeIndex === index) callback();
  }, { once: true }); // { once: true } = run this listener a single time
}


/* ---------- 5. DESCRIPTION BUBBLE ---------- */

// Write a card's title and description into the (still hidden) bubble
function fillBubble(index) {
  const data = cards[index];

  // Title format: "III · THE PRINTER — EPS". The concept goes in its own
  // <span> so the CSS can show it in normal case instead of uppercase.
  const concept = document.createElement("span");
  concept.className = "bubble-concept";
  concept.textContent = "— " + data.concept;

  bubbleTitle.textContent = data.numeral + " · " + data.title + " ";
  bubbleTitle.appendChild(concept);
  // innerHTML (not textContent) so <code> tags inside a description work
  bubbleBody.innerHTML = data.description;
}

// Place the bubble next to the drawn card and fade it in
function openBubble(index) {
  positionBubble(index);
  bubble.classList.add("open");

  // Move keyboard focus into the bubble (accessibility)
  requestAnimationFrame(function () {
    bubbleClose.focus({ preventScroll: true });
  });
}

// Hide the bubble. If returnFocus is true, send focus back to the card.
function closeBubble(returnFocus) {
  const wasOpen = bubble.classList.contains("open");
  bubble.classList.remove("open");

  if (wasOpen && returnFocus && activeIndex !== null) {
    // preventScroll: the card is still flying back, so don't let the page chase it
    cardButtons[activeIndex].focus({ preventScroll: true });
  }
}

// Put the bubble beside the drawn card, on its right side
function positionBubble(index) {

  // On phones the CSS turns the bubble into a bottom sheet, so clear our positions
  if (window.innerWidth < 640) {
    bubble.style.top = "";
    bubble.style.left = "";
    return;
  }

  // Where the drawn card ends up on the screen, and where the wrapper is.
  // The bubble's top/left are measured from the wrapper, so we subtract its position.
  const cardBox = getDrawnPosition(index);
  const wrapBox = gridWrapper.getBoundingClientRect();

  const left = cardBox.right - wrapBox.left + bubbleGap;
  const top = cardBox.top - wrapBox.top + 40;   // a little below the top of the card

  bubble.style.left = left + "px";
  bubble.style.top = top + "px";
}

// --- Ways to put the card back (this also closes the bubble) ---

// 1. Click the ✕ close button
bubbleClose.addEventListener("click", function () {
  putCardBack(true);
});

// 2. Press the Esc key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    putCardBack(true);
  }
});

// 3. Click the dimmed area (anywhere outside the bubble, the cards, and the header)
document.addEventListener("click", function (event) {
  const clickedInsideBubble = bubble.contains(event.target);
  const clickedACard = event.target.closest(".card");
  const clickedHeader = siteHeader.contains(event.target);

  if (!clickedInsideBubble && !clickedACard && !clickedHeader) {
    putCardBack(false);
  }
});

// If the window is resized while a card is drawn, move the card and the bubble to the new centre
window.addEventListener("resize", function () {
  if (activeIndex === null) return;

  placeDrawnCard(activeIndex);
  if (bubble.classList.contains("open")) {
    positionBubble(activeIndex);
  }
});


/* ---------- 6. AUDIO TOGGLE ---------- */

// Play the audio if it is paused, pause it if it is playing
audioToggle.addEventListener("click", function () {
  // The visitor is using the button now, so the "first action" helper below is not needed
  stopWaitingForFirstAction();

  if (audio.paused) {
    // play() returns a promise; .catch handles errors (e.g. file missing)
    audio.play().catch(function (error) {
      console.log("Audio could not play. Is audio/ambient-audio.mp3 in place?", error);
    });
  } else {
    audio.pause();
  }
});

// --- Start the music automatically ---
// Browsers usually block sound until the visitor has clicked or pressed a key.
// So we try to play right away, and if the browser says no, we wait for the
// visitor's first click or key press and start the music then.

// Runs on the visitor's first click or key press
function startOnFirstAction() {
  audio.play()
    .then(stopWaitingForFirstAction)   // it worked: stop listening
    .catch(function () {
      // Still blocked (some keys do not count as an action). Keep waiting for the next one.
    });
}

// Removes the two "first action" listeners so the music is not started twice
function stopWaitingForFirstAction() {
  document.removeEventListener("click", startOnFirstAction);
  document.removeEventListener("keydown", startOnFirstAction);
}

// Try to play as soon as the page opens
audio.play().catch(function () {
  // Blocked by the browser: start on the first click or key press instead
  document.addEventListener("click", startOnFirstAction);
  document.addEventListener("keydown", startOnFirstAction);
});

// Change the button icon whenever the audio starts or stops
audio.addEventListener("play", function () {
  audioIcon.textContent = "❚❚";
  audioToggle.setAttribute("aria-pressed", "true");
});
audio.addEventListener("pause", function () {
  audioIcon.textContent = "▶";
  audioToggle.setAttribute("aria-pressed", "false");
});


/* ---------- 7. START THE PAGE ---------- */
buildCards();
