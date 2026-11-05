export interface ProjectScreenSection {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  image: string;
  isScrollable?: boolean;
  isVideoMockup?: boolean;
  description: string;
  highlights: string[];
  techTags?: string[];
  confidentialNotice?: string;
}

export interface ProjectVisionItem {
  number: string;
  title: string;
  desc: string;
}

export interface DetailedProjectContent {
  id: string;
  backToPortfolio: string;
  badge: string;
  title: string;
  subtitle: string;
  introLead: string;
  introBody: string;
  confidentialityNote?: string;
  liveAppBtn?: string;
  liveAppUrl?: string;
  tags: string[];
  screens: ProjectScreenSection[];
  visionSectionTitle: string;
  visionSectionSubtitle: string;
  visionItems: ProjectVisionItem[];
  footerTitle: string;
  footerDesc: string;
  contactBtn: string;
}

export const detailedProjectsData: Record<'sv' | 'en', Record<string, DetailedProjectContent>> = {
  sv: {
    'ikea-automation-portal': {
      id: 'ikea-automation-portal',
      backToPortfolio: '← Tillbaka till alla projekt',
      badge: 'Enterprise Case Study',
      title: 'Enterprise Automation Portal',
      subtitle: 'IKEA IT AB – Automation INGKA / DIG Robotics',
      introLead:
        'Modernisering och utveckling av interna webbportaler för Automation INGKA. Från idé till produktion med fokus på användarvänlighet, skalbarhet och precision.',
      introBody:
        'Under mitt arbete inom IKEA IT utvecklade jag frontend-gränssnitt för att övervaka och visualisera automatiserade processer och robotflöden. Genom att implementera IKEAs officiella designsystem SKAPA skapades en enhetlig, tillgänglig och intuitiv användarupplevelse för interna operatörer och tekniker i ett internationellt agilt team.',
      confidentialityNote:
        'Internt projekt för IKEA IT / Automation INGKA. För att respektera sekretess och företagsdata visas en abstraherad och anonymiserad översikt med fokus på gränssnittsarkitektur och designsystem.',
      tags: ['React', 'TypeScript', 'SKAPA Design System', 'Node.js', 'Jira', 'Agile/Scrum'],
      screens: [
        {
          id: 'dashboard-overview',
          step: '01',
          title: 'Robotics Dashboard & Statusöversikt',
          subtitle: 'Realtidsvisning av processflöden och automatiserade jobb',
          image: '/images/ikea-automation-preview.jpg',
          isScrollable: false,
          description:
            'Ett enhetligt gränssnitt där driftansvariga direkt kan överblicka status för robotjobb, aktiva batch-processer och incidenter. Genom modulära statuskort och tydlig färgkodning minskas tiden för felidentifiering markant.',
          highlights: [
            'Byggt med SKAPA – IKEAs officiella designsystem och tillgängliga komponenter',
            'Tydlig visualisering av robotstatus, exekveringstider och felfrekvens',
            'Responsiv design optimerad för både kontrollrumsskärmar och laptops',
          ],
          techTags: ['React', 'TypeScript', 'SKAPA UI', 'State Management'],
        },
        {
          id: 'architecture-components',
          step: '02',
          title: 'Komponentarkitektur & SKAPA Designsystem',
          subtitle: 'Återanvändbarhet, strikt typning och tillgänglighet (a11y)',
          image: '/images/project-blueprint.jpg',
          isScrollable: false,
          description:
            'All kod strukturerades i moduler med strikt TypeScript och delade komponenter enligt IKEAs designriktlinjer. Detta säkerställde konsistent typografi, färgkontraster och tillgänglighet enligt WCAG över hela portalen.',
          highlights: [
            'Strikt TypeScript för typade datamodeller och minimal risk för körtidsfel',
            'Full tillgänglighetsefterlevnad med WCAG-standarder inbyggda i SKAPA',
            'Smidig samverkan med UX-designers och internationella backend-team',
          ],
          techTags: ['Design Systems', 'WCAG / a11y', 'TypeScript', 'Component Library'],
        },
      ],
      visionSectionTitle: 'Nyckelinsikter & Arkitektoniska Lärdomar',
      visionSectionSubtitle:
        'Att bygga för en global enterprise-miljö ställer unika krav på robusthet, användbarhet och skalbarhet.',
      visionItems: [
        {
          number: '01',
          title: 'Designsystem i stor skala',
          desc: 'Hur ett väldefinierat designsystem som SKAPA accelererar frontend-utvecklingen och eliminerar onödig kodduplicering mellan olika team.',
        },
        {
          number: '02',
          title: 'Komplex data i enkla gränssnitt',
          desc: 'Att transformera tunga backend-dataströmmar och incidentrapporter till lättförståeliga dashboards som underlättar snabba beslut.',
        },
        {
          number: '03',
          title: 'Agilt samarbete över tidszoner',
          desc: 'Effektiv leverans och kodgranskning med Git, GitHub och Jira i ett multidisciplinärt team med utvecklare, produktägare och designers.',
        },
      ],
      footerTitle: 'Vill du veta mer om enterprise-arbetet?',
      footerDesc:
        'Jag berättar gärna mer om min roll, hur jag arbetar med designsystem och frontend-arkitektur i större organisationer.',
      contactBtn: 'Kontakta mig',
    },

    'sagonatt-ai': {
      id: 'sagonatt-ai',
      backToPortfolio: '← Tillbaka till alla projekt',
      badge: 'AI & Mobil Prototyp',
      title: 'SaGoNatt AI Godnattsagor',
      subtitle: 'Mysig interaktiv sagoboksapp med Gemini Pro & Llama',
      introLead:
        'Ett experimentellt projekt för att utforska hur AI kan användas för att skapa både gränssnittet och ett levande, dynamiskt innehåll som anpassar sig efter varje val.',
      introBody:
        'Idén bakom Sagonatt föddes ur viljan att testa hur generativ AI kan integreras i en interaktiv upplevelse som förändras varje dag. Jag tog hjälp av AI under utvecklingen – vilket också präglar designen. Appen är en levande konceptprototyp i Flutter Web: alla knappar är inte fullt klickbara ännu, men kärnan och strukturen visar hur personligt godnattberättande kan se ut.',
      liveAppBtn: 'Öppna live-appen',
      liveAppUrl: 'https://sagonatt-9a457.web.app/',
      tags: ['React', 'TypeScript', 'Gemini AI Pro', 'Llama Local AI', 'Flutter Web'],
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
            'Innan sagan börjar fyller man i barnets namn och ålder samt väljer ett tema – som rymden, havet eller äventyr. Därefter väljer man ett händelsespår som skickas med som instruktion till AI-modellen för att forma berättelsen.',
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
          desc: 'Möjlighet att välja mellan olika berättarstilar och röster (t.ex. den lugne sagofarbrorn, den nyfikne upptäckaren) samt att prompten kan finjusteras i realtid.',
        },
        {
          number: '02',
          title: 'Fritextfält och djupare barnprofil',
          desc: 'Föräldrar ska kunna skriva in fritext om vad sagan ska handla om – barnets dag, ett husdjur eller en händelse på förskolan som AI:n väver in.',
        },
        {
          number: '03',
          title: 'Bortom barnsagor: Böcker och äventyr',
          desc: 'Tekniken kan skalas upp för att skapa längre berättelser med sammanhängande kapitel, komplexa handlingar och flera karaktärer.',
        },
        {
          number: '04',
          title: 'Filmmanus med dramaturgi och dialog',
          desc: 'Använda strukturerade prompts för att generera filmmanus med tydliga scenanvisningar, dialog och genomtänkt dramaturgisk kurva.',
        },
      ],
      footerTitle: 'Vill du veta mer om projektet?',
      footerDesc:
        'Hör gärna av dig om du vill prata om prototypen, koden bakom eller hur AI kan användas i framtida webblösningar.',
      contactBtn: 'Kontakta mig',
    },

    'fps-mobile-game': {
      id: 'fps-mobile-game',
      backToPortfolio: '← Tillbaka till alla projekt',
      badge: 'Game Concept & Sensor Motion',
      title: 'FPS Mobile Game & Body Motion',
      subtitle: 'Kroppsstyrt mobilspel med Unity 3D Engine & Gyroskop',
      introLead:
        'Ett innovativt mobilspelskoncept där spelaren styr sin avatar genom att fysiskt vrida kroppen med hjälp av mobilens hårdvarusensorer istället för traditionell skärm-tilt.',
      introBody:
        'Projektet utforskar gränslandet mellan mobil hårdvara och realtids 3D-spelmotorer. Genom att läsa av enhetens gyroskop och orienteringssensorer i 60 FPS översätts spelarens faktiska kroppsrörelser till sikte och position i Unity 3D-arenan, vilket skapar en intensiv och fysiskt inlevelsefull spelupplevelse.',
      tags: ['Unity 3D', 'C#', 'Device Gyroscope', 'Web Sensors', 'TypeScript', '3D Level Design'],
      screens: [
        {
          id: 'gameplay-motion',
          step: '01',
          title: 'Gyrostyrning & Speltest',
          subtitle: 'Kroppsrörelser styr sikte och orientering i realtid',
          image: '/images/fps-gyro-play.jpg',
          isVideoMockup: true,
          isScrollable: false,
          description:
            'Genom att utnyttja mobilens inbyggda gyrosensorer i 60 FPS styrs spelarens sikte och blick genom att fysiskt vrida kroppen. Detta tar bort behovet av klumpiga touch-styrspakar på skärmen och ger en omedelbar arkadkänsla.',
          highlights: [
            'Låg-latens sensoravläsning i 60 FPS för direkt respons',
            'Filtrering av gyro-brus för att förhindra skakiga kamerarörelser',
            'Innovativ spelmekanik som aktiverar spelaren fysiskt',
          ],
          techTags: ['Gyro Tracking', 'Hardware API', 'Input Smoothing', '60 FPS'],
        },
        {
          id: 'unity-level-design',
          step: '02',
          title: 'Unity 3D Viewport & Arenamiljö',
          subtitle: '3D-arenadesign, dynamisk belysning och optimering för mobil',
          image: '/images/fps-unity-scene.jpg',
          isScrollable: false,
          description:
            'Spelmiljön är modellerad och ljussatt i Unity 3D Engine med fokus på hög prestanda på mobila enheter. Lågpolygongeometri och optimerade ljuskartor möjliggör stabil bildfrekvens även under intensiva stridsmoment.',
          highlights: [
            'Skapad i Unity 3D med modulär arenadesign och kollisionshantering',
            'Optimerade shaders och bakad ljussättning för mobilprestanda',
            'C#-skript för logik, vapenmekanik och fiende-spawning',
          ],
          techTags: ['Unity 3D', 'C# Scripting', 'Shader Optimization', 'Mobile Graphics'],
        },
      ],
      visionSectionTitle: 'Spelmekanik & Tekniska Framsteg',
      visionSectionSubtitle:
        'Hur modern sensorintegration kan förnya mobilspel och interaktiva upplevelser.',
      visionItems: [
        {
          number: '01',
          title: 'Fysisk inlevelse utan VR-headset',
          desc: 'Att använda mobilen som ett fönster in i den virtuella världen ger en VR-liknande upplevelse utan att kräva dyr specialhårdvara.',
        },
        {
          number: '02',
          title: 'Kalibrering och drift-korrigering',
          desc: 'Algoritmer för att kontinuerligt nollställa och korrigera sensordrift så att spelaren alltid har en stabil centrering under långa spelsessioner.',
        },
        {
          number: '03',
          title: 'Multiplayer och tävlingsmoment',
          desc: 'Nästa steg är att addera realtids-matchmaking och lokala dueller via WebSockets för fartfyllda matcher mellan vänner.',
        },
      ],
      footerTitle: 'Nyfiken på spelmekaniken eller koden?',
      footerDesc:
        'Hör gärna av dig om du vill diskutera spelutveckling, sensorteknik eller kreativa gränssnittslösningar.',
      contactBtn: 'Kontakta mig',
    },
  },

  en: {
    'ikea-automation-portal': {
      id: 'ikea-automation-portal',
      backToPortfolio: '← Back to all projects',
      badge: 'Enterprise Case Study',
      title: 'Enterprise Automation Portal',
      subtitle: 'IKEA IT AB – Automation INGKA / DIG Robotics',
      introLead:
        'Modernization and development of internal web portals for Automation INGKA. From concept to production with strong focus on user experience, scalability, and clarity.',
      introBody:
        'During my work at IKEA IT, I engineered frontend interfaces to monitor and visualize robotic automation flows. By utilizing IKEA’s official design system SKAPA, we delivered a cohesive, accessible, and intuitive UI for internal operators and engineers across an international agile team.',
      confidentialityNote:
        'Internal enterprise project for IKEA IT / Automation INGKA. To respect confidentiality and internal data, an abstracted and anonymized overview is presented focusing on UI architecture and design systems.',
      tags: ['React', 'TypeScript', 'SKAPA Design System', 'Node.js', 'Jira', 'Agile/Scrum'],
      screens: [
        {
          id: 'dashboard-overview',
          step: '01',
          title: 'Robotics Dashboard & Status View',
          subtitle: 'Real-time monitoring of automated jobs and process flows',
          image: '/images/ikea-automation-preview.jpg',
          isScrollable: false,
          description:
            'A unified interface allowing operations staff to immediately monitor robot execution statuses, active batch processes, and incident alerts. Modular status cards and clear color coding drastically cut downtime.',
          highlights: [
            'Engineered with SKAPA – IKEA’s official design system and accessible UI components',
            'Clear visualization of robot execution statuses, runtimes, and health metrics',
            'Responsive layout tailored for monitoring dashboards and developer laptops',
          ],
          techTags: ['React', 'TypeScript', 'SKAPA UI', 'State Management'],
        },
        {
          id: 'architecture-components',
          step: '02',
          title: 'Component Architecture & SKAPA Design System',
          subtitle: 'Reusability, strict typing, and accessibility (a11y)',
          image: '/images/project-blueprint.jpg',
          isScrollable: false,
          description:
            'Code was modularized using strict TypeScript and reusable components conforming to IKEA brand standards. This ensured harmonious typography, color contrast, and WCAG accessibility across the portal.',
          highlights: [
            'Strict TypeScript for typed data schemas and minimal runtime bugs',
            'Full WCAG accessibility compliance built into SKAPA foundations',
            'Seamless cross-functional collaboration with UX designers and backend engineers',
          ],
          techTags: ['Design Systems', 'WCAG / a11y', 'TypeScript', 'Component Library'],
        },
      ],
      visionSectionTitle: 'Key Learnings & Architectural Insights',
      visionSectionSubtitle:
        'Building for a global enterprise environment demands exceptional reliability, performance, and clear UI paradigms.',
      visionItems: [
        {
          number: '01',
          title: 'Design systems at enterprise scale',
          desc: 'How standardized component systems like SKAPA accelerate velocity and eliminate redundant code between cross-functional teams.',
        },
        {
          number: '02',
          title: 'Simplifying complex operational data',
          desc: 'Transforming dense backend logs and telemetry into intuitive visual dashboards that empower rapid operational decisions.',
        },
        {
          number: '03',
          title: 'Agile collaboration across borders',
          desc: 'Effective code reviews and continuous delivery using Git, GitHub, and Jira in an international agile engineering group.',
        },
      ],
      footerTitle: 'Want to learn more about my enterprise work?',
      footerDesc:
        'I am happy to talk more about my role, design systems, and frontend architecture in large-scale organizations.',
      contactBtn: 'Contact me',
    },

    'sagonatt-ai': {
      id: 'sagonatt-ai',
      backToPortfolio: '← Back to all projects',
      badge: 'AI & Mobile Prototype',
      title: 'SaGoNatt AI Bedtime Stories',
      subtitle: 'Cozy interactive storyteller with Gemini Pro & Llama',
      introLead:
        'An experimental project exploring how AI can help build both the user interface and truly dynamic content that adapts with every choice.',
      introBody:
        'The idea behind Sagonatt grew from wanting to test how generative AI can be integrated into an interactive experience that feels fresh each day. I leveraged AI throughout development—which also shaped the visual aesthetic. The app is a living concept prototype in Flutter Web: not every element is clickable yet, but the core architecture shows what personalized bedtime storytelling can look like.',
      liveAppBtn: 'Open live app',
      liveAppUrl: 'https://sagonatt-9a457.web.app/',
      tags: ['React', 'TypeScript', 'Gemini AI Pro', 'Llama Local AI', 'Flutter Web'],
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
            'Before the story begins, you configure who the story is for: child name, age, and theme (space, ocean, or adventure). You then choose an event path passed into the AI model to shape the chapter.',
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
          desc: 'Choosing between distinct storytelling personas and tuning the underlying story prompt in real-time.',
        },
        {
          number: '02',
          title: 'Freeform text input and deeper child profiles',
          desc: 'Letting parents enter freeform text about what the story should involve—such as real events from the child’s day, friends, or pets.',
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

    'fps-mobile-game': {
      id: 'fps-mobile-game',
      backToPortfolio: '← Back to all projects',
      badge: 'Game Concept & Sensor Motion',
      title: 'FPS Mobile Game & Body Motion',
      subtitle: 'Body-controlled mobile shooter with Unity 3D & Gyroscope',
      introLead:
        'An innovative mobile shooter concept where the player directs their avatar by physically turning their torso using on-device sensors rather than virtual touchscreen sticks.',
      introBody:
        'This project explores the intersection of mobile device hardware and real-time 3D game engines. By polling the mobile gyroscope and orientation sensors at 60 FPS, the player’s real body rotations are translated into precise camera aim inside the Unity 3D arena, offering an exhilarating and kinetic experience.',
      tags: ['Unity 3D', 'C#', 'Device Gyroscope', 'Web Sensors', 'TypeScript', '3D Level Design'],
      screens: [
        {
          id: 'gameplay-motion',
          step: '01',
          title: 'Gyro Motion & Gameplay Playtest',
          subtitle: 'Physical torso movement powers real-time aiming and view angle',
          image: '/images/fps-gyro-play.jpg',
          isVideoMockup: true,
          isScrollable: false,
          description:
            'Leveraging the mobile phone’s internal gyroscope at 60 FPS allows the player to aim and look around simply by pivoting their body. This removes the clutter of on-screen virtual joysticks and delivers an instinctive arcade sensation.',
          highlights: [
            'Ultra low-latency 60 FPS sensor polling for immediate physical responsiveness',
            'Smart gyro noise filtration preventing jitter during subtle movements',
            'Novel kinetic gameplay mechanism that activates the player physically',
          ],
          techTags: ['Gyro Tracking', 'Hardware API', 'Input Smoothing', '60 FPS'],
        },
        {
          id: 'unity-level-design',
          step: '02',
          title: 'Unity 3D Viewport & Arena Environment',
          subtitle: '3D arena level design, lighting and mobile optimization',
          image: '/images/fps-unity-scene.jpg',
          isScrollable: false,
          description:
            'The combat arena was modeled and lit inside Unity 3D Engine with a priority on silky smooth frame rates on mobile hardware. Low-poly geometry and baked lightmaps guarantee consistent performance.',
          highlights: [
            'Built in Unity 3D with modular arena geometry and collision meshes',
            'Optimized shaders and baked lighting tailored for mobile devices',
            'C# scripts handling game logic, weapon recoil, and enemy spawning',
          ],
          techTags: ['Unity 3D', 'C# Scripting', 'Shader Optimization', 'Mobile Graphics'],
        },
      ],
      visionSectionTitle: 'Game Mechanics & Technical Milestones',
      visionSectionSubtitle:
        'How modern hardware sensor integration breathes fresh life into mobile games.',
      visionItems: [
        {
          number: '01',
          title: 'Immersive VR sensation without headsets',
          desc: 'Using the mobile device as an optical portal into the virtual realm creates a VR-like presence without requiring expensive peripherals.',
        },
        {
          number: '02',
          title: 'Calibration and drift compensation',
          desc: 'Developing runtime calibration algorithms to eliminate sensor drift and preserve center focus over extended gameplay sessions.',
        },
        {
          number: '03',
          title: 'Real-time multiplayer duels',
          desc: 'The next milestone is integrating WebSocket matchmaking for intense local head-to-head multiplayer shootouts.',
        },
      ],
      footerTitle: 'Curious about the game mechanics or architecture?',
      footerDesc:
        'Get in touch if you would like to discuss game development, sensor technology, or creative interface paradigms.',
      contactBtn: 'Contact me',
    },
  },
};
