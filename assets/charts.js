/* ============================================================
   Technical Analysis — Chart Factory & Sample Data
   Shared ApexCharts configurations for all blocks
   ============================================================ */

// === Sample OHLCV Data (6 months of daily data for a fictional stock "ACME Corp") ===
const SAMPLE_DATES = [];
const SAMPLE_OHLCV = [];
const SAMPLE_VOLUME = [];

(function generateSampleData() {
  const startDate = new Date('2025-06-01');
  let open = 150;
  const trend = [
    { days: 30, dir: 1, vol: 0.015 },   // uptrend
    { days: 20, dir: -1, vol: 0.012 },   // pullback
    { days: 25, dir: 1, vol: 0.018 },    // strong rally
    { days: 15, dir: -1, vol: 0.025 },   // sharp drop (H&S right shoulder)
    { days: 20, dir: 0, vol: 0.008 },    // consolidation
    { days: 25, dir: 1, vol: 0.015 },    // breakout rally
    { days: 15, dir: -1, vol: 0.01 },    // mild pullback
    { days: 10, dir: 1, vol: 0.012 },    // recovery
  ];

  let dayIndex = 0;
  for (const phase of trend) {
    for (let d = 0; d < phase.days; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + dayIndex);
      if (date.getDay() === 0 || date.getDay() === 6) {
        dayIndex++;
        continue;
      }

      const drift = phase.dir * phase.vol * open;
      const noise = (Math.random() - 0.5) * open * 0.025;
      const close = open + drift + noise;
      const high = Math.max(open, close) + Math.random() * open * 0.012;
      const low = Math.min(open, close) - Math.random() * open * 0.012;
      const volume = Math.floor(800000 + Math.random() * 1200000 + (phase.vol > 0.015 ? 500000 : 0));

      SAMPLE_DATES.push(date.getTime());
      SAMPLE_OHLCV.push({
        x: date.getTime(),
        y: [
          parseFloat(open.toFixed(2)),
          parseFloat(high.toFixed(2)),
          parseFloat(low.toFixed(2)),
          parseFloat(close.toFixed(2))
        ]
      });
      SAMPLE_VOLUME.push({
        x: date.getTime(),
        y: volume,
        fillColor: close >= open ? '#22c55e' : '#ef4444'
      });

      open = close;
      dayIndex++;
    }
  }
})();

// Helper: get close prices from OHLCV
function getClosePrices() {
  return SAMPLE_OHLCV.map(d => ({ x: d.x, y: d.y[3] }));
}

// Helper: get line data
function getLinePrices() {
  return SAMPLE_OHLCV.map(d => [d.x, d.y[3]]);
}

// === SMA Calculator ===
function calcSMA(data, period) {
  const closes = data.map(d => d.y[3]);
  const result = [];
  for (let i = period - 1; i < closes.length; i++) {
    const sum = closes.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push({ x: data[i].x, y: parseFloat((sum / period).toFixed(2)) });
  }
  return result;
}

// === EMA Calculator ===
function calcEMA(data, period) {
  const closes = data.map(d => d.y[3]);
  const k = 2 / (period + 1);
  const result = [];
  let ema = closes.slice(0, period).reduce((a, b) => a + b, 0) / period;
  result.push({ x: data[period - 1].x, y: parseFloat(ema.toFixed(2)) });
  for (let i = period; i < closes.length; i++) {
    ema = closes[i] * k + ema * (1 - k);
    result.push({ x: data[i].x, y: parseFloat(ema.toFixed(2)) });
  }
  return result;
}

// === RSI Calculator ===
function calcRSI(data, period = 14) {
  const closes = data.map(d => d.y[3]);
  const result = [];
  let gains = 0, losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff; else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;
  let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  result.push({ x: data[period].x, y: parseFloat((100 - 100 / (1 + rs)).toFixed(2)) });

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    avgGain = (avgGain * (period - 1) + (diff > 0 ? diff : 0)) / period;
    avgLoss = (avgLoss * (period - 1) + (diff < 0 ? -diff : 0)) / period;
    rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    result.push({ x: data[i].x, y: parseFloat((100 - 100 / (1 + rs)).toFixed(2)) });
  }
  return result;
}

// === MACD Calculator ===
function calcMACD(data, fast = 12, slow = 26, signal = 9) {
  const emaFast = calcEMA(data, fast);
  const emaSlow = calcEMA(data, slow);

  const macdLine = [];
  const slowStart = slow - fast;
  for (let i = 0; i < emaSlow.length; i++) {
    const fastVal = emaFast[i + slowStart];
    if (fastVal) {
      macdLine.push({
        x: emaSlow[i].x,
        y: parseFloat((fastVal.y - emaSlow[i].y).toFixed(2))
      });
    }
  }

  // Signal line (EMA of MACD)
  const k = 2 / (signal + 1);
  const signalLine = [];
  let ema = macdLine.slice(0, signal).reduce((a, b) => a + b.y, 0) / signal;
  signalLine.push({ x: macdLine[signal - 1].x, y: parseFloat(ema.toFixed(2)) });
  for (let i = signal; i < macdLine.length; i++) {
    ema = macdLine[i].y * k + ema * (1 - k);
    signalLine.push({ x: macdLine[i].x, y: parseFloat(ema.toFixed(2)) });
  }

  // Histogram
  const histogram = [];
  const sigStart = signal - 1;
  for (let i = 0; i < signalLine.length; i++) {
    const macdVal = macdLine[i + sigStart];
    if (macdVal) {
      const val = parseFloat((macdVal.y - signalLine[i].y).toFixed(2));
      histogram.push({
        x: signalLine[i].x,
        y: val,
        fillColor: val >= 0 ? '#22c55e' : '#ef4444'
      });
    }
  }

  return {
    macd: macdLine.slice(sigStart),
    signal: signalLine,
    histogram: histogram
  };
}

// === Bollinger Bands Calculator ===
function calcBollinger(data, period = 20, mult = 2) {
  const closes = data.map(d => d.y[3]);
  const upper = [], middle = [], lower = [];

  for (let i = period - 1; i < closes.length; i++) {
    const slice = closes.slice(i - period + 1, i + 1);
    const mean = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);

    middle.push({ x: data[i].x, y: parseFloat(mean.toFixed(2)) });
    upper.push({ x: data[i].x, y: parseFloat((mean + mult * stdDev).toFixed(2)) });
    lower.push({ x: data[i].x, y: parseFloat((mean - mult * stdDev).toFixed(2)) });
  }
  return { upper, middle, lower };
}

// === Common Chart Options (Dark Theme) ===
const CHART_THEME = {
  mode: 'dark',
  palette: 'palette1',
  monochrome: { enabled: false }
};

const CHART_DEFAULTS = {
  chart: {
    background: '#1e293b',
    foreColor: '#94a3b8',
    fontFamily: 'Inter, sans-serif',
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: true, speed: 600 }
  },
  theme: CHART_THEME,
  grid: {
    borderColor: '#334155',
    strokeDashArray: 3,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: { colors: '#64748b', fontSize: '11px' },
      datetimeFormatter: { month: 'MMM', day: 'dd MMM' }
    },
    axisBorder: { color: '#334155' },
    axisTicks: { color: '#334155' }
  },
  yaxis: {
    labels: {
      style: { colors: '#64748b', fontSize: '11px' },
      formatter: (val) => val ? val.toFixed(0) : ''
    }
  },
  tooltip: {
    theme: 'dark',
    style: { fontSize: '12px' },
    x: { format: 'dd MMM yyyy' }
  }
};

// === Chart Factory Functions ===

function createLineChart(elementId, options = {}) {
  const data = options.data || getLinePrices();
  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'line',
      height: options.height || 350
    },
    series: [{
      name: options.name || 'ACME Corp',
      data: data
    }],
    stroke: { width: 2.5, curve: 'smooth' },
    colors: [options.color || '#3b82f6'],
    xaxis: { ...CHART_DEFAULTS.xaxis },
    yaxis: {
      ...CHART_DEFAULTS.yaxis,
      title: { text: 'Price ($)', style: { color: '#64748b' } }
    }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}

function createCandlestickChart(elementId, options = {}) {
  const data = options.data || SAMPLE_OHLCV;
  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'candlestick',
      height: options.height || 350
    },
    series: [{
      name: 'ACME Corp',
      data: data
    }],
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#22c55e',
          downward: '#ef4444'
        },
        wick: { useFillColor: true }
      }
    },
    xaxis: { ...CHART_DEFAULTS.xaxis },
    yaxis: {
      ...CHART_DEFAULTS.yaxis,
      title: { text: 'Price ($)', style: { color: '#64748b' } },
      tooltip: { enabled: true }
    }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}

function createOHLCChart(elementId, options = {}) {
  const data = options.data || SAMPLE_OHLCV;
  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'candlestick',
      height: options.height || 350
    },
    series: [{
      name: 'ACME Corp',
      data: data
    }],
    plotOptions: {
      candlestick: {
        colors: { upward: '#22c55e', downward: '#ef4444' },
        wick: { useFillColor: true }
      },
      bar: { columnWidth: '40%' }
    },
    xaxis: { ...CHART_DEFAULTS.xaxis },
    yaxis: {
      ...CHART_DEFAULTS.yaxis,
      title: { text: 'Price ($)', style: { color: '#64748b' } }
    }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}

function createVolumeChart(elementId, options = {}) {
  const data = options.data || SAMPLE_VOLUME;
  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'bar',
      height: options.height || 160
    },
    series: [{ name: 'Volume', data: data }],
    plotOptions: {
      bar: {
        columnWidth: '80%',
        distributed: true
      }
    },
    colors: data.map(d => d.fillColor || '#3b82f6'),
    legend: { show: false },
    dataLabels: { enabled: false },
    xaxis: {
      ...CHART_DEFAULTS.xaxis,
      labels: { show: false }
    },
    yaxis: {
      ...CHART_DEFAULTS.yaxis,
      labels: {
        style: { colors: '#64748b', fontSize: '11px' },
        formatter: (val) => val ? (val / 1000000).toFixed(1) + 'M' : ''
      }
    }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}

function createCandlestickWithVolume(elementId, volumeElementId, options = {}) {
  const candleChart = createCandlestickChart(elementId, options);
  const volumeChart = createVolumeChart(volumeElementId, {
    height: options.volumeHeight || 140
  });
  return { candleChart, volumeChart };
}

function createMAOverlayChart(elementId, options = {}) {
  const sma20 = calcSMA(SAMPLE_OHLCV, 20);
  const sma50 = calcSMA(SAMPLE_OHLCV, 50);
  const ema20 = calcEMA(SAMPLE_OHLCV, 20);

  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'candlestick',
      height: options.height || 380
    },
    series: [
      { name: 'ACME Corp', type: 'candlestick', data: SAMPLE_OHLCV },
      { name: 'SMA 20', type: 'line', data: sma20 },
      { name: 'SMA 50', type: 'line', data: sma50 },
      { name: 'EMA 20', type: 'line', data: ema20 }
    ],
    plotOptions: {
      candlestick: {
        colors: { upward: '#22c55e', downward: '#ef4444' }
      }
    },
    stroke: { width: [1, 2, 2, 2], curve: 'smooth' },
    colors: ['#22c55e', '#3b82f6', '#f59e0b', '#a78bfa'],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: '#94a3b8' }
    },
    xaxis: { ...CHART_DEFAULTS.xaxis },
    yaxis: {
      ...CHART_DEFAULTS.yaxis,
      title: { text: 'Price ($)', style: { color: '#64748b' } }
    }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}

function createRSIChart(elementId, options = {}) {
  const rsiData = calcRSI(SAMPLE_OHLCV, 14);
  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'line',
      height: options.height || 200
    },
    series: [{ name: 'RSI (14)', data: rsiData }],
    stroke: { width: 2, curve: 'smooth' },
    colors: ['#a78bfa'],
    annotations: {
      yaxis: [
        {
          y: 70, borderColor: '#ef4444', strokeDashArray: 4,
          label: { text: 'Overbought (70)', style: { color: '#ef4444', background: 'transparent', fontSize: '11px' } }
        },
        {
          y: 30, borderColor: '#22c55e', strokeDashArray: 4,
          label: { text: 'Oversold (30)', style: { color: '#22c55e', background: 'transparent', fontSize: '11px' } }
        }
      ]
    },
    yaxis: {
      min: 0, max: 100,
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
      title: { text: 'RSI', style: { color: '#64748b' } }
    },
    xaxis: { ...CHART_DEFAULTS.xaxis }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}

function createMACDChart(elementId, options = {}) {
  const macdData = calcMACD(SAMPLE_OHLCV);
  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'line',
      height: options.height || 220
    },
    series: [
      { name: 'MACD', type: 'line', data: macdData.macd },
      { name: 'Signal', type: 'line', data: macdData.signal },
      { name: 'Histogram', type: 'bar', data: macdData.histogram }
    ],
    stroke: { width: [2, 2, 0], curve: 'smooth' },
    colors: ['#3b82f6', '#f59e0b', '#22c55e'],
    plotOptions: {
      bar: { columnWidth: '60%', distributed: false }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: '#94a3b8' }
    },
    xaxis: { ...CHART_DEFAULTS.xaxis },
    yaxis: {
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
      title: { text: 'MACD', style: { color: '#64748b' } }
    }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}

function createBollingerChart(elementId, options = {}) {
  const bb = calcBollinger(SAMPLE_OHLCV, 20, 2);
  const closes = getClosePrices().slice(19);

  const config = {
    ...CHART_DEFAULTS,
    chart: {
      ...CHART_DEFAULTS.chart,
      type: 'line',
      height: options.height || 380
    },
    series: [
      { name: 'Price', data: closes },
      { name: 'Upper Band', data: bb.upper },
      { name: 'Middle (SMA 20)', data: bb.middle },
      { name: 'Lower Band', data: bb.lower }
    ],
    stroke: { width: [2.5, 1.5, 1.5, 1.5], curve: 'smooth', dashArray: [0, 4, 0, 4] },
    colors: ['#f1f5f9', '#ef4444', '#f59e0b', '#22c55e'],
    fill: {
      type: ['solid', 'solid', 'solid', 'solid'],
      opacity: [1, 0.05, 1, 0.05]
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: '#94a3b8' }
    },
    xaxis: { ...CHART_DEFAULTS.xaxis },
    yaxis: {
      ...CHART_DEFAULTS.yaxis,
      title: { text: 'Price ($)', style: { color: '#64748b' } }
    }
  };
  const chart = new ApexCharts(document.querySelector(elementId), config);
  chart.render();
  return chart;
}
