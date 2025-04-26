type ContentType = {
  en: string;
  zh: string;
};

export const excuses: ContentType[] = [
  {
    en: "She got a boyfriend already",
    zh: "她有男朋友了",
  },
  {
    en: "Her phone died",
    zh: "她电话没电了",
  },
  {
    en: "Maybe she's showering",
    zh: "可能她还在洗澡",
  },
  {
    en: "Her tumb is tired to type",
    zh: "她的拇指累了，打不到字了",
  },
  {
    en: "She's dating with her boyfriend",
    zh: "她在跟男朋友约会",
  },
  {
    en: "You sure you still wanna wait?",
    zh: "你确定你还要等？",
  },
  {
    en: "Her phone died... her interest too, probably",
    zh: "他们的手机没电了...兴趣可能也没了",
  },
  {
    en: "She's asleep",
    zh: "她睡着了",
  },
  {
    en: "She lost her phone",
    zh: "她手机不见了",
  },
  {
    en: "She's in a tunnel with no service",
    zh: '她在一个没有信号的隧道里',
  },
  {
    en: "Her message is stuck in the cloud, just like your relationship",
    zh: "她的消息卡在云端，就像你们的关系一样",
  },
  {
    en: "She's asking friends on how to respond to you",
    zh: "她在问朋友要怎样回你的讯息",
  },
];

export const responses: { text: ContentType; emoji: string }[] = [
  { 
    text: { en: "She Doesnt Love You", zh: "她不爱你" },
    emoji: "💔" 
  },
  { 
    text: { en: "Continue Waiting", zh: "继续等吧" },
    emoji: "🥹" 
  },
  { 
    text: { en: "Ur Cooked", zh: "你完蛋了" },
    emoji: "💀" 
  },
  { 
    text: { en: "Keep dreaming", zh: "继续做梦" },
    emoji: "🫠" 
  },
  { 
    text: { en: "Maybe tomorrow will be better", zh: "也许明天会更好" },
    emoji: "😅" 
  },
  { 
    text: { en: "Absolutely no more chances", zh: "绝对没有可能了" },
    emoji: "🙃" 
  },
  { 
    text: { en: "Check again in 2099", zh: "2099年再来看看" },
    emoji: "⏳" 
  },
  { 
    text: { en: "Ur a clown", zh: "你是小丑" },
    emoji: "🤡" 
  },
];

export const fortunes: ContentType[] = [
  {
    en: "You will text them again. You will regret it.",
    zh: "你会再次给他们发短信。你会后悔的。",
  },
  {
    en: "Cupid say he saw your message. Cupid is laughing.",
    zh: "月老说他看到了你的信息。他都在笑。",
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
    zh: "从不回讯息的人会突然出现...但只在你的梦里。",
  },
  {
    en: "Success is in your future.",
    zh: "成功就在你的未来。",
  },
  {
    en: "You will find someone better.",
    zh: "你会遇见更好的。",
  },
  {
    en: "Delete their number.",
    zh: "删除他们的号码。",
  },
  {
    en: "She doesnt want to be in a relationship (with you)",
    zh: "她不想谈恋爱（跟你）。",
  },
];
