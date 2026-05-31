import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Intímne preferencie | CoupleSync',
  description: 'Súkromný CoupleSync modul na objavovanie túžob, hraníc a spoločných tém.',
}

export default function Page() {
  redirect('/couplesync-intimity')
}
