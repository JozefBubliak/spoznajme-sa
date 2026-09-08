// app/page.tsx — jediný web žije pod /[lang]; koreň presmeruj na predvolený jazyk.
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/sk')
}
