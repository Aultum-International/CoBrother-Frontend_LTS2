import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import { useState } from 'react';

export default function TermsAndConditionsPage() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar homeMobileMenu />
      <HomeNavbar openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} navigate={navigate} />

      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-5">Terms & Conditions</h1>
          <p className="text-gray-600 mb-4">By accessing and using CoBrother, you agree to comply with our terms, platform policies, and applicable laws.</p>
          <p className="text-gray-600 mb-4">Users are responsible for the accuracy of content submitted, including listings, applications, and profile details.</p>
          <p className="text-gray-600">CoBrother may update these terms at any time. Continued use of the platform indicates acceptance of revised terms.</p>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
