'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

/** Tiny, consistent outline icons (no extra deps) */
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  )
}

const Icons = {
  Search: () => (
    <Icon>
      <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
      <path d="M16.2 16.2 21 21" />
    </Icon>
  ),
  Hospital: () => (
    <Icon>
      <path d="M4 20V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13" />
      <path d="M9 20v-6h6v6" />
      <path d="M12 8v4" />
      <path d="M10 10h4" />
    </Icon>
  ),
  Steth: () => (
    <Icon>
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M14 8h2a4 4 0 0 1 4 4v1" />
      <path d="M20 13a2 2 0 1 1-4 0v-1" />
      <path d="M10 13v2a6 6 0 0 0 6 6h2" />
    </Icon>
  ),
  Clipboard: () => (
    <Icon>
      <path d="M9 4h6" />
      <path d="M9 4a2 2 0 0 0-2 2v14h10V6a2 2 0 0 0-2-2" />
      <path d="M9 4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </Icon>
  ),
  Phone: () => (
    <Icon>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.7 19.7 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L9.9 10.4a16 16 0 0 0 3.7 3.7l1.3-1.3a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6a2 2 0 0 1 1.7 2z" />
    </Icon>
  ),
  Mail: () => (
    <Icon>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  ),
  Clock: () => (
    <Icon>
      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
      <path d="M12 6v6l4 2" />
    </Icon>
  ),
  MapPin: () => (
    <Icon>
      <path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11z" />
      <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </Icon>
  ),
  Alert: () => (
    <Icon>
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 3.6 2.3 18.1A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-2.9l-8-14.5a2 2 0 0 0-3.4 0z" />
    </Icon>
  ),
  ArrowRight: () => (
    <Icon>
      <path d="M5 12h12" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  ),
}

function cx(...c: Array<string | boolean | undefined>) {
  return c.filter(Boolean).join(' ')
}

const CARD =
  'bg-white rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-md transition-all'
const INPUT =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500'

function DoctorsWithFilters() {
  const specialties = [
    'Toți',
    'Cardiologie',
    'Medicină internă',
    'Diabet/Nutriție',
    'Obstetrică–Ginecologie',
    'Oftalmologie',
    'Dermatologie',
    'ORL',
    'Ortopedie',
    'Reumatologie',
    'Endocrinologie',
    'Psihiatrie',
    'Psihologie',
    'Alergologie',
    'Kinetoterapie',
    'Neurologie pediatrică',
  ];

  const femaleImages = [
    '/images/how-are-you-feeling-today-shot-of-a-mature-doctor-2026-01-09-09-30-52-utc.jpg',
    '/images/medic-cardiologist-monitoring-the-heart-rate-of-an-2026-01-11-10-54-31-utc.jpg',
  ];

  const maleImages = [
    '/images/male-doctor-with-x-ray-looking-at-camera-standing-2026-01-09-09-01-33-utc.jpg',
    '/images/portrait-man-and-doctor-writing-in-notebook-for-h-2026-01-09-11-01-13-utc.jpg',
    '/images/youre-in-good-hands-portrait-of-a-male-doctor-rea-2026-01-09-11-43-48-utc.jpg',
    '/images/smiling-bearded-doctor-with-stethoscope-looking-at-2026-01-06-00-13-47-utc.jpg',
  ];

  function pickImage(name: string, gender: 'female' | 'male') {
    const pool = gender === 'female' ? femaleImages : maleImages;
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    return pool[hash % pool.length];
  }

  const doctors = [
    { name: 'Dr. Cristina CIUCA', specialty: 'Cardiologie', gender: 'female' as const, details: 'Specialist în cardiologie cu peste 15 ani de experiență. Expert în diagnosticarea și tratamentul afecțiunilor cardiovasculare.' },
    { name: 'Dr. Cristian CIOBANU', specialty: 'Medicină internă', gender: 'male' as const, details: 'Medic internist specializat în diabet, hipertensiune și boli metabolice. Doctor în științe medicale.' },
    { name: 'Dr. Monica VORNICU', specialty: 'Diabet/Nutriție', gender: 'female' as const, details: 'Specialist în diabet și nutriție cu abordare holistică.' },
    { name: 'Dr. Marilena COSMA', specialty: 'Obstetrică–Ginecologie', gender: 'female' as const, details: 'Obstetrician-ginecolog cu experiență în sarcină și naștere.' },
    { name: 'Dr. Alona SKRYPNYK', specialty: 'Obstetrică–Ginecologie', gender: 'female' as const, details: 'Specialist în obstetrică și ginecologie.' },
    { name: 'Dr. Cristina CHIRIAC', specialty: 'Oftalmologie', gender: 'female' as const, details: 'Oftalmolog cu specializare în chirurgie refractivă și tratamentul glaucomului.' },
    { name: 'Dr. Artenie Claudia', specialty: 'Dermatologie', gender: 'female' as const, details: 'Dermatolog cu competențe în dermatologie cosmetică și oncologică.' },
    { name: 'Dr. Kaled ASHRAF', specialty: 'ORL', gender: 'male' as const, details: 'Specialist ORL cu experiență în chirurgie otorinolaringologică.' },
    { name: 'Dr. Ștefan GHEORGHIEVICI', specialty: 'Ortopedie', gender: 'male' as const, details: 'Ortoped specializat în artroscopie și chirurgie reconstructivă.' },
    { name: 'Dr. Daniel RADOI', specialty: 'Psihiatrie', gender: 'male' as const, details: 'Psihiatru cu abordare integrativă în sănătatea mintală.' },
    { name: 'Dr. Manuela APOSTOL', specialty: 'Psihologie', gender: 'female' as const, details: 'Psiholog clinician specializat în terapie cognitiv-comportamentală.' },
    { name: 'Dr. Irina ALEXANDRU', specialty: 'Alergologie', gender: 'female' as const, details: 'Alergolog cu expertiză în diagnostic și tratament alergii.' },
    { name: 'Robert NEAGU', specialty: 'Kinetoterapie', gender: 'male' as const, details: 'Kinetoterapeut specializat în recuperare și reabilitare.' },
    { name: 'Dr. Condrea Adrian', specialty: 'Endocrinologie', gender: 'male' as const, details: 'Endocrinolog cu focus pe tulburări hormonale.' },
    { name: 'Dr. Armașu Ioana', specialty: 'Endocrinologie', gender: 'female' as const, details: 'Specialist în endocrinologie pediatrică.' },
    { name: 'Dr. Gociman Anca', specialty: 'Endocrinologie', gender: 'female' as const, details: 'Endocrinolog cu experiență în diabet zaharat.' },
    { name: 'Dr. Nicorescu Alexandra', specialty: 'Endocrinologie', gender: 'female' as const, details: 'Specialist în endocrinologie și nutriție.' },
    { name: 'Dr. Rîmbu Cosmina', specialty: 'Endocrinologie', gender: 'female' as const, details: 'Endocrinolog cu competențe în tiroidologie.' },
    { name: 'Dr. Laura OBREJA', specialty: 'Reumatologie', gender: 'female' as const, details: 'Reumatolog specializat în boli inflamatorii.' },
    { name: 'Dr. Ciopeică Maria Geanina', specialty: 'Reumatologie', gender: 'female' as const, details: 'Specialist în reumatologie și imunologie.' },
    { name: 'Dr. Grigore Ioana', specialty: 'Neurologie pediatrică', gender: 'female' as const, details: 'Neurolog pediatric cu expertiză în epilepsie și dezvoltare neurologică.' },
  ].map((d) => ({
    ...d,
    image: pickImage(d.name, d.gender),
  }));

  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState('Toți');
  const [specOpen, setSpecOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setActive(desktop ? 'Cardiologie' : 'Toți');
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const filtered = doctors.filter((d) => {
    const matchSpec = active === 'Toți' || d.specialty === active;
    return matchSpec;
  });

  return (
    <>
      <div className="mb-8">
        <div className="md:hidden max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => setSpecOpen((v) => !v)}
            aria-expanded={specOpen}
            className="w-full flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <span className="text-sm font-semibold text-slate-900">
              {active === 'Toți' ? 'Toate specialitățile' : active}
            </span>
            <span className="text-slate-500 text-lg">{specOpen ? '▲' : '▼'}</span>
          </button>
          {specOpen && (
            <div className="mt-2 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="max-h-[320px] overflow-y-auto p-2">
                {specialties.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setActive(s);
                      setSpecOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active === s ? 'bg-teal-600 text-white' : 'hover:bg-gray-50 text-slate-800'
                    }`}
                  >
                    {s === 'Toți' ? 'Toate specialitățile' : s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex justify-center">
          <div className="flex gap-2 overflow-x-auto max-w-full px-2 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {specialties.slice(1).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActive(s)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active === s ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-6 pb-4 sm:hidden">
        {filtered.slice(0, 10).map((doctor) => ( // limit for mobile
          <div
            key={doctor.name}
            className="flex-shrink-0 w-64 bg-white p-6 rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-4">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={72}
                height={72}
                className="rounded-2xl object-cover ring-1 ring-black/10"
              />
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 truncate">{doctor.name}</div>
                <div className="text-sm text-teal-700">{doctor.specialty}</div>
                <div className="text-xs text-slate-500 mt-1">Programări L–V</div>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="flex-1 inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
              >
                Detalii
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Programează
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doctor) => (
          <div
            key={doctor.name}
            className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-4">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={72}
                height={72}
                className="rounded-2xl object-cover ring-1 ring-black/10"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jpQ0AAAAASUVORK5CYII="
                quality={85}
                priority={false}
                sizes="(max-width: 768px) 72px, 72px"
                unoptimized={false}
                fetchPriority="low"
                style={{ objectFit: 'cover' }}
              />
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 truncate">{doctor.name}</div>
                <div className="text-sm text-teal-700">{doctor.specialty}</div>
                <div className="text-xs text-slate-500 mt-1">Programări L–V</div>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="flex-1 inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
              >
                Detalii
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Programează
              </a>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center text-slate-600 mt-10">
          Nu am găsit niciun medic pentru filtrul curent.
        </div>
      )}

      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedDoctor(null)}>
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl ring-1 ring-black/5" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{selectedDoctor.name}</h3>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full ring-1 ring-black/10">
                  <Image
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-sm font-medium text-teal-600 mb-2">{selectedDoctor.specialty}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedDoctor.details}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="#contact"
                  onClick={() => setSelectedDoctor(null)}
                  className="flex-1 inline-flex items-center justify-center rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
                >
                  Programează
                </a>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  Închide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <main className="min-h-screen pb-24 md:pb-0 bg-white">
      {/* Header */}
      <header
        className={cx(
          'fixed top-0 left-0 right-0 z-30 transition-all',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm ring-1 ring-black/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center">
            <Image
              src="/images/cropped-Logo-nou-cerc-e1667761503676.png"
              alt="Pro Life Clinics Logo"
              width={64}
              height={64}
              className="rounded-xl"
            />
          </a>

          <nav className={`hidden md:flex items-center gap-8 text-sm ${scrolled ? 'text-slate-700' : 'text-white'}`}>
            <a href="#services" className="hover:text-teal-700">
              Servicii
            </a>
            <a href="#doctors" className="hover:text-teal-700">
              Medici
            </a>
            <a href="#locations" className="hover:text-teal-700">
              Locațiile Noastre
            </a>
            <a href="#contact" className="hover:text-teal-700">
              Contact
            </a>
            <a
              href="#contact"
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-white shadow-sm hover:bg-teal-700"
            >
              Programează-te
            </a>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 backdrop-blur"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Deschide meniul"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md ring-1 ring-black/5">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-slate-800">
              {[
                ['Servicii', '#services'],
                ['Medici', '#doctors'],
                ['Locațiile Noastre', '#locations'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 hover:bg-slate-50"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-3 text-white shadow-sm hover:bg-teal-700"
              >
                Programează-te
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[92vh] flex items-center">
        {/* Video background (replace src with your mp4 if you want) */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          poster="/images/empty-medical-office-equipped-with-modern-furnitur-2026-01-08-02-25-57-utc.JPG"
        >
          {/* Example: <source src="/videos/hero.mp4" type="video/mp4" /> */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />

        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
            <div className="max-w-3xl">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                Servicii medicale complete,
                <br className="hidden sm:block" /> într-un singur loc.
              </h1>
              <p className="mt-4 text-white/85 text-base sm:text-lg md:text-xl leading-relaxed">
                Consult, investigații și îngrijire în specialități multiple, cu programare rapidă.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Ambulatoriu', 'Spitalizare de zi', 'Medicina muncii'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs sm:text-sm text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-teal-700"
                >
                  Programează-te
                </a>
                <a
                  href="tel:0735230853"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 py-4 text-base font-semibold text-white hover:bg-white hover:text-slate-900 transition-colors"
                >
                  Sună acum
                </a>
              </div>

              <div className="mt-6 text-xs text-white/60">
                Confirmăm telefonic programarea.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center text-slate-900">
            Serviciile Noastre Principale
          </h2>
          <p className="mt-3 text-center text-slate-600">
            Oferim îngrijire medicală completă sub același acoperiș.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Ambulatoriu clinic',
                desc: 'Specialități multiple pentru consultații și tratamente.',
                icon: <Icons.Hospital />,
              },
              {
                title: 'Spitalizare de zi',
                desc: 'Proceduri medicale fără internare prelungită.',
                icon: <Icons.Steth />,
              },
              {
                title: 'Medicina muncii',
                desc: 'Evaluări pentru angajare și sănătate ocupațională.',
                icon: <Icons.Clipboard />,
              },
            ].map((s) => (
              <div key={s.title} className={cx(CARD, 'p-7 text-center')}>
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-600/10">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Doctors Section (filters by specialty + search) */}
      <section id="doctors" className="py-12 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Medici</h2>
          <p className="text-center text-gray-600 mb-10">
            Alege specialitatea și găsește medicul potrivit.
          </p>

          <DoctorsWithFilters />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center text-slate-900">
            Întrebări Frecvente
          </h2>
          <p className="mt-3 text-center text-slate-600">
            Răspunsuri rapide la cele mai comune întrebări.
          </p>

          <div className="mt-10 space-y-3">
            {[
              {
                q: 'Cum fac programare?',
                a: 'Puteți trimite solicitarea prin formular sau puteți suna direct. Confirmăm telefonic programarea.',
              },
              {
                q: 'Ce acte îmi trebuie?',
                a: 'În funcție de serviciu, poate fi necesară cartea de identitate și/sau documente medicale anterioare.',
              },
              {
                q: 'Cum ajung la clinică?',
                a: 'Folosiți butoanele “Deschide în Maps” din secțiunea Contact pentru locația dorită.',
              },
              {
                q: 'Cum reprogramăm o vizită?',
                a: 'Ne puteți contacta telefonic sau prin email și reprogramăm în funcție de disponibilitate.',
              },
            ].map((item) => (
              <details
                key={item.q}
                open={false}
                className={cx(CARD, 'group p-6')}
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-black/5 group-open:bg-teal-50 group-open:text-teal-700">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">–</span>
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center text-slate-900 mb-8">
            Locațiile Noastre
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={cx(CARD, 'p-6')}>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Adresa Clinică București</h3>
              <p className="text-slate-600 mb-4">
                Anastasie Panu, nr.28, bl 2b, mezanin, deasupra băncii OTP.
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d711.9676931986824!2d26.121206!3d44.456321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f8b93d7eb5e1%3A0x44412c525e945392!2sCabinet%20ORL%20Pro%20Life%20Serv!5e0!3m2!1sen!2sus!4v1768312028535!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className={cx(CARD, 'p-6')}>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Adresa Clinică Răducăneni</h3>
              <p className="text-slate-600 mb-4">
                În cadrul centrului Medico – Social Răducăneni.
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21783.296810998447!2d27.942545!3d46.963417!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ca45af896785b5%3A0x91f4c22c6b301d95!2sUnitatea%20Medico-Sociala%20Raducaneni!5e0!3m2!1sen!2sus!4v1768312101061!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center text-slate-900">
            Contact
          </h2>
          <p className="mt-3 mb-8 text-center text-slate-600">
            Scrie-ne și revenim cât mai repede.
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Form and Details */}
            {/* Form */}
            <div className={cx(CARD, 'p-8')}>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nume și prenume" className={INPUT} />
                  <input type="tel" placeholder="Telefon" className={INPUT} />
                </div>
                <input type="email" placeholder="Email" className={INPUT} />

                <div className="grid sm:grid-cols-2 gap-4">
                  <select className={INPUT} defaultValue="Locație">
                    <option disabled>Locație</option>
                    <option>Iași</option>
                    <option>Răducăneni</option>
                  </select>
                  <select className={INPUT} defaultValue="Subiect">
                    <option disabled>Subiect</option>
                    <option>Programare</option>
                    <option>Informații</option>
                    <option>Laborator</option>
                    <option>Medicină muncii</option>
                    <option>Altele</option>
                  </select>
                </div>

                <textarea placeholder="Mesaj" rows={3} className={cx(INPUT, 'py-3')} />

                <label className="flex items-start gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="mt-1" />
                  Sunt de acord să fiu contactat(ă) pentru răspuns.
                </label>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-teal-600 py-4 text-white font-semibold shadow-sm hover:bg-teal-700"
                >
                  Trimite mesajul
                </button>
              </form>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className={cx(CARD, 'p-10 min-h-[400px]')}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <span className="text-teal-700"><Icons.Phone /></span> Telefon
                    </div>
                    <div className="mt-3 space-y-2 text-slate-700">
                      <div className="block">
                        București: 0232215903 0735230853
                      </div>
                      <div className="block">
                        Răducăneni: 0232279867 0736628565
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <span className="text-teal-700"><Icons.Mail /></span> Email
                    </div>
                    <div className="mt-3 space-y-2 text-slate-700 break-all">
                      <div className="block">
                        bucuresti@prolife.com
                      </div>
                      <div className="block">
                        raducăneni@prolife.com
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <span className="text-teal-700"><Icons.Clock /></span> Program
                  </div>
                  <div className="mt-3 text-slate-700 space-y-1">
                    <div>Luni–Vineri: 08:00–20:00</div>
                    <div>Sâmbătă: 08:00–14:00</div>
                  </div>
                </div>

                <div className="mt-8 -mx-10 -mb-10 px-10 py-6 bg-red-100 border-t border-red-200 rounded-b-2xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-900">
                    <span className="text-red-700"><Icons.Alert /></span> Urgențe medicale
                  </div>
                  <p className="mt-3 text-sm text-red-800 leading-relaxed">
                    Dacă este o urgență, sunați imediat la 112 sau mergeți la cea mai apropiată unitate de primiri urgențe.
                  </p>
                  <div className="mt-3 inline-flex items-center justify-center rounded-2xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white">
                    Sună 112
                  </div>
                </div>
              </div>
            </div>
            {/* /Details */}
          </div>

        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-950 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Removed title and description */}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="font-semibold mb-3">Servicii</div>
              <ul className="space-y-2 text-white/70">
                <li><a href="#services" className="hover:text-white">Ambulatoriu</a></li>
                <li><a href="#services" className="hover:text-white">Spitalizare de zi</a></li>
                <li><a href="#services" className="hover:text-white">Medicină muncii</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Specialități</div>
              <ul className="space-y-2 text-white/70">
                <li><a href="#specialties" className="hover:text-white">Cardiologie</a></li>
                <li><a href="#specialties" className="hover:text-white">Neurologie</a></li>
                <li><a href="#specialties" className="hover:text-white">Oftalmologie</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Medici</div>
              <ul className="space-y-2 text-white/70">
                <li><a href="#doctors" className="hover:text-white">Echipa noastră</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Contact</div>
              <ul className="space-y-2 text-white/70">
                <li><a href="#contact" className="hover:text-white">Formular</a></li>
                <li><a href="#contact" className="hover:text-white">Detalii</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 text-sm text-white/60 flex justify-between items-center">
            <div>&copy; 2026 Pro Life Clinics. Toate drepturile rezervate.</div>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a href="https://sky.ro" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/skyro_logo_wide.png"
                  alt="Skyro Logo"
                  width={100}
                  height={30}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>


      {/* Sticky CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 p-3 md:hidden">
        <div className="max-w-6xl mx-auto px-2 flex gap-3">
          <a
            href="#contact"
            className="flex-1 inline-flex items-center justify-center rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
          >
            Programează-te
          </a>
          <a
            href="tel:0735230853"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Sună
          </a>
        </div>
      </div>
    </main>
  )
}