import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import type { Batch } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { EnrolOrWaitlist, LiveSeats } from "@/components/live/LiveSeats";

export function BatchCard({ batch }: { batch: Batch }) {
  return (
    <article className="flex h-full flex-col card-modern overflow-hidden">
      <div className="flex items-center justify-between gap-2 bg-indigo-950 px-5 py-2.5 text-xs font-bold text-white">
        <span>{batch.level === "All Levels" ? "ALL LEVELS" : `JLPT ${batch.level}`}</span>
        <span className="text-sun-300">{batch.mode === "Online" ? "LIVE ONLINE" : "BENGALURU CLASSROOM"}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-indigo-950">
          <Link href={`/${batch.courseSlug}`} className="inline-block py-1.5 hover:underline underline-offset-4">
            {batch.courseTitle}
          </Link>
        </h3>

        <dl className="mt-4 space-y-2.5 text-sm text-charcoal-700">
          <div className="flex gap-2.5"><dt className="sr-only">Starts</dt><CalendarDays size={16} className="mt-0.5 shrink-0 text-sun-400" /><dd>Starts <strong className="text-charcoal-900">{batch.startDate}</strong></dd></div>
          <div className="flex gap-2.5"><dt className="sr-only">Schedule</dt><Clock size={16} className="mt-0.5 shrink-0 text-sun-400" /><dd>{batch.schedule}</dd></div>
          <div className="flex gap-2.5"><dt className="sr-only">Duration</dt><MapPin size={16} className="mt-0.5 shrink-0 text-sun-400" /><dd>{batch.durationHours} hours · {batch.goal}</dd></div>
          <div className="flex gap-2.5"><dt className="sr-only">Seats</dt><Users size={16} className="mt-0.5 shrink-0 text-sun-400" /><dd><LiveSeats batchId={batch.id} initial={batch.seatsLeft} /></dd></div>
        </dl>

        <p className="mt-4 text-sm text-charcoal-500">{batch.priceLabel}</p>

        <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
          <Button href={`/free-japanese-demo-class?batch=${batch.id}`} variant="outline" size="sm">Book Demo</Button>
          <EnrolOrWaitlist batchId={batch.id} initial={batch.seatsLeft} />
        </div>
      </div>
    </article>
  );
}
