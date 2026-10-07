const logoFiles = [
  'bos-bank.webp',
  'collegium-civitas.webp',
  'fabryka-pelna-zycia.webp',
  'gzm.webp',
  'heinrich-boll.webp',
  'koalicja.webp',
  'konfederacja-pracy-mlodych.webp',
  'life.webp',
  'opzz.webp',
  'otwarty-jazdow.webp',
  'polska-siec-ekonomii.webp',
  'ramboll-fonden.webp',
  'rescoop.webp',
  'tak-ladnie.webp',
  'z-go.webp',
  'zarzad-zieleni-miejskiej.webp',
];

export const logoItems = logoFiles.map((file) => ({
  id: file,
  src: `/assets/logo/${file}`,
  alt: file.replace(/\.[^.]+$/, ''),
}));

export const logoRows = [
  logoItems.filter((_, index) => index % 2 === 0),
  logoItems.filter((_, index) => index % 2 === 1),
];
