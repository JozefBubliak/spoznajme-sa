import { supabase } from "@/api/supabaseClient";

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

const applyFilters = (query, filters) => Object.entries(filters).reduce(
  (currentQuery, [column, value]) => currentQuery.eq(column, value),
  query,
);

const createStore = (table, { order } = {}) => ({
  list: async (filters = {}) => {
    let query = applyFilters(supabase.from(table).select("*"), filters);
    if (order) query = query.order(order.column, { ascending: order.ascending });
    return unwrap(await query);
  },
  create: async (values) => unwrap(await supabase.from(table).insert(values).select().single()),
  update: async (id, values) => unwrap(await supabase.from(table).update(values).eq("id", id).select().single()),
  remove: async (id) => unwrap(await supabase.from(table).delete().eq("id", id)),
});

const listAllTopics = async () => {
  const topics = [];
  const pageSize = 1000;
  for (let start = 0; ; start += pageSize) {
    const page = unwrap(await supabase
      .from("topics")
      .select("*")
      .eq("catalog_visible", true)
      .order("category")
      .order("name_sk")
      .range(start, start + pageSize - 1));
    topics.push(...page);
    if (page.length < pageSize) return topics;
  }
};

export const dataApi = {
  topics: {
    list: listAllTopics,
  },
  profiles: {
    getMe: async (userId) => unwrap(await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()),
    updatePerspective: async (userId, perspective) => unwrap(await supabase
      .from("profiles")
      .update({ perspective })
      .eq("user_id", userId)
      .select()
      .single()),
  },
  sessions: {
    getMine: async (userId) => unwrap(await supabase
      .from("pair_sessions")
      .select("*")
      .or(`created_by.eq.${userId},partner2_id.eq.${userId}`)
      .in("status", ["waiting", "active"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()),
    create: async () => unwrap(await supabase.rpc("create_pair_session")),
    join: async (code) => unwrap(await supabase.rpc("join_pair_session", { p_code: code })),
    close: async (sessionId) => unwrap(await supabase.rpc("close_pair_session", { p_session_id: sessionId })),
  },
  responses: {
    save: async ({ sessionId, topicId, userId, version, answers }) => unwrap(await supabase
      .from("responses")
      .upsert({
        session_id: sessionId,
        topic_id: topicId,
        user_id: userId,
        version,
        answers,
        completed: true,
      }, { onConflict: "session_id,topic_id,user_id,version" })
      .select()
      .single()),
    listPair: async (sessionId) => unwrap(await supabase
      .rpc("list_pair_responses", { p_session_id: sessionId })),
  },
  companion: {
    dailyPulses: {
      list: async (sessionId, date) => unwrap(await supabase
        .rpc("list_daily_pulse_state", { p_session_id: sessionId, p_date: date })),
      save: async (values) => unwrap(await supabase
        .from("daily_pulses")
        .upsert(values, { onConflict: "session_id,user_id,date" })
        .select()
        .single()),
    },
    bucketItems: createStore("bucket_items", { order: { column: "created_at", ascending: false } }),
    secretMessages: {
      list: async (sessionId) => unwrap(await supabase
        .rpc("list_secret_message_state", { p_session_id: sessionId })),
      create: async (values) => unwrap(await supabase.from("secret_messages").insert(values).select().single()),
      reveal: async (messageId) => unwrap(await supabase
        .rpc("reveal_secret_message", { p_message_id: messageId })),
    },
    partnerProfiles: {
      getMine: async () => unwrap(await supabase.from("partner_profiles").select("*").maybeSingle()),
      save: async (values) => unwrap(await supabase
        .from("partner_profiles")
        .upsert(values, { onConflict: "user_id" })
        .select()
        .single()),
    },
    relationshipDates: createStore("relationship_dates", { order: { column: "created_at", ascending: false } }),
    giftNotes: createStore("gift_notes", { order: { column: "created_at", ascending: false } }),
    matchingAnswers: {
      list: async (sessionId) => unwrap(await supabase
        .rpc("list_matching_answer_state", { p_session_id: sessionId })),
      save: async (values) => unwrap(await supabase
        .from("matching_answers")
        .upsert(values, { onConflict: "session_id,user_id,proposal_key" })
        .select()
        .single()),
    },
    compassScans: createStore("compass_scans", { order: { column: "created_at", ascending: false } }),
    journalEntries: createStore("journal_entries", { order: { column: "created_at", ascending: false } }),
    mutualAnswers: {
      list: async (sessionId, expectedCount) => unwrap(await supabase
        .rpc("list_mutual_answer_state", { p_session_id: sessionId, p_expected_count: expectedCount })),
      save: async (values) => unwrap(await supabase
        .from("mutual_answers")
        .upsert(values, { onConflict: "session_id,user_id,question_key" })
        .select()
        .single()),
    },
  },
};
