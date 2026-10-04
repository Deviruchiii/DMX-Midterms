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
   PLACEHOLDER: rewrite the text and swap the image files as you like. */
const cards = [
  {
    numeral: "I",
    title: "THE ARCHITECT",
    concept: "Geometric Primitives",
    subtitle: "Geometric Primitives",
    keyword: "BUILDING BLOCKS",
    image: "images/card-image-01.webp",
    imageAlt: "Placeholder: close-up of a pixel grid",
    description: "Geometric primitives are the simplest shapes a vector image is made from. They include lines, polylines, circles, rectangles, ellipses, and polygons. Even a detailed illustration, like a car, is just many primitives layered and combined. Because each primitive is stored as math instead of pixels, it stays sharp at any size."
  },
  {
    numeral: "II",
    title: "THE WEAVER",
    concept: "Bézier Curves",
    subtitle: "Bézier Curves",
    keyword: "SMOOTH PATHS",
    image: "images/card-image-02.webp",
    imageAlt: "Placeholder: simple vector shape with anchor points",
    description: "A Bézier curve is a parametric curve named after Pierre Bézier, who used it to design Renault car bodies in the 1960s. A cubic Bézier is defined by four points. P0 and P3 are where the curve starts and ends, and P1 and P2 are control points that pull the curve into shape. Unlike a polygonal line made of short straight segments, a Bézier curve looks smooth at every scale."
  },
  {
    numeral: "III",
    title: "THE PRINTER",
    concept: "EPS",
    subtitle: "EPS (Encapsulated PostScript)",
    keyword: "PRINT STANDARD",
    image: "images/card-image-03.webp",
    imageAlt: "Placeholder: blurry raster next to a sharp vector",
    description: "EPS is Adobe's format from the 1980s and has long been the standard interchange format of the print industry. It is a PostScript-based file that describes an image or drawing, so it works directly with PostScript printers. Designers still use it to send logos and artwork to print shops."
  },
  {
    numeral: "IV",
    title: "THE ILLUSTRATOR",
    concept: "Ai",
    subtitle: "Ai (Adobe Illustrator)",
    keyword: "NATIVE FORMAT",
    image: "images/card-image-04.webp",
    imageAlt: "Placeholder: color gradient with visible banding",
    description: "Ai is the native file format of Adobe Illustrator, first released in 1987. It stores single-page vector artwork and began as a modified version of the EPS format. Because Illustrator is an industry-standard tool, Ai files are widely supported across design software."
  },
  {
    numeral: "V",
    title: "THE SCRIBE",
    concept: "SVG",
    subtitle: "SVG (Scalable Vector Graphics)",
    keyword: "OPEN STANDARD",
    image: "images/card-image-05.webp",
    imageAlt: "Placeholder: flat-color image with repeating rows",
    description: "SVG is the W3C's standard vector format, introduced in 1999. It is written in XML, so you can open an SVG and read its shapes as plain text code. It also supports interactivity and animation, which is why browsers can display it natively. The card backs on this site are SVG."
  },
  {
    numeral: "VI",
    title: "THE PHANTOM",
    concept: "SWF",
    subtitle: "SWF (ShockWave Flash)",
    keyword: "WEB ANIMATION",
    image: "images/card-image-06.webp",
    imageAlt: "Placeholder: photo with visible JPEG blocks",
    description: "SWF is the Flash file format, created by Macromedia in 1996 and later acquired by Adobe. Its name comes from \"ShockWave Flash.\" It powered animated websites, games, and cartoons in the early web, but browsers phased it out after Flash Player reached end of life in 2020."
  },
  {
    numeral: "VII",
    title: "THE GIANT",
    concept: "Scaling",
    subtitle: "Scaling Transformation",
    keyword: "ZOOM",
    image: "images/card-image-07.webp",
    imageAlt: "Placeholder: file size comparison of image formats",
    description: "Scaling changes the size of an object by expanding or compressing its dimensions. It works by multiplying the original coordinates by a scaling factor: X′ = X · Sx and Y′ = Y · Sy. Because vectors are stored as coordinates, scaling them up never causes pixelation."
  },
  {
    numeral: "VIII",
    title: "THE WHEEL",
    concept: "Rotation",
    subtitle: "Rotation Transformation",
    keyword: "ANGLED SPIN",
    image: "images/card-image-08.webp",
    imageAlt: "Placeholder: bezier curve with control handles",
    description: "Rotation turns an object by a particular angle, called theta (θ), around its origin. Every point in the shape is repositioned using that angle while the shape itself stays intact. In code, this is the <code>rotate()</code> function."
  },
  {
    numeral: "IX",
    title: "THE TRAVELER",
    concept: "Translation",
    subtitle: "Translation",
    keyword: "DIRECTIONAL SHIFT",
    image: "images/card-image-09.webp",
    imageAlt: "Placeholder: icons for photo, logo, and screenshot",
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
const audio = document.getElementById("ambient-audio");
const audioToggle = document.getElementById("audio-toggle");
const audioIcon = document.getElementById("audio-icon");

// Checks if the user's device asks for less animation
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Variables that remember the current state
const cardButtons = [];   // list of all card <button> elements
let activeIndex = null;   // which card is flipped right now (null = none)


/* ---------- 3. BUILD THE CARDS FROM THE DATA ---------- */
function buildCards() {
  // forEach runs the code below once for every card in the array
  cards.forEach(function (data, index) {

    // Create a list item to hold the card
    const item = document.createElement("li");

    // Write the card's HTML. ${...} inserts values from the data.
    item.innerHTML = `
      <button class="card" type="button" aria-pressed="false"
              aria-label="Card ${index + 1} of ${cards.length}, face down. Press to reveal.">
        <span class="card-inner">

          <!-- FACE DOWN (back of the card) -->
          <span class="card-face card-back">
            <span class="card-back-mark" aria-hidden="true">✦</span>
            <svg class="card-sigil" viewBox="0 0 100 100" aria-hidden="true">
              <use href="#sigil"></use>
            </svg>
          </span>

          <!-- FACE UP (front of the card) -->
          <span class="card-face card-front">
            <span class="card-numeral">${data.numeral}</span>
            <img class="card-image" src="${data.image}" alt="${data.imageAlt}"
                 width="228" height="230" loading="lazy">
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

  // Case 1: the card is already flipped -> flip it back and close the bubble
  if (activeIndex === index) {
    closeBubble(false);
    flipCard(index, false);
    activeIndex = null;
    return;
  }

  // Case 2: a different card is flipped -> flip that one back first
  if (activeIndex !== null) {
    closeBubble(false);
    flipCard(activeIndex, false);
  }

  // Case 3: flip the clicked card, then show the bubble AFTER the flip ends
  activeIndex = index;
  flipCard(index, true);
  waitForFlip(index, function () {
    openBubble(index);
  });
}

// Turns a card face up (true) or face down (false)
function flipCard(index, faceUp) {
  const button = cardButtons[index];
  const data = cards[index];

  button.classList.toggle("flipped", faceUp);       // adds/removes the "flipped" class
  button.setAttribute("aria-pressed", faceUp);      // tells screen readers the state

  // Update the label that screen readers announce
  if (faceUp) {
    button.setAttribute("aria-label", data.numeral + ", " + data.title + ". Press to flip back.");
  } else {
    button.setAttribute("aria-label", "Card " + (index + 1) + " of " + cards.length + ", face down. Press to reveal.");
  }
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

// Fill the bubble with a card's text, place it, and fade it in
function openBubble(index) {
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
    cardButtons[activeIndex].focus();
  }
}

// Put the bubble beside the card: right side by default, left if there is no room
function positionBubble(index) {

  // On phones the CSS turns the bubble into a bottom sheet, so clear our positions
  if (window.innerWidth < 640) {
    bubble.style.top = "";
    bubble.style.left = "";
    bubble.classList.remove("on-right", "on-left");
    return;
  }

  // getBoundingClientRect gives an element's position on the screen
  const cardBox = cardButtons[index].getBoundingClientRect();
  const wrapBox = gridWrapper.getBoundingClientRect();

  const bubbleWidth = 300;  // must match the width in style.css
  const gap = 12;           // space between card and bubble
  const roomOnRight = window.innerWidth - cardBox.right;

  let left;
  if (roomOnRight >= bubbleWidth + gap + 16) {
    // Enough room: place bubble to the right of the card
    left = cardBox.right - wrapBox.left + gap;
    bubble.classList.add("on-right");
    bubble.classList.remove("on-left");
  } else {
    // Not enough room (rightmost column): place bubble to the left
    left = cardBox.left - wrapBox.left - gap - bubbleWidth;
    bubble.classList.add("on-left");
    bubble.classList.remove("on-right");
  }

  // Bubble starts about 70px below the top of the card
  const top = cardBox.top - wrapBox.top + 70;

  bubble.style.left = left + "px";
  bubble.style.top = top + "px";
}

// --- Ways to close the bubble ---

// 1. Click the ✕ close button
bubbleClose.addEventListener("click", function () {
  closeBubble(true);
});

// 2. Press the Esc key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && bubble.classList.contains("open")) {
    closeBubble(true);
  }
});

// 3. Click anywhere outside the bubble and outside a card
document.addEventListener("click", function (event) {
  const clickedInsideBubble = bubble.contains(event.target);
  const clickedACard = event.target.closest(".card");

  if (bubble.classList.contains("open") && !clickedInsideBubble && !clickedACard) {
    closeBubble(false);
  }
});

// The open bubble is wider than a card, so it covers the card next to it.
// If a click lands on the bubble but there is a card underneath, flip that card.
bubble.addEventListener("click", function (event) {
  if (event.target.closest(".bubble-close")) return;       // the close button works as usual
  if (window.getSelection().toString() !== "") return;     // user was selecting text

  // elementsFromPoint lists everything under the pointer, top to bottom
  const under = document.elementsFromPoint(event.clientX, event.clientY);
  for (const element of under) {
    const index = cardButtons.indexOf(element.closest(".card"));
    if (index !== -1) {
      handleCardClick(index);
      return;
    }
  }
});

// If the window is resized while the bubble is open, move it to the right spot
window.addEventListener("resize", function () {
  if (bubble.classList.contains("open") && activeIndex !== null) {
    positionBubble(activeIndex);
  }
});


/* ---------- 6. AUDIO TOGGLE ---------- */

// Play the audio if it is paused, pause it if it is playing
audioToggle.addEventListener("click", function () {
  if (audio.paused) {
    // play() returns a promise; .catch handles errors (e.g. file missing)
    audio.play().catch(function (error) {
      console.log("Audio could not play. Is audio/ambient-audio.mp3 in place?", error);
    });
  } else {
    audio.pause();
  }
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
