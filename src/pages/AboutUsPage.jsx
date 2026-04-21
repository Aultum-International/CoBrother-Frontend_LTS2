import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import BrandWordmark from '../components/common/BrandWordmark';

export default function AboutUsPage() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar homeMobileMenu />
      <HomeNavbar
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        navigate={navigate}
      />

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight inline-flex items-center gap-3 flex-wrap">
            <span>About</span>
            <BrandWordmark className="h-10 sm:h-12 md:h-14 w-auto" inline alt="CoBrother" />
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-indigo-700">
            We Don&apos;t Just Build Businesses. We Build Disrupters.
          </p>
          <div className="mt-8 space-y-5 text-slate-700 leading-8 text-base sm:text-lg">
            <p className="inline">
              <BrandWordmark className="h-6 sm:h-7 w-auto align-middle inline-block mr-1" inline alt="CoBrother" />
              is a collaboration-driven business ecosystem built for individuals and organizations who aim to challenge the status quo.
            </p>
            <p>
              In a world full of ideas, the real advantage lies in execution, positioning, and access to the right technology.
            </p>
            <p>That&apos;s where we operate.</p>
            <p>We are not a service provider.</p>
            <p>
              We are a venture builder, brand enabler, and technology partner-designed to help you move from concept to scale with precision.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <AboutBlock title="Our Vision">
            <p>To create a disruption-driven ecosystem where businesses don&apos;t just compete - they redefine industries.</p>
          </AboutBlock>

          <AboutBlock title="Our Mission">
            <p>To empower entrepreneurs with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Execution-ready systems</li>
              <li>Strong, scalable brand identity</li>
              <li>Accessible, ready-to-use technology</li>
              <li>A collaborative growth environment</li>
            </ul>
            <p>So they can launch faster, disrupt smarter, and scale sustainably.</p>
          </AboutBlock>

          <AboutBlock title={<span className="inline-flex items-center gap-2 flex-wrap"><span>What Makes</span><BrandWordmark className="h-8 w-auto" inline alt="CoBrother" /><span>Different</span></span>}>
            <p>Most companies deliver services. Some deliver tools. We deliver outcomes.</p>
            <p>
              <BrandWordmark className="h-6 sm:h-7 w-auto align-middle inline-block mr-1" inline alt="CoBrother" />
              integrates venture building, branding, and technology delivery into a unified ecosystem that accelerates growth at every stage.
            </p>
          </AboutBlock>

          <AboutBlock title="Our Core Pillars">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Venture - Turning Ideas into Scalable Ventures</h3>
            <p>Ideas are easy. Execution is rare.</p>
            <p>Venture is our startup studio and investment arm, where we:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Build businesses from the ground up</li>
              <li>Provide ready-to-deploy infrastructure</li>
              <li>Design scalable business models</li>
              <li>Support founders from idea to market launch</li>
            </ul>
            <p>We don&apos;t just invest. We co-create and execute.</p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-4">Branding - Your Brand, Your Power</h3>
            <p>In today&apos;s market, visibility without identity is a liability.</p>
            <p>Branding enables businesses to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>White-label platforms and services</li>
              <li>Customize systems with their own branding</li>
              <li>Build a distinct, market-ready identity</li>
            </ul>
            <p>You leverage our ecosystem - while maintaining complete ownership of your brand presence.</p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-4">Disrupters - A Community That Challenges the Norm</h3>
            <p>Growth doesn&apos;t come from comfort zones.</p>
            <p>Disrupters is our community of forward-thinkers, builders, and innovators who:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Challenge conventional business models</li>
              <li>Collaborate to solve real-world problems</li>
              <li>Share insights, resources, and opportunities</li>
            </ul>
            <p>This is not just a network. It&apos;s a movement of individuals committed to building differently.</p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-4">Technology - Delivered to Your Doorstep</h3>
            <p>Technology should not be a barrier. It should be an advantage.</p>
            <p>
              We bring ready-to-use, scalable technology directly to businesses, eliminating the complexity of building from scratch.
            </p>
            <p>Our approach includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pre-built systems and tools</li>
              <li>Customizable tech solutions</li>
              <li>Plug-and-play infrastructure for faster execution</li>
            </ul>
            <p>This is what we call: &quot;Technology at your doorstep.&quot;</p>
            <p>You focus on growth - We handle the foundation.</p>
          </AboutBlock>

          <AboutBlock title="Our Philosophy">
            <p>The future belongs to those who build together and execute faster.</p>
            <p>We believe:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Disruption requires collaboration</li>
              <li>Technology should be accessible, not complicated</li>
              <li>Speed of execution defines success</li>
            </ul>
          </AboutBlock>

          <AboutBlock title="Who We Serve">
            <p>
              <BrandWordmark className="h-6 sm:h-7 w-auto align-middle inline-block mr-1" inline alt="CoBrother" />
              is built for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Startup founders</li>
              <li>Aspiring entrepreneurs</li>
              <li>Digital-first businesses</li>
              <li>Creators and innovators</li>
              <li>Organizations ready to scale through technology</li>
            </ul>
            <p>If you are building something meaningful - you belong here.</p>
          </AboutBlock>

          <AboutBlock title={<span className="inline-flex items-center gap-2 flex-wrap"><span>Why</span><BrandWordmark className="h-8 w-auto" inline alt="CoBrother" /><span>Exists</span></span>}>
            <p>Because the current ecosystem is broken:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Great ideas fail due to lack of execution</li>
              <li>Technology is often inaccessible or complex</li>
              <li>Branding lacks strategic direction</li>
              <li>Collaboration is underutilized</li>
            </ul>
            <p>
              <BrandWordmark className="h-6 sm:h-7 w-auto align-middle inline-block mr-1" inline alt="CoBrother" />
              exists to bridge these gaps with a unified, execution-first ecosystem.
            </p>
          </AboutBlock>

          <AboutBlock title="Our Approach">
            <p>Build. Brand. Disrupt. Scale.</p>
            <p>This is not just a process - it&apos;s a framework for modern business growth.</p>
          </AboutBlock>

          <AboutBlock title="The Bigger Vision">
            <p>We are not building a company.</p>
            <p>
              We are building a generation of Disrupters - businesses and individuals who don&apos;t follow markets, but reshape them.
            </p>
          </AboutBlock>

          <AboutBlock title="Call to Action">
            <p>
              Join <BrandWordmark className="h-6 sm:h-7 w-auto align-middle inline-block mx-1" inline alt="CoBrother" />.
              Access technology. Build faster. Disrupt confidently.
            </p>
          </AboutBlock>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}

function AboutBlock({ title, children }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3 text-slate-700 leading-8 text-base sm:text-lg">
        {children}
      </div>
    </article>
  );
}