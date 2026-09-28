export const site = {
  name: "Natsugo",
  url: "https://natsugo.vercel.app", // switch to the custom domain once connected
  // Placeholder contact details except phone/WhatsApp — replace the rest before launch.
  whatsappNumber: "917056109429",
  phoneDisplay: "+91 70561 09429",
  email: "khuwaish.g@viralinbound.com",
  city: "Bengaluru",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM IST",
};

export const whatsappLink = (text = "Hi, I'd like to know about Japanese classes.") =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

const u = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  groupStudy: u("photo-1522202176988-66273c2fd55f"),
  classroom: u("photo-1509062522246-3755977927d7"),
  online: u("photo-1573164713714-d95e436ab8d6"),
  onlinePair: u("photo-1531482615713-2afd69097998"),
  writing: u("photo-1434030216411-0b793f4b4173"),
  office: u("photo-1517245386807-bb43f82c33c4"),
  books: u("photo-1513475382585-d06e58bcb0e0"),
  lecture: u("photo-1606761568499-6d2451b23c66"),
  kyoto: u("photo-1493976040374-85c8e12f0c0e"),
  fuji: u("photo-1528164344705-47542687000d"),
  tokyo: u("photo-1540959733332-eab4deabeeaf"),
  shibuya: u("photo-1542051841857-5f90071e7989"),
  tokyoNight: u("photo-1503899036084-c55cdd92da26"),
  sakura: u("photo-1524413840807-0c3cb6fa808d"),
  pagoda: u("photo-1545569341-9eb8b30979d9"),
};
