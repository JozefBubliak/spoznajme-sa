export default async function useAnswerSubmit({
  code,
  playerId,
  roundId,
  qIndex,
  answer,
}: {
  code: string
  playerId: string
  roundId: string
  qIndex: number
  answer: string
}) {
  return fetch(`/api/games/${code}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId, roundId, qIndex, answer }),
  })
}
