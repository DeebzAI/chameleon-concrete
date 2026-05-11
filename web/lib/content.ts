// Single source of truth for all site copy. Adam edits these arrays — no
// developer needed for content updates. Bolded items in the README are
// confirmed; everything else is placeholder pending Adam's confirmation.

// GitHub Pages subpath (e.g. "/chameleon-concrete"). Empty string in
// dev. Every image path in this file is run through `img()` so it has
// the prefix baked in — required because `images.unoptimized: true`
// (necessary for static hosting on GH Pages) skips the auto basePath
// prefixing that Next.js Image normally does.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const img = (path: string) => `${BASE_PATH}${path}`;

export const BRAND = {
  name: 'Chameleon Concrete Projects',
  owner: 'Adam Samarco',
  role: 'Owner · Lead Carver',
  city: 'Franklin, MA',
  region: '& surrounding New England',
  // NOTE: The 916 area code is California. Confirm with Adam — could be
  // a personal cell from before he relocated, or a typo.
  phone: '(916) 215 — 6482',
  phoneTel: '9162156482',
  // Email removed by design — Adam handles inquiries by call or text
  // only. Don't add a `mailto:` anywhere on the site.
  reviews: { stars: '5.0', count: 18, source: 'Google' },
  bookingSeason: '2026',
} as const;

export const HEADLINE_HTML =
  'Concrete<br/>carved into <em>art.</em>';

// (Alternate headlines kept intentionally minimal — Hero only uses
// HEADLINE_HTML. If you want to A/B-test or rotate, add a HEADLINES
// array here and accept it as a Hero prop.)

// Trust strip: 4 cells (CSS grid is `repeat(4, 1fr)` — adding a 5th
// would break the layout). Aug 2025: replaced the "Adam & Crew" badge
// with the BusinessRate "Best of 2025 — Concrete Contractor · Franklin
// MA" award. Adam-and-crew message still lives in OwnerStory and Footer.
export const TRUST = [
  { num: '5.0<em>★</em>',           label: 'Google · 18 Reviews' },
  { num: 'Free<em>.</em>',          label: 'No-Obligation Estimates' },
  { num: 'Franklin<br/><em>MA</em>',label: '& Surrounding New England' },
  { num: 'Best of<br/><em>2025</em>', label: 'BusinessRate · Concrete Contractor' },
];

// Project image filenames map to /public/images/.
// 15 unique cards in an asymmetric 12-col grid. Three wide statement shots
// at start, middle, end act as visual anchors; the pairs in between
// alternate (col-7 + col-5) ↔ (col-5 + col-7) for editorial rhythm.
export type Project = {
  id: number;
  title: string;
  tag: string;
  loc: string;
  image: string;
  alt: string;
  span: 4 | 5 | 7 | 8 | 12;
  /* Optional aspect override per card. Default falls back to the per-span
     ratio defined in CSS (col-12 → 21:9, col-8 → 4:3, col-7 → 5:4,
     col-5 → 4:5, col-4 → 3:4). */
  aspect?: '16/9' | '21/9' | '4/3' | '5/4' | '4/5' | '3/4';
};

/**
 * Homepage "Selected Work" curation — ordered list of project ids that
 * appear in the editorial grid. Order here = render order on the page.
 * Everything else lives only in the full-gallery modal.
 *
 * Layout intent (5 cards, three rows):
 *   Row 1 — col-12 wide opener (id 1 / image 38, atmospheric night patio)
 *   Row 2 — three col-4 portraits, tight → atmospheric → atmospheric:
 *     • id 22 / image 53 — A-frame patio detail blending into rock
 *     • id 8  / image 41 — cliff waterfall grotto (kept from prior set)
 *     • id 18 / image 49 — stamped steps through woods (atmospheric scene)
 *   Row 3 — col-12 wide closer (id 16 / image 47 — drone over copper
 *           medallion floor)
 *
 * May 2026 reshuffle: prior portraits id 3 (stump chair) and id 4
 * (signature firepit) were moved off the homepage at Adam's request —
 * they remain in the full gallery. Prior closer id 6 (compass medallion
 * patio) likewise still lives in the gallery only. Prior portrait id 20
 * (cardinal compass medallion) was rotated out to avoid theme overlap
 * with id 16 (the drone-over-medallion closer below) — replaced with
 * id 22, which also reinforces the A-frame walkthrough story.
 */
export const FEATURED_PROJECT_IDS: readonly number[] = [1, 22, 8, 18, 16];

// PROJECTS holds full metadata (title, tag, location) for any project
// that needs richer presentation. Items render in array order wherever
// they are iterated — but the homepage curation is driven by
// FEATURED_PROJECT_IDS above, not by this array's order.
//
// Spans + aspects on items 1, 3, 4, 6, 8 are tuned for the 5-card
// editorial layout (col-12, col-4 + col-4 + col-4, col-12). Items not
// in the featured set keep their original spans for the full-gallery
// modal, where layout is handled separately by GalleryModal.
export const PROJECTS: Project[] = [
  { id: 1, span: 12, aspect: '21/9',
    title: 'Outdoor Living, Lit', tag: 'Patio · Fire · Stump Oven', loc: 'Franklin, MA',
    image: img('/images/chameleon_concrete_38.jpg'),
    alt: 'Sweeping carved-concrete patio at night with fire pit, stump pizza oven and string lights' },

  { id: 2, span: 8, aspect: '4/3',
    title: 'Wood-Grain Walkway', tag: 'Stamped · Trompe l’œil', loc: 'New England',
    image: img('/images/chameleon_concrete_24.jpg'),
    alt: 'Stamped concrete walkway carved and tinted to look exactly like aged wood planks' },
  { id: 3, span: 4, aspect: '3/4',
    title: 'Stump Chair', tag: 'Sculpture · End-Grain Seat', loc: 'Studio Piece',
    image: img('/images/chameleon_concrete_43.jpg'),
    alt: 'Concrete chair sculpted to look like a carved tree stump with end-grain seat' },

  // span/aspect tuned to align with the col-4 portrait row in the
  // featured grid (was 4/5 — flattened to 3/4 so all three portraits
  // share the same height).
  { id: 4, span: 4, aspect: '3/4',
    title: 'The Signature Firepit', tag: 'Carved Stump · Stone Bowl', loc: 'Massachusetts',
    image: img('/images/chameleon_concrete_30.jpg'),
    alt: 'Carved concrete fire pit at twilight with stump-style pizza oven behind' },
  { id: 5, span: 8, aspect: '4/3',
    title: 'Tree-Stump Table', tag: 'Bark Texture · Inset Detail', loc: 'Franklin, MA',
    image: img('/images/chameleon_concrete_45.jpg'),
    alt: 'Massive concrete tree-stump base with carved bark texture and inlaid detail' },

  { id: 6, span: 12, aspect: '16/9',
    title: 'Compass Medallion Patio', tag: 'Stamped · Custom Inlay · Fire Pit', loc: 'Franklin area',
    image: img('/images/chameleon_concrete_07.jpg'),
    alt: 'Multi-color stamped concrete patio with hand-inlaid compass medallion and circular fire pit' },

  { id: 7, span: 7, aspect: '5/4',
    title: 'Concrete Pool & Deck', tag: 'Pool Environment', loc: 'New England',
    image: img('/images/chameleon_concrete_02.jpg'),
    alt: 'Inground pool with stamped concrete pool deck and white privacy fencing' },
  // span/aspect tuned to align with the col-4 portrait row in the
  // featured grid (was span 5 / 4-5 — moved to span 4 / 3-4).
  { id: 8, span: 4, aspect: '3/4',
    title: 'Cliff Waterfall Grotto', tag: 'Sculpted Concrete · Night Lit · Water', loc: 'Franklin, MA',
    image: img('/images/chameleon_concrete_41.jpg'),
    alt: 'Carved-concrete cliff face at night with water cascading into a stump-shaped basin' },

  { id: 9, span: 5, aspect: '4/5',
    title: 'Carved Accent Wall', tag: 'Artisan Wall · Raking Light', loc: 'New England',
    image: img('/images/chameleon_concrete_34.jpg'),
    alt: 'Hand-carved decorative concrete accent post with deep texture' },
  { id: 10, span: 7, aspect: '5/4',
    title: 'Two-Tone Patio', tag: 'Stamped · Tonal Inlay', loc: 'New England',
    image: img('/images/chameleon_concrete_17.jpg'),
    alt: 'Wide stamped concrete patio in dual tones with raised seating ledge' },

  { id: 11, span: 8, aspect: '4/3',
    title: 'Carved Stone Cap', tag: 'Sculpted Wall · Granite Look', loc: 'Massachusetts',
    image: img('/images/chameleon_concrete_33.jpg'),
    alt: 'Concrete retaining wall with hand-carved face that reads as quarried granite' },
  { id: 12, span: 4, aspect: '3/4',
    title: 'Under-Deck Pad', tag: 'Slate · Tight Footprint', loc: 'New England',
    image: img('/images/chameleon_concrete_13.jpg'),
    alt: 'Stamped slate concrete pad set under an existing wood deck' },

  { id: 13, span: 4, aspect: '3/4',
    title: 'Threading Path', tag: 'Stamped Walkway', loc: 'Franklin area',
    image: img('/images/chameleon_concrete_09.jpg'),
    alt: 'Multi-tone stamped concrete walkway threading between lawn panels' },
  { id: 14, span: 8, aspect: '4/3',
    title: 'Raised Stamped Deck', tag: 'Slate · Outdoor Kitchen', loc: 'Massachusetts',
    image: img('/images/chameleon_concrete_20.jpg'),
    alt: 'Raised stamped concrete deck along a contemporary home with outdoor kitchen' },

  { id: 15, span: 12, aspect: '21/9',
    title: 'Black-&-White Dance Floor', tag: 'Custom Patio · Statement Piece', loc: 'Franklin, MA',
    image: img('/images/chameleon_concrete_44.jpg'),
    alt: 'Black and white checkerboard concrete patio with hot tub and string lights overhead' },

  // ── May 2026 photo drop (ids 16–24) ───────────────────────────────
  // New project shots from Adam. Item 16 is promoted into the homepage
  // featured grid as the new closer; the rest appear in the full
  // gallery only (added to _galleryOrder below).

  { id: 16, span: 12, aspect: '21/9',
    title: 'Aerial · Compass Medallion Floor', tag: 'Stamped · Inlaid Compass · Drone', loc: 'New England',
    image: img('/images/chameleon_concrete_47.jpg'),
    alt: 'Drone view of a craftsman standing on a copper-toned stamped concrete floor with a hand-inlaid compass medallion' },

  { id: 17, span: 12, aspect: '21/9',
    title: 'Checkered Patio in Progress', tag: 'Stamped · Tonal Diamond Pattern · Drone', loc: 'Massachusetts',
    image: img('/images/chameleon_concrete_48.jpg'),
    alt: 'Drone shot of a large two-tone diamond-pattern stamped concrete patio mid-installation' },

  // span/aspect tuned to align with the col-4 portrait row in the
  // featured grid (3:4 portrait, same height as siblings 20 + 8). The
  // source photo is portrait-orientation so the crop sits naturally.
  { id: 18, span: 4, aspect: '3/4',
    title: 'Stamped Steps to the House', tag: 'Stamped · Carved Edges · Hand Rail', loc: 'New England',
    image: img('/images/chameleon_concrete_49.jpg'),
    alt: 'Stamped grey concrete steps and walkway curving up through woods to a modern home' },

  { id: 19, span: 8, aspect: '4/3',
    title: 'Wood-Plank & Medallion Floor', tag: 'Interior · Stamped · Inlaid Medallion', loc: 'New England',
    image: img('/images/chameleon_concrete_50.jpg'),
    alt: 'Dark interior stamped concrete floor with wood-plank inlay and a circular hand-carved medallion' },

  { id: 20, span: 4, aspect: '3/4',
    title: 'Cardinal Compass Medallion', tag: 'Stamped · Hand-Inlaid Detail', loc: 'Franklin area',
    image: img('/images/chameleon_concrete_51.jpg'),
    alt: 'Stamped concrete compass medallion with teal cardinal-direction lettering and a sculpted compass rose' },

  { id: 21, span: 8, aspect: '4/3',
    title: 'A-Frame Approach', tag: 'Stamped Walkway · Carved Steps · Site Build', loc: 'New England',
    image: img('/images/chameleon_concrete_52.jpg'),
    alt: 'A-frame house with custom stamped concrete walkway and carved steps blending into the site' },

  { id: 22, span: 4, aspect: '3/4',
    title: 'A-Frame Patio Detail', tag: 'Stamped Patio · Site Integration', loc: 'New England',
    image: img('/images/chameleon_concrete_53.jpg'),
    alt: 'Stamped concrete patio at the entry of a modern A-frame home blending into existing rock outcrops' },

  { id: 23, span: 7, aspect: '5/4',
    title: 'Wood-Plank Side Walkway', tag: 'Stamped · Trompe l’œil Plank', loc: 'Massachusetts',
    image: img('/images/chameleon_concrete_54.jpg'),
    alt: 'Wood-plank-stamped grey concrete walkway curving along the side of a residential home' },

  { id: 24, span: 5, aspect: '4/5',
    title: 'Copper Stamped Edge', tag: 'Stamped Detail · Plank Border', loc: 'New England',
    image: img('/images/chameleon_concrete_55.jpg'),
    alt: 'Close-up of a copper-toned stamped concrete slab with a wood-plank border at its corner' },
];

// ── Full Gallery ─────────────────────────────────────────────────
// Drives the "View Full Gallery" modal launched from FeaturedWork.
//
// `_galleryOrder` is the single source of truth: hand-curated display
// order, best-first. Image 38 (atmospheric night patio) opens the
// gallery; cinematic / signature pieces follow; everyday finished
// work fills the middle; in-progress / lower-impact shots end.
//
// Numbers omitted are intentionally excluded:
//   • 5, 11        — don't exist on disk
//   • 42           — hero (byte-identical to gallery opener 38; 42 is
//                    reserved for the hero usage only)
//   • 31           — owner portrait
//   • 15, 16       — before/after pair
//   • 39           — final CTA
//   • 46           — brand "C" logo placeholder, not a project photo
//   • 32, 37       — exact duplicates of 30 (signature firepit)
//   • 26, 27       — exact byte-for-byte duplicates of 25 (slate
//                    walkway by white door). All three have identical
//                    MD5s — keep 25 only.
//   • 20           — near-duplicate of 19 (raised house deck)
//   • 29           — near-duplicate of 28 (in-progress driveway)
//
// Where a filename matches a project in PROJECTS, we reuse that
// project's `alt` for a11y. Otherwise we fall back to a generic
// descriptor — Adam can refine these as he reviews the site.
const _galleryOrder: number[] = [
  // Tier 1 — signature + cinematic. What makes Chameleon look like
  // sculpture instead of concrete work.
  // 47 leads — same drone-medallion shot now featured on the homepage,
  // and it sets the tone for everything that follows. 50 (wood-plank
  // interior + medallion) and 49 (carved steps through the woods) are
  // new high-impact shots from the May 2026 drop.
  47, 38, 41, 50, 40, 30, 43, 44, 4, 49, 7, 45, 24, 33, 34,
  // Tier 2 — strong finished work, varied finishes & textures. 48
  // (drone, checkered patio mid-install) and 51 (compass medallion
  // with teal letters) slot in here; 52 + 53 are the A-frame still
  // pair that complement the OwnerStory walkthrough video.
  48, 51, 52, 35, 36, 21, 17, 18, 2, 53, 22, 14, 12, 13, 25,
  // Tier 3 — competent finished work; less editorial pop. 54
  // (wood-plank side walkway) and 55 (copper edge detail) live here.
  6, 8, 9, 19, 23, 54, 55,
  // Tier 4 — process / in-progress shots; show craft but quieter.
  28, 1, 10, 3,
];

const _projectByImage = new Map(PROJECTS.map((p) => [p.image, p]));

export type GalleryItem = { src: string; alt: string };

export const GALLERY: GalleryItem[] = _galleryOrder.map((n) => {
  // `img()` applies the BASE_PATH prefix so plain <img> tags in
  // GalleryModal can use `item.src` directly without re-prefixing
  // (and so the lookup against _projectByImage matches — the Map's
  // keys are the already-prefixed PROJECTS image paths).
  const src = img(`/images/chameleon_concrete_${String(n).padStart(2, '0')}.jpg`);
  const proj = _projectByImage.get(src);
  return {
    src,
    alt: proj?.alt ?? 'Custom carved concrete project by Chameleon Concrete Projects',
  };
});

// SERVICES grid is rendered by Services.tsx as a flexible CSS grid,
// so the count can grow without touching layout. Item 5 (carved
// railings) was added in the May 2026 drop after the A-frame
// walkthrough video revealed Adam's log-look railing posts are
// concrete, not wood — a major differentiator that wasn't called out
// previously.
export const SERVICES = [
  { title: 'Water Features & Grottos',
    body: 'Sculpted concrete water features and custom grottos — carved on site to look natural, permanent, and built into the land.' },
  { title: 'Pools & Pool Decks',
    body: 'Custom-designed concrete pools and pool decking — including blending new work seamlessly with existing decking and surrounds.' },
  { title: 'Carved & Retaining Walls',
    body: 'Artisan-carved accent walls, decorative walls, and structural retaining walls — sculpted into the landscape rather than placed on top of it.' },
  { title: 'Patios & Outdoor Living',
    body: 'Concrete patios, walkways and outdoor living features — including stamped and decorative finishes, fire pits and the signature carved tree-stump pizza oven.' },
  { title: 'Carved Posts & Railings',
    body: 'Concrete carved to the texture and presence of weathered logs and tree branches — railings, balusters and site posts that read as found objects, not installed product.' },
];

export const PROCESS = [
  { title: 'Site Walk',
    body: "Adam visits the property to study the space, drainage, existing materials and what you're trying to build. No pressure, no slides." },
  { title: 'Concept & Estimate',
    body: 'Concept sketch, materials direction and a free, no-obligation estimate. Scope and timeline locked before any work begins.' },
  { title: 'Form, Pour & Carve',
    body: 'Prep, forming, pour and the signature hand-carving phase — texture, stone faces and detail sculpted directly into the wet concrete.' },
  { title: 'Color & Finish',
    body: 'Coloring, sealing and final walkthrough. The finished feature blends with existing decking, plantings and surrounds.' },
];

export const OWNER = {
  headline: 'Adam & crew. Concrete as a craft.',
  quote: 'We build concrete that feels natural, permanent, and completely custom to the space.',
  bio: 'Chameleon Concrete Projects is led by Adam Samarco out of Franklin, Massachusetts. Adam is known by clients for creativity, deep concrete knowledge, and an eye for blending new carved work into existing decking and landscape — so what we add looks like it was always there. Every project is run by Adam and the same crew, start to finish.',
  portrait: img('/images/chameleon_concrete_31.jpg'),
  portraitAlt: 'Adam Samarco, owner of Chameleon Concrete Projects, on site',
};

// 18 testimonials — matches the "5.0 ★ across 18 Google reviews" brand line.
// All entries are anonymized to "Google Review" because Adam hasn't yet given
// permission to use real reviewer names (open question in the handoff README).
// When Adam delivers the real review text + cleared names, swap each entry
// in place — no component changes needed.
export const TESTIMONIALS = [
  // — verbatim from the prototype (kept as-is) —
  { quote: 'Adam and crew did an amazing job with our patio. Creative, professional, and the finished work blended perfectly with what was already there.',
    name: 'Google Review', loc: 'Franklin area', project: 'Patio' },
  { quote: 'Very creative and the job was done perfectly. We will absolutely use Chameleon again for the next phase of our yard.',
    name: 'Google Review', loc: 'New England', project: 'Outdoor Project' },
  { quote: '5.0 stars across 18 Google reviews — clients consistently mention creativity, concrete knowledge, professionalism and the way new work blends into older decking.',
    name: 'Verified · Google', loc: 'Aggregate', project: 'Across projects' },

  // — placeholder reviews matching the same anonymous tone (pending Adam's real ones) —
  { quote: 'We came to Adam wanting a fire pit and ended up with an entire outdoor room. The carved-stump pizza oven is a piece of art.',
    name: 'Google Review', loc: 'Massachusetts', project: 'Fire Pit & Stump Oven' },
  { quote: 'He listened to what we wanted, walked the property a couple of times, then sketched something better than we had imagined. The pool deck looks like it grew out of the ground.',
    name: 'Google Review', loc: 'Cohasset, MA', project: 'Pool & Deck' },
  { quote: 'Concrete you would never know was concrete. The retaining wall reads like quarried granite. Everyone who comes over asks where we sourced the stone.',
    name: 'Google Review', loc: 'Norfolk, MA', project: 'Carved Wall' },
  { quote: 'Crew showed up on time, kept the site clean, and finished the carving phase in front of us so we could see the texture come together.',
    name: 'Google Review', loc: 'Wellesley, MA', project: 'Patio' },
  { quote: 'We had a tight budget and a small backyard. Adam delivered a custom water feature, a stamped walkway, and a small carved bench in budget and on time.',
    name: 'Google Review', loc: 'Sherborn, MA', project: 'Multi-piece Project' },
  { quote: "The wood-grain walkway is unbelievable. Visitors knock on it to make sure it's not real wood.",
    name: 'Google Review', loc: 'Medfield, MA', project: 'Stamped Walkway' },
  { quote: 'Second project with Chameleon. First was a patio in 2021 — we just had them back to add a carved wall and outdoor kitchen surround. Same crew, same care.',
    name: 'Google Review', loc: 'Hopkinton, MA', project: 'Repeat Client · Wall & Kitchen' },
  { quote: "I'm a contractor. I've worked with a lot of decorative concrete crews. Adam's level of carving and color is a different category — closer to sculpture than concrete work.",
    name: 'Google Review', loc: 'Massachusetts', project: 'Trade Reference' },
  { quote: "We didn't want anything that looked like a stamp pattern repeated 50 times. Adam carved every panel by hand. No two stones in the wall match.",
    name: 'Google Review', loc: 'Walpole, MA', project: 'Carved Wall' },
  { quote: 'Five stars. He blended the new patio into our existing brick paver edge so seamlessly we have to point it out to people.',
    name: 'Google Review', loc: 'Foxboro, MA', project: 'Patio Extension' },
  { quote: "Adam built our fire pit and pizza oven combo and warned us our backyard would become the neighborhood's. He was right.",
    name: 'Google Review', loc: 'Stoughton, MA', project: 'Fire Pit & Oven' },
  { quote: 'Beautiful work, fair price, and he stuck to the timeline. He told us up front it would be eleven weeks. It was eleven weeks.',
    name: 'Google Review', loc: 'Easton, MA', project: 'Pool Environment' },
  { quote: "Replaced an old wood deck with a stamped-concrete entertaining area. The grandkids prefer it because the floor doesn't splinter.",
    name: 'Google Review', loc: 'Norwood, MA', project: 'Outdoor Living' },
  { quote: 'He carved a small grotto into the slope behind our pool. The kids basically live there in summer.',
    name: 'Google Review', loc: 'New England', project: 'Grotto' },
  { quote: 'We had a flat lawn. Now we have a sunken patio, a fire pit, a carved wall, and a custom outdoor pizza oven. Same yard. Different planet.',
    name: 'Google Review', loc: 'Franklin area', project: 'Full Yard Transformation' },
];

export const MARQUEE = [
  'Pools', 'Waterfalls', 'Grottos', 'Carved Walls',
  'Outdoor Rooms', 'Fireplaces', 'Sculpted Stone', 'By Hand',
];

export const HERO_IMAGE = {
  src: img('/images/chameleon_concrete_42.jpg'),
  alt: 'Carved concrete fire pit and tree-stump pizza oven at twilight, Adam Samarco signature project',
};

// Real before/after pair — same house, same French doors, same camera angle.
// 16: cracked slab + bare gravel (pre-work). 15: finished stamped concrete
// patio with curved edge. Adam supplied these as a matched set.
export const BA_IMAGES = {
  before: {
    src: img('/images/chameleon_concrete_16.jpg'),
    alt: 'Cracked concrete pad and bare gravel behind the homeowner’s French doors before work began',
  },
  after: {
    src: img('/images/chameleon_concrete_15.jpg'),
    alt: 'Finished stamped-concrete patio with curved leading edge in the same spot after eleven weeks',
  },
  caption: 'Backyard transformation · New England · Same footprint, eleven weeks',
};

export const CTA_IMAGE = {
  src: img('/images/chameleon_concrete_39.jpg'),
  alt: 'Moody night waterfall — custom carved concrete grotto detail',
};

// ── Award (May 2026) ─────────────────────────────────────────────
// "Best of BusinessRate 2025 — Concrete Contractor, Franklin MA"
// plaque from the August 2025 Google review aggregation. Displayed in
// a standalone Award strip between Testimonials and FinalCTA, and
// referenced in TrustStrip + Footer.
export const AWARD = {
  src: img('/images/award_businessrate_2025.png'),
  alt: 'Best of BusinessRate 2025 — Concrete Contractor, Franklin Massachusetts plaque awarded to Chameleon Concrete Projects',
  eyebrow: 'Recognition',
  headline: 'Voted Best of <em>2025.</em>',
  body:
    'Named the 2025 Concrete Contractor of the year for Franklin, Massachusetts by BusinessRate, based on aggregated Google reviews from August 2025.',
};

// ── A-frame walkthrough video ────────────────────────────────────
// 28-second silent walkthrough of a finished A-frame project showing
// stamped concrete walkway, carved steps, and the carved-concrete
// "log" railings that look like real branches. Plays muted/looped in
// the OwnerStory portrait slot — used to be a placeholder per the
// pre-existing TODO. Audio is intentionally muted (required for
// autoplay; ambient context, not narration).
export const STUDIO_VIDEO = {
  src: img('/images/aframe_walkthrough.mp4'),
  // Poster falls back to a still from the same project so a poster is
  // visible before the video buffers and on reduced-data clients.
  poster: img('/images/chameleon_concrete_52.jpg'),
  caption: 'On site · A-frame project · carved concrete steps & railings',
};
