import{b as P,d as T,r as y,p as A,F as B,m as S,j as e,A as H,P as L,s as _,G as E,I as M,a as R,k as F,o as G}from"./index-CX6VvPUf.js";function k(a){return"₹"+Number(a||0).toLocaleString("en-IN",{minimumFractionDigits:2})}function I(a,s="INR"){const r=(s||"INR").toUpperCase();return({INR:"₹",USD:"$",EUR:"€",GBP:"£",AED:"د.إ",SGD:"S$",AUD:"A$",CAD:"C$"}[r]||`${r} `)+Number(a||0).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}function O(){return new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"})}function U(a){return`CB-INV-${String(a||Math.floor(Math.random()*9e4)+1e4).slice(-6).padStart(6,"0")}`}function $({type:a,item:s,user:r={}}){const n=U(s.id),l=s.createdAt?new Date(s.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}):O();let o,p,d,m=[];if(a==="domain")o=`${s.domainName}${s.domainExtension}`,p=s.pricingDemand||"Domain Name Purchase",d=Number(s.askingPrice||0);else{const i=s.software||{};o=i.name||"Software License",p=i.description||"Software Purchase",d=Number(i.price||0),s.coBrotherHelpPaid&&m.push({label:"CoBrother Helper Service",amount:1e3})}const b=s.chargeCurrency||"INR",f=i=>s.amountCharged!=null&&b!=="INR"?I(s.amountCharged,b):k(i),h=d+m.reduce((i,C)=>i+C.amount,0),c=h+0,u=s.amountCharged!=null?I(s.amountCharged,b):f(c),g=a==="domain"?"◇ Domain Purchase":"⟁ Software License",x=a==="domain"?"#e0f2fe":"#ede9fe",w=a==="domain"?"#0369a1":"#6d28d9",j=m.map(i=>`
      <tr>
        <td>${i.label}</td>
        <td class="text-right">${k(i.amount)}</td>
      </tr>
    `).join(""),N=`<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8"/>
  <title>Invoice ${n} — CoBrother</title>
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
      background: ${x};
      color: ${w};
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
        <div class="invoice-number">${n}</div>
        <div class="invoice-date">Date: ${l}</div>
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
      <span class="type-badge">${g}</span>
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
            <div class="item-name">${o}</div>
            <div class="item-desc">${p}</div>
          </td>
          <td class="text-right">${k(d)}</td>
        </tr>
        ${j}
      </tbody>
    </table>
  
    <!-- Totals -->
    <div class="totals">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>${k(h)}</span>
      </div>
      <div class="totals-row">
        <span>GST (18%) <span class="gst-note">*</span></span>
        <span>—</span>
      </div>
      <div class="totals-row bold">
        <span>Total</span>
        <span>${u}</span>
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
  </html>`,t=window.open("","_blank","width=900,height=700");if(!t){alert("Please allow pop-ups for this site to download invoices.");return}t.document.write(N),t.document.close(),t.onload=()=>{setTimeout(()=>{t.focus(),t.print()},600)}}function J(){var N;const{formatPrice:a}=P(),s=T(),[r,n]=y.useState("all"),[l,o]=y.useState([]),[p,d]=y.useState([]),[m,b]=y.useState(!0),[f,h]=y.useState(null),[v,c]=y.useState(null),u={};y.useEffect(()=>{b(!0),Promise.all([A.getMyPurchases().catch(()=>({data:[]})),B.getMyPurchases().catch(()=>({data:[]}))]).then(([t,i])=>{o(S(t.data)),d(S(i.data))}).finally(()=>b(!1))},[]);const g=S(l).filter(t=>t.paymentStatus==="COMPLETED"),x=S(p).filter(t=>t.paymentStatus==="COMPLETED"),w=g.length+x.length,j=r==="domains"?g.map(t=>({...t,_type:"domain"})):r==="software"?x.map(t=>({...t,_type:"software"})):[...g.map(t=>({...t,_type:"domain"})),...x.map(t=>({...t,_type:"software"}))];return e.jsxs(H,{children:[e.jsxs("div",{children:[e.jsx("div",{className:"mb-6",children:e.jsxs("div",{children:[e.jsx("h1",{className:"font-display text-3xl font-bold text-gray-900 m-0",children:"My Purchases"}),e.jsx("p",{className:"text-gray-600 mt-1",children:"All your domain and software purchases in one place."})]})}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",children:[e.jsx(D,{label:"Total Purchases",value:w,iconSrc:L}),e.jsx(D,{label:"Domains",value:g.length,iconSrc:_,color:"#6eadc8"}),e.jsx(D,{label:"Software",value:x.length,iconSrc:E,color:"#a06ec8"}),e.jsx(D,{label:"CoBrother Active",value:x.filter(t=>t.coBrotherHelpPaid).length,iconSrc:M,color:"#6ec896"})]}),e.jsx("div",{className:"flex gap-2 mb-6",children:[{id:"all",label:`All (${w})`},{id:"domains",label:`Domains (${g.length})`},{id:"software",label:`Software (${x.length})`}].map(t=>e.jsx("button",{className:`btn-glow btn-glow-sm ${r===t.id?"bg-gray-900 text-white border-gray-900":""}`,onClick:()=>n(t.id),children:t.label},t.id))}),m?e.jsx("div",{className:"flex items-center justify-center py-20",children:e.jsx("div",{className:"w-12 h-12 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin"})}):j.length===0?e.jsxs("div",{className:"text-center py-20",children:[e.jsx("div",{className:"text-6xl mb-4",children:"🛒"}),e.jsx("h3",{className:"font-display text-2xl font-bold text-gray-900 mb-2",children:"No purchases yet"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"Browse domains and software to make your first purchase."}),e.jsxs("div",{className:"flex gap-3 justify-center",children:[e.jsx("button",{className:"btn-glow btn-glow-sm",onClick:()=>s("/domains"),children:"Browse Domains"}),e.jsx("button",{className:"btn-glow btn-glow-sm",onClick:()=>s("/cocreation"),children:"Browse Software"})]})]}):e.jsx("div",{className:"flex flex-col gap-3.5",children:j.map(t=>t._type==="domain"?e.jsx(q,{domain:t,onDownloadInvoice:()=>$({type:"domain",item:t,user:u})},"d-"+t.id):e.jsx(V,{purchase:t,onGetHelp:()=>h(t),onDownloadInvoice:()=>$({type:"software",item:t,user:u})},"s-"+t.id))})]}),f&&e.jsx(W,{purchase:f,onClose:()=>h(null),onSuccess:t=>{d(i=>i.map(C=>C.id===t.id?t:C)),h(null),c(t)}}),v&&e.jsx("div",{className:"fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn",onClick:()=>c(null),children:e.jsxs("div",{className:"relative w-full max-w-[440px] bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-center animate-slideUp",children:[e.jsx("div",{className:"absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-purple-100/30 blur-3xl pointer-events-none"}),e.jsxs("div",{className:"relative z-10 p-8",children:[e.jsx("div",{className:"text-5xl mb-4",children:"◆"}),e.jsx("h2",{className:"font-display text-[1.75rem] font-semibold text-gray-900 mb-2",children:"CoBrother Help Activated!"}),e.jsxs("p",{className:"text-gray-500 mb-5 leading-relaxed",children:["A CoBrother will reach out within ",e.jsx("strong",{className:"text-purple-600",children:"24 hours"})," ","to help with ",e.jsx("strong",{className:"text-gray-900",children:(N=v.software)==null?void 0:N.name}),"."]}),e.jsxs("div",{className:"px-3.5 py-3 bg-green-500/8 border border-green-500/20 rounded-[10px] mb-6 text-xs text-green-400",children:["✓ ",a(1e3)," paid · CoBrother assigned · Expect contact via email"]}),e.jsx("button",{className:"btn-glow w-full",onClick:()=>c(null),children:"Done"})]})]})})]})}function q({domain:a,onDownloadInvoice:s}){const{formatPrice:r}=P();return e.jsxs("div",{className:"p-5 bg-white border border-gray-200 rounded-xl shadow-sm",children:[e.jsxs("div",{className:"flex justify-between flex-wrap gap-3",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("span",{className:"text-xs font-bold text-sky-700 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded",children:"◇ Domain"}),a.verified&&e.jsx("span",{className:"text-xs font-bold text-green-600",children:"✓ Verified"})]}),e.jsxs("div",{className:"font-bold text-lg text-gray-900",children:[a.domainName,a.domainExtension]}),e.jsx("div",{className:"text-xs text-gray-600",children:a.pricingDemand})]}),e.jsxs("div",{className:"text-right flex flex-col items-end gap-2",children:[e.jsx("div",{className:"font-display text-xl font-bold text-green-600",children:r(a.askingPrice)}),e.jsx("div",{className:"text-xs text-gray-600",children:"✓ Payment Confirmed"}),e.jsx(z,{onClick:s})]})]}),e.jsx("div",{className:"mt-3.5 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-900",children:"⏳ Domain transfer in progress — seller will initiate within 24 hours."})]})}function V({purchase:a,onGetHelp:s,onDownloadInvoice:r}){const{formatPrice:n}=P(),l=a.software||{},o=a.coBrotherHelpPaid,p=a.completionStatus==="CONFIRMED",d=1e3;return e.jsxs("div",{className:`p-5 bg-white rounded-xl shadow-sm ${o?"border border-green-300":"border border-gray-200"}`,children:[e.jsxs("div",{className:"flex justify-between flex-wrap gap-3",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("span",{className:"text-xs font-bold text-purple-700 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded",children:"⟁ Software"}),p&&e.jsx("span",{className:"text-xs font-bold text-green-600",children:"✓ Completed"}),o&&e.jsx("span",{className:"text-xs font-bold text-green-600 bg-green-100 border border-green-200 px-2 py-0.5 rounded",children:"◆ CoBrother Active"})]}),e.jsx("div",{className:"font-bold text-lg text-gray-900",children:l.name||"—"}),l.description&&e.jsx("div",{className:"text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-[400px]",children:l.description})]}),e.jsxs("div",{className:"text-right flex-shrink-0 flex flex-col items-end gap-2",children:[e.jsx("div",{className:"font-display text-xl font-bold text-purple-700",children:n(l.price||0)}),o&&e.jsxs("div",{className:"text-xs text-gray-600",children:["+ ",n(d)," CoBrother"]}),e.jsx("div",{className:"text-xs text-gray-600",children:"✓ Payment Confirmed"}),e.jsx(z,{onClick:r})]})]}),l.githubLink&&e.jsxs("div",{className:"mt-3.5 p-4 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-between",children:[e.jsx("span",{className:"text-xs text-gray-600",children:"🔗 GitHub Repository"}),e.jsx("a",{href:l.githubLink,target:"_blank",rel:"noreferrer",className:"text-xs text-gray-700 font-bold hover:text-gray-900 transition-all duration-200",children:"Open →"})]}),e.jsx("div",{className:"mt-3.5",children:o?e.jsxs("div",{className:"p-4 bg-green-100 border border-green-200 rounded-lg",children:[e.jsx("div",{className:"font-bold text-sm text-green-600 mb-1",children:"◆ CoBrother Helper Assigned"}),e.jsx("div",{className:"text-xs text-gray-600 leading-relaxed",children:"Check your email for introduction details from your assigned CoBrother."})]}):e.jsxs("div",{className:"p-4 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-between flex-wrap gap-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-sm text-purple-700 mb-1",children:"Need help getting started?"}),e.jsx("div",{className:"text-xs text-gray-600 leading-relaxed",children:"Get a dedicated CoBrother to guide you through setup and deployment."})]}),e.jsxs("button",{onClick:s,className:"btn-glow btn-glow-sm",children:["Get Help — ",n(d)]})]})})]})}function z({onClick:a}){return e.jsxs("button",{onClick:a,className:"flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-all duration-200 bg-white hover:bg-gray-50 group",children:[e.jsx("svg",{className:"w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-colors",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M8 1v9m0 0L5 7m3 3 3-3M2 12v2a1 1 0 001 1h10a1 1 0 001-1v-2",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),"Invoice"]})}function W({purchase:a,onClose:s,onSuccess:r}){const{user:n}=R(),{currency:l,formatPrice:o}=P(),p=1e3,[d,m]=y.useState(!1),[b,f]=y.useState(""),h=a.software||{},v=async()=>{var c,u;m(!0),f("");try{const{data:g}=await B.payCoBrotherHelp(a.id,{...F(l)});G({orderData:g,user:n,description:`CoBrother Help — ${h.name}`,themeColor:"#7c3aed",onSuccess:async x=>{try{await B.verifyCoBrotherHelp(a.id,{razorpayPaymentId:x.razorpay_payment_id,razorpayOrderId:x.razorpay_order_id,razorpaySignature:x.razorpay_signature}),r({...a,coBrotherOptIn:!0,coBrotherHelpPaid:!0})}catch{f("Payment verification failed."),m(!1)}},onFailure:()=>{f("Payment failed."),m(!1)},onDismiss:()=>m(!1)})}catch(g){f(((u=(c=g.response)==null?void 0:c.data)==null?void 0:u.error)||"Failed."),m(!1)}};return e.jsx("div",{className:"fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn",onClick:c=>c.target===c.currentTarget&&s(),children:e.jsxs("div",{className:"relative w-full max-w-[500px] bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-center animate-slideUp",children:[e.jsx("div",{className:"absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-purple-100/30 blur-3xl pointer-events-none"}),e.jsxs("div",{className:"relative z-10 p-8",children:[e.jsx("div",{className:"modal-badge",style:{background:"#ede9fe",color:"#7c3aed",border:"1px solid #c4b5fd"},children:"◆ CoBrother Help"}),e.jsx("h2",{children:h.name}),e.jsx("p",{children:"Get a dedicated expert to help you succeed with this software."})]}),e.jsxs("div",{className:"p-8",children:[e.jsx("div",{className:"mb-6",children:["Dedicated CoBrother assigned within 24 hours","Personalised onboarding and setup guidance","Help with deployment, configuration, and integration","Direct communication channel with your helper"].map((c,u)=>e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("span",{className:"text-green-600 text-sm",children:"✓"}),e.jsx("span",{className:"text-gray-600 text-sm leading-relaxed",children:c})]},u))}),e.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg p-4 mb-6",children:[e.jsx("div",{className:"text-xs text-gray-600 font-bold uppercase mb-2",children:"Billing Summary"}),e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsx("span",{className:"text-gray-600 text-sm",children:"Software (already paid)"}),e.jsx("span",{className:"text-gray-600 text-sm",children:o(h.price||0)})]}),e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsx("span",{className:"text-gray-600 text-sm",children:"CoBrother Helper Fee"}),e.jsx("span",{className:"text-gray-600 text-sm font-bold",children:o(p)})]}),e.jsx("div",{className:"h-1 bg-gray-200 mb-2"}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"font-bold text-gray-900 text-sm",children:"Paying Today"}),e.jsx("span",{className:"font-display text-lg font-bold text-purple-700",children:o(p)})]})]}),b&&e.jsx("div",{className:"p-4 bg-red-100 border border-red-200 rounded-lg text-xs text-red-600 mb-6",children:b}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("button",{className:"btn-glow w-full",onClick:v,disabled:d,children:d?e.jsx("span",{className:"w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin inline-block"}):`Pay ${o(p)} — Get Help →`}),e.jsx("button",{className:"btn-glow w-full",onClick:s,children:"Cancel"})]})]})]})})}function D({label:a,value:s,iconSrc:r,color:n="#111827"}){return e.jsxs("div",{className:"p-5 bg-white border border-gray-200 rounded-xl shadow-sm",children:[e.jsx("div",{className:"w-8 h-8 mb-2",children:e.jsx("img",{src:r,alt:a,className:"w-full h-full object-contain"})}),e.jsx("div",{className:"text-2xl font-bold font-display",style:{color:n},children:s}),e.jsx("div",{className:"text-xs text-gray-600 font-semibold mt-1",children:a})]})}export{J as default};
