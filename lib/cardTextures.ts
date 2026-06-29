import { hashTitle } from './hashTitle';

export const CARD_TEXTURES = [
  '/texture/01.png',
  '/texture/02.png',
  '/texture/03.png',
  '/texture/04.png',
  '/texture/05.png',
] as const;

export type CardTextureId = '01' | '02' | '03' | '04' | '05';

export type CardTexture = {
  id: CardTextureId;
  url: (typeof CARD_TEXTURES)[number];
};

export function getCardTexture(title: string): CardTexture {
  const index = hashTitle(title) % CARD_TEXTURES.length;
  const url = CARD_TEXTURES[index];

  return {
    id: url.replace('/texture/', '').replace('.png', '') as CardTextureId,
    url,
  };
}
