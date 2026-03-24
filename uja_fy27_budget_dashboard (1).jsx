import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine, Label, ComposedChart, Line } from "recharts";

const F = "Calibri, 'Gill Sans', 'Segoe UI', sans-serif";
const FS = "Cambria, 'Instrument Serif', Georgia, serif";

const C = {
  bg: "#ffffff", bgSoft: "#f7f9fc", card: "#ffffff",
  border: "#e2e8f0", borderLight: "#edf2f7",
  uja: "#1a9fd4", ujaDark: "#1580ad", ujaLight: "#e8f4fa", ujaMid: "#3bb5e3",
  navy: "#1a365d", text: "#1a202c", textSecondary: "#4a5568", textMuted: "#a0aec0",
  positive: "#2f855a", positiveBg: "#f0fff4", negative: "#c53030", negativeBg: "#fff5f5",
};

const impactColors = ["#c0392b","#1a9fd4","#e67e22","#8e44ad","#2980b9","#d63384","#27ae60"];
const geoColors = ["#1a9fd4","#e67e22","#8e44ad","#27ae60"];

const geoData = [
  { name: "New York", FY21: 123.7, FY22: 112.1, FY23: 118.7, FY24: 124.9, FY25: 146.1, FY26: 164.0, FY27: 155.1, pct: 67 },
  { name: "Israel", FY21: 28.7, FY22: 25.2, FY23: 31.1, FY24: 110.9, FY25: 114.3, FY26: 107.0, FY27: 47.8, pct: 21 },
  { name: "International", FY21: 18.9, FY22: 29.3, FY23: 25.8, FY24: 18.1, FY25: 14.9, FY26: 16.5, FY27: 19.4, pct: 8 },
  { name: "National", FY21: 9.7, FY22: 9.8, FY23: 9.7, FY24: 9.6, FY25: 10.1, FY26: 10.2, FY27: 10.1, pct: 4 },
];

const impactData = [
  { name: "Global Crisis", FY21: 8.2, FY22: 20.1, FY23: 17.2, FY24: 108.7, FY25: 97.5, FY26: 80.6, FY27: 21.0, change: -59.6, pctChange: -73.9, pct: 9, color: impactColors[0],
    desc: "Frontline crisis response — Israel, Ukraine, and emergency humanitarian services. Includes ongoing war response and disaster relief partnerships." },
  { name: "Deepen Jewish Identity", FY21: 44.2, FY22: 43.3, FY23: 47.7, FY24: 43.6, FY25: 58.8, FY26: 65.9, FY27: 66.8, change: 0.9, pctChange: 1.4, pct: 29, color: impactColors[1],
    desc: "Programs to strengthen Jewish knowledge and experience — camps, day schools, campuses, community centers, Israel education, and young adult engagement." },
  { name: "Combat Poverty", FY21: 49.7, FY22: 39.1, FY23: 38.6, FY24: 39.4, FY25: 46.3, FY26: 50.0, FY27: 48.8, change: -1.2, pctChange: -2.4, pct: 21, color: impactColors[2],
    desc: "Safety net services in New York — emergency food, cash assistance, interest-free loans, financial literacy, benefits enrollment, vocational training, and the Brooklyn & Queens Hubs." },
  { name: "Mental Health & Wellness", FY21: 28.5, FY22: 32.9, FY23: 39.3, FY24: 30.2, FY25: 30.7, FY26: 31.7, FY27: 30.9, change: -0.8, pctChange: -2.5, pct: 13, color: impactColors[3],
    desc: "Resilience and isolation-reduction for seniors, Holocaust survivors, teens, and parents. Includes the Jewish Community Mental Health Initiative and support for vulnerable populations." },
  { name: "Fortifying NY Infrastructure", FY21: 32.9, FY22: 21.6, FY23: 22.4, FY24: 19.5, FY25: 29.6, FY26: 37.8, FY27: 32.3, change: -5.5, pctChange: -14.6, pct: 14, color: impactColors[4],
    desc: "Agency infrastructure, capacity building, management, and governance. Includes the IDC rate increase from 15% to 20% to cover the true cost of grantee operations." },
  { name: "Confront Antisemitism", FY21: 3.1, FY22: 5.1, FY23: 5.0, FY24: 9.5, FY25: 13.4, FY26: 20.5, FY27: 21.8, change: 1.3, pctChange: 6.3, pct: 9, color: impactColors[5],
    desc: "Community security (CSI), community relations, advocacy, and resources to combat antisemitism in schools, workplaces, and on campuses. Includes Nonprofit Security Grant Program support." },
  { name: "Inclusive Communities", FY21: 14.4, FY22: 14.3, FY23: 15.1, FY24: 12.6, FY25: 9.1, FY26: 11.2, FY27: 10.8, change: -0.4, pctChange: -3.6, pct: 5, color: impactColors[6],
    desc: "Ensuring vulnerable Jews can access community — older adults, people with disabilities, LGBTQ+ Jews, and financially vulnerable populations. Includes UJA on the Way and synagogue inclusion." },
];

const campaignData = [
  { year: "FY24", amount: 186.5, yoy: null, label: "" },
  { year: "FY25", amount: 235.7, yoy: 26.4, label: "+26.4%" },
  { year: "FY26P", amount: 233.0, yoy: -1.1, label: "−1.1%" },
  { year: "FY27B", amount: 225.0, yoy: -3.4, label: "−3.4%" },
];

const adminData = [
  { name: "Fundraising (FRD)", amount: 28.6, headcount: 157, color: C.uja },
  { name: "Finance & Admin", amount: 16.6, headcount: 53, color: "#2980b9" },
  { name: "Digital Solutions", amount: 15.4, headcount: 70, color: "#8e44ad" },
  { name: "Marketing & Comms", amount: 10.6, headcount: 38, color: "#e67e22" },
  { name: "Executive Office", amount: 9.8, headcount: 33, color: "#c0392b" },
  { name: "Planning (CPO)", amount: 9.4, headcount: 48, color: "#27ae60" },
];

const usesData = [
  { name: "Grants & Programs", fy27: 232.4, color: C.uja },
  { name: "Admin Budget", fy27: 89.1, color: "#e67e22" },
  { name: "Capital", fy27: 3.2, color: "#8e44ad" },
  { name: "Bldg Reserve & Other", fy27: 2.3, color: "#2980b9" },
  { name: "Debt Service", fy27: 3.0, color: "#a0aec0" },
];

const keyInsights = [
  { accent: "#c0392b", title: "IEF Spend-Down Complete", desc: "$53.4M Israel Emergency Fund fully deployed by end of FY26 — largest single driver of the $65.2M grants decrease. Since October 7, UJA has allocated close to $325M to Israel, including $220M from IEF, $44M from sustained annual grants, and $61M for special and capital projects." },
  { accent: "#27ae60", title: "Campaign Strength Sustained", desc: "FY27 campaign budgeted at $225M — 3rd consecutive year above $200M. Post-Oct 7 giving levels holding with modest normalization, supported by sustained conversions of IEF gifts and higher giving levels. The FY26 campaign is projected at $233M, exceeding its original $218M budget by $15M." },
  { accent: C.uja, title: "IDC Rate Increase: 15% → 20%", desc: "Historic shift in grantmaking policy adds $5M to agencies across all designated program grants. The increase covers the true cost of running programs — not just direct costs but also benefits, HR, and space. Research shows nonprofits that invest in infrastructure are more successful in realizing their missions. This moves UJA's policies toward best practice in the field." },
  { accent: "#e67e22", title: "Antisemitism Spend 7× Since FY21", desc: "From $3.1M to $21.8M in six years. The fastest-growing impact area, with nearly unbroken YoY increases. Includes expanded Community Security Initiative (CSI) funding, Nonprofit Security Grant Program support, and new allocations for physical security at partner agencies. Additional domestic special project funds are set aside for emerging needs." },
  { accent: "#8e44ad", title: "Special Projects Flexibility", desc: "$27M reserved ($17M Israel, $10M NY) from prior year unallocated reserves and annual campaign growth. Provides strategic flexibility to respond to emerging needs — including the ongoing war with Iran, for which UJA has already provided $2M in emergency funding. This FY27 budget has built-in flexibility to continue to respond as needed." },
  { accent: "#2980b9", title: "Keystone Initiative Launch", desc: "$4.9M new investment to ensure economically vulnerable Jews retain — or become newly eligible for — their SNAP benefits in the face of new, highly regulated work requirements instituted through H.R.1 (the 'One Big Beautiful Bill Act' signed in 2025). Additionally, $500K is budgeted to bolster food programming at select area JCCs with large food pantry programs." },
];

const AnimNum = ({ value, prefix = "$", suffix = "", decimals = 1 }) => {
  const [d, setD] = useState(0);
  useEffect(() => {
    const dur = 1200, st = Date.now();
    const go = () => { const p = Math.min((Date.now() - st) / dur, 1); setD(value * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(go); };
    requestAnimationFrame(go);
  }, [value]);
  return <span>{prefix}{d.toFixed(decimals)}{suffix}</span>;
};

const KPI = ({ label, value, sub, prefix = "$", suffix = "M", accent = C.uja, delay = 0 }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${accent}`, padding: "22px 18px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", animation: `fadeUp 0.5s ease ${delay}s both` }}>
    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.6px", color: C.textMuted, marginBottom: "8px", fontFamily: F }}>{label}</div>
    <div style={{ fontSize: "30px", fontWeight: 700, color: C.navy, fontFamily: FS, lineHeight: 1.1 }}><AnimNum value={value} prefix={prefix} suffix={suffix} /></div>
    {sub && <div style={{ fontSize: "12px", color: C.textSecondary, marginTop: "6px", fontFamily: F }}>{sub}</div>}
  </div>
);

const TabBtn = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{ padding: "10px 22px", fontSize: "13px", fontWeight: active ? 700 : 400, fontFamily: F, color: active ? C.uja : C.textSecondary, background: active ? C.ujaLight : "transparent", border: `1px solid ${active ? C.uja + "33" : "transparent"}`, borderRadius: "6px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>{children}</button>
);

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", fontFamily: F }}>
      <div style={{ fontSize: "11px", color: C.textMuted, marginBottom: "4px" }}>{label}</div>
      {payload.filter(p => p.value != null).map((p, i) => (
        <div key={i} style={{ fontSize: "12px", color: p.color || C.text, marginBottom: "2px" }}>
          {p.name}: <strong>{typeof p.value === 'number' ? `$${p.value.toFixed(1)}M` : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

const Hdr = ({ title, sub }) => (
  <div style={{ marginBottom: "20px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: 400, color: C.navy, fontFamily: FS, marginBottom: "3px" }}>{title}</h2>
    {sub && <p style={{ fontSize: "13px", color: C.textMuted, margin: 0, fontFamily: F }}>{sub}</p>}
  </div>
);

const ChgBadge = ({ value, pct }) => {
  const up = value >= 0;
  return (
    <span style={{ fontSize: "11px", fontWeight: 700, fontFamily: F, color: up ? C.positive : C.negative, background: up ? C.positiveBg : C.negativeBg, padding: "2px 7px", borderRadius: "4px", display: "inline-block" }}>
      {up ? "▲" : "▼"} ${Math.abs(value).toFixed(1)}M ({up ? "+" : ""}{pct.toFixed(1)}%)
    </span>
  );
};

const RatioCard = ({ label, value, benchmark, note, accent = C.uja, national }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", flex: "1 1 200px", display: "flex", flexDirection: "column" }}>
    <div style={{ fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "1.2px", color: C.textMuted, fontFamily: F, marginBottom: "6px" }}>{label}</div>
    <div style={{ fontSize: "24px", fontWeight: 700, color: accent, fontFamily: FS }}>{value}</div>
    {benchmark && <div style={{ fontSize: "11px", color: C.textSecondary, fontFamily: F, marginTop: "3px" }}>{benchmark}</div>}
    {note && <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F, marginTop: "2px", fontStyle: "italic" }}>{note}</div>}
    {national && (
      <div style={{ marginTop: "auto", paddingTop: "8px", borderTop: `1px solid ${C.borderLight}`, marginTop: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: national.status === "above" ? C.positive : national.status === "meets" ? C.uja : "#e67e22", flexShrink: 0 }} />
          <span style={{ fontSize: "10px", fontWeight: 700, color: national.status === "above" ? C.positive : national.status === "meets" ? C.uja : "#e67e22", fontFamily: F, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {national.status === "above" ? "Exceeds" : national.status === "meets" ? "Meets" : "Within range"}
          </span>
        </div>
        <div style={{ fontSize: "10.5px", color: C.textSecondary, fontFamily: F, lineHeight: 1.4 }}>{national.threshold}</div>
        <div style={{ fontSize: "9.5px", color: C.textMuted, fontFamily: F, marginTop: "2px" }}>Source: {national.source}</div>
      </div>
    )}
  </div>
);

const CampaignTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", fontFamily: F, minWidth: 160 }}>
      <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "13px", color: C.text }}>Campaign: <strong>${d?.amount?.toFixed(1)}M</strong></div>
      {d?.yoy != null && (
        <div style={{ fontSize: "12px", color: d.yoy >= 0 ? C.positive : C.negative, fontWeight: 600, marginTop: "2px" }}>
          YoY Growth: {d.yoy >= 0 ? "+" : ""}{d.yoy.toFixed(1)}%
        </div>
      )}
    </div>
  );
};

// ===== VIEWS =====
const ExecView = () => (
  <div style={{ animation: "fadeIn 0.4s ease" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "14px", marginBottom: "32px" }}>
      <KPI label="Total Operating Budget" value={330.0} sub="Down $61.5M from FY26" accent={C.navy} delay={0} />
      <KPI label="Grants & Programs" value={232.4} sub="70% of total budget" accent={C.uja} delay={0.08} />
      <KPI label="Annual Campaign" value={225.0} sub="3rd consecutive year above $200M" accent="#27ae60" delay={0.16} />
      <KPI label="Admin & Non-Grant" value={97.6} sub="30% of total — up 3.9%" accent="#e67e22" delay={0.24} />
      <KPI label="Program Ratio" value={78} prefix="" suffix="%" sub="Up from historical 75%" accent={C.uja} delay={0.32} />
      <KPI label="Total Headcount" value={416} prefix="" suffix="" sub="399 admin + 17 program · 8% below pre-pandemic 454" accent="#8e44ad" delay={0.4} />
    </div>

    <Hdr title="Strategic Insights" sub="Key themes shaping the FY2027 budget" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "10px", marginBottom: "32px" }}>
      {keyInsights.map((item, i) => (
        <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${item.accent}`, borderRadius: "6px", padding: "16px 18px", animation: `fadeUp 0.4s ease ${0.06 * i}s both`, transition: "box-shadow 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: C.navy, marginBottom: "4px", fontFamily: F }}>{item.title}</div>
          <div style={{ fontSize: "12.5px", color: C.textSecondary, lineHeight: 1.55, fontFamily: F }}>{item.desc}</div>
        </div>
      ))}
    </div>

    <Hdr title="Annual Campaign Trajectory" sub="FY24–FY27 with year-over-year growth rates (FY26 projected, FY27 budgeted)" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "20px", marginBottom: "0", alignItems: "stretch" }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px 14px 6px 0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", minHeight: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={campaignData}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.uja} stopOpacity={0.18} />
                <stop offset="100%" stopColor={C.uja} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
            <XAxis dataKey="year" tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} />
            <YAxis yAxisId="left" tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} domain={[160, 260]} tickFormatter={v => `$${v}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: C.textMuted, fontSize: 10, fontFamily: F }} axisLine={{ stroke: C.border }} domain={[-10, 30]} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CampaignTooltip />} />
            <Area yAxisId="left" type="monotone" dataKey="amount" stroke={C.uja} strokeWidth={2.5} fill="url(#cg)" name="Campaign" dot={{ fill: C.uja, r: 5, strokeWidth: 2, stroke: "#fff" }} />
            <Bar yAxisId="right" dataKey="yoy" name="YoY Growth" barSize={18} radius={[3, 3, 0, 0]}>
              {campaignData.map((d, i) => <Cell key={i} fill={d.yoy != null && d.yoy >= 0 ? C.positive : C.negative} opacity={d.yoy != null ? 0.35 : 0} />)}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.2px", color: C.textMuted, fontFamily: F, marginBottom: "10px" }}>Campaign Milestones</div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
        <div style={{ padding: "6px 0 8px", marginBottom: "4px", borderBottom: `1px solid ${C.borderLight}` }}>
          <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F, lineHeight: 1.45, fontStyle: "italic" }}>The FY27 budget follows over five years of strong fundraising, including a 26% surge in FY25 — the strongest single-year growth in UJA history.</div>
        </div>
        {[
          { year: "FY24", event: "Oct 7 attacks drive surge in giving", color: C.negative },
          { year: "FY25", event: "Record $235.7M — 26% YoY growth, highest in UJA history", color: C.positive },
          { year: "FY26", event: "Projected $233M — IEF conversions sustain high levels", color: C.uja },
          { year: "FY27", event: "Budgeted $225M — modest normalization expected; 3rd consecutive year above $200M", color: C.navy },
        ].map((m, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.borderLight}` : "none" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: m.color, fontFamily: F }}>{m.year}</div>
            <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F, lineHeight: 1.45 }}>{m.event}</div>
          </div>
        ))}
          </div>
        <div style={{ marginTop: "auto", padding: "8px 10px", background: C.ujaLight, borderRadius: "6px" }}>
          <div style={{ fontSize: "11px", color: C.ujaDark, fontFamily: F, fontWeight: 600 }}>FY24 → FY27 Growth</div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: C.navy, fontFamily: FS }}>+20.6%</div>
          <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>$186.5M → $225.0M over three years</div>
        </div>
        </div>
      </div>
    </div>
  </div>
);

const ImpactView = () => {
  const [sel, setSel] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const years = ["FY21","FY22","FY23","FY24","FY25","FY26","FY27"];
  const td = years.map(yr => { const o = { year: yr }; impactData.forEach(d => { o[d.name] = d[yr]; }); return o; });

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <Hdr title="Grants by Impact Area" sub="FY27 allocation of $232.4M across seven strategic priorities" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "12px", fontFamily: F }}>FY27 Allocation Mix</div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={impactData} cx="50%" cy="50%" innerRadius={62} outerRadius={112} dataKey="FY27" paddingAngle={2}
                  onMouseEnter={(_, i) => setSel(i)} onMouseLeave={() => setSel(null)} style={{ cursor: "pointer" }}>
                  {impactData.map((d, i) => <Cell key={i} fill={d.color} opacity={sel === null || sel === i ? 1 : 0.25} stroke="white" strokeWidth={2} />)}
                </Pie>
                <Tooltip content={<Tip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "2px", fontFamily: F }}>FY27 Budget & Year-over-Year Change</div>
          {impactData.map((d, i) => (
            <div key={i} style={{ background: sel === i ? d.color + "08" : C.card, border: `1px solid ${sel === i ? d.color + "44" : C.border}`, borderRadius: "6px", padding: expanded === i ? "10px 12px 12px" : "8px 12px", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={() => setSel(i)} onMouseLeave={() => setSel(null)} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "13px", color: C.navy, fontWeight: 600, fontFamily: F }}>{d.name}</div>
                    <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>{d.pct}% of total</div>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: C.navy, fontFamily: F }}>${d.FY27.toFixed(1)}M</div>
                    <ChgBadge value={d.change} pct={d.pctChange} />
                  </div>
                  <div style={{ fontSize: "10px", color: C.textMuted, transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</div>
                </div>
              </div>
              {expanded === i && (
                <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: `1px solid ${C.borderLight}`, fontSize: "12px", color: C.textSecondary, lineHeight: 1.55, fontFamily: F, animation: "fadeIn 0.2s ease" }}>
                  {d.desc}
                </div>
              )}
            </div>
          ))}
          <div style={{ fontSize: "10.5px", color: C.textMuted, fontStyle: "italic", marginTop: "4px", fontFamily: F }}>Click any area to see its definition</div>
        </div>
      </div>
      <Hdr title="Seven-Year Trend" sub="FY21–FY27 — note the Oct 7 crisis spike in FY24–FY26" />
      <div style={{ height: 310, background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px 14px 6px 0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <ResponsiveContainer>
          <AreaChart data={td} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
            <XAxis dataKey="year" tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} />
            <YAxis tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} tickFormatter={v => `${(v * 100).toFixed(0)}%`} />
            <Tooltip content={<Tip />} />
            {impactData.map((d, i) => <Area key={i} type="monotone" dataKey={d.name} stackId="1" stroke={d.color} fill={d.color} fillOpacity={0.75} />)}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Portfolio Evolution Insights */}
      <div style={{ marginTop: "24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "16px", fontFamily: F }}>How the Portfolio Has Evolved — FY21 to FY27</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          {/* Pre-crisis baseline */}
          <div style={{ background: C.bgSoft, borderRadius: "8px", padding: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "8px" }}>Pre-Crisis Baseline (FY21–FY23)</div>
            <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F, lineHeight: 1.6 }}>
              The portfolio was dominated by two areas: <strong>Combat Poverty</strong> (22–27%) and <strong>Deepen Jewish Identity</strong> (24–26%), together accounting for roughly half of all grants. <strong>Mental Health</strong> held steady at 16–21%. <strong>Global Crisis</strong> was modest at 5–11%, reflecting intermittent natural disaster response. <strong>Antisemitism</strong> funding was minimal at 2–3% ($3–5M). Total grants ranged from $176–185M.
            </div>
          </div>

          {/* Crisis period */}
          <div style={{ background: "#fff5f5", borderRadius: "8px", padding: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: C.negative, fontFamily: F, marginBottom: "8px" }}>Crisis Period (FY24–FY26)</div>
            <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F, lineHeight: 1.6 }}>
              October 7 fundamentally reshaped the portfolio. <strong>Global Crisis</strong> surged to 41% of grants in FY24 ($108.7M) — up from 9% the prior year — driven by the $220M Israel Emergency Fund. Total grants surged 42% to $263.5M. Every other category shrank as a <em>share</em> of the portfolio, though most grew in absolute dollars thanks to the expanded resource base. <strong>Antisemitism</strong> saw the fastest sustained growth, rising from $5M to $20.5M.
            </div>
          </div>
        </div>

        {/* Return to normal */}
        <div style={{ background: C.ujaLight, borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: C.ujaDark, fontFamily: F, marginBottom: "8px" }}>FY27: Post-Crisis Rebalancing</div>
          <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F, lineHeight: 1.6 }}>
            With the IEF fully spent, the portfolio is rebalancing — but not returning to its pre-crisis shape. <strong>Global Crisis</strong> drops back to 9%, but <strong>Deepen Jewish Identity</strong> has emerged as the clear top priority at 29% ($66.8M), the highest it has ever been in both dollar and percentage terms. This reflects UJA's strategic bet on the post-October 7 surge in Jewish engagement. <strong>Antisemitism</strong> has permanently elevated to 9% ($21.8M) — 7× its FY21 level and the fastest-growing area across the period. <strong>Combat Poverty</strong> returns to its traditional second-place position at 21%.
          </div>
        </div>

        {/* Individual area trajectories */}
        <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "10px" }}>Key Trajectories by Impact Area</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "10px" }}>
          {[
            { color: impactColors[0], name: "Global Crisis", trajectory: "5% → 41% → 9%", insight: "The defining story of this period. The $220M IEF created a temporary bulge that masked the underlying portfolio. With IEF spent, $17M in special projects provides continued Israel flexibility, and the Iran war response ($2M initial) may require further draws." },
            { color: impactColors[1], name: "Deepen Jewish Identity", trajectory: "24% → 17% → 29%", insight: "Compressed during the crisis years (falling to 17% of a larger pie) but now at an all-time high. The $7.5M Jewish Life allocation (final year of $25M commitment) and upcoming young adult study signal long-term investment in the post-Oct 7 engagement surge." },
            { color: impactColors[2], name: "Combat Poverty", trajectory: "27% → 15% → 21%", insight: "The safety net portfolio has matured: Brooklyn Hub entering its third full year, Queens Hub operational, and the new $4.9M Keystone Initiative launching to protect SNAP benefits. The decrease from FY26 reflects Uplift incubator completion, not service cuts — start-up costs were higher than ongoing operations." },
            { color: impactColors[5], name: "Confront Antisemitism", trajectory: "2% → 4% → 9%", insight: "The fastest-growing area since FY21 — from $3.1M to $21.8M (7×). CSI funding, NSGP support, and dedicated security dollars for physical spaces now represent a permanent expansion of the portfolio. Additional domestic special project funds are set aside for emerging security needs." },
            { color: impactColors[3], name: "Mental Health & Wellness", trajectory: "16% → 11% → 13%", insight: "Peaked at 21% in FY23 ($39.3M), then normalized. The JCMHI at the American Psychological Foundation (80 volunteer psychologists) continues, while CUNY Hillel Hub grants wind down — now sustained by foundation partners. New projects target specific communities facing antisemitism-related trauma." },
            { color: impactColors[4], name: "Fortifying NY Infrastructure", trajectory: "18% → 7% → 14%", insight: "The IDC rate increase (15% → 20%) is the headline here — adding $5M to help agencies cover true operating costs, not just program expenses. Research shows infrastructure investment improves mission outcomes. The dollar decrease is driven by lower Special Projects availability, not reduced commitment." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "12px 14px", borderLeft: `3px solid ${item.color}`, background: C.bgSoft, borderRadius: "0 6px 6px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: F }}>{item.name}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: item.color, fontFamily: F, background: "#fff", padding: "1px 8px", borderRadius: "10px", border: `1px solid ${item.color}33` }}>{item.trajectory}</span>
              </div>
              <div style={{ fontSize: "11.5px", color: C.textSecondary, fontFamily: F, lineHeight: 1.55 }}>{item.insight}</div>
            </div>
          ))}
        </div>

        {/* Structural observation */}
        <div style={{ marginTop: "16px", padding: "12px 16px", background: "#fffbeb", border: "1px solid #f6e5a3", borderRadius: "6px" }}>
          <div style={{ fontSize: "12px", color: "#78621a", fontFamily: F, lineHeight: 1.55 }}>
            <strong>Structural takeaway:</strong> The pre-crisis portfolio (FY21–23 average) was roughly 42% domestic social services (Poverty + Mental Health), 33% Jewish engagement (Identity + Inclusion), 14% infrastructure, and 11% crisis/security. FY27's portfolio is 34% domestic social services, 33% Jewish engagement, 14% infrastructure, and 18% crisis/security — reflecting a rebalancing from safety-net dominance toward permanently elevated security and crisis-response spending in the post-October 7 era.
          </div>
        </div>
      </div>
    </div>
  );
};

const GeoView = () => {
  const years = ["FY21","FY22","FY23","FY24","FY25","FY26","FY27"];
  const td = years.map(yr => { const o = { year: yr }; geoData.forEach(d => { o[d.name] = d[yr]; }); return o; });
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <Hdr title="Geographic Distribution" sub="FY27 grants allocation across four regions — $232.4M total" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {geoData.map((d, i) => {
          const ch = d.FY27 - d.FY26, pc = ((d.FY27 - d.FY26) / d.FY26 * 100);
          return (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${geoColors[i]}`, borderRadius: "8px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", animation: `fadeUp 0.4s ease ${0.08 * i}s both` }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, fontFamily: F }}>{d.name}</div>
              <div style={{ fontSize: "26px", fontWeight: 700, color: C.navy, fontFamily: FS, margin: "6px 0" }}>${d.FY27.toFixed(1)}M</div>
              <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F }}>{d.pct}% of total</div>
              <div style={{ marginTop: "6px" }}><ChgBadge value={ch} pct={pc} /></div>
            </div>
          );
        })}
      </div>
      <Hdr title="Geographic Allocation Over Time" sub="Stacked area — absolute dollars (FY21–FY27)" />
      <div style={{ height: 320, background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px 14px 6px 0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <ResponsiveContainer>
          <AreaChart data={td}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
            <XAxis dataKey="year" tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} />
            <YAxis tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} tickFormatter={v => `$${v}M`} />
            <Tooltip content={<Tip />} />
            {geoData.map((d, i) => <Area key={i} type="monotone" dataKey={d.name} stackId="1" stroke={geoColors[i]} fill={geoColors[i]} fillOpacity={0.55} />)}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Geographic evolution observation */}
      <div style={{ marginTop: "20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "12px", fontFamily: F }}>Reading the Chart</div>
        <div style={{ fontSize: "12.5px", color: C.textSecondary, fontFamily: F, lineHeight: 1.6, marginBottom: "12px" }}>
          The geographic story of this seven-year period is essentially a story about Israel. Before October 7, Israel consistently accounted for 14–17% of grants ($25–31M). In FY24, Israel's share tripled to 42% ($110.9M) and remained near 40% through FY26, driven by $220M in IEF deployments. In FY27, Israel returns to 21% ($47.8M) — higher than its pre-crisis baseline, reflecting $17M in special projects and the ongoing Iran war response.
        </div>
        <div style={{ fontSize: "12.5px", color: C.textSecondary, fontFamily: F, lineHeight: 1.6, marginBottom: "12px" }}>
          New York's share compressed from 64–68% to 47–55% during the crisis — not because domestic funding was cut (it actually grew from $118.7M to $164.0M), but because the total pie expanded so dramatically with emergency funds. With the IEF spent, New York returns to 67% — its historical norm — though the $155.1M allocation is still $31M higher than FY21's $123.7M, reflecting real domestic investment growth.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {[
            { region: "New York", pre: "64–68%", crisis: "47–55%", fy27: "67%", color: geoColors[0], note: "Back to norm; $31M above FY21" },
            { region: "Israel", pre: "14–17%", crisis: "36–42%", fy27: "21%", color: geoColors[1], note: "Above baseline; $17M special projects" },
            { region: "International", pre: "10–17%", crisis: "5–7%", fy27: "8%", color: geoColors[2], note: "Recovering; +$1.5M for Ukraine" },
            { region: "National", pre: "5–6%", crisis: "3–4%", fy27: "4%", color: geoColors[3], note: "Stable; core partners + JFNA" },
          ].map((r, i) => (
            <div key={i} style={{ background: C.bgSoft, borderRadius: "6px", padding: "10px 12px", borderTop: `3px solid ${r.color}` }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px" }}>{r.region}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>
                <span>Pre-crisis</span><span style={{ fontWeight: 600, color: C.textSecondary }}>{r.pre}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>
                <span>Crisis peak</span><span style={{ fontWeight: 600, color: C.textSecondary }}>{r.crisis}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>
                <span>FY27</span><span style={{ fontWeight: 700, color: r.color }}>{r.fy27}</span>
              </div>
              <div style={{ fontSize: "10px", color: C.textMuted, fontFamily: F, marginTop: "4px", fontStyle: "italic" }}>{r.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "16px", background: C.ujaLight, border: `1px solid ${C.uja}22`, borderRadius: "8px", padding: "20px" }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.ujaDark, marginBottom: "14px", fontWeight: 700, fontFamily: F }}>Israel Allocation Context</div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Total Since Oct 7", value: "$325M", sub: "IEF + Annual + Special Projects" },
            { label: "IEF Deployed", value: "$220M", sub: "Fully spent by end of FY26" },
            { label: "FY27 Special Projects", value: "$17M", sub: "Flexible deployment from reserves" },
            { label: "Iran War Emergency", value: "$2M", sub: "Initial response — budget has flexibility" },
          ].map((item, i) => (
            <div key={i} style={{ flex: "1 1 170px" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: C.navy, fontFamily: FS }}>{item.value}</div>
              <div style={{ fontSize: "12px", color: C.navy, fontWeight: 600, fontFamily: F }}>{item.label}</div>
              <div style={{ fontSize: "11px", color: C.textMuted, fontFamily: F }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SourcesView = () => {
  const srcData = [
    { name: "Annual Campaign", value: 182.0, fill: C.uja, desc: "Of the $225M campaign target, $186.5M is unrestricted and $38.5M is donor-designated (flows to Targeted Sources). Net of event sponsorship (+$1M), event revenue (+$4M), and direct event costs (−$9.5M) = $182.0M." },
    { name: "Targeted Sources", value: 26.5, fill: "#2980b9", desc: "Restricted and designated gifts directed to specific programs or initiatives, both within and outside the Planning Department" },
    { name: "Endowments & Other", value: 76.6, fill: "#8e44ad", desc: "Endowment spending policy draws ($42.3M), Day School Challenge Fund ($4.2M), legacies & bequests ($20M), investment income ($8.4M), and other" },
    { name: "Other Sources", value: 44.9, fill: "#e67e22", desc: "Special allocation for Jewish Life ($7.5M), unallocated reserves ($4M), imputed rent ($27M — fair market value of free rent to agencies), FY25 reserve draw ($5.4M), and appropriation reserve ($1M)" },
  ];

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <Hdr title="Sources & Uses of Funds" sub="FY27 total budget: $330.0M (balanced — zero unallocated surplus)" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "14px", fontFamily: F }}>Sources — Where It Comes From</div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={srcData} layout="vertical" barSize={26}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} horizontal={false} />
                <XAxis type="number" tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} tickFormatter={v => `$${v}M`} />
                <YAxis type="category" dataKey="name" tick={{ fill: C.textSecondary, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} width={120} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="value" name="FY27" radius={[0, 4, 4, 0]}>
                  {srcData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "10px", marginTop: "6px" }}>
            {srcData.map((s, i) => (
              <div key={i} style={{ padding: "6px 0", borderBottom: i < 3 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.fill, flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: C.navy, fontFamily: F }}>{s.name}: ${s.value.toFixed(1)}M</span>
                </div>
                <div style={{ fontSize: "11px", color: C.textMuted, fontFamily: F, marginLeft: "14px", lineHeight: 1.4, marginTop: "2px" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "14px", fontFamily: F }}>Uses — Where It Goes</div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={usesData} layout="vertical" barSize={26}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} horizontal={false} />
                <XAxis type="number" tick={{ fill: C.textMuted, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} tickFormatter={v => `$${v}M`} />
                <YAxis type="category" dataKey="name" tick={{ fill: C.textSecondary, fontSize: 11, fontFamily: F }} axisLine={{ stroke: C.border }} width={120} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="fy27" name="FY27" radius={[0, 4, 4, 0]}>
                  {usesData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "10px", marginTop: "6px" }}>
            {[
              { color: C.uja, label: "Grants & Programs: $232.4M", desc: "All grant making, direct programs, special projects ($27M), imputed rent ($27M), and unallocated resources across 7 impact areas" },
              { color: "#e67e22", label: "Admin Budget: $89.1M", desc: "Salaries & benefits ($67.8M) + OTPS ($21.3M). Includes $17.9M program-related; $71.2M for fundraising, finance, IT, marketing, and executive" },
              { color: "#8e44ad", label: "Capital: $3.2M", desc: "IT systems & hardware ($1.7M), bathroom renovations ($0.5M), conference rooms ($0.4M), AV ($0.4M), building upgrades ($0.2M)" },
              { color: "#2980b9", label: "Bldg Reserve & Other: $2.3M", desc: "Annual maintenance reserve contribution ($1.25M) for the 59th St building, mandated by the Board in 2004. Reserve balance: ~$13.5M" },
              { color: "#a0aec0", label: "Debt Service: $3.0M", desc: "Net outflow on 59th St building bonds less tenant rental income. Flat year-over-year" },
            ].map((u, i) => (
              <div key={i} style={{ padding: "6px 0", borderBottom: i < 4 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: u.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: C.navy, fontFamily: F }}>{u.label}</span>
                </div>
                <div style={{ fontSize: "11px", color: C.textMuted, fontFamily: F, marginLeft: "14px", lineHeight: 1.4, marginTop: "2px" }}>{u.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Hdr title="FY26 → FY27 Change Bridge" sub="Total budget decreased from $391.5M to $330.0M — all figures are FY27 vs FY26 budgeted" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Sources side */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "14px", fontFamily: F }}>Changes in Sources (−$61.5M net)</div>

          {/* Section: Unrestricted Campaign */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px", borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "4px" }}>Unrestricted Annual Campaign Sources: +$2.5M</div>
            {[
              { label: "Annual Campaign pledges", fy26: "$184.7M", fy27: "$186.5M", delta: "+$1.8M", note: "Budgeted growth reflects sustained post-Oct 7 giving levels" },
              { label: "Event sponsorship revenue", fy26: "$1.0M", fy27: "$1.0M", delta: "—", note: "Flat year-over-year" },
              { label: "Fundraising events & missions", fy26: "$4.8M", fy27: "$4.0M", delta: "−$0.8M", note: "Fewer large-scale events planned for FY27" },
              { label: "Less: direct event & mission costs", fy26: "($11.0M)", fy27: "($9.5M)", delta: "+$1.5M", note: "Savings from reduced event portfolio" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "5px 0 5px 8px", borderLeft: `2px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: C.text, fontFamily: F }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: r.delta.startsWith("+") ? C.positive : r.delta === "—" ? C.textMuted : C.negative, fontFamily: F }}>{r.delta}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>
                  <span>{r.note}</span>
                  <span>{r.fy26} → {r.fy27}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Targeted */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px", borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "4px" }}>Targeted Sources: +$7.1M</div>
            {[
              { label: "Targeted funds (Planning Dept)", fy26: "$3.9M", fy27: "$8.4M", delta: "+$4.5M", note: "Growth in restricted gifts directed to specific programs" },
              { label: "Targeted funds (outside Planning)", fy26: "$15.5M", fy27: "$18.1M", delta: "+$2.6M", note: "Includes FRD, marketing, and other department-directed gifts" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "5px 0 5px 8px", borderLeft: `2px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: C.text, fontFamily: F }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: C.positive, fontFamily: F }}>{r.delta}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>
                  <span>{r.note}</span>
                  <span>{r.fy26} → {r.fy27}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Endowment */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px", borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "4px" }}>Endowment, Bequests, Investment & Other: +$1.1M</div>
            {[
              { label: "Endowment spending policy draws", fy26: "$41.8M", fy27: "$42.3M", delta: "+$0.5M", note: "Per spending policy — reflects portfolio growth" },
              { label: "Day School Challenge Fund", fy26: "$4.1M", fy27: "$4.2M", delta: "+$0.1M", note: "Matched funding for day school tuition assistance" },
              { label: "Legacies & bequests", fy26: "$20.0M", fy27: "$20.0M", delta: "—", note: "Per policy — conservative annual budget assumption" },
              { label: "Investment income (unrestricted)", fy26: "$7.9M", fy27: "$8.4M", delta: "+$0.5M", note: "Higher returns on unrestricted investment portfolio" },
              { label: "NAIL distribution & service income", fy26: "$1.7M", fy27: "$1.7M", delta: "—", note: "Former captive insurance distribution + service fees" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "5px 0 5px 8px", borderLeft: `2px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: C.text, fontFamily: F }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: r.delta.startsWith("+") ? C.positive : C.textMuted, fontFamily: F }}>{r.delta}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>
                  <span>{r.note}</span>
                  <span>{r.fy26} → {r.fy27}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Other Sources — the big movers */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px", borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "4px" }}>Other Sources: −$72.2M</div>
            {[
              { label: "Israel & Other Emergency Grants", fy26: "$53.4M", fy27: "$0", delta: "−$53.4M", note: "IEF fully spent down — largest single driver of the overall decrease", highlight: true },
              { label: "FY25 Unallocated Reserves draw", fy26: "$16.4M", fy27: "$5.4M", delta: "−$11.0M", note: "Lower available surplus from prior year to carry forward", highlight: true },
              { label: "Use of Unallocated Resources", fy26: "$8.3M", fy27: "$4.0M", delta: "−$4.3M", note: "Per policy — reduced draw on accumulated reserves" },
              { label: "IT grant system (former captive)", fy26: "$2.5M", fy27: "$0", delta: "−$2.5M", note: "One-time: Salesforce grants portal now fully implemented" },
              { label: "Oct 7 Emergency Draw", fy26: "$0.8M", fy27: "$0", delta: "−$0.8M", note: "One-time emergency appropriation in FY26 — not recurring" },
              { label: "Special Allocation for Jewish Life", fy26: "$8.0M", fy27: "$7.5M", delta: "−$0.5M", note: "Final year of 3-year, $25M investment in Jewish engagement" },
              { label: "Imputed rent (FMV to agencies)", fy26: "$26.7M", fy27: "$27.0M", delta: "+$0.3M", note: "Fair rental value of subsidized space for core partners" },
              { label: "Appropriation Reserve", fy26: "$1.0M", fy27: "$1.0M", delta: "—", note: "Standing reserve for mid-year appropriation adjustments" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "5px 0 5px 8px", borderLeft: `2px solid ${r.highlight ? C.negative : C.borderLight}`, background: r.highlight ? C.negativeBg : "transparent", borderRadius: r.highlight ? "0 4px 4px 0" : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: C.text, fontFamily: F, fontWeight: r.highlight ? 600 : 400 }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: r.delta.startsWith("+") ? C.positive : r.delta === "—" ? C.textMuted : C.negative, fontFamily: F }}>{r.delta}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>
                  <span>{r.note}</span>
                  <span>{r.fy26} → {r.fy27}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: `2px solid ${C.uja}` }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: C.uja, fontFamily: F }}>Net Change in Sources</span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: C.negative, fontFamily: FS }}>−$61.5M</span>
          </div>
        </div>

        {/* Uses side */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "14px", fontFamily: F }}>Changes in Uses (−$61.5M net)</div>

          {/* Grants */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px", borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "4px" }}>Grants & Direct Programs: −$65.2M</div>
            {[
              { label: "Global Crisis (IEF wind-down)", delta: "−$59.6M", note: "IEF fully spent; Ukraine EF ending — some work transitions to Israel committees", highlight: true },
              { label: "Fortifying NY Infrastructure", delta: "−$5.5M", note: "Lower Special Projects dollars available; offset by IDC increase (15% → 20%)" },
              { label: "Combat Poverty", delta: "−$1.2M", note: "Uplift incubator concluding — Brooklyn & Queens Hubs now in steady-state operations" },
              { label: "Mental Health & Wellness", delta: "−$0.8M", note: "CUNY Hillel Hub grants winding down — now sustained by foundation partners" },
              { label: "Inclusive Communities", delta: "−$0.4M", note: "Israel committee restructuring shifts funding to mental health and identity" },
              { label: "Confront Antisemitism", delta: "+$1.3M", note: "Additional CSI security funding + Nonprofit Security Grant Program support", positive: true },
              { label: "Deepen Jewish Identity", delta: "+$0.9M", note: "Young adult study launch + continued Israel education investment", positive: true },
            ].map((r, i) => (
              <div key={i} style={{ padding: "5px 0 5px 8px", borderLeft: `2px solid ${r.positive ? C.positive : r.highlight ? C.negative : C.borderLight}`, background: r.highlight ? C.negativeBg : r.positive ? C.positiveBg : "transparent", borderRadius: (r.highlight || r.positive) ? "0 4px 4px 0" : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: C.text, fontFamily: F, fontWeight: r.highlight ? 600 : 400 }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: r.delta.startsWith("+") ? C.positive : C.negative, fontFamily: F }}>{r.delta}</span>
                </div>
                <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>{r.note}</div>
              </div>
            ))}
          </div>

          {/* Admin */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px", borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "4px" }}>Administrative Budget: +$6.6M (8.0%)</div>
            {[
              { label: "Salaries & benefits increase", delta: "+$4.9M", note: "3.5% + 3.0% union raises, benefit rate 34.8%→35.5%, 3 new positions, lower turnover allowance" },
              { label: "OTPS increase", delta: "+$1.7M", note: "CEO transition ($0.5M), CVA legal ($0.4M), LI/Westchester offices ($0.3M), building & tech ($0.5M)" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "5px 0 5px 8px", borderLeft: `2px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: C.text, fontFamily: F }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: C.negative, fontFamily: F }}>{r.delta}</span>
                </div>
                <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>{r.note}</div>
              </div>
            ))}
          </div>

          {/* Capital & Other */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, marginBottom: "6px", borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "4px" }}>Capital & Other Non-Grant: −$2.9M</div>
            {[
              { label: "Capital expenditures", delta: "−$3.2M", note: "FY26 included grants portal ($2.5M) and LI office relocation ($1.4M) — both completed. FY27 is IT, AV, and bathroom renovations.", positive: true },
              { label: "Building maintenance reserve", delta: "+$0.3M", note: "Annual contribution now $1.25M (up from $1.0M since FY25). Reserve balance: ~$13.5M at end of FY26." },
              { label: "Net debt service (59th St)", delta: "—", note: "Flat at $3.0M — bond payments less rental income from building tenants" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "5px 0 5px 8px", borderLeft: `2px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: C.text, fontFamily: F }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: r.delta.startsWith("+") ? C.negative : r.delta === "—" ? C.textMuted : C.positive, fontFamily: F }}>{r.delta}</span>
                </div>
                <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F }}>{r.note}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: `2px solid ${C.uja}` }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: C.uja, fontFamily: F }}>Net Change in Uses</span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: C.navy, fontFamily: FS }}>−$61.5M</span>
          </div>
        </div>
      </div>

      {/* Bottom summary */}
      <div style={{ background: C.ujaLight, border: `1px solid ${C.uja}22`, borderRadius: "8px", padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: C.navy, fontFamily: F }}>Budget remains balanced at $330.0M — zero deficit, zero surplus</div>
            <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F, marginTop: "3px" }}>
              The $61.5M decrease is primarily structural (IEF spend-down, lower reserves) rather than programmatic. Core annual grant making is essentially flat, with new investments in antisemitism, Jewish identity, and the Keystone Initiative offset by the conclusion of one-time emergency and start-up funding.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminView = () => (
  <div style={{ animation: "fadeIn 0.4s ease" }}>
    <Hdr title="Administrative Budget Deep Dive" sub="$89.1M total — up $6.6M (8.0%)" />

    {/* Key Ratios */}
    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "28px" }}>
      <RatioCard label="Overhead Ratio" value="22%" benchmark="$71.2M non-program ÷ $321.5M total" note="Down from UJA historical ~25%" accent="#27ae60"
        national={{ status: "above", threshold: "Charity Navigator: ≤30%. CharityWatch 'highly efficient': ≤25%", source: "Charity Navigator / CharityWatch" }} />
      <RatioCard label="Fundraising Efficiency" value="$0.13" benchmark="Cost to raise each $1 of campaign" note="$28.6M FRD cost ÷ $225M campaign" accent={C.uja}
        national={{ status: "above", threshold: "Top rating threshold: <$0.20 per $1 raised", source: "Charity Navigator" }} />
      <RatioCard label="Cost per FTE" value="$223K" benchmark="Admin budget $89.1M ÷ 399 admin staff" note="Excludes 17 direct program staff funded from the $4.7M grants line" accent={C.navy} />
    </div>

    {/* Combined Department View */}
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", marginBottom: "28px" }}>
      <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.textMuted, marginBottom: "16px", fontFamily: F }}>Administrative Budget by Department — $89.1M across 399 staff (excl. vacancy allowance)</div>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr 80px 80px 80px", gap: "8px", padding: "0 0 8px", borderBottom: `2px solid ${C.border}`, marginBottom: "4px" }}>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F }}>Department</div>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F }}>Budget ($M)</div>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F }}>Headcount</div>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F, textAlign: "right" }}>$/FTE</div>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F, textAlign: "right" }}>% Budget</div>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F, textAlign: "right" }}>% Staff</div>
      </div>

      {/* Department rows */}
      {adminData.map((d, i) => {
        const maxBudget = 28.6;
        const maxHC = 157;
        const cph = Math.round(d.amount / d.headcount * 1000);
        const pctBudget = (d.amount / 90.4 * 100).toFixed(1);
        const pctStaff = (d.headcount / 399 * 100).toFixed(1);
        const budgetBarPct = (d.amount / maxBudget * 100);
        const hcBarPct = (d.headcount / maxHC * 100);
        const isTopCPH = cph > 220;

        return (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr 1fr 80px 80px 80px",
            gap: "8px",
            padding: "10px 0",
            borderBottom: i < adminData.length - 1 ? `1px solid ${C.borderLight}` : "none",
            alignItems: "center",
          }}>
            {/* Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: C.navy, fontFamily: F }}>{d.name}</div>
              </div>
            </div>

            {/* Budget bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: 16, background: C.bgSoft, borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${budgetBarPct}%`, height: "100%", background: d.color, borderRadius: "3px", transition: "width 0.6s ease" }} />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: F, minWidth: "42px", textAlign: "right" }}>${d.amount}M</span>
            </div>

            {/* Headcount bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: 16, background: C.bgSoft, borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${hcBarPct}%`, height: "100%", background: d.color, opacity: 0.5, borderRadius: "3px", transition: "width 0.6s ease" }} />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: C.textSecondary, fontFamily: F, minWidth: "30px", textAlign: "right" }}>{d.headcount}</span>
            </div>

            {/* Cost per FTE */}
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: isTopCPH ? "#e67e22" : C.navy, fontFamily: F }}>${cph}K</span>
            </div>

            {/* % of budget */}
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F }}>{pctBudget}%</span>
            </div>

            {/* % of staff */}
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F }}>{pctStaff}%</span>
            </div>
          </div>
        );
      })}

      {/* Vacancy allowance row */}
      <div style={{
        display: "grid", gridTemplateColumns: "160px 1fr 1fr 80px 80px 80px", gap: "8px",
        padding: "8px 0", borderTop: `1px solid ${C.border}`, marginTop: "4px", alignItems: "center",
      }}>
        <div style={{ fontSize: "12px", color: C.textMuted, fontFamily: F, fontStyle: "italic" }}>Vacancy Allowance</div>
        <div style={{ fontSize: "12px", color: C.negative, fontWeight: 600, fontFamily: F }}>−$1.3M</div>
        <div />
        <div />
        <div />
        <div />
      </div>

      {/* Total row */}
      <div style={{
        display: "grid", gridTemplateColumns: "160px 1fr 1fr 80px 80px 80px", gap: "8px",
        padding: "10px 0 0", borderTop: `2px solid ${C.navy}`, marginTop: "4px", alignItems: "center",
      }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: F }}>Total Admin</div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: F }}>$89.1M</div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: F }}>399</div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: F, textAlign: "right" }}>$223K</div>
        <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F, textAlign: "right" }}>100%</div>
        <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F, textAlign: "right" }}>100%</div>
      </div>

      {/* Insight callouts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginTop: "16px", paddingTop: "14px", borderTop: `1px solid ${C.borderLight}` }}>
        <div style={{ background: C.bgSoft, borderRadius: "6px", padding: "10px 12px" }}>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F, marginBottom: "4px" }}>Highest Cost / FTE</div>
          <div style={{ fontSize: "12px", color: C.navy, fontFamily: F, lineHeight: 1.45 }}>
            <strong>Finance ($313K)</strong>, <strong>Executive ($297K)</strong>, and <strong>Marketing ($279K)</strong> have the highest cost per FTE — reflecting 59th St building costs, event management, legal fees, and marketing production, not just personnel.
          </div>
        </div>
        <div style={{ background: C.bgSoft, borderRadius: "6px", padding: "10px 12px" }}>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F, marginBottom: "4px" }}>Largest Department</div>
          <div style={{ fontSize: "12px", color: C.navy, fontFamily: F, lineHeight: 1.45 }}>
            <strong>FRD</strong> commands 32% of budget and 39% of staff — appropriate given UJA's revenue model is driven by relationship-based fundraising across regional offices.
          </div>
        </div>
        <div style={{ background: C.bgSoft, borderRadius: "6px", padding: "10px 12px" }}>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: C.textMuted, fontFamily: F, marginBottom: "4px" }}>Budget vs. Staff Spread</div>
          <div style={{ fontSize: "12px", color: C.navy, fontFamily: F, lineHeight: 1.45 }}>
            Planning (CPO) takes 10% of budget but 12% of staff ($196K/FTE) — the leanest department, consistent with its grant oversight and government relations mission.
          </div>
        </div>
      </div>
    </div>

    <Hdr title="Key Cost Drivers" sub="Breakdown of the $6.6M increase" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <div style={{ width: 4, height: 18, borderRadius: 2, background: C.uja }} />
          <div style={{ fontSize: "14px", fontWeight: 700, color: C.navy, fontFamily: F }}>Salaries & Benefits: +$4.9M</div>
        </div>
        <div style={{ fontSize: "11.5px", color: C.textSecondary, fontFamily: F, marginBottom: "10px", lineHeight: 1.5 }}>
          Salaries and fringe benefits total $67.8M (76% of admin budget). UJA employs 416 staff, of which approximately one-third are covered by a collective bargaining agreement.
        </div>
        {[
          { label: "3.5% salary increase (Feb 2026)", detail: "Union contract provision" },
          { label: "3.0% salary increase (Feb 2027)", detail: "Union contract provision" },
          { label: "Benefit rate: 34.8% → 35.5%", detail: "Driven by higher medical costs" },
          { label: "3 new positions added", detail: "Israel Field Coord, Grant Eval, Digital Content Dir" },
          { label: "Turnover allowance: 3% → 2%", detail: "Reflects lower actual turnover rates" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 4 ? `1px solid ${C.borderLight}` : "none" }}>
            <span style={{ fontSize: "12.5px", color: C.text, fontFamily: F }}>{item.label}</span>
            <span style={{ fontSize: "11px", color: C.textMuted, fontFamily: F, textAlign: "right", maxWidth: "45%" }}>{item.detail}</span>
          </div>
        ))}
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <div style={{ width: 4, height: 18, borderRadius: 2, background: "#e67e22" }} />
          <div style={{ fontSize: "14px", fontWeight: 700, color: C.navy, fontFamily: F }}>OTPS: +$1.7M (8.5%)</div>
        </div>
        <div style={{ fontSize: "11.5px", color: C.textSecondary, fontFamily: F, marginBottom: "10px", lineHeight: 1.5 }}>
          Other Than Personnel Services totals $21.3M (24% of admin budget). Covers rent, legal, technology, consulting, marketing, events, and building operations.
        </div>
        {[
          { label: "CEO transition", value: "+$0.5M", detail: "Search, onboarding, and interim leadership costs for executive succession" },
          { label: "CVA legal defense", value: "+$0.4M", detail: "Coverage and defense counsel for Child Victims Act cases" },
          { label: "LI & Westchester offices", value: "+$0.3M", detail: "New Long Island lease + loss of Westchester subtenant" },
          { label: "59th St building", value: "+$0.2M", detail: "Higher maintenance and operating costs for headquarters" },
          { label: "Salesforce & software", value: "+$0.1M", detail: "CRM platform licensing and consulting" },
          { label: "Civic engagement marketing", value: "+$0.1M", detail: "New initiative: marketing for civic engagement programs" },
          { label: "Inflationary pressures", value: "+$0.1M", detail: "General cost increases across vendors and services" },
        ].map((item, i) => (
          <div key={i} style={{ padding: "6px 0", borderBottom: i < 6 ? `1px solid ${C.borderLight}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12.5px", color: C.text, fontFamily: F }}>{item.label}</span>
              <span style={{ fontSize: "12px", color: "#e67e22", fontWeight: 700, fontFamily: F }}>{item.value}</span>
            </div>
            <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F, marginTop: "1px" }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Capital Budget */}
    <div style={{ marginTop: "24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: C.navy, fontFamily: F }}>Capital Budget: $3.2M</div>
          <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: F }}>Down $3.2M — FY26 included $2.5M grants portal and $1.4M LI office relocation, both now complete</div>
        </div>
        <ChgBadge value={-3.2} pct={-50} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
        {[
          { label: "IT Hardware, Website & Systems", value: "$1.7M", detail: "Hardware refresh, website upgrade, and system implementation across departments", pct: "53%" },
          { label: "Bathroom Renovations", value: "$0.5M", detail: "Two additional floors at 59th St headquarters — continuing phased building refresh", pct: "16%" },
          { label: "Conference Rooms", value: "$0.4M", detail: "Furniture replacement and network upgrades for meeting spaces", pct: "13%" },
          { label: "AV Upgrades", value: "$0.4M", detail: "Audio-visual system modernization for hybrid meeting capability", pct: "13%" },
          { label: "Building Upgrades", value: "$0.2M", detail: "Miscellaneous 59th St building infrastructure improvements", pct: "6%" },
        ].map((item, i) => (
          <div key={i} style={{ background: C.bgSoft, border: `1px solid ${C.borderLight}`, borderRadius: "6px", padding: "12px" }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: C.uja, fontFamily: FS }}>{item.value}</div>
            <div style={{ fontSize: "10px", color: C.textMuted, fontFamily: F, marginBottom: "4px" }}>{item.pct} of capex</div>
            <div style={{ fontSize: "11.5px", color: C.navy, fontWeight: 600, fontFamily: F, marginBottom: "3px" }}>{item.label}</div>
            <div style={{ fontSize: "10.5px", color: C.textMuted, fontFamily: F, lineHeight: 1.4 }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ===== APP =====
export default function App() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { label: "Executive Summary", view: <ExecView /> },
    { label: "Impact Areas", view: <ImpactView /> },
    { label: "Geographic View", view: <GeoView /> },
    { label: "Sources & Uses", view: <SourcesView /> },
    { label: "Admin Budget", view: <AdminView /> },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bgSoft, color: C.text, fontFamily: F }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.border}`, padding: "0 40px" }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${C.uja} 0%, ${C.ujaMid} 50%, ${C.uja} 100%)`, margin: "0 -40px" }} />
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "22px 0 18px" }}>
          <div>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2.5px", color: C.uja, fontWeight: 700, fontFamily: F }}>UJA-Federation of New York</div>
            <h1 style={{ fontSize: "26px", fontWeight: 400, fontFamily: FS, color: C.navy, marginTop: "2px" }}>FY2027 Operating Budget</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: C.textMuted, fontFamily: F }}>Presented to the Executive Committee</div>
            <div style={{ fontSize: "12px", color: C.textSecondary, fontWeight: 600, fontFamily: F }}>March 23, 2026</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "4px", padding: "12px 40px", background: "#fff", borderBottom: `1px solid ${C.border}`, overflowX: "auto" }}>
        {tabs.map((t, i) => <TabBtn key={i} active={tab === i} onClick={() => setTab(i)}>{t.label}</TabBtn>)}
      </div>
      <div style={{ padding: "28px 40px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        {tabs[tab].view}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, background: "#fff", padding: "14px 40px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: C.textMuted, fontFamily: F }}>
        <span>Confidential — For Executive Committee Use Only</span>
        <span>Data: Memo — Operating Budget FY2027 & Appendices 1–3</span>
      </div>
    </div>
  );
}
