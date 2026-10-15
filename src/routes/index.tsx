import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Leaf, Music2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import garden from "@/assets/parque.jpg";
import flowers from "@/assets/playa.jpg";
import friends from "@/assets/restaurant.jpg";
import sea from "@/assets/paseo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Para ti, con mucho cariño · Feliz cumpleaños" },
    { name: "description", content: "Una celebración del 16 de octubre entre flores, recuerdos, música y palabras desde el corazón." },
    { property: "og:title", content: "Para ti, con mucho cariño · Feliz cumpleaños" },
    { property: "og:description", content: "Un pequeño jardín de recuerdos para celebrar tu vida este 16 de octubre." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BirthdayPage,
});

const moments = [
  { src: flowers, title: "Tu forma de iluminarlo todo", caption: "Brillas como un atardecer.", note: "Que la vida te siga regalando horizontes, atardeceres y lugares en los que puedas ser tú." },
  { src: friends, title: "Las risas que se quedan", caption: "Los pequeños grandes momentos.", note: "Por esas conversaciones sin prisa y esas risas que todavía nos acompañan." },
  { src: sea, title: "Por esas platicas donde olvidamos el tiempo", caption: "Por mas experiencias compartidas.", note: "Hay sonrisas que hacen de cualquier día un lugar bonito.La tuya es una de ellas." },
];
const navigation = [{ id: "inicio", label: "Inicio" }, { id: "tu-dia", label: "Tu día" }, { id: "recuerdos", label: "Recuerdos" }, { id: "Para-ti", label: "Para ti" }, { id: "musica", label: "Música" }];

function BotanicalSprig({ className = "" }: { className?: string }) {
  return <svg className={`botanical-sprig ${className}`} viewBox="0 0 100 180" fill="none" aria-hidden="true"><path d="M48 173C43 122 67 75 63 10"/><path d="M52 142C20 142 12 126 17 109C36 109 49 120 52 142ZM55 118C82 117 94 98 84 83C65 90 57 101 55 118ZM57 93C33 91 23 75 28 61C47 63 56 79 57 93ZM62 68C81 62 89 48 80 34C66 42 61 54 62 68ZM62 43C48 32 48 18 58 8C68 18 68 32 62 43Z"/></svg>;
}

function BirthdayPage() {
  const [active, setActive] = useState("inicio");
  const [selected, setSelected] = useState<number | null>(null);
  const [wish, setWish] = useState(false);
  const [spotify, setSpotify] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-20% 0px -55% 0px" });
    navigation.forEach(item => { const section = document.getElementById(item.id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); };
  const moment = selected === null ? null : moments[selected];

  return <main>
    <header className="floating-header">
      <a className="wordmark" href="#inicio" onClick={e => { e.preventDefault(); go("inicio"); }}><Leaf size={20} strokeWidth={1.4}/><span>Verónica<span className="wordmark-dot">.</span></span></a>
      <nav aria-label="Navegación principal">{navigation.map(item => <Button key={item.id} variant="navigation" onClick={() => go(item.id)} aria-current={active === item.id ? "location" : undefined}>{item.label}</Button>)}</nav>
      <Heart className="nav-heart" size={18} strokeWidth={1.4}/>
    </header>

    <section className="birthday-cover" id="inicio">
      <img className="cover-photo" src={garden} alt="Un paseo entre flores blancas en un jardín lleno de luz" width={1920} height={1024}/>
      <div className="cover-shade"/>
      <div className="cover-content"><p className="eyebrow cover-eyebrow"><span/>16 DE OCTUBRE · UN DÍA MUY ESPECIAL</p><h1>Feliz<br/><em>cumpleaños.</em></h1><p className="cover-message">Hay personas que hacen la vida más bonita.<br/>Y tú eres una de ellas.</p><Button variant="botanical" onClick={() => go("tu-dia")}>UN REGALO PARA TI<ArrowDown size={16}/></Button><p className="cover-signature">Hecho con mucho cariño</p></div>
      <span className="cover-index">"no es una simple rosa, es el tiempo lo que lo hace especial".</span>
      <Button variant="navigation" size="icon" className="scroll-cue" aria-label="Ir a tu día" onClick={() => go("tu-dia")}><ArrowDown size={18}/></Button>
    </section>

    <section className="day-section section-wrap" id="tu-dia">
      <div className="day-copy"><p className="eyebrow">NO ES UN DÍA CUALQUIERA</p><h2>El mundo es más bonito<br/>desde que <em>estás en él.</em></h2><p>Hay muchas fechas importantes.<br/>El 16 de octubre es una de ellas.</p><div className="small-dedication"><span className="fine-line"/><span>Presiona la fecha.</span><Leaf size={19} strokeWidth={1}/></div></div>
      <div className="calendar" aria-label="Calendario de octubre de 2026, cumpleaños el día 16"><BotanicalSprig className="calendar-sprig"/><div className="calendar-heading"><h3>Octubre</h3><span>2026</span></div><div className="calendar-grid">{["L", "M", "M", "J", "V", "S", "D"].map((day, i) => <span className="weekday" key={`w${i}`}>{day}</span>)}{Array.from({ length: 3 }, (_, i) => <span key={`blank${i}`}/>)}{Array.from({ length: 31 }, (_, i) => i + 1).map(day => day === 16 ? <Button key={day} variant="navigation" className="birthday-date" aria-label="16 de octubre: pide un deseo" onClick={() => setWish(true)}>16<Leaf className="date-leaf" size={16}/></Button> : <span key={day}>{day}</span>)}</div><div className="calendar-footer"><Heart size={13}/><span>El día que la vida nos dio un regalo</span></div></div>
    </section>

    <section className="memories-section" id="recuerdos"><div className="section-wrap memories-inner"><div className="section-heading"><p className="eyebrow">INSTANTES QUE PASAN</p><h2>Momentos <em>contigo.</em></h2><p>No fueron años, fueron meses. Y ahí entiendes que no es el tiempo, es la persona.</p></div><div className="polaroid-grid">{moments.map((photo, i) => <Button key={photo.src} variant="photo" className={`polaroid polaroid-${i}`} onClick={() => setSelected(i)} aria-label={`Ver recuerdo: ${photo.title}`}><span className="photo-tape"/><img src={photo.src} alt={photo.title} width={768} height={1024} loading="lazy"/><span className="polaroid-caption">{photo.caption}</span><span className="polaroid-number">0{i + 1} <Heart size={12}/></span></Button>)}</div><div className="gallery-end"><span/><Leaf size={19} strokeWidth={1.2}/><span/></div></div></section>

    <section className="letter-section section-wrap" id="para-ti"><div className="section-heading"><p className="eyebrow">UNAS PALABRAS</p><h2>Desde el corazón <em>para ti.</em></h2></div><article className="letter-paper"><BotanicalSprig className="letter-sprig-top"/><BotanicalSprig className="letter-sprig-bottom"/><Heart className="letter-heart" size={22} strokeWidth={1}/><h3>Para la persona mas especial en su dia:</h3><p>Hoy no es solo un "feliz cumpleaños"; hoy se celebra el día en el que viniste a este mundo y el regalo gigante que es haberte conocido.</p><p>Quiero recordarte lo especial que eres, lo mucho que iluminas la vida y lo bonito que es verte ser tu. Gracias por tu sonrisa, por esas pequeñas cosas que haces sin darte cuenta y cambian el día.</p><p>Te deseo lo mejor de este universo y muchísimo éxito en todo lo que te propongas. Nunca olvides que lo estás haciendo bien. Sé que hay días en los que el cuerpo pesa y la mente abruma, pero aun así sigues adelante... y esa valentía es una de las cosas que más admiro de ti.</p><p>No olvides jamás ser amable contigo misma, recuerda que no tienes que ser perfecta para ser maravillosa. Elige siempre lo que te dé paz y lo que te haga bien... elige siempre lo mejor para ti, mejores amigos, mejores rutinas, gente que sume y no reste, porque cuidar tu entorno también es una manera de demostrarte amor.</p><p>Que este nuevo año de tu vida te de muchos sueños por cumplir, momentos que se queden para siempre y miles de motivos para sonreír. Tu no eres un día cualquiera eres esa persona que hace especial los momentos sencillos.</p><p>Si la vida fuese un libro subrayaría justo el momento donde nos conocimos y nos volvimos a encontrar.</p><p className="letter-last">Espero seguir escribiendo historias contigo<br/>de aquí hasta mil años más.</p><div className="letter-signature">Con mucho cariño<span>Miguel </span></div></article></section>

    <section className="music-section" id="musica"><div className="section-wrap music-inner"><div className="music-copy"><p className="eyebrow">UNA CANCION PARA TU CUMPLEAÑOS</p><h2>Hay canciones<br/>que <em>me recuerdan a ti.</em></h2><p>Un poquito de música, un montón de cariño.<br/>Dale play y deja que este día suene bonito.</p><span className="music-note"><Music2 size={16}/> Para escuchar en tu cumpleaños</span></div><div className="spotify-container">{spotify ? <iframe title="Reproductor de Spotify: una canción para ti" src="https://open.spotify.com/embed/track/2VhJ4nrPorAbySEgO4V0BS?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/> : <div className="spotify-preview"><div className="record-art"><BotanicalSprig/><span>para ti,<br/><em> una canción.</em></span></div><div className="spotify-preview-info"><span className="spotify-brand"><Music2 size={16}/> Spotify</span><h3>El sonido de un día bonito</h3><p>Una canción para acompañarte</p><Button variant="botanical" onClick={() => setSpotify(true)}><Music2 size={15}/> Abrir reproductor</Button></div></div>}</div></div></section>
    <footer className="birthday-footer"><Leaf size={25} strokeWidth={1}/><p>Que la vida siempre te encuentre <em>floreciendo.</em></p><span>16 DE OCTUBRE · DE MIGUEL PARA VERONICA</span><Heart size={14} strokeWidth={1.2}/></footer>

    <Dialog open={moment !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="memory-dialog"><DialogTitle>{moment?.title}</DialogTitle><DialogDescription>{moment?.note}</DialogDescription>{moment && <img src={moment.src} alt={moment.title} width={768} height={1024}/>}<div className="memory-controls"><Button variant="ghost" size="icon" aria-label="Recuerdo anterior" onClick={() => setSelected(previous => ((previous ?? 0) + moments.length - 1) % moments.length)}><ArrowLeft/></Button><span>{(selected ?? 0) + 1} / {moments.length}</span><Button variant="ghost" size="icon" aria-label="Siguiente recuerdo" onClick={() => setSelected(previous => ((previous ?? 0) + 1) % moments.length)}><ArrowRight/></Button></div></DialogContent></Dialog>
    <Dialog open={wish} onOpenChange={setWish}><DialogContent className="wish-dialog"><Sparkles size={32}/><DialogTitle>Cierra los ojos y pide un deseo.</DialogTitle><DialogDescription>Que todo eso que te hace ilusión encuentre su camino hacia ti. Feliz 24 vueltas al sol, con todo el corazón.</DialogDescription><Button variant="botanical" onClick={() => setWish(false)}>Que así sea <Heart size={15}/></Button></DialogContent></Dialog>
  </main>;
}
