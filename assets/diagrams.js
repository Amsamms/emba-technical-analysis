/* ============================================================
   Technical Analysis — SVG Diagram Generators
   Reusable SVG pattern & concept diagrams
   ============================================================ */

const DIAG_COLORS = {
  bg: '#1e293b',
  grid: '#334155',
  price: '#94a3b8',
  green: '#22c55e',
  red: '#ef4444',
  blue: '#3b82f6',
  amber: '#f59e0b',
  purple: '#a78bfa',
  cyan: '#22d3ee',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#64748b'
};

// === Helper: Create SVG element string ===
function svgWrap(content, width = 700, height = 350, viewBox) {
  const vb = viewBox || `0 0 ${width} ${height}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${width}" height="${height}" style="max-width:100%;height:auto;">${content}</svg>`;
}

function gridLines(width, height, cols = 10, rows = 6) {
  let lines = '';
  for (let i = 0; i <= cols; i++) {
    const x = (i / cols) * width;
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${DIAG_COLORS.grid}" stroke-width="0.5" stroke-dasharray="4"/>`;
  }
  for (let i = 0; i <= rows; i++) {
    const y = (i / rows) * height;
    lines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${DIAG_COLORS.grid}" stroke-width="0.5" stroke-dasharray="4"/>`;
  }
  return lines;
}

// === Head & Shoulders Pattern ===
function headAndShoulders(elementId) {
  const points = [
    [50, 280], [100, 200], [130, 220], // left shoulder up
    [160, 280], [200, 120], [240, 280], // head
    [270, 220], [300, 200], [350, 280], // right shoulder
    [400, 320], [450, 350] // breakdown
  ];

  const necklineY = 280;
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');

  const svg = svgWrap(`
    ${gridLines(500, 380, 8, 6)}
    <!-- Neckline -->
    <line x1="50" y1="${necklineY}" x2="400" y2="${necklineY}" stroke="${DIAG_COLORS.amber}" stroke-width="2" stroke-dasharray="8,4"/>
    <text x="410" y="${necklineY + 4}" fill="${DIAG_COLORS.amber}" font-size="13" font-family="Inter">Neckline</text>

    <!-- Price path -->
    <path d="${path}" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Breakdown arrow -->
    <line x1="350" y1="${necklineY}" x2="430" y2="340" stroke="${DIAG_COLORS.red}" stroke-width="2" stroke-dasharray="6"/>
    <text x="410" y="355" fill="${DIAG_COLORS.red}" font-size="12" font-family="Inter">Breakdown</text>

    <!-- Labels -->
    <text x="85" y="190" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter" text-anchor="middle">Left</text>
    <text x="85" y="204" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter" text-anchor="middle">Shoulder</text>
    <text x="200" y="108" fill="${DIAG_COLORS.text}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Head</text>
    <text x="310" y="190" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter" text-anchor="middle">Right</text>
    <text x="310" y="204" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter" text-anchor="middle">Shoulder</text>

    <!-- Target -->
    <line x1="200" y1="120" x2="200" y2="${necklineY}" stroke="${DIAG_COLORS.cyan}" stroke-width="1" stroke-dasharray="4"/>
    <text x="210" y="200" fill="${DIAG_COLORS.cyan}" font-size="11" font-family="Inter">Height = Target</text>
  `, 500, 380);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Double Top Pattern ===
function doubleTop(elementId) {
  const points = [
    [40, 300], [80, 280], [120, 140], [160, 250],
    [200, 140], [240, 250], [280, 300], [340, 350]
  ];
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');

  const svg = svgWrap(`
    ${gridLines(420, 380, 7, 6)}
    <line x1="40" y1="250" x2="300" y2="250" stroke="${DIAG_COLORS.amber}" stroke-width="2" stroke-dasharray="8,4"/>
    <text x="310" y="254" fill="${DIAG_COLORS.amber}" font-size="12" font-family="Inter">Support</text>
    <path d="${path}" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="120" cy="140" r="6" fill="${DIAG_COLORS.red}" opacity="0.8"/>
    <circle cx="200" cy="140" r="6" fill="${DIAG_COLORS.red}" opacity="0.8"/>
    <text x="120" y="125" fill="${DIAG_COLORS.red}" font-size="13" font-family="Inter" text-anchor="middle" font-weight="600">Top 1</text>
    <text x="200" y="125" fill="${DIAG_COLORS.red}" font-size="13" font-family="Inter" text-anchor="middle" font-weight="600">Top 2</text>
    <line x1="280" y1="250" x2="340" y2="350" stroke="${DIAG_COLORS.red}" stroke-width="2" stroke-dasharray="6"/>
    <text x="320" y="365" fill="${DIAG_COLORS.red}" font-size="12" font-family="Inter">Bearish</text>
  `, 420, 380);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Double Bottom Pattern ===
function doubleBottom(elementId) {
  const points = [
    [40, 100], [80, 120], [120, 280], [160, 160],
    [200, 280], [240, 160], [280, 100], [340, 60]
  ];
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');

  const svg = svgWrap(`
    ${gridLines(420, 340, 7, 5)}
    <line x1="40" y1="160" x2="300" y2="160" stroke="${DIAG_COLORS.amber}" stroke-width="2" stroke-dasharray="8,4"/>
    <text x="310" y="164" fill="${DIAG_COLORS.amber}" font-size="12" font-family="Inter">Resistance</text>
    <path d="${path}" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="120" cy="280" r="6" fill="${DIAG_COLORS.green}" opacity="0.8"/>
    <circle cx="200" cy="280" r="6" fill="${DIAG_COLORS.green}" opacity="0.8"/>
    <text x="120" y="300" fill="${DIAG_COLORS.green}" font-size="13" font-family="Inter" text-anchor="middle" font-weight="600">Bottom 1</text>
    <text x="200" y="300" fill="${DIAG_COLORS.green}" font-size="13" font-family="Inter" text-anchor="middle" font-weight="600">Bottom 2</text>
    <line x1="240" y1="160" x2="340" y2="60" stroke="${DIAG_COLORS.green}" stroke-width="2" stroke-dasharray="6"/>
    <text x="330" y="50" fill="${DIAG_COLORS.green}" font-size="12" font-family="Inter">Bullish</text>
  `, 420, 340);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Ascending Triangle ===
function ascendingTriangle(elementId) {
  const svg = svgWrap(`
    ${gridLines(450, 320, 7, 5)}
    <!-- Resistance (flat top) -->
    <line x1="100" y1="100" x2="380" y2="100" stroke="${DIAG_COLORS.red}" stroke-width="2"/>
    <text x="390" y="104" fill="${DIAG_COLORS.red}" font-size="12" font-family="Inter">Resistance</text>

    <!-- Rising support -->
    <line x1="60" y1="280" x2="360" y2="110" stroke="${DIAG_COLORS.green}" stroke-width="2"/>
    <text x="200" y="230" fill="${DIAG_COLORS.green}" font-size="12" font-family="Inter" transform="rotate(-25, 200, 230)">Rising Support</text>

    <!-- Price bouncing -->
    <path d="M60,280 L100,100 L140,240 L180,100 L220,200 L260,100 L300,160 L340,100 L380,60" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2" stroke-linejoin="round"/>

    <!-- Breakout -->
    <path d="M340,100 L380,60" fill="none" stroke="${DIAG_COLORS.green}" stroke-width="3"/>
    <text x="370" y="50" fill="${DIAG_COLORS.green}" font-size="13" font-family="Inter" font-weight="600">Breakout!</text>
    <text x="200" y="310" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Bullish Pattern</text>
  `, 450, 320);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Descending Triangle ===
function descendingTriangle(elementId) {
  const svg = svgWrap(`
    ${gridLines(450, 320, 7, 5)}
    <!-- Support (flat bottom) -->
    <line x1="100" y1="240" x2="380" y2="240" stroke="${DIAG_COLORS.green}" stroke-width="2"/>
    <text x="390" y="244" fill="${DIAG_COLORS.green}" font-size="12" font-family="Inter">Support</text>

    <!-- Falling resistance -->
    <line x1="60" y1="60" x2="360" y2="230" stroke="${DIAG_COLORS.red}" stroke-width="2"/>
    <text x="160" y="110" fill="${DIAG_COLORS.red}" font-size="12" font-family="Inter" transform="rotate(25, 160, 110)">Falling Resistance</text>

    <!-- Price bouncing -->
    <path d="M60,60 L100,240 L140,100 L180,240 L220,140 L260,240 L300,180 L340,240 L380,290" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2" stroke-linejoin="round"/>

    <!-- Breakdown -->
    <path d="M340,240 L380,290" fill="none" stroke="${DIAG_COLORS.red}" stroke-width="3"/>
    <text x="365" y="305" fill="${DIAG_COLORS.red}" font-size="13" font-family="Inter" font-weight="600">Breakdown!</text>
    <text x="200" y="310" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Bearish Pattern</text>
  `, 450, 320);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Symmetrical Triangle ===
function symmetricalTriangle(elementId) {
  const svg = svgWrap(`
    ${gridLines(450, 320, 7, 5)}
    <!-- Converging lines -->
    <line x1="60" y1="60" x2="360" y2="160" stroke="${DIAG_COLORS.red}" stroke-width="2"/>
    <line x1="60" y1="280" x2="360" y2="180" stroke="${DIAG_COLORS.green}" stroke-width="2"/>

    <!-- Price -->
    <path d="M60,60 L90,280 L140,80 L180,260 L220,110 L260,220 L300,140 L340,190 L380,100" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2" stroke-linejoin="round"/>

    <!-- Breakout arrow -->
    <path d="M340,170 L380,100" fill="none" stroke="${DIAG_COLORS.green}" stroke-width="3"/>
    <text x="365" y="90" fill="${DIAG_COLORS.green}" font-size="12" font-family="Inter" font-weight="600">Breakout?</text>
    <path d="M340,170 L380,240" fill="none" stroke="${DIAG_COLORS.red}" stroke-width="2" stroke-dasharray="6"/>
    <text x="365" y="255" fill="${DIAG_COLORS.red}" font-size="12" font-family="Inter">or Breakdown?</text>
    <text x="200" y="310" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Neutral — Wait for Breakout Direction</text>
  `, 450, 320);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Bull Flag ===
function bullFlag(elementId) {
  const svg = svgWrap(`
    ${gridLines(450, 320, 7, 5)}
    <!-- Flagpole -->
    <path d="M60,280 L120,80" fill="none" stroke="${DIAG_COLORS.green}" stroke-width="3"/>
    <text x="50" y="195" fill="${DIAG_COLORS.green}" font-size="12" font-family="Inter" transform="rotate(-70, 50, 195)">Flagpole</text>

    <!-- Flag (channel) -->
    <line x1="120" y1="80" x2="280" y2="140" stroke="${DIAG_COLORS.amber}" stroke-width="1.5" stroke-dasharray="6"/>
    <line x1="120" y1="130" x2="280" y2="190" stroke="${DIAG_COLORS.amber}" stroke-width="1.5" stroke-dasharray="6"/>
    <path d="M120,80 L150,130 L180,100 L210,150 L240,120 L270,170 L280,140" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2" stroke-linejoin="round"/>
    <text x="200" y="210" fill="${DIAG_COLORS.amber}" font-size="12" font-family="Inter" text-anchor="middle">Consolidation (Flag)</text>

    <!-- Breakout -->
    <path d="M280,140 L360,50" fill="none" stroke="${DIAG_COLORS.green}" stroke-width="3"/>
    <text x="340" y="40" fill="${DIAG_COLORS.green}" font-size="13" font-family="Inter" font-weight="600">Breakout!</text>
    <text x="200" y="310" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Bullish Continuation Pattern</text>
  `, 450, 320);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Pennant ===
function pennant(elementId) {
  const svg = svgWrap(`
    ${gridLines(450, 320, 7, 5)}
    <!-- Flagpole -->
    <path d="M60,280 L120,80" fill="none" stroke="${DIAG_COLORS.green}" stroke-width="3"/>

    <!-- Pennant (converging) -->
    <line x1="120" y1="80" x2="260" y2="130" stroke="${DIAG_COLORS.amber}" stroke-width="1.5" stroke-dasharray="6"/>
    <line x1="120" y1="150" x2="260" y2="130" stroke="${DIAG_COLORS.amber}" stroke-width="1.5" stroke-dasharray="6"/>
    <path d="M120,80 L140,150 L160,90 L180,140 L200,100 L220,130 L250,125" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2" stroke-linejoin="round"/>
    <text x="190" y="175" fill="${DIAG_COLORS.amber}" font-size="12" font-family="Inter" text-anchor="middle">Pennant</text>

    <!-- Breakout -->
    <path d="M250,125 L350,40" fill="none" stroke="${DIAG_COLORS.green}" stroke-width="3"/>
    <text x="340" y="30" fill="${DIAG_COLORS.green}" font-size="13" font-family="Inter" font-weight="600">Breakout!</text>
    <text x="200" y="310" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Bullish Continuation Pattern</text>
  `, 450, 320);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Uptrend with Higher Highs / Higher Lows ===
function uptrendHHHL(elementId) {
  const svg = svgWrap(`
    ${gridLines(500, 320, 8, 5)}
    <!-- Trendline -->
    <line x1="40" y1="280" x2="460" y2="80" stroke="${DIAG_COLORS.green}" stroke-width="2" stroke-dasharray="8,4"/>

    <!-- Price zigzag -->
    <path d="M40,280 L100,180 L140,220 L200,120 L240,160 L300,80 L340,110 L400,40" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- HH labels -->
    <circle cx="100" cy="180" r="4" fill="${DIAG_COLORS.green}"/>
    <text x="100" y="170" fill="${DIAG_COLORS.green}" font-size="11" font-family="Inter" text-anchor="middle">HH</text>
    <circle cx="200" cy="120" r="4" fill="${DIAG_COLORS.green}"/>
    <text x="200" y="110" fill="${DIAG_COLORS.green}" font-size="11" font-family="Inter" text-anchor="middle">HH</text>
    <circle cx="300" cy="80" r="4" fill="${DIAG_COLORS.green}"/>
    <text x="300" y="70" fill="${DIAG_COLORS.green}" font-size="11" font-family="Inter" text-anchor="middle">HH</text>
    <circle cx="400" cy="40" r="4" fill="${DIAG_COLORS.green}"/>
    <text x="400" y="30" fill="${DIAG_COLORS.green}" font-size="11" font-family="Inter" text-anchor="middle">HH</text>

    <!-- HL labels -->
    <circle cx="140" cy="220" r="4" fill="${DIAG_COLORS.cyan}"/>
    <text x="140" y="240" fill="${DIAG_COLORS.cyan}" font-size="11" font-family="Inter" text-anchor="middle">HL</text>
    <circle cx="240" cy="160" r="4" fill="${DIAG_COLORS.cyan}"/>
    <text x="240" y="180" fill="${DIAG_COLORS.cyan}" font-size="11" font-family="Inter" text-anchor="middle">HL</text>
    <circle cx="340" cy="110" r="4" fill="${DIAG_COLORS.cyan}"/>
    <text x="340" y="130" fill="${DIAG_COLORS.cyan}" font-size="11" font-family="Inter" text-anchor="middle">HL</text>

    <text x="460" y="90" fill="${DIAG_COLORS.green}" font-size="13" font-family="Inter" font-weight="600">Uptrend</text>
    <text x="250" y="310" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">HH = Higher High | HL = Higher Low</text>
  `, 500, 320);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Support & Resistance ===
function supportResistance(elementId) {
  const svg = svgWrap(`
    ${gridLines(500, 340, 8, 5)}
    <!-- Resistance zone -->
    <rect x="40" y="70" width="420" height="30" fill="${DIAG_COLORS.red}" opacity="0.15" rx="4"/>
    <line x1="40" y1="85" x2="460" y2="85" stroke="${DIAG_COLORS.red}" stroke-width="2" stroke-dasharray="8,4"/>
    <text x="470" y="89" fill="${DIAG_COLORS.red}" font-size="13" font-family="Inter" font-weight="600">Resistance</text>

    <!-- Support zone -->
    <rect x="40" y="245" width="420" height="30" fill="${DIAG_COLORS.green}" opacity="0.15" rx="4"/>
    <line x1="40" y1="260" x2="460" y2="260" stroke="${DIAG_COLORS.green}" stroke-width="2" stroke-dasharray="8,4"/>
    <text x="470" y="264" fill="${DIAG_COLORS.green}" font-size="13" font-family="Inter" font-weight="600">Support</text>

    <!-- Price bouncing -->
    <path d="M50,200 L90,100 L110,85 L130,130 L170,260 L200,255 L220,180 L260,100 L280,90 L300,150 L340,260 L360,250 L380,180 L420,100 L440,85" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Bounce arrows -->
    <circle cx="170" cy="260" r="5" fill="${DIAG_COLORS.green}"/>
    <circle cx="340" cy="260" r="5" fill="${DIAG_COLORS.green}"/>
    <circle cx="110" cy="85" r="5" fill="${DIAG_COLORS.red}"/>
    <circle cx="280" cy="90" r="5" fill="${DIAG_COLORS.red}"/>
    <circle cx="440" cy="85" r="5" fill="${DIAG_COLORS.red}"/>

    <text x="250" y="330" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Price bounces between Support and Resistance levels</text>
  `, 560, 340);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === EMH Pyramid (3 Forms) ===
function emhPyramid(elementId) {
  const svg = svgWrap(`
    <!-- Strong form -->
    <polygon points="250,30 170,130 330,130" fill="${DIAG_COLORS.red}" opacity="0.3" stroke="${DIAG_COLORS.red}" stroke-width="2"/>
    <text x="250" y="100" fill="${DIAG_COLORS.text}" font-size="14" font-family="Inter" text-anchor="middle" font-weight="600">Strong</text>
    <text x="250" y="118" fill="${DIAG_COLORS.textMuted}" font-size="11" font-family="Inter" text-anchor="middle">All info (public + private)</text>

    <!-- Semi-strong form -->
    <polygon points="170,130 90,230 410,230 330,130" fill="${DIAG_COLORS.amber}" opacity="0.25" stroke="${DIAG_COLORS.amber}" stroke-width="2"/>
    <text x="250" y="175" fill="${DIAG_COLORS.text}" font-size="14" font-family="Inter" text-anchor="middle" font-weight="600">Semi-Strong</text>
    <text x="250" y="193" fill="${DIAG_COLORS.textMuted}" font-size="11" font-family="Inter" text-anchor="middle">All public information</text>
    <text x="250" y="213" fill="${DIAG_COLORS.textMuted}" font-size="10" font-family="Inter" text-anchor="middle">FA cannot beat market</text>

    <!-- Weak form -->
    <polygon points="90,230 10,330 490,330 410,230" fill="${DIAG_COLORS.green}" opacity="0.2" stroke="${DIAG_COLORS.green}" stroke-width="2"/>
    <text x="250" y="270" fill="${DIAG_COLORS.text}" font-size="14" font-family="Inter" text-anchor="middle" font-weight="600">Weak</text>
    <text x="250" y="288" fill="${DIAG_COLORS.textMuted}" font-size="11" font-family="Inter" text-anchor="middle">Past prices & volume only</text>
    <text x="250" y="308" fill="${DIAG_COLORS.textMuted}" font-size="10" font-family="Inter" text-anchor="middle">TA cannot beat market</text>

    <text x="250" y="360" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Efficient Market Hypothesis — Three Forms</text>
  `, 500, 380);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Funnel Diagram (Market Discounts Everything) ===
function funnelDiagram(elementId) {
  const layers = [
    { label: 'Economic Data', color: DIAG_COLORS.blue, width: 400, y: 30 },
    { label: 'Company Financials', color: DIAG_COLORS.purple, width: 340, y: 80 },
    { label: 'News & Sentiment', color: DIAG_COLORS.amber, width: 280, y: 130 },
    { label: 'Insider Activity', color: DIAG_COLORS.red, width: 220, y: 180 },
    { label: 'Market Psychology', color: DIAG_COLORS.cyan, width: 160, y: 230 },
  ];

  let shapes = '';
  for (const layer of layers) {
    const x = (500 - layer.width) / 2;
    shapes += `<rect x="${x}" y="${layer.y}" width="${layer.width}" height="42" rx="6" fill="${layer.color}" opacity="0.25" stroke="${layer.color}" stroke-width="1.5"/>`;
    shapes += `<text x="250" y="${layer.y + 26}" fill="${DIAG_COLORS.text}" font-size="13" font-family="Inter" text-anchor="middle" font-weight="500">${layer.label}</text>`;
  }

  // Arrow pointing down
  shapes += `<polygon points="230,285 270,285 250,320" fill="${DIAG_COLORS.green}"/>`;
  shapes += `<text x="250" y="348" fill="${DIAG_COLORS.green}" font-size="16" font-family="Inter" text-anchor="middle" font-weight="700">= PRICE</text>`;
  shapes += `<text x="250" y="370" fill="${DIAG_COLORS.textDim}" font-size="11" font-family="Inter" text-anchor="middle">All information is already reflected in the current price</text>`;

  const svg = svgWrap(shapes, 500, 380);
  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Cycle Diagram (History Repeats) ===
function cycleDiagram(elementId) {
  const svg = svgWrap(`
    <!-- Market cycle wave -->
    <path d="M30,200 Q80,80 150,120 Q200,150 230,200 Q260,250 300,280 Q350,310 380,200 Q410,80 460,120" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="3"/>
    <path d="M460,120 Q490,150 520,200 Q550,250 590,280 Q640,310 670,200 Q700,80 750,120" fill="none" stroke="${DIAG_COLORS.blue}" stroke-width="3" stroke-dasharray="8,4" opacity="0.5"/>

    <!-- Phase labels -->
    <text x="100" y="70" fill="${DIAG_COLORS.green}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Optimism</text>
    <text x="230" y="170" fill="${DIAG_COLORS.amber}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Euphoria</text>
    <text x="330" y="305" fill="${DIAG_COLORS.red}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Panic</text>
    <text x="440" y="100" fill="${DIAG_COLORS.cyan}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Recovery</text>

    <!-- Repeat indicator -->
    <text x="600" y="170" fill="${DIAG_COLORS.textDim}" font-size="13" font-family="Inter" text-anchor="middle" font-style="italic">Pattern repeats...</text>

    <text x="400" y="350" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Human psychology drives recurring market cycles</text>
  `, 780, 370);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Candlestick Anatomy ===
function candlestickAnatomy(elementId) {
  const svg = svgWrap(`
    <!-- Bullish candle -->
    <g transform="translate(100, 20)">
      <text x="40" y="0" fill="${DIAG_COLORS.green}" font-size="16" font-family="Inter" font-weight="700" text-anchor="middle">Bullish</text>
      <!-- Upper wick -->
      <line x1="40" y1="30" x2="40" y2="80" stroke="${DIAG_COLORS.green}" stroke-width="2"/>
      <!-- Body -->
      <rect x="20" y="80" width="40" height="100" fill="${DIAG_COLORS.green}" rx="2"/>
      <!-- Lower wick -->
      <line x1="40" y1="180" x2="40" y2="240" stroke="${DIAG_COLORS.green}" stroke-width="2"/>

      <!-- Labels -->
      <line x1="65" y1="30" x2="110" y2="30" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="34" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">High</text>
      <line x1="65" y1="80" x2="110" y2="80" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="84" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">Close</text>
      <line x1="65" y1="180" x2="110" y2="180" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="184" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">Open</text>
      <line x1="65" y1="240" x2="110" y2="240" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="244" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">Low</text>
    </g>

    <!-- Bearish candle -->
    <g transform="translate(330, 20)">
      <text x="40" y="0" fill="${DIAG_COLORS.red}" font-size="16" font-family="Inter" font-weight="700" text-anchor="middle">Bearish</text>
      <!-- Upper wick -->
      <line x1="40" y1="30" x2="40" y2="80" stroke="${DIAG_COLORS.red}" stroke-width="2"/>
      <!-- Body (filled) -->
      <rect x="20" y="80" width="40" height="100" fill="${DIAG_COLORS.red}" rx="2"/>
      <!-- Lower wick -->
      <line x1="40" y1="180" x2="40" y2="240" stroke="${DIAG_COLORS.red}" stroke-width="2"/>

      <!-- Labels -->
      <line x1="65" y1="30" x2="110" y2="30" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="34" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">High</text>
      <line x1="65" y1="80" x2="110" y2="80" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="84" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">Open</text>
      <line x1="65" y1="180" x2="110" y2="180" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="184" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">Close</text>
      <line x1="65" y1="240" x2="110" y2="240" stroke="${DIAG_COLORS.textDim}" stroke-width="1" stroke-dasharray="3"/>
      <text x="115" y="244" fill="${DIAG_COLORS.textMuted}" font-size="12" font-family="Inter">Low</text>
    </g>

    <text x="260" y="295" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Green = Close > Open (price went up) | Red = Close &lt; Open (price went down)</text>
  `, 520, 310);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Candlestick Patterns (Doji, Hammer, Engulfing) ===
function candlestickPatterns(elementId) {
  const svg = svgWrap(`
    <!-- Doji -->
    <g transform="translate(50, 30)">
      <text x="30" y="0" fill="${DIAG_COLORS.amber}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Doji</text>
      <line x1="30" y1="40" x2="30" y2="180" stroke="${DIAG_COLORS.textMuted}" stroke-width="2"/>
      <line x1="15" y1="110" x2="45" y2="110" stroke="${DIAG_COLORS.textMuted}" stroke-width="3"/>
      <text x="30" y="210" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Indecision</text>
      <text x="30" y="224" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Open = Close</text>
    </g>

    <!-- Hammer -->
    <g transform="translate(170, 30)">
      <text x="30" y="0" fill="${DIAG_COLORS.green}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Hammer</text>
      <line x1="30" y1="40" x2="30" y2="50" stroke="${DIAG_COLORS.green}" stroke-width="2"/>
      <rect x="15" y="50" width="30" height="25" fill="${DIAG_COLORS.green}" rx="2"/>
      <line x1="30" y1="75" x2="30" y2="180" stroke="${DIAG_COLORS.green}" stroke-width="2"/>
      <text x="30" y="210" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Bullish reversal</text>
      <text x="30" y="224" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Long lower wick</text>
    </g>

    <!-- Shooting Star -->
    <g transform="translate(290, 30)">
      <text x="30" y="0" fill="${DIAG_COLORS.red}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Shooting Star</text>
      <line x1="30" y1="40" x2="30" y2="140" stroke="${DIAG_COLORS.red}" stroke-width="2"/>
      <rect x="15" y="140" width="30" height="25" fill="${DIAG_COLORS.red}" rx="2"/>
      <line x1="30" y1="165" x2="30" y2="180" stroke="${DIAG_COLORS.red}" stroke-width="2"/>
      <text x="30" y="210" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Bearish reversal</text>
      <text x="30" y="224" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Long upper wick</text>
    </g>

    <!-- Engulfing -->
    <g transform="translate(420, 30)">
      <text x="45" y="0" fill="${DIAG_COLORS.green}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Engulfing</text>
      <!-- Small red candle -->
      <line x1="25" y1="70" x2="25" y2="150" stroke="${DIAG_COLORS.red}" stroke-width="1.5"/>
      <rect x="15" y="90" width="20" height="40" fill="${DIAG_COLORS.red}" rx="2"/>
      <!-- Large green candle -->
      <line x1="55" y1="60" x2="55" y2="170" stroke="${DIAG_COLORS.green}" stroke-width="1.5"/>
      <rect x="40" y="70" width="30" height="90" fill="${DIAG_COLORS.green}" rx="2"/>
      <text x="45" y="210" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Bullish reversal</text>
      <text x="45" y="224" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">Big candle engulfs</text>
    </g>

    <!-- Morning Star -->
    <g transform="translate(560, 30)">
      <text x="45" y="0" fill="${DIAG_COLORS.green}" font-size="14" font-family="Inter" font-weight="600" text-anchor="middle">Morning Star</text>
      <!-- Red candle -->
      <rect x="5" y="60" width="18" height="70" fill="${DIAG_COLORS.red}" rx="2"/>
      <line x1="14" y1="50" x2="14" y2="60" stroke="${DIAG_COLORS.red}" stroke-width="1.5"/>
      <line x1="14" y1="130" x2="14" y2="145" stroke="${DIAG_COLORS.red}" stroke-width="1.5"/>
      <!-- Small candle -->
      <rect x="33" y="130" width="14" height="15" fill="${DIAG_COLORS.textMuted}" rx="2"/>
      <line x1="40" y1="120" x2="40" y2="155" stroke="${DIAG_COLORS.textMuted}" stroke-width="1.5"/>
      <!-- Green candle -->
      <rect x="57" y="70" width="18" height="70" fill="${DIAG_COLORS.green}" rx="2"/>
      <line x1="66" y1="55" x2="66" y2="70" stroke="${DIAG_COLORS.green}" stroke-width="1.5"/>
      <line x1="66" y1="140" x2="66" y2="150" stroke="${DIAG_COLORS.green}" stroke-width="1.5"/>
      <text x="45" y="210" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">3-candle reversal</text>
      <text x="45" y="224" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">pattern</text>
    </g>
  `, 700, 240);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Trading Evolution Timeline ===
function tradingTimeline(elementId) {
  const eras = [
    { year: '1700s', label: 'Rice Trading', sub: 'Homma\'s candlesticks', color: DIAG_COLORS.amber },
    { year: '1890s', label: 'Dow Theory', sub: 'Charles Dow', color: DIAG_COLORS.blue },
    { year: '1960s', label: 'Computers', sub: 'Digital charting', color: DIAG_COLORS.purple },
    { year: '1990s', label: 'Online Trading', sub: 'Retail revolution', color: DIAG_COLORS.cyan },
    { year: '2010s', label: 'Algo Trading', sub: 'HFT & quant models', color: DIAG_COLORS.green },
    { year: '2020s', label: 'AI/ML Era', sub: 'Deep learning + NLP', color: DIAG_COLORS.red },
  ];

  let content = `<line x1="60" y1="180" x2="740" y2="180" stroke="${DIAG_COLORS.border}" stroke-width="2"/>`;
  eras.forEach((era, i) => {
    const x = 80 + i * 115;
    content += `<circle cx="${x}" cy="180" r="8" fill="${era.color}"/>`;
    content += `<text x="${x}" y="160" fill="${era.color}" font-size="14" font-family="Inter" font-weight="700" text-anchor="middle">${era.year}</text>`;
    content += `<text x="${x}" y="210" fill="${DIAG_COLORS.text}" font-size="12" font-family="Inter" font-weight="500" text-anchor="middle">${era.label}</text>`;
    content += `<text x="${x}" y="228" fill="${DIAG_COLORS.textDim}" font-size="10" font-family="Inter" text-anchor="middle">${era.sub}</text>`;
  });

  const svg = svgWrap(content, 780, 260);
  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}

// === Venn Diagram (FA + TA overlap) ===
function vennFATA(elementId) {
  const svg = svgWrap(`
    <!-- FA circle -->
    <circle cx="200" cy="170" r="120" fill="${DIAG_COLORS.blue}" opacity="0.15" stroke="${DIAG_COLORS.blue}" stroke-width="2"/>
    <text x="150" y="130" fill="${DIAG_COLORS.blue}" font-size="16" font-family="Inter" font-weight="700">Fundamental</text>
    <text x="150" y="150" fill="${DIAG_COLORS.blue}" font-size="16" font-family="Inter" font-weight="700">Analysis</text>
    <text x="130" y="180" fill="${DIAG_COLORS.textDim}" font-size="11" font-family="Inter">Earnings, P/E</text>
    <text x="130" y="196" fill="${DIAG_COLORS.textDim}" font-size="11" font-family="Inter">Balance sheets</text>
    <text x="130" y="212" fill="${DIAG_COLORS.textDim}" font-size="11" font-family="Inter">Intrinsic value</text>

    <!-- TA circle -->
    <circle cx="350" cy="170" r="120" fill="${DIAG_COLORS.green}" opacity="0.15" stroke="${DIAG_COLORS.green}" stroke-width="2"/>
    <text x="360" y="130" fill="${DIAG_COLORS.green}" font-size="16" font-family="Inter" font-weight="700">Technical</text>
    <text x="360" y="150" fill="${DIAG_COLORS.green}" font-size="16" font-family="Inter" font-weight="700">Analysis</text>
    <text x="365" y="180" fill="${DIAG_COLORS.textDim}" font-size="11" font-family="Inter">Price & volume</text>
    <text x="365" y="196" fill="${DIAG_COLORS.textDim}" font-size="11" font-family="Inter">Charts & patterns</text>
    <text x="365" y="212" fill="${DIAG_COLORS.textDim}" font-size="11" font-family="Inter">Entry/exit timing</text>

    <!-- Overlap -->
    <text x="275" y="160" fill="${DIAG_COLORS.amber}" font-size="13" font-family="Inter" font-weight="600" text-anchor="middle">Both</text>
    <text x="275" y="178" fill="${DIAG_COLORS.textMuted}" font-size="10" font-family="Inter" text-anchor="middle">Volume</text>
    <text x="275" y="193" fill="${DIAG_COLORS.textMuted}" font-size="10" font-family="Inter" text-anchor="middle">Risk mgmt</text>
    <text x="275" y="208" fill="${DIAG_COLORS.textMuted}" font-size="10" font-family="Inter" text-anchor="middle">Market trends</text>

    <text x="275" y="320" fill="${DIAG_COLORS.textDim}" font-size="12" font-family="Inter" text-anchor="middle">Best approach: Use BOTH for "What to buy" + "When to buy"</text>
  `, 550, 340);

  if (elementId) document.getElementById(elementId).innerHTML = svg;
  return svg;
}
