import { type ReactNode, useEffect, useRef, useState } from "react";
import { useLocation, Router as WouterRouter } from "wouter";
import {
  Activity, ArrowLeft, ArrowRight, Bell, BookOpen, Calendar, Check, ChevronRight, CircleHelp,
  Clock3, ExternalLink, FileCheck2, FileText, HeartHandshake, Home as HomeIcon, Info, Laptop,
  Library, MessageSquare, Mic, MoreHorizontal, Paperclip, Pill, Plus, RefreshCw, RotateCcw, ScanLine,
  Search, Send, Share2, ShieldCheck, Sparkles, Stethoscope, UserRound, UsersRound,
  Volume2, X, Zap
} from "lucide-react";

type View = "landing" | "scan" | "processing" | "home" | "timeline" | "ask" | "caregiver" | "care-note" | "office-kit" | "source" | "pitch";
type Note = { id: number; text: string; date: string };

const DATA = {
  patient: "Arjun Rao",
  hospital: "Sunrise General Hospital",
  discharge: "18 September 2026",
  followUp: "02 October 2026",
  medicineA: "Medicine A",
  medicineB: "Medicine B",
};

const navItems = [
  { view: "home" as View, label: "Home", icon: HomeIcon },
  { view: "timeline" as View, label: "Timeline", icon: Clock3 },
  { view: "ask" as View, label: "Ask MediMemory", icon: CircleHelp },
  { view: "caregiver" as View, label: "Caregiver", icon: UsersRound },
  { view: "source" as View, label: "Documents", icon: FileText },
  { view: "office-kit" as View, label: "Office Kit", icon: Laptop },
];

const mobileNav = [
  { view: "home" as View, label: "Today", icon: HomeIcon },
  { view: "timeline" as View, label: "Timeline", icon: Clock3 },
  { view: "ask" as View, label: "Ask", icon: CircleHelp },
  { view: "caregiver" as View, label: "Caregiver", icon: UsersRound },
];

function Logo({ compact = false, showTagline = false }: { compact?: boolean; showTagline?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-medimemory">
      <div className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[#9bd1c2] text-[#173f40] shadow-[0_3px_0_#65a898] shrink-0">
        <Activity size={20} strokeWidth={2.5} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#dc806e] ring-2 ring-[#f6f3ec]" />
      </div>
      {!compact && (
        <div>
          <span className="font-semibold text-lg tracking-[-.035em] text-[#203b3c] block leading-tight">
            Medi<span className="text-[#2C7A78]">Memory</span>
          </span>
          {showTagline && (
            <span className="text-[11px] text-[#6b7d75] font-normal leading-tight block mt-0.5">
              Your care memory, after the hospital.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  className = "",
  disabled = false,
  testId = "button-action"
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "quiet" | "outline" | "coral" | "ghost";
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  testId?: string;
}) {
  const styles = {
    primary: "bg-[#285f5b] text-[#fbfaf4] shadow-[0_3px_0_#174643] hover:bg-[#34746d]",
    quiet: "bg-[#e0eee7] text-[#245c5b] hover:bg-[#d3e8de]",
    outline: "border border-[#cdd8cf] bg-[#fcfbf7] text-[#245c5b] hover:border-[#80b2a3] hover:bg-[#f6f9f7]",
    coral: "bg-[#df8a76] text-[#3f2a27] shadow-[0_3px_0_#bf6f61] hover:bg-[#e69480]",
    ghost: "text-[#556961] hover:bg-[#e8eee8] hover:text-[#203b3c]",
  }[variant];
  return (
    <button
      data-testid={testId}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-[background-color,transform,border-color] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 ${styles} ${className}`}
    >
      {children}
      {icon}
    </button>
  );
}

function Chip({ children, coral = false, className = "" }: { children: ReactNode; coral?: boolean; className?: string }) {
  return (
    <span className={`mm-mono inline-flex items-center rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[.1em] ${coral ? "bg-[#f6ddd5] text-[#a95b4e]" : "bg-[#dcece4] text-[#2C7A78]"} ${className}`}>
      {children}
    </span>
  );
}

function SourceBadge({ note = false }: { note?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${note ? "text-[#a76452]" : "text-[#2C7A78]"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${note ? "bg-[#db8a72]" : "bg-[#62a997]"}`} />
      {note ? "Patient-reported note" : "From discharge document"}
    </span>
  );
}

/* Minimal Journey Visual SVG */
function MinimalJourneyVisual() {
  return (
    <div className="relative hidden md:flex items-center justify-center h-28 w-52 rounded-[20px] overflow-hidden bg-gradient-to-br from-[#eaf5f1] via-[#dceee6] to-[#d2e8dd] border border-[#d2e4db] shadow-sm shrink-0">
      {/* Soft warm sun */}
      <div className="absolute right-7 top-3 h-8 w-8 rounded-full bg-gradient-to-tr from-[#f6cca0] to-[#fde7ce] opacity-90 shadow-sm" />
      {/* Abstract gentle hills */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 200 100">
        <path d="M0,70 Q65,40 135,62 T200,48 L200,100 L0,100 Z" fill="#b2dcd0" opacity="0.4" />
        <path d="M0,78 Q75,58 145,80 T200,68 L200,100 L0,100 Z" fill="#7ebd Support" fillOpacity="0.55" color="#7ebfb0" />
        {/* Soft winding path */}
        <path d="M100,100 Q110,80 130,70 Q145,62 155,50" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      </svg>
      <div className="absolute bottom-2.5 left-3.5 text-[9px] font-medium tracking-widest text-[#2C7A78] uppercase mm-mono">
        Hospital → Home
      </div>
    </div>
  );
}

/* Right Context Column for Desktop */
function RightContextColumn({ setView }: { setView: (view: View) => void }) {
  const daysInSep = Array.from({ length: 30 }, (_, i) => i + 1);
  const padDays = [null, null]; // Sep 1, 2026 starts on Tuesday (Su, Mo empty)

  return (
    <aside className="w-[280px] shrink-0 space-y-5 hidden xl:block">
      {/* Quote / Philosophy */}
      <div className="rounded-[22px] border border-[#e4dcd2] bg-[#fbf9f4] p-5 shadow-sm">
        <div className="flex items-center gap-1.5 text-[#a95b4e] mm-mono text-[9px] uppercase tracking-[.14em]">
          <Sparkles size={12} />
          <span>Philosophy</span>
        </div>
        <blockquote className="mm-display mt-2.5 text-[17px] leading-snug text-[#203b3c]">
          “Understanding helps healing.”
        </blockquote>
        <p className="mt-2 text-xs text-[#7d8c84] font-medium">— MediMemory</p>
      </div>

      {/* Mini Interactive Calendar */}
      <div className="rounded-[22px] border border-[#dce4dc] bg-[#fcfbf7] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#eeeae0]">
          <span className="text-xs font-bold text-[#203b3c] flex items-center gap-1.5">
            <Calendar size={13} className="text-[#2C7A78]" />
            September 2026
          </span>
          <span className="mm-mono text-[10px] text-[#2C7A78] font-semibold">Today: 22nd</span>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-[#86958d] font-mono">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className="mt-1.5 grid grid-cols-7 gap-1 text-center text-[11px]">
          {padDays.map((_, i) => <div key={`pad-${i}`} />)}
          {daysInSep.map((day) => {
            const isToday = day === 22;
            const isDischarge = day === 18;
            return (
              <div
                key={day}
                className={`h-7 w-7 mx-auto grid place-items-center rounded-lg font-medium transition ${
                  isToday
                    ? "bg-[#2C7A78] text-[#fbfaf4] font-bold shadow-sm"
                    : isDischarge
                    ? "bg-[#dcece4] text-[#245c5b] font-semibold"
                    : "text-[#4b5b54] hover:bg-[#f0f2ea]"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="mt-3.5 pt-3 border-t border-[#eeeae0] flex items-center justify-between text-[10px] text-[#718079]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2C7A78]" />Today (22 Sep)</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#dcece4]" />Discharge (18 Sep)</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-[22px] border border-[#dce4dc] bg-[#fcfbf7] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs font-bold text-[#203b3c]">Recent Activity</span>
          <Activity size={13} className="text-[#2C7A78]" />
        </div>
        <div className="mt-3 space-y-3">
          <button onClick={() => setView("source")} className="w-full text-left flex items-start gap-2.5 text-xs group">
            <div className="h-6 w-6 rounded-lg bg-[#e1eee7] text-[#2C7A78] grid place-items-center shrink-0 mt-0.5 group-hover:bg-[#d2e8dd] transition">
              <FileCheck2 size={12} />
            </div>
            <div>
              <p className="font-semibold text-[#245c5b] group-hover:text-[#2C7A78] transition">Document analyzed</p>
              <p className="text-[10px] text-[#86958d]">2 hours ago · Sunrise General</p>
            </div>
          </button>

          <button onClick={() => setView("caregiver")} className="w-full text-left flex items-start gap-2.5 text-xs group">
            <div className="h-6 w-6 rounded-lg bg-[#f6ddd5] text-[#a95b4e] grid place-items-center shrink-0 mt-0.5 group-hover:bg-[#f2cec4] transition">
              <Mic size={12} />
            </div>
            <div>
              <p className="font-semibold text-[#245c5b] group-hover:text-[#a95b4e] transition">Added a care note</p>
              <p className="text-[10px] text-[#86958d]">4 hours ago · Audio memo</p>
            </div>
          </button>

          <button onClick={() => setView("ask")} className="w-full text-left flex items-start gap-2.5 text-xs group">
            <div className="h-6 w-6 rounded-lg bg-[#e1eee7] text-[#2C7A78] grid place-items-center shrink-0 mt-0.5 group-hover:bg-[#d2e8dd] transition">
              <CircleHelp size={12} />
            </div>
            <div>
              <p className="font-semibold text-[#245c5b] group-hover:text-[#2C7A78] transition">Asked about follow-up</p>
              <p className="text-[10px] text-[#86958d]">5 hours ago · 02 Oct 2026</p>
            </div>
          </button>

          <button onClick={() => setView("source")} className="w-full text-left flex items-start gap-2.5 text-xs group">
            <div className="h-6 w-6 rounded-lg bg-[#e8f1fa] text-[#346294] grid place-items-center shrink-0 mt-0.5 group-hover:bg-[#d9e8f6] transition">
              <FileText size={12} />
            </div>
            <div>
              <p className="font-semibold text-[#245c5b] group-hover:text-[#346294] transition">Viewed source document</p>
              <p className="text-[10px] text-[#86958d]">Page 3 of 5 highlighted</p>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}

/* Master Shell with Responsive Desktop Three-Zone & Mobile Phone-First Layout */
function Shell({
  children,
  onReset,
  setView,
  rightColumn
}: {
  children: ReactNode;
  onReset: () => void;
  setView: (view: View) => void;
  rightColumn?: ReactNode;
}) {
  const [location] = useLocation();
  const currentView = (location.replace("/", "") || "home") as View;
  const [searchInput, setSearchInput] = useState("");
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setView("ask");
    }
  };

  return (
    <div className="mm-paper mm-grain min-h-[100dvh] flex flex-col lg:flex-row">
      {/* DESKTOP SIDEBAR (>= 1024px) */}
      <aside className="hidden lg:flex w-[260px] xl:w-[270px] shrink-0 flex-col justify-between border-r border-[#e2dfd5] bg-[#faf8f3] p-5 h-screen sticky top-0 z-30">
        <div>
          {/* Logo & Brand Tagline */}
          <button onClick={() => setView("home")} data-testid="button-sidebar-logo" className="text-left w-full focus:outline-none">
            <Logo showTagline />
          </button>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1.5" aria-label="Desktop Navigation">
            {navItems.map(({ view, label, icon: Icon }) => {
              const active = currentView === view || (view === "home" && currentView === ("" as any));
              return (
                <button
                  key={view}
                  onClick={() => setView(view)}
                  data-testid={`sidebar-nav-${view}`}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-[background-color,color] ${
                    active
                      ? "bg-[#DDF2EC] text-[#1E5652] shadow-xs"
                      : "text-[#586b62] hover:bg-[#eef3ee] hover:text-[#203b3c]"
                  }`}
                >
                  <Icon size={18} strokeWidth={active ? 2.3 : 1.8} className={active ? "text-[#2C7A78]" : "text-[#71847a]"} />
                  <span>{label}</span>
                  {view === "source" && (
                    <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e3eae3] text-[#4b6056]">
                      Page 3
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area: Privacy Card + Patient Profile */}
        <div className="space-y-4 pt-4 border-t border-[#e5e2d8]">
          <div className="rounded-2xl border border-[#dbe6df] bg-[#eef6f2] p-3.5 text-xs text-[#245c5b]">
            <div className="flex items-center gap-1.5 font-semibold text-[#2C7A78]">
              <ShieldCheck size={15} />
              <span>Patient Control</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-4 text-[#597368]">
              Your care information stays under your direct control.
            </p>
            <button
              onClick={() => setView("pitch")}
              className="mt-2 text-[11px] font-bold text-[#2C7A78] hover:underline flex items-center gap-1"
            >
              Learn more <ArrowRight size={11} />
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#dcece4] text-xs font-bold text-[#245c5b] shadow-2xs">
                AR
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#203b3c]">Arjun Rao</p>
                <p className="text-[10px] text-[#788880]">Sunrise General Hospital</p>
              </div>
            </div>
            <button
              onClick={() => setView("pitch")}
              title="View product pitch"
              className="grid h-8 w-8 place-items-center rounded-lg text-[#788880] hover:bg-[#eae8de] transition"
            >
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN WRAPPER (Top Header + Content + Optional Context) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* DESKTOP TOP HEADER (>= 1024px) */}
        <header className="hidden lg:flex h-16 shrink-0 items-center justify-between border-b border-[#e2dfd5] bg-[#faf8f3]/90 px-8 backdrop-blur-md sticky top-0 z-20">
          {/* Search / Ask Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7d9086]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ask anything about your care instructions..."
              className="w-full h-10 rounded-full border border-[#d6ded5] bg-[#fcfbf7] pl-10 pr-4 text-xs text-[#203b3c] placeholder:text-[#8d9e95] focus:border-[#2C7A78] focus:bg-white focus:outline-none transition"
            />
          </form>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setView("timeline")}
              title="Notifications / Reminders"
              className="relative grid h-9 w-9 place-items-center rounded-full text-[#586b62] hover:bg-[#eef3ee] transition"
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#df8a76]" />
            </button>

            <button
              onClick={() => setView("office-kit")}
              data-testid="header-office-kit"
              className="flex items-center gap-1.5 rounded-full border border-[#cddad1] bg-[#fcfbf7] px-3.5 py-1.5 text-xs font-semibold text-[#2C7A78] hover:bg-[#eaf4ef] transition"
            >
              <Laptop size={14} />
              <span>Office Kit</span>
            </button>

            {/* Settings & Reset Demo Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                title="Options"
                className="grid h-9 w-9 place-items-center rounded-full text-[#586b62] hover:bg-[#eef3ee] transition"
              >
                <MoreHorizontal size={17} />
              </button>
              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-[#d6ded5] bg-[#fcfbf7] p-2 shadow-lg z-50">
                  <button
                    onClick={() => {
                      setShowSettingsMenu(false);
                      onReset();
                    }}
                    data-testid="desktop-reset-demo"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#a95b4e] hover:bg-[#f8e8df] transition text-left"
                  >
                    <RotateCcw size={14} />
                    <span>Reset Demo State</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowSettingsMenu(false);
                      setView("pitch");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#486358] hover:bg-[#eef3ee] transition text-left"
                  >
                    <Sparkles size={14} />
                    <span>Product Pitch</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-[#d9ded6] mx-1" />

            {/* Profile Avatar */}
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#dcece4] text-xs font-bold text-[#245c5b]">
                AR
              </div>
              <span className="text-xs font-semibold text-[#203b3c]">Arjun Rao</span>
            </div>
          </div>
        </header>

        {/* MOBILE TOP HEADER (< 1024px) */}
        <header className="lg:hidden sticky top-0 z-40 border-b border-[#e2dfd5]/90 bg-[#f6f3ec]/90 px-5 py-3 backdrop-blur-md">
          <div className="mx-auto flex max-w-[760px] items-center justify-between">
            <button onClick={() => setView("home")} data-testid="button-home-logo" className="min-h-11 text-left">
              <Logo />
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setView("office-kit")}
                data-testid="button-office-kit"
                className="flex min-h-11 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-[#2C7A78] transition hover:bg-[#e7eee7]"
              >
                <Laptop size={15} />
                <span className="hidden sm:inline">Office Kit</span>
              </button>
              <button
                onClick={onReset}
                data-testid="button-reset-demo"
                aria-label="Reset demo"
                className="flex min-h-11 items-center gap-1.5 rounded-full px-2 text-xs font-semibold text-[#6a7771] transition hover:bg-[#e7eee7]"
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d9e9e1] text-xs font-bold text-[#245c5b]" data-testid="avatar-arjun">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA (Central Workspace + Optional Desktop Context Column) */}
        <div className="flex-1 w-full max-w-[1500px] mx-auto p-5 sm:p-7 lg:p-8 flex gap-8">
          <main className="flex-1 min-w-0 pb-24 lg:pb-12">{children}</main>
          {rightColumn}
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (< 1024px only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#dedfd6] bg-[#fcfbf7]/95 px-2 pb-[calc(.45rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(32,59,60,.06)] backdrop-blur-lg">
        <div className="mx-auto flex max-w-[560px] justify-around">
          {mobileNav.map(({ view, label, icon: Icon }) => {
            const active = currentView === view || (view === "home" && currentView === ("" as any));
            return (
              <button
                key={view}
                onClick={() => setView(view)}
                data-testid={`nav-${label.toLowerCase()}`}
                className={`flex min-h-12 min-w-[64px] flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[11px] font-semibold transition ${
                  active ? "bg-[#dcece4] text-[#245c5b]" : "text-[#7b8881] hover:bg-[#f0f2ea]"
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function SectionHeading({ eyebrow, title, detail }: { eyebrow: string; title: ReactNode; detail?: string }) {
  return (
    <div className="mm-rise">
      <div className="mm-mono text-[10px] uppercase tracking-[.16em] text-[#6b8d82]">{eyebrow}</div>
      <h1 className="mm-display mt-2.5 text-[2.7rem] sm:text-5xl lg:text-5xl leading-[.97] text-[#203b3c]">{title}</h1>
      {detail && <p className="mt-3.5 max-w-xl text-[15px] leading-6 text-[#68766f]">{detail}</p>}
    </div>
  );
}

/* Landing View */
function Landing({ setView }: { setView: (view: View) => void }) {
  return (
    <div className="mm-paper mm-grid mm-grain min-h-[100dvh]">
      <header className="px-5 py-6">
        <div className="mx-auto flex max-w-[1100px] justify-between items-center">
          <Logo />
          <button
            onClick={() => setView("office-kit")}
            className="text-xs font-semibold text-[#2C7A78] hover:underline flex items-center gap-1.5"
          >
            <Laptop size={15} />
            <span>Office Kit Companion</span>
          </button>
        </div>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col items-center px-5 pb-16 pt-10 text-center sm:pt-16">
        <div className="mm-rise flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#dcece4] text-[#285f5b] shadow-[0_9px_0_#b9d9ca]">
          <Activity size={38} strokeWidth={1.6} />
        </div>
        <h1 className="mm-display mt-8 max-w-[680px] text-[3.4rem] leading-[.93] text-[#203b3c] sm:text-7xl" data-testid="text-landing-headline">
          Your care memory,<br />
          <span className="text-[#2C7A78]">after the hospital.</span>
        </h1>
        <p className="mt-6 max-w-[440px] text-[16px] leading-7 text-[#68766f]">
          MediMemory keeps the important parts of discharge close — clear enough to remember, exact enough to trust.
        </p>
        <div className="mt-8 flex w-full max-w-[380px] flex-col gap-3 sm:flex-row">
          <Button onClick={() => setView("scan")} icon={<ArrowRight size={17} />} className="flex-1" testId="button-create-care-memory">
            Get Started
          </Button>
          <Button onClick={() => setView("processing")} variant="outline" icon={<Sparkles size={16} />} className="flex-1" testId="button-use-demo-document">
            Use Demo Document
          </Button>
        </div>
        <div className="mt-8 flex items-start gap-3 text-left text-xs leading-5 text-[#75817a]">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#2C7A78]" />
          <span>Your care information stays under your control.</span>
        </div>
        <div className="mt-14 grid w-full max-w-[620px] gap-4 text-left sm:grid-cols-3">
          {["Capture what you were given.", "Understand what comes next.", "Show the source when it matters."].map((item, index) => (
            <div key={item} className="rounded-2xl border border-[#d7dcd2] bg-[#fcfbf7] p-4 text-xs leading-5 text-[#75817a]">
              <span className="mm-mono text-[10px] text-[#2C7A78] font-bold">0{index + 1}</span>
              <p className="mt-2 font-medium text-[#203b3c]">{item}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* Scan View */
function Scan({ setView, captured, setCaptured }: { setView: (view: View) => void; captured: boolean; setCaptured: (value: boolean) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="mm-paper mm-grain min-h-[100dvh]">
      <header className="flex items-center justify-between px-5 py-5 border-b border-[#e5e2d8]">
        <button onClick={() => setView("landing")} data-testid="button-scan-back" className="grid min-h-11 min-w-11 place-items-center rounded-full hover:bg-[#e9eee9]">
          <ArrowLeft size={21} />
        </button>
        <Logo compact />
        <span className="w-11" />
      </header>
      <main className="mx-auto max-w-[580px] px-5 pb-16 pt-8">
        <SectionHeading
          eyebrow="Step 01 · Bring it in"
          title={<>Keep the<br /><span className="text-[#2C7A78]">original close.</span></>}
          detail="Take a clear photo of the discharge document. MediMemory will use it to build a memory you can check later."
        />
        <div
          className={`mm-shimmer relative mt-8 flex aspect-[4/3] sm:aspect-[4/3] items-center justify-center overflow-hidden rounded-[28px] border-2 ${
            captured ? "border-[#67a99b] bg-[#e1eee7]" : "border-dashed border-[#9fb8ae] bg-[#e4eee7]"
          }`}
          data-testid="document-capture-preview"
        >
          {captured ? (
            <div className="relative h-[82%] w-[75%] rotate-[-2deg] rounded-sm bg-[#fffdf7] p-5 shadow-xl border border-[#d8ded6]">
              <div className="mm-mono text-[8px] text-[#2C7A78] font-bold">SUNRISE GENERAL HOSPITAL</div>
              <div className="mt-3 h-3 w-3/4 rounded bg-[#d6ddd6]" />
              <div className="mt-2 h-2 w-full rounded bg-[#e6e8df]" />
              <div className="mt-2 h-2 w-5/6 rounded bg-[#e6e8df]" />
              <div className="my-4 h-px w-full bg-[#dddcd3]" />
              <div className="h-2 w-1/3 rounded bg-[#df8a76]/70" />
              <div className="mt-2 h-2 w-full rounded bg-[#e6e8df]" />
              <div className="absolute bottom-4 left-5 right-5 flex justify-between text-[8px] text-[#6e827c]">
                <span>18 SEP 2026</span>
                <span>DISCHARGE</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-[#bcded2] text-[#245c5b]">
                <ScanLine size={28} />
              </div>
              <p className="mt-4 text-sm font-semibold text-[#245c5b]">Camera ready</p>
              <p className="mt-1 text-xs text-[#6c8077]">Place the full page inside the frame</p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-6 rounded-[22px] border border-[#2C7A78]/35" />
          <span className="absolute bottom-3.5 right-4 rounded-full bg-[#285f5b] px-2.5 py-1 text-[9px] font-semibold text-white">
            {captured ? "Captured" : "Camera preview"}
          </span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button variant="quiet" onClick={() => inputRef.current?.click()} icon={<ScanLine size={17} />} testId="button-open-camera">
            {captured ? "Retake document" : "Open camera"}
          </Button>
          <input ref={inputRef} className="hidden" type="file" accept="image/*" capture="environment" onChange={() => setCaptured(true)} data-testid="input-document-camera" />
          <Button variant="outline" onClick={() => setCaptured(true)} icon={<FileText size={17} />} testId="button-demo-fallback">
            Use Demo Document
          </Button>
        </div>
        {captured && (
          <div className="mt-5 rounded-2xl border border-[#b9d8ca] bg-[#e4f0e8] p-4 text-sm text-[#245c5b]" data-testid="status-document-captured">
            <Check size={16} className="mr-2 inline text-[#2C7A78]" />
            Document captured. Ready to read.
          </div>
        )}
        <Button className="mt-4 w-full" disabled={!captured} onClick={() => setView("processing")} icon={<ArrowRight size={17} />} testId="button-analyze-document">
          Analyze Document
        </Button>
        <p className="mt-5 text-center text-[12px] leading-5 text-[#7e8a83]">
          Your camera is used only to capture this demo document.<br />Nothing is uploaded outside this experience.
        </p>
      </main>
    </div>
  );
}

/* Processing View */
function Processing({ setView }: { setView: (view: View) => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Reading the discharge document", detail: "Finding the care instructions", icon: FileText },
    { label: "Identifying medicines", detail: "Keeping names, timing, and duration together", icon: Pill },
    { label: "Building your care memory", detail: "Making the next steps easier to find", icon: Library },
    { label: "Your memory is ready", detail: "You can now ask, remember, and verify", icon: Check }
  ];
  useEffect(() => {
    const id = window.setInterval(() => setStep((value) => (value < 3 ? value + 1 : value)), 750);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mm-paper mm-grain min-h-[100dvh]">
      <header className="px-6 py-5 border-b border-[#e5e2d8]">
        <Logo />
      </header>
      <main className="mx-auto max-w-[600px] px-5 pb-16 pt-12">
        <SectionHeading
          eyebrow="Building your memory"
          title={step === 3 ? "The important parts are here." : "Reading the page behind the page."}
          detail="We keep the meaning, and the source."
        />
        <div className="mt-9 space-y-3">
          {steps.map(({ label, detail, icon: Icon }, index) => (
            <div
              key={label}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-500 ${
                index < step
                  ? "border-[#b9d8ca] bg-[#e5f0e8]"
                  : index === step
                  ? "mm-shimmer border-[#86b7a9] bg-[#fcfbf7] shadow-sm"
                  : "border-transparent opacity-40"
              }`}
              data-testid={`processing-step-${index}`}
            >
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${index <= step ? "bg-[#c2e0d4] text-[#245c5b]" : "bg-[#e7e4da] text-[#9ba39c]"}`}>
                {index < step ? <Check size={19} /> : <Icon size={19} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#245c5b]">{label}</p>
                <p className="mt-0.5 text-xs text-[#74827b]">{detail}</p>
              </div>
              {index < step && <Check size={17} className="ml-auto text-[#2C7A78]" />}
            </div>
          ))}
        </div>
        {step === 3 && (
          <Button className="mt-9 w-full" onClick={() => setView("home")} icon={<ArrowRight size={17} />} testId="button-open-care-memory">
            Open Care Memory
          </Button>
        )}
        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#f1dfc3]/50 p-4 text-xs leading-5 text-[#745f43] border border-[#e8d5b8]">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#b38445]" />
          Nothing is invented here. This demo uses the exact fictional discharge information shown in the source.
        </div>
      </main>
    </div>
  );
}

/* Home / Today View with Responsive 3-Zone Desktop */
function Home({ setView, notes }: { setView: (view: View) => void; notes: Note[] }) {
  return (
    <Shell setView={setView} onReset={() => setView("landing")} rightColumn={<RightContextColumn setView={setView} />}>
      {/* GREETING HERO WITH MINIMAL JOURNEY VISUAL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="mm-mono text-[11px] uppercase tracking-[.16em] text-[#6b8d82] font-semibold">
            TUESDAY · 22 SEPTEMBER 2026
          </div>
          <h1 className="mm-display mt-2 text-4xl sm:text-5xl lg:text-5xl leading-[1.02] text-[#203b3c]">
            Good morning,<br />
            <span className="text-[#2C7A78]">Arjun.</span>
          </h1>
          <p className="mt-2.5 text-sm sm:text-[15px] leading-6 text-[#68766f]">
            Here’s the small picture of what matters today.
          </p>
        </div>
        <MinimalJourneyVisual />
      </div>

      {/* DESKTOP PRIMARY GRID (Today's Care + Upcoming) */}
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-5">
        {/* TODAY'S CARE CARD */}
        <section className="rounded-[26px] bg-[#285f5b] p-6 text-[#fbfaf4] shadow-[0_12px_30px_rgba(40,95,91,.16)] flex flex-col justify-between" data-testid="card-todays-care">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="mm-mono inline-flex items-center rounded-full bg-[#3b7570] px-3 py-1 text-[10px] uppercase tracking-[.1em] text-[#c9e8dc] font-semibold">
                  Today’s Care
                </span>
              </div>
              <button onClick={() => setView("timeline")} className="text-xs font-semibold text-[#a8d9c7] hover:underline flex items-center gap-1">
                See all <ArrowRight size={13} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {/* Medicine A Card */}
              <div className="rounded-2xl bg-[#346d67] p-4 transition hover:bg-[#39756f]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#448079] text-[#bde7d9]">
                      <Pill size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Medicine A · 500 mg</p>
                      <p className="text-xs text-[#c4ddd4] mt-0.5">After food · Twice daily · 7 days</p>
                    </div>
                  </div>
                  <span className="mm-mono text-[9px] font-bold text-[#b4d4c9] bg-[#26534f] px-2 py-0.5 rounded-full">
                    TWICE DAILY
                  </span>
                </div>
                <div className="mt-3 flex gap-2 pl-10">
                  <span className="rounded-full bg-[#b7dfd0] px-2.5 py-0.5 text-[10px] font-bold text-[#245c5b]">
                    Morning
                  </span>
                  <span className="rounded-full bg-[#dbeee4]/20 px-2.5 py-0.5 text-[10px] text-[#dbeee4]">
                    Evening
                  </span>
                </div>
              </div>

              {/* Medicine B Card */}
              <div className="rounded-2xl bg-[#2e625c] p-4 transition hover:bg-[#336a64]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#3d756f] text-[#f2cb85]">
                      <Pill size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Medicine B</p>
                      <p className="text-xs text-[#c4ddd4] mt-0.5">Once daily · 14 days</p>
                    </div>
                  </div>
                  <span className="mm-mono text-[9px] font-bold text-[#ebd3a0] bg-[#26534f] px-2 py-0.5 rounded-full">
                    ONCE DAILY
                  </span>
                </div>
                <div className="mt-2.5 pl-10 text-[11px] text-[#f4dca6] font-medium">
                  Next: 8:00 PM
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setView("source")}
            data-testid="button-view-todays-source"
            className="mt-5 flex min-h-9 items-center gap-2 text-xs font-semibold text-[#b7dfd0] hover:text-white transition pt-2 border-t border-[#3a756f]"
          >
            <FileCheck2 size={14} />
            <span>View in original document</span>
            <ChevronRight size={13} />
          </button>
        </section>

        {/* UPCOMING & TRACEABLE MEMORY CARDS */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Upcoming Follow-up Card */}
          <section className="mm-surface rounded-[26px] p-5 sm:p-6 shadow-sm flex-1" data-testid="card-upcoming">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#2C7A78]">
                <Clock3 size={16} />
                <span className="mm-mono text-[10px] uppercase tracking-[.12em] font-semibold">Upcoming</span>
              </div>
              <button onClick={() => setView("timeline")} className="text-xs font-semibold text-[#2C7A78] hover:underline flex items-center gap-1">
                See all <ChevronRight size={13} />
              </button>
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <span className="mm-mono text-[11px] font-bold text-[#8f6d2b] bg-[#fbf0d8] px-2.5 py-0.5 rounded-full">
                  02 October 2026
                </span>
                <h3 className="mm-display text-2xl text-[#203b3c] mt-2">Follow-up appointment</h3>
                <p className="text-xs text-[#596b62] mt-0.5">Sunrise General Hospital · Dr. Sharma</p>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f3e5c7] text-[#a47b32]">
                <Bell size={19} />
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-[#f7f5ed] p-3 text-xs text-[#6e7d75] border border-[#e8e4d8]">
              <span className="font-semibold text-[#203b3c]">Action required:</span> Bring the requested blood test report.
            </div>

            <button
              onClick={() => setView("timeline")}
              data-testid="button-view-follow-up"
              className="mt-4 flex min-h-9 items-center gap-1.5 text-xs font-bold text-[#2C7A78] hover:text-[#1e5856] transition"
            >
              See timeline <ArrowRight size={13} />
            </button>
          </section>

          {/* Traceable Memory Core Differentiator Card */}
          <section className="rounded-[24px] border border-[#e8d2c2] bg-[#f8ebe2] p-5 shadow-sm" data-testid="card-source-trust">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#a95b4e]">
                <FileCheck2 size={16} />
                <span className="mm-mono text-[10px] uppercase tracking-[.12em] font-bold">Traceable Memory</span>
              </div>
              <span className="text-[10px] font-mono text-[#a95b4e] bg-[#f3d7ce] px-2 py-0.5 rounded-full">
                Page 3 of 5
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold text-[#5a3630]">
              Every documented answer is linked back to its verified hospital source.
            </p>
            <button
              onClick={() => setView("source")}
              data-testid="button-open-source-card"
              className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#a95b4e] hover:text-[#883d31] transition"
            >
              View sources <ArrowRight size={13} />
            </button>
          </section>
        </div>
      </div>

      {/* HORIZONTAL DESKTOP CARE TIMELINE */}
      <section className="mt-7 rounded-[26px] border border-[#dce3db] bg-[#fcfbf7] p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="mm-mono text-[10px] uppercase tracking-[.14em] text-[#6b8d82] font-semibold">Care Timeline</div>
            <h2 className="mm-display text-2xl sm:text-3xl text-[#203b3c] mt-1">Everything important, in one place.</h2>
          </div>
          <button onClick={() => setView("timeline")} className="text-xs font-semibold text-[#2C7A78] hover:text-[#1e5652] flex items-center gap-1">
            View full timeline <ArrowRight size={14} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Step 1: Today */}
          <div className="relative rounded-2xl bg-[#f0f6f2] border border-[#d7e7de] p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="mm-mono text-[11px] font-bold text-[#2C7A78]">TODAY · 22 SEP</span>
              <span className="h-6 w-6 rounded-full bg-[#2C7A78] text-white grid place-items-center text-[10px]">
                <Check size={12} />
              </span>
            </div>
            <div className="mt-3 space-y-2 text-[#245c5b]">
              <p className="font-semibold flex items-center gap-1.5">
                <Pill size={13} className="text-[#2C7A78]" /> Medicine A · Twice daily
              </p>
              <p className="font-semibold flex items-center gap-1.5">
                <Pill size={13} className="text-[#2C7A78]" /> Medicine B · Once daily
              </p>
              <p className="text-[11px] text-[#6b7c74] pl-4">
                Avoid strenuous activity until follow-up
              </p>
            </div>
          </div>

          {/* Step 2: 25 Sep */}
          <div className="relative rounded-2xl bg-[#fcfbf7] border border-[#e1ded4] p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="mm-mono text-[11px] font-semibold text-[#6a7c73]">25 SEP</span>
              <span className="h-6 w-6 rounded-full bg-[#dcece4] text-[#245c5b] grid place-items-center text-[10px]">
                <Clock3 size={12} />
              </span>
            </div>
            <div className="mt-3 space-y-1 text-[#245c5b]">
              <p className="font-semibold flex items-center gap-1.5">
                <Check size={13} className="text-[#2C7A78]" /> Medicine A Course
              </p>
              <p className="text-[11px] text-[#718079] pl-4">7-day course completed</p>
            </div>
          </div>

          {/* Step 3: 02 Oct */}
          <div className="relative rounded-2xl bg-[#fdfaf4] border border-[#ecd9be] p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="mm-mono text-[11px] font-bold text-[#8e6522]">02 OCT</span>
              <span className="h-6 w-6 rounded-full bg-[#f6dfbf] text-[#8e6522] grid place-items-center text-[10px]">
                <Bell size={12} />
              </span>
            </div>
            <div className="mt-3 space-y-1 text-[#245c5b]">
              <p className="font-semibold flex items-center gap-1.5 text-[#203b3c]">
                <Clock3 size={13} className="text-[#b38445]" /> Follow-up Appointment
              </p>
              <p className="text-[11px] text-[#718079] pl-4">Bring blood test report</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK MEMORY CARDS */}
      <div className="mt-7 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#203b3c] uppercase tracking-wider mm-mono text-[11px]">
            Care Memory Threads
          </h3>
          <button onClick={() => setView("ask")} className="text-xs font-semibold text-[#2C7A78] hover:underline flex items-center gap-1">
            Ask MediMemory <ArrowRight size={13} />
          </button>
        </div>
        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <MemoryCard
            icon={<Stethoscope size={16} />}
            title="Activity Guidelines"
            text="Avoid strenuous physical activity until follow-up."
            onClick={() => setView("source")}
            testId="memory-activity"
          />
          <MemoryCard
            icon={<FileText size={16} />}
            title="Discharge Source"
            text="Sunrise General Hospital · 18 Sep 2026"
            onClick={() => setView("source")}
            testId="memory-source"
          />
          <MemoryCard
            icon={<HeartHandshake size={16} />}
            title="Caregiver Notes"
            text={notes.length ? `${notes.length} note${notes.length > 1 ? "s" : ""} added` : "No notes yet"}
            onClick={() => setView("caregiver")}
            testId="memory-notes"
            note={!!notes.length}
          />
        </div>
      </div>
    </Shell>
  );
}

function MemoryCard({
  icon,
  title,
  text,
  onClick,
  testId,
  note = false
}: {
  icon: ReactNode;
  title: string;
  text: string;
  onClick: () => void;
  testId: string;
  note?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      data-testid={`button-${testId}`}
      className="mm-surface flex min-h-[76px] w-full items-start gap-3 rounded-2xl p-4 text-left transition hover:border-[#9dc1b4] hover:shadow-sm group"
    >
      <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${note ? "bg-[#f6d5cc] text-[#a95b4e]" : "bg-[#e1eee7] text-[#2C7A78]"}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#245c5b] group-hover:text-[#2C7A78] transition">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-[#718079] truncate">{text}</p>
      </div>
      <ChevronRight size={15} className="mt-1 shrink-0 text-[#9aa69f] group-hover:text-[#2C7A78] transition" />
    </button>
  );
}

/* Timeline View */
function Timeline({ setView }: { setView: (view: View) => void }) {
  const items = [
    { date: "18 SEP", title: "Discharged from Sunrise General", detail: "Your care memory begins here.", active: true, tag: "Milestone" },
    { date: "18–24 SEP", title: "Medicine A · 500 mg", detail: "Twice daily after food for 7 days.", active: true, tag: "Active Medication" },
    { date: "18 SEP–02 OCT", title: "Medicine B", detail: "Once daily for 14 days.", active: true, tag: "Active Medication" },
    { date: "18 SEP–02 OCT", title: "Activity Precaution", detail: "Avoid strenuous physical activity until follow-up.", active: true, tag: "Instruction" },
    { date: "25 SEP", title: "Medicine A Course Complete", detail: "7-day antibiotics course finished.", active: false, tag: "Scheduled End" },
    { date: "02 OCT", title: "Follow-up appointment", detail: "Bring the requested blood test report.", active: false, tag: "Appointment" },
  ];

  return (
    <Shell setView={setView} onReset={() => setView("landing")} rightColumn={<RightContextColumn setView={setView} />}>
      <div className="flex items-center justify-between">
        <SectionHeading
          eyebrow="The whole thread"
          title={<>Care,<br /><span className="text-[#2C7A78]">in order.</span></>}
          detail="A simple timeline of what was documented — and what comes next."
        />
        <Button onClick={() => setView("source")} variant="outline" icon={<FileText size={15} />} className="hidden sm:inline-flex">
          View Source Document
        </Button>
      </div>

      <div className="mt-8 space-y-4" data-testid="timeline-list">
        {items.map((item, index) => (
          <div key={item.title} className="relative flex gap-4 pb-2">
            <div className="flex w-10 shrink-0 flex-col items-center">
              <div
                className={`z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-[#f6f3ec] ${
                  item.active ? "bg-[#9bcabd] text-[#245c5b]" : "bg-[#f0d394] text-[#755d2f]"
                }`}
              >
                {item.active ? <Check size={17} /> : <Bell size={16} />}
              </div>
              {index < items.length - 1 && <div className="absolute bottom-0 top-10 w-px bg-[#bfd5c9]" />}
            </div>
            <div className="mm-surface flex-1 rounded-2xl p-5 hover:border-[#9dc1b4] transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="mm-mono text-[10px] uppercase tracking-[.13em] text-[#6b8d82] font-semibold">{item.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#edf4f0] text-[#346a5b] font-medium">{item.tag}</span>
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold text-[#203b3c]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-[#6c7d75]">{item.detail}</p>
                </div>
                <SourceBadge />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[24px] border border-[#ead4c6] bg-[#f8e8df] p-5">
        <div className="flex gap-3">
          <Info size={18} className="shrink-0 text-[#a95b4e] mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#6e453e]">A note about dates</p>
            <p className="mt-1 text-sm leading-5 text-[#7e5e56]">
              This timeline reflects the fictional discharge document dated 18 September 2026. It is not a live appointment scheduling system.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* Ask MediMemory View with Split Conversational + Live Source Preview on Desktop */
function Ask({ setView }: { setView: (view: View) => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [activeSourceHighlight, setActiveSourceHighlight] = useState<"medicine" | "follow" | "activity">("follow");
  const [listening, setListening] = useState(false);

  const ask = (text: string) => {
    const normalized = text.toLowerCase();
    const safety = /(stop|change|skip|discontinue)/.test(normalized) && normalized.includes("medicine a");
    setQuestion(text);

    if (safety) {
      setAnswer(
        "I can show you the documented information about Medicine A, but MediMemory cannot determine whether you should stop or change a medication. Please confirm medication changes with your healthcare provider."
      );
      setActiveSourceHighlight("medicine");
    } else if (normalized.includes("medicine a")) {
      setAnswer("Medicine A was documented as 500 mg twice daily for 7 days, after food.");
      setActiveSourceHighlight("medicine");
    } else if (normalized.includes("medicine")) {
      setAnswer("Your care memory lists Medicine A at 500 mg twice daily for 7 days after food, and Medicine B once daily for 14 days.");
      setActiveSourceHighlight("medicine");
    } else if (normalized.includes("activity") || normalized.includes("exercise") || normalized.includes("rest")) {
      setAnswer("The discharge document says to avoid strenuous physical activity until your follow-up.");
      setActiveSourceHighlight("activity");
    } else if (normalized.includes("bring") || normalized.includes("report")) {
      setAnswer("Your documented follow-up is 02 October 2026. Bring the requested blood test report.");
      setActiveSourceHighlight("follow");
    } else if (normalized.includes("follow") || normalized.includes("when")) {
      setAnswer("Your documented follow-up appointment is on 02 October 2026 at Sunrise General Hospital.");
      setActiveSourceHighlight("follow");
    } else {
      setAnswer("I can only answer from the saved discharge document. Try asking about your medicines, follow-up, activity, or what to bring.");
      setActiveSourceHighlight("medicine");
    }
  };

  const toggleVoice = () => {
    setListening((value) => !value);
    if (!listening) {
      window.setTimeout(() => {
        setListening(false);
        ask("When is my follow-up?");
      }, 1400);
    }
  };

  const safetyAnswer = answer.startsWith("I can show");

  return (
    <Shell setView={setView} onReset={() => setView("landing")}>
      <SectionHeading
        eyebrow="Ask your care memory"
        title={<>Ask it<br /><span className="text-[#2C7A78]">plainly.</span></>}
        detail="Answers stay strictly grounded inside the discharge instructions. If it’s not documented, we say so."
      />

      {/* DESKTOP SPLIT CONVERSATION & LIVE SOURCE PREVIEW */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
        {/* LEFT: Conversation Area */}
        <div className="space-y-4">
          <div>
            <p className="mm-mono text-[10px] uppercase tracking-[.14em] text-[#7a8b83] font-semibold">Suggested questions</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <button
                onClick={() => ask("What did the doctor say about Medicine A?")}
                data-testid="button-ask-medicine"
                className="min-h-9 rounded-full border border-[#d5d8ca] bg-[#fcfbf7] px-3.5 text-xs font-semibold text-[#2C7A78] hover:bg-[#eef5f1] transition"
              >
                Medicine A instructions
              </button>
              <button
                onClick={() => ask("When is my follow-up?")}
                data-testid="button-ask-follow-up"
                className="min-h-9 rounded-full border border-[#d5d8ca] bg-[#fcfbf7] px-3.5 text-xs font-semibold text-[#2C7A78] hover:bg-[#eef5f1] transition"
              >
                When is my follow-up?
              </button>
              <button
                onClick={() => ask("What did the doctor say about activity?")}
                className="min-h-9 rounded-full border border-[#d5d8ca] bg-[#fcfbf7] px-3.5 text-xs font-semibold text-[#2C7A78] hover:bg-[#eef5f1] transition"
              >
                Activity warnings
              </button>
              <button
                onClick={() => ask("Should I stop Medicine A?")}
                data-testid="button-ask-safety"
                className="min-h-9 rounded-full border border-[#ead4c6] bg-[#f8e8df] px-3.5 text-xs font-semibold text-[#a95b4e] hover:bg-[#f3d9d0] transition"
              >
                Should I stop Medicine A?
              </button>
            </div>
          </div>

          {/* Question Input Box */}
          <div className="rounded-[24px] border border-[#cdd8cf] bg-[#fcfbf7] p-4 shadow-[0_8px_24px_rgba(35,65,62,.04)]">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What do you want to remember or verify?"
              rows={2}
              data-testid="input-ask-question"
              className="min-h-[64px] w-full resize-none bg-transparent px-2 py-1 text-[15px] leading-6 text-[#245c5b] outline-none placeholder:text-[#9eaba3]"
            />
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#eeeae0]">
              <span className="pl-2 text-xs text-[#82928a] flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#2C7A78]" />
                Grounded in saved source
              </span>
              <div className="flex gap-2">
                <button
                  onClick={toggleVoice}
                  data-testid="button-voice-input"
                  className={`grid h-11 w-11 place-items-center rounded-2xl transition ${
                    listening ? "mm-pulse bg-[#f6d5cc] text-[#a95b4e]" : "bg-[#e1eee7] text-[#2C7A78] hover:bg-[#d4e6de]"
                  }`}
                  aria-label="Use voice input"
                >
                  <Mic size={19} />
                </button>
                <button
                  onClick={() => ask(question || "When is my follow-up?")}
                  data-testid="button-send-question"
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-[#285f5b] text-[#fbfaf4] hover:bg-[#32706b] transition"
                  aria-label="Ask memory"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {listening && (
            <div className="flex items-center gap-3 rounded-2xl bg-[#f8e8df] p-4 text-sm text-[#a95b4e]" data-testid="status-voice-listening">
              <div className="flex h-5 items-end gap-1">
                {[8, 15, 11, 19, 9].map((height, index) => (
                  <span key={height} className="mm-wave w-1 rounded-full bg-[#df8a76]" style={{ height, animationDelay: `${index * 80}ms` }} />
                ))}
              </div>
              <span>Listening · Tap microphone to send</span>
            </div>
          )}

          {/* Answer Card */}
          {answer && (
            <div
              className={`mm-rise rounded-[24px] p-5 shadow-sm ${
                safetyAnswer ? "border border-[#edb0a4] bg-[#f8e0da]" : "border border-[#b9d8ca] bg-[#e5f0e8]"
              }`}
              data-testid="card-answer"
            >
              <div className="flex gap-3.5">
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
                    safetyAnswer ? "bg-[#e77965] text-white" : "bg-[#9bcabd] text-[#245c5b]"
                  }`}
                >
                  {safetyAnswer ? <ShieldCheck size={17} /> : <Check size={17} />}
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[.1em] ${safetyAnswer ? "text-[#a64f45]" : "text-[#2C7A78]"}`}>
                    {safetyAnswer ? "Medical guidance · verify" : "From your care memory"}
                  </p>
                  <p className={`mt-2 text-[15px] leading-6 ${safetyAnswer ? "text-[#6e3f39]" : "text-[#203b3c]"}`}>{answer}</p>
                  <button
                    onClick={() => setView("source")}
                    data-testid="button-show-answer-source"
                    className="mt-4 inline-flex min-h-9 items-center gap-2 text-xs font-bold text-[#2C7A78] hover:underline"
                  >
                    <FileCheck2 size={15} />
                    {safetyAnswer ? "View documented source excerpt" : "Show in full document"}
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Live Linked Source Preview (Desktop Co-pilot) */}
        <div className="rounded-[24px] border border-[#d6ded5] bg-[#fffdf7] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#ece8de]">
            <div className="flex items-center gap-2 text-[#2C7A78]">
              <FileCheck2 size={16} />
              <span className="text-xs font-bold uppercase tracking-wider mm-mono">Relevant Source Document</span>
            </div>
            <span className="text-[10px] mm-mono bg-[#e0eee7] text-[#2C7A78] px-2 py-0.5 rounded-full font-semibold">
              Discharge Summary · Page 3
            </span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#faf8f2] border border-[#ebe5da] text-xs space-y-3 leading-relaxed">
            <div className="flex justify-between items-center text-[10px] text-[#718079] border-b border-[#ded7ca] pb-2">
              <span className="font-bold text-[#2C7A78]">SUNRISE GENERAL HOSPITAL</span>
              <span>PATIENT: ARJUN RAO</span>
            </div>

            {/* Live Highlighted Sections */}
            <div className={`p-2.5 rounded-lg transition ${activeSourceHighlight === "medicine" ? "bg-[#d4ede1] border border-[#8ec7b0] ring-2 ring-[#70b399]/30" : "opacity-75"}`}>
              <p className="font-bold text-[#245c5b]">1. Medications</p>
              <p className="mt-1">• <strong>Medicine A 500 mg</strong>: 1 tablet twice daily after food for 7 days.</p>
              <p className="mt-0.5">• <strong>Medicine B</strong>: 1 tablet once daily for 14 days.</p>
            </div>

            <div className={`p-2.5 rounded-lg transition ${activeSourceHighlight === "follow" ? "bg-[#d4ede1] border border-[#8ec7b0] ring-2 ring-[#70b399]/30" : "opacity-75"}`}>
              <p className="font-bold text-[#245c5b]">2. Follow-up</p>
              <p className="mt-1">• Follow-up on <strong>02 October 2026</strong>. Bring requested blood report.</p>
            </div>

            <div className={`p-2.5 rounded-lg transition ${activeSourceHighlight === "activity" ? "bg-[#d4ede1] border border-[#8ec7b0] ring-2 ring-[#70b399]/30" : "opacity-75"}`}>
              <p className="font-bold text-[#245c5b]">3. Instructions</p>
              <p className="mt-1">• Avoid strenuous physical activity until follow-up appointment.</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-[#ece8de]">
            <span className="text-[#6d7d75] text-[11px]">Exact source verifiable anytime</span>
            <button
              onClick={() => setView("source")}
              className="font-bold text-[#2C7A78] hover:underline flex items-center gap-1 text-xs"
            >
              Expand Document <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* Caregiver View */
function Caregiver({ setView, notes, setNotes }: { setView: (view: View) => void; notes: Note[]; setNotes: (notes: Note[]) => void }) {
  const [shared, setShared] = useState(false);

  return (
    <Shell setView={setView} onReset={() => setView("landing")} rightColumn={<RightContextColumn setView={setView} />}>
      <SectionHeading
        eyebrow="For the people beside you"
        title={<>Care,<br /><span className="text-[#2C7A78]">together.</span></>}
        detail="A calm handoff for whoever is helping Arjun keep the next few days in view."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Patient Summary & Status */}
        <section className="mm-surface rounded-[26px] p-6 shadow-sm" data-testid="card-patient-summary">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#d9e8e1] text-lg font-bold text-[#245c5b]">
              AR
            </div>
            <div>
              <p className="mm-mono text-[10px] uppercase tracking-[.13em] text-[#6b8d82] font-semibold">Patient summary</p>
              <h2 className="mm-display mt-1 text-2xl sm:text-3xl text-[#203b3c]">Arjun Rao</h2>
              <p className="mt-0.5 text-xs text-[#718079]">Sunrise General Hospital · Discharged 18 Sep 2026</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#e5f0e8] p-4 border border-[#d2e4db]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#245c5b]">Today’s Active Care</p>
              <span className="rounded-full bg-[#c3e2d5] px-2.5 py-1 text-[10px] font-bold text-[#2C7A78]">
                2 medicines · 1 warning
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#586b62]">
              Medicine A twice daily after food. Medicine B once daily. No strenuous physical activity.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-[#ead4c6] bg-[#f8e8df] p-4 text-xs">
            <div className="flex gap-2.5">
              <Bell size={16} className="shrink-0 text-[#a95b4e] mt-0.5" />
              <div>
                <p className="font-semibold text-[#6e453e]">Next milestone</p>
                <p className="mt-0.5 text-[#7e5e56]">Follow-up on 02 October 2026. Bring blood report.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Share Handoff & Care Notes */}
        <div className="space-y-4">
          <section className="rounded-[26px] bg-[#285f5b] p-6 text-[#fbfaf4] shadow-[0_12px_28px_rgba(40,95,91,.15)]">
            <div className="flex items-start justify-between">
              <div>
                <Chip className="bg-[#3e7873] text-[#caebd9]">Ready to share</Chip>
                <h3 className="mm-display mt-3 text-2xl text-white">A shorter handoff.</h3>
              </div>
              <Share2 size={22} className="text-[#a8d9c7]" />
            </div>
            <p className="mt-2.5 text-xs leading-5 text-[#c7ded5]">
              Share the essential care instructions securely without overwhelming family with raw hospital paperwork.
            </p>
            <Button
              variant="coral"
              className="mt-4 w-full"
              onClick={() => setShared(true)}
              icon={shared ? <Check size={16} /> : <Share2 size={16} />}
              testId="button-share-care-summary"
            >
              {shared ? "Summary link copied!" : "Share Care Summary"}
            </Button>
          </section>

          {/* Care Notes Container */}
          <section className="mm-surface rounded-[26px] p-5 shadow-sm" data-testid="card-care-notes">
            <div className="flex items-center justify-between">
              <div>
                <p className="mm-mono text-[10px] uppercase tracking-[.13em] text-[#6b8d82] font-semibold">Separate from source</p>
                <h3 className="mm-display mt-1 text-2xl text-[#203b3c]">Care notes</h3>
              </div>
              <button
                onClick={() => setView("care-note")}
                data-testid="button-add-care-note"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f6ddd5] text-[#a95b4e] text-xs font-bold hover:bg-[#f0cfc5] transition"
              >
                <Plus size={15} />
                <span>Add Note</span>
              </button>
            </div>
            {notes.length ? (
              <div className="mt-4 space-y-2">
                {notes.map((note) => (
                  <div className="rounded-xl bg-[#f8e8df] p-3 border border-[#ebd0c5]" key={note.id} data-testid={`note-${note.id}`}>
                    <p className="text-sm leading-5 text-[#6e453e]">{note.text}</p>
                    <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 items-center justify-between">
                      <SourceBadge note />
                      <span className="text-[11px] text-[#a95b4e]">{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-[#d7d8cb] p-4 text-xs leading-5 text-[#718079]">
                Add a practical note for family helping at home. Notes are always labeled as patient-reported and never mixed with verified hospital instructions.
              </div>
            )}
          </section>
        </div>
      </div>
    </Shell>
  );
}

/* Care Note Recorder View */
function CareNote({ setView, notes, setNotes }: { setView: (view: View) => void; notes: Note[]; setNotes: (notes: Note[]) => void }) {
  const [noteText, setNoteText] = useState("");
  const [recording, setRecording] = useState(false);

  const record = () => {
    setRecording(true);
    window.setTimeout(() => {
      setRecording(false);
      setNoteText("Doctor asked us to bring the blood report during the next visit.");
    }, 900);
  };

  const save = () => {
    if (noteText.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteText.trim(), date: "Today, 10:24 AM" }]);
      setView("caregiver");
    }
  };

  return (
    <div className="mm-paper mm-grain min-h-[100dvh]">
      <header className="flex items-center justify-between px-6 py-5 border-b border-[#e5e2d8]">
        <button onClick={() => setView("caregiver")} data-testid="button-care-note-back" className="grid min-h-11 min-w-11 place-items-center rounded-full hover:bg-[#e9eee9]">
          <ArrowLeft size={21} />
        </button>
        <span className="mm-mono text-[10px] uppercase tracking-[.14em] text-[#6b8d82] font-semibold">Care note</span>
        <button onClick={() => setView("caregiver")} data-testid="button-care-note-close" className="grid min-h-11 min-w-11 place-items-center rounded-full hover:bg-[#e9eee9]">
          <X size={19} />
        </button>
      </header>
      <main className="mx-auto max-w-[560px] px-5 pb-16 pt-8">
        <SectionHeading
          eyebrow="Patient-reported · separate from source"
          title={<>Keep what<br /><span className="text-[#a95b4e]">you heard.</span></>}
          detail="A voice note helps caregivers remember the practical details. It is not an unverified hospital instruction."
        />
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={record}
            data-testid="button-record-care-note"
            aria-label="Record care note"
            className={`mm-pulse grid h-24 w-24 place-items-center rounded-full ${
              recording ? "bg-[#df8a76] text-[#54312c]" : "bg-[#f3d2c8] text-[#a95b4e] hover:bg-[#ebc4b9]"
            } transition`}
          >
            <Mic size={34} strokeWidth={1.5} />
          </button>
          <p className="mt-4 text-sm font-semibold text-[#6e453e]">{recording ? "Listening…" : "Tap to speak"}</p>
          {recording && (
            <div className="mt-4 flex h-8 items-end gap-1" data-testid="status-note-listening">
              {[12, 22, 16, 30, 14, 24, 10].map((height, index) => (
                <span key={height} className="mm-wave w-1.5 rounded-full bg-[#df8a76]" style={{ height, animationDelay: `${index * 70}ms` }} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-[24px] border border-[#e6c1b6] bg-[#fff1eb] p-5">
          <div className="flex items-center gap-2 text-[#a95b4e]">
            <HeartHandshake size={16} />
            <span className="mm-mono text-[10px] uppercase tracking-[.13em] font-bold">Example patient note</span>
          </div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={3}
            placeholder="What practical details do you want to remember?"
            data-testid="input-care-note"
            className="mt-3.5 w-full resize-none rounded-2xl border border-[#e6cfc7] bg-[#fffaf6] p-3.5 text-sm leading-6 text-[#6e453e] outline-none focus:border-[#c98373]"
          />
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#a95b4e]">
            <Info size={14} className="mt-0.5 shrink-0" />
            This note will be explicitly labeled as patient-reported and unverified.
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => setView("caregiver")} className="flex-1" testId="button-cancel-care-note">
            Cancel
          </Button>
          <Button variant="coral" onClick={save} disabled={!noteText.trim()} className="flex-1" icon={<Check size={16} />} testId="button-save-care-note">
            Save Note
          </Button>
        </div>
      </main>
    </div>
  );
}

/* Source Document Viewer on Desktop & Mobile */
function Source({ setView }: { setView: (view: View) => void }) {
  const [highlight, setHighlight] = useState("medicine");
  const sections = [
    { id: "medicine", label: "Medications", icon: Pill },
    { id: "follow", label: "Follow-up", icon: Clock3 },
    { id: "activity", label: "Instructions", icon: Activity }
  ];

  return (
    <div className="mm-paper mm-grain min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b border-[#e2dfd5] bg-[#f6f3ec]/90 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <button onClick={() => setView("home")} data-testid="button-source-back" className="flex items-center gap-2 text-sm font-semibold text-[#2C7A78] hover:underline">
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <Chip>Discharge Summary · Page 3 of 5</Chip>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 pb-16 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SectionHeading
            eyebrow="Show source · verified document"
            title={<>The page behind<br /><span className="text-[#2C7A78]">the memory.</span></>}
            detail="Highlighted passages are the exact source for the care instructions in MediMemory."
          />
          <div className="flex gap-2 shrink-0">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setHighlight(id)}
                data-testid={`button-source-${id}`}
                className={`flex min-h-10 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition ${
                  highlight === id
                    ? "bg-[#285f5b] text-[#fbfaf4] shadow-xs"
                    : "border border-[#d5d8ca] bg-[#fcfbf7] text-[#718079] hover:bg-[#eef3ee]"
                }`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* High Fidelity Discharge Document Container */}
        <article className="relative mt-8 rounded-[28px] bg-[#dfe9df] p-4 sm:p-8 shadow-sm" data-testid="document-source-view">
          <div className="mx-auto max-w-[760px] bg-[#fffdf7] p-6 sm:p-10 shadow-[0_12px_32px_rgba(27,55,57,.12)] border border-[#d8ded6] rounded-xl">
            <div className="flex items-start justify-between border-b-2 border-[#285f5b] pb-6">
              <div>
                <div className="mm-mono text-[10px] tracking-[.14em] text-[#2C7A78] font-bold">SUNRISE GENERAL HOSPITAL</div>
                <h2 className="mm-display mt-2 text-2xl sm:text-3xl text-[#203b3c]">Discharge Summary</h2>
                <p className="text-xs text-[#6e7d75] mt-1">Department of Internal Medicine</p>
              </div>
              <div className="text-right text-[10px] mm-mono text-[#7d8981]">
                PAGE 3 OF 5<br />
                18 SEP 2026
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div className="border-b border-[#e6e2d8] py-2.5">
                <p className="text-xs text-[#7c8981]">Patient Name</p>
                <p className="mt-0.5 text-sm font-semibold text-[#245c5b]">Arjun Rao</p>
              </div>
              <div className="border-b border-[#e6e2d8] py-2.5">
                <p className="text-xs text-[#7c8981]">Discharge Date</p>
                <p className="mt-0.5 text-sm font-semibold text-[#245c5b]">18 September 2026</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#445d59]">
              {/* Highlighted Section: Medications */}
              <div className={`p-4 rounded-xl transition-all duration-300 ${highlight === "medicine" ? "bg-[#d9eee3] ring-2 ring-[#7eb7a4] ring-offset-2 ring-offset-[#fffdf7]" : "hover:bg-[#f6f9f6]"}`}>
                <p className="font-bold text-[#203b3c]">Medications</p>
                <p className="mt-2">
                  <strong>1. Medicine A 500 mg</strong> — Take 1 tablet twice daily after food for 7 days.
                </p>
                <p className="mt-1.5">
                  <strong>2. Medicine B</strong> — Take 1 tablet once daily for 14 days.
                </p>
              </div>

              {/* Highlighted Section: Follow-up */}
              <div className={`p-4 rounded-xl transition-all duration-300 ${highlight === "follow" ? "bg-[#d9eee3] ring-2 ring-[#7eb7a4] ring-offset-2 ring-offset-[#fffdf7]" : "hover:bg-[#f6f9f6]"}`}>
                <p className="font-bold text-[#203b3c]">Follow-up</p>
                <p className="mt-2">
                  Please attend your scheduled follow-up on <strong>02 October 2026</strong>. Bring the requested blood test report.
                </p>
              </div>

              {/* Highlighted Section: Instructions */}
              <div className={`p-4 rounded-xl transition-all duration-300 ${highlight === "activity" ? "bg-[#d9eee3] ring-2 ring-[#7eb7a4] ring-offset-2 ring-offset-[#fffdf7]" : "hover:bg-[#f6f9f6]"}`}>
                <p className="font-bold text-[#203b3c]">Instructions</p>
                <p className="mt-2">
                  Avoid strenuous physical activity until your follow-up appointment.
                </p>
              </div>

              <div className="border-t border-[#e6e2d8] pt-5 text-xs text-[#7d8981] space-y-1">
                <p>For questions regarding prescription changes, please contact your healthcare provider.</p>
                <p className="font-mono text-[10px]">Sunrise General Hospital · Patient Discharge Services · Document ID: SGH-2026-AR9</p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

/* Office Kit Companion View */
function OfficeKit({ setView }: { setView: (view: View) => void }) {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => setProgress((value) => (value >= 100 ? 100 : value + 20)), 380);
    return () => window.clearInterval(id);
  }, [started]);

  const steps = [
    "Phone connected & document received",
    "High-accuracy optical extraction complete",
    "Care memory structured & validated",
    "Encrypted source package synced back to phone"
  ];

  return (
    <div className="mm-paper mm-grain min-h-[100dvh]">
      <header className="border-b border-[#dedacf] bg-[#fcfbf7] px-6 py-4">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <button onClick={() => setView("home")} data-testid="button-office-back" className="flex items-center gap-2 text-sm font-semibold text-[#245c5b] hover:underline">
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
          <Chip>Office Kit · Companion Surface</Chip>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 pb-16 pt-10">
        <SectionHeading
          eyebrow="Phone → office handoff"
          title={<>A clear desk<br /><span className="text-[#2C7A78]">for care.</span></>}
          detail="Watch a hospital document become an actionable care memory without losing its verified source."
        />

        <div className="mt-7 flex gap-3">
          <Button
            variant="primary"
            onClick={() => {
              setStarted(true);
              setProgress(0);
            }}
            icon={<Zap size={16} />}
            testId="button-start-office-processing"
          >
            {started ? "Processing pipeline…" : "Start live sync demo"}
          </Button>
          <Button variant="outline" onClick={() => setView("home")}>
            Return to Home
          </Button>
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#cdd8cf] bg-[#e8eee8] p-4 sm:p-7">
          <div className="rounded-[22px] border border-[#d3d9d0] bg-[#fcfbf7] shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#e0e1d8] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#df8a76]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e5b86b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#77b8a5]" />
              <span className="ml-3 mm-mono text-[10px] text-[#829087]">medimemory / office-kit console</span>
            </div>

            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="border-b border-[#e0e1d8] p-6 md:border-b-0 md:border-r md:p-8">
                <div className="mm-mono text-[10px] uppercase tracking-[.15em] text-[#6b8d82] font-semibold">Incoming document</div>
                <div className="mt-5 flex h-52 items-center justify-center rounded-2xl bg-[#e7eee7]">
                  <div className="h-40 w-32 rotate-[-4deg] bg-[#fffdf7] p-4 shadow-md border border-[#d6ded5]">
                    <div className="mm-mono text-[7px] text-[#2C7A78] font-bold">SUNRISE GENERAL</div>
                    <div className="mt-3 h-2 w-full bg-[#dfe4dc]" />
                    <div className="mt-2 h-2 w-3/4 bg-[#dfe4dc]" />
                    <div className="mt-5 h-1.5 w-1/2 bg-[#df8a76]/70" />
                    <div className="mt-2 h-1.5 w-full bg-[#dfe4dc]" />
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs text-[#718079]">
                  <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${started ? "bg-[#c2e0d4] text-[#2C7A78]" : "bg-[#eef0e8] text-[#9ba39c]"}`}>
                    {started ? <Check size={16} /> : <Paperclip size={16} />}
                  </div>
                  <div>
                    <p className="font-semibold text-[#203b3c]">Arjun_Rao_Discharge.pdf</p>
                    <p>Sunrise General Hospital · 5 pages</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="mm-mono text-[10px] uppercase tracking-[.15em] text-[#6b8d82] font-semibold">Processing Pipeline</div>
                  <span className="mm-mono text-[10px] text-[#2C7A78] font-bold">{progress}% ready</span>
                </div>

                <div className="mt-3.5 h-2 overflow-hidden rounded-full bg-[#e5e8df]">
                  <div className="h-full rounded-full bg-[#2C7A78] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-6 space-y-3">
                  {steps.map((label, index) => (
                    <div key={label} className="flex items-center gap-3 rounded-xl p-2.5" data-testid={`office-step-${index}`}>
                      <div
                        className={`grid h-7 w-7 place-items-center rounded-lg ${
                          progress >= (index + 1) * 25 ? "bg-[#dcebe4] text-[#2C7A78]" : "bg-[#f0f0e9] text-[#a4aaa1]"
                        }`}
                      >
                        {progress >= (index + 1) * 25 ? <Check size={14} /> : <MoreHorizontal size={14} />}
                      </div>
                      <p className={`text-xs ${progress >= (index + 1) * 25 ? "font-semibold text-[#203b3c]" : "text-[#87918b]"}`}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {progress === 100 && (
                  <div className="mt-5 rounded-2xl bg-[#e5f0e8] p-4 text-xs leading-5 text-[#2C7A78] border border-[#c6dfd4]">
                    <Check size={15} className="mr-1.5 inline" />
                    <strong>Synced:</strong> The source remains attached to every documented answer.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Product Pitch / Success View */
function Pitch({ setView }: { setView: (view: View) => void }) {
  return (
    <div className="mm-paper mm-grid mm-grain flex min-h-[100dvh] flex-col justify-between">
      <header className="flex items-center justify-between px-6 py-5 border-b border-[#e2dfd5]">
        <Logo />
        <button onClick={() => setView("home")} data-testid="button-pitch-return" className="flex items-center text-xs font-semibold text-[#2C7A78] hover:underline">
          Return to Dashboard <ArrowRight size={14} className="ml-1" />
        </button>
      </header>

      <main className="mx-auto w-full max-w-[850px] px-6 py-16">
        <Chip>What MediMemory holds onto</Chip>
        <h1 className="mm-display mt-7 max-w-4xl text-[3.8rem] sm:text-7xl lg:text-8xl leading-[.88] text-[#203b3c]" data-testid="text-pitch-claim">
          Understand.<br />
          <span className="text-[#2C7A78]">Remember.</span><br />
          Retrieve.<br />
          <span className="text-[#df8a76]">Prove.</span>
        </h1>
        <div className="mt-10 flex max-w-2xl items-start gap-4 border-l-3 border-[#9bcabd] pl-5">
          <FileCheck2 size={24} className="mt-1 shrink-0 text-[#2C7A78]" />
          <p className="text-lg leading-8 text-[#48635c]">
            The memory layer between the hospital and the home.
          </p>
        </div>
      </main>

      <footer className="border-t border-[#dedacf] px-6 py-5 text-xs text-[#718079]">
        <div className="mx-auto flex max-w-[850px] items-center justify-between">
          <span>MediMemory · iQOO Hackathon</span>
          <button onClick={() => setView("source")} data-testid="button-pitch-source" className="font-semibold text-[#2C7A78] hover:underline">
            See the source <ArrowRight size={14} className="ml-1 inline" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function AppContent() {
  const [location, setLocation] = useLocation();
  const [captured, setCaptured] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const route = (location.replace("/", "") || "landing") as View;

  const setView = (view: View) => {
    if (view === "landing") {
      setCaptured(false);
      setNotes([]);
    }
    setLocation(view === "landing" ? "/" : `/${view}`);
  };

  if (route === "landing") return <Landing setView={setView} />;
  if (route === "scan") return <Scan setView={setView} captured={captured} setCaptured={setCaptured} />;
  if (route === "processing") return <Processing setView={setView} />;
  if (route === "home") return <Home setView={setView} notes={notes} />;
  if (route === "timeline") return <Timeline setView={setView} />;
  if (route === "ask") return <Ask setView={setView} />;
  if (route === "caregiver") return <Caregiver setView={setView} notes={notes} setNotes={setNotes} />;
  if (route === "care-note") return <CareNote setView={setView} notes={notes} setNotes={setNotes} />;
  if (route === "office-kit") return <OfficeKit setView={setView} />;
  if (route === "source") return <Source setView={setView} />;
  if (route === "pitch") return <Pitch setView={setView} />;
  return <Landing setView={setView} />;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AppContent />
    </WouterRouter>
  );
}

export default App;