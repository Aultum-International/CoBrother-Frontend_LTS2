import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, Mail, Clock, ChevronRight } from 'lucide-react';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const lastUpdated = 'Feb 7, 2026';

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'data-we-collect', title: 'Data we collect' },
    { id: 'how-we-use', title: 'How we use data' },
    { id: 'sharing', title: 'Sharing & disclosures' },
    { id: 'cookies', title: 'Cookies & analytics' },
    { id: 'retention', title: 'Retention' },
    { id: 'security', title: 'Security' },
    { id: 'rights', title: 'Your rights (India DPDP)' },
    { id: 'children', title: "Children's data" },
    { id: 'contact', title: 'Contact & grievances' },
    { id: 'changes', title: 'Changes to this policy' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopNavbar homeMobileMenu />
      <HomeNavbar openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} navigate={navigate} />

      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 pt-3">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-24 left-1/4 h-72 sm:h-80 md:h-96 w-72 sm:w-80 md:w-96 rounded-full bg-indigo-300/30 blur-3xl"
            animate={{ x: [0, 40, -20, 0], y: [0, -20, 20, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-24 right-1/4 h-72 sm:h-80 md:h-96 w-72 sm:w-80 md:w-96 rounded-full bg-sky-300/25 blur-3xl"
            animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 10, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-slate-50/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center mb-8 sm:mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50 px-4 py-2 mb-5 shadow-sm">
              <Shield className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-800">Privacy Policy</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 font-display text-slate-900">
              <span className="text-slate-800">Your data,</span>{' '}
              <span className="text-indigo-600">handled with care</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              This Privacy Policy explains how <span className="text-slate-900 font-semibold">CoBrother?</span> (&apos;we&apos;, &apos;us&apos;) collects,
              uses, and protects your information when you use our website and services.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <Clock className="h-4 w-4 text-slate-500" /> Last updated: <span className="font-medium text-slate-900">{lastUpdated}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <FileText className="h-4 w-4 text-slate-500" /> Read time: ~5 minutes
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mt-10">
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-lg shadow-slate-200/50">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">On this page</h2>
                <ul className="space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button type="button" onClick={() => scrollTo(s.id)} className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition">
                        <span className="truncate">{s.title}</span>
                        <ChevronRight className="h-4 w-4 text-slate-400 opacity-80 group-hover:text-indigo-600 group-hover:opacity-100 transition" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/40">
                <PolicySection id="overview" title="1) Overview">
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">CoBrother? is a SaaS-enabled platform that helps founders and businesses with domains, compliance, and operational support. This policy applies to our website, our communications, and any forms you submit to us.</p>
                </PolicySection>
                <PolicySection id="data-we-collect" title="2) Data we collect">
                  <ul className="text-slate-600 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>Contact data: name, email, phone number, company name.</li>
                    <li>Communication data: messages you send through forms, email, or chat.</li>
                    <li>Service data: details you provide to request startup/compliance/business support.</li>
                    <li>Technical data: device/browser info, IP address, basic logs.</li>
                  </ul>
                </PolicySection>
                <PolicySection id="how-we-use" title="3) How we use data">
                  <ul className="text-slate-600 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>To respond to inquiries and provide requested services.</li>
                    <li>To schedule calls/meetings and support delivery.</li>
                    <li>To improve our website, offerings, and user experience.</li>
                    <li>To prevent fraud, abuse, and security incidents.</li>
                  </ul>
                </PolicySection>
                <PolicySection id="sharing" title="4) Sharing & disclosures">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">We may share personal data with trusted service providers only as needed to run our services.</p>
                </PolicySection>
                <PolicySection id="cookies" title="5) Cookies & analytics"><p className="text-slate-600 text-sm sm:text-base leading-relaxed">We may use cookies or similar technologies for basic site functionality, security, and analytics.</p></PolicySection>
                <PolicySection id="retention" title="6) Retention"><p className="text-slate-600 text-sm sm:text-base leading-relaxed">We keep personal data only as long as needed for the purposes described above unless retention is required by law.</p></PolicySection>
                <PolicySection id="security" title="7) Security"><p className="text-slate-600 text-sm sm:text-base leading-relaxed">We use reasonable safeguards to protect personal data.</p></PolicySection>
                <PolicySection id="rights" title="8) Your rights (India DPDP)"><p className="text-slate-600 text-sm sm:text-base leading-relaxed">You may request access, correction, or erasure and use grievance redressal mechanisms.</p></PolicySection>
                <PolicySection id="children" title="9) Children's data"><p className="text-slate-600 text-sm sm:text-base leading-relaxed">Our services are not intended for children.</p></PolicySection>
                <PolicySection id="contact" title="10) Contact & grievances">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center gap-2 mb-2"><Mail className="h-4 w-4 text-indigo-600" /><h3 className="text-sm font-semibold text-slate-900">Privacy contact</h3></div>
                      <p className="text-sm text-slate-600">Email: <span className="font-medium text-slate-900">cobrother.com@gmail.com</span></p>
                      <p className="text-sm text-slate-600 mt-1">Phone: <span className="font-medium text-slate-900">080 8575 8575</span></p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">Company details</h3>
                      <p className="text-sm text-slate-600">Legal name: <span className="font-medium text-slate-900">AULTUM INTERNATIONAL (Proprietor: Neminath Surendra Akkole)</span></p>
                      <p className="text-sm text-slate-600 mt-1">Address: <span className="font-medium text-slate-900">Dharwad, Hubballi Karnataka, India</span></p>
                    </div>
                  </div>
                </PolicySection>
                <PolicySection id="changes" title="11) Changes to this policy"><p className="text-slate-600 text-sm sm:text-base leading-relaxed">We may update this Privacy Policy from time to time and update the last updated date.</p></PolicySection>
              </div>
              <div className="h-10" />
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}

function PolicySection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 mt-10 first:mt-0">{title}</h2>
      {children}
      <div className="mt-8 mb-4 border-t border-slate-200" />
    </section>
  );
}
