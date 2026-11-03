export const microbiotaCells = [[169,148,-32,1],[285,116,38,.78],[316,230,-28,1.15],[181,269,38,.8],[240,193,20,.68]];

export function MicrobiotaArt({ active, highlighted }: { active: number; highlighted?: number | null }) {
  return <svg className="sj-micrograph" viewBox="55 10 390 390" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="sj-cell" x2="1" y2="1"><stop stopColor="#d3edbd"/><stop offset=".5" stopColor="#8ac37a"/><stop offset="1" stopColor="#4a8b54"/></linearGradient>
      <radialGradient id="sj-nucleus"><stop stopColor="#e0f6c7"/><stop offset="1" stopColor="#a3d38b" stopOpacity=".2"/></radialGradient>
    </defs>
    {microbiotaCells.map(([x,y,angle,scale],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <g className={"sj-cell-hover" + (highlighted === i ? " is-highlighted" : "")}><g className="sj-cell-drift" style={{animationDelay:`-${i*1.3}s`}}>
        <rect className="sj-cell-body" x="-23" y="-47" width="46" height="94" rx="23" fill="url(#sj-cell)" fillOpacity={active===0?'.55':'.88'} stroke="#d7edc7" strokeWidth="1.8"/>
        <rect x="-17" y="-39" width="34" height="78" rx="17" stroke="#e7f6de" strokeOpacity=".35"/>
        <path d="M-10-25C13-30-15-8 8-4S-11 19 8 27" stroke="#275c35" strokeWidth="3" strokeLinecap="round"/>
        <path d="M-26-26l-8-5m10 26-10 1m10 25-8 6m56-53 8-5m-8 26 10 1m-10 25 8 6" stroke="#a4d28e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="-20" r="3" fill="#ebf8dc"/><circle cx="-8" cy="17" r="2.5" fill="#d0eab9"/>
      </g></g>
    </g>)}
    {[ [121,219,13],[244,309,18],[357,155,14],[231,79,9] ].map(([x,y,r],i)=><g key={i}><circle cx={x} cy={y} r={r} fill="url(#sj-nucleus)" stroke="#cde8b7" strokeOpacity=".5"/><circle cx={x} cy={y} r={r*.4} fill="#ddf3c3" fillOpacity=".6"/></g>)}
    {active!==1&&<g className="sj-substrates" fill="#e3f5c9">
      <circle className="sj-feed sj-feed-a" cx="0" cy="0" r="4"/>
      <circle className="sj-feed sj-feed-b" cx="0" cy="0" r="3"/>
      <circle className="sj-feed sj-feed-c" cx="0" cy="0" r="4"/>
      <path d="m105 108 5 5-5 5-5-5ZM368 306l5 5-5 5-5-5Z"/>
    </g>}
  </svg>;
}
