// GuardianMap.jsx
//
// The single reusable map component for the whole app — Landing page preview,
// User Dashboard, Driver Dashboard, Admin Dashboard, Emergency Monitoring,
// Safe Zone page, Danger Zone page all import this same file and just pass
// different data in.
//
// Stack: Leaflet + React-Leaflet + OpenStreetMap tiles only. No Google Maps,
// no Mapbox, no API key. Styled entirely with Tailwind utility classes.
//
// A few things worth knowing before you extend this:
//
// 1. Markers are custom Leaflet `divIcon`s built from an HTML string of
//    Tailwind classes, not Leaflet's default PNG marker images. Leaflet's
//    default icon paths break under Vite bundling (a very common
//    "marker shows a broken image" bug) — divIcons sidestep that completely.
//
// 2. Dark mode retints the *same* OpenStreetMap tiles with Tailwind's
//    dark:invert / dark:hue-rotate-* / dark:brightness-* utilities on the
//    TileLayer, instead of switching to a different "dark" tile provider.
//    This assumes your app already has Tailwind's `dark` variant wired to a
//    `.dark` class on <html> (the same setup this project's ThemeContext /
//    index.css custom-variant already uses) — dark mode here will just work.
//
// 3. There's one small <style> block at the bottom of the render. Leaflet
//    injects its own zoom-control and attribution DOM directly into the
//    map — it's not JSX we render, so there's no element to hang a
//    Tailwind className on. That handful of rules is the only non-Tailwind
//    CSS in this file, and it only reskins Leaflet's own chrome.
//
// 4. Marker data is passed in as plain props (arrays of plain objects), not
//    fetched or hardcoded here. Today it's a static array in a page file,
//    tomorrow it's a Firebase listener or socket event — this component
//    doesn't care where the array came from, which is what makes it reusable.
//
// 5. `markers` (generic, typed) exists alongside `safeZones` / `dangerZones`
//    (the common cases) so you can drop in any future marker type —
//    hospital, police, fire, sos, driver — without ever touching this file.

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------------------------------------------------------------------- */
/*  Icon factory                                                          */
/* ---------------------------------------------------------------------- */

const ICON_COLORS = {
  user: "#2563EB", // brand blue — "you are here"
  safe: "#16A34A", // green
  danger: "#DC2626", // red
  hospital: "#0EA5E9",
  police: "#1D4ED8",
  fire: "#F97316",
  sos: "#DC2626",
  driver: "#7C3AED",
};

const ICON_GLYPHS = {
  hospital: "H",
  police: "P",
  fire: "F",
  sos: "!",
};

const iconCache = {};

/**
 * Returns (and memoizes) a Leaflet divIcon for a given marker type.
 * Exported so future features (SOS button, hospital layer, driver layer)
 * can request the matching icon without duplicating marker styling.
 */
export function getMarkerIcon(type = "safe") {
  if (iconCache[type]) return iconCache[type];

  const color = ICON_COLORS[type] || ICON_COLORS.safe;
  const glyph = ICON_GLYPHS[type] || "";

  const html =
    type === "user"
      ? `
        <span class="relative flex items-center justify-center w-[22px] h-[22px]">
          <span class="absolute inset-0 rounded-full animate-ping opacity-40" style="background:${color}"></span>
          <span class="relative z-10 w-4 h-4 rounded-full ring-2 ring-white shadow-lg" style="background:${color}"></span>
        </span>
      `
      : `
        <span class="relative flex items-center justify-center w-[30px] h-[30px]">
          <span class="absolute inset-0 rounded-full animate-ping opacity-40" style="background:${color}"></span>
          <span class="relative z-10 grid place-items-center w-[22px] h-[22px] rounded-[50%_50%_50%_0] rotate-45 ring-2 ring-white shadow-lg" style="background:${color}">
            <span class="-rotate-45 text-white text-[10px] font-bold font-mono leading-none">${glyph}</span>
          </span>
        </span>
      `;

  const icon = L.divIcon({
    className: "!bg-transparent !border-0",
    html,
    iconSize: type === "user" ? [22, 22] : [30, 30],
    iconAnchor: type === "user" ? [11, 11] : [15, 30],
    popupAnchor: [0, type === "user" ? -12 : -28],
  });

  iconCache[type] = icon;
  return icon;
}

/* ---------------------------------------------------------------------- */
/*  Internal helpers                                                      */
/* ---------------------------------------------------------------------- */

/** Clears the loading overlay once Leaflet reports the map is ready. */
function ReadySignal({ onReady }) {
  const map = useMap();
  useEffect(() => {
    map.whenReady(onReady);
  }, [map, onReady]);
  return null;
}

/**
 * Recenters/re-zooms the map imperatively when `focus` changes, without
 * remounting the whole MapContainer. Useful later for "fly to my location"
 * or "fly to this incident" buttons — pass a new `focus={[lat, lng]}` and it
 * will animate there.
 */
function FocusController({ focus, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (!focus) return;
    map.flyTo(focus, zoom ?? map.getZoom(), { duration: 0.9 });
  }, [focus, zoom, map]);
  return null;
}

function renderMarker(item, type) {
  const position = item.position;
  if (!position) return null;
  return (
    <Marker key={item.id ?? `${type}-${position.join(",")}`} position={position} icon={getMarkerIcon(type)}>
      {(item.label || item.description) && (
        <Popup className="[&_.leaflet-popup-content-wrapper]:rounded-xl [&_.leaflet-popup-content-wrapper]:shadow-xl">
          <div className="min-w-[160px]">
            {item.label && (
              <p className="font-semibold text-[13.5px] text-slate-900">{item.label}</p>
            )}
            {item.description && (
              <p className="mt-1 text-[12.5px] text-slate-500">{item.description}</p>
            )}
          </div>
        </Popup>
      )}
    </Marker>
  );
}

/* ---------------------------------------------------------------------- */
/*  Component                                                              */
/* ---------------------------------------------------------------------- */

export default function GuardianMap({
  // Layout
  height = "420px",
  className = "",
  rounded = true,

  // Viewport
  center = [28.6139, 77.209], // default: New Delhi — swap per deployment/city
  zoom = 12,
  focus = null, // [lat, lng] — imperatively fly here when it changes
  scrollWheelZoom = true,
  interactive = true, // set false for a "preview only" embed (no drag/zoom)

  // Data
  userLocation = null, // { position: [lat, lng], label, description }
  safeZones = [], // [{ id, position, label, description }]
  dangerZones = [], // [{ id, position, label, description }]
  markers = [], // [{ id, type, position, label, description }] — future-ready (hospital/police/fire/sos/driver)
  geofences = [], // [{ id, center, radiusMeters, tone: "safe" | "danger" }] — for future geofencing

  // UI
  showLegend = true,
  legendItems = null, // override default legend entries
}) {
  const [ready, setReady] = useState(false);
  const handleReady = useRef(() => setReady(true)).current;

  const legend =
    legendItems ||
    [
      userLocation && { color: ICON_COLORS.user, label: "You" },
      safeZones.length > 0 && { color: ICON_COLORS.safe, label: "Safe Zone" },
      dangerZones.length > 0 && { color: ICON_COLORS.danger, label: "Danger Zone" },
    ].filter(Boolean);

  return (
    <div
      className={`relative w-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-[#0F172A] isolate ${
        rounded ? "rounded-3xl" : ""
      } ${className}`}
      style={{ height }}
    >
      {!ready && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2.5 bg-[#0F172A] text-slate-400">
          <span className="h-6 w-6 rounded-full border-[2.5px] border-blue-400/25 border-t-blue-400 animate-spin" />
          <span className="text-[12.5px]">Loading map…</span>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        className="h-full w-full"
      >
        <ReadySignal onReady={handleReady} />
        <FocusController focus={focus} zoom={zoom} />

        {/* OpenStreetMap tiles — free, no API key. Dark styling is a CSS
            filter applied via Tailwind's dark: utilities, not a different
            tile provider. */}
        <TileLayer
          className="dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-75 dark:saturate-50"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Optional geofence circles — ready for future geofencing features */}
        {geofences.map((g) => (
          <Circle
            key={g.id}
            center={g.center}
            radius={g.radiusMeters}
            pathOptions={{
              color: g.tone === "danger" ? ICON_COLORS.danger : ICON_COLORS.safe,
              fillColor: g.tone === "danger" ? ICON_COLORS.danger : ICON_COLORS.safe,
              fillOpacity: 0.08,
              weight: 1.5,
            }}
          />
        ))}

        {userLocation && renderMarker(userLocation, "user")}
        {safeZones.map((z) => renderMarker(z, "safe"))}
        {dangerZones.map((z) => renderMarker(z, "danger"))}
        {markers.map((m) => renderMarker(m, m.type))}
      </MapContainer>

      {showLegend && legend.length > 0 && (
        <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-3.5 rounded-xl bg-slate-900/55 backdrop-blur-md px-3.5 py-2">
          {legend.map((item) => (
            <span key={item.label} className="flex items-center gap-1.5 text-white text-[12px] whitespace-nowrap">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Leaflet renders its zoom control and attribution itself (not as
          JSX we control), so Tailwind classes can't reach them via props.
          This is the only hand-written CSS in the file, and it only
          reskins that built-in Leaflet chrome to match the app. */}
      <style>{`
        .leaflet-control-zoom { border: none !important; border-radius: 0.75rem !important; overflow: hidden; box-shadow: 0 4px 14px rgba(15,23,42,0.18); }
        .leaflet-control-zoom a { width: 32px !important; height: 32px !important; line-height: 32px !important; background: #fff !important; color: #0F172A !important; border: none !important; }
        .leaflet-control-zoom a:hover { background: #f1f5f9 !important; color: #2563EB !important; }
        .leaflet-control-attribution { font-size: 10px !important; border-radius: 6px 0 0 0 !important; }
        .dark .leaflet-control-attribution { background: rgba(15,23,42,0.75) !important; color: #94a3b8 !important; }
        .dark .leaflet-control-attribution a { color: #cbd5e1 !important; }
      `}</style>
    </div>
  );
}
