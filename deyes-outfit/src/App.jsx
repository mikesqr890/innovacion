
import { useState } from "react";
import "./App.css";

const outfits = [
  {
    id: 1,
    name: "Elegancia natural",
    description: "Un look sofisticado y cómodo para una cena especial.",
    price: 189800,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700",
    top: "Blusa asimétrica negra",
    bottom: "Pantalón sastre beige",
    shoes: "Tacones clásicos",
    color: "Negro / Beige",
    items: [
      { name: "Blusa asimétrica", price: 89900 },
      { name: "Pantalón sastre", price: 79900 },
      { name: "Tacones clásicos", price: 20000 },
    ],
  },
  {
    id: 2,
    name: "Toque sofisticado",
    description: "Una combinación delicada con tonos vino y neutros.",
    price: 219800,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
    top: "Blusa color vino",
    bottom: "Pantalón de vestir",
    shoes: "Sandalias elegantes",
    color: "Vino / Marfil",
    items: [
      { name: "Blusa color vino", price: 89900 },
      { name: "Pantalón de vestir", price: 89900 },
      { name: "Sandalias elegantes", price: 40000 },
    ],
  },
  {
    id: 3,
    name: "Clásico moderno",
    description: "Un outfit versátil, moderno y perfecto para destacar.",
    price: 199800,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700",
    top: "Top negro elegante",
    bottom: "Pantalón negro",
    shoes: "Tacones negros",
    color: "Negro",
    items: [
      { name: "Top negro", price: 79900 },
      { name: "Pantalón negro", price: 89900 },
      { name: "Tacones negros", price: 30000 },
    ],
  },
];

const steps = [
  { number: 1, title: "Asesoría", subtitle: "Cuéntanos qué buscas" },
  { number: 2, title: "Propuestas", subtitle: "Encuentra tu estilo" },
  { number: 3, title: "Tu outfit", subtitle: "Conoce los detalles" },
  { number: 4, title: "Preparado", subtitle: "Te esperamos" },
];

const money = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

function App() {
  const [step, setStep] = useState(1);
  const [selectedOutfit, setSelectedOutfit] = useState(outfits[0]);
  const [messages, setMessages] = useState([
    {
      from: "store",
      text: "¡Hola! Bienvenida a De’yes. 💗 Estamos aquí para ayudarte a encontrar tu outfit ideal.",
    },
    {
      from: "store",
      text: "Cuéntanos, ¿para qué ocasión necesitas tu outfit?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [occasion, setOccasion] = useState("Cena especial");
  const [style, setStyle] = useState("Elegante");
  const [reservationName, setReservationName] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationSize, setReservationSize] = useState("M");
  const [reserved, setReserved] = useState(false);

  const sendMessage = (text = message) => {
    if (!text.trim()) return;

    setMessages((previous) => [
      ...previous,
      { from: "client", text },
      {
        from: "store",
        text: "¡Perfecto! 💗 Vamos a encontrar las mejores opciones para ti. Ya tenemos algunas propuestas preparadas.",
      },
    ]);

    setMessage("");
  };

  const selectOutfit = (outfit) => {
    setSelectedOutfit(outfit);
    setStep(3);
  };

  const reserveOutfit = () => {
    if (!reservationName.trim() || !reservationDate) {
      alert("Por favor, completa tu nombre y la fecha de visita.");
      return;
    }

    setReserved(true);
    setStep(4);
  };

  const resetPrototype = () => {
    setStep(1);
    setReserved(false);
    setReservationName("");
    setReservationDate("");
    setReservationSize("M");
    setSelectedOutfit(outfits[0]);
    setMessages([
      {
        from: "store",
        text: "¡Hola! Bienvenida a De’yes. 💗 Estamos aquí para ayudarte a encontrar tu outfit ideal.",
      },
      {
        from: "store",
        text: "Cuéntanos, ¿para qué ocasión necesitas tu outfit?",
      },
    ]);
  };

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#" onClick={resetPrototype}>
          <span className="brand-name">De’yes</span>
          <span className="brand-caption">MODA QUE TE COMPLETA</span>
        </a>

        <div className="header-divider"></div>

        <div className="header-center">
          <h1>Cápsula de Outfit</h1>
          <span>Tu asesora de moda, en un solo lugar</span>
        </div>

        <div className="header-divider right-divider"></div>

        <p className="header-message">
          Planea, visualiza y completa
          <br />
          tu look perfecto. <span>♡</span>
        </p>
      </header>

      <main className="main-container">
        <div className="intro">
          <div>
            <span className="eyebrow">BIENVENIDA A DE’YES</span>
            <h2>Encuentra el outfit perfecto para ti.</h2>
            <p>
              Cuéntanos qué necesitas y nosotros te ayudamos a crear un look
              que te haga sentir increíble.
            </p>
          </div>

          <div className="intro-decoration">♡</div>
        </div>

        <nav className="step-navigation">
          {steps.map((item, index) => (
            <button
              key={item.number}
              className={`step-item ${step === item.number ? "active" : ""} ${
                step > item.number ? "completed" : ""
              }`}
              onClick={() => {
                if (item.number <= step) setStep(item.number);
              }}
              disabled={item.number > step}
            >
              <span className="step-number">
                {step > item.number ? "✓" : item.number}
              </span>
              <span className="step-label">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
            </button>
          ))}
        </nav>

        <section className="workspace">
          {step === 1 && (
            <div className="chat-layout">
              <div className="chat-info">
                <span className="eyebrow">PASO 01 · ASESORÍA</span>
                <h2>Tu estilo comienza con una conversación.</h2>
                <p>
                  Queremos conocerte para recomendarte prendas que se adapten
                  a tu ocasión, tus gustos y tu personalidad.
                </p>

                <div className="benefit">
                  <span>♡</span>
                  <div>
                    <strong>Asesoría personalizada</strong>
                    <small>Recomendaciones según tus preferencias.</small>
                  </div>
                </div>

                <div className="benefit">
                  <span>✧</span>
                  <div>
                    <strong>Looks pensados para ti</strong>
                    <small>Combinaciones de prendas y accesorios.</small>
                  </div>
                </div>

                <div className="benefit">
                  <span>✓</span>
                  <div>
                    <strong>Sin compromiso</strong>
                    <small>Explora tus opciones antes de comprar.</small>
                  </div>
                </div>

                <div className="chat-photo">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
                    alt="Moda femenina"
                  />
                  <div className="photo-caption">
                    <span>Tu estilo, tus reglas.</span>
                    <strong>De’yes ♡</strong>
                  </div>
                </div>
              </div>

              <div className="chat-card">
                <div className="chat-header">
                  <div className="store-avatar">D’y</div>
                  <div className="chat-store-info">
                    <strong>De’yes <span className="verified">✓</span></strong>
                    <small><span className="online-dot"></span> En línea</small>
                  </div>
                  <div className="chat-header-icons">♡ &nbsp; ⋮</div>
                </div>

                <div className="chat-messages">
                  {messages.map((item, index) => (
                    <div
                      key={index}
                      className={`message ${item.from === "client" ? "client-message" : "store-message"}`}
                    >
                      {item.text}
                      <small>{item.from === "client" ? "Tú" : "De’yes"}</small>
                    </div>
                  ))}
                </div>

                <div className="chat-suggestions">
                  <span>Respuestas rápidas</span>
                  <div className="suggestion-buttons">
                    {["Cena especial", "Salida casual", "Evento formal"].map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setOccasion(option);
                            sendMessage(`Necesito un outfit para una ${option.toLowerCase()}.`);
                          }}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <form
                  className="chat-input"
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendMessage();
                  }}
                >
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Escribe un mensaje..."
                  />
                  <button type="submit" aria-label="Enviar mensaje">➤</button>
                </form>

                <div className="chat-bottom-action">
                  <button className="primary-button" onClick={() => setStep(2)}>
                    Ver mis propuestas <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="proposals-section">
              <div className="section-heading">
                <span className="eyebrow">PASO 02 · INSPIRACIÓN</span>
                <h2>Tenemos algo especial para ti. ✨</h2>
                <p>
                  Seleccionamos tres propuestas pensando en tu ocasión y en
                  el estilo que buscas.
                </p>
              </div>

              <div className="preference-summary">
                <span>Tu ocasión: <strong>{occasion}</strong></span>
                <span>Estilo: <strong>{style}</strong></span>
                <button onClick={() => setStep(1)}>Editar preferencias</button>
              </div>

              <div className="outfit-grid">
                {outfits.map((outfit, index) => (
                  <article className="outfit-card" key={outfit.id}>
                    <div className="outfit-image">
                      <img src={outfit.image} alt={outfit.name} />
                      <span className="option-badge">Opción {index + 1}</span>
                      <span className="favorite">♡</span>
                    </div>
                    <div className="outfit-content">
                      <span className="outfit-category">PROPUESTA DE DE’YES</span>
                      <h3>{outfit.name}</h3>
                      <p>{outfit.description}</p>
                      <div className="outfit-rating">
                        <span>★</span> {outfit.rating} · Selección de nuestra asesora
                      </div>
                      <div className="outfit-card-bottom">
                        <strong>{money(outfit.price)}</strong>
                        <button
                          className="primary-button"
                          onClick={() => selectOutfit(outfit)}
                        >
                          Ver outfit <span>→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="bottom-note">
                ♡ ¿No encuentras lo que buscas? Puedes regresar y contarnos
                qué estilo prefieres.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="detail-layout">
              <div className="detail-image-container">
                <div className="detail-main-image">
                  <img src={selectedOutfit.image} alt={selectedOutfit.name} />
                  <span className="detail-image-label">DE’YES SELECTION</span>
                </div>
                <div className="detail-image-caption">
                  <span>Una combinación pensada para ti</span>
                  <span>♡</span>
                </div>
              </div>

              <div className="detail-content">
                <span className="eyebrow">PASO 03 · DETALLES DEL LOOK</span>
                <h2>{selectedOutfit.name}</h2>
                <p>{selectedOutfit.description}</p>

                <div className="detail-price">{money(selectedOutfit.price)}</div>
                <div className="detail-rating">
                  <span>★★★★★</span> {selectedOutfit.rating} · Valoración de ejemplo
                </div>

                <div className="detail-divider"></div>

                <h3>Tu combinación incluye</h3>
                <div className="included-items">
                  {selectedOutfit.items.map((item) => (
                    <div className="included-item" key={item.name}>
                      <span className="included-check">✓</span>
                      <span>{item.name}</span>
                      <strong>{money(item.price)}</strong>
                    </div>
                  ))}
                </div>

                <div className="detail-specs">
                  <div>
                    <span>♧</span>
                    <strong>Tallas</strong>
                    <small>S - L</small>
                  </div>
                  <div>
                    <span>✓</span>
                    <strong>Disponibilidad</strong>
                    <small>Por confirmar</small>
                  </div>
                  <div>
                    <span>⌂</span>
                    <strong>Entrega</strong>
                    <small>En tienda</small>
                  </div>
                </div>

                <div className="reservation-form">
                  <h3>Reserva tu outfit</h3>
                  <p>Déjanos tus datos para preparar tu selección.</p>

                  <label htmlFor="reservation-name">Nombre completo</label>
                  <input
                    id="reservation-name"
                    value={reservationName}
                    onChange={(event) => setReservationName(event.target.value)}
                    placeholder="Escribe tu nombre"
                  />

                  <div className="form-row">
                    <div>
                      <label htmlFor="reservation-date">Fecha de visita</label>
                      <input
                        id="reservation-date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={reservationDate}
                        onChange={(event) => setReservationDate(event.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="reservation-size">Talla</label>
                      <select
                        id="reservation-size"
                        value={reservationSize}
                        onChange={(event) => setReservationSize(event.target.value)}
                      >
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                          <option key={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button className="primary-button reserve-button" onClick={reserveOutfit}>
                    ♧ &nbsp; Reservar este outfit
                  </button>
                  <small className="reservation-disclaimer">
                    * Esta es una reserva de demostración. No se realiza ningún pago.
                  </small>
                </div>

                <button className="back-link" onClick={() => setStep(2)}>
                  ← Volver a las propuestas
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="confirmation-section">
              <div className="confirmation-card">
                <div className="confirmation-icon">✓</div>
                <span className="eyebrow">PASO 04 · TODO LISTO</span>
                <h2>¡Tu outfit está listo! ♡</h2>
                <p>
                  {reservationName}, hemos registrado tu solicitud de reserva.
                  Te esperamos en De’yes para que pruebes tu selección.
                </p>

                <div className="confirmation-image">
                  <img src={selectedOutfit.image} alt={selectedOutfit.name} />
                  <div>
                    <span>Tu selección</span>
                    <strong>{selectedOutfit.name}</strong>
                    <strong>{money(selectedOutfit.price)}</strong>
                  </div>
                </div>

                <div className="confirmation-details">
                  <div>
                    <span>Nombre</span>
                    <strong>{reservationName}</strong>
                  </div>
                  <div>
                    <span>Fecha de visita</span>
                    <strong>{reservationDate}</strong>
                  </div>
                  <div>
                    <span>Talla seleccionada</span>
                    <strong>{reservationSize}</strong>
                  </div>
                  <div>
                    <span>Estado</span>
                    <strong className="pending-status">Solicitud registrada</strong>
                  </div>
                </div>

                <div className="confirmation-message">
                  ♡ Recuerda que podrás probarte las prendas en nuestra tienda
                  y decidir con tranquilidad.
                </div>

                <button className="primary-button new-session-button" onClick={resetPrototype}>
                  Crear una nueva cápsula <span>→</span>
                </button>
                <small className="demo-disclaimer">
                  Prototipo académico · Reserva simulada, pendiente de confirmación por la tienda.
                </small>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">De’yes <span>♡</span></div>
        <p>Moda que te completa.</p>
        <span>© 2026 De’yes · Cápsula de Outfit</span>
      </footer>
    </div>
  );
}

export default App;
