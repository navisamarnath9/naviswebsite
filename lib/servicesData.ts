export interface WhyReason {
  title: string;
  description: string;
  image: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface ModalityItem {
  name: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  name: string;
  badge: string;
  heroHeadline: string;
  heroIntro: string;
  image: string;
  whyTitle: string;
  whySubheading: string;
  whyReasons: WhyReason[];
  benefitsTitle: string;
  benefitsItems: BenefitItem[];
  modalitiesTitle: string;
  modalitiesIntro?: string;
  modalitiesItems: ModalityItem[];
  ctaHeadline: string;
  ctaButtonText: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "individual",
    number: "01",
    name: "Individual Therapy",
    badge: "Most Popular",
    heroHeadline: "Unlock Your Potential: Transformative Therapy Awaits",
    heroIntro:
      "Are you feeling overwhelmed, stuck, or searching for clarity? Life’s challenges—whether emotional, relational, or situational—can sometimes leave us feeling lost and unsure of the next step. Therapy offers a safe and supportive space where you can explore your emotions, heal from past wounds, and gain the tools you need to move forward. It’s a journey toward self-discovery and personal growth, where you’ll uncover insights, develop resilience, and unlock your full potential.",
    image: "/service-individual.png",
    whyTitle: "Why Therapy?",
    whySubheading:
      "Therapy can provide valuable support across many aspects of life. Here are a few reasons to consider therapy:",
    whyReasons: [
      {
        title: "Emotional Relief",
        description:
          "Alleviate anxiety, depression, and overwhelming stress by addressing root causes.",
        image: "/service-individual.png",
      },
      {
        title: "Conflict Resolution",
        description:
          "Resolve relationship issues and improve communication with those around you.",
        image: "/service-couples.png",
      },
      {
        title: "Healing Trauma",
        description:
          "Process and heal from past emotional wounds or trauma in a supportive space.",
        image: "/therapy-conversation.jpg",
      },
      {
        title: "Life Transitions",
        description:
          "Navigate major changes, such as career shifts or personal loss, with clarity and confidence.",
        image: "/service-coaching.png",
      },
      {
        title: "Behavioral Insight",
        description:
          "Gain understanding of recurring emotional patterns and behaviors that may hold you back.",
        image: "/therapy-conversation.jpg",
      },
      {
        title: "Personal Growth",
        description:
          "Foster a sense of purpose and development, creating a more meaningful life.",
        image: "/service-groups.png",
      },
    ],
    benefitsTitle: "Benefits of Therapy",
    benefitsItems: [
      {
        title: "Emotional Balance",
        description:
          "Improve emotional regulation and gain mental clarity to handle life’s challenges.",
      },
      {
        title: "Healthier Relationships",
        description:
          "Build stronger, more fulfilling connections through improved communication and understanding.",
      },
      {
        title: "Self-Awareness",
        description:
          "Discover deeper insights into your emotions, thoughts, and behaviors to better understand yourself.",
      },
      {
        title: "Stress Management",
        description:
          "Learn practical strategies to reduce stress and prevent burnout in daily life.",
      },
      {
        title: "Resilience",
        description:
          "Strengthen your ability to bounce back from adversity and cope with life’s obstacles.",
      },
      {
        title: "Inner Fulfillment",
        description:
          "Cultivate a lasting sense of peace, contentment, and personal satisfaction.",
      },
    ],
    modalitiesTitle: "Therapeutic Modalities",
    modalitiesIntro:
      "At Navisamarnath, therapy is built on a Person-Centered approach, which ensures that your individual needs are at the heart of each session. This foundational method is complemented by other evidence-based modalities, such as:",
    modalitiesItems: [
      {
        name: "Cognitive Behavioral Therapy (CBT)",
        description:
          "CBT focuses on identifying and changing negative thought patterns and behaviors, helping clients develop healthier perspectives and coping strategies.",
      },
      {
        name: "Dialectical Behavior Therapy (DBT)",
        description:
          "DBT combines cognitive-behavioral techniques with mindfulness practices to help clients manage intense emotions and improve relationships.",
      },
      {
        name: "Trauma-Informed Care",
        description:
          "Trauma-informed acknowledges the impact of trauma, focusing on safety, trust, and empowerment to help clients process their experiences and build resilience.",
      },
      {
        name: "Psychodynamics & Psychoanalysis",
        description:
          "This approach explores how unconscious processes and past experiences shape thoughts and behaviors, fostering deeper self-awareness and emotional growth.",
      },
    ],
    ctaHeadline: "Take the next step toward your healing journey today",
    ctaButtonText: "Book a free consultation",
  },
  {
    id: "couples",
    number: "02",
    name: "Couples Therapy",
    badge: "Relational",
    heroHeadline: "Strengthen Your Bond: Transformative Couples Therapy Awaits",
    heroIntro:
      "Are you and your partner feeling disconnected, facing recurring conflicts, or struggling to navigate life’s challenges together? Relationships require effort, understanding, and growth, yet it can be hard to find clarity amidst the challenges. Couples therapy offers a supportive and nonjudgmental space where you can rebuild trust, improve communication, and foster deeper connection. It’s a journey toward a stronger, healthier partnership.",
    image: "/service-couples.png",
    whyTitle: "Why Couples Therapy?",
    whySubheading:
      "Couples therapy can support your relationship in meaningful ways. Here are some reasons to consider it:",
    whyReasons: [
      {
        title: "Enhanced Communication",
        description:
          "Break down barriers and learn to express thoughts and feelings effectively.",
        image: "/service-couples.png",
      },
      {
        title: "Conflict Resolution",
        description:
          "Address recurring arguments and resolve underlying issues with empathy and understanding.",
        image: "/therapy-conversation.jpg",
      },
      {
        title: "Rebuilding Trust",
        description:
          "Work through breaches of trust and rebuild emotional safety in the relationship.",
        image: "/therapy-conversation.jpg",
      },
      {
        title: "Strengthening Connection",
        description:
          "Rekindle emotional intimacy and rediscover the joy in your partnership.",
        image: "/service-individual.png",
      },
      {
        title: "Life Transitions",
        description:
          "Navigate major changes, such as marriage, parenting, or relocation, with shared clarity and confidence.",
        image: "/service-coaching.png",
      },
      {
        title: "Shared Growth",
        description:
          "Explore individual and shared goals to build a fulfilling life together.",
        image: "/service-groups.png",
      },
    ],
    benefitsTitle: "Benefits of Couples Therapy",
    benefitsItems: [
      {
        title: "Stronger Communication",
        description:
          "Develop the skills to listen and speak with clarity, fostering mutual understanding.",
      },
      {
        title: "Deeper Emotional Intimacy",
        description:
          "Reconnect and nurture a bond rooted in trust and shared vulnerability.",
      },
      {
        title: "Effective Problem-Solving",
        description:
          "Work collaboratively to tackle challenges and prevent conflicts from escalating.",
      },
      {
        title: "Resilience as a Team",
        description:
          "Strengthen your ability to weather life’s ups and downs together with confidence and unity.",
      },
      {
        title: "A Renewed Partnership",
        description:
          "Build a healthier, more fulfilling relationship based on respect and shared goals.",
      },
      {
        title: "Increased Understanding",
        description:
          "Gain insights into each other’s needs, values, and perspectives to create lasting harmony.",
      },
    ],
    modalitiesTitle: "Approach to Couples Therapy",
    modalitiesIntro:
      "Couples therapy at Navisamarnath is tailored to meet the unique needs of your relationship. Rooted in evidence-based practices, it focuses on creating a supportive environment for both partners. Therapeutic methods include:",
    modalitiesItems: [
      {
        name: "Emotionally Focused Therapy (EFT)",
        description:
          "Focuses on improving emotional bonds by helping partners recognize and respond to each other’s needs. This approach fosters greater intimacy and builds a secure foundation for lasting connection.",
      },
      {
        name: "Imago Relationship Therapy",
        description:
          "Helps couples understand and transform conflict into opportunities for growth. By exploring the unconscious dynamics of your relationship, it promotes healing and deeper empathy.",
      },
      {
        name: "Gottman Method Couples Therapy",
        description:
          "Based on decades of research, this method provides practical tools to enhance intimacy, manage conflict effectively, and create shared meaning in your relationship with a more resilient connection.",
      },
      {
        name: "Integrative Behavioral Couple Therapy (IBCT)",
        description:
          "Combines acceptance and change strategies to address relationship struggles. It encourages open communication, fosters greater emotional understanding, with more stronger and flexible partnerships.",
      },
    ],
    ctaHeadline: "Take the next step toward your healing journey today",
    ctaButtonText: "Book a free consultation",
  },
  {
    id: "coaching",
    number: "03",
    name: "Personal & Executive Coaching",
    badge: "Goal-Oriented",
    heroHeadline: "Unlock Your Potential: Transformative Coaching Awaits",
    heroIntro:
      "Are you ready to take charge of your life and reach new heights? Personalized coaching services are designed to empower individuals to achieve their personal and professional aspirations. Coaching is a collaborative process that helps clarify goals, identify obstacles, and create actionable strategies for success.",
    image: "/service-coaching.png",
    whyTitle: "Why Coaching?",
    whySubheading:
      "Coaching is an effective approach for individuals looking to enhance their lives and reach their full potential. Common issues addressed through coaching include:",
    whyReasons: [
      {
        title: "Career Transitions",
        description:
          "Navigating job changes, promotions, or career shifts with clarity and confidence.",
        image: "/service-coaching.png",
      },
      {
        title: "Goal Setting",
        description:
          "Defining clear, achievable goals and creating a roadmap to attain them.",
        image: "/service-groups.png",
      },
      {
        title: "Time Management",
        description:
          "Developing strategies to optimize productivity and balanced life.",
        image: "/service-individual.png",
      },
      {
        title: "Stress and Burnout",
        description:
          "Identifying stressors and implementing techniques to increase resilience.",
        image: "/therapy-conversation.jpg",
      },
      {
        title: "Personal Growth",
        description:
          "Enhancing self-awareness, confidence, and emotional intelligence.",
        image: "/about-navisamarnath.jpg",
      },
      {
        title: "Relationship Building",
        description:
          "Building healthier interpersonal relationships.",
        image: "/service-couples.png",
      },
    ],
    benefitsTitle: "Benefits of Coaching",
    benefitsItems: [
      {
        title: "Improved Decision Making",
        description:
          "Learn techniques to evaluate options more effectively and make informed choices.",
      },
      {
        title: "Clarity and Focus",
        description:
          "Gain a clearer understanding of goals and aspirations, allowing for focused efforts.",
      },
      {
        title: "Enhanced Performance",
        description:
          "Develop skills and strategies that improve performance in both personal and professional realms.",
      },
      {
        title: "Life Balance",
        description:
          "Achieve a healthier balance between personal and professional responsibilities.",
      },
      {
        title: "Improved Confidence",
        description:
          "Build self-assurance in your abilities, achieve milestones boosting confidence and self-efficacy.",
      },
      {
        title: "Resilience to Setbacks",
        description:
          "Develop strategies to bounce back from challenges with a growth mindset.",
      },
    ],
    modalitiesTitle: "Types of Coaching Offered",
    modalitiesItems: [
      {
        name: "Life Coaching",
        description:
          "Focus on personal development, goal setting, and overcoming obstacles to create a fulfilling and balanced life fostering resilience.",
      },
      {
        name: "Executive Coaching",
        description:
          "Designed for professionals seeking to enhance leadership skills, improve team dynamics, and achieve career advancement.",
      },
      {
        name: "OD Coaching",
        description:
          "Designed to help teams and organizations improve efficiency, foster collaboration, and achieve strategic goals.",
      },
      {
        name: "NLP Coaching",
        description:
          "Utilizes NLP techniques to change patterns of behavior and thought, empowering individuals to achieve desired outcomes.",
      },
    ],
    ctaHeadline: "Take the First Step Toward Lasting Change",
    ctaButtonText: "Book a free consultation",
  },
  {
    id: "groups",
    number: "04",
    name: "Group Sessions",
    badge: "Community",
    heroHeadline:
      "Unlock the Power of Connection: Healing Together in a Supportive Community",
    heroIntro:
      "Looking to explore your thoughts and feelings in a supportive group setting? Group sessions provide a unique opportunity for individuals to come together and share their experiences in a safe, supportive environment. Facilitated by a trained professional, these sessions foster a sense of belonging and community, enabling participants to connect with others who may be facing similar challenges.",
    image: "/service-groups.png",
    whyTitle: "Why Join Group Sessions?",
    whySubheading:
      "Participating in group therapy offers numerous advantages, including:",
    whyReasons: [
      {
        title: "Shared Experiences",
        description:
          "Engage with others facing similar struggles, fostering a sense of connection and understanding.",
        image: "/service-groups.png",
      },
      {
        title: "Emotional Support",
        description:
          "Benefit from the encouragement and empathy of fellow participants, helping to reduce feelings of isolation.",
        image: "/therapy-conversation.jpg",
      },
      {
        title: "Diverse Perspectives",
        description:
          "Gain insights from different viewpoints, broadening your understanding of personal challenges and solutions.",
        image: "/service-individual.png",
      },
      {
        title: "Skill Development",
        description:
          "Learn new coping strategies and interpersonal skills that can be applied to everyday life.",
        image: "/service-coaching.png",
      },
      {
        title: "Facilitated Guidance",
        description:
          "Receive professional support to navigate group dynamics and ensure a productive environment.",
        image: "/therapy-conversation.jpg",
      },
      {
        title: "Empowerment",
        description:
          "Experience a sense of strength and motivation through collective discussions and shared goals.",
        image: "/service-couples.png",
      },
    ],
    benefitsTitle: "Benefits of Group Sessions",
    benefitsItems: [
      {
        title: "Increased Self-Awareness",
        description:
          "Discover patterns in thoughts and behaviors through group discussions and feedback.",
      },
      {
        title: "Enhanced Coping Skills",
        description:
          "Learn effective strategies for managing stress, anxiety, and other mental health concerns.",
      },
      {
        title: "Improved Communication",
        description:
          "Develop better interpersonal skills by practicing communication in a safe setting.",
      },
      {
        title: "Stronger Resilience",
        description:
          "Build emotional strength by sharing experiences and learning from others’ journeys.",
      },
      {
        title: "Sense of Belonging",
        description:
          "Experience the comfort of being part of a community that understands and supports your journey.",
      },
      {
        title: "Empowerment",
        description:
          "Gain confidence by actively participating in your healing process alongside others.",
      },
    ],
    modalitiesTitle: "Topics Covered in Group Sessions",
    modalitiesIntro:
      "Group sessions encompass a diverse array of topics, allowing participants to explore various aspects of their lives and mental health. These discussions provide a supportive platform for addressing personal challenges and fostering growth. Participants can engage with themes such as:",
    modalitiesItems: [
      {
        name: "Healing the Inner Child",
        description:
          "Explore past experiences to understand their impact on present behaviors and emotions, fostering healing and self-acceptance.",
      },
      {
        name: "Relationships",
        description:
          "Discuss relationship dynamics, improve communication skills, and learn to establish healthier connections with others.",
      },
      {
        name: "Self Discovery",
        description:
          "Engage in self-exploration activities that promote greater awareness of personal values, desires, and aspirations.",
      },
      {
        name: "Coping Mechanisms",
        description:
          "Address challenges such as anxiety, depression, and stress, learning effective coping mechanisms and support strategies.",
      },
    ],
    ctaHeadline:
      "Join a supportive community and embark on your healing journey",
    ctaButtonText: "Begin Your Journey",
  },
];

export function getServiceById(id: string): ServiceDetail | undefined {
  return servicesData.find((service) => service.id === id);
}
