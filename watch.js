(() => {
  const watch = document.querySelector("#watch");
  if (!watch) {
    return;
  }

  const choices = Array.from(watch.querySelectorAll(".watch-choice"));
  const player = watch.querySelector(".watch-player");
  const poster = watch.querySelector(".watch-poster");
  const posterImage = poster.querySelector("img");
  const title = watch.querySelector("#watch-video-title");
  const external = watch.querySelector(".watch-external");
  const counter = watch.querySelector(".watch-counter");
  let selected = 0;

  const isModifiedClick = (event) =>
    event.button !== 0 || event.metaKey || event.ctrlKey ||
    event.shiftKey || event.altKey;

  const selectVideo = (index) => {
    selected = index;
    const choice = choices[selected];
    player.replaceChildren(poster);
    poster.href = choice.href;
    poster.setAttribute("aria-label", `Play ${choice.dataset.videoTitle}`);
    posterImage.src = choice.dataset.poster;
    title.textContent = choice.dataset.videoTitle;
    external.href = choice.href;
    counter.textContent =
      `${String(selected + 1).padStart(2, "0")} / ${String(choices.length).padStart(2, "0")}`;
    choices.forEach((item, itemIndex) => {
      if (itemIndex === selected) {
        item.setAttribute("aria-current", "true");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  };

  choices.forEach((choice, index) => {
    choice.addEventListener("click", (event) => {
      if (isModifiedClick(event)) {
        return;
      }
      event.preventDefault();
      selectVideo(index);
      player.scrollIntoView({ block: "start" });
    });
  });

  watch.querySelector(".watch-previous").addEventListener("click", () => {
    selectVideo((selected - 1 + choices.length) % choices.length);
  });
  watch.querySelector(".watch-next").addEventListener("click", () => {
    selectVideo((selected + 1) % choices.length);
  });

  poster.addEventListener("click", (event) => {
    if (isModifiedClick(event)) {
      return;
    }
    event.preventDefault();
    const choice = choices[selected];
    const iframe = document.createElement("iframe");
    iframe.src =
      `https://www.youtube-nocookie.com/embed/${choice.dataset.videoId}?autoplay=1&playsinline=1&rel=0`;
    iframe.title = `${choice.dataset.videoTitle} - Cold in Berlin official video`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    iframe.focus();
  });

  selectVideo(0);
  watch.querySelector(".watch-controls").hidden = false;
})();
