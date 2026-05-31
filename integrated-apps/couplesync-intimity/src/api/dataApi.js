import { supabase } from "@/api/supabaseClient";

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

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
};
