import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { socialLinks, techStack } from "@/data/home";

const timeline = [
  {
    year: "2024",
    title: "踏入编程世界",
    desc: "从第一行 Hello World 开始，对前端开发产生了浓厚兴趣。",
  },
  {
    year: "2025",
    title: "深入全栈探索",
    desc: "学习 Next.js、TypeScript、Prisma，开始构建自己的项目。",
  },
  {
    year: "2026",
    title: "搭建数字花园",
    desc: "用代码和文字记录成长，打造这个个人博客空间。",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-container py-12">
      <SectionHeading eyebrow="About" title="关于我" icon="sparkle" />

      <div className="mx-auto mt-8 max-w-3xl space-y-10">
        <section className="glass-panel rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-azure-100 via-azure-200 to-azure-300 text-4xl font-black tracking-tight text-azure-700 shadow-glow ring-4 ring-white/60 sm:h-32 sm:w-32">
              街
            </div>

            <div className="text-center sm:text-left">
              <h2 className="hero-title text-3xl font-black sm:text-4xl">
                <span className="hero-word-dark">街喧嚣</span>
                <span className="text-azure-500">，</span>
                <span className="hero-word-blue">人过往</span>
              </h2>
              <p className="mt-3 max-w-lg text-base font-medium leading-7 text-ink-soft/90">
                在喧嚣的街头，人来人往。我用代码编织梦想，用文字定格时光。
                每一行代码都是一次对话，每一篇文章都是一扇窗。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft/70">
                前端开发者 · 数字花园园丁 · 终身学习者
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <Icon name={link.icon} className="h-4 w-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-8 sm:p-10">
          <h3 className="mb-1 flex items-center gap-2 text-lg font-black text-ink">
            <Icon name="code" className="h-5 w-5 text-azure-600" />
            技能栈
          </h3>
          <p className="mb-5 text-sm text-ink-soft/60">日常使用的技术与工具</p>

          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <Pill key={tech.id}>
                <Icon name={tech.icon} className="h-3.5 w-3.5" />
                {tech.label}
              </Pill>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-8 sm:p-10">
          <h3 className="mb-1 flex items-center gap-2 text-lg font-black text-ink">
            <Icon name="clock" className="h-5 w-5 text-azure-600" />
            经历时间线
          </h3>
          <p className="mb-6 text-sm text-ink-soft/60">一路走来的足迹</p>

          <div className="relative space-y-0">
            {timeline.map((item, idx) => (
              <div key={item.year} className="relative pl-8 pb-8 last:pb-0">
                {idx !== timeline.length - 1 && (
                  <div className="absolute left-[11px] top-7 h-[calc(100%-0.5rem)] w-0.5 bg-gradient-to-b from-azure-200 to-transparent" />
                )}
                <div className="absolute left-0 top-1 h-[22px] w-[22px] rounded-full border-2 border-azure-400 bg-white shadow-sm" />

                <div className="rounded-xl border border-white/60 bg-white/50 p-5 backdrop-blur-sm">
                  <p className="mb-1 inline-block rounded-md bg-azure-50 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-azure-700">
                    {item.year}
                  </p>
                  <h4 className="mt-2 text-base font-bold text-ink">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft/75">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-8 sm:p-10">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-ink">
            <Icon name="lightbulb" className="h-5 w-5 text-azure-600" />
            关于这个博客
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-ink-soft/80">
            <p>
              这是一个用 <strong className="font-bold text-ink">Next.js + TypeScript + Tailwind CSS</strong> 构建的现代化个人博客，
              采用玻璃拟态（Glassmorphism）设计风格，以蓝色为主调，追求轻盈、通透的视觉体验。
            </p>
            <p>
              博客的名字「<strong className="font-bold text-azure-700">街喧嚣，人过往</strong>」取自一种心境——
              世界很吵，但我们可以安静地写代码、记生活、留痕迹。
              这里是我的数字花园，种下想法，等它开花。
            </p>
            <p>
              如果你喜欢这里的内容，欢迎去留言板留下你的痕迹 ✨
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
