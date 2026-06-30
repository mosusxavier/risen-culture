import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';

const missingConfigMessage = 'Authentication and account features are currently unavailable. Please try again later.';

const getSupabaseErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim()) {
      const normalized = message.toLowerCase();
      if (
        normalized.includes('failed to fetch') ||
        normalized.includes('network') ||
        normalized.includes('err_name_not_resolved') ||
        normalized.includes('fetch')
      ) {
        return missingConfigMessage;
      }
      return message;
    }
  }

  return missingConfigMessage;
};

let supabaseReachabilityCache: { ok: boolean; expires: number } | null = null;

export async function isSupabaseAvailable() {
  if (!isSupabaseConfigured || typeof window === 'undefined') return false;
  const now = Date.now();
  if (supabaseReachabilityCache && supabaseReachabilityCache.expires > now) {
    return supabaseReachabilityCache.ok;
  }

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: { apikey: supabaseAnonKey },
    });
    window.clearTimeout(timeout);
    const ok = response.ok;
    supabaseReachabilityCache = { ok, expires: now + 5000 };
    return ok;
  } catch {
    supabaseReachabilityCache = { ok: false, expires: now + 5000 };
    return false;
  }
}

const createUnavailableQuery = (message: string) => ({
  data: null,
  error: { message },
  select: () => createUnavailableQuery(message),
  order: () => createUnavailableQuery(message),
  eq: () => createUnavailableQuery(message),
  single: async () => ({ data: null, error: { message } }),
});

const isSupabaseReachable = async () => {
  if (typeof window === 'undefined' || !supabaseUrl || !supabaseAnonKey) return false;

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: { apikey: supabaseAnonKey },
    });
    window.clearTimeout(timeout);
    return response.ok;
  } catch {
    return false;
  }
};

const createMissingSupabaseClient = () => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: missingConfigMessage } }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: missingConfigMessage } }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => createUnavailableQuery(missingConfigMessage),
    insert: async () => ({ data: null, error: { message: missingConfigMessage } }),
    upsert: async () => ({ data: null, error: { message: missingConfigMessage } }),
    delete: () => ({ eq: async () => ({ data: null, error: { message: missingConfigMessage } }) }),
  }),
});

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));

const createSafeSupabaseClient = (client: any) => ({
  auth: {
    getSession: async () => {
      try {
        if (!(await isSupabaseReachable())) {
          return { data: { session: null }, error: { message: missingConfigMessage } };
        }
        return await Promise.resolve(client.auth.getSession());
      } catch (error) {
        return { data: { session: null }, error: { message: getSupabaseErrorMessage(error) } };
      }
    },
    onAuthStateChange: (callback: (...args: any[]) => void) => {
      try {
        return client.auth.onAuthStateChange(callback);
      } catch {
        return { data: { subscription: { unsubscribe: () => undefined } } };
      }
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      try {
        if (!(await isSupabaseReachable())) {
          return { data: { user: null, session: null }, error: { message: missingConfigMessage } };
        }
        return await Promise.resolve(client.auth.signInWithPassword(credentials));
      } catch (error) {
        return { data: { user: null, session: null }, error: { message: getSupabaseErrorMessage(error) } };
      }
    },
    signUp: async (credentials: { email: string; password: string; options?: { data?: Record<string, unknown> } }) => {
      try {
        if (!(await isSupabaseReachable())) {
          return { data: { user: null, session: null }, error: { message: missingConfigMessage } };
        }
        return await Promise.resolve(client.auth.signUp(credentials));
      } catch (error) {
        return { data: { user: null, session: null }, error: { message: getSupabaseErrorMessage(error) } };
      }
    },
    signOut: async () => {
      try {
        return await Promise.resolve(client.auth.signOut());
      } catch {
        return { error: null };
      }
    },
  },
  from: (table: string) => {
    try {
      return client.from(table);
    } catch {
      return {
        select: () => createUnavailableQuery(missingConfigMessage),
        insert: async () => ({ data: null, error: { message: missingConfigMessage } }),
        upsert: async () => ({ data: null, error: { message: missingConfigMessage } }),
        delete: () => ({ eq: async () => ({ data: null, error: { message: missingConfigMessage } }) }),
      };
    }
  },
});

export const supabase = isSupabaseConfigured ? createSafeSupabaseClient(createClient(supabaseUrl, supabaseAnonKey)) as any : createMissingSupabaseClient() as any;
