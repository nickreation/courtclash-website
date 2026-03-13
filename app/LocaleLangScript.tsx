/** Définit lang sur <html> dès le chargement (avant paint) selon l’URL pour le SEO et l’accessibilité */
export function LocaleLangScript() {
  const script = `
    (function() {
      var seg = (typeof window !== 'undefined' && window.location.pathname.split('/')[1]) || '';
      var supported = ['fr', 'en', 'it', 'de', 'es', 'pt'].indexOf(seg) >= 0;
      document.documentElement.lang = supported ? seg : 'fr';
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
