import { useState, useEffect, useCallback } from "react";
import type { PortfolioEntry, UserProfile, EntryCategory, Tag } from "@/lib/types";

const ENTRIES_KEY = "pm-portfolio-entries";
const PROFILE_KEY = "pm-portfolio-profile";
const FILES_KEY = "pm-portfolio-files";

const DEFAULT_PROFILE: UserProfile = {
  name: "Your Name",
  role: "Aspiring Product Manager",
  bio: "Passionate about building products that solve real problems. Currently learning product management through hands-on projects, case studies, and continuous experimentation.",
};

function loadEntries(): PortfolioEntry[] {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function usePortfolio() {
  const [entries, setEntries] = useState<PortfolioEntry[]>(loadEntries);
  const [profile, setProfileState] = useState<UserProfile>(loadProfile);

  useEffect(() => {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const addEntry = useCallback((entry: Omit<PortfolioEntry, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newEntry: PortfolioEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setEntries((prev) => [newEntry, ...prev]);
    return newEntry;
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<PortfolioEntry>) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
      )
    );
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    // Clean up files
    try {
      const files = JSON.parse(localStorage.getItem(FILES_KEY) || "{}");
      Object.keys(files).forEach((key) => {
        if (key.startsWith(id)) delete files[key];
      });
      localStorage.setItem(FILES_KEY, JSON.stringify(files));
    } catch {}
  }, []);

  const setProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => ({ ...prev, ...updates }));
  }, []);

  const getEntriesByCategory = useCallback(
    (category: EntryCategory) => entries.filter((e) => e.category === category),
    [entries]
  );

  const searchEntries = useCallback(
    (query: string, category?: EntryCategory, tags?: Tag[]) => {
      let filtered = entries;
      if (category) filtered = filtered.filter((e) => e.category === category);
      if (tags && tags.length > 0)
        filtered = filtered.filter((e) => tags.some((t) => e.tags.includes(t)));
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            e.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return filtered;
    },
    [entries]
  );

  const saveFile = useCallback((entryId: string, fileName: string, dataUrl: string) => {
    try {
      const files = JSON.parse(localStorage.getItem(FILES_KEY) || "{}");
      files[`${entryId}:${fileName}`] = dataUrl;
      localStorage.setItem(FILES_KEY, JSON.stringify(files));
    } catch {}
  }, []);

  const getFile = useCallback((entryId: string, fileName: string): string | null => {
    try {
      const files = JSON.parse(localStorage.getItem(FILES_KEY) || "{}");
      return files[`${entryId}:${fileName}`] || null;
    } catch {
      return null;
    }
  }, []);

  return {
    entries,
    profile,
    addEntry,
    updateEntry,
    deleteEntry,
    setProfile,
    getEntriesByCategory,
    searchEntries,
    saveFile,
    getFile,
  };
}
