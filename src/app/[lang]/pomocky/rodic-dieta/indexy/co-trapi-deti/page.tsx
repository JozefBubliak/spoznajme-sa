import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Čo trápi deti v komunikácii s rodičmi | DeepTalks',
  description: '75 tém písaných „hlasom dieťaťa" – od vypočutia až po identitu a hranice.',
}

const RAW = `A) Byť vypočutý a braný vážne
Nepočúvate ma do konca. (Skáčete do reči, hneď radíte.)
Pýtate sa ako na výsluchu. (Veľa rýchlych otázok, žiadny príbeh.)
Zľahčujete moje pocity. („To nič nie je.")
Hovoríte „rozumiem", ale nekonáte podľa toho.
Idete hneď do riešení, ja chcem najprv porozumenie.
Poučujete ma, aj keď chcem len zdieľať.
Hovoríte príliš dlho. (Strácam pozornosť.)
Prekladáte moje slová. (Niekedy nesprávne.)
Čakáte „dospelé" vysvetlenie, ale ja ešte neviem nájsť slová.
Hovoríte za mňa pred inými.

B) Emócie a regulácia
Keď plačem alebo sa hnevám, chcete to hneď zastaviť.
Miešate pocit so správaním. (Trest za to, že „niečo cítim".)
Bojím sa povedať, že som smutný, aby som „nerobil problémy".
Keď som nervózny, hovoríte „upokoj sa", ale nepoviete ako.
Hanbíte ma za slzy alebo strach.
Nepomenujete, čo vidíte („vyzeráš nahnevane"), len prikazujete.
Nemáme dohodnuté „pauzy" na upokojenie.
Keď ste vy nahnevaní, kričíte – a ja sa uzavriem.
Keď sa ospravedlním, stále sa vraciame k chybe.
Chcem vedieť, že aj vy máte pocity a ako ich zvládate.

C) Autonómia, voľby a kontrola
Rozhodujete za mňa aj tam, kde by som to zvládol.
Ponúkate „voľby", ktoré sú v skutočnosti príkazy.
Keď poviem „nie", nie je to rešpektované.
Potrebujem v niečom „môcť sám", aj keby to trvalo dlhšie.
Nepýtate sa ma na názor na rodinné veci, ktoré sa ma týkajú.
Zosmiešňujete moje nápady.
Upravujete mi plány bez vysvetlenia.
Nemeníme dohody, keď sa zmenia podmienky.
Zákazy bez „prečo" mi nedávajú zmysel.
Chýbajú mi malé každodenné voľby (poradie, spôsob).

D) Škola a výkon
Zaujímajú vás známky, nie môj deň.
Dostávam pochvalu len za výsledok, nie za snahu.
Pri neúspechu počujem moralizovanie, nie podporu.
Porovnávate ma so súrodencami/kamarátmi.
Domáce úlohy sú boj – potrebujem spolu vymyslieť plán.
Keď mám ťažkosť s učením, vyzerá to, že len „nechcem".

E) Kamaráti, voľný čas a „môj svet"
Podceňujete moje vzťahy („veď ste deti").
Zosmiešňujete, čo mám rád (hry, hudba, štýl).
Robíte si srandu z mojich trapasov.
Pred inými prezradíte vec, ktorú som vám zveril.
Chcem čas len „byť" – nie stále „výkon".
Potrebujem mať aj tajomstvá primerané veku.
Keď niečo pokazím s kamarátom, učte ma, ako to napraviť, nie trestať zákazmi bez rozhovoru.

F) Digitálny svet
Pravidlá o mobiloch sú nejasné a menia sa podľa nálady.
Kritizujete ma pri obrazovke, ale vy ste na nej stále.
Zdieľate moje fotky bez môjho súhlasu.
Keď sa online cítim zle, bojím sa to povedať (len zákazy).
Nezaujímate sa o to, čo ma online baví – iba zakazujete.
Dohody o čase/bezpečí sa nerobia spolu so mnou.
Keď potrebujem pomoc (šikana, tlak), bojím sa, že mi len vezmete mobil.

G) Hranice, disciplína, spravodlivosť
Pravidlá nie sú rovnaké pre všetkých (dvojitý meter).
Tresty sú príliš tvrdé a nesúvisia s tým, čo sa stalo.
Krik a zahanbovanie ma skôr zablokujú.
Keď poviem „stop", niekedy to neplatí.
Neviem, čo môžem čakať – raz tak, raz inak.
Ospravedlnenie od rodiča sa deje len zriedka.
Kritizujete moju povahu („si lenivý"), nie správanie.
„Pretože som povedal" mi berie chuť spolupracovať.
Chcem vedieť, ako vec napraviť, nie len „odpykať si".
Potrebujem vedieť, že môžem povedať pravdu bez strachu.

H) Zmeny, zdravie a náročné situácie
O zmenách sa dozviem neskoro a naraz.
Keď sa sťahujeme/mení sa režim, chýba mi príprava.
Strach z lekára zľahčujete („nič to nie je").
Keď som chorý v hlave (úzkosť, smútok), neviem, ako o tom hovoriť.
Keď sa vám niečo nedarí, tajíte to – bojím sa pýtať.
Keď sa bojím, potrebujem plán „čo ak", nie len „to zvládneš".
Smútok a strata – nechcem tabu, chcem byť súčasťou.
Potrebujem istoty (čo zostáva rovnaké), keď sa mení veľa.

I) Identita, telo, sexualita, hodnoty
Hanbíte ma za telo/pubertu/otázky o sexe.
Témy „súhlasu" a hraníc doma neriešime.
Moje názory sú vtip pre dospelých.
Keď sa mení, kto som (štýl, záujmy), beriete to ako vzdor.
Ak som iný (nebinárny, orientácia, neurodiverzita), bojím sa vašej reakcie.
Vaše presvedčenia sú „jediná pravda" – ja sa bojím oponovať.
Chcem poznať vaše hodnoty, ale aj priestor pre svoje otázky.`

type Section = { h: string; items: string[] }

function parseSections(text: string): Section[] {
  const lines = text.split('\n').map(s => s.trim())
  const out: Section[] = []
  let cur: Section | null = null

  for (const l of lines) {
    if (!l) continue
    if (/^[A-I]\)/.test(l)) {
      cur = { h: l.replace(/^[A-I]\)\s*/, ''), items: [] }
      out.push(cur)
      continue
    }
    if (cur) cur.items.push(l)
  }
  return out
}

export default function Page() {
  const sections = parseSections(RAW)
  return (
    <article className="prose max-w-3xl">
      <h1>Čo trápi deti v komunikácii s rodičmi</h1>
      <p className="text-muted-foreground">Písané „hlasom dieťaťa" – aby bolo jasné, kde to škrípe.</p>
      {sections.map((s, idx) => (
        <section key={idx} className="mt-8">
          <h2 className="text-xl font-semibold">{s.h}</h2>
          <ul className="list-disc pl-6">
            {s.items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </section>
      ))}
    </article>
  )
}