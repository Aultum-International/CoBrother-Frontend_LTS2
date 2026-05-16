import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ label = 'Back' }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-start mb-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 bg-white text-black font-medium shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:border-purple-300 transition-all duration-300"
      >
        <ArrowLeft size={16} />
        {label}
      </button>
    </div>
  );
}