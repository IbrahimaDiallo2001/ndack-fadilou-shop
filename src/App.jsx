import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Shirt,
  Gem,
  FlaskConical,
  Watch,
  Footprints,
  Glasses,
  ArrowUpRight,
  ArrowRight,
  X,
  Mail,
  AtSign,
  MessageCircle,
} from "lucide-react";

const DEPARTMENTS = [
  { id: "vetements", num: "01", label: "Vêtements", tagline: "Coupes nettes, matières rares.", Icon: Shirt },
  { id: "accessoires", num: "02", label: "Accessoires", tagline: "Le détail qui signe l'ensemble.", Icon: Gem },
  { id: "parfums", num: "03", label: "Parfums", tagline: "Une odeur, une mémoire.", Icon: FlaskConical },
  { id: "montres", num: "04", label: "Montres", tagline: "Le temps, mesuré avec soin.", Icon: Watch },
  { id: "chaussures", num: "05", label: "Chaussures", tagline: "Chaque pas, une allure.", Icon: Footprints },
  { id: "lunettes", num: "06", label: "Lunettes", tagline: "Voir, et être vu.", Icon: Glasses },
];

// Le champ "image" pointe vers /public/images/... — déposez-y vos photos
// avec exactement ces noms de fichiers pour qu'elles s'affichent automatiquement.
// Tant qu'une image est absente, l'icône du département s'affiche à la place.
// Le champ "image" pointe vers /public/images/... — vos photos y sont déjà
// nommées correctement. Tant qu'une image est absente, l'icône du
// département s'affiche à la place. Remplacez "Prix sur demande" par vos
// vrais prix quand vous êtes prêt.
// Le catalogue vit maintenant dans /public/data/products.json — modifiable
// depuis l'interface d'administration (/admin) sans toucher au code.

function deptOf(id) {
  return DEPARTMENTS.find((d) => d.id === id);
}

/** Shows the product photo if it loads; otherwise falls back to the department icon. */
function ProductImage({ src, alt, IconEl, iconSize }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <IconEl size={iconSize} strokeWidth={1} className="mer-card-icon" color="rgba(237,230,218,0.55)" />;
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="mer-card-photo"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 22 }}
    />
  );
}

/** Reveals children with a fade/rise as they enter the viewport. */
function Reveal({ children, delay = 0, as: Tag = "div", style, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`mer-reveal ${vis ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

export default function ElFadilouShop() {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [active, setActive] = useState("tous");
  const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setProductsLoaded(true));
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    setSelectedSize(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHeroMove = useCallback((e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, []);

  const visible = active === "tous" ? products : products.filter((p) => p.dept === active);

  const scrollToCatalogue = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* HEADER */}
      <header style={{ ...styles.header, ...(scrolled ? styles.headerScrolled : {}) }}>
        <div style={styles.headerInner} className="mer-header-inner">
          <span style={styles.logo}>NDACK FADILOU SHOP</span>
          <nav style={styles.nav} className="mer-nav-hide">
            <a href="#catalogue" style={styles.navLink} className="mer-link mer-underline">Catalogue</a>
            <a href="#maison" style={styles.navLink} className="mer-link mer-underline">La Maison</a>
            <a href="#contact" style={styles.navLink} className="mer-link mer-underline">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={styles.hero} ref={heroRef} onMouseMove={handleHeroMove} className="mer-hero">
        <div style={styles.heroGrain} className="mer-drift-a" />
        <div style={styles.heroGrainB} className="mer-drift-b" />
        <div style={styles.heroGlow} className="mer-hero-glow" />
        <div style={styles.heroInner}>
          <p style={styles.heroEyebrow} className="mer-reveal is-visible">NDACK FADILOU SHOP — OUEST-FOIRE, DAKAR</p>
          <h1 style={styles.heroTitle} className="mer-reveal is-visible" data-d="1">
            L'élégance se&nbsp;mesure<br />au détail.
          </h1>
          <p style={styles.heroSub} className="mer-reveal is-visible" data-d="2">
            Vêtements, accessoires, parfums, montres, chaussures et lunettes —
            une collection pensée comme une seule silhouette.
          </p>
          <button onClick={scrollToCatalogue} style={styles.heroCta} className="mer-cta mer-reveal is-visible" data-d="3">
            <span>Parcourir le catalogue</span> <ArrowUpRight size={16} strokeWidth={1.5} className="mer-cta-arrow" />
          </button>
        </div>
        <div style={styles.scrollCue} className="mer-scroll-cue">
          <span style={styles.scrollCueLine} />
        </div>
      </section>

      {/* DEPARTMENT INDEX */}
      <section style={styles.indexSection} className="mer-index-section">
        <Reveal as="p" style={styles.sectionEyebrow}>Répertoire des départements</Reveal>
        <div style={styles.indexStrip} className="mer-scrollbar">
          <button
            onClick={() => setActive("tous")}
            style={{
              ...styles.indexPill,
              ...(active === "tous" ? styles.indexPillActive : {}),
            }}
            className="mer-pill"
          >
            <span style={styles.indexNum}>00</span>
            <span>Tout voir</span>
          </button>
          {DEPARTMENTS.map((d) => {
            const IconEl = d.Icon;
            const isActive = active === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                style={{ ...styles.indexPill, ...(isActive ? styles.indexPillActive : {}) }}
                className="mer-pill"
              >
                <span style={styles.indexNum}>{d.num}</span>
                <IconEl size={16} strokeWidth={1.4} className="mer-pill-icon" />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" style={styles.catalogue} className="mer-catalogue">
        <div style={styles.catalogueHeadRow}>
          <h2 style={styles.catalogueTitle}>
            {active === "tous" ? "Le catalogue" : deptOf(active)?.label}
          </h2>
          <span style={styles.catalogueCount}>
            {String(visible.length).padStart(2, "0")} pièce{visible.length > 1 ? "s" : ""}
          </span>
        </div>

        {!productsLoaded && (
          <p style={styles.catalogueStatus}>Chargement du catalogue…</p>
        )}

        {productsLoaded && visible.length === 0 && (
          <p style={styles.catalogueStatus}>Aucune pièce dans ce rayon pour le moment.</p>
        )}

        {productsLoaded && visible.length > 0 && (
          <div style={styles.grid}>
            {visible.map((p, i) => {
              const d = deptOf(p.dept);
              const IconEl = d.Icon;
              return (
                <Reveal key={p.id ?? `${p.dept}-${p.name}-${i}`} as="button" delay={(i % 6) * 70} className="mer-card" style={styles.card}>
                  <span onClick={() => setSelected(p)} style={styles.cardClickable} className="mer-card-click">
                    <span style={styles.cardSwatch} className="mer-card-swatch">
                      <span style={styles.cardSwatchLines} />
                      <ProductImage src={p.image} alt={p.name} IconEl={IconEl} iconSize={30} />
                      <span style={styles.cardOverlay} className="mer-card-overlay">
                        Voir la pièce <ArrowRight size={13} strokeWidth={1.5} />
                      </span>
                    </span>
                    <span style={styles.cardBody}>
                      <span style={styles.cardEyebrow}>{d.num} · {d.label}</span>
                      <span style={styles.cardName} className="mer-card-name">{p.name}</span>
                      <span style={styles.cardFoot}>
                        <span style={styles.cardMaterial}>{p.material}</span>
                        <span style={styles.cardPrice} className="mer-card-price">{p.price}</span>
                      </span>
                    </span>
                  </span>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* MANIFESTO */}
      <section id="maison" style={styles.manifesto} className="mer-manifesto">
        <Reveal>
          <p style={styles.manifestoQuote}>
            « Nous ne vendons pas des objets.<br />Nous composons une allure. »
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p style={styles.manifestoBody}>
            Basée à Ouest-Foire, à Dakar, Ndack Fadilou Shop réunit six
            départements sous une seule discipline : celle du détail juste.
            Chaque pièce — un tissu, un mécanisme, une essence — est choisie
            pour tenir sa place dans une silhouette plus vaste que l'objet
            lui-même.
          </p>
        </Reveal>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" style={styles.footer} className="mer-footer">
        <div style={styles.footerGrid} className="mer-footer-grid">
          <div>
            <p style={styles.logo}>NDACK FADILOU SHOP</p>
            <p style={styles.footerText}>
              Boutique de vêtements, accessoires, parfums, montres,
              chaussures et lunettes.
              <br />
              Ouest-Foire, Dakar — Sénégal
            </p>
          </div>

          <div>
            <p style={styles.footerHeading}>Liste privée</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              style={styles.footerForm}
            >
              <input
                required
                type="email"
                placeholder="votre@email.com"
                style={styles.footerInput}
                disabled={subscribed}
                className="mer-input"
              />
              <button type="submit" style={styles.footerButton} className="mer-cta-outline" disabled={subscribed}>
                {subscribed ? "Merci" : "S'inscrire"}
              </button>
            </form>
          </div>

          <div>
            <p style={styles.footerHeading}>Nous suivre</p>
            <div style={styles.footerIcons}>
              <a href="#" aria-label="Instagram" style={styles.footerIconLink} className="mer-link mer-icon-bounce">
                <AtSign size={18} strokeWidth={1.4} />
              </a>
              <a
                href="https://wa.me/221784655369"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={styles.footerIconLink}
                className="mer-link mer-icon-bounce"
              >
                <MessageCircle size={18} strokeWidth={1.4} />
              </a>
              <a href="mailto:contact@elfadilou-shop.com" aria-label="Email" style={styles.footerIconLink} className="mer-link mer-icon-bounce">
                <Mail size={18} strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Ndack Fadilou Shop</span>
          <span>Vitrine de démonstration — sans paiement en ligne</span>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)} className="mer-overlay-in">
          <div style={styles.modal} onClick={(e) => e.stopPropagation()} className="mer-modal-in mer-modal">
            <button onClick={() => setSelected(null)} style={styles.modalClose} aria-label="Fermer" className="mer-icon-bounce">
              <X size={18} strokeWidth={1.5} />
            </button>
            <div style={styles.modalSwatch}>
              <ProductImage
                src={selected.image}
                alt={selected.name}
                IconEl={deptOf(selected.dept).Icon}
                iconSize={46}
              />
            </div>
            <p style={styles.cardEyebrow}>
              {deptOf(selected.dept).num} · {deptOf(selected.dept).label}
            </p>
            <h3 style={styles.modalName}>{selected.name}</h3>
            <p style={styles.modalMaterial}>{selected.material}</p>
            <p style={styles.modalPrice}>{selected.price}</p>

            {selected.sizes && (
              <div style={styles.sizeBlock}>
                <p style={styles.sizeLabel}>
                  {selected.dept === "chaussures" ? "Pointure" : "Taille"}
                  {selectedSize ? ` — ${selectedSize}` : ""}
                </p>
                <div style={styles.sizeRow}>
                  {selected.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        ...styles.sizePill,
                        ...(selectedSize === s ? styles.sizePillActive : {}),
                      }}
                      className="mer-size-pill"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <a
              href={`https://wa.me/221784655369?text=${encodeURIComponent(
                `Bonjour, je suis intéressé(e) par : ${selected.name} (${selected.price})` +
                  (selected.sizes ? ` — Taille ${selectedSize || "à préciser"}` : "")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.heroCta}
              className="mer-cta"
            >
              <span>Commander sur WhatsApp</span> <ArrowUpRight size={16} strokeWidth={1.5} className="mer-cta-arrow" />
            </a>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/221784655369"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        style={styles.whatsappFab}
        className="mer-fab"
      >
        <span style={styles.whatsappFabPulse} className="mer-fab-pulse" />
        <MessageCircle size={26} strokeWidth={1.8} color="#FFFFFF" />
      </a>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; }

  /* --- scroll reveal --- */
  .mer-reveal {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.8s cubic-bezier(.16,.84,.44,1), transform 0.8s cubic-bezier(.16,.84,.44,1);
  }
  .mer-reveal.is-visible { opacity: 1; transform: translateY(0); }

  /* --- header --- */
  .mer-underline { position: relative; }
  .mer-underline::after {
    content: ""; position: absolute; left: 0; right: 100%; bottom: -4px; height: 1px;
    background: #B08A55; transition: right 0.3s cubic-bezier(.16,.84,.44,1);
  }
  .mer-underline:hover::after { right: 0; }

  .mer-link { transition: opacity 0.2s ease; opacity: 0.75; }
  .mer-link:hover { opacity: 1; }

  /* --- hero --- */
  .mer-drift-a { animation: driftA 22s ease-in-out infinite; }
  .mer-drift-b { animation: driftB 28s ease-in-out infinite; }
  @keyframes driftA {
    0%, 100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(-3%, 4%) scale(1.08); }
  }
  @keyframes driftB {
    0%, 100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(4%, -3%) scale(1.1); }
  }
  .mer-hero-glow {
    position: absolute; inset: 0; pointer-events: none; opacity: 0;
    background: radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(176,138,85,0.16), transparent 70%);
    transition: opacity 0.4s ease;
  }
  .mer-hero:hover .mer-hero-glow { opacity: 1; }

  .mer-scroll-cue {
    position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
    display: flex; justify-content: center;
  }
  .mer-scroll-cue span {
    display: block; width: 1px; height: 34px; background: linear-gradient(to bottom, rgba(237,230,218,0.6), transparent);
    animation: scrollCue 2s ease-in-out infinite;
  }
  @keyframes scrollCue {
    0% { transform: scaleY(0.3); opacity: 0; transform-origin: top; }
    40% { opacity: 1; }
    100% { transform: scaleY(1); opacity: 0; transform-origin: top; }
  }

  /* --- CTA button --- */
  .mer-cta { position: relative; overflow: hidden; }
  .mer-cta span:first-child { position: relative; z-index: 1; transition: color 0.35s ease; }
  .mer-cta-arrow { position: relative; z-index: 1; transition: color 0.35s ease, transform 0.35s cubic-bezier(.16,.84,.44,1); }
  .mer-cta::before {
    content: ""; position: absolute; inset: 0; background: #EDE6DA;
    transform: translateX(-101%); transition: transform 0.4s cubic-bezier(.16,.84,.44,1);
  }
  .mer-cta:hover::before { transform: translateX(0); }
  .mer-cta:hover span:first-child { color: #14100F; }
  .mer-cta:hover .mer-cta-arrow { color: #14100F; transform: translate(3px,-3px); }

  .mer-cta-outline { transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease; }
  .mer-cta-outline:hover:not(:disabled) { border-color: #EDE6DA !important; color: #EDE6DA !important; transform: translateY(-1px); }

  /* --- pills --- */
  .mer-pill { transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s cubic-bezier(.16,.84,.44,1); }
  .mer-pill:hover { border-color: rgba(176,138,85,0.6) !important; transform: translateY(-2px); }
  .mer-pill-icon { transition: transform 0.35s cubic-bezier(.16,.84,.44,1); }
  .mer-pill:hover .mer-pill-icon { transform: rotate(-10deg) scale(1.15); }

  .mer-size-pill { transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
  .mer-size-pill:hover { border-color: rgba(176,138,85,0.6) !important; transform: translateY(-1px); }

  /* --- product cards --- */
  .mer-card { transition: transform 0.35s cubic-bezier(.16,.84,.44,1); cursor: pointer; }
  .mer-card:hover { transform: translateY(-5px); }
  .mer-card-click { display: flex; flex-direction: column; height: 100%; }
  .mer-card-swatch { transition: background 0.3s ease; }
  .mer-card:hover .mer-card-swatch { background: #241E1A; }
  .mer-card-icon { transition: transform 0.45s cubic-bezier(.16,.84,.44,1); }
  .mer-card:hover .mer-card-icon { transform: scale(1.14) rotate(-6deg); }
  .mer-card-overlay {
    position: absolute; left: 0; right: 0; bottom: 0;
    display: flex; align-items: center; gap: 6px; justify-content: center;
    padding: 10px 0; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.06em;
    color: #EDE6DA; background: linear-gradient(to top, rgba(20,16,15,0.9), transparent);
    transform: translateY(100%); transition: transform 0.35s cubic-bezier(.16,.84,.44,1);
  }
  .mer-card:hover .mer-card-overlay { transform: translateY(0); }
  .mer-card-photo {
    filter: grayscale(0.25) contrast(1.05) brightness(0.92);
    transition: transform 0.5s cubic-bezier(.16,.84,.44,1), filter 0.4s ease;
  }
  .mer-card:hover .mer-card-photo { transform: scale(1.03); filter: grayscale(0.05) contrast(1.05) brightness(0.98); }
  .mer-card-name { transition: color 0.3s ease; }
  .mer-card:hover .mer-card-name { color: #B08A55; }
  .mer-card-price { transition: letter-spacing 0.3s ease; }
  .mer-card:hover .mer-card-price { letter-spacing: 0.03em; }

  /* --- footer --- */
  .mer-input { transition: border-color 0.25s ease; }
  .mer-input:focus { border-color: #B08A55 !important; }
  .mer-icon-bounce { transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s ease; }
  .mer-icon-bounce:hover { transform: translateY(-3px) scale(1.12); }

  /* --- modal --- */
  .mer-overlay-in { animation: fadeIn 0.25s ease; }
  .mer-modal-in { animation: modalIn 0.35s cubic-bezier(.16,.84,.44,1); }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes modalIn { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .mer-scrollbar::-webkit-scrollbar { height: 4px; }
  .mer-scrollbar::-webkit-scrollbar-thumb { background: rgba(237,230,218,0.2); }

  a, button { font-family: inherit; }

  .mer-fab { transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
  .mer-fab:hover { transform: scale(1.08) translateY(-2px); }
  .mer-fab-pulse { animation: fabPulse 2.6s ease-out infinite; }
  @keyframes fabPulse {
    0% { transform: scale(1); opacity: 0.55; }
    70% { transform: scale(1.6); opacity: 0; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @media (max-width: 720px) {
    .mer-nav-hide { display: none !important; }
    .mer-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .mer-hero { padding: 72px 20px 64px !important; }
    .mer-header-inner { padding: 14px 20px !important; }
    .mer-catalogue { padding: 16px 20px 64px !important; }
    .mer-index-section { padding: 32px 20px 4px !important; }
    .mer-manifesto { padding: 56px 20px !important; }
    .mer-footer { padding: 48px 20px 24px !important; }
    .mer-icon-bounce { padding: 6px; margin: -6px; }
    .mer-fab { right: 16px !important; bottom: 16px !important; width: 52px !important; height: 52px !important; }
    .mer-modal { padding: 28px 22px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mer-reveal, .mer-drift-a, .mer-drift-b, .mer-scroll-cue span, .mer-card, .mer-cta::before, .mer-fab-pulse { animation: none !important; transition: none !important; }
    .mer-reveal { opacity: 1 !important; transform: none !important; }
  }
`;

const serif = "'Fraunces', Georgia, serif";
const sans = "'Inter', -apple-system, sans-serif";
const mono = "'IBM Plex Mono', ui-monospace, monospace";

const colors = {
  bg: "#14100F",
  surface: "#1D1815",
  surface2: "#241E1A",
  text: "#EDE6DA",
  muted: "#A99C8D",
  bronze: "#B08A55",
  wine: "#6E2A3A",
  hairline: "rgba(237,230,218,0.14)",
};

const styles = {
  page: {
    background: colors.bg,
    color: colors.text,
    fontFamily: sans,
    minHeight: "100vh",
    fontWeight: 400,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(20,16,15,0.7)",
    backdropFilter: "blur(6px)",
    borderBottom: `1px solid ${colors.hairline}`,
    transition: "background 0.3s ease, padding 0.3s ease",
  },
  headerScrolled: {
    background: "rgba(20,16,15,0.92)",
  },
  headerInner: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "18px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontFamily: serif,
    fontSize: 16,
    letterSpacing: "0.03em",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  nav: { display: "flex", gap: 28 },
  navLink: {
    color: colors.text,
    textDecoration: "none",
    fontSize: 13,
    letterSpacing: "0.04em",
  },
  hero: {
    position: "relative",
    padding: "108px 28px 96px",
    borderBottom: `1px solid ${colors.hairline}`,
    overflow: "hidden",
  },
  heroGrain: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(110,42,58,0.28), transparent 60%)",
    pointerEvents: "none",
  },
  heroGrainB: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 50% 40% at 10% 100%, rgba(176,138,85,0.14), transparent 60%)",
    pointerEvents: "none",
  },
  heroGlow: {},
  heroInner: { maxWidth: 720, margin: "0 auto", position: "relative", textAlign: "center" },
  heroEyebrow: {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: "0.16em",
    color: colors.bronze,
    marginBottom: 22,
  },
  heroTitle: {
    fontFamily: serif,
    fontWeight: 300,
    fontSize: "clamp(36px, 6vw, 62px)",
    lineHeight: 1.08,
    margin: "0 0 22px",
  },
  heroSub: {
    fontSize: 16,
    lineHeight: 1.6,
    color: colors.muted,
    maxWidth: 480,
    margin: "0 auto 40px",
  },
  heroCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    border: `1px solid ${colors.text}`,
    color: colors.text,
    padding: "13px 24px",
    fontSize: 13,
    letterSpacing: "0.04em",
    cursor: "pointer",
    textDecoration: "none",
  },
  scrollCue: { position: "absolute", inset: "0 0 0 0", pointerEvents: "none" },
  scrollCueLine: {},
  indexSection: { padding: "48px 28px 8px", maxWidth: 1160, margin: "0 auto" },
  sectionEyebrow: {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: "0.14em",
    color: colors.muted,
    marginBottom: 18,
  },
  indexStrip: {
    display: "flex",
    gap: 10,
    overflowX: "auto",
    paddingBottom: 18,
  },
  indexPill: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: colors.surface,
    border: `1px solid ${colors.hairline}`,
    color: colors.muted,
    padding: "10px 16px",
    fontSize: 13,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  indexPillActive: {
    color: colors.text,
    borderColor: colors.bronze,
  },
  indexNum: { fontFamily: mono, fontSize: 11, color: colors.bronze },
  catalogue: { maxWidth: 1160, margin: "0 auto", padding: "24px 28px 96px" },
  catalogueHeadRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    borderBottom: `1px solid ${colors.hairline}`,
    paddingBottom: 18,
    marginBottom: 32,
  },
  catalogueTitle: { fontFamily: serif, fontWeight: 300, fontSize: 30, margin: 0 },
  catalogueCount: { fontFamily: mono, fontSize: 12, color: colors.muted },
  catalogueStatus: { fontSize: 14, color: colors.muted, padding: "24px 0" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 1,
    background: colors.hairline,
    border: `1px solid ${colors.hairline}`,
  },
  card: {
    background: colors.bg,
    border: "1px solid transparent",
    textAlign: "left",
    cursor: "pointer",
    padding: 0,
    display: "block",
    width: "100%",
  },
  cardClickable: { display: "flex", flexDirection: "column", height: "100%" },
  cardSwatch: {
    position: "relative",
    aspectRatio: "1 / 1",
    background: colors.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cardSwatchLines: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "repeating-linear-gradient(115deg, rgba(237,230,218,0.05) 0px, rgba(237,230,218,0.05) 1px, transparent 1px, transparent 14px)",
  },
  cardOverlay: {},
  cardBody: { padding: "16px 18px 20px", display: "block" },
  cardEyebrow: {
    fontFamily: mono,
    fontSize: 10.5,
    letterSpacing: "0.08em",
    color: colors.bronze,
    display: "block",
    margin: "0 0 8px",
    textTransform: "uppercase",
  },
  cardName: {
    fontFamily: serif,
    fontWeight: 400,
    fontSize: 19,
    display: "block",
    margin: "0 0 14px",
  },
  cardFoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTop: `1px solid ${colors.hairline}`,
    paddingTop: 12,
  },
  cardMaterial: { fontSize: 12.5, color: colors.muted },
  cardPrice: { fontFamily: mono, fontSize: 13 },
  manifesto: {
    borderTop: `1px solid ${colors.hairline}`,
    borderBottom: `1px solid ${colors.hairline}`,
    padding: "96px 28px",
    maxWidth: 760,
    margin: "0 auto",
    textAlign: "center",
  },
  manifestoQuote: {
    fontFamily: serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(22px, 3.4vw, 32px)",
    lineHeight: 1.4,
    color: colors.text,
    margin: "0 0 28px",
  },
  manifestoBody: {
    fontSize: 15,
    lineHeight: 1.75,
    color: colors.muted,
    margin: 0,
  },
  footer: { maxWidth: 1160, margin: "0 auto", padding: "72px 28px 32px" },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 0.7fr",
    gap: 40,
    paddingBottom: 40,
    borderBottom: `1px solid ${colors.hairline}`,
  },
  footerText: { fontSize: 13.5, color: colors.muted, lineHeight: 1.6, marginTop: 10, maxWidth: 260 },
  footerHeading: { fontSize: 12, letterSpacing: "0.06em", color: colors.muted, marginBottom: 14 },
  footerForm: { display: "flex", gap: 8 },
  footerInput: {
    background: colors.surface,
    border: `1px solid ${colors.hairline}`,
    color: colors.text,
    padding: "10px 12px",
    fontSize: 13,
    flex: 1,
    outline: "none",
  },
  footerButton: {
    background: "transparent",
    border: `1px solid ${colors.text}`,
    color: colors.text,
    padding: "10px 16px",
    fontSize: 12.5,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  footerIcons: { display: "flex", gap: 14 },
  footerIconLink: { color: colors.text, display: "inline-flex" },
  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 24,
    fontSize: 11.5,
    color: colors.muted,
    flexWrap: "wrap",
    gap: 8,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(10,8,7,0.72)",
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: 20,
  },
  modal: {
    background: colors.surface2,
    border: `1px solid ${colors.hairline}`,
    maxWidth: 420,
    width: "100%",
    padding: "36px 32px",
    position: "relative",
    textAlign: "center",
  },
  modalClose: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "transparent",
    border: "none",
    color: colors.muted,
    cursor: "pointer",
  },
  modalSwatch: {
    position: "relative",
    overflow: "hidden",
    width: 88,
    height: 88,
    margin: "0 auto 20px",
    background: colors.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${colors.hairline}`,
  },
  modalName: { fontFamily: serif, fontSize: 24, fontWeight: 400, margin: "6px 0 8px" },
  modalMaterial: { fontSize: 13.5, color: colors.muted, margin: "0 0 14px" },
  modalPrice: { fontFamily: mono, fontSize: 16, margin: "0 0 24px" },
  sizeBlock: { marginBottom: 24 },
  sizeLabel: {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: colors.muted,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  sizeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  sizePill: {
    minWidth: 40,
    padding: "8px 10px",
    background: "transparent",
    border: `1px solid ${colors.hairline}`,
    color: colors.muted,
    fontSize: 13,
    fontFamily: mono,
    cursor: "pointer",
  },
  sizePillActive: {
    borderColor: colors.bronze,
    color: colors.text,
    background: "rgba(176,138,85,0.12)",
  },
  whatsappFab: {
    position: "fixed",
    right: 22,
    bottom: 22,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#25D366",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    zIndex: 40,
    textDecoration: "none",
  },
  whatsappFabPulse: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: "rgba(37,211,102,0.55)",
  },
};