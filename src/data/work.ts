export interface Role {
  company: string;
  url?: string;
  /** Omit when the title was never recorded. Don't guess. */
  role?: string;
  dates: string;
  paragraphs?: string[];
}

export const current: Role = {
  company: 'Elastic',
  url: 'https://www.elastic.co',
  role: 'Principal Product Designer',
  dates: '2018–Present',
  paragraphs: [
    'Kibana and the platform beneath it are my main focus: product architecture, navigation, shared interaction patterns, and the design system other teams build on. Lately that also means AI and agent experiences, where the patterns are still being invented.',
    'Day to day that means partnering directly with designers, engineers, and product managers, prototyping in the codebase rather than only in Figma, and contributing production code. The work usually starts by noticing a problem nobody has scoped yet, forming a point of view, and making the case for it across teams.',
    'Alongside that, I lead design for Design Systems. Earlier, I managed both the Platform UX and Design Systems teams and served as interim UX Director. Going where there is the greatest need.',
  ],
};

/**
 * Concrete, verifiable detail. Sources are the case studies written while the
 * work happened, kept in this repo's git history.
 */
export const selectedWork: { area: string; description: string }[] = [
  {
    area: 'Kibana UI upgrade',
    description:
      "A product-wide interface upgrade building on the Borealis theme work. I led a small crew working autonomously. I started with the design exploration, accurately scoped the changes to those most likely to fit in time and not cause breakages, wrote reference pull requests to set the pattern, partnered with an EUI engineer who owned the final implementation, and guided a peer designer through repairing broken UIs so downstream teams wouldn't inherit them. It shipped in a month, ahead of schedule for the 9.6 release, across more than 100 commits on a single Kibana pull request.",
  },
  {
    area: 'Borealis, the new EUI theme',
    description:
      'Design lead on Borealis, the latest theme for Elastic UI, and the precursor to that upgrade. A theme is the visual foundation every interface on the design system inherits, so a decision made once either resolves or repeats itself across the whole product surface.',
  },
  {
    area: 'Prototyping in code',
    description:
      "Kibana's app headers and app menus had grown organically and was unlikely to clear the roadmap on discussion alone. I built a working redesign directly in a local instance in under a day, demoed it to the Platform team with a link for hands-on review, and it became the direction for planned development.",
  },
  {
    area: 'Agent Builder',
    description:
      "Agent interfaces are new enough that every structural decision sets precedent, and the wrong one is costly to unwind. I shape the system and platform direction of Elastic's agent product, holding new surfaces to the design system and extending it where agent interfaces need something it doesn't offer yet. The product had grown two parallel agent experiences, one in the application and one in a sidebar, so I designed and proposed a two-panel layout and interaction model that collapses them into a single approach. Hands-on work included the Attachments UI, contributed as pull requests.",
  },
  {
    area: 'ES|QL editor and autocomplete',
    description:
      "Query editing, autocomplete, and inline guidance for Elastic's query language. Designing for people who work in a language, where the interaction model is the product and the details decide whether it feels fast or obstructive.",
  },
  {
    area: 'Shared interaction systems',
    description:
      'Flyouts behaved differently depending on where they opened, which broke task flow for users and meant redundant implementations for engineers. I audited every variant, then defined a composable system — regions, focus handling, motion — with Shared UX and EUI engineering, phased so teams could ship incrementally and built on the existing component without breaking changes. It merged into EUI and teams maintaining custom flyouts moved onto it.',
  },
  {
    area: 'Navigation and product architecture',
    description:
      "Kibana's structure predated Elastic's solution-based strategy, so users thought in solutions while the product organized itself around an abstract concept. I led design through two phases — strengthening Spaces as a foundation, then extending it into solution views — choosing the path that preserved backward compatibility and shipped behind a feature flag. Platform, Security, and Observability aligned around a reference prototype that became the shared source of truth.",
  },
];

/**
 * From the previous version of this site. Titles for these two were never
 * recorded, so only company and dates are listed.
 */
export const previous: Role[] = [
  {
    company: 'Chef',
    url: 'https://www.chef.io',
    dates: '2016–2018',
  },
  {
    company: 'Startups',
    dates: '2012–2016',
  },
];

export const earlierCareer =
  'Before that, a decade of front-end and back-end development work that still shapes how I design.';
