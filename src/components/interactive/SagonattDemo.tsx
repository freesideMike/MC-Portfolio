import React, { useState } from 'react';
import { Moon, Sparkles, RefreshCw, ChevronRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import styles from './SagonattDemo.module.css';

interface StoryStep {
  text: string;
  options?: string[];
  isNightMode?: boolean;
}

export const SagonattDemo: React.FC = () => {
  const { language } = useLanguage();
  const [character, setCharacter] = useState<'owl' | 'robot' | 'dragon'>('owl');
  const [theme, setTheme] = useState<'forest' | 'space' | 'clouds'>('forest');
  const [stepIndex, setStepIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGoodnightActivated, setIsGoodnightActivated] = useState(false);
  const [customPath, setCustomPath] = useState<string[]>([]);

  const isSv = language === 'sv';

  const characters = [
    { id: 'owl', name: isSv ? 'Ugglan Mio' : 'Mio the Owl', icon: '🦉' },
    { id: 'robot', name: isSv ? 'Roboten Pip' : 'Pip the Robot', icon: '🤖' },
    { id: 'dragon', name: isSv ? 'Draken Loke' : 'Loke the Dragon', icon: '🐉' },
  ];

  const themes = [
    { id: 'forest', name: isSv ? 'Magiska Skogen' : 'Magic Forest', icon: '🌲' },
    { id: 'space', name: isSv ? 'Vintergatan' : 'Milky Way', icon: '🚀' },
    { id: 'clouds', name: isSv ? 'Molnslottet' : 'Cloud Castle', icon: '☁️' },
  ];

  const getStory = (step: number, choice?: string): StoryStep => {
    if (isSv) {
      if (isGoodnightActivated || step >= 3) {
        return {
          text: `Mörkret sänker sig mjukt som ett varmt täcke över ${
            theme === 'forest' ? 'skogen' : theme === 'space' ? 'stjärnorna' : 'molnen'
          }. ${
            character === 'owl'
              ? 'Mio sluter sina stora ögon i sitt trygga trädhål'
              : character === 'robot'
              ? 'Pips små blå lampor dimmas ner till ett lugnt, tryggt sken'
              : 'Loke kryper ihop på sin mjuka mosskudde och gäspar stort'
          }. Världen viskar god natt, och alla små äventyrare får drömma söta drömmar. God natt och sov så gott... ✨🌙`,
          isNightMode: true,
        };
      }

      if (step === 0) {
        return {
          text: `Det var en stilla kväll när ${
            character === 'owl' ? 'ugglan Mio' : character === 'robot' ? 'roboten Pip' : 'lilla draken Loke'
          } gav sig ut på en lugn upptäcktsfärd i ${
            theme === 'forest' ? 'den magiska Mosskogen' : theme === 'space' ? 'rymden bland stjärnor' : 'det fluffiga Molnslottet'
          }. Längs stigen syntes ett varmt, inbjudande sken.`,
          options: [
            'Följ det glimmande ljuset mot en hemlig glänta',
            'Titta upp mot månen och lyssna på vindens melodi',
          ],
        };
      }

      if (step === 1) {
        return {
          text: `${
            character === 'owl' ? 'Mio' : character === 'robot' ? 'Pip' : 'Loke'
          } valde att ${choice?.toLowerCase() || 'utforska vidare'}. Där mötte de en gammal vän som bjöd på en kopp varm stjärnte med smak av honung och kanel. Ögonlocken började sakta kännas lite tyngre.`,
          options: [
            'Gör ett sista litet val innan sängdags',
            'Säg godnatt och avsluta sagan nu 🌙',
          ],
        };
      }

      return {
        text: `Sakta trappas stegen ner. Lugnet sprider sig och det är dags för nattens rogivande avslutning.`,
        options: ['Låt AI avrunda för sömn 😴'],
      };
    } else {
      // English
      if (isGoodnightActivated || step >= 3) {
        return {
          text: `A gentle twilight settles like a soft warm blanket over the ${
            theme === 'forest' ? 'quiet forest' : theme === 'space' ? 'peaceful stars' : 'fluffy clouds'
          }. ${
            character === 'owl'
              ? 'Mio closes his big gentle eyes in his cozy hollow'
              : character === 'robot'
              ? 'Pip dims his little blue lights into a soothing glow'
              : 'Loke curls up onto his soft moss pillow with a giant yawn'
          }. The world whispers goodnight, and all little adventurers drift into sweet dreams. Goodnight and sleep tight... ✨🌙`,
          isNightMode: true,
        };
      }

      if (step === 0) {
        return {
          text: `It was a calm evening when ${
            character === 'owl' ? 'Mio the Owl' : character === 'robot' ? 'Pip the Robot' : 'little Loke the Dragon'
          } ventured out on a peaceful walk through the ${
            theme === 'forest' ? 'enchanted Whispering Woods' : theme === 'space' ? 'quiet starry expanse' : 'dreamy Cloud Castle'
          }. Along the path, a warm and cozy glow appeared.`,
          options: [
            'Follow the twinkling light toward a secret meadow',
            'Look up at the moon and listen to the gentle breeze',
          ],
        };
      }

      if (step === 1) {
        return {
          text: `${
            character === 'owl' ? 'Mio' : character === 'robot' ? 'Pip' : 'Loke'
          } chose to ${choice?.toLowerCase() || 'explore further'}. There they met a dear friend who offered a warm cup of herbal star-tea. Eyelids began to feel pleasantly heavy.`,
          options: [
            'Make one final gentle choice before bedtime',
            'Say goodnight and end the story now 🌙',
          ],
        };
      }

      return {
        text: `The steps slow down peacefully. A serene stillness fills the air as bedtime draws near.`,
        options: ['Let AI gently wrap up for sleep 😴'],
      };
    }
  };

  const handleChoice = (option: string) => {
    setIsGenerating(true);
    setCustomPath([...customPath, option]);

    if (
      option.includes('godnatt') ||
      option.includes('sömn') ||
      option.includes('goodnight') ||
      option.includes('sleep') ||
      stepIndex >= 2
    ) {
      setTimeout(() => {
        setIsGoodnightActivated(true);
        setStepIndex(3);
        setIsGenerating(false);
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#c084fc', '#fde047', '#38bdf8'],
          });
        } catch {
          // ignore
        }
      }, 700);
    } else {
      setTimeout(() => {
        setStepIndex(stepIndex + 1);
        setIsGenerating(false);
      }, 600);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setIsGoodnightActivated(false);
    setCustomPath([]);
  };

  const currentStory = getStory(stepIndex, customPath[customPath.length - 1]);

  return (
    <div className={`${styles.container} ${isGoodnightActivated ? styles.nightMode : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}>
            <Moon size={20} />
          </div>
          <div>
            <div className={styles.demoTitle}>
              {isSv ? 'Sagonatt Simulator' : 'Sagonatt Bedtime Simulator'}
            </div>
            <div className={styles.demoSubtitle}>
              {isSv
                ? 'AI-genererad saga med rogivande läggdagsfas'
                : 'AI-generated interactive story with calming bedtime mode'}
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm" onClick={handleReset} icon={<RefreshCw size={13} />}>
          {isSv ? 'Starta om' : 'Reset'}
        </Button>
      </div>

      {/* Selectors on step 0 */}
      {stepIndex === 0 && (
        <div className={styles.gridPickers}>
          <div>
            <label className={styles.pickerLabel}>
              {isSv ? '1. Välj Karaktär:' : '1. Choose Character:'}
            </label>
            <div className={styles.pickerButtons}>
              {characters.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCharacter(c.id as any)}
                  className={`${styles.pickerOption} ${character === c.id ? styles.pickerOptionActive : ''}`}
                >
                  <div>{c.icon}</div>
                  <div>{c.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={styles.pickerLabel}>
              {isSv ? '2. Välj Värld:' : '2. Choose Realm:'}
            </label>
            <div className={styles.pickerButtons}>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`${styles.pickerOption} ${theme === t.id ? styles.pickerOptionActive : ''}`}
                >
                  <div>{t.icon}</div>
                  <div>{t.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Story Box */}
      <div className={styles.storyBox}>
        {isGenerating ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <Sparkles size={24} color="#df5b37" style={{ margin: '0 auto 0.5rem auto' }} />
            <p style={{ color: '#df5b37', fontSize: '0.88rem' }}>
              {isSv ? 'AI väver sagan...' : 'AI weaving the story...'}
            </p>
          </div>
        ) : (
          <div>
            <div className={styles.storyChapter}>
              {isGoodnightActivated
                ? isSv ? '🌙 Godnatt-läge' : '🌙 Bedtime Soothing Mode'
                : isSv ? `📖 Kapitel ${stepIndex + 1}` : `📖 Chapter ${stepIndex + 1}`}
            </div>
            <p className={styles.storyText}>{currentStory.text}</p>
          </div>
        )}
      </div>

      {/* Choices */}
      {!isGoodnightActivated && !isGenerating && currentStory.options && (
        <div className={styles.optionsContainer}>
          {currentStory.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleChoice(opt)}
              className={styles.optionButton}
            >
              <span>{opt}</span>
              <ChevronRight size={15} color="#df5b37" />
            </button>
          ))}
        </div>
      )}

      {/* Goodnight Completion Banner */}
      {isGoodnightActivated && (
        <div className={styles.nightBanner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={16} color="#fde047" />
            <span>
              {isSv
                ? 'Godnatt-läget aktiverat: Tempot och belysningen dämpades mjukt.'
                : 'Bedtime mode active: Pacing and lighting transitioned to a soothing sleep state.'}
            </span>
          </div>
          <Button variant="primary" size="sm" onClick={handleReset}>
            {isSv ? 'Skapa ny saga' : 'New Story'}
          </Button>
        </div>
      )}
    </div>
  );
};
