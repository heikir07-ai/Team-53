import { Angle, AngleOption, HookOption, Tweet } from '../types';

export const ANGLE_OPTIONS: AngleOption[] = [
  { id: 'Spicy', label: '🔥 Spicy', tooltip: 'Hot takes welcome', selectedClass: 'selected-default' },
  { id: 'Funny', label: '😂 Funny', tooltip: 'Make them laugh first', selectedClass: 'selected-default' },
  { id: 'Direct', label: '🎯 Direct', tooltip: 'No fluff, just truth', selectedClass: 'selected-default' },
  { id: 'Analytical', label: '📊 Analytical', tooltip: 'Data and logic', selectedClass: 'selected-default' },
  { id: 'Left Take', label: '🔴 Left Take', tooltip: 'Progressive lens', selectedClass: 'selected-left' },
  { id: 'Conservative', label: '🔵 Conservative', tooltip: 'Traditional values', selectedClass: 'selected-conservative' },
  { id: 'Woke', label: '💡 Woke', tooltip: 'Social justice angle', selectedClass: 'selected-woke' },
  { id: 'Neutral', label: '🤝 Neutral', tooltip: 'Balanced, no agenda', selectedClass: 'selected-default' },
];

export const HOOK_OPTIONS: HookOption[] = [
  { id: 'Start with controversy', label: '💥 Start with controversy' },
  { id: 'Open with a question', label: '❓ Open with a question' },
  { id: 'Lead with a stat', label: '📈 Lead with a stat' },
  { id: 'Build to a punchline', label: '🧵 Build to a punchline' },
];

export const LANDING_ANGLE_PILLS = [
  '🔥 Spicy', '😂 Funny', '🎯 Direct', '📊 Analytical',
  '🔴 Left Take', '🔵 Conservative', '💡 Woke', '🤝 Neutral',
];

const DEFAULT_TWEETS = [
  `The "AI won't replace you, a person using AI will" take is the most polished cope of 2024.\n\nJunior dev roles aren't being outsourced.\nThey're being deleted.\n\nThe job ladder wasn't broken.\nIt was removed.\n\nLearn to direct AI or learn something else.`,
  `Unpopular: the new junior developer is a senior with three AI tools open.\n\nWhy hire a team to write boilerplate when one person with Cursor and Claude does it faster?\n\nThe math changed quietly.\nThe job market just hasn't caught up yet.`,
  `Nobody in tech leadership is saying this out loud but junior engineering headcount has been quietly frozen.\n\nNot cut. Frozen.\nThey're watching how good AI gets.\n\nSpoiler: it got good enough 18 months ago.\n\nThe freeze is becoming permanent.`,
];

const VARIANT_A = [
  (t: string) => `Hot take: ${t} is the conversation everyone's having but nobody wants to lead.\n\nThe people who figure out which side to be on first will define the next 5 years.\n\nEveryone else will be explaining why they were "almost right."`,
  (t: string) => `${t} isn't a problem.\n\nIt's a filter.\n\nThe people who thrive through it aren't the ones with the right answer.\nThey're the ones asking better questions.\n\nStart asking better questions.`,
  (t: string) => `Three months from now, everyone will have an opinion on ${t}.\n\nRight now, maybe 200 people actually understand what's happening.\n\nBe one of the 200.\nNot one of the millions playing catch-up.`,
  (t: string) => `We're all pretending ${t} has a clean solution.\n\nIt doesn't.\n\nThe honest answer is: nobody knows yet.\n\nThe people who admit that early will be trusted when it matters.`,
];

const VARIANT_B = [
  (t: string) => `Nobody talks about the second-order effects of ${t}.\n\nThe first wave disrupts the obvious players.\nThe second wave disrupts everyone who thought they were safe.\n\nYou're probably in wave two territory.`,
  (t: string) => `The thing about ${t} that most takes miss:\n\nIt's not about who wins.\nIt's about what disappears.\n\nThe winners will be fine.\nIt's the "fine" people who should be paying attention.`,
  (t: string) => `Here's what I'd actually do about ${t} if I were starting from zero:\n\n1. Stop consuming takes about it\n2. Find someone already navigating it successfully\n3. Do exactly that\n4. Write about what you learned\n\nThat's the whole playbook.`,
  (t: string) => `The mainstream narrative on ${t} is wrong in one specific way:\n\nIt assumes the timeline.\n\nThis isn't a 5-year problem.\nIt's already here.\nAnd most people are still treating it like a forecast.`,
];

function isDefaultTopic(topic: string): boolean {
  const lower = topic.toLowerCase();
  return lower.includes('ai') && lower.includes('junior');
}

export function getMockTweets(topic: string, angle: Angle): Tweet[] {
  const subject = topic.trim() || 'AI is replacing junior developers';
  const ts = Date.now();

  if (isDefaultTopic(subject)) {
    return DEFAULT_TWEETS.map((text, i) => ({
      id: `tweet-${ts}-${i}`,
      text,
      angle,
    }));
  }

  return [
    { id: `tweet-${ts}-0`, text: VARIANT_A[0](subject), angle },
    { id: `tweet-${ts}-1`, text: VARIANT_B[0](subject), angle },
    { id: `tweet-${ts}-2`, text: VARIANT_A[1](subject), angle },
  ];
}

export function getRewrittenTweets(topic: string, angle: Angle): Tweet[] {
  const subject = topic.trim() || 'AI is replacing junior developers';
  const ts = Date.now();

  return [
    { id: `tweet-${ts}-rw-0`, text: VARIANT_B[1](subject), angle },
    { id: `tweet-${ts}-rw-1`, text: VARIANT_A[2](subject), angle },
    { id: `tweet-${ts}-rw-2`, text: VARIANT_B[2](subject), angle },
  ];
}

export function getRewrittenSingle(topic: string, angle: Angle, cardIndex: number): string {
  const subject = topic.trim() || 'AI is replacing junior developers';
  const pool = [...VARIANT_A, ...VARIANT_B];
  return pool[(cardIndex + 4) % pool.length](subject);
}
