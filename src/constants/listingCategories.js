/** Shared category / filter options — keep listing forms and browse FilterBar in sync. */

export const VENTURE_INDUSTRIES = [
  'SAAS',
  'ECOMMERCE',
  'SERVICES',
  'AI_AUTOMATION',
  'FINTECH',
  'OTHER',
];

export const COCREATION_CATEGORIES = [
  'SAAS',
  'MOBILE_APP',
  'DESKTOP',
  'API_TOOL',
  'AUTOMATION',
  'ECOMMERCE',
  'EDUCATION',
  'OTHER',
];

export const COMMUNITY_INDUSTRIES = [
  'TECH',
  'FINANCE',
  'HEALTHCARE',
  'EDUCATION',
  'FOOD_AND_BEVERAGE',
  'RETAIL',
  'REAL_ESTATE',
  'MEDIA',
  'MANUFACTURING',
  'LOGISTICS',
  'AGRICULTURE',
  'OTHER',
];

export const DOMAIN_PRICING_TYPES = ['FIXED', 'NEGOTIABLE'];

export function toCategoryOptions(values, labelMap = {}) {
  return values.map((value) => ({
    value,
    label: labelMap[value] ?? value.replace(/_/g, ' '),
  }));
}

export const DOMAIN_PRICING_OPTIONS = toCategoryOptions(DOMAIN_PRICING_TYPES, {
  FIXED: 'Fixed Price',
  NEGOTIABLE: 'Negotiable',
});

export const VENTURE_INDUSTRY_OPTIONS = toCategoryOptions(VENTURE_INDUSTRIES);

export const COCREATION_CATEGORY_OPTIONS = toCategoryOptions(COCREATION_CATEGORIES);
