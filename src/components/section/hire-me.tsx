import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function HireMeSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      {/* Top Badge */}
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium dark:bg-gradient-to-r dark:from-blue-500 dark:via-indigo-500 dark:to-pink-500
  dark:bg-clip-text dark:text-transparent">Hire Me</span>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={10}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-5 text-center">
        <h2 className="
  text-3xl font-bold tracking-tighter sm:text-5xl
  dark:bg-gradient-to-r dark:from-blue-500 dark:via-indigo-500 dark:to-pink-500
  dark:bg-clip-text dark:text-transparent
">
          Let’s Build Something Impactful
        </h2>

        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          I’m open to internships, freelance work, and collaboration
          opportunities. If you’re looking for someone who can turn ideas into
          real, scalable products,.
        </p>

        <p className="mx-auto max-w-lg text-muted-foreground ">
          I’m just one message away - feel free to DM/CALL me anytime on{" "}
          <Link
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent font-medium hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            with a direct question on x.com / LinkedIn / Email
          </Link>{" "}
          and I&apos;ll respond whenever I can.
        </p>
      </div>
    </div>
  );
}
