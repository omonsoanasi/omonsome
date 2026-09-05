/*
  1) Ink jitter: every CHARACTER inside the handwritten page gets
     a small randomized rotation, vertical offset, and slight
     opacity variation (pen pressure). Whole-word rotation alone
     still leaves every letter inside identical — it's the
     per-letter variation that actually breaks the "typed" look.
     Characters are grouped inside a nowrap .ink-word wrapper so
     the browser still only breaks lines between words, never
     mid-word.
  2) A gentle tilt-with-mouse, flattened (no fake 3D perspective)
     to match the near-overhead angle of the source photo.
*/

function humanizeText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement.closest(".ink-word")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  let n;
  while ((n = walker.nextNode())) textNodes.push(n);

  textNodes.forEach((node) => {
    const words = node.nodeValue.split(/(\s+)/);
    const frag = document.createDocumentFragment();

    words.forEach((word) => {
      if (!word.trim()) {
        frag.appendChild(document.createTextNode(word));
        return;
      }

      const wordSpan = document.createElement("span");
      wordSpan.className = "ink-word";

      word.split("").forEach((ch) => {
        const charSpan = document.createElement("span");
        charSpan.className = "ink-char";
        charSpan.textContent = ch;

        const rotate = (Math.random() * 7 - 3.5).toFixed(2);
        const rise = (Math.random() * 4 - 2).toFixed(2);
        const inkShade = 0.8 + Math.random() * 0.2;

        charSpan.style.transform = `rotate(${rotate}deg) translateY(${rise}px)`;
        charSpan.style.opacity = inkShade.toFixed(2);

        wordSpan.appendChild(charSpan);
      });

      frag.appendChild(wordSpan);
    });

    node.parentNode.replaceChild(frag, node);
  });
}

document.querySelectorAll(".paper-inner section, .paper-inner header, .paper-inner footer")
  .forEach((el) => humanizeText(el));

const paper = document.querySelector(".notebook-spread");

window.addEventListener("pointermove", (event) => {
  if (window.innerWidth <= 700) return;

  const x = (event.clientX / window.innerWidth - 0.5);
  const y = (event.clientY / window.innerHeight - 0.5);
  paper.style.transform =
    `perspective(1600px) rotateX(${4 - y * 2}deg) rotateY(${-4 - x * 3}deg) rotateZ(-2deg)`;
});
