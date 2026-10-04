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
    description: "A raster image is a grid of tiny squares called pixels, and each pixel stores one color value. The image's size is its width times its height in pixels. Editing changes individual pixels, which makes raster ideal for photographs. The detail is fixed when the image is created, though."
  },
  {
    numeral: "II",
    title: "THE WEAVER",
    concept: "Bézier Curves",
    subtitle: "Bézier Curves",
    keyword: "SMOOTH PATHS",
    image: "images/card-image-02.webp",
    imageAlt: "Placeholder: simple vector shape with anchor points",
    description: "A vector image does not store pixels. It stores shapes as math: points, lines, and curves, plus a fill color and a stroke. The file describes how to draw the picture instead of what every pixel looks like. SVG is the standard vector format on the web."
  },
  {
    numeral: "III",
    title: "THE PRINTER",
    concept: "EPS",
    subtitle: "EPS (Encapsulated PostScript)",
    keyword: "PRINT STANDARD",
    image: "images/card-image-03.webp",
    imageAlt: "Placeholder: blurry raster next to a sharp vector",
    description: "When you enlarge a raster image, the software has to invent new pixels, so the picture turns blurry or blocky. A vector image is simply redrawn at the new size and stays sharp. Its file size also stays the same no matter how large it is displayed."
  },
  {
    numeral: "IV",
    title: "THE ILLUSTRATOR",
    concept: "Ai",
    subtitle: "Ai (Adobe Illustrator)",
    keyword: "NATIVE FORMAT",
    image: "images/card-image-04.webp",
    imageAlt: "Placeholder: color gradient with visible banding",
    description: "Color depth is the number of bits used for each pixel. Using 8 bits for each of the red, green, and blue channels gives 24-bit color, which is about 16.7 million colors. An indexed image uses 8 bits total, so it can show only 256 colors picked from a lookup table (LUT). Fewer bits make smaller files but can cause visible banding in gradients."
  },
  {
    numeral: "V",
    title: "THE SCRIBE",
    concept: "SVG",
    subtitle: "SVG (Scalable Vector Graphics)",
    keyword: "OPEN STANDARD",
    image: "images/card-image-05.webp",
    imageAlt: "Placeholder: flat-color image with repeating rows",
    description: "Lossless compression shrinks a file without throwing anything away. Run-length encoding (RLE) stores a run such as '20 white pixels' instead of listing each pixel. PNG uses the DEFLATE method, which combines LZ77 and Huffman coding. You get the exact original back, which suits logos, text, and flat colors."
  },
  {
    numeral: "VI",
    title: "THE PHANTOM",
    concept: "SWF",
    subtitle: "SWF (ShockWave Flash)",
    keyword: "WEB ANIMATION",
    image: "images/card-image-06.webp",
    imageAlt: "Placeholder: photo with visible JPEG blocks",
    description: "Lossy compression permanently removes detail that people rarely notice. JPEG splits the image into 8x8 blocks, converts each block with a DCT (discrete cosine transform), and then quantizes it to drop fine detail. The files become much smaller. Saving again and again adds visible blocky artifacts."
  },
  {
    numeral: "VII",
    title: "THE GIANT",
    concept: "Scaling",
    subtitle: "Scaling Transformation",
    keyword: "ZOOM",
    image: "images/card-image-07.webp",
    imageAlt: "Placeholder: file size comparison of image formats",
    description: "WebP is a modern raster format that supports lossy compression (based on the VP8 video codec), lossless compression, and transparency. At similar visual quality its files are usually smaller than JPEG or PNG. All major browsers support it, so it is a good default for web photos."
  },
  {
    numeral: "VIII",
    title: "THE WHEEL",
    concept: "Rotation",
    subtitle: "Rotation Transformation",
    keyword: "ANGLED SPIN",
    image: "images/card-image-08.webp",
    imageAlt: "Placeholder: bezier curve with control handles",
    description: "A Bezier curve is defined by anchor points and control handles. Dragging a handle bends the curve smoothly without adding any new points. A few numbers can describe a complex outline, which is why vector shapes stay so small. This is what the pen tool in a drawing program creates."
  },
  {
    numeral: "IX",
    title: "THE TRAVELER",
    concept: "Translation",
    subtitle: "Translation",
    keyword: "DIRECTIONAL SHIFT",
    image: "images/card-image-09.webp",
    imageAlt: "Placeholder: icons for photo, logo, and screenshot",
    description: "Pick the format that matches the content. Photographs work best as lossy raster (WebP or JPEG). Logos, icons, and diagrams work best as SVG. Screenshots with sharp text are best kept lossless, such as PNG. Every choice trades file size against quality and flexibility."
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
  bubbleBody.textContent = data.description;

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
