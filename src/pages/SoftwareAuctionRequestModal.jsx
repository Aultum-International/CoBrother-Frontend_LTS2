import { useState } from 'react';
import { softwareAuctionAPI } from '../api/services';

const DURATIONS = ['ONE_DAY', 'THREE_DAYS', 'FIVE_DAYS', 'SEVEN_DAYS', 'FOURTEEN_DAYS', 'THIRTY_DAYS'];
const DURATION_LABELS = {
  ONE_DAY: '1 Day', THREE_DAYS: '3 Days', FIVE_DAYS: '5 Days',
  SEVEN_DAYS: '7 Days', FOURTEEN_DAYS: '14 Days', THIRTY_DAYS: '30 Days',
};

export default function SoftwareAuctionRequestModal({ software, onClose, onSubmitted }) {
  const [form, setForm] = useState({
    minBidPrice: '',
    duration: 'SEVEN_DAYS',
    auctionRationale: '',
    sourceCodeIncluded: false,
    supportIncluded: false,
    supportDays: 30,
    transferDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.minBidPrice || parseFloat(form.minBidPrice) <= 0) {
      setError('Enter a valid minimum bid price'); return;
    }
    if (!form.auctionRationale.trim()) {
      setError('Please explain why you want to auction this software'); return;
    }
    setError('');
    setLoading(true);
    try {
      await softwareAuctionAPI.create(software.id, {
        minBidPrice: parseFloat(form.minBidPrice),
        duration: form.duration,
        auctionRationale: form.auctionRationale,
        sourceCodeIncluded: form.sourceCodeIncluded,
        supportIncluded: form.supportIncluded,
        supportDays: form.supportIncluded ? parseInt(form.supportDays) : 0,
        transferDetails: form.transferDetails,
      });
      onSubmitted();
    } catch (e) {
      setError(e.response?.data || e.response?.data?.error || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{ maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-glow" />
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div className="modal-badge">Request Auction</div>
          <h2>List "{software.name}" for Auction</h2>
          <p>Submit your auction request for admin review. Once approved, it goes live immediately.</p>
        </div>

        {/* Info banner */}
        <div style={{ padding: '0.875rem', background: 'rgba(110,173,200,0.08)',
                      border: '1px solid rgba(110,173,200,0.25)', borderRadius: 8,
                      marginBottom: '1.25rem', fontSize: '0.83rem', color: '#6eadc8' }}>
          💡 Unlike fixed-price sales, auction lets the market decide the value. Bids escalate in 5% increments with anti-snipe extension in the final 5 minutes.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <div className="form-group">
            <label>Minimum Bid Price (₹) <span style={{ color: '#c86e6e' }}>*</span></label>
            <input type="number" min="1" value={form.minBidPrice}
              onChange={e => set('minBidPrice', e.target.value)}
              placeholder="e.g. 50000" />
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Current listed price: ₹{Number(software.price).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="form-group">
            <label>Auction Duration <span style={{ color: '#c86e6e' }}>*</span></label>
            <select value={form.duration} onChange={e => set('duration', e.target.value)}>
              {DURATIONS.map(d => (
                <option key={d} value={d}>{DURATION_LABELS[d]}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Why auction instead of fixed price? <span style={{ color: '#c86e6e' }}>*</span></label>
            <textarea value={form.auctionRationale}
              onChange={e => set('auctionRationale', e.target.value)}
              placeholder="e.g. I want the market to price this fairly. The software has high potential and I believe competitive bidding will reflect its true value."
              rows={3} style={{ resize: 'vertical' }} />
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ alignItems: 'center', gap: '0.6rem',
                            fontSize: '0.88rem', color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.sourceCodeIncluded}
                onChange={e => set('sourceCodeIncluded', e.target.checked)} />
              Source code / repository access included
            </label>
            <label style={{ alignItems: 'center', gap: '0.6rem',
                            fontSize: '0.88rem', color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.supportIncluded}
                onChange={e => set('supportIncluded', e.target.checked)} />
              Post-sale support / handover included
            </label>
          </div>

          {form.supportIncluded && (
            <div className="form-group">
              <label>Support Duration (days)</label>
              <input type="number" min="1" max="365" value={form.supportDays}
                onChange={e => set('supportDays', e.target.value)} />
            </div>
          )}

          <div className="form-group">
            <label>IP / Ownership Transfer Details</label>
            <textarea value={form.transferDetails}
              onChange={e => set('transferDetails', e.target.value)}
              placeholder="e.g. Full IP transfer included. Domain, hosting credentials, and all assets handed over within 7 days of auction close."
              rows={2} style={{ resize: 'vertical' }} />
          </div>
        </div>

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(200,110,110,0.08)',
                        border: '1px solid rgba(200,110,110,0.25)', borderRadius: 8,
                        fontSize: '0.83rem', color: '#c86e6e' }}>
            ⚠ {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn-glow flex-1" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="btn-spinner" /> : 'Submit for Review →'}
          </button>
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}