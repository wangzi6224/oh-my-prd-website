export function HeroLogoReveal() {
  return (
    <section className="cinematic-logo-hero" aria-label="Oh My PRD">
      <div className="cinematic-logo-hero__halo" aria-hidden="true" />
      <div className="cinematic-logo-hero__mark" aria-hidden="true">
        <span>Oh</span>
        <span>My</span>
        <span>PRD</span>
      </div>
      <span className="cinematic-logo-hero__plain" aria-hidden="true">
        Requirement Intelligence System
      </span>
    </section>
  );
}
