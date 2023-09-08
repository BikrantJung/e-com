import { Playfair_Display } from 'next/font/google';

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const root = `
  :root {
    --serif-font:${playfair_display.style.fontFamily};
  }
  `;
export { root };
