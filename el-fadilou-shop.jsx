import React, { useState, useEffect } from "react";
import {
  Shirt,
  Gem,
  FlaskConical,
  Watch,
  Footprints,
  Glasses,
  ArrowUpRight,
  X,
  Mail,
  Instagram,
} from "lucide-react";

const DEPARTMENTS = [
  { id: "vetements", num: "01", label: "Vêtements", tagline: "Coupes nettes, matières rares.", Icon: Shirt },
  { id: "accessoires", num: "02", label: "Accessoires", tagline: "Le détail qui signe l'ensemble.", Icon: Gem },
  { id: "parfums", num: "03", label: "Parfums", tagline: "Une odeur, une mémoire.", Icon: FlaskConical },
  { id: "montres", num: "04", label: "Montres", tagline: "Le temps, mesuré avec soin.", Icon: Watch },
  { id: "chaussures", num: "05", label: "Chaussures", tagline: "Chaque pas, une allure.", Icon: Footprints },
  { id: "lunettes", num: "06", label: "Lunettes", tagline: "Voir, et être vu.", Icon: Glasses },
];

const PRODUCTS = [
  { id: 1, dept: "vetements", name: "Manteau Ellipse", material: "Laine vierge", price: "890 €" },
  { id: 2, dept: "vetements", name: "Chemise Solstice", material: "Popeline de coton", price: "210 €" },
  { id: 3, dept: "vetements", name: "Robe Éclat", material: "Soie lavée", price: "640 €" },

  { id: 4, dept: "accessoires", name: "Ceinture Facette", material: "Cuir pleine fleur", price: "180 €" },
  { id: 5, dept: "accessoires", name: "Foulard Ondine", material: "Twill de soie", price: "220 €" },
  { id: 6, dept: "accessoires", name: "Boutons Arête", material: "Laiton brossé", price: "140 €" },

  { id: 7, dept: "parfums", name: "Eau Nocturne", material: "50 ml, extrait de parfum", price: "165 €" },
  { id: 8, dept: "parfums", name: "Ambre Sillage", material: "100 ml, eau de parfum", price: "210 €" },
  { id: 9, dept: "parfums", name: "Fleur de Minuit", material: "50 ml, eau de parfum", price: "175 €" },

  { id: 10, dept: "montres", name: "Montre Arc", material: "Boîtier acier, 38 mm", price: "1 450 €" },
  { id: 11, dept: "montres", name: "Montre Trajectoire", material: "Bracelet cuir cousu main", price: "980 €" },
  { id: 12, dept: "montres", name: "Montre Éclipse", material: "Cadran onyx", price: "2 100 €" },

  { id: 13, dept: "chaussures", name: "Derby Cadence", material: "Cuir box calf", price: "390 €" },
  { id: 14, dept: "chaussures", name: "Mocassin Lisière", material: "Veau velours", price: "340 €" },
  { id: 15, dept: "chaussures", name: "Bottine Traverse", material: "Cuir ciré", price: "420 €" },

  { id: 16, dept: "lunettes", name: "Lunettes Horizon", material: "Acétate écaille", price: "260 €" },
  { id: 17, dept: "lunettes", name: "Solaire Fadilou", material: "Verres teintés G-15", price: "290 €" },
  { id: 18, dept: "lunettes", name: "Lunettes Fil", material: "Monture titane", price: "310 €" },
];

function deptOf(id) {
  return DEPARTMENTS.find((d) => d.id === id);
}

export default function MeridienBoutique() {
  const [active, setActive] = useState("tous");
  const [selected, setSelected] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const visible = active === "tous" ? PRODUCTS : PRODUCTS.filter((p) => p.dept === active);

  const scrollToCatalogue = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.logo}>NDACK FALILOU SHOP</span>
          <nav style={styles.nav} className="mer-nav-hide">
            <a href="#catalogue" style={styles.navLink} className="mer-link">Catalogue</a>
            <a href="#maison" style={styles.navLink} className="mer-link">La Maison</a>
            <a href="#contact" style={styles.navLink} className="mer-link">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroGrain} />
        <div style={styles.heroInner}>
          <p style={styles.heroEyebrow}>EL FADILOU SHOP — OUEST-FOIRE, DAKAR</p>
          <h1 style={styles.heroTitle}>
            L'élégance se&nbsp;mesure<br />au détail.
          </h1>
          <p style={styles.heroSub}>
            Vêtements, accessoires, parfums, montres, chaussures et lunettes —
            une collection pensée comme une seule silhouette.
          </p>
          <button onClick={scrollToCatalogue} style={styles.heroCta} className="mer-cta">
            Parcourir le catalogue <ArrowUpRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* DEPARTMENT INDEX */}
      <section style={styles.indexSection}>
        <p style={styles.sectionEyebrow}>Répertoire des départements</p>
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
                <IconEl size={16} strokeWidth={1.4} />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" style={styles.catalogue}>
        <div style={styles.catalogueHeadRow}>
          <h2 style={styles.catalogueTitle}>
            {active === "tous" ? "Le catalogue" : deptOf(active)?.label}
          </h2>
          <span style={styles.catalogueCount}>
            {String(visible.length).padStart(2, "0")} pièce{visible.length > 1 ? "s" : ""}
          </span>
        </div>

        <div style={styles.grid}>
          {visible.map((p) => {
            const d = deptOf(p.dept);
            const IconEl = d.Icon;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                style={styles.card}
                className="mer-card"
              >
                <div style={styles.cardSwatch}>
                  <div style={styles.cardSwatchLines} />
                  <IconEl size={30} strokeWidth={1} color="rgba(237,230,218,0.55)" />
                </div>
                <div style={styles.cardBody}>
                  <p style={styles.cardEyebrow}>{d.num} · {d.label}</p>
                  <h3 style={styles.cardName}>{p.name}</h3>
                  <div style={styles.cardFoot}>
                    <span style={styles.cardMaterial}>{p.material}</span>
                    <span style={styles.cardPrice}>{p.price}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="maison" style={styles.manifesto}>
        <p style={styles.manifestoQuote}>
          « Nous ne vendons pas des objets.<br />Nous composons une allure. »
        </p>
        <p style={styles.manifestoBody}>
          Basée à Ouest-Foire, à Dakar, El Fadilou Shop réunit six
          départements sous une seule discipline : celle du détail juste.
          Chaque pièce — un tissu, un mécanisme, une essence — est choisie
          pour tenir sa place dans une silhouette plus vaste que l'objet
          lui-même.
        </p>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <p style={styles.logo}>EL FADILOU SHOP</p>
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
              />
              <button type="submit" style={styles.footerButton} className="mer-cta-outline" disabled={subscribed}>
                {subscribed ? "Merci" : "S'inscrire"}
              </button>
            </form>
          </div>

          <div>
            <p style={styles.footerHeading}>Nous suivre</p>
            <div style={styles.footerIcons}>
              <a href="#" aria-label="Instagram" style={styles.footerIconLink} className="mer-link">
                <Instagram size={18} strokeWidth={1.4} />
              </a>
              <a href="mailto:contact@elfadilou-shop.com" aria-label="Email" style={styles.footerIconLink} className="mer-link">
                <Mail size={18} strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© {new Date().getFullYear()} El Fadilou Shop</span>
          <span>Vitrine de démonstration — sans paiement en ligne</span>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={styles.modalClose} aria-label="Fermer">
              <X size={18} strokeWidth={1.5} />
            </button>
            <div style={styles.modalSwatch}>
              {(() => {
                const IconEl = deptOf(selected.dept).Icon;
                return <IconEl size={46} strokeWidth={0.9} color="rgba(237,230,218,0.6)" />;
              })()}
            </div>
            <p style={styles.cardEyebrow}>
              {deptOf(selected.dept).num} · {deptOf(selected.dept).label}
            </p>
            <h3 style={styles.modalName}>{selected.name}</h3>
            <p style={styles.modalMaterial}>{selected.material}</p>
            <p style={styles.modalPrice}>{selected.price}</p>
            <a
              href={`mailto:contact@elfadilou-shop.com?subject=${encodeURIComponent(
                "Demande — " + selected.name
              )}`}
              style={styles.heroCta}
              className="mer-cta"
            >
              Nous contacter pour cette pièce <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; }

  .mer-link { transition: opacity 0.2s ease; opacity: 0.75; }
  .mer-link:hover { opacity: 1; }

  .mer-cta { transition: background 0.25s ease, color 0.25s ease, border-color .25s ease; }
  .mer-cta:hover { background: #EDE6DA !important; color: #14100F !important; }

  .mer-cta-outline:hover { border-color: #EDE6DA !important; color: #EDE6DA !important; }

  .mer-pill { transition: border-color 0.2s ease, color 0.2s ease; }
  .mer-pill:hover { border-color: rgba(237,230,218,0.5) !important; }

  .mer-card { transition: transform 0.25s ease, border-color 0.25s ease; }
  .mer-card:hover { transform: translateY(-3px); border-color: rgba(176,138,85,0.55) !important; }
  .mer-card:hover .mer-card-name { color: #B08A55; }

  .mer-scrollbar::-webkit-scrollbar { height: 4px; }
  .mer-scrollbar::-webkit-scrollbar-thumb { background: rgba(237,230,218,0.2); }

  a, button { font-family: inherit; }

  @media (max-width: 720px) {
    .mer-nav-hide { display: none !important; }
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
    background: "rgba(20,16,15,0.85)",
    backdropFilter: "blur(6px)",
    borderBottom: `1px solid ${colors.hairline}`,
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
    fontSize: 18,
    letterSpacing: "0.06em",
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
      "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(110,42,58,0.28), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(176,138,85,0.14), transparent 60%)",
    pointerEvents: "none",
  },
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
    display: "flex",
    flexDirection: "column",
  },
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
  cardBody: { padding: "16px 18px 20px" },
  cardEyebrow: {
    fontFamily: mono,
    fontSize: 10.5,
    letterSpacing: "0.08em",
    color: colors.bronze,
    margin: "0 0 8px",
    textTransform: "uppercase",
  },
  cardName: {
    fontFamily: serif,
    fontWeight: 400,
    fontSize: 19,
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
};
