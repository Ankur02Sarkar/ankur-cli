import QRCode from 'qrcode';
import open from 'open';
import { getColors } from '../core/colors.js';

const RESUME_URL = 'https://fxtdjnbrtkkxavebmtwc.supabase.co/storage/v1/object/public/resumes/Ankur_Sarkar___Resume_v4_17_23.pdf';

export async function download(args = []) {
  const colors = getColors();
  try {
    const qr = await QRCode.toString(RESUME_URL, { type: 'terminal', small: true });
    console.log(colors.info('Scan this QR code to download resume:'));
    console.log(qr);
    console.log(colors.secondary(`Or visit: ${RESUME_URL}`));
    if (args[0] === 'open') {
      await open(RESUME_URL);
      console.log(colors.info('Opening in browser...'));
    }
  } catch (error) {
    console.log(colors.error('Error generating QR code:'));
    console.log(error?.message ?? 'Unknown error');
    console.log(colors.secondary(`Direct link: ${RESUME_URL}`));
  }
}