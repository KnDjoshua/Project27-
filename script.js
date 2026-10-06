/* =====================================================
   KnÐ BIRTHDAY UNIVERSE
   GAME ENGINE
===================================================== */


document.addEventListener("DOMContentLoaded", () => {


  /* ===================================================
     ELEMENTS
  =================================================== */

  const startButton =
    document.getElementById("startButton");

  const game =
    document.getElementById("game");

  const generateButton =
    document.getElementById("generateButton");

  const birthdayButton =
    document.getElementById("birthdayButton");

  const enterChapter =
    document.getElementById("enterChapter");

  const birthdayModal =
    document.getElementById("birthdayModal");

  const core =
    document.querySelector(".core-machine");

  const coreText =
    document.getElementById("coreText");

  const resultText =
    document.getElementById("resultText");

  const resultCategory =
    document.getElementById("resultCategory");

  const score =
    document.getElementById("score");

  const dropCount =
    document.getElementById("dropCount");

  const streakCount =
    document.getElementById("streakCount");

  const rareCount =
    document.getElementById("rareCount");

  const stars =
    document.getElementById("stars");

  const coreParticles =
    document.getElementById("coreParticles");

  const cursorGlow =
    document.getElementById("cursorGlow");

  const messageForm =
    document.getElementById("messageForm");

  const profilePhoto =
    document.getElementById("profilePhoto");

  const toast =
    document.getElementById("toast");


  /* ===================================================
     GAME STATE
  =================================================== */

  let drops = 0;

  let streak = 0;

  let rareDrops = 0;

  let busy = false;

  let lastFact = -1;


  /* ===================================================
     KND DATABASE
  =================================================== */

  const facts = [

    {
      category: "💻 THE DEVELOPER",
      text:
        "KnÐ builds websites manually — turning ideas into real digital experiences."
    },

    {
      category: "🛡️ CYBER SECURITY",
      text:
        "Networking and Cyber Security became part of the technical foundation."
    },

    {
      category: "🎛️ LIGHTING",
      text:
        "From DMX to Art-Net and cue programming, KnÐ knows how to make a stage come alive."
    },

    {
      category: "🏀 BASKETBALL",
      text:
        "The court is another playground — movement, rhythm, creativity and buckets."
    },

    {
      category: "🙏 FAITH",
      text:
        "Technology and creativity are being used alongside a desire to serve God and impact people."
    },

    {
      category: "🌍 THE JOURNEY",
      text:
        "From growing up in the villages to university, technology, church and creative work."
    },

    {
      category: "🚀 THE BUILDER",
      text:
        "The mission is simple: build things that people actually remember."
    },

    {
      category: "🎨 CREATIVE ENERGY",
      text:
        "Code, lighting, basketball and content all become different ways to express creativity."
    },

    {
      category: "⚡ KND ENERGY",
      text:
        "Don't just consume the internet. Build something on it."
    },

    {
      category: "🧠 THE MINDSET",
      text:
        "Learn the skill. Practice the skill. Use the skill. Then teach someone else."
    },

    {
      category: "💡 VISION",
      text:
        "More websites. More technology. More creative projects. Bigger opportunities."
    },

    {
      category: "🎛️ STAGE MODE",
      text:
        "A lighting console isn't just buttons — it's a way to control atmosphere, timing and emotion."
    }

  ];


  /* ===================================================
     RARE DATABASE
  =================================================== */

  const rareFacts = [

    {
      category: "🌟 LEGENDARY DROP",
      text:
        "SYSTEM MESSAGE: KnÐ has entered another chapter. The build is far from finished."
    },

    {
      category: "💎 LEGENDARY DROP",
      text:
        "RARE DATA FOUND: More ideas. More impact. More reasons to be grateful."
    },

    {
      category: "🚀 LEGENDARY DROP",
      text:
        "BIRTHDAY PROTOCOL COMPLETE: The next level is waiting to be built."
    },

    {
      category: "👑 ULTRA RARE",
      text:
        "THE CORE HAS SPOKEN: Keep building. Keep serving. Keep creating."
    }

  ];


  /* ===================================================
     CREATE STARS
  =================================================== */

  function createStars() {

    for (let i = 0; i < 100; i++) {

      const star =
        document.createElement("span");

      star.className = "star";

      star.style.left =
        Math.random() * 100 + "%";

      star.style.top =
        Math.random() * 100 + "%";

      star.style.animationDuration =
        3 + Math.random() * 7 + "s";

      star.style.animationDelay =
        Math.random() * 5 + "s";

      stars.appendChild(star);

    }

  }

  createStars();


  /* ===================================================
     CURSOR GLOW
  =================================================== */

  document.addEventListener(
    "mousemove",
    (event) => {

      cursorGlow.style.left =
        event.clientX + "px";

      cursorGlow.style.top =
        event.clientY + "px";

    }
  );


  /* ===================================================
     TOAST
  =================================================== */

  let toastTimer;

  function showToast(message) {

    toast.textContent =
      message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
      setTimeout(() => {

        toast.classList.remove("show");

      }, 3000);

  }


  /* ===================================================
     SCROLL INTO GAME
  =================================================== */

  startButton.addEventListener(
    "click",
    () => {

      game.scrollIntoView({
        behavior: "smooth"
      });

      setTimeout(() => {

        showToast(
          "⚡ KnÐ Core activated."
        );

      }, 700);

    }
  );


  /* ===================================================
     PARTICLE EXPLOSION
  =================================================== */

  function createExplosion(amount = 30) {

    for (let i = 0; i < amount; i++) {

      const particle =
        document.createElement("span");

      particle.className =
        "core-particle";

      particle.style.left =
        "50%";

      particle.style.top =
        "50%";


      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        100 + Math.random() * 300;


      const x =
        Math.cos(angle) *
        distance;

      const y =
        Math.sin(angle) *
        distance;


      particle.style.setProperty(
        "--x",
        `${x}px`
      );

      particle.style.setProperty(
        "--y",
        `${y}px`
      );


      coreParticles.appendChild(
        particle
      );


      setTimeout(
        () => particle.remove(),
        2200
      );

    }

  }


  /* ===================================================
     SCORE
  =================================================== */

  function updateStats() {

    dropCount.textContent =
      drops;

    streakCount.textContent =
      streak;

    rareCount.textContent =
      rareDrops;


    const totalScore =
      drops * 100 +
      rareDrops * 500;


    score.textContent =
      "SCORE " +
      String(totalScore)
        .padStart(3, "0");

  }


  /* ===================================================
     RANDOM FACT
  =================================================== */

  function getRandomFact() {

    let index =
      Math.floor(
        Math.random() *
        facts.length
      );


    /* Prevent immediate duplicate */

    if (facts.length > 1) {

      while (index === lastFact) {

        index =
          Math.floor(
            Math.random() *
            facts.length
          );

      }

    }


    lastFact =
      index;


    return facts[index];

  }


  /* ===================================================
     RANDOMIZER
  =================================================== */

  function generateDrop() {

    if (busy) return;


    busy = true;


    coreText.textContent =
      "SCANNING";


    resultCategory.textContent =
      "DECRYPTING...";


    resultText.textContent =
      "Searching the KnÐ identity database...";


    resultText.classList.remove(
      "reveal"
    );


    /* Scan animation */

    let scanCount = 0;


    const scanner =
      setInterval(() => {

        const states = [

          "SCAN",

          "SYNC",

          "DECODE",

          "MATCH",

          "ACCESS"

        ];


        coreText.textContent =
          states[
            scanCount %
            states.length
          ];


        createExplosion(3);


        scanCount++;


        if (scanCount >= 9) {

          clearInterval(scanner);


          revealDrop();

        }

      }, 100);

  }


  /* ===================================================
     REVEAL DROP
  =================================================== */

  function revealDrop() {

    drops++;


    /*
       15% chance of rare drop
    */

    const isRare =
      Math.random() < 0.15;


    let item;


    if (isRare) {

      item =
        rareFacts[
          Math.floor(
            Math.random() *
            rareFacts.length
          )
        ];


      rareDrops++;

      streak++;

      resultCategory.classList.add(
        "rare"
      );


      coreText.textContent =
        "RARE";


      createExplosion(70);


      showToast(
        "💎 LEGENDARY DROP FOUND!"
      );

    } else {

      item =
        getRandomFact();


      streak++;


      resultCategory.classList.remove(
        "rare"
      );


      coreText.textContent =
        "UNLOCKED";


      createExplosion(35);

    }


    resultCategory.textContent =
      item.category;


    resultText.textContent =
      item.text;


    resultText.classList.remove(
      "reveal"
    );


    /*
       Force animation restart
    */

    void resultText.offsetWidth;


    resultText.classList.add(
      "reveal"
    );


    updateStats();


    busy = false;

  }


  generateButton.addEventListener(
    "click",
    generateDrop
  );


  /* ===================================================
     SPACEBAR RANDOMIZER
  =================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      /*
        Don't trigger while typing
      */

      const tag =
        document.activeElement.tagName;


      if (
        event.code === "Space" &&
        tag !== "INPUT" &&
        tag !== "TEXTAREA"
      ) {

        event.preventDefault();

        generateDrop();

      }

    }
  );


  /* ===================================================
     BIRTHDAY BLAST
  =================================================== */

  function birthdayBlast() {

    birthdayModal.classList.add(
      "active"
    );


    /*
       Huge particle burst
    */

    for (let i = 0; i < 3; i++) {

      setTimeout(() => {

        createExplosion(100);

      }, i * 350);

    }


    streak += 2;

    updateStats();

  }


  birthdayButton.addEventListener(
    "click",
    birthdayBlast
  );


  /* ===================================================
     ENTER CHAPTER
  =================================================== */

  enterChapter.addEventListener(
    "click",
    () => {

      birthdayModal.classList.remove(
        "active"
      );


      document.body.animate(
        [
          {
            filter: "brightness(1)"
          },

          {
            filter: "brightness(1.8)"
          },

          {
            filter: "brightness(1)"
          }

        ],
        {
          duration: 900
        }
      );


      showToast(
        "🚀 CHAPTER 27 UNLOCKED!"
      );


      setTimeout(() => {

        game.scrollIntoView({
          behavior: "smooth"
        });

      }, 500);

    }
  );


  /* ===================================================
     CLOSE MODAL BY CLICKING OUTSIDE
  =================================================== */

  birthdayModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        birthdayModal
      ) {

        birthdayModal.classList.remove(
          "active"
        );

      }

    }
  );


  /* ===================================================
     WHATSAPP MESSAGE
  =================================================== */

  messageForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        document
          .getElementById(
            "visitorName"
          )
          .value
          .trim();


      const message =
        document
          .getElementById(
            "visitorMessage"
          )
          .value
          .trim();


      if (!name || !message) {

        showToast(
          "✍️ Please enter your name and message."
        );

        return;

      }


      const text =
        `🎂 Happy Birthday KnÐ! 🎉\n\n` +
        `From: ${name}\n\n` +
        `${message}`;


      const whatsappURL =
        "https://wa.me/256760447637?text=" +
        encodeURIComponent(text);


      window.open(
        whatsappURL,
        "_blank"
      );


      showToast(
        "🚀 Transmission prepared!"
      );


      messageForm.reset();

    }
  );


  /* ===================================================
     PHOTO FALLBACK
  =================================================== */

  profilePhoto.addEventListener(
    "error",
    () => {

      profilePhoto.src =
        "https://placehold.co/600x600/080814/ffffff?text=KnD";

    }
  );


  /* ===================================================
     RANDOM CORE IDLE TEXT
  =================================================== */

  const idleMessages = [

    "READY",

    "ONLINE",

    "KnÐ",

    "SYSTEM",

    "27",

    "BUILD",

    "CREATE"

  ];


  let idleIndex = 0;


  setInterval(() => {

    if (!busy) {

      idleIndex++;

      coreText.textContent =
        idleMessages[
          idleIndex %
          idleMessages.length
        ];

    }

  }, 3000);


  /* ===================================================
     SECRET DOUBLE CLICK
  =================================================== */

  const logo =
    document.querySelector(".logo");


  let secretClicks = 0;


  logo.addEventListener(
    "dblclick",
    () => {

      secretClicks++;


      if (secretClicks === 1) {

        showToast(
          "👀 Developer mode detected..."
        );

      } else {

        showToast(
          "🧑‍💻 KnÐ.exe is cooking..."
        );


        createExplosion(100);


        coreText.textContent =
          "DEV";


        secretClicks = 0;

      }

    }
  );


  /* ===================================================
     RANDOM STARTUP
  =================================================== */

  setTimeout(() => {

    showToast(
      "🎂 Welcome to KnÐ's birthday universe!"
    );

  }, 1200);


  /* ===================================================
     INITIAL STATE
  =================================================== */

  updateStats();

});

/* =====================================================
   BIRTHDAY MUSIC SYSTEM
===================================================== */

const birthdayMusic =
  document.getElementById("birthdayMusic");

const musicToggle =
  document.getElementById("musicToggle");


birthdayMusic.volume = 0.45;


function startBirthdayMusic() {

  birthdayMusic
    .play()
    .then(() => {

      musicToggle.textContent =
        "🔊 MUSIC ON";

      musicToggle.classList.add(
        "playing"
      );

    })
    .catch(() => {

      /*
        Browser blocked autoplay.
        Music will start after the visitor
        interacts with the page.
      */

      musicToggle.textContent =
        "🔇 TAP FOR MUSIC";

    });

}


/* Try when the page loads */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      startBirthdayMusic();

    }, 500);

  }
);


/* Manual music button */

musicToggle.addEventListener(
  "click",
  () => {

    if (birthdayMusic.paused) {

      birthdayMusic
        .play()
        .then(() => {

          musicToggle.textContent =
            "🔊 MUSIC ON";

          musicToggle.classList.add(
            "playing"
          );

        });

    } else {

      birthdayMusic.pause();

      musicToggle.textContent =
        "🔇 MUSIC OFF";

      musicToggle.classList.remove(
        "playing"
      );

    }

  }
);


/*
  If autoplay was blocked, start music
  on the visitor's first meaningful interaction.
*/

const unlockMusic = () => {

  if (birthdayMusic.paused) {

    birthdayMusic
      .play()
      .then(() => {

        musicToggle.textContent =
          "🔊 MUSIC ON";

        musicToggle.classList.add(
          "playing"
        );

      })
      .catch(() => {});

  }

};


document.addEventListener(
  "click",
  unlockMusic,
  { once: true }
);

document.addEventListener(
  "keydown",
  unlockMusic,
  { once: true }
);
