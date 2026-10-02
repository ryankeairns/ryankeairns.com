export const profile = {
  name: 'Ryan Keairns',
  title: 'Principal Product Designer',
  location: 'Seattle, Washington',
  links: [
    { label: 'GitHub', href: 'https://github.com/ryankeairns' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ryan-keairns' },
  ],
} as const;

export const introduction = {
  lead: 'I design complex software for technical users.',
  paragraphs: [
    "I'm Ryan, a product designer with more than 20 years of experience. For the past eight years I've worked on Kibana at Elastic, across product architecture, platform UX, design systems, and increasingly AI experiences.",
    'Most of my work sits above individual features: defining product structure, shared interaction patterns, and the foundations other teams build on. I work directly with engineers, and I write code — strong HTML and CSS, working JavaScript and React — to prototype ideas, understand implementation constraints, and ship improvements myself.',
  ],
  contributions: {
    summary:
      'Hundreds of pull requests to EUI and Kibana, the largest single-application TypeScript codebase on GitHub.',
    href: 'https://github.com/search?q=is%3Apr+author%3Aryankeairns+org%3Aelastic&type=pullrequests',
    label: 'See the pull requests',
  },
} as const;
