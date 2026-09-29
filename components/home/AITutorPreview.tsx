import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";

const actions = [
  "Grammar Coach",
  "Conversation",
  "Vocabulary",
  "JLPT Practice",
  "Roleplay",
];

export function AITutorPreview() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl border border-charcoal-100 bg-surface p-6 sm:p-8 shadow-xl shadow-indigo-950/5 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-bg-alt px-4 py-3">
                  <p className="font-jp text-charcoal-900">
                    今日はどうでしたか？
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-lg rounded-tr-sm bg-indigo-800 text-white px-4 py-3">
                  <p className="font-jp">
                    今日は仕事が忙しかったです。
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-bg-alt px-4 py-3">
                  <p className="font-jp text-charcoal-900">
                    いいですね。では、「忙しい」を使ってもう一つ文章を作ってみましょう。
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {actions.map((action) => (
                <span
                  key={action}
                  className="rounded-full border border-charcoal-100 bg-bg px-3 py-1.5 text-xs font-semibold text-charcoal-700"
                >
                  {action}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="AI-Powered Practice"
              title="Practice Japanese Anytime"
              description="A future AI Japanese tutor for grammar coaching, conversation, vocabulary and JLPT practice."
            />
            <div className="mt-6">
              <Badge tone="indigo">
                <Sparkles size={13} /> Coming soon
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
