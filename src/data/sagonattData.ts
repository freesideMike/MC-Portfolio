export interface SagonattScreen {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  image: string;
  isScrollable?: boolean;
  description: string;
  highlights: string[];
}

export interface SagonattRoadmapItem {
  number: string;
  title: string;
  desc: string;
}

export interface SagonattContent {
  backToPortfolio: string;
  badge: string;
  title: string;
  introLead: string;
  introBody: string;
  liveAppBtn: string;
  liveAppUrl: string;
  screens: SagonattScreen[];
  visionSectionTitle: string;
  visionSectionSubtitle: string;
  visionItems: SagonattRoadmapItem[];
  footerTitle: string;
  footerDesc: string;
  contactBtn: string;
}

export const sagonattData: Record<'sv' | 'en', SagonattContent> = {
  sv: {
    backToPortfolio: '← Tillbaka till alla projekt',
    badge: 'Projektpresentation',
    title: 'SaGoNatt AI',
    introLead:
      'Ett experimentellt projekt för att utforska hur AI kan användas för att skapa både gränssnittet och ett levande, dynamiskt innehåll som anpassar sig efter varje val.',
    introBody:
      'Idén bakom Sagonatt föddes ur viljan att testa hur generativ AI kan integreras i en interaktiv upplevelse som förändras varje dag. Jag tog hjälp av AI under utvecklingen – vilket också präglar designen. Appen är en levande konceptprototyp i Flutter Web: alla knappar är inte fullt klickbara ännu, men kärnan och strukturen visar hur personligt godnattberättande kan se ut.',
    liveAppBtn: 'Öppna live-appen',
    liveAppUrl: 'https://sagonatt-9a457.web.app/',
    screens: [
      {
        id: 'landing',
        step: '01',
        title: 'Landningssidan',
        subtitle: 'En inbjudande nattstämning med hela flödet samlat',
        image: '/images/sagonatt/sagonatt-landing-scroll.jpg',
        isScrollable: true,
        description:
          'Här möts föräldrar och barn av en mjuk natthimmel, förklaring av sagokonceptet och rekommenderade sagor. Bilden nedan är scrollbar inuti mobilramen så att du kan bläddra igenom hela sidan precis som i den riktiga appen.',
        highlights: [
          'Scrollbar mobilvy med fullständig landningssida',
          'Atmosfärisk nattstämning anpassad för godnattstunden',
          'Tydlig struktur för populära sagor och föräldrarecensioner',
        ],
      },
      {
        id: 'setup',
        step: '02',
        title: 'Barnprofil & Sagoval',
        subtitle: 'Vem sagan ska handla om och vilken värld den utspelar sig i',
        image: '/images/sagonatt/sagonatt-setup-child.jpg',
        isScrollable: false,
        description:
          'Innan sagan börjar fyller man i barnets namn och ålder samt väljer ett tema – som rymden, havet eller äventyr. Därefter väljer man ett händelsespår (här ”Skratt-raketen”) som skickas med som instruktion till AI-modellen för att forma berättelsen.',
        highlights: [
          'Inmatning av barnets namn och ålder för personlig tilltalston',
          'Temaval som styr miljö och sagoton (rymden, hav, djur & natur)',
          'Händelseval som ger barnet inflytande redan innan sagan startar',
        ],
      },
      {
        id: 'library',
        step: '03',
        title: 'Mina Sidor & Sparade Sagor',
        subtitle: 'Ett eget bibliotek med pågående och avslutade sagor',
        image: '/images/sagonatt/sagonatt-my-stories.jpg',
        isScrollable: false,
        description:
          'Alla sagor som skapas sparas i en personlig översikt med bilder, datum och statusmarkeringar för pausade respektive avslutade sagor. På så sätt kan man när som helst fortsätta ett påbörjat äventyr nästa kväll.',
        highlights: [
          'Översiktligt kortgalleri med tidigare skapade berättelser',
          'Statusmarkeringar för pausade och avslutade sagor',
          'Möjlighet att snabbt starta en ny saga direkt från översikten',
        ],
      },
      {
        id: 'pricing',
        step: '04',
        title: 'Priser & Abonnemang',
        subtitle: 'Enkel och överskådlig struktur för användning',
        image: '/images/sagonatt/sagonatt-pricing.jpg',
        isScrollable: false,
        description:
          'En vy för att presentera hur en framtida modell kan se ut, med en gratis provkvot för månatliga sagogenereringar, standardkaraktärer och interaktiva val.',
        highlights: [
          'Tydlig presentation av prova-på-pott utan bindning',
          'Enkel introduktion till funktionerna som ingår',
          'Anpassad layout för mobila skärmar',
        ],
      },
    ],
    visionSectionTitle: 'Tankar & Planer för Vidareutveckling',
    visionSectionSubtitle:
      'Det finns mycket potential att utveckla konceptet vidare – från smartare sagoprompter till filmmanus och böcker.',
    visionItems: [
      {
        number: '01',
        title: 'Valbara berättare och anpassade prompts',
        desc: 'Möjlighet att välja mellan olika berättarstilar och röster (t.ex. den lugne sagofarbrorn, den nyfikne upptäckaren) samt att själva sagoprompten kan finjusteras i realtid.',
      },
      {
        number: '02',
        title: 'Fritextfält och djupare barnprofil',
        desc: 'Föräldrar ska kunna skriva in fritext om vad sagan ska handla om – berätta om barnets dag, ett husdjur eller en händelse på förskolan som AI:n väver in i berättelsen.',
      },
      {
        number: '03',
        title: 'Bortom barnsagor: Böcker och invecklade äventyr',
        desc: 'Tekniken kan skalas upp för att skapa längre berättelser med sammanhängande kapitel, komplexa handlingar och flera karaktärer som interagerar med varandra.',
      },
      {
        number: '04',
        title: 'Filmmanus med dramaturgi och dialog',
        desc: 'Använda strukturerade prompts för att generera hela filmmanus med tydliga scenanvisningar, levande dialog och genomtänkt dramaturgisk kurva.',
      },
    ],
    footerTitle: 'Vill du veta mer om projektet?',
    footerDesc:
      'Hör gärna av dig om du vill prata om prototypen, koden bakom eller hur AI kan användas i framtida webblösningar.',
    contactBtn: 'Kontakta mig',
  },
  en: {
    backToPortfolio: '← Back to all projects',
    badge: 'Project Showcase',
    title: 'SaGoNatt AI',
    introLead:
      'An experimental project exploring how AI can help build both the user interface and truly dynamic content that adapts with every choice.',
    introBody:
      'The idea behind Sagonatt grew from wanting to test how generative AI can be integrated into an interactive experience that feels fresh each day. I leveraged AI throughout development—which also shaped the visual aesthetic. The app is a living concept prototype in Flutter Web: not every element is clickable yet, but the core architecture shows what personalized bedtime storytelling can look like.',
    liveAppBtn: 'Open live app',
    liveAppUrl: 'https://sagonatt-9a457.web.app/',
    screens: [
      {
        id: 'landing',
        step: '01',
        title: 'Landing Page',
        subtitle: 'A welcoming bedtime mood with the entire flow presented',
        image: '/images/sagonatt/sagonatt-landing-scroll.jpg',
        isScrollable: true,
        description:
          'Here, parents and children are welcomed by a night sky, a clear explanation of the bedtime story concept, and featured stories. The image inside the mobile frame below is scrollable so you can explore the entire flow just like in the real app.',
        highlights: [
          'Scrollable mobile frame showing the complete landing flow',
          'Calming ambient theme suited for bedtime wind-down',
          'Clear layout for trending stories and parent reviews',
        ],
      },
      {
        id: 'setup',
        step: '02',
        title: 'Child Profile & Story Setup',
        subtitle: 'Personalizing name, age, and adventurous themes',
        image: '/images/sagonatt/sagonatt-setup-child.jpg',
        isScrollable: false,
        description:
          'Before the story begins, you configure who the story is for: child name, age, and theme (space, ocean, or adventure). You then choose an event path (here "The Laughter Rocket") passed into the AI model to shape the chapter.',
        highlights: [
          'Child name and age input for personalized storytelling',
          'Theme selection setting the tone (Space, Oceans, Wildlife)',
          'Story prompt selection giving the child agency right from the start',
        ],
      },
      {
        id: 'library',
        step: '03',
        title: 'My Pages & Saved Stories',
        subtitle: 'A personal library of ongoing and finished bedtime tales',
        image: '/images/sagonatt/sagonatt-my-stories.jpg',
        isScrollable: false,
        description:
          'All generated stories are saved in an overview with cover artwork, dates, and status tags for paused or completed stories. This allows family members to resume paused adventures the following evening.',
        highlights: [
          'Card library displaying previously generated bedtime tales',
          'Status tags for paused and completed chapters',
          'Quick button to launch a new bedtime story immediately',
        ],
      },
      {
        id: 'pricing',
        step: '04',
        title: 'Subscription & Plans',
        subtitle: 'Clean and transparent structure for ongoing use',
        image: '/images/sagonatt/sagonatt-pricing.jpg',
        isScrollable: false,
        description:
          'A screen presenting how a future subscription model could look, featuring a free trial story quota, standard characters, and interactive choices.',
        highlights: [
          'Clean presentation of a free trial allocation',
          'Simple overview of included capabilities',
          'Tailored layout for mobile screens',
        ],
      },
    ],
    visionSectionTitle: 'Ideas & Future Roadmap',
    visionSectionSubtitle:
      'There is great potential to expand this concept—from refined story prompts to complete books and screenplays.',
    visionItems: [
      {
        number: '01',
        title: 'Selectable narrators and flexible prompts',
        desc: 'Choosing between distinct storytelling personas (e.g. the calm bedtime grandfather, the energetic explorer) and tuning the underlying story prompt in real-time.',
      },
      {
        number: '02',
        title: 'Freeform text input and deeper child profiles',
        desc: 'Letting parents enter freeform text about what the story should involve—such as real events from the child’s day, friends, or pets, woven naturally into the plot.',
      },
      {
        number: '03',
        title: 'Beyond bedtime tales: Novels and wild adventures',
        desc: 'Scaling the technology to generate longer multi-chapter fiction with intricate story arcs and multiple interacting characters.',
      },
      {
        number: '04',
        title: 'Screenplays with scene directions and dialogue',
        desc: 'Using structured prompting to create complete movie screenplays with standard sluglines, sharp dialogue exchanges, and classical dramatic pacing.',
      },
    ],
    footerTitle: 'Want to know more about this project?',
    footerDesc:
      'Feel free to reach out if you would like to discuss the prototype, the code behind it, or how AI can be utilized in future web apps.',
    contactBtn: 'Contact me',
  },
};
