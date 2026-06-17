export const CONFIG = {
  names: {
    hers: "Momo",
    yours: "Fusco",
  },
  quiz: [
    {
      question: "Where was our very first date?",
      options: ["The cozy cafe on the corner", "The beach boardwalk", "The cinema rooftop", "The botanical garden"],
      correctIndex: 0,
      hint: "Think about where we smelled fresh cinnamon rolls..."
    },
    {
      question: "What is my absolute favorite thing about you?",
      options: ["Your contagious laughter", "Your gorgeous eyes", "Your beautiful kind heart", "All of the above, obviously!"],
      correctIndex: 3,
      hint: "It's not just one thing..."
    },
    {
      question: "Which of these is our secret code word?",
      options: ["Marshmallow", "Starry Night", "Bubblegum", "Honeybee"],
      correctIndex: 0,
      hint: "It is sweet and squishy..."
    }
  ],
  memories: [
    {
      label: "THE BEGINNING",
      date: "October 2023",
      title: "Where It All Started",
      story: "It was a crisp Tuesday evening when our worlds collided. Looking back, I can't help but smile at how nervous I was, and how effortlessly you made everything feel.",
      imageUrl: "/textures/memory_1.jpg",
      sceneTheme: "night" as const
    },
    {
      label: "OUR FIRST DATE",
      date: "November 2023",
      title: "Cinnamon & Sparks",
      story: "Sitting across from you under the dim yellow patio lights, listening to you laugh. That was the exact moment I realized my life was about to change forever.",
      imageUrl: "/textures/memory_2.jpg",
      sceneTheme: "goldenHour" as const
    },
    {
      label: "THE MOMENT I KNEW",
      date: "December 2023",
      title: "No Doubts, Just Love",
      story: "The rain was pouring outside, but inside we were warm, listening to music. You looked up and smiled, and all the noise in the world just faded to silence.",
      imageUrl: "/textures/memory_3.jpg",
      sceneTheme: "blush" as const
    },
    {
      label: "THROUGH EVERYTHING",
      date: "March 2024",
      title: "Weathering Storms",
      story: "Life hasn't always been sunny, but holding your hand through the stormy moments proved that we can weather absolutely anything together.",
      imageUrl: "/textures/memory_4.jpg",
      sceneTheme: "storm" as const
    },
    {
      label: "TODAY",
      date: "June 2026",
      title: "Our Beautiful Now",
      story: "Two years of laughter, growth, and unconditional support. I cherish every single second of our journey, and I would choose you again in a heartbeat.",
      imageUrl: "/textures/memory_5.jpg",
      sceneTheme: "celebration" as const
    }
  ],
  letter: {
    body: "Dear Momo,\n\nHappy Anniversary, my love! Creating this experience was my way of letting you walk through our history. Every star in this sky represents a moment you made me smile. I love you more than words can express, and I look forward to making a lifetime of memories by your side.\n\nWith love, always,\nFusco",
    songUrl: "/audio/Savy_Henry_-_The_Best_Part_Vistanaij.com_.ng_.mp3"
  }
};
