import React, { useEffect, useState } from "react";
import { ScenePlayer } from "./components/ScenePlayer";
import { SITE, whatsappLink } from "./config";
import { DORES, ETAPAS, FAQ, GARANTIAS, MODULOS } from "./content";

/** Revela elementos `.reveal` quando entram na tela. */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const Logo: React.FC = () => (
  <a href="#topo" className="logo" aria-label={SITE.empresa}>
    <span className="logo-mark" aria-hidden />
    <span>
      Vibe<b>Systems</b>
    </span>
  </a>
);

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Seções">
          <a href="#gargalos">Gargalos</a>
          <a href="#modulos">Módulos</a>
          <a href="#integracao">Integração</a>
          <a href="#metodo">Como trabalhamos</a>
        </nav>
        <a className="btn btn-sm btn-primary" href="#contato">
          Diagnóstico grátis
        </a>
      </div>
    </header>
  );
};

const Hero: React.FC = () => (
  <section className="hero" id="topo">
    <div className="hero-bg" aria-hidden />
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="eyebrow reveal">
          <span className="pulse" /> ERP sob medida para o comércio varejista
        </div>
        <h1 className="reveal">
          Seu varejo tem um gargalo.
          <br />
          <span className="grad">A gente acaba com ele.</span>
        </h1>
        <p className="lead reveal">
          Desenvolvemos ERPs completos para o varejo, da cotação com o fornecedor ao fechamento da folha. É um sistema
          só, desenhado em cima da rotina real da sua loja e ajustado até a dor sumir.
        </p>
        <div className="hero-ctas reveal">
          <a className="btn btn-primary" href="#contato">
            Quero eliminar meu gargalo
            <Arrow />
          </a>
          <a className="btn btn-ghost" href="#modulos">
            Ver os 5 módulos
          </a>
        </div>
        <ul className="hero-proof reveal">
          <li>Multi-filial e multi-CNPJ</li>
          <li>NFC-e e NF-e integradas</li>
          <li>Regras da CLT automáticas</li>
          <li>Auditoria completa</li>
        </ul>
      </div>
      <div className="hero-scene reveal">
        <div className="scene-frame scene-frame-hero">
          <ScenePlayer id="Hero" eager />
        </div>
      </div>
    </div>
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <span key={k}>
            {MODULOS.map((m) => (
              <React.Fragment key={m.id}>
                <b style={{ color: m.cor }}>{m.nome}</b>
                <i>✦</i>
              </React.Fragment>
            ))}
            <b>Tudo integrado</b>
            <i>✦</i>
            <b>Zero redigitação</b>
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Arrow: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Gargalos: React.FC = () => (
  <section className="section" id="gargalos">
    <div className="container">
      <div className="section-head reveal">
        <span className="kicker">Reconhece alguma dessas frases?</span>
        <h2>
          Toda loja tem uma dor que ninguém resolveu.
          <br />
          <span className="muted">A gente resolve.</span>
        </h2>
      </div>
      <div className="pain-grid">
        {DORES.map((d, i) => (
          <article className="pain reveal" key={d.dor} style={{ "--c": d.cor, transitionDelay: `${(i % 4) * 70}ms` } as React.CSSProperties}>
            <p className="pain-dor">
              <span>{d.dor}</span>
            </p>
            <p className="pain-sol">{d.solucao}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Modulos: React.FC = () => (
  <section className="section" id="modulos">
    <div className="container">
      <div className="section-head reveal">
        <span className="kicker">Cinco módulos, um só sistema</span>
        <h2>
          Do fornecedor ao colaborador,
          <br />
          <span className="grad">cada área da loja coberta.</span>
        </h2>
        <div className="mod-tabs">
          {MODULOS.map((m) => (
            <a key={m.id} href={`#${m.id}`} style={{ "--c": m.cor } as React.CSSProperties}>
              <span className="dot" /> {m.nome}
            </a>
          ))}
        </div>
      </div>

      {MODULOS.map((m, idx) => (
        <article className={`mod ${idx % 2 ? "mod-alt" : ""}`} id={m.id} key={m.id} style={{ "--c": m.cor } as React.CSSProperties}>
          <div className="mod-top">
            <div className="mod-copy reveal">
              <div className="mod-num">
                {m.numero} <span>{m.nome}</span>
              </div>
              <h3>{m.titulo}</h3>
              <p className="lead">{m.descricao}</p>
              <div className="mod-dores">
                <span>Some com:</span>
                {m.dores.map((d) => (
                  <em key={d}>{d}</em>
                ))}
              </div>
            </div>
            <div className="mod-scene reveal">
              <div className="scene-frame">
                <ScenePlayer id={m.scene} />
              </div>
            </div>
          </div>
          <ul className="mod-list">
            {m.recursos.map((r, i) => (
              <li className="reveal" key={r} style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                  <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.14" />
                  <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

const Integracao: React.FC = () => (
  <section className="section section-integracao" id="integracao">
    <div className="container">
      <div className="section-head center reveal">
        <span className="kicker">O que muda de verdade</span>
        <h2>
          Não são cinco sistemas.
          <br />
          <span className="grad">É um só, e tudo conversa.</span>
        </h2>
        <p className="lead">
          Quando o caixa bipa uma venda, o estoque baixa, o financeiro registra, a comissão é calculada e a reposição é
          sugerida. Ninguém digita a mesma informação duas vezes.
        </p>
      </div>
      <div className="scene-frame scene-frame-wide reveal">
        <ScenePlayer id="Fluxo" />
      </div>
      <div className="garantias">
        {GARANTIAS.map((g) => (
          <div className="garantia reveal" key={g.t}>
            <h4>{g.t}</h4>
            <p>{g.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Metodo: React.FC = () => (
  <section className="section" id="metodo">
    <div className="container">
      <div className="section-head reveal">
        <span className="kicker">Como trabalhamos</span>
        <h2>
          A gente não vende licença.
          <br />
          <span className="muted">A gente elimina gargalos.</span>
        </h2>
      </div>
      <ol className="steps">
        {ETAPAS.map((e, i) => (
          <li className="step reveal" key={e.t} style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
            <h4>{e.t}</h4>
            <p>{e.d}</p>
          </li>
        ))}
      </ol>
      <div className="faq">
        {FAQ.map((f) => (
          <details className="reveal" key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const Contato: React.FC = () => {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [lojas, setLojas] = useState("1 loja");
  const [areas, setAreas] = useState<string[]>([]);
  const [gargalo, setGargalo] = useState("");

  const toggle = (a: string) => setAreas((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));

  const mensagem = [
    `Olá! Sou ${nome || "—"}, da ${empresa || "—"} (${lojas}).`,
    areas.length ? `Onde mais dói: ${areas.join(", ")}.` : "",
    gargalo ? `Meu gargalo: ${gargalo}` : "",
    "Quero um diagnóstico gratuito.",
  ]
    .filter(Boolean)
    .join("\n");

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappLink(mensagem), "_blank", "noopener");
  };

  return (
    <section className="section" id="contato">
      <div className="container">
        <div className="cta reveal">
          <div className="cta-copy">
            <span className="kicker">Diagnóstico gratuito</span>
            <h2>
              Conte o seu gargalo.
              <br />
              <span className="grad">A gente mostra como ele some.</span>
            </h2>
            <p className="lead">
              Em uma conversa, entendemos sua operação e mostramos onde o sistema elimina retrabalho, perda e
              desperdício. Sem compromisso.
            </p>
            <ul className="cta-points">
              <li>Análise da sua rotina de compras, balcão, estoque, financeiro e RH</li>
              <li>Data da virada definida junto com você</li>
              <li>Resposta direto no seu WhatsApp</li>
            </ul>
          </div>
          <form className="form" onSubmit={enviar}>
            <label>
              Seu nome
              <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como podemos te chamar?" required />
            </label>
            <label>
              Empresa
              <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Nome da loja ou rede" required />
            </label>
            <label>
              Quantas lojas?
              <select value={lojas} onChange={(e) => setLojas(e.target.value)}>
                <option>1 loja</option>
                <option>2 a 5 lojas</option>
                <option>6 a 15 lojas</option>
                <option>mais de 15 lojas</option>
              </select>
            </label>
            <fieldset>
              <legend>Onde mais dói hoje?</legend>
              <div className="chips">
                {MODULOS.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    className={areas.includes(m.nome) ? "on" : ""}
                    style={{ "--c": m.cor } as React.CSSProperties}
                    onClick={() => toggle(m.nome)}
                    aria-pressed={areas.includes(m.nome)}
                  >
                    {m.nome}
                  </button>
                ))}
              </div>
            </fieldset>
            <label>
              Descreva o gargalo
              <textarea
                value={gargalo}
                onChange={(e) => setGargalo(e.target.value)}
                rows={3}
                placeholder="Ex.: o caixa nunca bate no fim do dia e não sei onde está a diferença."
              />
            </label>
            <button className="btn btn-primary btn-block" type="submit">
              Quero meu diagnóstico gratuito <Arrow />
            </button>
            <p className="form-note">
              Prefere e-mail? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <Logo />
      <p>ERP para o comércio varejista: Compras, PDV, Estoque, Financeiro e RH.</p>
      <p className="muted">
        © {new Date().getFullYear()} {SITE.empresa}. Animações feitas com Remotion.
      </p>
    </div>
  </footer>
);

export const App: React.FC = () => {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Gargalos />
        <Modulos />
        <Integracao />
        <Metodo />
        <Contato />
      </main>
      <Footer />
    </>
  );
};
