export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
}

export const defaultArticles: BlogArticle[] = [
  {
    id: "high-functioning-burnout",
    title: "Breaking the Cycle of High-Functioning Burnout",
    category: "Burnout & Purpose",
    readTime: "6 min read",
    date: "July 18, 2026",
    excerpt:
      "Why achievement doesn't always bring peace, and how high-performers can restore genuine psychological rest without sacrificing excellence.",
    content: `High-functioning burnout is one of the most deceptive forms of emotional distress because it hides behind a mask of productivity. You continue meeting deadlines, showing up for meetings, and maintaining a composed exterior—yet internally, you feel drained, detached, and perpetually operating on empty.

### The Hidden Roots
Often, high-functioning burnout stems from an implicit belief that your self-worth is tied to continuous output. When resting feels like guilt or failure, your nervous system remains stuck in chronic sympathetic arousal (fight-or-flight).

### 3 Steps to Recalibrate
1. **Differentiate Rest from Relief:** Relief is passive scrolling or streaming; true rest requires intentional nervous system down-regulation like nature walks or somatic breathing.
2. **Set Non-Negotiable Depletion Triggers:** Notice physical warnings (jaw clenching, sleep disruption) before reaching emotional collapse.
3. **Decouple Value from Production:** Remind yourself that you have intrinsic value simply by existing, separate from your to-do list.`,
  },
  {
    id: "navigating-relationship-patterns",
    title: "Rewriting Recurring Arguments in Your Relationship",
    category: "Relationships",
    readTime: "7 min read",
    date: "July 10, 2026",
    excerpt:
      "Why couples find themselves fighting over the same small things over and over, and how to uncover the core emotional need beneath the surface conflict.",
    content: `If you and your partner find yourselves repeating the exact same argument—whether about dishes, schedules, or family—it's rarely about the topic itself. It is almost always about connection, appreciation, and safety.

### The Attack-Defend Cycle
In Gottman's research, perpetual conflicts account for nearly 69% of all relationship disagreements. When one partner feels unheard, they escalate (pursue), while the other feels overwhelmed and retreats (withdraws).

### How to Break the Loop
- **Name the Cycle, Not the Partner:** Instead of saying "You never listen," try "We are getting caught in our old pattern again."
- **Speak from Vulnerability:** Swap defensive statements for raw needs: "I feel lonely when we don't connect in the evenings" vs "You always ignore me."`,
  },
  {
    id: "quieting-the-anxious-mind",
    title: "Quieting the Anxious Mind: Beyond Positive Thinking",
    category: "Anxiety & Stress",
    readTime: "5 min read",
    date: "June 28, 2026",
    excerpt:
      "Telling an anxious mind to 'just relax' rarely works. Here is how Acceptance & Commitment Therapy (ACT) helps you unhook from catastrophic thoughts.",
    content: `When anxiety spikes, our instinct is often to fight the thoughts or force ourselves to feel calm. However, fighting anxious thoughts frequently amplifies their volume.

### Thought Defusion Technique
Rather than arguing with a catastrophic thought, practice "defusion"—noticing thoughts as passing words rather than absolute truths.

- **Formula:** Instead of thinking *"I am going to fail this presentation,"* reframe to *"I notice my mind is having the thought that I might fail."*
- **Somatic Anchoring:** Place one hand on your heart and feel the physical breath, anchoring yourself in the present room.`,
  },
  {
    id: "art-of-self-compassion",
    title: "The Art of Self-Compassion in Times of Transition",
    category: "Mindfulness",
    readTime: "6 min read",
    date: "June 14, 2026",
    excerpt:
      "Life transitions—career shifts, breakups, moves—challenge our identity. Discover why self-compassion is your most resilient anchor.",
    content: `Uncertainty is uncomfortable. During major life shifts, our internal critic often becomes loudest, demanding quick fixes or blaming us for feeling unsettled.

Kristin Neff identifies three core elements of self-compassion:
1. **Self-Kindness vs. Self-Judgment:** Treating yourself with the gentleness you would extend to a dear friend.
2. **Common Humanity vs. Isolation:** Recognizing that struggle is a shared human experience, not a personal flaw.
3. **Mindfulness vs. Over-Identification:** Holding pain in balanced awareness without being overwhelmed by it.`,
  },
];