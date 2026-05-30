To maintain this system when adding a new project in the future, follow these simple guidelines:

1. Adding the Project
In 

src/data/resume.tsx
, add your new project to the projects array and list its skills under technologies:

tsx
{
  title: "My New Project",
  description: "Project description...",
  technologies: [
    "Next.js",      // Will match Next.js icon
    "PostgreSQL",   // Will automatically map to Postgres icon
    "NewTech"       // If unmatched, renders as a text badge
  ],
  // ... other properties
}
2. How Skills Match (Automated)
Direct Match: If the technology name matches a skill's name in the global skills array in resume.tsx (case-insensitively, ignoring spaces/dashes), it will automatically resolve and render the icon.
Predefined Aliases: The getSkill helper in 

project-card.tsx
 automatically maps common variations so you don't have to worry about exact casing:
"tailwindcss" or "tailwind css" $\rightarrow$ Tailwind icon
"postgresql" or "postgres" $\rightarrow$ Postgres icon
"express.js" or "express" $\rightarrow$ Express icon
"react.js" or "react" $\rightarrow$ React icon
"node.js" or "node" $\rightarrow$ Node.js icon
"javascript" or "js" $\rightarrow$ Javascript icon
"typescript" or "ts" $\rightarrow$ Typescript icon
"golang" or "go" $\rightarrow$ Go icon
"openai" $\rightarrow$ Icons.openai icon
3. Adding a Completely New Icon
If your new project uses a skill that doesn't have an icon yet:

Option A (Recommended): Add the new skill name and its SVG component directly to the skills array in 

resume.tsx
 (e.g. { name: "NewTech", icon: NewTechIcon }). It will immediately start rendering on the project card.
Option B (As a fallback): Do nothing! If there's no matching icon, it will simply render as a clean text-only badge.
11:00 PM
