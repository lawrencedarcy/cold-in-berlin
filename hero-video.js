(() => {
  const hero = document.querySelector(".video-hero");
  const video = document.querySelector("#hero-video-player");
  const toggle = document.querySelector(".hero-video-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!hero || !video || !toggle || reducedMotion.matches) {
    return;
  }

  let player;
  let paused = false;

  function showPoster() {
    hero.classList.remove("video-playing");
    toggle.hidden = true;
  }

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player(video, {
      host: "https://www.youtube-nocookie.com",
      videoId: "XGjr_OFNZZU",
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: "XGjr_OFNZZU",
        controls: 0,
        disablekb: 1,
        playsinline: 1,
        origin: window.location.origin,
        rel: 0,
      },
      events: {
        onReady: () => {
          const iframe = player.getIframe();
          iframe.tabIndex = -1;
          iframe.title = "Cold in Berlin background video";
          if (reducedMotion.matches) {
            player.pauseVideo();
            return;
          }
          player.mute();
          player.playVideo();
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            if (reducedMotion.matches) {
              player.pauseVideo();
              return;
            }
            hero.classList.add("video-playing");
            toggle.hidden = false;
            paused = false;
            toggle.textContent = "Pause background video";
          }
        },
        onError: (event) => {
          console.error("Hero background video failed to play:", event.data);
          showPoster();
        },
      },
    });
  };

  toggle.addEventListener("click", () => {
    if (paused) {
      player.playVideo();
    } else {
      player.pauseVideo();
      paused = true;
      toggle.textContent = "Play background video";
    }
  });

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      if (player && typeof player.pauseVideo === "function") {
        player.pauseVideo();
      }
      showPoster();
    }
  });

  const api = document.createElement("script");
  api.src = "https://www.youtube.com/iframe_api";
  api.addEventListener("error", () => {
    console.error("Could not load the YouTube API for the hero background.");
    showPoster();
  });
  document.head.append(api);
})();
