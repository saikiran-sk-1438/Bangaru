// Full Application Knowledge Base & Initial Local Database

export const INITIAL_PANCHANGAM = {
  samvathsaram: 'Sri Krodhi Naama Samvathsaram',
  ayanam: 'Dakshinayanam',
  rutuvu: 'Varsha Rutuvu (Monsoon Season)',
  masam: 'Sravana Masam',
  paksham: 'Sukla Paksham (Bright Fortnight)',
  tithi: 'Ekadasi (Till 02:45 PM)',
  nakshatram: 'Jyeshta Nakshatram (Till 11:20 PM)',
  yogam: 'Vishkambha Yogam',
  karanam: 'Vanija Karanam',
  vasaram: 'Bhrigu Vasare (Friday / Sukravaram)',
  rahuKalam: '10:30 AM - 12:00 PM',
  yamagandam: '03:00 PM - 04:30 PM',
  varjyam: '04:12 PM - 05:48 PM',
  durmuhurtham: '08:24 AM - 09:12 AM & 12:48 PM - 01:36 PM',
  amruthaKalam: '07:10 AM - 08:45 AM',
  abhijitMuhurtham: '11:50 AM - 12:40 PM (Most Auspicious)'
};

// Export alias for backward compatibility
export const TELUGU_PANCHANGAM_DEFAULTS = INITIAL_PANCHANGAM;

export const INITIAL_CLIENTS = [
  {
    id: 'c1',
    name: 'Suresh Sharma',
    phone: '9876543210',
    spouse: 'Lavanya',
    children: 'Rohit (Son), Ananya (Daughter)',
    gothram: 'Kasyapa Gothram',
    nakshatram: 'Rohini (Vrushabha Rasi)',
    address: 'Flat 402, Sri Sai Nivas, Dilsukhnagar, Hyderabad',
    notes: 'Prefers early morning 6 AM rituals'
  },
  {
    id: 'c2',
    name: 'Kameswara Rao',
    phone: '9848112233',
    spouse: 'Savitri',
    children: 'Venkatesh (Son)',
    gothram: 'Harithasa Gothram',
    nakshatram: 'Uttarabhadra (Meena Rasi)',
    address: 'Plot 88, Jubilee Hills, Hyderabad',
    notes: 'Annual Father Shraddha on Bhadrapada Bahula Ashtami'
  },
  {
    id: 'c3',
    name: 'Ramesh Naidu',
    phone: '9440556677',
    spouse: 'Lakshmi',
    children: 'Priya (Daughter - Bride)',
    gothram: 'Bharadwaja Gothram',
    nakshatram: 'Swati (Thula Rasi)',
    address: 'Subham Kalyana Mandapam, Kothapet, Hyderabad',
    notes: 'Daughter Wedding ceremony'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'b1',
    title: 'Sri Satyanarayana Swamy Vratham',
    clientId: 'c1',
    clientName: 'Suresh Sharma',
    phone: '9876543210',
    date: '2026-08-23',
    time: '08:30 AM',
    gothram: 'Kasyapa Gothram',
    venue: 'Flat 402, Sri Sai Nivas, Dilsukhnagar, Hyderabad',
    totalDakshina: 5000,
    advancePaid: 2000,
    status: 'Confirmed',
    assignedPriest: 'Lead Priest (Dad)'
  },
  {
    id: 'b2',
    title: 'Seetarama Kalyana Purvaka Vivaham',
    clientId: 'c3',
    clientName: 'Ramesh Naidu',
    phone: '9440556677',
    date: '2026-08-25',
    time: '09:45 AM (Vrischika Lagnam)',
    gothram: 'Bharadwaja Gothram',
    venue: 'Subham Kalyana Mandapam, Kothapet, Hyderabad',
    totalDakshina: 15000,
    advancePaid: 3000,
    status: 'Delegated',
    assignedPriest: 'Sri Venkatacharyulu Panthulu'
  },
  {
    id: 'b3',
    title: 'Ganapathi & Navagraha Homam',
    clientId: 'c2',
    clientName: 'Kameswara Rao',
    phone: '9848112233',
    date: '2026-08-28',
    time: '07:00 AM',
    gothram: 'Harithasa Gothram',
    venue: 'Plot 88, Jubilee Hills, Hyderabad',
    totalDakshina: 8000,
    advancePaid: 4000,
    status: 'Confirmed',
    assignedPriest: 'Lead Priest (Dad)'
  }
];

export const INITIAL_ASSOCIATES = [
  { 
    id: 'a1', 
    name: 'Sri Venkatacharyulu Panthulu', 
    phone: '9849123456', 
    email: 'venkat.panthulu@gmail.com', 
    specialty: 'Vivaham, Pratishta & Grand Homams', 
    location: 'Dilsukhnagar, Hyderabad',
    rating: '5.0 ★'
  },
  { 
    id: 'a2', 
    name: 'Sri Ramakrishna Sarma', 
    phone: '9440112233', 
    email: 'rk.sarma.vedic@gmail.com', 
    specialty: 'Vedic Chanting & Vrathams', 
    location: 'Kukatpally, Hyderabad',
    rating: '4.9 ★'
  },
  { 
    id: 'a3', 
    name: 'Sri Subrahmanya Shastri', 
    phone: '9988776655', 
    email: 'subramanya.shastri@gmail.com', 
    specialty: 'Astrology, Muhurtham & Vastu', 
    location: 'Shivam Road, Hyderabad',
    rating: '4.8 ★'
  }
];

export const GOTHRAM_DIRECTORY = [
  {
    id: 'harithasa',
    nameRoman: 'Harithasa Gothram',
    nameEnglish: 'Haritha / Harithasa',
    pravaraCount: 'Thrayarisheya (3 Rishis)',
    rishis: ['Haritha', 'Ambareesha', 'Yuvanaswa'],
    chantRoman: 'Haritha, Aambareesha, Yauvanaswa Thrayarisheya Pravaranvitha Harithasa Gothrodhbhavasya...',
    veda: 'Krishna Yajurveda / Rigveda Branch',
    deity: 'Lord Sri Surya Narayana Murthy'
  },
  {
    id: 'kasyapa',
    nameRoman: 'Kasyapa Gothram',
    nameEnglish: 'Kasyapa',
    pravaraCount: 'Thrayarisheya (3 Rishis)',
    rishis: ['Kasyapa', 'Avatsara', 'Naidhruva'],
    chantRoman: 'Kasyapa, Aavathsara, Naidhruva Thrayarisheya Pravaranvitha Kasyapasa Gothrodhbhavasya...',
    veda: 'Yajurveda / Samaveda Branch',
    deity: 'Lord Sri Maha Vishnu'
  },
  {
    id: 'bharadwaja',
    nameRoman: 'Bharadwaja Gothram',
    nameEnglish: 'Bharadwaja',
    pravaraCount: 'Thrayarisheya (3 Rishis)',
    rishis: ['Angirasa', 'Barhaspatya', 'Bharadwaja'],
    chantRoman: 'Aangirasa, Baarhaspathya, Bharadwaja Thrayarisheya Pravaranvitha Bharadwajasa Gothrodhbhavasya...',
    veda: 'Sukla & Krishna Yajurveda',
    deity: 'Lord Sri Ramachandra Swamy'
  },
  {
    id: 'kaundinya',
    nameRoman: 'Kaundinya Gothram',
    nameEnglish: 'Kaundinya',
    pravaraCount: 'Thrayarisheya (3 Rishis)',
    rishis: ['Vasishta', 'Maitravaruna', 'Kaundinya'],
    chantRoman: 'Vasishta, Maitraavaruna, Kaundinya Thrayarisheya Pravaranvitha Kaundinyasa Gothrodhbhavasya...',
    veda: 'Rigveda / Yajurveda Branch',
    deity: 'Lord Sri Lakshmi Narasimha Swamy'
  },
  {
    id: 'srivatsa',
    nameRoman: 'Srivatsa Gothram',
    nameEnglish: 'Srivatsa',
    pravaraCount: 'Pancharisheya (5 Rishis)',
    rishis: ['Bhargava', 'Chyavana', 'Apnavana', 'Ourva', 'Jamadagnya'],
    chantRoman: 'Bhargava, Chyavana, Aapnavana, Ourva, Jaamadagnya Pancharisheya Pravaranvitha Srivatsasa Gothrodhbhavasya...',
    veda: 'Samaveda / Yajurveda Branch',
    deity: 'Lord Sri Venkateswara Swamy'
  },
  {
    id: 'sandilya',
    nameRoman: 'Sandilya Gothram',
    nameEnglish: 'Sandilya',
    pravaraCount: 'Thrayarisheya (3 Rishis)',
    rishis: ['Sandilya', 'Asitha', 'Devala'],
    chantRoman: 'Sandilya, Asitha, Devala Thrayarisheya Pravaranvitha Sandilyasa Gothrodhbhavasya...',
    veda: 'Samaveda Branch',
    deity: 'Lord Sri Subrahmanya Swamy'
  },
  {
    id: 'vadhula',
    nameRoman: 'Vadhula Gothram',
    nameEnglish: 'Vadhula',
    pravaraCount: 'Thrayarisheya (3 Rishis)',
    rishis: ['Bhargava', 'Vaitahavya', 'Savedasa'],
    chantRoman: 'Bhargava, Vaitahavya, Savedasa Thrayarisheya Pravaranvitha Vadhulasa Gothrodhbhavasya...',
    veda: 'Yajurveda Branch',
    deity: 'Lord Sri Venu Gopala Swamy'
  },
  {
    id: 'atreya',
    nameRoman: 'Atreya Gothram',
    nameEnglish: 'Atreya',
    pravaraCount: 'Thrayarisheya (3 Rishis)',
    rishis: ['Atreya', 'Archananasa', 'Syavaswa'],
    chantRoman: 'Aatreya, Aarchanaanasa, Syaavaaswa Thrayarisheya Pravaranvitha Aatreyasa Gothrodhbhavasya...',
    veda: 'Rigveda / Yajurveda Branch',
    deity: 'Lord Sri Dattatreya Swamy'
  }
];

export const MANTRA_LIBRARY = [
  {
    id: 'rudram',
    title: 'Sri Rudra Namakam',
    category: 'Vedic Chants / Homam',
    durationEst: '18 mins',
    verses: [
      'Om Namo Bhagavate Rudraya ||',
      'Namaste Rudra Manyava Utota Ishave Namaha |',
      'Namaste Astu Dhanvane Baahubhyamuta Te Namaha ||',
      'Yaa Ta Ishuh Shivatamaa Shivam Babhoova Te Dhanuh |',
      'Shivaa Sharavyaa Yaa Tava Tayaa No Rudra Mridaya ||',
      'Yaa Te Rudra Shivaa Tanooraghoraapaapakaashinee |',
      'Tayaa Nastanuvaa Shantamayaa Girishantaabhichaakasheehi ||',
      'Yaamishum Girishanta Haste Bibharshyastave |',
      'Shivaam Giritra Taam Kuru Maa Higmseeh Purusham Jagat ||',
      'Shivena Vachasaa Tvaa Girishaachha Vadaamasi |',
      'Yathaa Nah Sarvamijjagadayakshmagm Sumanaa Asat ||',
      'Adhyavochadadhivaktaa Prathamo Daivyo Bhishak |',
      'Aheegmscha Sarvaanjanbhayantsarvaascha Yaatudhaanyah ||',
      'Asau Yastaamro Aruna Uta Babhruh Sumangalah |',
      'Ye Chemagm Rudraa Abhito Dikshu Shritaah Sahasrashovaishaagm Heda Eemahe ||',
      'Namo Hiranyabaahave Senaanye Dishaam Cha Pataye Namo Namo Vrikshebhyo Harikeshebhyah Pashoonaam Pataye Namo Namah ||'
    ]
  },
  {
    id: 'ganapathi',
    title: 'Sri Maha Ganapathi Atharvasheersha',
    category: 'Homam / Daily Pooja',
    durationEst: '10 mins',
    verses: [
      'Om Namaste Ganapataye ||',
      'Tvameva Pratyaksham Tattvamasi | Tvameva Kevalam Kartasi |',
      'Tvameva Kevalam Dhartasi | Tvameva Kevalam Hartasi |',
      'Tvameva Sarvam Khalvidam Brahmasi | Tvam Sakshadaatmasi Nityam ||',
      'Ritam Vachmi | Satyam Vachmi ||',
      'Ava Tvam Maam | Ava Vaktaram | Ava Shrotaram |',
      'Ava Dataram | Ava Dhataram | Avaanoochanamava Shishyam |',
      'Ava Paschattat | Ava Purastat | Avottarattat | Ava Dakshinattat |',
      'Ava Chordhvattat | Avaadharattat | Sarvato Mam Paahi Paahi Samantaat ||',
      'Tvam Vangmayastvam Chinmayah | Tvamaanandamanyastvam Brahmamayah |',
      'Tvam Sachidanandadviteeyoasi | Tvam Pratyaksham Brahmasi |',
      'Tvam Jnaanamayo Vijnaanamayoasi ||',
      'Sarvam Jagadidam Tvatto Jaayate | Sarvam Jagadidam Tvattastishthati |',
      'Sarvam Jagadidam Tvayi Layameshyati | Sarvam Jagadidam Tvayi Pratyeti ||'
    ]
  },
  {
    id: 'srisuktam',
    title: 'Sri Suktam (Sri Lakshmi Pooja)',
    category: 'Vratham / Abhishekam',
    durationEst: '12 mins',
    verses: [
      'Om Hiranyavarnaam Harineem Suvarnarajatasrajaam |',
      'Chandraam Hiranmayeem Lakshmeem Jaatavedo Ma Aavaha ||',
      'Taam Ma Aavaha Jaatavedo Lakshmeemanapagaamineem |',
      'Yasyaam Hiranyam Vindeyam Gaamashvam Purushaanaham ||',
      'Ashwapoorvaam Rathamadhyaam Hastinaadaprabodchineem |',
      'Shriyam Devee-mupahvaye Shreermaa Deveerjushataam ||',
      'Kaam Sosmitaam Hiranyapraakaaraamaardraam Jvalanteem Triptaam Tarpayantheem |',
      'Padme Sthitaam Padmavarnaam Taamihopahvaye Shriyam ||',
      'Chandraam Prabhaasaam Yashasaa Jvalanteem Shriyam Loke Devajushtaamudaaraam |',
      'Taam Padminmeemeem Sharanamaham Prapadye-alakshmeerme Nashyataam Tvaam Vrine ||'
    ]
  },
  {
    id: 'hanuman',
    title: 'Sri Hanuman Chalisa',
    category: 'Stotram / Daily Japa',
    durationEst: '8 mins',
    verses: [
      'Sri Guru Charana Saroja Raja Nija Manu Mukura Sudhaari |',
      'Baranau Raghubara Bimala Jasha Jo Daayaku Phala Chaari ||',
      'Buddhi Heena Thanu Jaanike Sumirai Pavan Kumaar |',
      'Bala Buddhi Vidyaa Dehu Mohi Harahu Kalesha Bikaar ||',
      'Jai Hanuman Jnana Guna Saagara | Jai Kapeesha Tihun Loka Ujaagara ||',
      'Raama Doota Atulita Bala Dhaamaa | Anjani Putra Pavanasuta Naamaa ||',
      'Mahaabeera Bikrama Bajarangee | Kumati Nivaara Sumati Ke Sangee ||',
      'Kanchana Barana Biraaja Subeshaa | Kaanana Kundala Kunchita Keshaa ||',
      'Haatha Vajra Au Dhvaja Biraajai | Kaandhe Moomja Janeu Saajai ||',
      'Shankara Suvana Kesareenandana | Teja Prataapa Maha Jaga Bandana ||'
    ]
  }
];

// Export alias for backward compatibility
export const SAMPLE_MANTRAS = MANTRA_LIBRARY;

export const SAMAGRI_PRESETS = {
  satyanarayana: {
    title: 'Sri Satyanarayana Swamy Vratham Samagri',
    clientText: 'Items required for Satyanarayana Swamy Vratham',
    items: [
      { nameRoman: 'Pasupu', nameEnglish: 'Turmeric Powder', qty: '100 grams', isKey: true },
      { nameRoman: 'Kumkuma', nameEnglish: 'Kumkum Powder', qty: '100 grams', isKey: true },
      { nameRoman: 'Gandham Podi', nameEnglish: 'Sandalwood Powder', qty: '1 box', isKey: false },
      { nameRoman: 'Tamalapakulu', nameEnglish: 'Betel Leaves', qty: '50 leaves', isKey: true },
      { nameRoman: 'Poka Chekkalu / Vakkalu', nameEnglish: 'Betel Nuts (Supari)', qty: '100 grams', isKey: true },
      { nameRoman: 'Kobbari Kayalu', nameEnglish: 'Fresh Coconuts', qty: '5 coconuts', isKey: true },
      { nameRoman: 'Navadhanyalu', nameEnglish: '9 Sacred Grains Set', qty: '1 packet', isKey: true },
      { nameRoman: 'Ravikala Guddalu (Red/Yellow)', nameEnglish: 'Blouse Pieces for Kalasam', qty: '2 pieces', isKey: true },
      { nameRoman: 'Godhuma Ravva / Rice Flour', nameEnglish: 'Wheat Rava for Prasadam', qty: '500 grams', isKey: true },
      { nameRoman: 'Aavu Neyyi', nameEnglish: 'Pure Cow Ghee', qty: '250 grams', isKey: true },
      { nameRoman: 'Panchamrutalu (Milk, Curd, Honey, Sugar)', nameEnglish: 'Panchamrutam Ingredients', qty: 'As needed', isKey: false },
      { nameRoman: 'Taaja Poola Maalalu & Loose Flowers', nameEnglish: 'Fresh Flower Garlands', qty: '2 garlands + 250g', isKey: true },
      { nameRoman: 'Tulasi Dalamulu', nameEnglish: 'Sacred Tulasi Leaves', qty: '1 bunch', isKey: false },
      { nameRoman: 'Yalukalu, Lavangalu, Paccha Karpooram', nameEnglish: 'Cardamom, Clove, Edible Camphor', qty: '1 small pack', isKey: false },
      { nameRoman: 'Agarbattilu & Karpooram', nameEnglish: 'Incense Sticks & Camphor', qty: '1 pack each', isKey: false }
    ]
  },
  homam: {
    title: 'Sri Ganapathi & Navagraha Homam Samagri',
    clientText: 'Items required for Sacred Fire Homam Ritual',
    items: [
      { nameRoman: 'Homa Samidhalu (Sacred Wood Sticks)', nameEnglish: 'Sacred Wood Sticks', qty: '3 bundles', isKey: true },
      { nameRoman: 'Aavu Neyyi (Cow Ghee for Agni)', nameEnglish: 'Pure Cow Ghee for Agni', qty: '1.5 kg', isKey: true },
      { nameRoman: 'Navagraha Samidha Set', nameEnglish: '9 Planetary Sticks Set', qty: '1 set', isKey: true },
      { nameRoman: 'Navadhanyalu (9 Sacred Grains)', nameEnglish: '9 Sacred Grains Set', qty: '2 packets', isKey: true },
      { nameRoman: 'Navagraha Vastralu (9 Colors)', nameEnglish: '9 Color Cloths for Navagraha', qty: '1 set', isKey: true },
      { nameRoman: 'Purnahuti Pattu Vastram & Coconut', nameEnglish: 'Silk Cloth & Purnahuti Coconut', qty: '1 set', isKey: true },
      { nameRoman: 'Endu Kobbari Chippalu (Dry Coconut)', nameEnglish: 'Dry Coconut Halves for Fire', qty: '1 kg', isKey: true },
      { nameRoman: 'Homa Dravya Powder (Aromatic Herbs)', nameEnglish: 'Homa Powder & Herbs', qty: '250 grams', isKey: false },
      { nameRoman: 'Darbhalu (Sacred Darbha Grass)', nameEnglish: 'Sacred Darbha Grass', qty: '1 bundle', isKey: true }
    ]
  },
  gruhapravesham: {
    title: 'Gruhapravesham (Housewarming) Samagri',
    clientText: 'Items required for New House Entrance Rituals',
    items: [
      { nameRoman: 'Pasupu & Kumkuma', nameEnglish: 'Turmeric & Kumkum', qty: '250g each', isKey: true },
      { nameRoman: 'Paalu (Cow Milk for Boiling)', nameEnglish: 'Fresh Cow Milk', qty: '2 Liters', isKey: true },
      { nameRoman: 'Kotha Paathra (New Milk Boiling Vessel)', nameEnglish: 'Brass/Steel Milk Vessel', qty: '1 new vessel', isKey: true },
      { nameRoman: 'Kobbari Kayalu', nameEnglish: 'Fresh Coconuts', qty: '11 coconuts', isKey: true },
      { nameRoman: 'Maadivi Aakulu (Mango Leaves)', nameEnglish: 'Mango Leaves Toranam', qty: '2 bunches', isKey: true },
      { nameRoman: 'Gummadi Kaya (Ash Gourd)', nameEnglish: 'Ash Gourd for Door Removal', qty: '1 big size', isKey: true },
      { nameRoman: 'Taaja Poola Maalalu', nameEnglish: 'Garlands for Main Door & Altar', qty: '5 garlands', isKey: true }
    ]
  }
};

export const NAKSHATRAS = [
  'Aswini (Mesha Rasi)', 'Bharani (Mesha Rasi)', 'Krittika (Mesha / Vrushabha)', 'Rohini (Vrushabha Rasi)',
  'Mrigasira (Vrushabha / Mithuna)', 'Arudra (Mithuna Rasi)', 'Punarvasu (Mithuna / Karkataka)', 'Pushyami (Karkataka Rasi)',
  'Aslesha (Karkataka Rasi)', 'Makha (Simha Rasi)', 'Pubba / Purva Phalguni (Simha)', 'Uttara / Uttara Phalguni (Simha / Kanya)',
  'Hasta (Kanya Rasi)', 'Chitta (Kanya / Thula)', 'Swati (Thula Rasi)', 'Visakha (Thula / Vrischika)',
  'Anuradha (Vrischika Rasi)', 'Jyeshta (Vrischika Rasi)', 'Moola (Dhanus Rasi)', 'Purvashada (Dhanus Rasi)',
  'Uttarashada (Dhanus / Makara)', 'Sravanam (Makara Rasi)', 'Dhanishta (Makara / Kumbha)',
  'Satabhisha (Kumbha Rasi)', 'Purvabhadra (Kumbha / Meena)', 'Uttarabhadra (Meena Rasi)', 'Revati (Meena Rasi)'
];

export const SLOKA_TEMPLATES = {
  sritsuktam: [
    { id: 1, text: 'ॐ హిరణ్యవర్ణాం హరిణీం సువర్ణరజతస్రజామ్ । చంద్రాం హిరణ్మయీం లక్ష్మీం జాతవేదో మ ఆవహ ॥', translation: 'Invoke for me O Agni, Goddess Lakshmi who shines like gold.' },
    { id: 2, text: 'తాం మ ఆవహ జాతవేదో లక్ష్మీమనపగామినీమ్ । యస్యాం హిరణ్యం విందేయం గామశ్వం పురుషానహమ్ ॥', translation: 'Invoke Goddess Lakshmi who never leaves, bringing wealth and prosperity.' },
    { id: 3, text: 'అశ్వపూర్వాం రథమధ్యాం హస్తినాదప్రబోధినీమ్ । శ్రియం దేవీముపహ్వయే శ్రీర్మా దేవీర్జుషతామ్ ॥', translation: 'I invoke Goddess Lakshmi who is preceded by horses and herald by elephants.' }
  ]
};

