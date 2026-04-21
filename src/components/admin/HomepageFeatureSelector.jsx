import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/services';

export default function HomepageFeatureSelector({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const sectionLabel =
    type === 'software' ? 'Technology'
    : type === 'community' ? 'Disruptors'
    : `${type.charAt(0).toUpperCase()}${type.slice(1)}s`;

  const isFeatured = (item) =>
    item.featuredOnHomepage === true ||
    item.featured_on_homepage === true ||
    item.featuredOnHome === true ||
    item.homeFeatured === true ||
    item.showOnHome === true ||
    item.communityHomeFeatured === true ||
    item.featuredOnCommunityHome === true ||
    item.showOnCommunityHome === true ||
    item.disruptorHomeFeatured === true ||
    item.featuredOnDisruptorHome === true ||
    item.showOnDisruptorHome === true ||
    item.featured === true;

  const fetchItems = async () => {
    setLoading(true);
    try {
      let response;
      if (type === 'domain') response = await adminAPI.getDomains();
      else if (type === 'venture') response = await adminAPI.getVentures();
      else if (type === 'software') response = await adminAPI.getCoCreations();
      else if (type === 'community') response = await adminAPI.getCommunities();

      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleToggle = async (id) => {
    try {
      if (type === 'domain') await adminAPI.toggleDomainHomepage(id);
      else if (type === 'venture') await adminAPI.toggleVentureHomepage(id);
      else if (type === 'software') await adminAPI.toggleSoftwareHomepage(id);
      else if (type === 'community') await adminAPI.toggleCommunityHomepage(id);

      // Refresh the list after toggle
      await fetchItems();
    } catch (error) {
      console.error('Failed to toggle homepage feature:', error);
      alert('Failed to update homepage feature status');
    }
  };

  const getTitle = (item) => {
    if (type === 'domain') return `${item.domainName || ''}${item.domainExtension || ''}`;
    if (type === 'venture') return item.brandDetails?.brandName || `Venture #${item.id}`;
    if (type === 'software') return item.name || `Software #${item.id}`;
    if (type === 'community') return item.name || item.fullName || `Disruptor #${item.id}`;
    return '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 text-black">
      <h3 className="text-lg font-semibold text-black mb-4">
        Featured {sectionLabel}
      </h3>

      {items.length === 0 ? (
        <div className="text-center py-8 text-black">
          No {type === 'software' ? 'technology items' : type === 'community' ? 'disruptors' : type + 's'} found
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="font-medium text-black">{getTitle(item)}</div>
                <div className="text-sm text-black">ID: {item.id}</div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured(item)}
                  onChange={() => handleToggle(item.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-black">Featured</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
