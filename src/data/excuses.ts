
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
  {
    en: "They lost their phone in a tragic scrolling accident",
    zh: "他们的手机在悲惨的滚动事故中丢失了",
  },
  {
    en: "They're in a tunnel with no service (the tunnel is called 'avoidance')",
    zh: "他们在一个没有信号的隧道里（隧道名为"回避"）",
  },
  {
    en: "Their message is stuck in the cloud, just like your relationship",
    zh: "他们的消息卡在云端，就像你们的关系一样",
  },
  {
    en: "They're busy consulting their friends about how to respond",
    zh: "他们正忙着向朋友咨询如何回复",
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
  { 
    text: { en: "Absolutely not", zh: "绝对没有" },
    emoji: "🙃" 
  },
  { 
    text: { en: "Check again in 2099", zh: "2099年再来看看" },
    emoji: "⏳" 
  },
  { 
    text: { en: "Your text is in another castle", zh: "你的短信在另一个城堡" },
    emoji: "🏰" 
  },
];

export const fortunes: ContentType[] = [
  {
    en: "You will text them again. You will regret it.",
    zh: "你会再次给他们发短信。你会后悔的。",
  },
  {
    en: "The stars say they saw your message. The stars are laughing.",
    zh: "星星说它们看到了你的信息。星星们都在笑。",
  },
  {
    en: "Your future holds many unanswered messages.",
    zh: "你的未来充满了未回复的信息。",
  },
  {
    en: "Expect great disappointment in your messaging app.",
    zh: "在你的短信应用中期待巨大的失望。",
  },
  {
    en: "The one who never texts back will suddenly appear... in your dreams only.",
    zh: "从不回信的人会突然出现...但只在你的梦里。",
  },
  {
    en: "Success is in your future. Texting success? No.",
    zh: "成功就在你的未来。短信成功？不是。",
  },
  {
    en: "Your read receipts bring all the anxiety to the yard.",
    zh: "你的已读回执给你带来了焦虑。",
  },
  {
    en: "Delete their number. No, seriously. It's time.",
    zh: "删除他们的号码。不，认真的。是时候了。",
  },
];
