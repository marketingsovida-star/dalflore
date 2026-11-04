export default function FloraStory() {
  return (
    <div className="df-flora-story">
      <svg viewBox="0 0 480 85" role="img" aria-label="Da microbiota ao florescer: microrganismos conectados a raízes, que sustentam uma planta. Uma representação do cuidado que inspira a DalFlore.">
        <path className="flora-route" d="M104 50C150 20 172 80 226 60S310 38 348 58" />
        <path className="flora-flow" pathLength="100" d="M104 50C150 20 172 80 226 60S310 38 348 58" />
        <g className="flora-microbes" stroke="#cde7b9" strokeWidth="1.8">
          <g transform="translate(62 44) rotate(-28)"><rect x="-10" y="-21" width="20" height="42" rx="10" fill="#9fca7d33"/><path d="M-2-11C8-4-8 3 2 11" fill="none"/><path d="M-14-9h4m10-9v-5m10 25h4M0 21v5"/></g>
          <g transform="translate(102 63) rotate(30)"><rect x="-7" y="-15" width="14" height="30" rx="7" fill="#9fca7d33"/><path d="M0-8C6-3-6 3 0 8" fill="none"/></g>
          <circle cx="105" cy="24" r="4" fill="#d9efbc55" stroke="none"/><circle cx="43" cy="72" r="3" fill="#d9efbc55" stroke="none"/>
        </g>
        <g className="flora-roots" fill="none" stroke="#cde7b9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M240 30v25m0-12c-20 0-22-10-22-16 13 0 22 5 22 16m0-5c18 0 22-10 22-16-13 0-22 5-22 16M240 55l-16 21m16-21 16 21m-16-21v27m-9-15-12-2m28 2 13-2m-20 9-7 7"/>
          <path d="M212 55h56" opacity=".35"/>
        </g>
        <g className="flora-bloom" stroke="#dcefc5" strokeWidth="1.8" strokeLinejoin="round" fill="#a4cd7f26">
          <path d="M384 69V43m0 18c-21 0-27-12-27-20 17 0 27 7 27 20m0-9c21 0 27-12 27-20-17 0-27 7-27 20"/>
          <path d="M384 43c-13-9-19-20-15-31 12 3 18 13 15 31Z"/><path d="M384 43c13-9 19-20 15-31-12 3-18 13-15 31Z"/><path d="M384 43c-9-14-8-27 0-36 8 9 9 22 0 36Z" fill="#cde7b940"/>
        </g>
      </svg>
      <div className="flora-labels" aria-hidden="true"><span>Microbiota</span><span>Cultivar o cuidado</span><span>Florescer</span></div>
      <p>Quando sua flora floresce, <strong>você floresce.</strong></p>
    </div>
  );
}
