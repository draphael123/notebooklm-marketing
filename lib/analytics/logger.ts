/**
 * Analytics and Logging
 */

import { createClient } from "@supabase/supabase-js";

let supabaseClient: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (process.env.SUPABASE_DB_URL && process.env.SUPABASE_KEY) {
    if (!supabaseClient) {
      supabaseClient = createClient(
        process.env.SUPABASE_DB_URL,
        process.env.SUPABASE_KEY
      );
    }
    return supabaseClient;
  }
  return null;
}

export interface QueryLog {
  question: string;
  intent: string;
  sourcesUsed: string[];
  responseTime: number;
  ctaClicked?: boolean;
  userFeedback?: "positive" | "negative";
  clientId?: string;
}

export async function logQuery(log: QueryLog): Promise<void> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    // Fallback to console logging
    console.log("Query logged:", log);
    return;
  }

  try {
    const { error } = await supabase.from("query_logs").insert({
      question: log.question,
      intent: log.intent,
      sources_used: log.sourcesUsed,
      response_time: log.responseTime,
      cta_clicked: log.ctaClicked || false,
      user_feedback: log.userFeedback || null,
      client_id: log.clientId || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error logging query:", error);
    }
  } catch (error) {
    console.error("Error logging query:", error);
  }
}

export async function getAnalytics(
  startDate?: Date,
  endDate?: Date
): Promise<any> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  try {
    let query = supabase.from("query_logs").select("*");

    if (startDate) {
      query = query.gte("created_at", startDate.toISOString());
    }
    if (endDate) {
      query = query.lte("created_at", endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching analytics:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
}

