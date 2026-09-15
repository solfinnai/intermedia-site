import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.16em] uppercase",
        className
      )}
    >
      <i className="inline-block size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {children}
    </span>
  );
}

export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center gap-3 text-[15px] font-semibold underline-offset-4 transition-colors hover:underline",
    className
  );
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowUpRight className="size-4" aria-hidden />
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className,
  variant = "light",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "navy" | "ghost";
}) {
  const variants = {
    light: "bg-white text-[#10141d] hover:bg-[#e8eef5]",
    dark: "bg-[#10141d] text-white hover:bg-[#002d72]",
    navy: "bg-[#002d72] text-white hover:bg-[#164785]",
    ghost: "bg-white/10 text-white border border-white/70 hover:bg-white/20",
  };
  const classes = cn(
    "inline-flex min-h-13 items-center justify-center gap-8 rounded-[5px] px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5",
    variants[variant],
    className
  );
  const arrow = <ArrowUpRight className="size-5" aria-hidden />;
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}

export function PageHero({
  crumb,
  eyebrow,
  title,
  description,
  action,
}: {
  crumb: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="px-[var(--pad)] pt-16 pb-14 md:pt-20 md:pb-16">
      <p className="mb-10 flex gap-3 text-xs text-[#636a77]">
        <Link href="/" className="hover:text-[#002d72]">
          Home
        </Link>
        <span>/</span>
        <span>{crumb}</span>
      </p>
      <Eyebrow className="text-[#002d72]">{eyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-5xl font-heading text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[1.05] tracking-[-0.065em] text-[#10141d]">
        {title}
      </h1>
      {description ? (
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#636a77] md:text-[22px]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </section>
  );
}

export function CtaBand({
  title = "Let’s put TV to work for your brand.",
  body = "Tell us where you want to grow. We’ll help you build the media strategy to get there.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-[#002d72] px-[var(--pad)] py-20 text-white md:py-24">
      <Eyebrow className="text-[#c9d8ff]">Discuss your media strategy</Eyebrow>
      <h2 className="mt-6 max-w-4xl font-heading text-[clamp(2.6rem,6vw,6.4rem)] leading-[1.05] tracking-[-0.065em]">
        {title}
      </h2>
      <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <p className="max-w-md text-[#d7e2ff]">{body}</p>
        <ArrowLink href="/contact" variant="light">
          Start a conversation
        </ArrowLink>
      </div>
    </section>
  );
}

export function SectionIndex({
  left,
  right,
  className,
}: {
  left: string;
  right: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex justify-between gap-6 text-[12px] tracking-[0.12em]",
        className
      )}
    >
      <span className="font-semibold">{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function ProcessList({
  steps,
}: {
  steps: readonly { title: string; body: string }[];
}) {
  return (
    <ol className="divide-y divide-[#d9dce3] border-t border-[#d9dce3]">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="grid grid-cols-[48px_1fr] gap-4 py-8 md:grid-cols-[70px_1fr_1fr] md:gap-8"
        >
          <span className="text-[13px] font-semibold text-[#002d72]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-heading text-2xl tracking-[-0.04em] md:text-[29px]">{step.title}</h3>
          <p className="col-start-2 max-w-lg text-[#636a77] md:col-start-3">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Pad({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-[var(--pad)]", className)} {...props} />;
}
