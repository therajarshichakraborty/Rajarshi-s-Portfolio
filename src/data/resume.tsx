import ReactMarkdown from "react-markdown";
import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Code } from "lucide-react";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import RajarshiImage from "../../public/RajarshiImage.jpg";
import { React } from "@/components/ui/svgs/react";
import { Postgres } from "@/components/ui/svgs/postgresql";
import { CPP } from "@/components/ui/svgs/c++";
import { Express } from "@/components/ui/svgs/express";
import { MongoDB } from "@/components/ui/svgs/mongodb";
import { NumPy } from "@/components/ui/svgs/numpy";
import { Pandas } from "@/components/ui/svgs/pandas";
import { SkLearn } from "@/components/ui/svgs/sk-learn";
import { Pytorch } from "@/components/ui/svgs/pytorch";
import { Tailwind } from "@/components/ui/svgs/tailwind";
import { Git } from "@/components/ui/svgs/git";
import { Prisma } from "@/components/ui/svgs/prisma";
import { JavaScript } from "@/components/ui/svgs/js";

export const DATA = {
  name: "Rajarshi Chakraborty",
  initials: "RC",
  url: "https://www.google.com/maps/place/sanfrancisco",
  location: "Kolkata , West Bengal , India",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: ` I am a 
  Full-Stack TypeScript Developer and Backend Engineer with a strong focus on building scalable, production-grade applications. `,
  summary: `**Hello :)** I’m **Rajarshi Chakraborty** - a **Computer Science** undergraduate at Techno Main Salt Lake (Class of 2027), passionate about building scalable **software and intelligent systems**. I’m a **Full-Stack TypeScript Developer** and **Backend Engineer** focused on creating production-grade applications with clean architecture, high performance, and strong system design.

Beyond traditional development, I’m deeply interested in **Generative & Agentic AI** and **Machine Learning**. I enjoy building **AI-powered systems** that leverage automation and real-world data to create meaningful impact, and I’m driven by continuous learning and solving complex problems through technology.`,

  avatarUrl: "RajarshiImage.jpg",
  skills: [
    { name: "React", icon: React },
    { name: "Tailwind", icon: Tailwind },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Javascript", icon: JavaScript },
    { name: "Typescript", icon: Typescript },
    { name: "Express", icon: Express },
    { name: "MongoDB", icon: MongoDB },
    { name: "Node.js", icon: Nodejs },
    { name: "Git", icon: Git },
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "Postgres", icon: Postgres },
    { name: "Prisma", icon: Prisma },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Java", icon: Java },
    { name: "NumPy", icon: NumPy },
    { name: "Pandas", icon: Pandas },
    { name: "Scikit Learn", icon: SkLearn },
    { name: "PyTorch", icon: Pytorch },
    { name: "C++", icon: CPP }
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "https://hashnode.com/@Rajarshi2005",
      icon: NotebookIcon,
      label: "Blog"
    },
    { href: "/projects", icon: Code, label: "Projects" }
  ],
  contact: {
    email: "rajarshi29032005@gmail.com",
    tel: "+91 8001950250",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/therajarshichakraborty",
        icon: Icons.github,
        navbar: true
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rajarshi-c-06a3402b7/",
        icon: Icons.linkedin,

        navbar: true
      },
      X: {
        name: "X",
        url: "https://x.com/IamRajarshi_Dev",
        icon: Icons.x,
        navbar: true
      },
      // Youtube: {
      //   name: "Youtube",
      //   url: "",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "https://mail.google.com/mail/?view=cm&fs=1&to=rajarshi29032005@gmail.com",
        icon: Icons.email,
        navbar: true
      }
    }
  },

  work: [
    {
      company: "Techno Main Salt Lake",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Undergrad Engineering Fellow",
      logoUrl: "/techno.jpg",
      start: "June 2023",
      end: "Present",
      description: `
Actively exploring and mastering new skills and emerging technologies in the dynamic field of Computer Science and Engineering.

As a STEM major in Computer Science, I am an aspiring Software Developer with a strong enthusiasm for **Artificial Intelligence** and **Data Science**.

I thrive on continuous learning, innovation, and practical application to solve real-world challenges.
`
    },
    {
      company: "Shopify",
      badges: [],
      href: "https://shopify.com",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/shopify.svg",
      start: "January 2021",
      end: "April 2021",
      description:
        "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes."
    },
    {
      company: "Nvidia",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/nvidia.png",
      start: "January 2020",
      end: "April 2020",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python."
    },
    {
      company: "Splunk",
      href: "https://splunk.com",
      badges: [],
      location: "San Jose, CA",
      title: "Software Engineer",
      logoUrl: "/splunk.svg",
      start: "January 2019",
      end: "April 2019",
      description:
        "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput."
    },
    {
      company: "Lime",
      href: "https://li.me/",
      badges: [],
      location: "San Francisco, CA",
      title: "Software Engineer",
      logoUrl: "/lime.svg",
      start: "January 2018",
      end: "April 2018",
      description:
        "Proposed and implemented an internal ruby API for sending/receiving commands to scooters over LTE networks. Developed a fully automated bike firmware update system to handle asynchronous firmware updates of over 100,000+ scooters worldwide, and provide progress reports in real-time using React, Ruby on Rails, PostgreSQL and AWS EC2 saving hundreds of developer hours."
    },
    {
      company: "Mitre Media",
      href: "https://mitremedia.com/",
      badges: [],
      location: "Toronto, ON",
      title: "Software Engineer",
      logoUrl: "/mitremedia.png",
      start: "May 2017",
      end: "August 2017",
      description:
        "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener"
    }
  ],
  education: [
    {
      school: "Techno Main Salt Lake",
      title: "Undergrad Engineering Fellow",
      href: "https://www.ticollege.ac.in/",
      degree: "B.Tech in Computer Science and Engineering",
      logoUrl: "/techno.jpg",
      start: " June 2023",
      end: "Present",
      description: `Grade: GPA - 8.01/10 (Academic Progress till Semester 5th)

Actively exploring and mastering new skills and emerging technologies in the dynamic field of Computer Science and Engineering. As a STEM major in Computer Science, I am an aspiring Software Developer with a strong enthusiasm for AI and Machine Learning. I thrive on continuous learning, innovation, and practical application to solve real-world challenges.

Undergrad Coursework :
BEE101/BEE191: Basic Electrical Engineering
BSM101: Engineering Mathematics IA
BSM201: Engineering Mathematics IIA
ESCS301: Analog & Digital Electronics
PCCCS301: Data Structures & Algorithms
PCCCS302: Computer Organization
BSCICB301: Linear Algebra
PCCCS401: Discrete Mathematics
PCCICB401: Data Communication & Networks
PCCCS403: Formal Language & Automata Theory 
PCCCS404: Design & Analysis of Algorithms
PCCCS502: Operating Systems
PCCCS503: Object Oriented Programming 
PCCICB501: IoT Application & Design 
PCCICB502: Wireless Sensor Networks
PECICB501-B: Internet Technology
PCCICB601: Cryptography & Network Security 
PCCCS601: Database Management System 
PCCCS602: Ethical Hacking 
PECICB601-D: Software Engineering 
OECICB601-A: Human Resource Development & Organizational Behavior`
    },
    // {
    //   school: "University of Waterloo",
    //   href: "https://uwaterloo.ca",
    //   degree: "Bachelor's Degree of Computer Science (BCS)",
    //   logoUrl: "/waterloo.png",
    //   start: "2016",
    //   end: "2021",
    // },
    // {
    //   school: "Wilfrid Laurier University",
    //   href: "https://wlu.ca",
    //   degree: "Bachelor's Degree of Business Administration (BBA)",
    //   logoUrl: "/laurier.png",
    //   start: "2016",
    //   end: "2021",
    // },
    {
      school: "West Bengal Council of Higher Secondary Education",
      href: "https://wbchse.wb.gov.in/",
      title: "High School Education",
      degree: "High Schooling",
      logoUrl: "/West_Bengal_Council_of_Higher_Secondary_Education_Logo.png",
      start: "April 2020",
      end: "Mar 2023",
      description: `Grade: A+ | Scored Overall 81.2 % Marks in +2 Examination

Activities and societies: Cricket Team
Completed XII from WBCHSE (West Bengal Council of Higher Secondary Education).

Demonstrated excellence both in academics and extracurricular pursuits. Served as the Captain of the School Cricket Team, leading the team to several inter-school tournaments while nurturing team spirit, leadership, and strategic decision-making. Acknowledged as a dedicated and consistent school-level cricket player.

These experiences collectively strengthened my leadership, organizational, and collaborative capabilities, enabling me to balance academic rigor with active participation in co-curricular forums.

Coursework:
Bengali
English
Physics
Chemistry
Mathematics
Biology`
    }
  ],
  projects: [
    {
      title: "ZenithCLI",
      href: "",
      dates: "May 2026 - Present",
      active: true,
      isBuilding: true,
      description: `ZenithCLI is an AI-powered developer-focused command-line platform inspired by modern AI coding assistants like Claude Code. It enables developers to interact with intelligent coding workflows directly from the terminal, offering features such as AI-assisted code generation, project scaffolding, authentication management, workflow automation, debugging support, and developer productivity optimization.
`,
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Commander.js",
        "Shadcn UI",
        "Better-auth",
        "OpenAI",
        "Express.js"
      ],
      links: [
        {
          type: "Website",
          href: "",
          icon: <Icons.globe className="size-3" />
        },
        {
          type: "Source",
          href: "https://github.com/therajarshichakraborty/Zenith-CLI",
          icon: <Icons.github className="size-3" />
        }
      ],
      image: "/background/zenith-cli.png"
      // video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "Synapse UI",
      href: "https://synapse-ui-dev.vercel.app/",
      dates: "Jan 2026 - May 2026",
      active: true,
      description:
        "Synapse UI is a modern React UI library built with Next.js, TypeScript, and FumaDocs, designed to help developers build beautiful, production-ready applications faster. It offers reusable components with both copy-paste support and seamless CLI installation through Shadcn CLI for a flexible developer experience. Built with a strong focus on developer productivity, accessibility, scalability, and elegant design systems for modern web applications.",
      technologies: [
        "Next.js",
        "Typescript",
        "FumaDocs",
        "React",
        "TailwindCSS",
        "Node.js",
        "Shadcn UI",
        "Magic UI"
      ],
      links: [
        {
          type: "Website",
          href: "https://synapse-ui-dev.vercel.app/",
          icon: <Icons.globe className="size-3" />
        },
        {
          type: "Source",
          href: "https://github.com/therajarshichakraborty/Synapse-UI",
          icon: <Icons.github className="size-3" />
        }
      ],
      image: "/background/synapseui.png",
      video: ""
      // "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "SocketPoll",
      href: "https://socket-poll.vercel.app/",
      dates: "Mar 2026 - Mar 2026",
      active: true,
      description: `SocketPoll is a real-time audience engagement and decision intelligence platform engineered for instant interactive experiences at scale. Built with a modern full-stack architecture using React, Express.js, WebSockets, PostgreSQL, and Drizzle ORM, the platform enables ultra-low latency communication, live state synchronization, and seamless multi-user participation in dynamic voting sessions.`,
      technologies: [
        "React.js",
        "Typescript",
        "PostgreSQL",
        "Drizzle",
        "TailwindCSS",
        "Vite",
        "Shadcn UI",
        "WebSocket",
        "Express.js"
      ],
      links: [
        {
          type: "Website",
          href: "https://socket-poll.vercel.app/",
          icon: <Icons.globe className="size-3" />
        },
        {
          type: "Source",
          href: "https://github.com/therajarshichakraborty/SocketPoll",
          icon: <Icons.github className="size-3" />
        }
      ],
      image: "/background/socketpoll.png"
      // video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "LinkedUp",
      href: "https://linkedup-xyz.streamlit.app/",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Built an AI-powered LinkedIn content generation platform using Streamlit, LangChain, and Groq LLMs, enabling intelligent post creation through scalable prompt pipelines, real-time AI inference, and interactive user workflows. Integrated dynamic content personalization, context-aware generation, and responsive UI features to enhance user engagement and content quality.",
      technologies: [
        "LangChain",
        "Python",
        "Pydantyc",
        "Groq API",
        "Streamlit",
        "AI Integration"
      ],
      links: [
        {
          type: "Website",
          href: "https://linkedup-xyz.streamlit.app/",
          icon: <Icons.globe className="size-3" />
        },
        {
          type: "Source",
          href: "https://github.com/therajarshichakraborty/LinkedUp",
          icon: <Icons.github className="size-3" />
        }
      ],
      image: "/background/linkedup.png"
      //video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Mini-TailwindCSS",
      href: "https://mini-tailwindcss.netlify.app/",
      dates: "Feb 2026 - Feb 2026",
      active: true,
      description:
        "Built a lightweight Tailwind-inspired CSS utility engine using vanilla JavaScript and DOM manipulation that dynamically converts custom utility classes into real-time browser styling without external frameworks or build pipelines, enabling rapid UI prototyping, runtime style generation, and optimized developer-centric frontend workflows.Implemented a modular utility parsing architecture with extensible class mapping and responsive styling support.",
      technologies: [
        "JavaScript",
        "Typescript",
        "Express.js",
        "DOM Manipulation",
        "TailwindCSS",
        "React",
        "NPM"
      ],
      links: [
        {
          type: "Website",
          href: "https://mini-tailwindcss.netlify.app/",
          icon: <Icons.globe className="size-3" />
        },
        {
          type: "Source",
          href: "https://github.com/therajarshichakraborty/Mini-TailwindCSS",
          icon: <Icons.github className="size-3" />
        }
      ],
      image: "/background/mini-tailwind.png"
      //video:
      //  "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    }
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: []
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2018",
      location: "Waterloo, Ontario",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: []
    },
    {
      title: "FirstNet Public Safety Hackathon",
      dates: "March 23rd - 24th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: []
    },
    {
      title: "DeveloperWeek Hackathon",
      dates: "February 3rd - 4th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cryptotrends/cryptotrends"
        }
      ]
    },
    {
      title: "HackDavis",
      dates: "January 20th - 21st, 2018",
      location: "Davis, California",
      description:
        "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
      win: "Best Data Hack",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/my6footprint"
        },
        {
          title: "ML",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/my6footprint-machine-learning"
        },
        {
          title: "iOS",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/CarbonWallet"
        },
        {
          title: "Server",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/wallet6-server"
        }
      ]
    },
    {
      title: "ETH Waterloo",
      dates: "October 13th - 15th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
      links: [
        {
          title: "Organization",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ethdocnet"
        }
      ]
    },
    {
      title: "Hack The North",
      dates: "September 15th - 17th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a virtual reality application allowing users to see themselves in third person.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Streamer Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/htn2017"
        },
        {
          title: "Client Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/RTSPClient"
        }
      ]
    },
    {
      title: "Hack The 6ix",
      dates: "August 26th - 27th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ShareShip/ShareShip"
        },
        {
          title: "Site",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://share-ship.herokuapp.com/"
        }
      ]
    },
    {
      title: "Stupid Hack Toronto",
      dates: "July 23rd, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/nsagirlfriend/nsagirlfriend"
        }
      ]
    },
    {
      title: "Global AI Hackathon - Toronto",
      dates: "June 23rd - 25th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/"
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/TinySamosas/"
        }
      ]
    },
    {
      title: "McGill AI for Social Innovation Hackathon",
      dates: "June 17th - 18th, 2017",
      location: "Montreal, Quebec",
      description:
        "Developed realtime facial microexpression analyzer using AI",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
      links: []
    },
    {
      title: "Open Source Circular Economy Days Hackathon",
      dates: "June 10th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/genecis"
        }
      ]
    },
    {
      title: "Make School's Student App Competition 2017",
      dates: "May 19th - 21st, 2017",
      location: "International",
      description: "Improved PocketDoc and submitted to online competition",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
      win: "Top 10 Finalist | Honourable Mention",
      links: [
        {
          title: "Medium Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a"
        },
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native"
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68"
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native"
        }
      ]
    },
    {
      title: "HackMining",
      dates: "May 12th - 14th, 2017",
      location: "Toronto, Ontario",
      description: "Developed neural network to optimize a mining process",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
      links: []
    },
    {
      title: "Waterloo Equithon",
      dates: "May 5th - 7th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native"
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68"
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native"
        }
      ]
    },
    {
      title: "SpaceApps Waterloo",
      dates: "April 28th - 30th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/earthwatch"
        }
      ]
    },
    {
      title: "MHacks 9",
      dates: "March 24th - 26th, 2017",
      location: "Ann Arbor, Michigan",
      description:
        "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/threejs-planes"
        }
      ]
    },
    {
      title: "StartHacks I",
      dates: "March 4th - 5th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
      win: "1st Place Winner",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-ionic"
        },
        {
          title: "Source (Server)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-rails"
        }
      ]
    },
    {
      title: "QHacks II",
      dates: "February 3rd - 5th, 2017",
      location: "Kingston, Ontario",
      description:
        "Developed a mobile game which enables city-wide manhunt with random lobbies",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/human-huntr-react-native"
        },
        {
          title: "Source (API)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/human-huntr-rails"
        }
      ]
    },
    {
      title: "Terrible Hacks V",
      dates: "November 26th, 2016",
      location: "Waterloo, Ontario",
      description:
        "Developed a mock of Windows 11 with interesting notifications and functionality",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11"
        }
      ]
    },
    {
      title: "Portal Hackathon",
      dates: "October 29, 2016",
      location: "Kingston, Ontario",
      description:
        "Developed an internal widget for uploading assignments using Waterloo's portal app",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/UWPortalSDK/crowmark"
        }
      ]
    }
  ]
} as const;
