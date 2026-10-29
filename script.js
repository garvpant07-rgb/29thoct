document.addEventListener("DOMContentLoaded", () => {
  const screens = Array.from(document.querySelectorAll(".screen"));

  function showScreen(id) {
    const target = document.getElementById(id);

    if (!target) {
      console.error("Screen not found:", id);
      return;
    }

    screens.forEach(screen => {
      screen.classList.toggle("active", screen === target);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // NEXT BUTTONS
  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.next);
    });
  });

  // BACK BUTTONS
  document.querySelectorAll("[data-back]").forEach(button => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.back);
    });
  });

  // START BUTTON
  const startButton = document.getElementById("startButton");

  if (startButton) {
    startButton.addEventListener("click", () => {
      showScreen("hello");
    });
  }

  // MUSIC
  const song = document.getElementById("ourSong");
  const musicButton = document.getElementById("musicButton");
  const introMusicButton = document.getElementById("introMusicButton");

  async function toggleMusic() {
    if (!song) {
      console.error("Audio element #ourSong not found.");
      return;
    }

    try {
      if (song.paused) {
        await song.play();
      } else {
        song.pause();
      }
    } catch (error) {
      console.error("Music could not play:", error);
    }
  }

  if (musicButton) {
    musicButton.addEventListener("click", toggleMusic);
  }

  if (introMusicButton) {
    introMusicButton.addEventListener("click", toggleMusic);
  }

  // PROPOSAL BUTTONS
  const yesButton = document.getElementById("yesButton");
  const thinkButton = document.getElementById("thinkButton");
  const catBubble = document.getElementById("catBubble");

  if (yesButton) {
    yesButton.addEventListener("click", () => {
      if (catBubble) {
        catBubble.textContent =
          "YAY!! You just made this moment so special! 💗";
      }

      showScreen("bouquet");
    });
  }

  if (thinkButton) {
    thinkButton.addEventListener("click", () => {
      if (catBubble) {
        catBubble.textContent =
          "Take your time, there's no pressure. 🌷";
      }
    });
  }

  // INTERACTIVE LILIES
  const lilies = document.querySelectorAll(".lily");
  const flowerCount = document.getElementById("flowerCount");
  const progressFill = document.getElementById("progressFill");
  const flowerNote = document.getElementById("flowerNote");
  const finalLetterButton = document.getElementById("finalLetterButton");

  const notes = [
    "You make my ordinary days feel special. 💗",
    "Your smile is one of my favourite things.",
    "I hope you always feel loved and appreciated.",
    "Every little memory with you matters to me.",
    "You deserve all the happiness in the world.",
    "And this little bouquet is just for you. 🌷"
  ];

  const discovered = new Set();

  lilies.forEach((lily, index) => {
    lily.style.cursor = "pointer";

    lily.addEventListener("click", () => {
      lily.classList.add("bloomed");
      discovered.add(index);

      if (flowerCount) {
        flowerCount.textContent = `${discovered.size} / 6`;
      }

      if (progressFill) {
        progressFill.style.width =
          `${(discovered.size / 6) * 100}%`;
      }

      if (flowerNote) {
        const paragraph = flowerNote.querySelector("p");

        if (paragraph) {
          paragraph.textContent = notes[index];
        } else {
          flowerNote.textContent = notes[index];
        }
      }

      if (discovered.size === 6 && finalLetterButton) {
        finalLetterButton.classList.remove("hidden");
      }
    });
  });

  // OPEN FINAL LETTER
  if (finalLetterButton) {
    finalLetterButton.addEventListener("click", () => {
      showScreen("final");
    });
  }

  // REPLAY
  const replayButton = document.getElementById("replayButton");

  if (replayButton) {
    replayButton.addEventListener("click", () => {
      discovered.clear();

      lilies.forEach(lily => {
        lily.classList.remove("bloomed");
      });

      if (flowerCount) {
        flowerCount.textContent = "0 / 6";
      }

      if (progressFill) {
        progressFill.style.width = "0%";
      }

      if (finalLetterButton) {
        finalLetterButton.classList.add("hidden");
      }

      if (song) {
        song.pause();
        song.currentTime = 0;
      }

      showScreen("home");
    });
  }

  // HEART ANIMATION
  function createHeart() {
    const heart = document.createElement("div");
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = 12 + Math.random() * 20 + "px";
    heart.style.color = "#ff8fba";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1";
    heart.style.opacity = "0.7";
    heart.style.transition = "transform 6s linear, opacity 6s linear";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform =
        `translateY(-${window.innerHeight + 80}px) rotate(35deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 6100);
  }

  setInterval(createHeart, 900);

  // START WEBSITE
  showScreen("home");

  console.log("Website JavaScript loaded successfully!");
});