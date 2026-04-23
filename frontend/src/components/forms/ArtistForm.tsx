'use client';

import { useState } from 'react';
import { sendContactMessage } from '@/lib/api';

interface FormData {
  group_name: string;
  style: string;
  listen_url: string;
  social: string;
  size: string;
  bio: string;
  budget: string;
}

const INITIAL: FormData = {
  group_name: '',
  style: '',
  listen_url: '',
  social: '',
  size: '',
  bio: '',
  budget: '',
};

export default function ArtistForm() {
  const [data, setData] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const message = [
      `Groupe / Artiste : ${data.group_name}`,
      `Style musical : ${data.style}`,
      `Lien d'écoute : ${data.listen_url}`,
      `Instagram / Facebook : ${data.social || 'NC'}`,
      `Nombre de personnes : ${data.size || 'NC'}`,
      `Bio & matériel : ${data.bio || 'NC'}`,
      `Budget / cachet : ${data.budget || 'NC'}`,
    ].join('\n');

    const result = await sendContactMessage({
      name: data.group_name,
      email: 'candidature@sciot.fr',
      subject: `Candidature artiste : ${data.group_name}`,
      message,
    });

    setStatus(result.ok ? 'success' : 'error');
    if (result.ok) setData(INITIAL);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Feedback */}
      {status === 'success' && (
        <div className="rounded-sm border-l-4 border-green-500 bg-green-50 p-4 text-green-800 text-sm font-medium">
          ✅ Candidature envoyée avec succès ! Maud &amp; Kiwi reviendront vers vous prochainement.
        </div>
      )}
      {status === 'error' && (
        <div className="rounded-sm border-l-4 border-red-500 bg-red-50 p-4 text-red-800 text-sm font-medium">
          ❌ Une erreur est survenue. Merci de réessayer ou de nous contacter directement.
        </div>
      )}

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Nom du Groupe / Artiste *">
          <input
            type="text"
            value={data.group_name}
            onChange={set('group_name')}
            className="form-field"
            placeholder="Votre groupe"
            required
          />
        </Field>
        <Field label="Style Musical *">
          <input
            type="text"
            value={data.style}
            onChange={set('style')}
            className="form-field"
            placeholder="Ex : Funk / Rock / DJ Set"
            required
          />
        </Field>
      </div>

      {/* Row 2 */}
      <Field label="Lien d'écoute (Spotify, SoundCloud, YouTube…) *">
        <input
          type="url"
          value={data.listen_url}
          onChange={set('listen_url')}
          className="form-field"
          placeholder="Indispensable pour qu'on puisse vous écouter"
          required
        />
      </Field>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Instagram / Facebook">
          <input
            type="text"
            value={data.social}
            onChange={set('social')}
            className="form-field"
            placeholder="@votre_groupe"
          />
        </Field>
        <Field label="Nombre de personnes sur scène">
          <select value={data.size} onChange={set('size')} className="form-field">
            <option value="">Choisissez…</option>
            <option>Solo / Duo</option>
            <option>Trio / Quatuor</option>
            <option>Grand Groupe (5+)</option>
          </select>
        </Field>
      </div>

      {/* Bio */}
      <Field label="Présentation & Matériel">
        <textarea
          value={data.bio}
          onChange={set('bio')}
          className="form-field resize-none"
          rows={5}
          placeholder="Bio courte + besoins techniques (sono, backline…)"
        />
      </Field>

      {/* Budget */}
      <Field label="Budget / Cachet souhaité (€)">
        <input
          type="text"
          value={data.budget}
          onChange={set('budget')}
          className="form-field"
          placeholder="Indiquez une fourchette ou votre tarif habituel"
        />
      </Field>

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-block px-12 py-4 bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma candidature'}
        </button>
      </div>
    </form>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}
