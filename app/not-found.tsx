import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-jp text-6xl font-bold text-sun-500">迷子</p>
      <h1 className="mt-4 text-3xl font-extrabold text-indigo-950">This page got lost</h1>
      <p className="mt-3 text-charcoal-700">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/batches" variant="outline">View batches</Button>
      </div>
    </section>
  );
}
