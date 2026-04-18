import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import { useAuth } from '../context/AuthContext';
import { careerAPI } from '../api/services';

const initialJobForm = {
  title: '',
  department: '',
  location: '',
  type: 'FULL_TIME',
  description: '',
};

const initialApplyForm = {
  fullName: '',
  email: '',
  phone: '',
  coverLetter: '',
};

export default function CareersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [jobForm, setJobForm] = useState(initialJobForm);
  const [jobSubmitState, setJobSubmitState] = useState({ status: 'idle', message: '' });

  const [applyTarget, setApplyTarget] = useState(null);
  const [applyForm, setApplyForm] = useState(initialApplyForm);
  const [applyState, setApplyState] = useState({ status: 'idle', message: '' });

  const isAdmin = user?.role === 'ADMIN';

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await careerAPI.getPublicJobs();
      setJobs(Array.isArray(data) ? data : (data?.data ?? []));
    } catch {
      try {
        const { data } = await careerAPI.getAllJobs();
        setJobs(Array.isArray(data) ? data : (data?.data ?? []));
      } catch {
        setError(t('careers.fetchError', 'Unable to load jobs right now. Please try again later.'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (user) {
      setApplyForm((prev) => ({
        ...prev,
        fullName: user.fullName || `${user.firstname || ''} ${user.lastname || ''}`.trim() || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const sortedJobs = useMemo(
    () => [...jobs].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    [jobs]
  );

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setJobSubmitState({ status: 'loading', message: '' });
    try {
      await careerAPI.createJob(jobForm);
      setJobSubmitState({ status: 'success', message: t('careers.jobCreated', 'Job posted successfully.') });
      setJobForm(initialJobForm);
      fetchJobs();
    } catch (err) {
      setJobSubmitState({
        status: 'error',
        message: err?.response?.data?.error || t('careers.jobCreateFailed', 'Failed to post job.'),
      });
    }
  };

  const openApply = (job) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setApplyTarget(job);
    setApplyState({ status: 'idle', message: '' });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!applyTarget) return;
    setApplyState({ status: 'loading', message: '' });
    try {
      await careerAPI.applyToJob(applyTarget.id, applyForm);
      setApplyState({ status: 'success', message: t('careers.applySuccess', 'Application submitted. We will email you soon.') });
      setTimeout(() => {
        setApplyTarget(null);
        setApplyForm(initialApplyForm);
      }, 1000);
    } catch (err) {
      setApplyState({
        status: 'error',
        message: err?.response?.data?.error || t('careers.applyFailed', 'Could not submit application.'),
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar homeMobileMenu />
      <HomeNavbar openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} navigate={navigate} />

      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-gradient-to-br from-indigo-50 via-white to-sky-50 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {t('careers.title', 'Careers at CoBrother')}
          </h1>
          <p className="text-gray-600 max-w-3xl text-base md:text-lg">
            Explore open roles and take the next step in your career.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isAdmin && (
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  {t('careers.adminPostJob', 'Post a Job')}
                </h2>
                <form onSubmit={handleCreateJob} className="space-y-3">
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder={t('careers.fields.title', 'Job title')}
                    value={jobForm.title}
                    onChange={(e) => setJobForm((p) => ({ ...p, title: e.target.value }))}
                    required
                  />
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder={t('careers.fields.department', 'Department')}
                    value={jobForm.department}
                    onChange={(e) => setJobForm((p) => ({ ...p, department: e.target.value }))}
                    required
                  />
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder={t('careers.fields.location', 'Location')}
                    value={jobForm.location}
                    onChange={(e) => setJobForm((p) => ({ ...p, location: e.target.value }))}
                    required
                  />
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={jobForm.type}
                    onChange={(e) => setJobForm((p) => ({ ...p, type: e.target.value }))}
                  >
                    <option value="FULL_TIME">{t('careers.type.fullTime', 'Full Time')}</option>
                    <option value="PART_TIME">{t('careers.type.partTime', 'Part Time')}</option>
                    <option value="CONTRACT">{t('careers.type.contract', 'Contract')}</option>
                    <option value="INTERNSHIP">{t('careers.type.internship', 'Internship')}</option>
                  </select>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[110px]"
                    placeholder={t('careers.fields.description', 'Job description')}
                    value={jobForm.description}
                    onChange={(e) => setJobForm((p) => ({ ...p, description: e.target.value }))}
                    required
                  />
                  <button type="submit" className="btn-glow w-full" disabled={jobSubmitState.status === 'loading'}>
                    {jobSubmitState.status === 'loading' ? t('careers.posting', 'Posting...') : t('careers.postJob', 'Post Job')}
                  </button>
                  {jobSubmitState.status !== 'idle' && (
                    <p className={`text-sm ${jobSubmitState.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {jobSubmitState.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          <div className={isAdmin ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {loading ? (
              <div className="text-center py-16 text-gray-500">{t('careers.loading', 'Loading jobs...')}</div>
            ) : error ? (
              <div className="text-center py-16 text-red-500">{error}</div>
            ) : sortedJobs.length === 0 ? (
              <div className="text-center py-16 text-gray-500">{t('careers.noJobs', 'No openings available right now.')}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedJobs.map((job) => (
                  <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display text-xl font-bold text-gray-900 m-0">{job.title}</h3>
                      <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                        {job.type || t('careers.type.fullTime', 'Full Time')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{job.department || '-'}</p>
                    <p className="text-sm text-gray-500 mb-3">📍 {job.location || '-'}</p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-4">{job.description}</p>
                    <button onClick={() => openApply(job)} className="btn-glow btn-glow-sm w-full">
                      {user ? t('careers.applyNow', 'Apply Now') : t('careers.loginToApply', 'Login to Apply')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {applyTarget && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 p-4"
          onClick={(e) => e.target === e.currentTarget && setApplyTarget(null)}
        >
          <div className="w-full max-w-[560px] bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">
              {t('careers.applyFor', 'Apply for')} {applyTarget.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{t('careers.applyHint', 'Your application will be emailed to our team.')}</p>
            <form onSubmit={handleApply} className="space-y-3">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder={t('careers.fields.fullName', 'Full Name')}
                value={applyForm.fullName}
                onChange={(e) => setApplyForm((p) => ({ ...p, fullName: e.target.value }))}
                required
              />
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                type="email"
                placeholder={t('careers.fields.email', 'Email')}
                value={applyForm.email}
                onChange={(e) => setApplyForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder={t('careers.fields.phone', 'Phone')}
                value={applyForm.phone}
                onChange={(e) => setApplyForm((p) => ({ ...p, phone: e.target.value }))}
                required
              />
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[120px]"
                placeholder={t('careers.fields.coverLetter', 'Cover letter / Why should we hire you?')}
                value={applyForm.coverLetter}
                onChange={(e) => setApplyForm((p) => ({ ...p, coverLetter: e.target.value }))}
                required
              />
              <div className="flex gap-3">
                <button type="submit" className="btn-glow flex-1" disabled={applyState.status === 'loading'}>
                  {applyState.status === 'loading' ? t('careers.submitting', 'Submitting...') : t('careers.submitApplication', 'Submit Application')}
                </button>
                <button type="button" className="btn-glow" onClick={() => setApplyTarget(null)}>
                  {t('careers.cancel', 'Cancel')}
                </button>
              </div>
              {applyState.status !== 'idle' && (
                <p className={`text-sm ${applyState.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {applyState.message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      <HomeFooter />
    </div>
  );
}
