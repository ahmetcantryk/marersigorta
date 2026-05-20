import type { ComponentType } from "react";
import {
  UndrawByMyCar,
  UndrawElectricCar,
  UndrawAirport,
  UndrawRelaxingAtHome,
  UndrawOnlineShopping,
  UndrawAlert,
  UndrawDoctor,
  UndrawHealthyHabit,
  UndrawDestination,
  UndrawAgreement,
  UndrawSecureServer,
  UndrawBusinessDeal,
  UndrawCharts,
} from "react-undraw-illustrations";
import { I, type IconProps } from "@/components/Icons";

type IconComponent = ComponentType<IconProps>;
type IllustrationComponent = ComponentType<{
  primaryColor?: string;
  height?: string | number;
}>;

export interface CoverageItem {
  Icon: IconComponent;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ComparisonTable {
  title?: string;
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface StepItem {
  title: string;
  desc: string;
}

export interface BadgeItem {
  text: string;
}

export interface ProductData {
  slug: string;
  /** Short label used in navigation menus + breadcrumbs */
  short: string;
  /** Larger heading used on cards */
  card: string;
  /** Card description */
  cardDesc: string;
  /** Card icon */
  CardIcon: IconComponent;
  seo: {
    title: string;
    description: string;
    h1: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badges: string[];
    Illustration: IllustrationComponent;
  };
  nedir: {
    paragraphs: string[];
    callout?: string;
  };
  teminatlar: {
    title?: string;
    items: CoverageItem[];
  };
  ekTeminatlar?: {
    title: string;
    items: CoverageItem[];
  };
  teminatDisi: string[];
  limitTable?: ComparisonTable;
  comparison?: ComparisonTable;
  fiyatKriterleri?: string[];
  nasilYaptirilir?: StepItem[];
  hasarSureci?: string[];
  faq: FaqItem[];
  crossSell: string[];
}

export const PRODUCTS: ProductData[] = [
  // 1
  {
    slug: "zorunlu-trafik-sigortasi",
    short: "Zorunlu Trafik",
    card: "Trafik Sigortası",
    cardDesc: "3. şahıs maddi ve bedeni teminatı.",
    CardIcon: I.Car,
    seo: {
      title: "Zorunlu Trafik Sigortası 2026 Fiyatları | Marer Sigorta",
      description:
        "Aracınız için zorunlu trafik sigortası teklifi alın. 30+ sigorta şirketinin tekliflerini Marer Sigorta uzmanlığıyla karşılaştırın.",
      h1: "Zorunlu Trafik Sigortası — 2026 Güncel Fiyatlar",
      keywords: [
        "zorunlu trafik sigortası",
        "trafik sigortası fiyatı",
        "trafik sigortası teklif",
        "ZMSS",
      ],
    },
    hero: {
      eyebrow: "Yasal Zorunluluk",
      title: "Yola güvenle çıkın, yasal zorunluluğunuzu Marer ile tamamlayın",
      subtitle:
        "2918 sayılı Karayolları Trafik Kanunu gereği her motorlu araç için zorunlu olan trafik sigortanızı, 30+ sigorta şirketini karşılaştırarak en uygun fiyata yaptırın.",
      badges: [
        "Aynı gün poliçe başlangıcı",
        "Anlaşmalı 30+ sigorta şirketi",
        "Hasar anında 7/24 destek",
      ],
      Illustration: UndrawByMyCar,
    },
    nedir: {
      paragraphs: [
        "Zorunlu Trafik Sigortası — diğer adıyla Zorunlu Mali Sorumluluk Sigortası (ZMSS) — 2918 sayılı kanun gereği trafiğe çıkan tüm motorlu araç işletenlerinin yaptırması gereken sigortadır.",
        "Bu sigorta sizin aracınızı değil, sizin neden olduğunuz bir kazada karşı tarafın uğradığı zararları teminat altına alır. Kazada kusurluysanız, karşı tarafın maddi ve bedeni zararlarını poliçe limitleri dahilinde sigorta şirketi öder.",
      ],
      callout:
        "Trafik sigortasız araç kullanmak ağır para cezası ve aracın trafikten men edilmesi gibi yaptırımlara yol açar.",
    },
    teminatlar: {
      items: [
        {
          Icon: I.CarShield,
          title: "Maddi Zarar Teminatı",
          desc: "Karşı tarafın aracında ve eşyalarında oluşan hasarlar.",
        },
        {
          Icon: I.Hospital,
          title: "Bedeni Zarar Teminatı",
          desc: "Yaralanmada tedavi, ameliyat, hastane masrafları.",
        },
        {
          Icon: I.Shield,
          title: "Sürekli Sakatlık & Vefat",
          desc: "Maluliyet veya vefat halinde hak sahiplerine tazminat.",
        },
        {
          Icon: I.Building,
          title: "Üçüncü Şahıs Malları",
          desc: "Direk, lamba, dükkan gibi kamu/özel mülke zararlar.",
        },
        {
          Icon: I.HandHeart,
          title: "Destek Hizmetleri",
          desc: "Vefat halinde defin masrafları ve destek.",
        },
      ],
    },
    teminatDisi: [
      "Sigortalının kendi aracının zararı (Kasko gerekir)",
      "Sürücünün kendi yaralanması/vefatı",
      "Eş, çocuk ve birlikte yaşanan kardeşlerin talepleri",
      "Aracınızda taşınan eşyalar",
      "Aracınızla çekilen römork hasarları",
      "Alkol veya uyuşturucu etkisinde kaza",
      "Trafik kurallarının kasten ihlali",
    ],
    limitTable: {
      title: "2026 Güncel Teminat Limitleri (SEDDK)",
      headers: ["Teminat", "2025", "2026 Yeni Limit"],
      rows: [
        ["Maddi zarar (araç başına)", "300.000 TL", "400.000 TL"],
        ["Maddi zarar (kaza başına)", "600.000 TL", "800.000 TL"],
        ["Bedeni zarar (kişi başına)", "2.700.000 TL", "3.600.000 TL"],
        ["Bedeni zarar (kaza başına)", "13.500.000 TL", "18.000.000 TL"],
      ],
      note: "27 Aralık 2025 tarihli Resmi Gazete düzenlemesi ile yürürlüğe girmiştir. Limitler aşılırsa kalan kısım sürücünün şahsi sorumluluğundadır.",
    },
    fiyatKriterleri: [
      "Hasar basamağı (1–7): hasarsız geçen her yıl indirim oranı artar",
      "Araç türü: otomobil, kamyon, motosiklet, ticari taksi",
      "Plaka ilinin risk grubu",
      "Sürücü yaşı ve ehliyet süresi",
      "Aracın motor hacmi ve yaşı",
    ],
    faq: [
      {
        q: "Trafik sigortası ile kasko arasındaki fark nedir?",
        a: "Trafik sigortası, kazada karşı tarafa verilen maddi ve bedeni zararları zorunlu olarak karşılarken; kasko sigortası isteğe bağlı olup, kendi aracınızı kaza, çalınma, yangın ve benzeri risklere karşı güvence altına alır.",
      },
      {
        q: "2. el araç aldığımda mevcut poliçe geçerli mi?",
        a: "Hayır. Noter devir işleminden önce alıcı kendi adına yeni poliçe yaptırmak zorundadır.",
      },
      {
        q: "Poliçemi yenilemezsem ne olur?",
        a: "Trafiğe çıkmanız yasak olur, ceza yazılır ve araç bağlanabilir. Ayrıca hasarsızlık indiriminizi kaybedebilirsiniz.",
      },
      {
        q: "Sıfır araç için ne zaman yaptırmalıyım?",
        a: "Plaka takılmadan önce. Bayiden teslim aldığınız gün poliçenizi başlatın.",
      },
    ],
    crossSell: ["kasko-sigortasi", "yesil-kart-sigortasi", "ferdi-kaza-hayat-sigortasi"],
  },

  // 2
  {
    slug: "kasko-sigortasi",
    short: "Kasko",
    card: "Kasko Sigortası",
    cardDesc: "Çarpışma, çalınma ve hasarlara karşı koruma.",
    CardIcon: I.CarShield,
    seo: {
      title: "Kasko Sigortası 2026 Fiyatları | Online Teklif – Marer Sigorta",
      description:
        "Aracınıza özel kasko sigortası teklifi alın. Tam, geniş, dar kasko seçenekleriyle 30+ sigorta şirketini karşılaştırın. Hasarsızlık indiriminizi koruyun.",
      h1: "Kasko Sigortası — Aracınız İçin Tam Koruma",
      keywords: [
        "kasko sigortası",
        "kasko teklif",
        "kasko fiyatları",
        "hasarsızlık indirimi",
      ],
    },
    hero: {
      eyebrow: "İsteğe Bağlı Tam Koruma",
      title: "Aracınızı her riske karşı güvenceye alın",
      subtitle:
        "Çarpışma, hırsızlık, yangın, doğal afet ve daha fazlasına karşı; size en uygun kasko paketini Marer Sigorta uzmanlarıyla birlikte belirleyin.",
      badges: [
        "Mini onarım ile hasarsızlık koruması",
        "Anlaşmalı servis ağı",
        "Anlık fiyat karşılaştırma",
      ],
      Illustration: UndrawElectricCar,
    },
    nedir: {
      paragraphs: [
        "Kasko sigortası, aracınıza ait maddi zararları teminat altına alan isteğe bağlı bir sigortadır. Trafik sigortasının aksine, kazada kusurlu olsanız bile kendi aracınızdaki hasarı karşılar.",
        "Mevzuata göre kasko 4 farklı kapsam seviyesinde sunulur: Dar Kasko, Standart Kasko, Genişletilmiş Kasko ve Tam Kasko.",
      ],
    },
    teminatlar: {
      title: "Ana Teminatlar",
      items: [
        {
          Icon: I.AlertTriangle,
          title: "Çarpışma",
          desc: "Başka bir araç veya cisme çarpma, devrilme, yuvarlanma.",
        },
        {
          Icon: I.Bolt,
          title: "Yanma",
          desc: "Aracın yanması, yangından zarar görmesi.",
        },
        {
          Icon: I.Lock,
          title: "Çalınma",
          desc: "Aracın veya parçalarının çalınması, çalınmaya teşebbüs.",
        },
        {
          Icon: I.Shield,
          title: "3. Kişi Kötü Niyet",
          desc: "Aracınıza kasıtlı olarak verilen zararlar (vandalizm).",
        },
        {
          Icon: I.Quake,
          title: "Yıldırım, Sel, Heyelan",
          desc: "Doğal afet sonucu hasarlar (ek teminatla).",
        },
      ],
    },
    ekTeminatlar: {
      title: "Ek Teminatlar (Poliçeye Eklenebilir)",
      items: [
        {
          Icon: I.Sparkle,
          title: "Mini Onarım",
          desc: "Küçük çizik/vurukları hasarsızlığı bozmadan onarın.",
        },
        {
          Icon: I.Shield,
          title: "Hasarsızlık Koruma",
          desc: "Bir hasar bildiriminde indirim kademenizi koruyun.",
        },
        {
          Icon: I.Car,
          title: "İkame Araç",
          desc: "Aracınız serviste iken size kiralık araç.",
        },
        {
          Icon: I.Plane,
          title: "Yurt Dışı Teminatı",
          desc: "Türkiye dışında oluşacak hasarlar.",
        },
        {
          Icon: I.HandHeart,
          title: "Asistans",
          desc: "Çekici, yol yardımı, lastik patlağı, akü desteği.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Terör & Toplumsal Olay",
          desc: "Grev, terör, halk hareketleri sonucu zararlar.",
        },
      ],
    },
    teminatDisi: [
      "Aracın yıpranmasından kaynaklı bakım/onarım maliyetleri",
      "Mekanik veya elektronik arızalar (üretim hatası)",
      "Alkol/uyuşturucu etkisinde kaza",
      "Ehliyetsiz sürücünün kullandığı araç",
      "Yarış, iddia veya hız denemelerine katılma",
      "Patlayıcı/yanıcı madde taşıma",
    ],
    limitTable: {
      title: "Hasarsızlık İndirimi Kademeleri",
      headers: ["Yenileme Yılı", "İndirim Oranı"],
      rows: [
        ["1. yıl (ilk poliçe)", "%0"],
        ["2. yıl", "%30"],
        ["3. yıl", "%40"],
        ["4. yıl", "%50"],
        ["5. yıl ve sonrası", "%60 (bazı şirketlerde %65)"],
      ],
      note: "Oranlar şirketten şirkete değişebilir. Marer Sigorta uzmanları, en avantajlı indirim politikasını sunan şirketi bulmanıza yardımcı olur.",
    },
    fiyatKriterleri: [
      "Aracın kasko değer listesindeki bedeli (TSB)",
      "Marka, model, yaş",
      "Hasar geçmişi ve hasarsızlık kademesi",
      "Sürücü yaşı, ehliyet süresi",
      "Plakanın bulunduğu il",
      "Seçilen ek teminatlar ve muafiyet oranı",
    ],
    faq: [
      {
        q: "Hasarsızlık indirimimi başka şirkete taşıyabilir miyim?",
        a: "Evet. Yenileme döneminizde hasarınız yok ise hangi şirkete geçerseniz geçin hasarsızlık aktarımı yapılabilir.",
      },
      {
        q: "Eski aracımı satıp yenisini aldığımda indirimim devam eder mi?",
        a: "Evet. İndirim araca değil, kişiye aittir. Yeni aracınızda da geçerlidir.",
      },
      {
        q: "Cam kırılması hasarsızlığımı bozar mı?",
        a: "Sadece ilk cam hasarı hasarsızlığı bozmaz.",
      },
      {
        q: "Aracım çalınırsa ne kadar sürede ödeme alırım?",
        a: "Yetkili makamların 30 günlük araştırma süresi sonrasında, bulunamadığına dair yazı ile sigorta şirketi tazminatı öder.",
      },
    ],
    crossSell: [
      "zorunlu-trafik-sigortasi",
      "yesil-kart-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
    ],
  },

  // 3
  {
    slug: "yesil-kart-sigortasi",
    short: "Yeşil Kart",
    card: "Yeşil Kart Sigortası",
    cardDesc: "Yurt dışı araç trafik sorumluluk teminatı.",
    CardIcon: I.Doc,
    seo: {
      title: "Yeşil Kart Sigortası — Yurt Dışı Araç Sigortası | Marer Sigorta",
      description:
        "Aracınızla yurt dışına çıkmadan önce Yeşil Kart Sigortanızı Marer Sigorta'dan alın. 47 ülkede geçerli, online satın alma.",
      h1: "Yeşil Kart Sigortası — Yurt Dışında Aracınızın Pasaportu",
      keywords: [
        "yeşil kart sigortası",
        "yurt dışı araç sigortası",
        "uluslararası motorlu taşıt sigortası",
      ],
    },
    hero: {
      eyebrow: "47 Ülkede Geçerli",
      title: "Aracınızla yurt dışı yolculuğa çıkarken güvende olun",
      subtitle:
        "Türkiye'nin de dahil olduğu 47 ülkede geçerli olan Yeşil Kart Sigortası, yurt dışında karıştığınız kazalarda karşı tarafa verdiğiniz zararları teminat altına alır.",
      badges: [
        "47 ülkede geçerli",
        "15 günden 1 yıla esnek süre",
        "Online satın alma + dijital teslim",
      ],
      Illustration: UndrawAirport,
    },
    nedir: {
      paragraphs: [
        "Yeşil Kart (Green Card) Sigortası, uluslararası motorlu taşıt sigorta kartıdır. Türkiye'deki zorunlu trafik sigortanızın yurt dışı versiyonu olarak düşünülebilir.",
        "Türkiye'nin 1959 Strasbourg Anlaşması ile dahil olduğu Yeşil Kart Sistemi sayesinde, üye ülkelerde karıştığınız kazalarda kazanın gerçekleştiği ülkenin trafik sigortası limitleri çerçevesinde karşı tarafa verdiğiniz zararlar teminat altına alınır.",
      ],
      callout:
        "Türkiye'de yaptırdığınız zorunlu trafik sigortası sadece Türkiye sınırları içinde geçerlidir. Yurt dışına aracınızla çıkarken Yeşil Kart yaptırmak zorunludur.",
    },
    teminatlar: {
      title: "Teminat Kapsamı",
      items: [
        {
          Icon: I.CarShield,
          title: "Karşı Araç Maddi Zarar",
          desc: "Karşı tarafın aracında oluşan maddi zararlar.",
        },
        {
          Icon: I.Hospital,
          title: "Karşı Yaralanma & Vefat",
          desc: "Karşı tarafın yaralanma ve vefat zararları.",
        },
        {
          Icon: I.Building,
          title: "3. Şahıs Mal Hasarı",
          desc: "Yol kenarı yapı, mülk, eşya zararları.",
        },
        {
          Icon: I.HandHeart,
          title: "Defin & Cenaze",
          desc: "Vefat halinde cenaze ve defin masrafları.",
        },
      ],
    },
    teminatDisi: [
      "Sigortalının kendi aracının hasarı",
      "Sigortalının kendisinin yaralanması",
      "Aracınızdaki yolcuların eşyaları",
      "Yarış, hız denemesi sırasındaki kazalar",
      "Gürcistan (sisteme dahil değildir, sınırda ayrı sigorta gerekir)",
    ],
    nasilYaptirilir: [
      {
        title: "Belgelerinizi hazırlayın",
        desc: "Ruhsat fotokopisi, geçerli Türk trafik sigortası poliçesi, kimlik fotokopisi.",
      },
      {
        title: "Süreyi belirleyin",
        desc: "15 gün, 1 ay, 2/3/4/5/6/12 ay seçeneklerinden seyahatinizi kapsayanı seçin.",
      },
      {
        title: "Dijital teslimat",
        desc: "Poliçeniz Marer Sigorta tarafından düzenlenip e-postanıza iletilir.",
      },
    ],
    faq: [
      {
        q: "Yeşil Kart sigortasını kim yaptırabilir?",
        a: "Türkiye'de tescilli ve geçerli zorunlu trafik sigortası olan tüm motorlu araç sahipleri.",
      },
      {
        q: "Süre bitiminden önce iade edebilir miyim?",
        a: "1 yıllık poliçeler dışındaki kısa süreli poliçeler iade edilemez. Ücret peşin ödenir.",
      },
      {
        q: "Kazada hangi ülkenin limitleri uygulanır?",
        a: "Kazanın gerçekleştiği ülkenin zorunlu trafik sigortası limitleri.",
      },
      {
        q: "Yeşil Kart kayboldu, ne yapmalıyım?",
        a: "Acentenize bildirin, yedek/kopyasını talep edin. Tahrifat veya silinti olan kartlar geçersizdir.",
      },
    ],
    crossSell: [
      "zorunlu-trafik-sigortasi",
      "kasko-sigortasi",
      "seyahat-saglik-sigortasi",
    ],
  },

  // 4
  {
    slug: "konut-sigortasi",
    short: "Konut",
    card: "Konut Sigortası",
    cardDesc: "Eviniz ve eşyalarınız geniş kapsamlı güvende.",
    CardIcon: I.Home,
    seo: {
      title: "Konut Sigortası 2026 | Ev Sigortası Teklif Al — Marer Sigorta",
      description:
        "Eviniz ve eşyalarınızı yangın, hırsızlık, sel, deprem gibi risklere karşı koruyun. Online konut sigortası teklifi, kapsamlı teminatlar.",
      h1: "Konut Sigortası — Yuvanız İçin Tam Koruma",
      keywords: [
        "konut sigortası",
        "ev sigortası",
        "eşya sigortası",
        "yangın sigortası",
      ],
    },
    hero: {
      eyebrow: "Ev + Eşya Tam Paket",
      title: "Evinizi ve içindeki her şeyi sonsuz güvenceye alın",
      subtitle:
        "Yangından hırsızlığa, sel baskınından dahili tesisat patlamasına kadar; evinizi, eşyalarınızı ve sevdiklerinizi koruyacak kapsamlı bir poliçe ile huzurla yaşayın.",
      badges: [
        "Ev sahibi ve kiracı için ayrı paketler",
        "DASK + konut sigortası kombinasyonu",
        "Asistans hizmetleri dahil",
      ],
      Illustration: UndrawRelaxingAtHome,
    },
    nedir: {
      paragraphs: [
        "Konut sigortası, evinizi ve içindeki eşyaları yangın, hırsızlık, doğal afet, dahili su, cam kırılması gibi pek çok riske karşı koruyan isteğe bağlı bir sigortadır.",
        "DASK sadece deprem hasarını ve sadece binayı kapsar; zorunludur. Konut sigortası ise geniş risklere karşı bina + eşyaları kapsar ve tamamlayıcı niteliktedir. İkisi birlikte yapıldığında konutunuz tam korumadadır.",
        "Hem ev sahipleri (bina + eşya) hem de kiracılar (eşya + mal sahibine karşı sorumluluk) konut sigortası yaptırabilir.",
      ],
    },
    teminatlar: {
      title: "Ana Teminatlar",
      items: [
        {
          Icon: I.AlertTriangle,
          title: "Yangın, Yıldırım, İnfilak",
          desc: "Yangın, yıldırım düşmesi, patlama sonucu hasarlar.",
        },
        {
          Icon: I.Sparkle,
          title: "Dahili Su",
          desc: "Tesisat patlaması, sızıntı, donma zararları.",
        },
        {
          Icon: I.Quake,
          title: "Sel ve Su Baskını",
          desc: "Dere/çay taşması, kanalizasyon su basması.",
        },
        {
          Icon: I.Bolt,
          title: "Fırtına, Dolu, Kar",
          desc: "Doğal hava olayları sonucu çatı ve eşya zararları.",
        },
        {
          Icon: I.Lock,
          title: "Hırsızlık",
          desc: "Çalınan eşyalar, kırılan kapı/pencereler.",
        },
        {
          Icon: I.Shield,
          title: "Cam Kırılması",
          desc: "Pencere, ayna ve cam yüzeylerin kırılması.",
        },
      ],
    },
    ekTeminatlar: {
      title: "Ek Teminatlar (Opsiyonel)",
      items: [
        {
          Icon: I.Quake,
          title: "Deprem (DASK Üstü)",
          desc: "DASK limitlerini aşan deprem hasarları için.",
        },
        {
          Icon: I.Home,
          title: "Geçici İkamet",
          desc: "Ev oturulamaz hale gelirse otel/kira masrafı.",
        },
        {
          Icon: I.Sparkle,
          title: "Değerli Eşya",
          desc: "Mücevher, antika, sanat eseri için ayrı limit.",
        },
        {
          Icon: I.HandHeart,
          title: "Ferdi Kaza",
          desc: "Aile fertleri için kaza teminatı.",
        },
        {
          Icon: I.Handshake,
          title: "3. Şahıs Sorumluluk",
          desc: "Komşunuza verilen zararlar için.",
        },
        {
          Icon: I.Bolt,
          title: "Asistans Hizmetleri",
          desc: "Tesisatçı, çilingir, cam ustası, ambulans.",
        },
      ],
    },
    teminatDisi: [
      "Savaş, askeri harekat, nükleer riskler",
      "Yangın haricinde eşyaların kendi kusurundan zararlar",
      "Sanat eseri/antika beyan edilmediyse",
      "Sigortalının kasıtlı eylemleri",
      "Konut uzun süre boş bırakıldığında oluşan hasarlar",
      "Bakım yetersizliğinden kaynaklı sızıntı/küflenme",
    ],
    fiyatKriterleri: [
      "Konutun brüt yüzölçümü ve yapı tarzı",
      "İnşaat ruhsat yılı",
      "Konutun bulunduğu il / risk grubu",
      "Eşya bedeli ve değerli eşya beyanları",
      "Seçilen ek teminatlar ve muafiyet",
    ],
    faq: [
      {
        q: "Konut sigortası zorunlu mu?",
        a: "Hayır, isteğe bağlıdır. Ancak konut kredisi kullanırken banka tarafından zorunlu tutulabilir.",
      },
      {
        q: "DASK ile konut sigortası aynı şey mi?",
        a: "Hayır. DASK sadece deprem ve binayı kapsar, zorunludur. Konut sigortası geniş kapsamlıdır, isteğe bağlıdır. İdealde her ikisi birlikte yaptırılır.",
      },
      {
        q: "Kiracıyım, konut sigortası yaptırabilir miyim?",
        a: "Evet. Eşyalarınızı yangın, hırsızlık, su baskını risklerine karşı sigortalatabilir, ayrıca mal sahibine karşı sorumluluk teminatı alabilirsiniz.",
      },
      {
        q: "Evimde antika eşyalar var, normal poliçeye dahil mi?",
        a: "Sanat eseri, antika, mücevher otomatik kapsama girmez. Beyan ederek ek bedel ile poliçeye eklemelisiniz.",
      },
      {
        q: "Sel hasarı kapsamda mı?",
        a: "Çoğu modern paket poliçede sel ve su baskını ana teminat olarak yer alır.",
      },
    ],
    crossSell: [
      "dask-zorunlu-deprem-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
      "kobi-isyeri-sigortasi",
    ],
  },

  // 5
  {
    slug: "kobi-isyeri-sigortasi",
    short: "İşyeri / KOBİ",
    card: "İşyeri Sigortası",
    cardDesc: "İşyeri, stok ve sorumluluklar tek poliçede.",
    CardIcon: I.Building,
    seo: {
      title: "KOBİ İşyeri Sigortası — Ticari Yangın | Marer Sigorta",
      description:
        "İşyerinizi yangın, hırsızlık, sel, deprem ve makine kırılmasına karşı sigortalayın. KOBİ paket sigortası, iş durması teminatı, online teklif.",
      h1: "KOBİ İşyeri Sigortası — İşletmenizi Her Riske Karşı Koruyun",
      keywords: [
        "işyeri sigortası",
        "kobi sigortası",
        "ticari yangın sigortası",
        "işyeri yangın",
      ],
    },
    hero: {
      eyebrow: "Sektöre Özel Paket",
      title: "İşletmenizin geleceğini sigortaya bağlayın",
      subtitle:
        "Bir yangın, sel veya hırsızlık olayı küçük bir KOBİ'yi iflasa sürükleyebilir. Marer Sigorta uzmanlarıyla sektörünüze özel paketi belirleyin, iş sürekliliğinizi güvence altına alın.",
      badges: [
        "Sektöre özel paket çözümleri",
        "İş durması tazminatı dahil",
        "Risk mühendisliği danışmanlığı",
      ],
      Illustration: UndrawOnlineShopping,
    },
    nedir: {
      paragraphs: [
        "KOBİ İşyeri Sigortası (Ticari Yangın Sigortası), işyeri binanızı, içerisindeki demirbaş, makine, emtia, dekorasyon ve elektronik cihazları çok çeşitli risklere karşı koruyan kapsamlı bir paket poliçedir.",
        "Mağazalar, restoranlar, atölyeler, ofisler, kuyumcular, eczaneler için özel paketler mevcuttur. Yüksek riskli sektörler (kimyasal, akaryakıt) için ayrı değerlendirme yapılır.",
      ],
      callout:
        "İş Durması (Kar Kaybı) Teminatı, bir KOBİ için en kritik teminatlardan biridir. İşyerinde büyük bir hasar sonucu faaliyetlerin durması halinde kar kaybı, kira, maaş, vergi gibi sabit giderler bu teminat ile karşılanır.",
    },
    teminatlar: {
      title: "Ana Teminatlar",
      items: [
        {
          Icon: I.AlertTriangle,
          title: "Yangın, Yıldırım, İnfilak",
          desc: "Temel teminat — yangın, yıldırım, patlama.",
        },
        {
          Icon: I.Sparkle,
          title: "Dahili Su",
          desc: "Tesisat patlaması, sızıntı, donma.",
        },
        {
          Icon: I.Quake,
          title: "Sel ve Su Baskını",
          desc: "Dış kaynaklı su zararları.",
        },
        {
          Icon: I.Lock,
          title: "Hırsızlık ve Soygun",
          desc: "Çalınan demirbaş, emtia, kasa hırsızlığı.",
        },
        {
          Icon: I.Bolt,
          title: "Makine Kırılması",
          desc: "Üretim makineleri, motor, jeneratör arızaları.",
        },
        {
          Icon: I.Coins,
          title: "İş Durması",
          desc: "Faaliyetlerin durması halinde kar ve sabit gider kaybı.",
        },
      ],
    },
    ekTeminatlar: {
      title: "Sektöre Özel Ek Teminatlar",
      items: [
        {
          Icon: I.Doc,
          title: "Elektronik Cihaz",
          desc: "Bilgisayar, POS, kamera sistemleri.",
        },
        {
          Icon: I.Shield,
          title: "Cam Kırılması & Vitrin",
          desc: "Vitrin, kapı, iç cam yüzeyleri ve mal teminatı.",
        },
        {
          Icon: I.Handshake,
          title: "3. Şahıs Mali Mesuliyet",
          desc: "Müşteri ve ziyaretçilere verilen zararlar.",
        },
        {
          Icon: I.HandHeart,
          title: "İşveren Sorumluluk",
          desc: "Çalışanlara karşı yasal yükümlülükler.",
        },
        {
          Icon: I.Quake,
          title: "Deprem",
          desc: "Deprem hasarları (ek teminat).",
        },
        {
          Icon: I.Search,
          title: "Emniyet Suistimali",
          desc: "Çalışanların güvene aykırı hareketleri.",
        },
      ],
    },
    teminatDisi: [
      "Savaş, askeri harekat, nükleer/biyolojik/kimyasal riskler",
      "Aşınma, yıpranma, bakım eksikliği",
      "Sigortalının kasıtlı eylemleri",
      "Yasal olmayan faaliyetler",
    ],
    comparison: {
      title: "Sektörlere Özel Ek Klozlar",
      headers: ["Sektör", "Önerilen Ek Klozlar"],
      rows: [
        ["Kuyumcu", "Hırsızlık, kasa soygunu, nakit teminatı, taşıma riski"],
        ["Eczane", "İlaç bozulması, soğuk zincir, hırsızlık"],
        ["Restoran/Kafe", "Gıda bozulması, jeneratör arızası, müşteri zehirlenmesi"],
        ["Atölye/İmalat", "Makine kırılması, elektrik dalgalanması, iş durması"],
        ["Ofis", "Elektronik cihaz, veri kaybı, siber risk"],
        ["Otomotiv servis", "Müşteri araç sorumluluğu, demirbaş hırsızlığı"],
      ],
    },
    faq: [
      {
        q: "İşyeri sigortası zorunlu mu?",
        a: "Hayır, isteğe bağlıdır. Ancak banka kredisi, kira sözleşmesi veya franchise anlaşmaları kapsamında zorunlu olabilir.",
      },
      {
        q: "Eski binam için yapılır mı?",
        a: "Yapılır ancak yapı tarzı ve bakım durumuna göre prim/teminat yapılaması farklılaşır. Bina yaşı 30+ ise risk mühendisliği önerilir.",
      },
      {
        q: "Hangi belgeler gerekir?",
        a: "Vergi levhası, kira kontratı, yapı belgesi, demirbaş listesi, faaliyet türü bildirimi.",
      },
      {
        q: "İş durması teminatını ne kadar süre alabilirim?",
        a: "Genellikle 6/12/18 ay seçenekleri sunulur. KOBİ'lerde önerilen 12 aydır.",
      },
    ],
    crossSell: [
      "dask-zorunlu-deprem-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
      "konut-sigortasi",
    ],
  },

  // 6
  {
    slug: "dask-zorunlu-deprem-sigortasi",
    short: "DASK",
    card: "DASK Zorunlu Deprem",
    cardDesc: "Zorunlu deprem sigortası.",
    CardIcon: I.Quake,
    seo: {
      title: "DASK 2026 Fiyatları | Zorunlu Deprem Sigortası – Marer Sigorta",
      description:
        "DASK Zorunlu Deprem Sigortanızı Marer Sigorta'dan kolayca yaptırın. 2026 güncel fiyatlar, online teklif, e-poliçe.",
      h1: "DASK — Zorunlu Deprem Sigortası",
      keywords: [
        "dask",
        "zorunlu deprem sigortası",
        "dask fiyat 2026",
        "dask hesaplama",
      ],
    },
    hero: {
      eyebrow: "Yasal Zorunluluk",
      title: "Türkiye'de yaşamanın ilk sigortası — DASK",
      subtitle:
        "6305 sayılı Afet Sigortaları Kanunu gereği konutlar için zorunlu olan Zorunlu Deprem Sigortanızı saniyeler içinde yaptırın. 2026 güncel tarifeleriyle, e-poliçe anında e-postanızda.",
      badges: [
        "Yasal zorunluluk — anında e-poliçe",
        "Tek bilgi: UAVT veya adres",
        "Yenileme indirimi avantajı",
      ],
      Illustration: UndrawAlert,
    },
    nedir: {
      paragraphs: [
        "DASK (Doğal Afet Sigortaları Kurumu) tarafından sunulan Zorunlu Deprem Sigortası, depremin ve deprem sonucu meydana gelen yangın, infilak, tsunami ve yer kayması sonucu konutlarda doğrudan oluşacak maddi zararları karşılayan zorunlu bir sigortadır.",
        "Yasal dayanak: 9 Mayıs 2012 tarihli ve 6305 sayılı Afet Sigortaları Kanunu.",
      ],
      callout:
        "DASK olmadan elektrik, su aboneliği açılamaz ve tapu işlemi yapılamaz. Konut kredisi kullanırken de bankalar bunu şart koşar.",
    },
    teminatlar: {
      title: "Kapsamdaki Zararlar",
      items: [
        {
          Icon: I.Quake,
          title: "Deprem Yapısal Zararı",
          desc: "Binanın temel, kolon, kiriş ve ana duvar zararları.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Deprem Sonucu Yangın",
          desc: "Depremden kaynaklanan yangın, infilak, tsunami.",
        },
        {
          Icon: I.Home,
          title: "Ortak Alanlar",
          desc: "Merdiven, asansör, koridor, çatı, baca.",
        },
        {
          Icon: I.Shield,
          title: "Tamamlayıcı Unsurlar",
          desc: "Tapu kayıtlı eklentiler dahil yapı bütünlüğü.",
        },
      ],
    },
    teminatDisi: [
      "Ev eşyaları, mobilya, beyaz eşya (Konut Sigortası gerekir)",
      "Enkaz kaldırma masrafları",
      "Kira kaybı, iş durması, kar kaybı",
      "Alternatif konut/işyeri masrafları",
      "Bedeni zarar, vefat, manevi tazminat",
      "Mali sorumluluk talepleri",
    ],
    limitTable: {
      title: "2026 Güncel DASK Limitleri",
      headers: ["Kalem", "2025", "2026"],
      rows: [
        ["Azami Teminat Tutarı", "1.704.162 TL", "2.095.462 TL"],
        ["Betonarme m² Maliyeti (Ocak)", "—", "≈ 9.884 TL"],
        ["Diğer Yapı m² Maliyeti (Ocak)", "—", "≈ 6.590 TL"],
        ["Hasar Muafiyeti", "%2", "%2 (her hasarda)"],
      ],
      note: "SEDDK'nın 27 Aralık 2025 tarihli düzenlemesiyle yürürlüğe girmiştir. Metrekare maliyetleri her ay ÜFE'ye göre değişir.",
    },
    nasilYaptirilir: [
      {
        title: "Bilgilerinizi paylaşın",
        desc: "UAVT kodu veya açık adres, yapı tarzı (betonarme/diğer), brüt yüzölçümü, kat sayısı, ruhsat yılı, TC kimlik no.",
      },
      {
        title: "Anlık fiyat",
        desc: "DASK tarifesi tüm acentelerde aynıdır; size DASK fiyatını anında ileteriz.",
      },
      {
        title: "E-poliçe teslimi",
        desc: "Ödeme sonrası e-poliçeniz dakikalar içinde e-postanızda.",
      },
    ],
    faq: [
      {
        q: "DASK yaptırmazsam ne olur?",
        a: "Tapu, elektrik, su aboneliği işlemlerinizi yapamazsınız. Olası bir depremde devlet desteğinden yararlanamazsınız.",
      },
      {
        q: "DASK fiyatları şirketten şirkete değişir mi?",
        a: "Hayır. Fiyatlar DASK tarafından belirlenir ve tüm sigorta şirketleri/acenteleri aynı tarifeyi uygular.",
      },
      {
        q: "Kiracı DASK yaptırabilir mi?",
        a: "Kendi adına yaptıramaz. Sigorta ettiren sıfatıyla ev sahibi adına yaptırabilir. Tazminat ev sahibine ödenir.",
      },
      {
        q: "Azami teminat tutarı yetmezse?",
        a: "Üst limiti aşan kısım için İhtiyari Deprem Sigortası veya deprem teminatlı konut sigortası yaptırabilirsiniz.",
      },
      {
        q: "DASK eşyalarımı karşılar mı?",
        a: "Hayır. Sadece binayı karşılar. Eşyalarınız için konut sigortası gereklidir.",
      },
      {
        q: "Poliçem var ama hangi şirkete ait?",
        a: "DASK poliçenizi E-Devlet veya DASK'ın resmi sitesinden TC kimlik numaranızla sorgulayabilirsiniz.",
      },
    ],
    crossSell: ["konut-sigortasi", "ferdi-kaza-hayat-sigortasi", "kobi-isyeri-sigortasi"],
  },

  // 7
  {
    slug: "tamamlayici-saglik-sigortasi",
    short: "Tamamlayıcı Sağlık",
    card: "Tamamlayıcı Sağlık",
    cardDesc: "SGK anlaşmalı özel hastanelerde fark ücreti yok.",
    CardIcon: I.Heart,
    seo: {
      title: "Tamamlayıcı Sağlık Sigortası 2026 — TSS | Marer Sigorta",
      description:
        "SGK'lılara özel TSS ile SGK anlaşmalı özel hastanelerde fark ücreti ödemeden tedavi olun. 2026 fiyatları, network seçenekleri, online teklif.",
      h1: "Tamamlayıcı Sağlık Sigortası (TSS) — Özel Hastanede Fark Ücreti Ödemeden",
      keywords: [
        "tamamlayıcı sağlık sigortası",
        "TSS",
        "tss fiyat",
        "SGK fark ücreti",
      ],
    },
    hero: {
      eyebrow: "SGK'lılara Özel",
      title: "Özel hastane konforu, cebinizi yormadan",
      subtitle:
        "Tamamlayıcı Sağlık Sigortası ile SGK anlaşmalı özel hastanelerde fark ücreti ödemeden muayene, tahlil, ameliyat ve tedavi olun. Klasik özel sağlık sigortasından %50–70 daha uygun primler.",
      badges: [
        "Sadece 60 TL SGK katılım payı",
        "Yıllık 4–10 muayene veya limitsiz",
        "Tüm primler vergiden düşülür",
      ],
      Illustration: UndrawDoctor,
    },
    nedir: {
      paragraphs: [
        "Tamamlayıcı Sağlık Sigortası (TSS), SGK güvencesine sahip kişilerin SGK anlaşmalı özel sağlık kurumlarında karşılaştığı fark ücretlerini karşılayan devlet destekli bir sağlık sigortasıdır.",
        "Özel hastaneye gittiğinizde hastane size devletin belirlediği 60 TL SGK katılım payını keser. Geri kalan ek ücreti TSS poliçeniz karşılar. Tahliller, ileri tetkikler (MR, tomografi) ve ameliyatlar ek ücret ödemeden yapılır.",
      ],
    },
    teminatlar: {
      title: "Ana Teminatlar",
      items: [
        {
          Icon: I.Hospital,
          title: "Yatarak Tedavi (Limitsiz)",
          desc: "Ameliyat, yoğun bakım, kemoterapi, radyoterapi, diyaliz.",
        },
        {
          Icon: I.Heart,
          title: "Ayakta Tedavi",
          desc: "Doktor muayenesi (4/10/limitsiz), tahliller, görüntüleme.",
        },
        {
          Icon: I.Doc,
          title: "İleri Tanı",
          desc: "MR, BT, röntgen, ultrason, anjiyo, EMG.",
        },
        {
          Icon: I.HandHeart,
          title: "Fizik Tedavi",
          desc: "Fizik tedavi ve rehabilitasyon (3 ay bekleme).",
        },
        {
          Icon: I.Sparkle,
          title: "Refakatçi & Tıbbi Malzeme",
          desc: "Yataklı tedavide refakatçi, suni uzuv, tıbbi malzeme.",
        },
        {
          Icon: I.Shield,
          title: "Ferdi Kaza",
          desc: "Kaza sonucu vefat ve sürekli sakatlık (~20.000 TL).",
        },
      ],
    },
    teminatDisi: [
      "SGK tarafından karşılanmayan tedaviler",
      "Anlaşmasız hastanelerdeki ayakta tedaviler",
      "İlaç ve aşı giderleri (SGK üzerinden alınır)",
      "Estetik ameliyatlar, infertilite tedavisi",
      "Diş tedavileri (genellikle)",
      "Gözlük, lens, işitme cihazı",
      "Poliçe başlangıcından önceki mevcut hastalıklar",
      "Akıl/ruh sağlığı tedavileri (genellikle)",
    ],
    fiyatKriterleri: [
      "Yaş — yaş arttıkça prim artar",
      "Cinsiyet (özellikle doğum dahilse)",
      "İkamet ili",
      "Network seçimi (geniş ağ = yüksek prim)",
      "Ayakta tedavi limiti (limitsiz daha pahalı)",
      "Aile indirim (2+ kişi tek poliçede %5–15)",
    ],
    faq: [
      {
        q: "SGK'm yok, TSS yaptırabilir miyim?",
        a: "Hayır. TSS sadece SGK'lılar için. Alternatif: Özel Sağlık Sigortası (ÖSS).",
      },
      {
        q: "Hangi hastaneye gidebilirim?",
        a: "Sigorta şirketinizin Tamamlayıcı Sağlık Anlaşmalı Kurum Ağı'nda yer alan SGK anlaşmalı özel hastanelere.",
      },
      {
        q: "Devlet hastanesinde geçerli mi?",
        a: "Hayır. TSS sadece özel hastanelerde geçerlidir. Devlet hastanelerinde SGK zaten ücretsiz hizmet verir.",
      },
      {
        q: "Mevcut hastalığım var, kapsama girer mi?",
        a: "Mevcut hastalıklar genellikle sağlık sigortalarında teminat kapsamı dışında değerlendirilir; ancak bu durum poliçenin türüne ve özel şartlarına göre değişebilir. ÖBYG (Ömür boyu yenileme garantisi) kapsamında iseniz hiçbir muafiyet konmayacaktır.",
      },
      {
        q: "Acil durumda ne yapmalıyım?",
        a: "Yakınınızdaki herhangi bir SGK anlaşmalı hastaneye gidin — anlaşmalı kurum olmasa bile yatarak acil tedaviniz karşılanır.",
      },
      {
        q: "Yıllık muayene hakkım bitti?",
        a: "Limit dolduktan sonraki muayeneler için fark ücretini kendiniz ödersiniz.",
      },
    ],
    crossSell: [
      "ozel-saglik-sigortasi",
      "seyahat-saglik-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
    ],
  },

  // 8
  {
    slug: "ozel-saglik-sigortasi",
    short: "Özel Sağlık",
    card: "Özel Sağlık Sigortası",
    cardDesc: "Yatılı ve ayakta tedavi güvencesi.",
    CardIcon: I.Hospital,
    seo: {
      title: "Özel Sağlık Sigortası 2026 — Premium ÖSS | Marer Sigorta",
      description:
        "Özel sağlık sigortası ile Acıbadem, Memorial dahil tüm anlaşmalı hastanelerde ek ücret ödemeden tedavi. Yurt dışı, doğum, diş teminatları. Online teklif.",
      h1: "Özel Sağlık Sigortası — Premium Sağlık Güvencesi",
      keywords: [
        "özel sağlık sigortası",
        "ÖSS",
        "oss fiyat",
        "premium sağlık sigortası",
      ],
    },
    hero: {
      eyebrow: "Premium Hastane Ağı",
      title: "En iyi hastanelerde, en üst düzey bakım",
      subtitle:
        "SGK güvencesi olsun olmasın; Acıbadem, Memorial, Florence Nightingale dahil Türkiye'nin en kaliteli özel hastanelerinde, yurt dışında bile, üst düzey sağlık hizmetlerinin keyfini çıkarın.",
      badges: [
        "SGK şartı yok",
        "Premium hastane ağı",
        "Yurt dışı, doğum, diş teminatları",
      ],
      Illustration: UndrawHealthyHabit,
    },
    nedir: {
      paragraphs: [
        "Özel Sağlık Sigortası (ÖSS), SGK güvencesi olsun olmasın herkesin yaptırabildiği, sigorta şirketinin anlaşmalı olduğu tüm özel hastanelerde geçerli olan kapsamlı bir sağlık sigortasıdır.",
        "ÖSS'nin temel avantajı esneklik ve kapsam genişliğidir: Premium hastane grupları (Acıbadem, Memorial, Florence) dahil, yurt dışı tedavi opsiyonu, doğum, diş, gözlük teminatları, sınırsız muayene seçeneği.",
      ],
    },
    teminatlar: {
      title: "Ana Teminatlar",
      items: [
        {
          Icon: I.Hospital,
          title: "Yatarak Tedavi",
          desc: "Ameliyat, yoğun bakım, kemoterapi, radyoterapi, diyaliz.",
        },
        {
          Icon: I.Heart,
          title: "Ayakta Tedavi",
          desc: "Limitsiz veya yıllık limitli muayene, ilaç, tahlil.",
        },
        {
          Icon: I.HandHeart,
          title: "Doğum Teminatı",
          desc: "Normal doğum, sezaryen, hamilelik takip, yenidoğan.",
        },
        {
          Icon: I.Sparkle,
          title: "Diş Teminatı",
          desc: "Rutin muayene, çekim, dolgu, kanal, protez.",
        },
        {
          Icon: I.Search,
          title: "Gözlük Teminatı",
          desc: "Yıllık göz muayenesi, çerçeve, cam, lens.",
        },
        {
          Icon: I.Plane,
          title: "Yurt Dışı Tedavi",
          desc: "Yurt dışı yatarak/ayakta tedavi, Türkiye'ye nakil.",
        },
      ],
    },
    teminatDisi: [
      "Beyan edilmeyen mevcut hastalıklar",
      "Hamilelik (doğum teminatı yoksa)",
      "Estetik cerrahi, kilo verme operasyonları",
      "Cinsel yolla bulaşan hastalıklar, HIV/AIDS",
      "Akıl/ruh sağlığı tedavileri (çoğu planda)",
      "İnfertilite tedavisi, tüp bebek",
      "Profesyonel spor ve tehlikeli aktiviteler",
      "Kasıtlı yaralanmalar, intihar girişimleri",
    ],
    comparison: {
      title: "Plan Seçenekleri",
      headers: ["Plan", "Özellikler", "Hedef Kitle"],
      rows: [
        ["Temel/Ekonomik", "Yatarak tedavi, küçük muayene limiti", "Bütçe odaklı genç bireyler"],
        ["Standart", "+ Ayakta tedavi, doğum/diş eklenebilir", "Aile bireyleri"],
        ["Premium/Lüks", "Tüm teminatlar, yurt dışı dahil, limitsiz", "Üst düzey kullanıcılar"],
      ],
    },
    fiyatKriterleri: [
      "Yaş ve cinsiyet",
      "İkamet ili",
      "Network ve hastane grubu seçimi",
      "Muafiyet, limit, katılım payı kombinasyonu",
      "Ek teminatlar (doğum, diş, gözlük, yurt dışı)",
      "Mevcut sağlık durumu",
    ],
    faq: [
      {
        q: "Önceden bir hastalığım vardı, sigortalanır mıyım?",
        a: "Beyan zorunludur. Sigorta şirketi risk değerlendirmesi yapar; istisna, prim yüklemesi veya red uygulanabilir.",
      },
      {
        q: "Yurt dışında hastalanırsam?",
        a: "Yurt dışı teminatı varsa acil durumlar ve bazı planlı tedaviler limitler dahilinde karşılanır. Yoksa Seyahat Sağlık Sigortası yaptırmalısınız.",
      },
      {
        q: "ÖSS hangi yaşa kadar yapılabilir?",
        a: "Genellikle 0–65 yaş arası giriş; 70 yaş üstüne yeni poliçe açılmaz, mevcut poliçeler yenilenebilir.",
      },
      {
        q: "Şirket değiştirdiğimde kayıplarım olur mu?",
        a: "Bekleme süreleri sıfırdan başlayabilir, önceki rahatsızlıklar mevcut hastalık sayılabilir. Marer Sigorta uzmanları en avantajlı transfer şartlarını sizin için müzakere eder.",
      },
      {
        q: "Bebeğime tek başına sağlık sigortası yaptırabilir miyim?",
        a: "Evet. Doğumdan 15 gün sonra bebeğiniz için sağlık sigortası poliçesi yaptırabilirsiniz. Doğumdan hemen sonra poliçe başlatmanız halinde, bebeğiniz sigorta şirketleri açısından 'yeni doğan' statüsünde değerlendirilir ve bu sayede bazı teminat ve haklardan daha erken yararlanma imkânı elde eder.",
      },
    ],
    crossSell: [
      "tamamlayici-saglik-sigortasi",
      "seyahat-saglik-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
    ],
  },

  // 9
  {
    slug: "seyahat-saglik-sigortasi",
    short: "Seyahat Sağlık",
    card: "Seyahat Sağlık",
    cardDesc: "Yurt dışı vize ve seyahat güvencesi.",
    CardIcon: I.Plane,
    seo: {
      title: "Seyahat Sağlık Sigortası — Schengen Vize Uyumlu | Marer Sigorta",
      description:
        "Yurt dışı seyahatleriniz için 30.000 € teminatlı Schengen vize uyumlu seyahat sağlık sigortası. Online satın alın, dijital poliçe e-postanızda.",
      h1: "Seyahat Sağlık Sigortası — Sınırların Ötesinde de Güvende",
      keywords: [
        "seyahat sağlık sigortası",
        "schengen sigortası",
        "yurt dışı sağlık sigortası",
      ],
    },
    hero: {
      eyebrow: "Vize Onaylı",
      title: "Schengen vizesi onaylansın, tatiliniz huzurlu geçsin",
      subtitle:
        "Schengen, Amerika, Birleşik Krallık ve dünyanın her köşesinde geçerli, 30.000 € teminatlı seyahat sağlık sigortanızı saniyeler içinde online satın alın.",
      badges: [
        "Schengen ve diğer vize başvurularına uygun",
        "Karekodlu dijital poliçe",
        "Pandemi (COVID-19) dahil seçenek",
      ],
      Illustration: UndrawDestination,
    },
    nedir: {
      paragraphs: [
        "Seyahat Sağlık Sigortası, yurt dışı seyahatleriniz sırasında karşılaşabileceğiniz ani hastalık, kaza, bagaj kaybı, vize reddi gibi pek çok riske karşı sizi güvenceye alan kısa süreli bir sigorta türüdür.",
        "Schengen ülkeleri için minimum 30.000 € teminat zorunludur. ABD, Kanada, Japonya vize başvurularında istenir; Birleşik Krallık önerir.",
      ],
    },
    teminatlar: {
      title: "Ana Teminatlar",
      items: [
        {
          Icon: I.Hospital,
          title: "Acil Tıbbi Tedavi",
          desc: "Hastane, doktor, ameliyat, tedavi (30.000 € limit).",
        },
        {
          Icon: I.Heart,
          title: "İlaç Giderleri",
          desc: "Doktor reçetesiyle alınan ilaçlar.",
        },
        {
          Icon: I.HandHeart,
          title: "Tıbbi Nakil",
          desc: "En yakın sağlık merkezine veya Türkiye'ye sıhhi nakil.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Cenaze Nakli",
          desc: "Vefat durumunda cenazenin Türkiye'ye getirilmesi.",
        },
        {
          Icon: I.Doc,
          title: "Bagaj Kaybı/Gecikmesi",
          desc: "Havayolu kaynaklı bagaj sorunları.",
        },
        {
          Icon: I.Phone,
          title: "7/24 Asistans",
          desc: "Türkçe destek hattı, mesaj iletimi.",
        },
      ],
    },
    ekTeminatlar: {
      title: "Ek Teminatlar (Plana Göre)",
      items: [
        {
          Icon: I.Shield,
          title: "COVID-19 & Pandemi",
          desc: "Pandemik hastalık masrafları.",
        },
        {
          Icon: I.Search,
          title: "Vize Reddi",
          desc: "Vize reddedilirse konsolosluk ücretinin kısmi iadesi.",
        },
        {
          Icon: I.Handshake,
          title: "Kişisel Sorumluluk",
          desc: "Yurt dışında 3. şahıslara verilen zararlar.",
        },
        {
          Icon: I.Plane,
          title: "Uçuş Gecikmesi",
          desc: "Tarifeli uçuş rötarları için tazminat.",
        },
      ],
    },
    teminatDisi: [
      "Sigorta öncesi var olan kronik hastalıklar (rutin tedavi)",
      "Sürekli kullanılan ilaçlar",
      "Hamilelik ve doğum (genellikle 8. ay sonrası)",
      "Estetik ve kozmetik tedaviler",
      "Profesyonel spor ve tehlikeli aktiviteler",
      "Savaş, terör, BM yaptırım altındaki ülkeler",
      "70 yaş+ kaza dışı hastalıkları (ek prim ile)",
    ],
    comparison: {
      title: "Plan Türleri",
      headers: ["Plan", "Teminat", "Uygun Senaryo"],
      rows: [
        ["Schengen Standart", "30.000 € — Schengen", "Avrupa tatili, kısa ziyaret"],
        ["Avrupa Comfort", "50.000 € — Avrupa", "İş seyahati, kapsamlı tatil"],
        ["Dünya", "100.000+ $", "ABD, Asya, uzun mesafe"],
        ["Premium / VIP", "Yüksek limit + ek teminat", "İş insanları, lüks tatil"],
        ["Yıllık Çoklu", "Yıl içi tüm seyahatler", "Sık yurt dışı çıkanlar"],
      ],
    },
    faq: [
      {
        q: "Schengen vizem için hangi teminat?",
        a: "Schengen kuralları gereği minimum 30.000 €. Daha yüksek limitler kabul edilir.",
      },
      {
        q: "Vize başvurum reddedilirse paramı geri alır mıyım?",
        a: "Sadece Vize Reddi Teminatı poliçenizde varsa, konsolosluk harçlarınızın bir kısmı iade edilir.",
      },
      {
        q: "COVID-19 hastası olursam?",
        a: "Pandemi teminatı poliçenize eklenmişse evet. Çoğu modern poliçede standart olarak yer alır.",
      },
      {
        q: "Türkiye'ye acil dönüş gerekirse?",
        a: "Tıbbi nakil teminatı ile en yakın sağlık kurumuna veya Türkiye'ye nakliniz sağlanır.",
      },
      {
        q: "Avrupa'ya araba ile gidiyorum, Yeşil Kart yeter mi?",
        a: "Hayır. Yeşil Kart sadece karşı tarafa verdiğiniz zararı karşılar. Kendi sağlığınız için ayrıca Seyahat Sağlık Sigortası gerekir.",
      },
      {
        q: "70 yaş üstü için?",
        a: "Yapılır ancak kaza dışı hastalıklar kapsam dışıdır veya ek prim uygulanır.",
      },
    ],
    crossSell: [
      "yesil-kart-sigortasi",
      "ozel-saglik-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
    ],
  },

  // 10
  {
    slug: "ferdi-kaza-hayat-sigortasi",
    short: "Ferdi Kaza / Hayat",
    card: "Ferdi Kaza & Hayat",
    cardDesc: "Beklenmedik durumlara bireysel güvence.",
    CardIcon: I.HandHeart,
    seo: {
      title: "Ferdi Kaza & Hayat Sigortası | Marer Sigorta",
      description:
        "Ferdi kaza ve hayat sigortası ile beklenmeyen risklere karşı kendinizi ve ailenizi güvenceye alın. Vefat, maluliyet, tedavi teminatları, uygun primler.",
      h1: "Ferdi Kaza ve Hayat Sigortası — Sevdiklerinize Bir Söz",
      keywords: [
        "ferdi kaza sigortası",
        "hayat sigortası",
        "vefat teminatı",
        "maluliyet sigortası",
      ],
    },
    hero: {
      eyebrow: "Sevdikleriniz İçin",
      title: "Hayatın belirsizliklerine karşı bir söz",
      subtitle:
        "Beklenmedik bir kaza veya kayıp anında, sevdiklerinizin maddi geleceğini güvence altına alın. Marer Sigorta uzmanlarıyla size en uygun ferdi kaza veya hayat sigortasını birlikte belirleyelim.",
      badges: [
        "Uygun primlerle yüksek teminat",
        "Yurt dışında da geçerli",
        "Vergi avantajlı prim ödemesi",
      ],
      Illustration: UndrawAgreement,
    },
    nedir: {
      paragraphs: [
        "Ferdi Kaza Sigortası, sadece kaza tanımına giren olaylar sonucu meydana gelen vefat, sürekli sakatlık ve tedavi masraflarını teminat altına alır. Kaza, ani ve dışsal olaylardır: trafik, düşme, yanma, zehirlenme vb.",
        "Hayat Sigortası ise her türlü ölümü (kaza, hastalık, doğal nedenler) teminat altına alan daha kapsamlı bir vefat güvencesidir. Bazı planlarda birikim/tasarruf özelliği de bulunur. Banka kredisi kullananlar için genellikle istenen türdür.",
      ],
    },
    teminatlar: {
      title: "Ana Teminatlar",
      items: [
        {
          Icon: I.HandHeart,
          title: "Kaza Sonucu Vefat",
          desc: "Kaza sonucu vefatta yakınlarınıza tazminat.",
        },
        {
          Icon: I.Shield,
          title: "Sürekli Sakatlık",
          desc: "Kalıcı maluliyet durumunda maluliyet oranına göre tazminat.",
        },
        {
          Icon: I.Hospital,
          title: "Tedavi Masrafları",
          desc: "Kaza sonrası hastane, ameliyat, ilaç masrafları.",
        },
        {
          Icon: I.Coins,
          title: "İş Görememezlik",
          desc: "Çalışamadığınız her gün için gündelik tazminat.",
        },
        {
          Icon: I.Sparkle,
          title: "Tehlikeli Hastalıklar (Hayat)",
          desc: "Kanser, kalp krizi, felç gibi durumlarda toplu ödeme.",
        },
        {
          Icon: I.Handshake,
          title: "Asistans Hizmetleri",
          desc: "Konut, yol yardımı, tıbbi danışmanlık, sağlık indirimleri.",
        },
      ],
    },
    teminatDisi: [
      "Hastalık sonucu ölüm (ferdi kaza için)",
      "Kalp krizi, beyin kanaması (hastalık olarak)",
      "İntihar ve intihara teşebbüs (ilk 3 yıl)",
      "Savaş, terör, isyan",
      "Sigortalının kasıtlı tehlikeye atması",
      "Yüksek riskli sporlar (ek teminatla alınabilir)",
      "Alkol/uyuşturucu etkisi altında kazalar",
    ],
    comparison: {
      title: "Ferdi Kaza vs Hayat Sigortası",
      headers: ["Özellik", "Ferdi Kaza", "Hayat Sigortası"],
      rows: [
        ["Vefat teminatı kapsamı", "Sadece kaza", "Her türlü ölüm"],
        ["Hastalık sonucu vefat", "Kapsamda değil", "Kapsamda"],
        ["Tedavi masrafları", "Kaza sonrası var", "Genellikle yok"],
        ["Birikim/tasarruf", "Yok", "Bazı planlarda"],
        ["Prim seviyesi", "Düşük", "Daha yüksek"],
        ["Banka kredisi için", "Yeterli olmayabilir", "Genellikle istenir"],
      ],
    },
    fiyatKriterleri: [
      "Yaş ve cinsiyet",
      "Meslek (yüksek riskli meslekler ek prim)",
      "Teminat tutarı",
      "Plan tipi (risk / birikimli / kredi hayat)",
      "Sağlık beyanı",
      "Aile poliçesi indirim avantajı",
    ],
    faq: [
      {
        q: "Hayat sigortası mı, ferdi kaza mı yaptırmalıyım?",
        a: "Ailesine maddi destek bırakmak isteyenler hayat sigortası, aktif iş hayatındaki gençler ferdi kaza ile başlayabilir. İdealde her ikisi tamamlayıcıdır.",
      },
      {
        q: "Yurt dışında geçerli mi?",
        a: "Hem ferdi kaza hem hayat sigortası dünyanın her yerinde geçerlidir (savaş bölgeleri hariç).",
      },
      {
        q: "Hangi durumda en yakınım tazminat alır?",
        a: "Poliçede lehtar (yararlanıcı) belirlendiyse o kişi, belirlenmediyse kanuni varisler.",
      },
      {
        q: "İşim tehlikeliyse prim çok yüksek mi?",
        a: "Maden, yüksekte çalışma, patlayıcı madde gibi yüksek riskli mesleklerde ek prim veya istisna uygulanabilir.",
      },
      {
        q: "Konut kredim için hayat sigortası şart mı?",
        a: "Bankalar kredinin teminatı olarak hayat sigortası ister. Marer Sigorta bağımsız acente olarak size en uygun şartı bulur.",
      },
      {
        q: "65 yaş üstü için yapılır mı?",
        a: "Yapılır ancak primler yükselir. 65 yaş öncesi başlamak çok daha avantajlıdır.",
      },
    ],
    crossSell: [
      "ozel-saglik-sigortasi",
      "tamamlayici-saglik-sigortasi",
      "konut-sigortasi",
    ],
  },

  // 11 — KURUMSAL: NAKLİYAT SİGORTASI
  {
    slug: "nakliyat-sigortasi",
    short: "Nakliyat",
    card: "Nakliyat Sigortası",
    cardDesc: "Emtia, CMR ve taşıyıcı sorumluluk; ICC klozları ile tam koruma.",
    CardIcon: I.Truck,
    seo: {
      title: "Nakliyat Sigortası — Emtia, CMR, Taşıyıcı Sorumluluk | Marer Sigorta",
      description:
        "İthalat, ihracat ve yurt içi sevkiyatlarınız için ICC (A), (B), (C) klozlarıyla emtia nakliyat sigortası. Abonman poliçe, taşıyıcı sorumluluk, CMR. Uzman desteği.",
      h1: "Nakliyat Sigortası — Yükünüzün Çıkış Deposundan Varış Noktasına Sigortalı Yolculuk",
      keywords: [
        "nakliyat sigortası",
        "emtia sigortası",
        "ICC klozları",
        "CMR sigortası",
        "taşıyıcı sorumluluk",
        "abonman poliçe",
      ],
    },
    hero: {
      eyebrow: "Kurumsal — Uzman Danışmanlık",
      title: "Dünyanın her köşesine giden yükünüz Marer Sigorta güvencesinde",
      subtitle:
        "İthalat-ihracat, yurt içi sevkiyat ve fuar-sergi taşımalarınızda; Lloyd's standartlarındaki ICC klozlarıyla emtianızın çıkış deposundan varış noktasına kadar tüm risklerini güvence altına alın.",
      badges: [
        "ICC (A) — All Risks teminatına kadar tüm seçenekler",
        "Abonman poliçe ile %20–30 prim avantajı",
        "Lloyd's hasar acenteleri & yurt dışı eksper ağı",
      ],
      Illustration: UndrawDestination,
    },
    nedir: {
      paragraphs: [
        "Nakliyat Sigortası, ticari değeri olan malların (emtianın) kara, deniz, hava veya demir yolu ile bir yerden bir yere taşınması sırasında uğrayabileceği kayıp ve hasarları teminat altına alan sigorta türüdür.",
        "Teminat, mallar nakliyeciye teslim edildiği/araca yüklendiği anda başlar; alıcı malları teslim aldığında sona erer. Uluslararası standart olan Institute Cargo Clauses (ICC) çerçevesinde A, B veya C seviye teminat tercih edilebilir.",
      ],
      callout:
        "Yurt dışı sevkiyatlarda alıcı malları teslim almamışsa havayolu taşımalarında 30 gün, deniz/karayolu taşımalarında 60 gün boyunca gümrük depolarında bekleme süresi teminat kapsamındadır.",
    },
    teminatlar: {
      title: "Ana Teminat Seviyeleri",
      items: [
        {
          Icon: I.Shield,
          title: "ICC (A) — All Risks",
          desc: "En kapsamlı teminat; taşıma sırasındaki istisna dışı tüm kayıp ve hasarlar dahil.",
        },
        {
          Icon: I.AlertTriangle,
          title: "ICC (C) / Dar Teminat",
          desc: "Sadece nakil aracının kazalanması, yangın, infilak ve büyük doğal afetlerden kaynaklı hasarlar.",
        },
        {
          Icon: I.Bolt,
          title: "Tam Ziya Teminatı",
          desc: "Nakil aracının ve emtianın tamamen yok olması (hakiki/hükmi tam ziya).",
        },
        {
          Icon: I.Truck,
          title: "Karayolu Klozu",
          desc: "Kamyon Klozu — karayolu taşımalarında dar teminat eşdeğeri.",
        },
        {
          Icon: I.Plane,
          title: "ICC (Air) — Havayolu",
          desc: "Havayolu taşımalarında geniş teminat; Tam Ziya veya All Risks.",
        },
        {
          Icon: I.Package,
          title: "Müşterek Avarya",
          desc: "Deniz yolculuğunda kasten yapılan fedakarlık masraflarına katkı payı.",
        },
      ],
    },
    ekTeminatlar: {
      title: "Ek Teminatlar (Ek Primle Alınabilir)",
      items: [
        {
          Icon: I.Building,
          title: "Gümrük Depolarında Bekleme",
          desc: "Standart süreyi aşan bekleme süreleri için kapsam.",
        },
        {
          Icon: I.Handshake,
          title: "Aktarma & Güzergah Dışı",
          desc: "Çoklu aktarma riskleri ve güzergah dışı aktarma kapsamı.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Harp Teminatı",
          desc: "Savaş, terör, çatışma — sadece deniz ve hava taşımaları için.",
        },
        {
          Icon: I.Shield,
          title: "Grev / Lokavt / Halk Hareketleri",
          desc: "Toplumsal olaylar ve terör — tüm taşıma türlerinde verilebilir.",
        },
        {
          Icon: I.Sparkle,
          title: "Soğuk Zincir Hasarı",
          desc: "Gıda, ilaç ve sıcaklığa duyarlı yükler için özel kloz.",
        },
        {
          Icon: I.Coins,
          title: "%10 Artırım Marjı",
          desc: "Akreditifli işlemlerde standart kar marjı koruması.",
        },
        {
          Icon: I.Package,
          title: "Sergi / Fuar Teminatı",
          desc: "Etkinlik sırasında kalış süresince emtia koruması.",
        },
        {
          Icon: I.ArrowRight,
          title: "Gidiş-Dönüş & İade Sevkiyatı",
          desc: "Tek poliçede çift yön veya göndericiye geri dönüş.",
        },
      ],
    },
    teminatDisi: [
      "Sigortalının kasti hareketleri",
      "Ayb-ı zati — malın kendi bünyesinde meydana gelen hasarlar (örn. nemden bozulma)",
      "Yakın sebebi gecikme olan hasarlar (teslimat gecikmesi)",
      "Hatalı paketleme veya istifleme",
      "Yıkanma, çürüme, doğal eksilme",
      "Geminin sefere elverişsiz olması",
      "Nakliyecinin iflası ve mali çöküş",
      "Nükleer riskler",
      "Harp ve grev (ek teminatla alınabilir)",
    ],
    comparison: {
      title: "ICC (A) vs ICC (C) vs Tam Ziya",
      headers: ["Risk", "ICC (A)", "ICC (C) / Dar", "Tam Ziya"],
      rows: [
        ["Aracın kazası", "Var", "Var", "Sadece tam ziya"],
        ["Yangın, infilak", "Var", "Var", "Sadece tam ziya"],
        ["Hırsızlık", "Var", "Yok", "Yok"],
        ["Yükleme / boşaltma", "Var", "Yok", "Yok"],
        ["Islanma, eksilme", "Var", "Yok", "Yok"],
        ["Doğal afet", "Var", "Kısmen", "Yok"],
        ["Müşterek avarya", "Var", "Var", "Yok"],
        ["Prim seviyesi", "En yüksek", "Orta", "En düşük"],
      ],
      note: "Karayolunda ICC (C) yerine 'Kamyon Klozu', demiryolunda 'Demiryolu Klozu' uygulanır.",
    },
    limitTable: {
      title: "Poliçe Türleri & Sevkiyat Profili",
      headers: ["Poliçe Türü", "Kapsam", "Uygun Profil"],
      rows: [
        ["Münferit (Kati) Poliçe", "Tek sevkiyat için düzenlenir", "Düşük frekanslı sevkiyatlar"],
        ["Flotan (Geçici) Poliçe", "Yükleme bilgileri netleşmeden açılan ön poliçe", "Banka akreditifi ile çalışan ithalatçılar"],
        ["Abonman Sözleşmesi", "1 yıllık çerçeve — tüm sevkiyatlar otomatik kapsamda", "Aylık 20+ sevkiyat yapan firmalar"],
        ["Blok Abonman", "Yıllık taşıma cirosu tek seferde bildirilir", "Çok yüksek hacimli ihracatçılar / e-ticaret"],
      ],
      note: "Abonman sözleşmesinde sevkiyat başına %20–30 prim avantajı sağlanabilir.",
    },
    fiyatKriterleri: [
      "Emtia cinsi ve özellikleri (kırılgan, soğuk zincir, tehlikeli madde vb.)",
      "Taşıma şekli (kara, deniz, hava, demiryolu) ve güzergah",
      "Sigorta bedeli (CIF + %10 marj akreditifli işlemlerde)",
      "Seçilen ICC kloz seviyesi (A / B / C / Tam Ziya)",
      "Sevkiyat hacmi ve frekansı (abonman / blok abonman avantajı)",
      "Aracın tipi, yaşı ve bayrak ülkesi",
      "Geçmiş hasar performansı",
      "Ek teminatlar (harp, grev, soğuk zincir, bekleme süresi vb.)",
    ],
    hasarSureci: [
      "Hasarı tespit ettiğinizde en geç 5 iş günü içinde sigorta şirketine ve eksperinize bildirin.",
      "Tahliye sırasında hasar tespit edilirse tahliye tutanağı, gümrükte alımda gümrük tutanağı tutulur.",
      "Yurt dışı hasarlarda Lloyd's hasar acenteleri devreye girer; yerel eksper saha incelemesi yapar.",
      "Evraklar: poliçe, fatura, çeki listesi, konşimento, navlun faturası, fotoğraflar, tazminat talep dilekçesi.",
      "Eksper raporu sonrası genellikle 30–45 gün içinde tazminat ödenir.",
    ],
    faq: [
      {
        q: "ICC (A), (B), (C) klozları arasındaki fark nedir?",
        a: "(A) en geniş kapsamdır — All Risks. (C) en dar — sadece aracın kazasında çalışan kapsam. (B) günümüzde Türkiye'de pek tercih edilmez. Karayolunda (C) yerine 'Kamyon Klozu' kullanılır.",
      },
      {
        q: "Yurt dışında hasar olursa Türkiye'den nasıl takip ederim?",
        a: "Sigorta şirketinin Lloyd's hasar acenteleri ağı sayesinde dünyanın her ülkesinde yerel eksper devreye girer. Türkiye'deki acentenize bildirin, süreç otomatik başlar.",
      },
      {
        q: "Akreditifli ithalat için flotan poliçe şart mı?",
        a: "Bankalar akreditif açılışında genellikle flotan poliçe ister; yükleme bilgileri henüz net değildir. Yükleme gerçekleşince kati poliçeye dönüştürülür.",
      },
      {
        q: "Aynı yıl içinde çok sayıda sevkiyat yapıyoruz, her birine ayrı poliçe yapmak zorunda mıyız?",
        a: "Hayır. Abonman sözleşmesi ile yıllık çerçeve oluşturulur; her sevkiyat otomatik kapsama girer ve %20–30 prim avantajı sağlanır.",
      },
      {
        q: "Sigortalanması gereken sigorta bedeli ne olmalıdır?",
        a: "Fatura bedeli + navlun + sigorta + diğer masraflar (CIF değeri). Akreditifli işlemlerde genellikle CIF bedelinin %10 fazlası sigortalanır.",
      },
      {
        q: "Karayolu taşımasında harp teminatı alabilir miyim?",
        a: "Hayır. Harp teminatı sadece deniz ve hava yolu için verilir. Karayolu ve demiryolunda yalnızca Grev / Halk Hareketleri / Terör teminatı verilebilir.",
      },
      {
        q: "Müşterek avarya nedir, sigortamla ilgisi var mı?",
        a: "Deniz yolculuğunda gemi ve yükü tehdit eden bir tehlikeden korumak için kasten yapılan masraf veya fedakarlık. Tüm yük sahipleri orantılı katkıda bulunur. ICC (A) ve (C) teminatları bunu kapsar.",
      },
      {
        q: "Bir poliçe içerisinde hem yurt içi hem yurt dışı sevkiyat olabilir mi?",
        a: "Evet. Abonman poliçesi içinde tüm sevkiyat türleri tek çatı altında toplanabilir.",
      },
      {
        q: "CMR Sigortası nedir, ne zaman gerekir?",
        a: "Uluslararası karayolu taşımacılığında taşıyıcının mali sorumluluğunu CMR Konvansiyonu çerçevesinde teminat altına alır. Yurt dışına ihracat yapan yerli nakliyeciler için fiilen zorunludur.",
      },
    ],
    crossSell: [
      "kobi-isyeri-sigortasi",
      "muhendislik-sigortalari",
      "yat-tekne-sigortasi",
    ],
  },

  // 12 — KURUMSAL: YAT VE TEKNE SİGORTASI
  {
    slug: "yat-tekne-sigortasi",
    short: "Yat / Tekne",
    card: "Yat ve Tekne Sigortası",
    cardDesc: "Institute Yacht Clauses standardında deniz, marina ve çekek dahil tam koruma.",
    CardIcon: I.Boat,
    seo: {
      title: "Yat ve Tekne Sigortası — Institute Yacht Clauses Kapsamında | Marer Sigorta",
      description:
        "Tekne ve yatınızı uluslararası Institute Yacht Clauses standardında sigortalayın. Deniz, çekek, marina, transfer dahil tüm risklere karşı tam koruma.",
      h1: "Yat ve Tekne Sigortası — Mavi Sulara Huzurla Açılın",
      keywords: [
        "yat sigortası",
        "tekne sigortası",
        "institute yacht clauses",
        "IYC",
        "deniz aracı sigortası",
      ],
    },
    hero: {
      eyebrow: "Kurumsal — Özel Risk Tasarımı",
      title: "Teknenize ve sevdiklerinize, mavinin tehlikelerinden sigortalı bir yolculuk",
      subtitle:
        "Uluslararası geçerli Institute Yacht Clauses 1.11.85 (Cl.328) kapsamında; teknenizin gövdesinden makinesine, servis botundan donanımına kadar tüm değerlerinizi denizde, çekekte, marinada güvence altına alın.",
      badges: [
        "Institute Yacht Clauses standartlı",
        "7/24 Yat Asistans Hizmeti",
        "Avrupa marinaları dahil global teminat",
      ],
      Illustration: UndrawAirport,
    },
    nedir: {
      paragraphs: [
        "Yat ve Tekne Sigortası, özel veya ticari amaçla kullanılan deniz araçlarını uluslararası geçerli Institute Yacht Clauses (IYC) standardı çerçevesinde, çok geniş bir risk yelpazesine karşı teminat altına alan kasko türü bir sigortadır.",
        "Teminat; seyir halinde, yatma mahallinde (liman / marina / duba), çekek yerinde, çekek yerine indirilirken/çekilirken, karada tamirde, kış saklamasında ve tehlikedeki başka bir tekneyi çekerken geçerlidir.",
      ],
      callout:
        "Marinada da olsa tekneniz pek çok riskle karşı karşıyadır — komşu teknede çıkan bir yangın sizin teknenize sıçrayabilir. Bağlama yeri bile sigorta gerektirir.",
    },
    teminatlar: {
      title: "Institute Yacht Clauses Kapsamındaki Ana Teminatlar",
      items: [
        {
          Icon: I.Boat,
          title: "Deniz Kazaları ve Tehlikeleri",
          desc: "Fırtına, hortum, yıldırım, çarpma, karaya oturma, alabora, batma, dalga darbeleri.",
        },
        {
          Icon: I.Bolt,
          title: "Yangın, Patlama, Doğal Afet",
          desc: "Yangın, infilak, denize mal atılması, deprem, volkanik patlama, yıldırım.",
        },
        {
          Icon: I.Lock,
          title: "Hırsızlık ve Kötü Niyetli Hareketler",
          desc: "Teknenin / makinelerin / dıştan takma motorun çalınması, vandalizm, korsanlık.",
        },
        {
          Icon: I.Handshake,
          title: "3. Şahıs Sorumluluk",
          desc: "Yatın sebep olduğu kaza neticesinde 3. kişilerin can ve mal kayıpları, enkaz kaldırma.",
        },
        {
          Icon: I.Anchor,
          title: "Liman / Rıhtım Teması",
          desc: "Rıhtım, liman teçhizatı, kara/hava taşıtları ile temas veya bunlardan düşen şeyler.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Gizli Kusur Patlamaları",
          desc: "Tekne ve makinedeki gizli kusurlar nedeniyle patlamalar; kaptan ve gemi adamlarının barataryası.",
        },
      ],
    },
    ekTeminatlar: {
      title: "Ek Teminatlar (Ek Primle Alınabilir)",
      items: [
        {
          Icon: I.Wrench,
          title: "Makine Hasarı Genişletme (Cl.332)",
          desc: "Motor, elektronik cihaz arızaları, voltaj dalgalanmaları — IYC standartında bulunmaz.",
        },
        {
          Icon: I.Star,
          title: "Yarış Rizikosu (Cl.330)",
          desc: "Tekne yarışları sırasındaki hasarlar; yelken dahil — yelkenli yat yarışları için zorunlu.",
        },
        {
          Icon: I.Package,
          title: "Kişisel Eşya (Cl.331)",
          desc: "Tekne içindeki kişisel eşyaların zararı; standart poliçede kişisel eşya dahil değildir.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Savaş & Grev Klozları (Cl.329)",
          desc: "Savaş, terör, grev, halk hareketleri — Doğu Akdeniz gibi rotalar için kritik.",
        },
        {
          Icon: I.Globe,
          title: "Yurt Dışı Teminatı",
          desc: "Avrupa marinaları dahil — Yunan adaları, İtalya, Hırvatistan rotaları.",
        },
        {
          Icon: I.Sparkle,
          title: "Çevre Kirliliği",
          desc: "Yakıt sızıntısı, petrol kirliliği; ticari tekneler için kritik.",
        },
        {
          Icon: I.HandHeart,
          title: "Kaptan & Mürettebat Ferdi Kaza",
          desc: "Kaptan ve miçolar için yıllık vefat / maluliyet teminatı.",
        },
        {
          Icon: I.Shield,
          title: "Çekme / Kurtarma",
          desc: "Yıllık limit dahilinde tüm çekme ve kurtarma organizasyonları.",
        },
      ],
    },
    teminatDisi: [
      "Sigortacı onayı olmadan yapılan ciddi tadilatlar",
      "Sigortacı onayı olmadan yatın deniz evi olarak kullanılması",
      "Sigortalının kasten verdiği zararlar",
      "Yelken ve kılıflarının rüzgardan yırtılması (özel teminat olmazsa)",
      "Yarışırken yelken, direk, seren ve çarmıh hasarları (Yarış Klozu olmazsa)",
      "Dıştan takma motorun düşmesi veya denize yuvarlanması (özel teminat olmazsa)",
      "Mutad olmadıkça yedekte çekilme veya başka tekneyi çekme",
      "Su kayağı, sörf gibi su sporları sırasındaki sorumluluklar",
      "Kira mahrumiyeti (özel teminat olmazsa)",
      "Aşınma, paslanma, normal kullanımdan kaynaklı hasarlar",
      "Yatın dizayn / konstrüksiyon hatalarının giderilme maliyetleri",
      "17 mil/saat üzeri tekneler için Speedboat Klozu istisnaları (motor, dümen, şaft, elektrik)",
    ],
    fiyatKriterleri: [
      "Tekne sigorta bedeli (kasko değeri) — Ana belirleyici",
      "Tekne tipi (motoryat / yelkenli / sürat botu / katamaran)",
      "Tekne yaşı — 15 yaş üstü için ön gözetim (survey) istenebilir",
      "Bayrak ülkesi",
      "Bağlama yeri (marina) — Profesyonel marinalar düşük risk",
      "Seyrüsefer sahası (Türkiye iç suları / Akdeniz / Atlantik)",
      "Kullanım amacı (özel / ticari / mavi tur / yarış)",
      "Hız kategorisi — 17+ mil için Speedboat Klozu",
      "Hasar geçmişi ve kaptan / mürettebat bilgisi",
    ],
    faq: [
      {
        q: "Tekne sigortası zorunlu mu?",
        a: "Türk mevzuatında zorunlu değildir. Ancak finansmanla satın alınan teknelerde banka şart koşar, yabancı marinalarda giriş için sigorta belgesi istenir. Yunanistan gibi bazı ülkeler Zorunlu Sorumluluk Teminatı talep eder.",
      },
      {
        q: "Sigortam yurt dışında geçerli mi?",
        a: "Poliçenizde yazılı seyrüsefer sahası kapsamındaki ülkelerde geçerlidir. Avrupa marinaları için yurt dışı teminatı ek olarak alınmalıdır.",
      },
      {
        q: "Yurt dışı kayıtlı teknemi Türkiye'de sigortalatabilir miyim?",
        a: "Evet. Türk sigorta şirketleri yabancı bayraklı tekneler için de poliçe düzenleyebilir.",
      },
      {
        q: "Teknemi başkası kullansa sigorta geçerli olur mu?",
        a: "Tekne kayıt sahibi adına sigortalıdır. Sigortalı dışında tekne kullanımına yetkin biri (eş, çocuk, profesyonel kaptan) tarafından kullanıldığı ve poliçede belirtildiği sürece sorun olmaz.",
      },
      {
        q: "Kış aylarında tekne çekekteyken sigortam ne olur?",
        a: "Çekek yeri poliçenin coğrafi alanı içinde yer alır. Sigortacıya çekek yeri bilgisi verilirse teminat orada da geçerlidir. Çekekte de risk olduğu için poliçeyi dondurmak yerine açık tutmak tavsiye edilir.",
      },
      {
        q: "Motor arızası sigortamdan ödenir mi?",
        a: "Standart IYC'de makine arızaları teminat altında değildir. Makine Hasarı Genişletme Klozu (Cl.332) ek olarak alınmalıdır.",
      },
      {
        q: "Teknemin tadilatı veya bayrak değişikliği yapacağım, sigortayı haberdar etmeli miyim?",
        a: "Kesinlikle evet. Hem büyük tadilatlar hem bayrak değişiklikleri sigorta şirketine bildirilmek zorundadır. Aksi halde sigorta geçersiz kalabilir.",
      },
      {
        q: "Çevre kirliliği teminatı standart mı?",
        a: "Hayır. Yat poliçelerinde çevre kirliliği standart kapsam değildir. Yakıt sızıntısı vb. için ek olarak alınmalıdır — özellikle ticari tekneler için kritik.",
      },
      {
        q: "Krediyle teknem var, sigorta zorunlu mu?",
        a: "Evet. Tekne finansmanı veren bankalar dain-i mürtehin kaydı ile sigorta yapılmasını şart koşar.",
      },
      {
        q: "Ön gözetim (survey) ne zaman istenir?",
        a: "15 yaş üstü tekneler veya yüksek değerli yatlar için sigorta şirketi uzman bir survey'or'ün tekneyi inceleyip raporlaması talep edebilir.",
      },
    ],
    crossSell: [
      "seyahat-saglik-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
      "nakliyat-sigortasi",
    ],
  },

  // 13 — KURUMSAL: MÜHENDİSLİK SİGORTALARI
  {
    slug: "muhendislik-sigortalari",
    short: "Mühendislik",
    card: "Mühendislik Sigortaları",
    cardDesc: "İnşaat, montaj, makine kırılması ve elektronik cihaz — proje yaşam döngüsünde tam koruma.",
    CardIcon: I.Wrench,
    seo: {
      title: "Mühendislik Sigortaları — İnşaat (CAR), Montaj (EAR), Makine, Elektronik | Marer Sigorta",
      description:
        "İnşaat All Risk (CAR), Montaj All Risk (EAR), Makine Kırılması ve Elektronik Cihaz Sigortaları. Müteahhit, fabrika, enerji projeleri için tam mühendislik güvencesi.",
      h1: "Mühendislik Sigortaları — Projelerinizin Görünmeyen Mühendisi",
      keywords: [
        "mühendislik sigortası",
        "inşaat all risk",
        "CAR sigortası",
        "montaj all risk",
        "EAR sigortası",
        "makine kırılması",
        "elektronik cihaz sigortası",
      ],
    },
    hero: {
      eyebrow: "Kurumsal — Risk Mühendisliği",
      title: "Sermayenizi, işgücünüzü ve zamanı görünmeyen risklerden koruyun",
      subtitle:
        "İnşaattan montaja, makineden elektronik cihaza; projelerinizin başlangıcından işletmeye alınmasına kadar tüm aşamalarda Marer Sigorta mühendislik çözümleri yanınızda.",
      badges: [
        "Sektör uzmanı risk mühendisleri",
        "Uluslararası reasürans desteği (Munich Re, Swiss Re standartları)",
        "Anlaşmalı eksperler ile saha desteği",
      ],
      Illustration: UndrawSecureServer,
    },
    nedir: {
      paragraphs: [
        "Mühendislik Sigortaları; inşaat, montaj, makine ve elektronik cihazlarla ilgili faaliyetler sırasında karşılaşılabilecek ani ve beklenmedik tüm riskleri teminat altına alan, uzmanlık gerektiren bir sigorta dalıdır.",
        "Dört ana ürün şu şekildedir: İnşaat All Risks (CAR — Construction All Risks), Montaj All Risks (EAR — Erection All Risks), Makine Kırılması ve Elektronik Cihaz Sigortası. Bu ürünler genellikle proje yaşam döngüsünde birlikte ya da paket olarak sunulur.",
      ],
      callout:
        "Proje akışı: İnşaat (CAR) → Montaj (EAR) → İşletmeye alma (Makine Kırılması + Elektronik Cihaz + Yangın). Aralarda boşluk kalırsa kritik dönemde teminatsız kalınabilir.",
    },
    teminatlar: {
      title: "4 Ana Mühendislik Sigortası Ürünü",
      items: [
        {
          Icon: I.Crane,
          title: "İnşaat All Risks (CAR)",
          desc: "Yapı işleri, geçici işler, inşaat makineleri ve şantiye malzemelerinin tüm riskleri. Şantiye hazırlığından geçici kabule kadar.",
        },
        {
          Icon: I.Factory,
          title: "Montaj All Risks (EAR)",
          desc: "Makine, ekipman ve tesislerin montaj/kurulum aşamasındaki tüm hasarlar. Test ve deneme devresi dahil.",
        },
        {
          Icon: I.Wrench,
          title: "Makine Kırılması",
          desc: "İşletmedeki makinelerin işletme hatası, mekanik/elektriksel arıza, iç patlama ve operasyonel hasarları.",
        },
        {
          Icon: I.Chip,
          title: "Elektronik Cihaz",
          desc: "Bilgisayar, sunucu, tıbbi cihaz, PLC, kamera sistemleri — voltaj dalgalanması, kısa devre, su zararları.",
        },
        {
          Icon: I.Building,
          title: "3. Şahıs Mali Mesuliyet",
          desc: "Komşu binalara, yoldan geçenlere, üçüncü kişilere şantiyeden / montajdan kaynaklı zararlar.",
        },
        {
          Icon: I.Shield,
          title: "Bakım Devresi Teminatı",
          desc: "Geçici kabul sonrası 12–24 ay ek koruma; müteahhitin sözleşme sorumluluğu için kritik.",
        },
      ],
    },
    ekTeminatlar: {
      title: "Ek Teminatlar (Modüler Yapı)",
      items: [
        {
          Icon: I.HandHeart,
          title: "İşveren Mali Sorumluluk",
          desc: "Şantiye / fabrika çalışanlarına karşı yasal sorumluluk.",
        },
        {
          Icon: I.Home,
          title: "Hazır İşler (Mevcut Bina)",
          desc: "Tadilat projelerinde mevcut yapının korunması.",
        },
        {
          Icon: I.Coins,
          title: "MLOP — Kar Kaybı",
          desc: "Makine Loss of Profit: arızadan kaynaklı üretim durması ve kar kaybı.",
        },
        {
          Icon: I.Sparkle,
          title: "Veri Kurtarma & Yeniden Yükleme",
          desc: "Elektronik cihaz sigortasında veri kaybı için kritik.",
        },
        {
          Icon: I.Package,
          title: "Yedek Cihaz / Parça Kiralama",
          desc: "Onarım sürecinde geçici çözüm maliyetleri ve ekspres yedek parça.",
        },
        {
          Icon: I.Globe,
          title: "Çevre Yapılarına Zarar",
          desc: "Komşu binaların su sızması, çatlak, çökme türü zararları.",
        },
        {
          Icon: I.Doc,
          title: "Plan & Proje Hataları (LEG Klozları)",
          desc: "Tasarımdaki kusurların inşaata yansıyan zararı; LEG-1/2/3 seçenekleri.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Sözleşme Cezaları",
          desc: "Kontratta gecikme cezası varsa montaj projelerinde kritik teminat.",
        },
      ],
    },
    teminatDisi: [
      "Sözleşme cezaları, kar kaybı, kira kaybı (özel ek teminat gerekir)",
      "Aşınma, paslanma, normal yıpranma",
      "Dizayn hatalarının giderilme maliyeti (zararın kendisi karşılanır)",
      "Hatalı işçilikten kaynaklanan yeniden inşa maliyeti",
      "Üreticinin garanti kapsamındaki arızalar",
      "Periyodik bakım kapsamındaki değişimler",
      "Belge, plan, model kaybı; para, kıymetli evrak, çek",
      "Estetik kusurlar (boya, çizik vb.)",
      "Yazılım hataları (cyber sigortası kapsamında olabilir)",
      "Savaş, nükleer riskler",
      "Sigortalının kasti hareketleri",
    ],
    fiyatKriterleri: [
      "Proje değeri / sigorta bedeli (proje bitiminde ulaşılacak nihai değere eşit)",
      "Proje tipi (konut / ticari / endüstriyel / enerji / altyapı)",
      "Proje süresi ve bakım devresi uzunluğu",
      "Şantiye / saha güvenlik önlemleri (çevre çiti, kamera, bekçi)",
      "Müteahhitin tecrübesi ve geçmiş hasar performansı",
      "Coğrafi konum ve doğal afet risk profili",
      "Seçilen ek teminatlar (3. şahıs, işveren MMS, LEG, MLOP vb.)",
      "Reasürans gerekliliği (büyük projelerde Lloyd's / Munich Re destekli)",
    ],
    nasilYaptirilir: [
      {
        title: "İlk Görüşme",
        desc: "Proje detayları, sigorta bedeli ve süreyle ilgili ön değerlendirme.",
      },
      {
        title: "Risk Anketi",
        desc: "Detaylı soru formu ile proje ve şantiye riskleri haritalanır.",
      },
      {
        title: "Saha Ziyareti",
        desc: "Büyük projelerde mühendis incelemesi ve risk raporu hazırlanır.",
      },
      {
        title: "Çoklu Şirket Teklifi",
        desc: "4–5 sigortacının teklifi karşılaştırılarak en uygun çözüm üretilir.",
      },
      {
        title: "Poliçe Tasarımı & Süreç Takibi",
        desc: "Projeye özel klozlar; keşif artışı, ek teminat ve zeyilname takibi.",
      },
    ],
    hasarSureci: [
      "Anında bildirim (en geç 5 iş günü içinde).",
      "Sigorta şirketince eksper atanması — büyük hasarlarda uluslararası eksper devreye girer.",
      "Saha incelemesi ve hasar tutanağının düzenlenmesi.",
      "Onarım tekliflerinin alınması ve eksper raporunun tamamlanması.",
      "Tazminat ödemesi — evrak ve onarım sürecine bağlı olarak ortalama 30–60 gün.",
    ],
    faq: [
      {
        q: "İnşaat sigortası ne zaman başlamalı?",
        a: "Şantiye hazırlık aşamasında veya en geç zemin tesviyesi başlamadan. Geç başlatılan poliçelerde önceki riskler kapsam dışı kalır.",
      },
      {
        q: "Müteahhit ve işveren arasında kim sigortalayacak?",
        a: "Genellikle müteahhit sigortalar çünkü inşaat sahası kontrolü ondadır. Ancak sözleşmede aksi belirtilebilir; işveren de sigortalayabilir veya lehtar olabilir.",
      },
      {
        q: "Proje süresi uzarsa ne olur?",
        a: "Zeyilname (ek sözleşme) ile süre uzatılır, ek prim alınır. Bildirilmemesi durumunda teminat boşluğu oluşur.",
      },
      {
        q: "Keşif artışı oldu, ne yapmalıyım?",
        a: "Mutlaka sigortacıya bildirin. Sigorta bedelinin artış kadar yükseltilmesi gerekir; aksi halde eksik sigorta nedeniyle orantılı kesinti yapılır.",
      },
      {
        q: "Geçici kabul yapıldı, sigortam bitti mi?",
        a: "Standart poliçede evet. Ancak Bakım Devresi Teminatı ile 12–24 ay daha uzatılabilir. Müteahhit sözleşme sorumluluğu için bu kritik.",
      },
      {
        q: "Mevcut binam var, üzerine kat çıkıyorum; sigorta nasıl?",
        a: "'Hazır İşler (Mevcut Bina)' Teminatı alınmalı. Aksi halde tadilat sırasında mevcut bina hasar görürse karşılanmaz.",
      },
      {
        q: "Şantiyemde hırsızlık oldu, kapsamda mı?",
        a: "Evet — İnşaat All Risks hırsızlığı kapsar. Ancak şantiye etrafında güvenlik önlemleri (çevre çiti, gece bekçisi, kamera) alınmış olması beklenir.",
      },
      {
        q: "Makinem yeni alındı, makine kırılması mı, garantisi mi geçerli?",
        a: "Üretici garantisi öncelikli. Garanti dışı kalan ani arızalar için Makine Kırılması Sigortası devreye girer.",
      },
      {
        q: "Yangın sigortam var, Elektronik Cihaz Sigortasına gerek var mı?",
        a: "Yangın sigortası sadece yangın, yıldırım, infilak kaynaklı hasarları öder. Voltaj dalgalanması, kısa devre, dahili elektronik arızalar yangın sigortasının kapsamı dışındadır.",
      },
      {
        q: "Makine kırılmasından kaynaklı üretim durması karşılanır mı?",
        a: "Standart Makine Kırılması poliçesi sadece cihazın tamir / yenileme maliyetini öder. Üretim durması / kar kaybı için MLOP (Machine Loss of Profit) ek teminatı gereklidir.",
      },
    ],
    crossSell: [
      "kobi-isyeri-sigortasi",
      "nakliyat-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
    ],
  },

  // 14 — KURUMSAL: FİLO YÖNETİMİ SİGORTASI
  {
    slug: "filo-yonetimi-sigortasi",
    short: "Filo Yönetimi",
    card: "Filo Yönetimi Sigortası",
    cardDesc:
      "Şirket araçlarınızı tek poliçede; toplu alım avantajı, merkezi yönetim ve sektörel özelleştirme.",
    CardIcon: I.Fleet,
    seo: {
      title:
        "Filo Yönetimi Sigortası 2026 — Kurumsal Araç Sigortası | Marer Sigorta",
      description:
        "Şirket filonuzu tek poliçede güvence altına alın. Kasko, trafik, İMM, yol yardım ve sektörel özelleştirme. Bağımsız acente ile toplu alım avantajı.",
      h1: "Filo Yönetimi Sigortası — Şirket Araçlarınızın Tüm Risklerini Tek Çatı Altında",
      keywords: [
        "filo yönetimi sigortası",
        "filo kasko",
        "kurumsal araç sigortası",
        "şirket araç sigortası",
        "lojistik sigortası",
        "toplu kasko",
        "fleet insurance",
      ],
    },
    hero: {
      eyebrow: "Kurumsal — Toplu Araç Sigortası",
      title: "Filonuzdaki her araç, tek poliçenin gücü ile güvende",
      subtitle:
        "İster 5, ister 500 araçlı bir filoya sahip olun; bağımsız acente avantajımızla 30+ sigorta şirketinden alınan tekliflerle filonuza özel maliyet, teminat ve hizmet kalitesini garanti ediyoruz.",
      badges: [
        "%30'a varan toplu alım indirimi",
        "Tek yenileme tarihi, merkezi yönetim",
        "7/24 yol yardım, anlaşmalı servis ağı",
      ],
      Illustration: UndrawByMyCar,
    },
    nedir: {
      paragraphs: [
        "Filo Yönetimi Sigortası, bir işletmenin sahip olduğu birden fazla aracın tek bir poliçe altında sigortalanmasını sağlayan, kurumsal segmente özel bir araç sigortası ürünüdür.",
        "Bireysel kasko ve trafik sigortalarının aksine; toplu alım gücü, merkezi yönetim ve filo özel hizmetler sunar. Sigorta sektöründe genellikle 3 veya daha fazla araca sahip işletmeler filo kapsamına alınır.",
      ],
      callout:
        "5 araçlı bir satış ekibi ile 150 araçlı bir lojistik şirketi aynı yapıyı kullanamaz — araç sayısı, sektör ve operasyonel ihtiyaca göre kurguluyoruz.",
    },
    teminatlar: {
      title: "Ana Teminatlar (Standart Filo Paketi)",
      items: [
        {
          Icon: I.CarShield,
          title: "Kasko (Çarpma + Yangın + Hırsızlık)",
          desc: "Çarpma, çarpışma, devrilme, yangın, infilak, yıldırım, hırsızlık ve vandalizm teminatları.",
        },
        {
          Icon: I.Car,
          title: "Zorunlu Trafik (ZMSS)",
          desc: "Her araç için yasal zorunlu trafik sigortası; 3. şahıs maddi ve bedeni zararlar filo poliçesine entegre.",
        },
        {
          Icon: I.Shield,
          title: "İhtiyari Mali Mesuliyet (İMM)",
          desc: "Zorunlu trafik limitlerini aşan yüksek tazminat taleplerine karşı ek koruma. Min. 1.000.000 TL önerilir.",
        },
        {
          Icon: I.HandHeart,
          title: "Koltuk Ferdi Kaza",
          desc: "Sürücü ve yolcular için vefat, sürekli sakatlık ve tedavi masrafları.",
        },
        {
          Icon: I.Doc,
          title: "Hukuksal Koruma",
          desc: "Trafik kazalarında avukat ücretleri, mahkeme masrafları ve cezai davalarda savunma desteği.",
        },
        {
          Icon: I.Wrench,
          title: "7/24 Yol Yardım",
          desc: "Çekici, akü takviyesi, yakıt ulaşımı, lastik değişimi ve anahtar açma hizmetleri.",
        },
      ],
    },
    ekTeminatlar: {
      title: "Ek Teminatlar (Filo'ya Özel)",
      items: [
        {
          Icon: I.Quake,
          title: "Doğal Afet",
          desc: "Sel, deprem (ve deprem sonucu yangın), dolu, fırtına, heyelan, volkanik patlama.",
        },
        {
          Icon: I.Sparkle,
          title: "Mini Onarım",
          desc: "Çizik / ezik gibi küçük kaporta-boya hasarları; hasarsızlık indirimi bozulmaz.",
        },
        {
          Icon: I.Car,
          title: "İkame Araç",
          desc: "Onarım süresince yedek araç (7 / 15 / 30 günlük seçenekler).",
        },
        {
          Icon: I.Globe,
          title: "Yurt Dışı Teminatı",
          desc: "Avrupa ve seçili ülkelerde geçerli; TIR şoförleri için CMR ile kombinli.",
        },
        {
          Icon: I.Package,
          title: "Kişisel Eşya / Taşınan Yük",
          desc: "Araç içi laptop, evrak, numune ve taşınan ticari mal teminatı.",
        },
        {
          Icon: I.Coins,
          title: "Gelir Kaybı Teminatı",
          desc: "Araç hasarda kaldığı sürede kazanılamayan günlük gelir — taksi / kurye / kiralama filoları için.",
        },
        {
          Icon: I.Bolt,
          title: "Telematik İndirimi",
          desc: "Telematik cihazla sürüş verisi paylaşımı: %30'a varan prim indirimi ve sürücü performans raporları.",
        },
        {
          Icon: I.AlertTriangle,
          title: "Anahtar / Yanlış Yakıt / Terör",
          desc: "Anahtar kaybı veya çalınması, yanlış akaryakıt dolumu ve terör saldırıları teminatı.",
        },
      ],
    },
    teminatDisi: [
      "Sigortalının kasti hareketleri",
      "Alkol veya uyuşturucu etkisinde araç kullanımı",
      "Ehliyetsiz sürücünün kullandığı araç",
      "Yarış, iddia veya hız denemelerine katılma",
      "Poliçede belirtilen kullanım amacı dışı kullanım",
      "Savaş, iç savaş ve nükleer riskler",
    ],
    fiyatKriterleri: [
      "Filo hasar / prim oranı (en kritik faktör)",
      "Filodaki araç sayısı (3-10 / 11-25 / 26-50 / 50+)",
      "Faaliyet sektörü (lojistik, kiralama, satış, kurye, inşaat …)",
      "Araç profili (marka, model, yaş, motor hacmi, yakıt türü)",
      "Seçilen teminatlar ve muafiyet oranı",
      "Coğrafi bölge ve kullanım yoğunluğu",
      "Sürücü profilleri ve eğitim seviyesi",
      "Telematik cihaz kullanımı ve ödeme planı (peşin / taksit)",
    ],
    nasilYaptirilir: [
      {
        title: "Filo Bilgileri",
        desc: "Araç sayısı, sektör, mevcut yenileme tarihi ve hasar geçmişi değerlendirilir.",
      },
      {
        title: "Risk Analizi",
        desc: "Sürücü profilleri, kullanım rotaları ve özel ihtiyaçlar için detaylı analiz.",
      },
      {
        title: "Çoklu Şirket Teklifi",
        desc: "30+ sigorta şirketinden alınan teklifler karşılaştırılarak en uygunu sunulur.",
      },
      {
        title: "Özel Klozlar",
        desc: "Sektörünüze özel teminatlar (CMR, soğutucu, telematik vb.) tasarlanır.",
      },
      {
        title: "Filo Poliçesi & Takip",
        desc: "Tek poliçe, tek yenileme; sonradan zeyilname ile araç ekleme / çıkarma anında.",
      },
    ],
    faq: [
      {
        q: "Kaç araçtan itibaren filo sigortası yapılabilir?",
        a: "Genellikle 3 araçtan itibaren filo sigortası uygulanır. Bazı şirketler 2 araç yapısını da kabul eder; 5+ araçta gerçek anlamda filo avantajları başlar.",
      },
      {
        q: "Farklı marka ve modelleri aynı filo poliçesinde toplayabilir miyim?",
        a: "Evet. Otomobil, kamyonet, minibüs, ağır vasıta — hepsi tek poliçede toplanır. Her araç kendi risk değerlendirmesi ile primlendirilir ama tek poliçe altında yönetilir.",
      },
      {
        q: "Yıl ortasında yeni araç ekleyebilir miyim?",
        a: "Evet. Zeyilname ile anında ekleme yapılır; kalan süre için prim oransal hesaplanır. Çıkan araç için prim iadesi alınır.",
      },
      {
        q: "Bireysel kaskoma göre ne kadar tasarruf ederim?",
        a: "Filo büyüklüğüne göre %15-40 arası tasarruf mümkündür. 50+ araçlı filolarda %40+ tasarruf da görülebilir.",
      },
      {
        q: "Filo bir aracı hasar yaparsa tüm filonun indirimi sıfırlanır mı?",
        a: "Hayır. Filo bazlı hasarsızlık indirimi uygulanır; tek aracın hasarı tüm filoyu sıfırlamaz, filo geneli değerlendirilir.",
      },
      {
        q: "Telematik cihaz kullanmak zorunlu mu?",
        a: "Hayır, isteğe bağlıdır. Yüksek riskli sektörlerde sigorta şirketleri şart koşabilir; aynı zamanda %30'a varan prim indirim fırsatı sunar.",
      },
      {
        q: "Filo aracı yurt dışında kullanılırsa sigortam geçerli mi?",
        a: "Standart kasko Türkiye sınırları içinde geçerlidir. Yurt dışı için ek teminat alınmalıdır; trafik sigortası yurt dışında Yeşil Kart ile geçerlidir.",
      },
      {
        q: "Yenileme öncesi yeni teklif için ne yapmalıyım?",
        a: "Yenileme tarihinden 30-60 gün önce bizimle iletişime geçin. Tüm anlaşmalı şirketlerden teklif alıp karşılaştırma sunalım — en stratejik dönem.",
      },
    ],
    crossSell: [
      "nakliyat-sigortasi",
      "kobi-isyeri-sigortasi",
      "ferdi-kaza-hayat-sigortasi",
    ],
  },
];

export const PRODUCT_BY_SLUG: Record<string, ProductData> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export function getProduct(slug: string): ProductData | undefined {
  return PRODUCT_BY_SLUG[slug];
}

export function getAllSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
