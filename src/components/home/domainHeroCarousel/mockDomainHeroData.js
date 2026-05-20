/**
 * Mock rows for the hero “Recently sold / live” strip.
 * `sold` + `pendingSeal`: will run flip → stamp → permanent sold when centered.
 * `available`: glides through with no special sequence.
 */
export const DOMAIN_HERO_MOCK = [
  {
    id: 'd1',
    name: 'futureai',
    tld: 'com',
    price: 128_000,
    status: 'available',
  },
  {
    id: 'd2',
    name: 'quantumx',
    tld: 'ai',
    price: 89_500,
    status: 'sold',
    owner: '@vertexlabs',
    pendingSeal: true,
  },
  {
    id: 'd3',
    name: 'cryptonest',
    tld: 'io',
    price: 210_000,
    status: 'available',
  },
  {
    id: 'd4',
    name: 'nexusflow',
    tld: 'com',
    price: 67_200,
    status: 'sold',
    owner: '@pulsehq',
    pendingSeal: true,
  },
  {
    id: 'd5',
    name: 'orbitmint',
    tld: 'xyz',
    price: 41_800,
    status: 'available',
  },
];

export function tripleMock(list) {
  return [...list, ...list, ...list];
}
