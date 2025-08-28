'use client'

import { useState } from 'react'
import { KOMPAS_DATA } from '@/data/kompas'

export default function Kompas() {
  // dynamicky zoznam skupín, tém a podtém
  const groups = Array.from(new Set(KOMPAS_DATA.map((item) => item.group)))
  const groupIcons: Record<string, string> = {
    Deti: '🧒',
    Páry: '❤️',
    Práca: '💼',
    Priatelia: '👥',
    'Citlivé témy': '⚠️',
  }
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const topics = selectedGroup
    ? Array.from(
        new Set(
          KOMPAS_DATA.filter((item) => item.group === selectedGroup).map(
            (item) => item.topic
          )
        )
      )
    : []

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const subtopics =
    selectedGroup && selectedTopic
      ? KOMPAS_DATA.filter(
          (item) => item.group === selectedGroup && item.topic === selectedTopic
        )
      : []

  return (
    <div className='container mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Komunikačný kompas</h1>
      <p className='text-center text-gray-600 mb-12 max-w-2xl mx-auto'>
        Praktické vety a kroky, keď nevieš, ako začať rozhovor. Vyber si pre koho, zvoľ tému a
        otvor konkrétnu situáciu.
      </p>

      {/* Výber skupiny */}
      <div className='flex flex-wrap justify-center gap-3 mb-8'>
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => {
              setSelectedGroup(group)
              setSelectedTopic(null)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              selectedGroup === group
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span className='text-xl'>{groupIcons[group] || '🔹'}</span>
            <span>{group}</span>
          </button>
        ))}
      </div>

      {/* Špeciálny blok pre deti */}
      {selectedGroup === 'Deti' && (
        <div className='bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center'>
          <h2 className='text-xl font-semibold text-red-700 mb-2'>
            Ak je ti ťažko, nie si na to sám ❤️
          </h2>
          <p className='text-red-600 mb-4'>
            Ak máš pocit, že to nezvládaš, skús sa porozprávať s niekým, komu veríš.
            {"  "}Alebo sa môžeš obrátiť na odbornú pomoc:
          </p>
          <ul className='space-y-2 text-red-800 font-medium'>
            <li>
              ☎️ <a href='tel:116111' className='underline'>Linka detskej istoty – 116 111</a>
            </li>
            <li>
              💬{' '}
              <a href='https://ipcko.sk' target='_blank' className='underline'>
                IPčko – online chat a e-mailová poradňa
              </a>
            </li>
            <li>
              🌿 <a href='tel:0800800566' className='underline'>Nezábudka – linka dôvery 0800 800 566</a>
            </li>
          </ul>
        </div>
      )}

      {/* Výber témy */}
      {selectedGroup && (
        <div className='flex flex-wrap justify-center gap-3 mb-8'>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedTopic === topic
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      )}

      {/* Výpis subtopics */}
      {selectedGroup && selectedTopic && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {subtopics.map((item, idx) => (
            <div
              key={idx}
              className='bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg'
            >
              <h3 className='text-lg font-semibold mb-4'>{item.subtopic}</h3>
              {item.phrases.length > 0 ? (
                <ul className='space-y-2 list-disc list-inside text-gray-700'>
                  {item.phrases.map((phrase, i) => (
                    <li key={i}>{phrase}</li>
                  ))}
                </ul>
              ) : (
                <p className='text-gray-400 italic'>(Obsah zatiaľ čaká na doplnenie)</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Ak ešte nič nevybral */}
      {!selectedGroup && (
        <p className='text-center text-gray-400 mt-12'>
          Vyber si, s kým chceš lepšie komunikovať 👆
        </p>
      )}
    </div>
  )
}
