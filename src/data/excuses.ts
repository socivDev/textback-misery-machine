
type ContentType = {
  en: string;
  zh: string;
};

export const excuses: ContentType[] = [
  {
    en: "They're practicing self-care by ignoring you",
    zh: "他们正在通过无视你来进行自我关爱",
  },
  {
    en: "Mercury is in retrograde (and so is their ability to communicate)",
    zh: "水星逆行中（他们的沟通能力也在逆行）",
  },
  {
    en: "They're too busy being emotionally unavailable",
    zh: "他们太忙于情感失联了",
  },
  {
    en: "Their thumbs are temporarily out of service",
    zh: "他们的拇指暂时停止服务",
  },
  {
    en: "They're building character (yours, specifically)",
    zh: "他们在塑造性格（具体来说是你的）",
  },
  {
    en: "They're manifesting better texting habits (results may vary)",
    zh: "他们正在尝试培养更好的发信习惯（效果待定）",
  },
  {
    en: "Their phone died... their interest too, probably",
    zh: "他们的手机没电了...兴趣可能也没了",
  },
  {
    en: "They're on a digital detox (but only from your messages)",
    zh: "他们在进行数字排毒（但只针对你的消息）",
  },
];

export const responses: { text: ContentType; emoji: string }[] = [
  { 
    text: { en: "NOPE.", zh: "不可能." },
    emoji: "😭" 
  },
  { 
    text: { en: "Still waiting...", zh: "还在等..." },
    emoji: "🥹" 
  },
  { 
    text: { en: "Not yet bestie", zh: "还没有呢亲" },
    emoji: "😮‍💨" 
  },
  { 
    text: { en: "Keep dreaming", zh: "继续做梦" },
    emoji: "🫠" 
  },
  { 
    text: { en: "Maybe tomorrow", zh: "也许明天吧" },
    emoji: "😅" 
  },
];
