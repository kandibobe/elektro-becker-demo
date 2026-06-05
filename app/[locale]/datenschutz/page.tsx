import { Link } from '@/i18n/routing';
import { electricianConfig } from '@lib/config';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
      <div className="container-narrow max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-blue-glow)] transition-colors mb-8"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-8 tracking-tight">
          Datenschutzerklärung
        </h1>

        <div className="space-y-6 text-sm text-[var(--color-muted)]">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
            ⚠ <strong>Demo-Hinweis:</strong> Dies ist eine fiktive Demo-Website. Alle genannten
            Angaben sind erfunden. Es werden keine personenbezogenen Daten dauerhaft gespeichert.
          </div>

          <section>
            <h2 className="text-base font-bold text-[var(--color-text)] mb-2">
              1. Verantwortlicher
            </h2>
            <p className="leading-relaxed">
              Verantwortlich für diese Demo-Website im Sinne der DSGVO ist:
              <br />
              <a
                href="https://kobiakov.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-blue-glow)] underline hover:no-underline"
              >
                Vladislav Kobiakov — kobiakov.dev
              </a>
              <br />
              Fiktive Unternehmensadresse: {electricianConfig.addressDisplay}
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--color-text)] mb-2">
              2. Erhobene Daten
            </h2>
            <p className="leading-relaxed">
              Wenn Sie das Kontaktformular auf dieser Demo-Website ausfüllen, werden die folgenden
              Daten erhoben:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Vor- und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Gewünschte Leistung</li>
              <li>Optionale Nachricht</li>
            </ul>
            <p className="mt-2 leading-relaxed">
              Diese Daten werden ausschließlich zur Bearbeitung Ihrer Demo-Anfrage verwendet und
              nicht dauerhaft gespeichert oder an Dritte weitergegeben.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--color-text)] mb-2">
              3. Cookies
            </h2>
            <p className="leading-relaxed">
              Diese Demo-Website verwendet keine Tracking- oder Analyse-Cookies. Es werden
              ausschließlich technisch notwendige Session-Cookies eingesetzt.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--color-text)] mb-2">
              4. Google Maps
            </h2>
            <p className="leading-relaxed">
              Diese Website verwendet Google Maps für die Darstellung des Standorts. Beim Laden der
              Karte kann Google Daten erheben. Weitere Informationen finden Sie in der{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-blue-glow)] underline hover:no-underline"
              >
                Datenschutzerklärung von Google
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--color-text)] mb-2">
              5. Ihre Rechte
            </h2>
            <p className="leading-relaxed">
              Sie haben gemäß DSGVO das Recht auf Auskunft, Berichtigung, Löschung und
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich hierzu
              an:{' '}
              <a
                href="https://kobiakov.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-blue-glow)] underline hover:no-underline"
              >
                kobiakov.dev
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
