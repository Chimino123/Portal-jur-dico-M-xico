const sources = [
  { title: "Constitución y leyes federales", category: "Federal", official: true, url: "https://www.diputados.gob.mx/LeyesBiblio/index.htm", description: "Consulta la Constitución, leyes federales vigentes, reglamentos y sus referencias de reforma.", tags: "constitucion cpeum leyes federales codigos reforma diputados" },
  { title: "Diario Oficial de la Federación", category: "Federal", official: true, url: "https://www.dof.gob.mx/", description: "Publicaciones oficiales federales: decretos, acuerdos, normas y avisos. Útil para verificar publicación y fecha.", tags: "dof diario oficial reforma decreto acuerdos normas" },
  { title: "Orden Jurídico Nacional", category: "Federal", official: true, url: "https://www.ordenjuridico.gob.mx/", description: "Compendio de ordenamientos federales, estatales e internacionales para consulta temática.", tags: "orden juridico leyes reglamentos tratados federal estatal" },
  { title: "Semanario Judicial de la Federación", category: "Jurisprudencia", official: true, url: "https://sjf.scjn.gob.mx/SJFHome/Index.html", description: "Busca tesis, jurisprudencias y ejecutorias por tema, rubro, registro digital u órgano.", tags: "scjn corte jurisprudencia tesis ejecutorias amparo semanario judicial" },
  { title: "Buscador Jurídico SCJN", category: "Jurisprudencia", official: true, url: "https://bj.scjn.gob.mx/", description: "Acceso integral a sentencias, tesis, votos, ordenamientos y acervo de la Suprema Corte.", tags: "scjn sentencias tesis jurisprudencia votos acuerdos buscador" },
  { title: "Consejo de la Judicatura Federal", category: "Jurisprudencia", official: true, url: "https://www.cjf.gob.mx/", description: "Información y servicios del Poder Judicial de la Federación, incluidos órganos jurisdiccionales.", tags: "cjf juzgados tribunales federales expedientes poder judicial" },
  { title: "IUS Electoral", category: "Jurisprudencia", official: true, url: "https://sicje.te.gob.mx/IUSE/", description: "Sistema oficial del TEPJF para consultar jurisprudencia y tesis en materia electoral.", tags: "electoral tepJF ius jurisprudencia tesis elecciones" },
  { title: "Tratados internacionales", category: "Federal", official: true, url: "https://aplicaciones.sre.gob.mx/tratados/", description: "Consulta de tratados celebrados por México y su información de publicación y vigencia.", tags: "tratados internacionales convenciones derechos humanos sre" },
  { title: "CNDH", category: "Federal", official: true, url: "https://www.cndh.org.mx/", description: "Recursos, informes, recomendaciones y materiales de consulta sobre derechos humanos.", tags: "cndh derechos humanos recomendaciones informes victimas" },
  { title: "Leyes y reglamentos de Guerrero", category: "Guerrero", official: true, url: "https://www.guerrero.gob.mx/leyes-y-reglamentos/", description: "Edición electrónica de la legislación estatal. Verifica siempre la publicación en el Periódico Oficial.", tags: "guerrero leyes reglamentos codigo civil penal estado" },
  { title: "Periódico Oficial de Guerrero", category: "Guerrero", official: true, url: "https://periodicooficial.guerrero.gob.mx/", description: "Fuente de publicación oficial del Estado de Guerrero; consulta ediciones y documentos publicados.", tags: "guerrero periodico oficial decretos publicaciones vigencia" },
  { title: "Congreso del Estado de Guerrero", category: "Guerrero", official: true, url: "https://congresogro.gob.mx/", description: "Actividad legislativa estatal, iniciativas, decretos, sesiones y composición del Congreso.", tags: "guerrero congreso iniciativas decretos legislativo" },
  { title: "Poder Judicial de Guerrero", category: "Guerrero", official: true, url: "https://www.poderjudicial-gro.gob.mx/", description: "Portal del Poder Judicial estatal: información institucional, acuerdos y servicios de consulta.", tags: "guerrero tribunal superior justicia poder judicial sentencias acuerdos" },
  { title: "Biblioteca Jurídica Virtual UNAM", category: "Académica", official: false, url: "https://biblio.juridicas.unam.mx/", description: "Libros, revistas y materiales académicos del Instituto de Investigaciones Jurídicas; revisa condiciones de acceso y uso.", tags: "unam libros revistas articulos biblioteca investigacion juridica" },
  { title: "Repositorio RU Jurídicas", category: "Académica", official: false, url: "https://ru.juridicas.unam.mx/", description: "Repositorio académico abierto con publicaciones y materiales generados por el IIJ-UNAM.", tags: "unam repositorio libros articulos investigacion acceso abierto" },
  { title: "Biblioteca del Congreso", category: "Académica", official: true, url: "https://www.diputados.gob.mx/sedia/biblio/biblio.htm", description: "Recursos y servicios documentales de la Cámara de Diputados para apoyar la investigación legislativa.", tags: "biblioteca congreso camara diputados libros investigacion legislativa" },
  { title: "Noticias jurídicas: SCJN", category: "Noticias", official: true, url: "https://www.scjn.gob.mx/", description: "Comunicados y novedades directamente de la Suprema Corte. Distingue siempre noticia de criterio obligatorio.", tags: "noticias scjn comunicados resoluciones corte" },
  { title: "Noticias jurídicas: DOF", category: "Noticias", official: true, url: "https://www.dof.gob.mx/", description: "Consulta las ediciones recientes y publicaciones oficiales federales del día.", tags: "noticias dof publicaciones diario oficial federal" }
];

const grid = document.querySelector('#sourceGrid');
const template = document.querySelector('#sourceTemplate');
const search = document.querySelector('#searchInput');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#emptyState');
const toast = document.querySelector('#toast');
let activeFilter = 'Todas';
let favorites = JSON.parse(localStorage.getItem('brujula-favoritas') || '[]');

function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2400); }
function saveFavorites() { localStorage.setItem('brujula-favoritas', JSON.stringify(favorites)); }
function render() {
  const query = search.value.trim().toLocaleLowerCase('es-MX');
  const list = sources.filter((source) => {
    const matchesFilter = activeFilter === 'Todas' || (activeFilter === 'Favoritas' ? favorites.includes(source.url) : source.category === activeFilter);
    const haystack = `${source.title} ${source.category} ${source.description} ${source.tags}`.toLocaleLowerCase('es-MX');
    return matchesFilter && haystack.includes(query);
  });
  grid.replaceChildren();
  list.forEach((source) => {
    const card = template.content.cloneNode(true);
    const favorite = card.querySelector('.favorite');
    const saved = favorites.includes(source.url);
    card.querySelector('.tag').textContent = source.category;
    card.querySelector('h3').textContent = source.title;
    card.querySelector('p').textContent = source.description;
    card.querySelector('.official-badge').textContent = source.official ? '● Fuente oficial' : '◇ Fuente académica / secundaria';
    const visit = card.querySelector('.visit-link'); visit.href = source.url; visit.setAttribute('aria-label', `Abrir ${source.title} en una nueva pestaña`);
    favorite.textContent = saved ? '★' : '☆'; favorite.setAttribute('aria-pressed', saved); favorite.title = saved ? 'Quitar de favoritas' : 'Guardar en favoritas';
    favorite.addEventListener('click', () => { favorites = saved ? favorites.filter((url) => url !== source.url) : [...favorites, source.url]; saveFavorites(); render(); showToast(saved ? 'Se quitó de favoritas.' : 'Guardada en favoritas en este navegador.'); });
    card.querySelector('.copy-link').addEventListener('click', async () => { try { await navigator.clipboard.writeText(source.url); showToast('Enlace copiado.'); } catch { showToast('Copia este enlace: ' + source.url); } });
    grid.append(card);
  });
  count.textContent = `${list.length} ${list.length === 1 ? 'fuente encontrada' : 'fuentes encontradas'}`;
  empty.hidden = list.length !== 0;
}
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button)); render(); }));
search.addEventListener('input', render);
render();
