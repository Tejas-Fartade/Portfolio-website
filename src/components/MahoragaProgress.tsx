import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { mahoragaProgress, mahoragaStages } from '../data/mahoragaProgress';
import './MahoragaProgress.css';

const STEP_DURATION = 6000;
const updatedLabel = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${mahoragaProgress.updated}T00:00:00Z`)).toUpperCase();

function AdaptationWheel({ step }: { step: number }) {
  return (
    <div className="mahoraga-wheel" aria-hidden="true">
      <span className="mahoraga-wheel-axis mahoraga-wheel-axis--horizontal" />
      <span className="mahoraga-wheel-axis mahoraga-wheel-axis--vertical" />
      <svg viewBox="0 0 280 280" fill="none">
        <circle className="mahoraga-orbit" cx="140" cy="140" r="127" strokeDasharray="1 9" />
        <circle className="mahoraga-orbit" cx="140" cy="140" r="107" />
        <g className="mahoraga-wheel-turn">
          <circle className="mahoraga-ring" cx="140" cy="140" r="76" />
          {Array.from({ length: 8 }, (_, index) => (
            <g key={index} transform={`rotate(${index * 45} 140 140)`}>
              <path className="mahoraga-spoke" d="M140 64V35M132 43L140 35L148 43M140 94V79" />
              <circle className="mahoraga-wheel-node" cx="140" cy="29" r="3" />
            </g>
          ))}
          <path className="mahoraga-ring" d="M140 109L171 140L140 171L109 140Z" />
        </g>
        <path className="mahoraga-core" d="M140 130L150 140L140 150L130 140Z" />
        <path className="mahoraga-core" d="M134 140H146M140 134V146" />
      </svg>
      <span className="mahoraga-wheel-coordinate">M / 0{step + 1}</span>
    </div>
  );
}

export function MahoragaProgress() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [motionOptIn, setMotionOptIn] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const motionAllowed = !reducedMotion || motionOptIn;
  const playbackEnabled = playing && motionAllowed;
  const animating = playbackEnabled && inView && pageVisible;
  const stage = mahoragaStages[step];

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!animating) return;
    const timer = window.setInterval(() => setStep(current => (current + 1) % mahoragaStages.length), STEP_DURATION);
    return () => window.clearInterval(timer);
  }, [animating]);

  function selectStage(index: number) {
    setPlaying(false);
    setStep(index);
  }

  function togglePlayback() {
    if (playbackEnabled) {
      setPlaying(false);
    } else {
      // An explicit Play click opts this section into motion until the page reloads.
      setMotionOptIn(true);
      setPlaying(true);
    }
  }

  return (
    <section ref={sectionRef} id="mahoraga" className="mahoraga-feature" aria-labelledby="mahoraga-title" data-animating={animating} data-motion-opt-in={motionOptIn}>
      <div className="mahoraga-main">
        <header className="mahoraga-heading">
          <div>
            <p className="mahoraga-eyebrow"><span /> In development / 01</p>
            <h3 id="mahoraga-title">MAHORAGA<span>Base Engine</span></h3>
          </div>
          <a className="mahoraga-source" href={mahoragaProgress.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label="View MAHORAGA Base Engine source on GitHub">
            Source <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </header>

        <div className="mahoraga-story">
          <div className="mahoraga-narrative" id="mahoraga-narrative" aria-live={animating ? 'off' : 'polite'} aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step}
                initial={!motionAllowed ? false : { opacity: 0, y: 10, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={!motionAllowed ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: !motionAllowed ? 0 : 0.35 }}
              >
                <p className="mahoraga-stage-label">0{step + 1} <span>/</span> {stage.label}</p>
                <h4>{stage.title}</h4>
                <p className="mahoraga-description">{stage.description}</p>
                <p className="mahoraga-trace">{stage.trace}</p>
                <p className="mahoraga-detail">{stage.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <AdaptationWheel step={step} />
        </div>

        <div className="mahoraga-controls">
          <div className="mahoraga-stages" role="group" aria-label="Explore the implemented engine stages">
            {mahoragaStages.map((item, index) => (
              <button key={item.label} type="button" className="mahoraga-stage-button" aria-pressed={index === step}
                aria-controls="mahoraga-narrative" onClick={() => selectStage(index)}>
                <span className="mahoraga-stage-mark" aria-hidden="true" />{item.label}
              </button>
            ))}
          </div>
          <div className="mahoraga-playback">
            {!motionAllowed && <span className="mahoraga-motion-note">Motion off</span>}
            <button className="mahoraga-play" type="button" aria-label={playbackEnabled ? 'Pause MAHORAGA animation' : 'Play MAHORAGA animation'}
              title={!motionAllowed ? 'Play animation in this section. Reduced motion is currently enabled.' : undefined} onClick={togglePlayback}>
              {playbackEnabled ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
              <span>{playbackEnabled ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </div>

        <footer className="mahoraga-status">
          <span className="mahoraga-status-marker" aria-hidden="true" />
          <div><p>{mahoragaProgress.current}</p><p>{mahoragaProgress.validation}</p></div>
        </footer>
      </div>

      <aside className="mahoraga-progress" aria-label="Project roadmap progress">
        <p className="mahoraga-progress-label">The long game</p>
        <p className="mahoraga-percent">{mahoragaProgress.percent}<span>%</span></p>
        <p className="mahoraga-estimate">Roadmap<br />estimate</p>
        <div className="mahoraga-progress-scale">
          <span className="mahoraga-scale-end">100</span>
          <div className="mahoraga-meter" role="meter" aria-label="Estimated overall roadmap completion"
            aria-valuemin={0} aria-valuemax={100} aria-valuenow={mahoragaProgress.percent}
            aria-valuetext={`${mahoragaProgress.percent} percent, owner-estimated roadmap progress, not measured readiness`}>
            <span className="mahoraga-meter-fill" style={{ height: `${mahoragaProgress.percent}%` }} />
          </div>
          <span className="mahoraga-scale-end">00</span>
        </div>
        <div className="mahoraga-next"><span>Up next</span><p>{mahoragaProgress.next}</p></div>
        <p className="mahoraga-progress-date">Updated<br /><time dateTime={mahoragaProgress.updated}>{updatedLabel}</time></p>
      </aside>
    </section>
  );
}
