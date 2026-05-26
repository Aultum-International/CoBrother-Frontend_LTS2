import LikeButton from '../common/LikeButton';
import { EditIcon } from '../common/EditActionLabel';
import ListingBrowseFooter from './ListingBrowseFooter';

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function CommunityListingCard({
  profile,
  isMe,
  browseMode = false,
  onView,
  onEdit,
  likeState,
  onLike,
}) {
  const skills = profile.skills?.split(',').map((s) => s.trim()).filter(Boolean) || [];

  return (
    <div
      className={`listing-card-glow community-listing-card card-glow-hover p-6 bg-white rounded-[18px] flex flex-col gap-3 relative border h-full ${isMe ? 'border-indigo-300' : 'border-gray-200'}${browseMode ? '' : ' cursor-pointer'}`}
      onClick={browseMode ? undefined : onView}
    >
      {isMe && (
        <button
          type="button"
          className="absolute top-3.5 right-3.5 inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full text-indigo-600 p-0 cursor-pointer shadow-sm hover:bg-indigo-50 hover:border-indigo-200"
          onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
          title="Edit profile"
          aria-label="Edit profile"
        >
          <EditIcon size={16} />
        </button>
      )}
      <div className="flex items-center gap-3">
        {profile.imageUrl ? (
          <img src={profile.imageUrl} alt={profile.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xl font-semibold text-indigo-600 flex-shrink-0">
            {profile.name?.[0]?.toUpperCase() || '?'}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-[0.95rem] text-gray-900">{profile.name || 'Anonymous'}</h4>
          {profile.role && (
            <div className="inline-block mt-0.5 px-1.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded text-[0.7rem] text-indigo-600 uppercase tracking-wider">
              {profile.role.replace(/_/g, ' ')}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[0.72rem] font-semibold text-gray-400 uppercase tracking-wider">Industry & Location</span>
        <div className="flex flex-wrap gap-1.5">
          {profile.industry && (
            <span className="px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-700">
              {profile.industry.replace(/_/g, ' ')}
            </span>
          )}
          {profile.location && (
            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">📍 {profile.location}</span>
          )}
        </div>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[0.72rem] font-semibold text-gray-400 uppercase tracking-wider">Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600">
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-400">
                +{skills.length - 4}
              </span>
            )}
          </div>
        </div>
      )}
      {profile.linkedInProfileUrl && (
        <a
          href={profile.linkedInProfileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-[#0077b5] no-underline mt-0.5 hover:text-[#005885]"
          onClick={(e) => e.stopPropagation()}
        >
          <LinkedInIcon size={13} /> LinkedIn ↗
        </a>
      )}
      {browseMode ? (
        <ListingBrowseFooter
          onViewDetails={onView}
          label="View Profile"
          className="mt-auto"
        >
          {onLike ? (
            <LikeButton liked={likeState?.liked} count={likeState?.count} onToggle={onLike} forceRed />
          ) : (
            <span className="text-xs text-gray-500">👁 {profile.views || 0}</span>
          )}
        </ListingBrowseFooter>
      ) : (
        <div className="flex justify-between items-center mt-auto pt-1">
          {onLike ? (
            <LikeButton liked={likeState?.liked} count={likeState?.count} onToggle={onLike} forceRed />
          ) : (
            <span className="text-xs text-gray-500">👁 {profile.views || 0}</span>
          )}
        </div>
      )}
    </div>
  );
}
