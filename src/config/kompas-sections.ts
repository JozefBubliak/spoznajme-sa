export type KompasSection = { slug: string; label: string; desc: string }

export const KOMPAS_SECTIONS: KompasSection[] = [
  { slug: "otvarace-ritualy",     label: "Začať rozhovor & rituály",     desc: "Ľahké vety na úvod, check-iny a drobné rituály spojenia" },
  { slug: "emocie-a-regulacia",   label: "Emócie & regulácia",           desc: "ako pomenovať pocity, upokojiť sa a pomôcť druhému" },
  { slug: "hranice-a-dohody",     label: "Hranice & dohody",             desc: "jasné požiadavky, dohody a následky bez kriku" },
  { slug: "konflikt-a-spolupraca",label: "Konflikt & spolupráca",        desc: "odlišné názory bez hádok, hľadanie riešení" },
  { slug: "zmeny-a-prechody",     label: "Zmeny & prechody",             desc: "rána, odchody, návraty, nové zvyky – čo povedať" },
  { slug: "spomienky-a-spojenie", label: "Spomienky & spojenie",         desc: "vďačnosť, oceňovanie, budovanie blízkosti" },
  { slug: "digitalny-zivot",      label: "Digitálny život",              desc: "obrazovky, dohody a prevencia konfliktov" },
  { slug: "skola-a-ucenie",       label: "Škola & učenie",               desc: "podpora bez tlaku, motivácia a rutiny" },
  { slug: "zdravie-a-tazke-temy", label: "Zdravie & ťažké témy",         desc: "choroba, smútok, úzkosť – citlivé, ale praktické vety" },
  { slug: "identita-a-telo",      label: "Identita & telo",              desc: "sebaobraz, rešpekt a citlivé hranice" },
]
