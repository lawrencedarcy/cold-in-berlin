# cold-in-berlin
Code for the Cold in Berlin website

The homepage includes the album shop and Songkick live dates, with in-page
navigation. The standalone shop and live pages remain available.
Both album sections include The Body Is The Wound E.P. The full shop also
features the Wounds T-shirt, Wounds Patch, Arms Control T-shirt and Wounds Tote
Bag, with links to their Bandcamp listings for options and current availability.
All ticket landing pages use `noindex, nofollow` robots metadata.
Every page's copyright footer is fixed at Cold in Berlin 2027.
The homepage navigation overlays the hero transparently at the top and becomes
solid when scrolling; standalone pages keep the solid navigation.
Songkick uses explicit dark background, text and button colours rather than
inheriting styles from the surrounding page.

Press reviews have been replaced by the homepage testimonial quotes.
The old press URL redirects to `index.html#quotes`. Every page uses the Wounds
cover as its favicon.

The Comfort of Loss and Dust uses its local album cover above an artwork-free
player: Bandcamp otherwise displays the featured track's separate artwork.
Its compact player has an explicit 42px height so cached square-player styles
cannot create an empty panel beneath the controls.

The hero uses a muted, looping YouTube background with a pause control. It keeps
the static band photo until playback starts, or when playback is unavailable.
Reduced-motion visitors get the static photo without loading the video.

Preview over HTTP (for example, `python3 -m http.server 8000`) rather than opening
the HTML file directly: YouTube requires an HTTP referrer for embedded playback.
