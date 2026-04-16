import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { feedbackAPI } from '../../api/services';

export default function FeedbackSection() {
  const { t } = useTranslation();
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackTypeClick = (type) => {
    setFeedbackType(type);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackMessage.trim()) {
      alert(t('feedback.placeholder'));
      return;
    }
    try {
      setFeedbackSubmitting(true);
      const response = await feedbackAPI.submit({
        feedbackType,
        message: feedbackMessage,
        pageUrl: window.location.href,
      });
      
      if (response.data && response.data.status === 'success') {
        setFeedbackSubmitted(true);
      } else {
        alert(t('feedback.failedToSend'));
      }
    } catch (error) {
      console.error('Feedback error:', error);
      alert(t('feedback.somethingWrong'));
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-8 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[980px] mx-auto p-4 md:p-10 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base font-semibold text-gray-900 mb-1 leading-snug">
              {t('feedback.question')}
            </p>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-[560px]">
              {t('feedback.desc')}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 md:gap-3">
            {!feedbackSubmitted ? (
              !feedbackType ? (
                <>
                  <button
                    className="btn-glow btn-glow-sm flex items-center gap-1.5 !px-3 !py-1.5 !text-[11px] sm:!text-xs"
                    onClick={() => handleFeedbackTypeClick('like')}
                  >
                    {t('feedback.yes')} <ThumbsUp size={14} />
                  </button>
                  <button
                    className="btn-glow btn-glow-sm flex items-center gap-1.5 !px-3 !py-1.5 !text-[11px] sm:!text-xs"
                    onClick={() => handleFeedbackTypeClick('dislike')}
                  >
                    {t('feedback.no')} <ThumbsDown size={14} />
                  </button>
                </>
              ) : null
            ) : (
              <p className="text-xs md:text-sm font-medium text-purple flex items-center gap-2">
                <Sparkles size={16} className="text-purple-500" />
                {feedbackType === 'like' ? t('feedback.positive') : t('feedback.negative')}
              </p>
            )}
          </div>
        </div>
        {feedbackType && !feedbackSubmitted && (
          <div className="mt-4">
            <textarea
              className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-gray-400 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)] resize-none"
              placeholder={t('feedback.placeholder')}
              rows="2"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-3">
              <button
                className="btn-glow btn-glow-sm w-full sm:w-auto !px-4 !py-2 !text-[11px] sm:!text-xs"
                onClick={handleFeedbackSubmit}
                disabled={feedbackSubmitting}
              >
                {feedbackSubmitting ? t('feedback.submitting') : t('feedback.submit')}
              </button>
              <button
                className="btn-glow btn-glow-sm w-full sm:w-auto !px-5 !py-2 !text-[11px] sm:!text-xs bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                onClick={() => { setFeedbackType(null); setFeedbackMessage(''); }}
                disabled={feedbackSubmitting}
              >
                {t('feedback.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
