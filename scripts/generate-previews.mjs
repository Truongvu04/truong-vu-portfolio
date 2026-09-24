import { mkdirSync, writeFileSync } from "node:fs";

// Branded illustrations for the existing image grid; these are not site screenshots.
const sets = [
  {
    slug: "huong-vi-viet",
    title: "HƯƠNG VỊ",
    second: "VIỆT",
    label: "RESTAURANT WEBSITE",
    bg: "#281a14",
    mid: "#6f3c2a",
    glow: "#e6a85e",
    accent: "#ffd69b",
  },
  {
    slug: "auralis-x1",
    title: "AURALIS",
    second: "X1",
    label: "3D PRODUCT EXPERIENCE",
    bg: "#17142c",
    mid: "#443080",
    glow: "#927cf0",
    accent: "#d9ceff",
  },
  {
    slug: "flood-rescue",
    title: "FLOOD",
    second: "RESCUE",
    label: "RESCUE COORDINATION",
    bg: "#0f2830",
    mid: "#155e6a",
    glow: "#49c9d4",
    accent: "#c0f6f4",
  },
];

const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const frame = (
  set,
  variant,
  contents,
) => `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520" role="img" aria-label="Minh họa ${escape(set.title)} ${escape(set.second)}">
<defs><radialGradient id="glow"><stop stop-color="${set.glow}" stop-opacity=".68"/><stop offset="1" stop-color="${set.glow}" stop-opacity="0"/></radialGradient><linearGradient id="base" x2="1" y2="1"><stop stop-color="${set.mid}"/><stop offset="1" stop-color="${set.bg}"/></linearGradient><pattern id="grid" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M38 0H0V38" fill="none" stroke="white" stroke-opacity=".07"/></pattern></defs>
<rect width="800" height="520" fill="url(#base)"/><rect width="800" height="520" fill="url(#grid)"/><circle cx="645" cy="220" r="270" fill="url(#glow)"/>
<rect x="28" y="28" width="744" height="464" rx="28" fill="none" stroke="white" stroke-opacity=".2"/>
<text x="66" y="78" fill="${set.accent}" font-size="17" font-family="Arial,sans-serif" font-weight="700" letter-spacing="5">${escape(set.label)}</text>
${contents}
<text x="66" y="467" fill="white" fill-opacity=".65" font-size="14" font-family="Arial,sans-serif" letter-spacing="4">TRUONG VU  /  SELECTED WORK 0${variant}</text></svg>`;

function artwork(set, variant) {
  if (variant === 1)
    return `<circle cx="620" cy="270" r="155" fill="none" stroke="${set.accent}" stroke-opacity=".52" stroke-width="2"/><circle cx="620" cy="270" r="102" fill="none" stroke="${set.accent}" stroke-opacity=".32" stroke-width="25"/><text x="66" y="264" fill="white" font-size="75" font-family="Arial,sans-serif" font-weight="800" letter-spacing="-6">${escape(set.title)}</text><text x="66" y="352" fill="${set.accent}" font-size="94" font-family="Arial,sans-serif" font-weight="800" letter-spacing="-6">${escape(set.second)}</text>`;
  if (variant === 2)
    return `<rect x="88" y="122" width="625" height="285" rx="24" fill="${set.bg}" fill-opacity=".75" stroke="white" stroke-opacity=".2"/><circle cx="125" cy="155" r="7" fill="${set.accent}"/><circle cx="149" cy="155" r="7" fill="white" fill-opacity=".4"/><circle cx="173" cy="155" r="7" fill="white" fill-opacity=".2"/><path d="M88 181h625" stroke="white" stroke-opacity=".18"/><rect x="120" y="212" width="225" height="160" rx="15" fill="${set.mid}"/><circle cx="230" cy="285" r="56" fill="none" stroke="${set.accent}" stroke-opacity=".65" stroke-width="18"/><text x="380" y="256" fill="${set.accent}" font-size="20" font-family="Arial,sans-serif" font-weight="700" letter-spacing="3">${escape(set.title)}</text><rect x="380" y="280" width="250" height="11" rx="5" fill="white" fill-opacity=".7"/><rect x="380" y="309" width="205" height="9" rx="5" fill="white" fill-opacity=".25"/><rect x="380" y="335" width="155" height="9" rx="5" fill="white" fill-opacity=".25"/>`;
  return `<circle cx="594" cy="264" r="166" fill="none" stroke="${set.accent}" stroke-opacity=".35" stroke-width="1"/><circle cx="594" cy="264" r="117" fill="none" stroke="${set.accent}" stroke-opacity=".6" stroke-width="2"/><circle cx="594" cy="264" r="68" fill="${set.accent}" fill-opacity=".2"/><circle cx="594" cy="264" r="22" fill="${set.accent}"/><text x="70" y="258" fill="white" font-size="65" font-family="Arial,sans-serif" font-weight="800" letter-spacing="-4">${escape(set.title)}</text><text x="70" y="332" fill="${set.accent}" font-size="76" font-family="Arial,sans-serif" font-weight="800" letter-spacing="-5">${escape(set.second)}</text><path d="M70 365h240" stroke="${set.accent}" stroke-width="3"/>`;
}

mkdirSync("public/previews", { recursive: true });
for (const set of sets)
  for (let variant = 1; variant <= 3; variant++) {
    writeFileSync(
      `public/previews/${set.slug}-${variant}.svg`,
      frame(set, variant, artwork(set, variant)),
    );
  }
