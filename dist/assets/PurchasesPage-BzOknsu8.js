import{d as z,r as f,l as $,y as k,j as e,A,P as T,m as L,z as H,E as M,a as _,b as E,o as G}from"./index-BGMyPkxC.js";function C(a){return"₹"+Number(a||0).toLocaleString("en-IN",{minimumFractionDigits:2})}function D(a,s="INR"){const r=(s||"INR").toUpperCase();return({INR:"₹",USD:"$",EUR:"€",GBP:"£",AED:"د.إ",SGD:"S$",AUD:"A$",CAD:"C$"}[r]||`${r} `)+Number(a||0).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}function R(){return new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"})}function F(a){return`CB-INV-${String(a||Math.floor(Math.random()*9e4)+1e4).slice(-6).padStart(6,"0")}`}function B({type:a,item:s,user:r={}}){const o=F(s.id),x=s.createdAt?new Date(s.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}):R();let y,g,n,h=[];if(a==="domain")y=`${s.domainName}${s.domainExtension}`,g=s.pricingDemand||"Domain Name Purchase",n=Number(s.askingPrice||0);else{const i=s.software||{};y=i.name||"Software License",g=i.description||"Software Purchase",n=Number(i.price||0),s.coBrotherHelpPaid&&h.push({label:"CoBrother Helper Service",amount:1e3})}const p=s.chargeCurrency||"INR",b=i=>s.amountCharged!=null&&p!=="INR"?D(s.amountCharged,p):C(i),v=n+h.reduce((i,I)=>i+I.amount,0),u=v+0,d=s.amountCharged!=null?D(s.amountCharged,p):b(u),c=a==="domain"?"◇ Domain Purchase":"⟁ Software License",w=a==="domain"?"#e0f2fe":"#ede9fe",j=a==="domain"?"#0369a1":"#6d28d9",N=h.map(i=>`
      <tr>
        <td>${i.label}</td>
        <td class="text-right">${C(i.amount)}</td>
      </tr>
    `).join(""),t=`<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8"/>
  <title>Invoice ${o} — CoBrother</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
  
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
    body {
      font-family: 'DM Sans', sans-serif;
      background: #fff;
      color: #111827;
      font-size: 13px;
      line-height: 1.6;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  
    .page {
      width: 794px;
      min-height: 1123px;
      margin: 0 auto;
      padding: 56px 60px;
      display: flex;
      flex-direction: column;
    }
  
    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 48px;
    }
    .brand-name {
      font-family: 'DM Serif Display', serif;
      font-size: 32px;
      letter-spacing: -0.5px;
      color: #111827;
      line-height: 1;
    }
    .brand-tagline {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .invoice-meta {
      text-align: right;
    }
    .invoice-title {
      font-family: 'DM Serif Display', serif;
      font-size: 22px;
      color: #111827;
      letter-spacing: -0.3px;
    }
    .invoice-number {
      font-size: 12px;
      color: #6b7280;
      margin-top: 2px;
    }
    .invoice-date {
      font-size: 12px;
      color: #6b7280;
    }
  
    /* ── Divider ── */
    .divider {
      height: 1px;
      background: linear-gradient(90deg, #111827 0%, #e5e7eb 100%);
      margin-bottom: 40px;
    }
  
    /* ── Address Block ── */
    .addresses {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-bottom: 40px;
    }
    .address-block .label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 8px;
    }
    .address-block .name {
      font-weight: 700;
      font-size: 14px;
      color: #111827;
      margin-bottom: 2px;
    }
    .address-block p {
      color: #4b5563;
      font-size: 12px;
      line-height: 1.7;
    }
  
    /* ── Badge ── */
    .type-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 20px;
      background: ${w};
      color: ${j};
    }
  
    /* ── Items Table ── */
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
    }
    .items-table thead tr {
      background: #111827;
      color: #fff;
    }
    .items-table thead th {
      padding: 12px 16px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      text-align: left;
    }
    .items-table thead th.text-right { text-align: right; }
    .items-table tbody tr {
      border-bottom: 1px solid #f3f4f6;
    }
    .items-table tbody tr:last-child { border-bottom: none; }
    .items-table tbody td {
      padding: 14px 16px;
      color: #374151;
      vertical-align: top;
    }
    .items-table tbody td.text-right { text-align: right; }
    .item-name {
      font-weight: 700;
      color: #111827;
      font-size: 13px;
      margin-bottom: 2px;
    }
    .item-desc {
      font-size: 11px;
      color: #9ca3af;
    }
  
    /* ── Totals ── */
    .totals {
      margin-left: auto;
      width: 280px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
      color: #4b5563;
    }
    .totals-row.bold {
      font-weight: 700;
      color: #111827;
      font-size: 15px;
      border-top: 2px solid #111827;
      margin-top: 6px;
      padding-top: 10px;
    }
    .totals-row .gst-note {
      font-size: 10px;
      color: #9ca3af;
    }
  
    /* ── Status Banner ── */
    .status-banner {
      margin-top: 40px;
      padding: 16px 20px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #22c55e;
      flex-shrink: 0;
    }
    .status-text {
      font-size: 12px;
      font-weight: 600;
      color: #166534;
    }
  
    /* ── Footer ── */
    .footer {
      margin-top: auto;
      padding-top: 40px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .footer-left {
      font-size: 11px;
      color: #9ca3af;
      line-height: 1.7;
    }
    .footer-right {
      text-align: right;
      font-size: 11px;
      color: #9ca3af;
    }
    .footer-brand {
      font-family: 'DM Serif Display', serif;
      font-size: 16px;
      color: #d1d5db;
      display: block;
      margin-top: 4px;
    }
  
    /* ── Watermark stripe ── */
    .stripe {
      height: 5px;
      background: linear-gradient(90deg, #111827 0%, #6d28d9 50%, #111827 100%);
      margin-bottom: 0;
      border-radius: 0 0 3px 3px;
    }
  
    @media print {
      body { margin: 0; }
      .page { padding: 40px 48px; }
    }
  </style>
  </head>
  <body>
  <div class="stripe"></div>
  <div class="page">
  
    <!-- Header -->
    <div class="header">
      <div>
        <div class="brand-name">CoBrother</div>
        <div class="brand-tagline">Co-build · Co-grow · Co-succeed</div>
      </div>
      <div class="invoice-meta">
        <div class="invoice-title">Tax Invoice</div>
        <div class="invoice-number">${o}</div>
        <div class="invoice-date">Date: ${x}</div>
      </div>
    </div>
  
    <div class="divider"></div>
  
    <!-- Addresses -->
    <div class="addresses">
      <div class="address-block">
        <div class="label">From</div>
        <div class="name">CoBrother Technologies Pvt. Ltd.</div>
        <p>
          [Address Line 1]<br/>
          [City, State – PIN]<br/>
          India<br/>
          GSTIN: [Your GSTIN]<br/>
          contact@cobrother.com
        </p>
      </div>
      <div class="address-block">
        <div class="label">Billed To</div>
        <div class="name">${r.name||"Customer"}</div>
        <p>
          ${r.email||""}<br/>
          ${r.gstin?"GSTIN: "+r.gstin+"<br/>":""}
          ${r.address||""}
        </p>
      </div>
    </div>
  
    <!-- Type Badge -->
    <div>
      <span class="type-badge">${c}</span>
    </div>
  
    <!-- Items Table -->
    <table class="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="item-name">${y}</div>
            <div class="item-desc">${g}</div>
          </td>
          <td class="text-right">${C(n)}</td>
        </tr>
        ${N}
      </tbody>
    </table>
  
    <!-- Totals -->
    <div class="totals">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>${C(v)}</span>
      </div>
      <div class="totals-row">
        <span>GST (18%) <span class="gst-note">*</span></span>
        <span>—</span>
      </div>
      <div class="totals-row bold">
        <span>Total</span>
        <span>${d}</span>
      </div>
    </div>
  
    <!-- Status -->
    <div class="status-banner">
      <div class="status-dot"></div>
      <div class="status-text">Payment Confirmed — Thank you for your purchase!</div>
    </div>
  
    <!-- Footer -->
    <div class="footer">
      <div class="footer-left">
        * GST details will appear once GSTIN configuration is complete.<br/>
        This is a computer-generated invoice and does not require a signature.<br/>
        For queries, write to contact@cobrother.com
      </div>
      <div class="footer-right">
        <span class="footer-brand">CoBrother</span>
        www.cobrother.com
      </div>
    </div>
  
  </div>
  </body>
  </html>`,m=window.open("","_blank","width=900,height=700");if(!m){alert("Please allow pop-ups for this site to download invoices.");return}m.document.write(t),m.document.close(),m.onload=()=>{setTimeout(()=>{m.focus(),m.print()},600)}}function W(){var N;const a=z(),[s,r]=f.useState("all"),[o,x]=f.useState([]),[y,g]=f.useState([]),[n,h]=f.useState(!0),[p,b]=f.useState(null),[v,l]=f.useState(null),u={};f.useEffect(()=>{h(!0),Promise.all([$.getMyPurchases().catch(()=>({data:[]})),k.getMyPurchases().catch(()=>({data:[]}))]).then(([t,m])=>{x(Array.isArray(t.data)?t.data:[]),g(Array.isArray(m.data)?m.data:[])}).finally(()=>h(!1))},[]);const d=o.filter(t=>t.paymentStatus==="COMPLETED"),c=y.filter(t=>t.paymentStatus==="COMPLETED"),w=d.length+c.length,j=s==="domains"?d.map(t=>({...t,_type:"domain"})):s==="software"?c.map(t=>({...t,_type:"software"})):[...d.map(t=>({...t,_type:"domain"})),...c.map(t=>({...t,_type:"software"}))];return e.jsxs(A,{children:[e.jsxs("div",{children:[e.jsx("div",{className:"mb-6",children:e.jsxs("div",{children:[e.jsx("h1",{className:"font-display text-3xl font-bold text-gray-900 m-0",children:"My Purchases"}),e.jsx("p",{className:"text-gray-600 mt-1",children:"All your domain and software purchases in one place."})]})}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",children:[e.jsx(S,{label:"Total Purchases",value:w,iconSrc:T}),e.jsx(S,{label:"Domains",value:d.length,iconSrc:L,color:"#6eadc8"}),e.jsx(S,{label:"Software",value:c.length,iconSrc:H,color:"#a06ec8"}),e.jsx(S,{label:"CoBrother Active",value:c.filter(t=>t.coBrotherHelpPaid).length,iconSrc:M,color:"#6ec896"})]}),e.jsx("div",{className:"flex gap-2 mb-6",children:[{id:"all",label:`All (${w})`},{id:"domains",label:`Domains (${d.length})`},{id:"software",label:`Software (${c.length})`}].map(t=>e.jsx("button",{className:`btn-glow btn-glow-sm ${s===t.id?"bg-gray-900 text-white border-gray-900":""}`,onClick:()=>r(t.id),children:t.label},t.id))}),n?e.jsx("div",{className:"flex items-center justify-center py-20",children:e.jsx("div",{className:"w-12 h-12 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin"})}):j.length===0?e.jsxs("div",{className:"text-center py-20",children:[e.jsx("div",{className:"text-6xl mb-4",children:"🛒"}),e.jsx("h3",{className:"font-display text-2xl font-bold text-gray-900 mb-2",children:"No purchases yet"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"Browse domains and software to make your first purchase."}),e.jsxs("div",{className:"flex gap-3 justify-center",children:[e.jsx("button",{className:"btn-glow btn-glow-sm",onClick:()=>a("/domains"),children:"Browse Domains"}),e.jsx("button",{className:"btn-glow btn-glow-sm",onClick:()=>a("/cocreation"),children:"Browse Software"})]})]}):e.jsx("div",{className:"flex flex-col gap-3.5",children:j.map(t=>t._type==="domain"?e.jsx(O,{domain:t,onDownloadInvoice:()=>B({type:"domain",item:t,user:u})},"d-"+t.id):e.jsx(U,{purchase:t,onGetHelp:()=>b(t),onDownloadInvoice:()=>B({type:"software",item:t,user:u})},"s-"+t.id))})]}),p&&e.jsx(q,{purchase:p,onClose:()=>b(null),onSuccess:t=>{g(m=>m.map(i=>i.id===t.id?t:i)),b(null),l(t)}}),v&&e.jsx("div",{className:"fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn",onClick:()=>l(null),children:e.jsxs("div",{className:"relative w-full max-w-[440px] bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-center animate-slideUp",children:[e.jsx("div",{className:"absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-purple-100/30 blur-3xl pointer-events-none"}),e.jsxs("div",{className:"relative z-10 p-8",children:[e.jsx("div",{className:"text-5xl mb-4",children:"◆"}),e.jsx("h2",{className:"font-display text-[1.75rem] font-semibold text-gray-900 mb-2",children:"CoBrother Help Activated!"}),e.jsxs("p",{className:"text-gray-500 mb-5 leading-relaxed",children:["A CoBrother will reach out within ",e.jsx("strong",{className:"text-purple-600",children:"24 hours"})," ","to help with ",e.jsx("strong",{className:"text-gray-900",children:(N=v.software)==null?void 0:N.name}),"."]}),e.jsx("div",{className:"px-3.5 py-3 bg-green-500/8 border border-green-500/20 rounded-[10px] mb-6 text-xs text-green-400",children:"✓ ₹1,000 paid · CoBrother assigned · Expect contact via email"}),e.jsx("button",{className:"btn-glow w-full",onClick:()=>l(null),children:"Done"})]})]})})]})}function O({domain:a,onDownloadInvoice:s}){return e.jsxs("div",{className:"p-5 bg-white border border-gray-200 rounded-xl shadow-sm",children:[e.jsxs("div",{className:"flex justify-between flex-wrap gap-3",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("span",{className:"text-xs font-bold text-sky-700 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded",children:"◇ Domain"}),a.verified&&e.jsx("span",{className:"text-xs font-bold text-green-600",children:"✓ Verified"})]}),e.jsxs("div",{className:"font-bold text-lg text-gray-900",children:[a.domainName,a.domainExtension]}),e.jsx("div",{className:"text-xs text-gray-600",children:a.pricingDemand})]}),e.jsxs("div",{className:"text-right flex flex-col items-end gap-2",children:[e.jsxs("div",{className:"font-display text-xl font-bold text-green-600",children:["₹",Number(a.askingPrice).toLocaleString("en-IN")]}),e.jsx("div",{className:"text-xs text-gray-600",children:"✓ Payment Confirmed"}),e.jsx(P,{onClick:s})]})]}),e.jsx("div",{className:"mt-3.5 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-900",children:"⏳ Domain transfer in progress — seller will initiate within 24 hours."})]})}function U({purchase:a,onGetHelp:s,onDownloadInvoice:r}){const o=a.software||{},x=a.coBrotherHelpPaid,y=a.completionStatus==="CONFIRMED";return e.jsxs("div",{className:`p-5 bg-white rounded-xl shadow-sm ${x?"border border-green-300":"border border-gray-200"}`,children:[e.jsxs("div",{className:"flex justify-between flex-wrap gap-3",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("span",{className:"text-xs font-bold text-purple-700 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded",children:"⟁ Software"}),y&&e.jsx("span",{className:"text-xs font-bold text-green-600",children:"✓ Completed"}),x&&e.jsx("span",{className:"text-xs font-bold text-green-600 bg-green-100 border border-green-200 px-2 py-0.5 rounded",children:"◆ CoBrother Active"})]}),e.jsx("div",{className:"font-bold text-lg text-gray-900",children:o.name||"—"}),o.description&&e.jsx("div",{className:"text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-[400px]",children:o.description})]}),e.jsxs("div",{className:"text-right flex-shrink-0 flex flex-col items-end gap-2",children:[e.jsxs("div",{className:"font-display text-xl font-bold text-purple-700",children:["₹",Number(o.price||0).toLocaleString("en-IN")]}),x&&e.jsx("div",{className:"text-xs text-gray-600",children:"+ ₹1,000 CoBrother"}),e.jsx("div",{className:"text-xs text-gray-600",children:"✓ Payment Confirmed"}),e.jsx(P,{onClick:r})]})]}),o.githubLink&&e.jsxs("div",{className:"mt-3.5 p-4 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-between",children:[e.jsx("span",{className:"text-xs text-gray-600",children:"🔗 GitHub Repository"}),e.jsx("a",{href:o.githubLink,target:"_blank",rel:"noreferrer",className:"text-xs text-gray-700 font-bold hover:text-gray-900 transition-all duration-200",children:"Open →"})]}),e.jsx("div",{className:"mt-3.5",children:x?e.jsxs("div",{className:"p-4 bg-green-100 border border-green-200 rounded-lg",children:[e.jsx("div",{className:"font-bold text-sm text-green-600 mb-1",children:"◆ CoBrother Helper Assigned"}),e.jsx("div",{className:"text-xs text-gray-600 leading-relaxed",children:"Check your email for introduction details from your assigned CoBrother."})]}):e.jsxs("div",{className:"p-4 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-between flex-wrap gap-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-sm text-purple-700 mb-1",children:"Need help getting started?"}),e.jsx("div",{className:"text-xs text-gray-600 leading-relaxed",children:"Get a dedicated CoBrother to guide you through setup and deployment."})]}),e.jsx("button",{onClick:s,className:"btn-glow btn-glow-sm",children:"Get Help — ₹1,000"})]})})]})}function P({onClick:a}){return e.jsxs("button",{onClick:a,className:"flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-all duration-200 bg-white hover:bg-gray-50 group",children:[e.jsx("svg",{className:"w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-colors",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M8 1v9m0 0L5 7m3 3 3-3M2 12v2a1 1 0 001 1h10a1 1 0 001-1v-2",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),"Invoice"]})}function q({purchase:a,onClose:s,onSuccess:r}){const{user:o}=_(),{currency:x,formatPrice:y}=E(),[g,n]=f.useState(!1),[h,p]=f.useState(""),b=a.software||{},v=async()=>{var l,u;n(!0),p("");try{const{data:d}=await k.payCoBrotherHelp(a.id);G({orderData:{...d,currency:d.currency||x},user:o,description:`CoBrother Help — ${b.name}`,themeColor:"#7c3aed",onSuccess:async c=>{try{await k.verifyCoBrotherHelp(a.id,{razorpayPaymentId:c.razorpay_payment_id,razorpayOrderId:c.razorpay_order_id,razorpaySignature:c.razorpay_signature}),r({...a,coBrotherOptIn:!0,coBrotherHelpPaid:!0})}catch{p("Payment verification failed."),n(!1)}},onFailure:()=>{p("Payment failed."),n(!1)},onDismiss:()=>n(!1)})}catch(d){p(((u=(l=d.response)==null?void 0:l.data)==null?void 0:u.error)||"Failed."),n(!1)}};return e.jsx("div",{className:"fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn",onClick:l=>l.target===l.currentTarget&&s(),children:e.jsxs("div",{className:"relative w-full max-w-[500px] bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-center animate-slideUp",children:[e.jsx("div",{className:"absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-purple-100/30 blur-3xl pointer-events-none"}),e.jsxs("div",{className:"relative z-10 p-8",children:[e.jsx("div",{className:"modal-badge",style:{background:"#ede9fe",color:"#7c3aed",border:"1px solid #c4b5fd"},children:"◆ CoBrother Help"}),e.jsx("h2",{children:b.name}),e.jsx("p",{children:"Get a dedicated expert to help you succeed with this software."})]}),e.jsxs("div",{className:"p-8",children:[e.jsx("div",{className:"mb-6",children:["Dedicated CoBrother assigned within 24 hours","Personalised onboarding and setup guidance","Help with deployment, configuration, and integration","Direct communication channel with your helper"].map((l,u)=>e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("span",{className:"text-green-600 text-sm",children:"✓"}),e.jsx("span",{className:"text-gray-600 text-sm leading-relaxed",children:l})]},u))}),e.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg p-4 mb-6",children:[e.jsx("div",{className:"text-xs text-gray-600 font-bold uppercase mb-2",children:"Billing Summary"}),e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsx("span",{className:"text-gray-600 text-sm",children:"Software (already paid)"}),e.jsxs("span",{className:"text-gray-600 text-sm",children:["₹",Number(b.price||0).toLocaleString("en-IN")]})]}),e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsx("span",{className:"text-gray-600 text-sm",children:"CoBrother Helper Fee"}),e.jsx("span",{className:"text-gray-600 text-sm font-bold",children:"₹1,000"})]}),e.jsx("div",{className:"h-1 bg-gray-200 mb-2"}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"font-bold text-gray-900 text-sm",children:"Paying Today"}),e.jsx("span",{className:"font-display text-lg font-bold text-purple-700",children:"₹1,000"})]})]}),h&&e.jsx("div",{className:"p-4 bg-red-100 border border-red-200 rounded-lg text-xs text-red-600 mb-6",children:h}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("button",{className:"btn-glow w-full",onClick:v,disabled:g,children:g?e.jsx("span",{className:"w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin inline-block"}):"Pay ₹1,000 — Get Help →"}),e.jsx("button",{className:"btn-glow w-full",onClick:s,children:"Cancel"})]})]})]})})}function S({label:a,value:s,iconSrc:r,color:o="#111827"}){return e.jsxs("div",{className:"p-5 bg-white border border-gray-200 rounded-xl shadow-sm",children:[e.jsx("div",{className:"w-8 h-8 mb-2",children:e.jsx("img",{src:r,alt:a,className:"w-full h-full object-contain"})}),e.jsx("div",{className:"text-2xl font-bold font-display",style:{color:o},children:s}),e.jsx("div",{className:"text-xs text-gray-600 font-semibold mt-1",children:a})]})}export{W as default};
