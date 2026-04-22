import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

export const isSupabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

function getSupabaseClient() {
  if (!supabase) {
    throw new Error(
      "Supabase não está configurado. Define VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.",
    );
  }

  return supabase;
}

async function runQuery(promise, fallbackMessage) {
  const { data, error } = await promise;

  if (error) {
    throw new Error(error.message || fallbackMessage);
  }

  return data;
}

export async function getRemoteSession() {
  const client = getSupabaseClient();
  const {
    data: { session },
    error,
  } = await client.auth.getSession();

  if (error) {
    throw new Error(error.message || "Não foi possível obter a sessão atual.");
  }

  return session;
}

export async function signUpWithSupabase(email, password) {
  const client = getSupabaseClient();
  const { data, error } = await client.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || "Não foi possível criar a conta.");
  }

  return data;
}

export async function signInWithSupabase(email, password) {
  const client = getSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || "Não foi possível iniciar sessão.");
  }

  return data;
}

export async function signOutWithSupabase() {
  const client = getSupabaseClient();
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message || "Não foi possível terminar sessão.");
  }
}

export async function fetchRemoteSnapshot() {
  const client = getSupabaseClient();

  const [authorizedUsers, profiles, groups, groupMembers, feedbackEntries, recoveryRequests] =
    await Promise.all([
      runQuery(
        client
          .from("authorized_users")
          .select("*")
          .order("role", { ascending: true })
          .order("full_name", { ascending: true }),
        "Não foi possível carregar os utilizadores autorizados.",
      ),
      runQuery(
        client.from("profiles").select("id, email, role"),
        "Não foi possível carregar os perfis autenticados.",
      ),
      runQuery(
        client.from("groups").select("*").order("day", { ascending: true }),
        "Não foi possível carregar os grupos.",
      ),
      runQuery(
        client.from("group_members").select("*"),
        "Não foi possível carregar os membros dos grupos.",
      ),
      runQuery(
        client.from("feedback_entries").select("*"),
        "Não foi possível carregar o feedback.",
      ),
      runQuery(
        client
          .from("access_recovery_requests")
          .select("*")
          .order("requested_at", { ascending: false }),
        "Não foi possível carregar os pedidos de recuperação.",
      ),
    ]);

  return {
    authorizedUsers,
    profiles,
    groups,
    groupMembers,
    feedbackEntries,
    recoveryRequests,
  };
}

export async function upsertAuthorizedUsersInSupabase(records) {
  if (!isSupabaseEnabled || records.length === 0) {
    return;
  }

  const client = getSupabaseClient();
  const { error } = await client
    .from("authorized_users")
    .upsert(records, { onConflict: "email" });

  if (error) {
    throw new Error(error.message || "Não foi possível sincronizar os utilizadores.");
  }
}

export async function replaceGroupsInSupabase(groups) {
  if (!isSupabaseEnabled) {
    return;
  }

  const client = getSupabaseClient();
  const currentGroups = await runQuery(
    client.from("groups").select("id"),
    "Não foi possível ler os grupos atuais.",
  );

  const currentGroupIds = currentGroups.map((group) => group.id);
  const nextGroupIds = groups.map((group) => group.id);
  const removedGroupIds = currentGroupIds.filter((id) => !nextGroupIds.includes(id));

  if (removedGroupIds.length > 0) {
    const { error } = await client.from("groups").delete().in("id", removedGroupIds);

    if (error) {
      throw new Error(error.message || "Não foi possível remover grupos antigos.");
    }
  }

  if (groups.length === 0) {
    return;
  }

  const groupRecords = groups.map((group) => ({
    id: group.id,
    day: group.day,
    period: group.period,
    studio: group.studio,
    mentor_id: group.mentorId,
    final_lyrics: group.finalLyrics ?? "",
    session_feedback: group.sessionFeedback ?? "",
    audio_upload_name: group.audioUploadName ?? "",
    audio_upload_size_label: group.audioUploadSizeLabel ?? "",
    is_locked: Boolean(group.isLocked),
  }));

  const { error } = await client.from("groups").upsert(groupRecords, { onConflict: "id" });

  if (error) {
    throw new Error(error.message || "Não foi possível sincronizar os grupos.");
  }

  const { error: deleteMembersError } = await client
    .from("group_members")
    .delete()
    .in("group_id", nextGroupIds);

  if (deleteMembersError) {
    throw new Error(deleteMembersError.message || "Não foi possível atualizar os membros.");
  }

  const memberRecords = groups.flatMap((group) =>
    group.participantIds.map((participantId) => ({
      group_id: group.id,
      participant_id: participantId,
    })),
  );

  if (memberRecords.length === 0) {
    return;
  }

  const { error: insertMembersError } = await client
    .from("group_members")
    .upsert(memberRecords, { onConflict: "group_id,participant_id" });

  if (insertMembersError) {
    throw new Error(insertMembersError.message || "Não foi possível guardar os membros.");
  }
}

export async function replaceFeedbackEntriesInSupabase(entries) {
  if (!isSupabaseEnabled) {
    return;
  }

  const records = Object.entries(entries)
    .filter(([, entry]) => entry?.message)
    .map(([authorKey, entry]) => ({
      author_key: authorKey,
      author_email: entry.authorEmail ?? null,
      author_role: entry.authorRole ?? null,
      message: entry.message,
      updated_at: entry.updatedAt ?? new Date().toISOString(),
    }));

  if (records.length === 0) {
    return;
  }

  const client = getSupabaseClient();
  const { error } = await client
    .from("feedback_entries")
    .upsert(records, { onConflict: "author_key" });

  if (error) {
    throw new Error(error.message || "Não foi possível sincronizar o feedback.");
  }
}

export async function upsertRecoveryRequestsInSupabase(requests) {
  if (!isSupabaseEnabled) {
    return;
  }

  const records = Object.values(requests).map((request) => ({
    email: request.email,
    user_id: request.userId ?? null,
    name: request.name,
    role: request.role,
    requested_at: request.requestedAt,
    resolved: Boolean(request.resolved),
    prepared_at: request.preparedAt ?? null,
  }));

  if (records.length === 0) {
    return;
  }

  const client = getSupabaseClient();
  const { error } = await client
    .from("access_recovery_requests")
    .upsert(records, { onConflict: "email" });

  if (error) {
    throw new Error(error.message || "Não foi possível sincronizar os pedidos de recuperação.");
  }
}
