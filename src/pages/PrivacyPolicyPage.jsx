import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import { useState } from 'react';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar homeMobileMenu />
      <HomeNavbar openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} navigate={navigate} />

      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-5">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Your privacy matters to us. We collect only the information required to provide services, process requests, and improve your experience.</p>
          <p className="text-gray-600 mb-4">By using CoBrother, you consent to our collection and use of information in accordance with this policy. We do not sell your personal information to third parties.</p>
          <p className="text-gray-600">For data-related requests, contact us through the official support channels listed on our website.</p>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
