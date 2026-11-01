export interface AssignmentSection {
  id: string;
  title: string;
  h5pIds: string[];
}

// Normalisiert gespeicherte Daten zu Bereichen (abwärtskompatibel zu alten Dokumenten ohne sections)
export function normalizeSections(rawDoc: object | null | undefined): AssignmentSection[] {
  const doc = rawDoc as { h5pIds?: unknown; sections?: unknown } | null | undefined;
  if (doc && Array.isArray(doc.sections) && doc.sections.length > 0) {
    return (doc.sections as AssignmentSection[]).map((s) => ({
      id: String(s.id),
      title: typeof s.title === 'string' ? s.title : '',
      h5pIds: Array.isArray(s.h5pIds) ? s.h5pIds.filter((x) => typeof x === 'string') : [],
    }));
  }
  const ids = doc && Array.isArray(doc.h5pIds) ? (doc.h5pIds as string[]) : [];
  return [{ id: 'general', title: '', h5pIds: ids }];
}
