export const animationConfig = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },

  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },

  scroll: {
    throttle: 16, // ~60fps
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  },

  parallax: {
    slow: 0.3,
    medium: 0.5,
    fast: 0.8,
  },

  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
    },

    slideInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
    },

    slideInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
    },

    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: "easeOut" },
    },

    cardFlip: {
      initial: { opacity: 0, rotateY: -10, scale: 0.95 },
      animate: { opacity: 1, rotateY: 0, scale: 1 },
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  hover: {
    lift: {
      y: -5,
      transition: { duration: 0.3 },
    },

    scale: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },

    glow: {
      boxShadow: "0 0 20px rgba(var(--primary), 0.3)",
      transition: { duration: 0.3 },
    },
  },

  gradients: {
    primary:
      "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
    primarySoft:
      "linear-gradient(135deg, var(--primary)/10 0%, var(--secondary)/10 100%)",
    radial:
      "radial-gradient(circle at center, var(--primary)/20, var(--secondary)/20)",
    conic:
      "conic-gradient(from 180deg at 50% 50%, var(--primary), var(--secondary))",
  },

  blur: {
    sm: "blur(4px)",
    md: "blur(8px)",
    lg: "blur(16px)",
    xl: "blur(24px)",
    "2xl": "blur(40px)",
  },

  particles: {
    count: {
      desktop: 20,
      mobile: 10,
    },

    animation: {
      duration: [3, 4],
      delay: [0, 2],
    },
  },

  stagger: {
    children: 0.1,
    cards: 0.2,
    sections: 0.3,
  },

  microInteractions: {
    buttonPress: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },

    iconBounce: {
      y: [0, -5, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },

    textGlow: {
      textShadow: "0 0 10px rgba(var(--primary), 0.5)",
      transition: { duration: 0.3 },
    },
  },

  breakpoints: {
    mobile: "(max-width: 768px)",
    tablet: "(max-width: 1024px)",
    desktop: "(min-width: 1025px)",
  },

  accessibility: {
    reducedMotion: {
      duration: 0.01,
      scale: 1,
      opacity: 1,
    },
  },
};

export const getStaggerDelay = (index: number, baseDelay: number = 100) => {
  return `${index * baseDelay}ms`;
};

export const getAnimationClass = (animationType: string, delay: number = 0) => {
  const delayClass = delay > 0 ? `animation-delay-${delay}` : "";
  return `animate-${animationType} ${delayClass}`.trim();
};

export const createParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${3 + Math.random() * 1}s`,
  }));
};

export const colorConfig = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    600: "#2563eb",
    900: "#1e3a8a",
  },

  secondary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    500: "#06b6d4",
    600: "#0891b2",
    900: "#164e63",
  },

  accent: {
    purple: "#8b5cf6",
    pink: "#ec4899",
    orange: "#f59e0b",
    green: "#10b981",
  },
};

export default animationConfig;
