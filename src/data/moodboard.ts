/**
 * The home moodboard. Every item is placed by hand:
 *
 *   x, y   position on desktop, in % of the board
 *   w      width in board units (1u ≈ 1% of the viewport width)
 *   r      rotation in degrees
 *   d      parallax depth (0 = still, 1 = moves the most)
 *   z      stacking order
 *   mx, my, mw   the same on phones (mw in % of the screen width)
 *   style  '' | 'tape' | 'pin' | 'framed'
 *
 * Image items point at a project folder and one of its images (default: cover).
 */
export type BoardItem =
  | { kind: 'image'; project: string; image?: string; style: '' | 'tape' | 'pin' | 'framed'; x: number; y: number; w: number; r: number; d: number; z: number; mx: number; my: number; mw: number }
  | { kind: 'dymo' | 'swatch'; x: number; y: number; w: number; r: number; d: number; z: number; mx: number; my: number; mw: number };

/** Colours on the palette card, taken from the illustrations. */
export const PALETTE = ['#E4573D', '#E3A72F', '#E98BA6', '#1F2C6B'];

export const MOODBOARD: BoardItem[] = [
  { kind: 'image', project: 'there-is-an-elephant-sitting-on-my-heart', image: '01.jpg', style: 'tape', x: 3, y: 9, w: 12, r: -2.5, d: 0.7, z: 3, mx: 4, my: 1.5, mw: 40 },
  { kind: 'image', project: 'dreams-park', image: '02.jpg', style: 'pin', x: 19, y: 4, w: 10, r: 1.5, d: 0.4, z: 4, mx: 52, my: 3, mw: 40 },
  { kind: 'image', project: 'flock', style: 'framed', x: 32, y: 8, w: 21, r: 0.8, d: 0.9, z: 2, mx: 30, my: 15, mw: 62 },
  { kind: 'image', project: 'the-bugs-killer', image: '20.jpg', style: 'tape', x: 57, y: 3, w: 10, r: -1.2, d: 0.5, z: 5, mx: 4, my: 24, mw: 34 },
  { kind: 'image', project: 'chameleon', style: '', x: 71, y: 10, w: 15, r: 2.2, d: 0.8, z: 3, mx: 46, my: 29, mw: 50 },
  { kind: 'image', project: 'capivara', image: '01.jpg', style: 'pin', x: 88, y: 44, w: 9, r: -3, d: 0.3, z: 6, mx: 8, my: 38, mw: 34 },
  { kind: 'image', project: 'vasilisa-the-beautiful', style: 'tape', x: 66, y: 54, w: 17, r: 1.2, d: 0.6, z: 4, mx: 42, my: 42, mw: 52 },
  { kind: 'image', project: 'balance', style: 'framed', x: 47, y: 60, w: 10, r: -1.8, d: 0.35, z: 5, mx: 3, my: 49, mw: 40 },
  { kind: 'image', project: 'funny-dog', style: '', x: 27, y: 57, w: 15, r: 2, d: 0.75, z: 3, mx: 48, my: 55, mw: 46 },
  { kind: 'image', project: 'the-worker', style: 'tape', x: 5, y: 54, w: 13, r: -1.5, d: 0.5, z: 4, mx: 6, my: 62, mw: 46 },
  { kind: 'image', project: 'the-ones-next-door', style: 'pin', x: 18, y: 76, w: 10, r: 3, d: 0.9, z: 6, mx: 54, my: 69, mw: 40 },
  { kind: 'image', project: 'the-intelligent-brothers', style: 'framed', x: 56, y: 77, w: 11, r: -0.8, d: 0.45, z: 3, mx: 6, my: 76, mw: 50 },
  { kind: 'dymo', x: 37, y: 30, w: 12, r: -4, d: 1, z: 7, mx: 6, my: 96, mw: 44 },
  { kind: 'swatch', x: 84, y: 72, w: 10, r: 2.5, d: 0.6, z: 5, mx: 58, my: 85, mw: 36 },
];
