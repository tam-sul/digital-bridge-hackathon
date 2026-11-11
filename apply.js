/* Digital Bridge Accessibility Hackathon 2026, application form engine.
   Plain browser JavaScript, no build step, no libraries.
   One question group per screen, autosave to this device, English and Amharic, voice input.
   Pure helpers are exposed on window.DBApply for _build/test_apply.js. */
(function () {
  'use strict';

  var CONTACT = 'ethiopia@alxafrica.com';
  var PITCH_MAX = 1200;

  /* ---------- strings ---------- */
  var T = {
    en: {
      page_title: 'Apply to the Accessibility Hackathon',
      skip: 'Skip to the form',
      toolbar: 'Make this page work for you.',
      toolbar_label: 'Make this page work for you',
      lang_label: 'Language',
      nav_label: 'Back',
      questions: 'Questions:',
      lang_set: 'Language changed to English.',
      contrast: 'High contrast',
      motion: 'Stop motion',
      back_home: 'Back to the hackathon page',
      kicker: 'Digital Bridge Accessibility Hackathon 2026',
      title: 'Apply',
      intro: 'One question at a time. No time limit. Your answers are kept on this device until you send them, so you can stop and come back. Every text box has a button to answer by voice. Every question is required unless it says optional.',
      privacy: 'What you write here is used only to run the hackathon, is seen only by the organising team, and is deleted after the event, under Ethiopia\'s Personal Data Protection Proclamation No. 1321/2024.',
      back: 'Back',
      next: 'Next',
      send: 'Send application',
      sending: 'Sending',
      retry: 'Try again',
      progress: 'Question {n} of {m}',
      optional: '(optional)',
      required_mark: 'required',
      review_title: 'Check your answers',
      review_help: 'Read through. Use Edit to change anything. Then press Send application.',
      edit: 'Edit',
      edit_label: 'Edit: {q}',
      not_given: '(not given)',
      restored: 'We restored the answers you saved on this device.',
      saved: 'Saved on this device.',
      speak: 'Speak your answer',
      speak_for: 'Speak your answer: {q}',
      listening: 'Listening. Speak now.',
      stopped: 'Stopped listening.',
      heard: 'Added what you said. Please check the text.',
      voice_err: 'Could not hear you. Try again or type your answer.',
      voice_unsupported: 'Voice input is not available in this browser. Use the microphone key on your phone keyboard instead.',
      err_intro: 'Please check: {e}',
      err_required: 'Please answer this question.',
      err_choose: 'Please choose one.',
      err_choose_some: 'Please choose at least one.',
      err_phone: 'Enter a phone number with at least 9 digits, for example 0911 234 567.',
      err_email: 'Enter an email address with an @ and a dot, for example name@example.com.',
      err_url: 'Enter a web address such as github.com/yourname, or leave this empty.',
      err_long: 'Please shorten this to {n} characters.',
      err_consent: 'Please tick this box to continue.',
      fail: 'We could not send your application. Your answers are still here. Try again, or email ' + CONTACT + '.',
      done_title: 'Application received.',
      done_body: 'We will reply by phone or email within two days.',
      preview: 'Preview, nothing was sent.',
      yes: 'Yes',
      no: 'No',
      q_role: 'Who is applying?',
      o_role_team: 'A team of engineers',
      s_role_team: 'Up to four people, or on your own. ALX graduates and learners first; others are welcome to apply.',
      o_role_codesigner: 'A co-designer',
      s_role_codesigner: 'You are blind, Deaf, have a disability, or have lived through displacement. You test with a team and are paid for your time.',

      q_track: 'Which track is your team applying for?',
      qh_track: 'You pick one track and keep it.',
      o_track_t1: 'Track 1. Accessible onboarding',
      s_track_t1: 'A drop-in sign-up and profile component, plus the accessible job application flow.',
      o_track_t2: 'Track 2. Accessible learning media',
      s_track_t2: 'An embeddable video player and transcript pipeline, plus the accessible job card.',
      o_track_t3: 'Track 3. Multilingual assistant and live help',
      s_track_t3: 'A web and Telegram assistant with one-click human help, plus job alerts by Telegram and SMS.',
      q_names: 'Your team',
      l_team_name: 'Team name',
      l_lead_name: 'Team lead, full name',
      q_contact_team: 'How can we reach the team lead?',
      q_contact_cd: 'How can we reach you?',
      l_phone: 'Phone number',
      h_phone: 'We call, or send a WhatsApp or Telegram message, to this number.',
      l_email: 'Email address',
      q_members: 'Who else is on the team?',
      qh_members: 'Applying on your own, or with two or three? Leave the rest blank. If you add a member, give their phone, email and ALX affiliation too. Each track has 40 places for individuals, and we pair you into a team at the kick-off.',
      l_member2: 'Member 2, full name',
      l_member2_phone: 'Member 2, phone number',
      l_member2_email: 'Member 2, email address',
      l_member2_aff: 'Member 2, ALX affiliation',
      l_member3: 'Member 3, full name',
      l_member3_phone: 'Member 3, phone number',
      l_member3_email: 'Member 3, email address',
      l_member3_aff: 'Member 3, ALX affiliation',
      l_member4: 'Member 4, full name',
      l_member4_phone: 'Member 4, phone number',
      l_member4_email: 'Member 4, email address',
      l_member4_aff: 'Member 4, ALX affiliation',
      l_lead_aff: 'Team lead, ALX affiliation',
      choose: 'Choose one',
      o_aff_graduate: 'ALX graduate',
      o_aff_learner: 'Current ALX learner',
      o_aff_started: 'Started an ALX programme, did not complete',
      o_aff_neither: 'Not from ALX',
      send_note: 'By pressing Send, you agree that ALX keeps these answers only to run the hackathon, shares them only with the organising team, and deletes them after the event (Personal Data Protection Proclamation No. 1321/2024).',
      cap_left: '{t} team places and {i} individual places left.',
      cap_full: 'Full. New applications go on the waiting list.',
      q_pitch: 'What will you build?',
      l_code_link: 'Link to code you have written',
      h_code_link: 'GitHub, GitLab or a live site. Any team member\'s work counts.',
      l_pitch: 'In a few sentences, what will your module do, and for whom?',
      h_pitch: 'Up to 1200 characters. Plain words are best.',
      l_sr_before: 'Has anyone on the team used a screen reader such as NVDA or TalkBack before?',
      o_sr_before_yes: 'Yes',
      s_sr_before_yes: 'At least one of us has tested with one.',
      o_sr_before_learning: 'Not yet',
      s_sr_before_learning: 'We will learn in the training evenings.',
      q_avail: 'Can you be there?',
      l_can_train_team: 'Can your whole team join the online training evenings, Monday 9 to Friday 13 November, 19:00 to 20:30? They are required.',
      l_can_train_cd: 'Can you join the online training evenings, Monday 9 to Friday 13 November, 19:00 to 20:30? They are required.',
      l_can_days_team: 'Can your whole team be at ALX Tech Hub Lideta on Saturday 14 and Sunday 15 November, 09:00 to 17:00?',
      l_can_days_cd: 'Can you be at ALX Tech Hub Lideta on Saturday 14 and Sunday 15 November, 09:00 to 17:00?',
      q_access: 'What do you need to take part?',
      qh_access: 'Private. No proof is needed. Tick all that apply.',
      l_access_needs: 'I need',
      o_access_needs_ethsl: 'An Ethiopian Sign Language interpreter',
      o_access_needs_screenreader: 'A screen reader on the shared computer',
      o_access_needs_stepfree: 'Step-free access and an accessible toilet',
      o_access_needs_quiet: 'A quiet space to rest',
      o_access_needs_other: 'Something else',
      o_access_needs_none: 'Nothing extra',
      l_access_other: 'Tell us what else would help',
      q_consent_team: 'Two things to agree to',
      q_consent_cd: 'One thing to agree to',
      l_consent_data: 'I agree that ALX keeps these answers only to run the hackathon, shares them only with the organising team, and deletes them after the event (Proclamation No. 1321/2024).',
      l_consent_licence: 'We agree that what we build at the hackathon is released under an open licence, so that Savanna and other platforms in Ethiopia can use it.',

      q_name_cd: 'About you',
      qh_name_cd: 'Co-designers are paid for their time. You test what a team builds and tell them what works and what does not.',
      l_full_name: 'Full name',
      l_city: 'City or town where you live',
      q_experience: 'Which of these describe you?',
      qh_experience: 'Tick all that apply. No proof is needed.',
      l_experience: 'I am',
      o_experience_blind: 'Blind or with low vision',
      o_experience_deaf: 'Deaf or hard of hearing',
      o_experience_physical: 'Living with a physical disability',
      o_experience_cognitive: 'Living with a learning or cognitive disability',
      o_experience_displaced: 'A refugee, returnee or internally displaced person',
      o_experience_inperson: 'Someone who has supported people with disabilities in person',
      q_tools: 'Which tools do you use?',
      qh_tools: 'Tick all that apply.',
      l_tools: 'I use',
      o_tools_nvda_jaws: 'NVDA or JAWS on a computer',
      o_tools_talkback: 'TalkBack or VoiceOver on a phone',
      o_tools_keyboard: 'Keyboard only, no mouse',
      o_tools_zoom: 'Large text or zoom',
      o_tools_ethsl: 'Ethiopian Sign Language',
      o_tools_messaging: 'Telegram or WhatsApp',
      o_tools_none: 'None of these',
      q_languages: 'Which languages do you use?',
      qh_languages: 'Tick all that apply.',
      l_languages: 'I use',
      o_languages_am: 'Amharic',
      o_languages_en: 'English',
      o_languages_ti: 'Tigrinya',
      o_languages_om: 'Afaan Oromo',
      o_languages_so: 'Somali',
      o_languages_ar: 'Arabic',
      o_languages_ethsl: 'Ethiopian Sign Language',
      q_referred: 'How did you hear about this?',
      l_referred: 'I heard through',
      o_referred_aaapd: 'AAAPD',
      s_referred_aaapd: 'Addis Ababa Association of Persons with Physical Disabilities',
      o_referred_tib: 'Tomorrow is Better',
      o_referred_alx: 'ALX',
      o_referred_other: 'Somewhere else',
      l_also_codes: 'Do you also write code?',
      h_also_codes: 'Not needed. It helps us pair you with a team.'
    },
    am: {
      page_title: 'ለተደራሽነት ሃካቶን ያመልክቱ',
      skip: 'ወደ ቅጹ ይዝለሉ',
      toolbar: 'ይህን ገጽ ለእርስዎ እንዲመች ያድርጉት።',
      toolbar_label: 'ይህን ገጽ ለእርስዎ እንዲመች ያድርጉት',
      lang_label: 'ቋንቋ',
      nav_label: 'ተመለስ',
      questions: 'ጥያቄዎች፦',
      lang_set: 'ቋንቋ ወደ አማርኛ ተቀይሯል።',
      contrast: 'ከፍተኛ ንፅፅር',
      motion: 'እንቅስቃሴ አቁም',
      back_home: 'ወደ ሃካቶን ገጽ ተመለስ',
      kicker: 'የዲጂታል ብሪጅ ተደራሽነት ሃካቶን 2026',
      title: 'ያመልክቱ',
      intro: 'በአንድ ጊዜ አንድ ጥያቄ። የጊዜ ገደብ የለም። መልሶችዎ እስኪልኩ ድረስ በዚህ መሣሪያ ላይ ይቀመጣሉ፣ ስለዚህ አቁመው መመለስ ይችላሉ። እያንዳንዱ የጽሑፍ ሳጥን በድምጽ ለመመለስ አዝራር አለው። "አማራጭ" ካልተባለ እያንዳንዱ ጥያቄ ግዴታ ነው።',
      privacy: 'እዚህ የሚጽፉት ሃካቶኑን ለማካሄድ ብቻ ይውላል፣ በአዘጋጅ ቡድኑ ብቻ ይታያል፣ እና ከዝግጅቱ በኋላ ይሰረዛል፣ በኢትዮጵያ የግል መረጃ ጥበቃ አዋጅ ቁጥር 1321/2024 መሠረት።',
      back: 'ተመለስ',
      next: 'ቀጥል',
      send: 'ማመልከቻውን ላክ',
      sending: 'እየተላከ ነው',
      retry: 'እንደገና ይሞክሩ',
      progress: 'ጥያቄ {n} ከ {m}',
      optional: '(አማራጭ)',
      required_mark: 'ግዴታ',
      review_title: 'መልሶችዎን ያረጋግጡ',
      review_help: 'ያንብቡ። ለመቀየር "አርም" ይጫኑ። ከዚያ "ማመልከቻውን ላክ" ይጫኑ።',
      edit: 'አርም',
      edit_label: 'አርም: {q}',
      not_given: '(አልተሰጠም)',
      restored: 'በዚህ መሣሪያ ላይ ያስቀመጡትን መልሶች መልሰናል።',
      saved: 'በዚህ መሣሪያ ላይ ተቀምጧል።',
      speak: 'መልስዎን ይናገሩ',
      speak_for: 'መልስዎን ይናገሩ: {q}',
      listening: 'እያዳመጠ ነው። አሁን ይናገሩ።',
      stopped: 'ማዳመጥ ቆሟል።',
      heard: 'የተናገሩት ተጨምሯል። እባክዎ ጽሑፉን ያረጋግጡ።',
      voice_err: 'ድምጽዎ አልተሰማም። እንደገና ይሞክሩ ወይም መልስዎን ይጻፉ።',
      voice_unsupported: 'በዚህ አሳሽ የድምጽ ግብዓት የለም። በስልክዎ የቁልፍ ሰሌዳ ላይ ያለውን የማይክሮፎን ቁልፍ ይጠቀሙ።',
      err_intro: 'እባክዎ ያረጋግጡ: {e}',
      err_required: 'እባክዎ ይህን ጥያቄ ይመልሱ።',
      err_choose: 'እባክዎ አንዱን ይምረጡ።',
      err_choose_some: 'እባክዎ ቢያንስ አንዱን ይምረጡ።',
      err_phone: 'ቢያንስ 9 አሃዝ ያለው ስልክ ቁጥር ያስገቡ፣ ለምሳሌ 0911 234 567።',
      err_email: '@ እና ነጥብ ያለው ኢሜይል አድራሻ ያስገቡ፣ ለምሳሌ name@example.com።',
      err_url: 'እንደ github.com/yourname ያለ የድር አድራሻ ያስገቡ፣ ወይም ባዶ ይተዉት።',
      err_long: 'እባክዎ ይህን ወደ {n} ፊደላት ያሳጥሩ።',
      err_consent: 'ለመቀጠል እባክዎ ይህን ሳጥን ምልክት ያድርጉ።',
      fail: 'ማመልከቻዎን መላክ አልቻልንም። መልሶችዎ አሁንም እዚህ አሉ። እንደገና ይሞክሩ፣ ወይም ወደ ' + CONTACT + ' ኢሜይል ይላኩ።',
      done_title: 'ማመልከቻዎ ደርሷል።',
      done_body: 'በሁለት ቀናት ውስጥ በስልክ ወይም በኢሜይል እንመልስልዎታለን።',
      preview: 'ቅድመ እይታ፣ ምንም አልተላከም።',
      yes: 'አዎ',
      no: 'አይ',
      q_role: 'ማን ነው የሚያመለክተው?',
      o_role_team: 'የመሐንዲሶች ቡድን',
      s_role_team: 'እስከ አራት ሰዎች፣ ወይም ብቻዎን። የALX ተመራቂዎች እና ተማሪዎች ቅድሚያ ያገኛሉ፤ ሌሎችም ማመልከት ይችላሉ።',
      o_role_codesigner: 'ተባባሪ ዲዛይነር',
      s_role_codesigner: 'ዓይነ ስውር፣ መስማት የተሳነዎት፣ አካል ጉዳት ያለብዎት፣ ወይም የስደት ልምድ ያለዎት ነዎት። ከቡድን ጋር ይፈትናሉ እና ለጊዜዎ ይከፈልዎታል።',

      q_track: 'ቡድንዎ ለየትኛው ትራክ ያመለክታል?',
      qh_track: 'አንድ ትራክ መርጠው ይቆዩበት።',
      o_track_t1: 'ትራክ 1። ተደራሽ ምዝገባ',
      s_track_t1: 'የሚሰካ የምዝገባ እና የመገለጫ አካል፣ እና ተደራሽ የሥራ ማመልከቻ ሂደት።',
      o_track_t2: 'ትራክ 2። ተደራሽ የትምህርት ሚዲያ',
      s_track_t2: 'የሚሰካ የቪዲዮ ማጫወቻ እና የጽሑፍ ግልባጭ፣ እና ተደራሽ የሥራ ካርድ።',
      o_track_t3: 'ትራክ 3። ባለብዙ ቋንቋ ረዳት እና ቀጥታ እገዛ',
      s_track_t3: 'የድር እና የቴሌግራም ረዳት በአንድ ጠቅታ የሰው እገዛ፣ እና የሥራ ማሳወቂያ በቴሌግራም እና በኤስኤምኤስ።',
      q_names: 'ቡድንዎ',
      l_team_name: 'የቡድን ስም',
      l_lead_name: 'የቡድን መሪ፣ ሙሉ ስም',
      q_contact_team: 'የቡድን መሪውን እንዴት እናገኘው?',
      q_contact_cd: 'እንዴት እናገኝዎታለን?',
      l_phone: 'ስልክ ቁጥር',
      h_phone: 'በዚህ ቁጥር እንደውላለን፣ ወይም በዋትስአፕ ወይም በቴሌግራም መልዕክት እንልካለን።',
      l_email: 'ኢሜይል አድራሻ',
      q_members: 'በቡድኑ ውስጥ ሌላ ማን አለ?',
      qh_members: 'ብቻዎን ወይም ሁለት ወይም ሶስት ሆናችሁ ነው የምታመለክቱት? የቀረውን ባዶ ይተዉት። አባል ካከሉ፣ ስልክ ቁጥራቸውን፣ ኢሜይላቸውን እና ከALX ጋር ያላቸውን ግንኙነት ይሙሉ። እያንዳንዱ ትራክ ለግለሰቦች 40 ቦታ አለው፣ በመክፈቻው ቀን ከቡድን ጋር እናገናኝዎታለን።',
      l_member2: 'አባል 2፣ ሙሉ ስም',
      l_member2_phone: 'አባል 2፣ ስልክ ቁጥር',
      l_member2_email: 'አባል 2፣ ኢሜይል አድራሻ',
      l_member2_aff: 'አባል 2፣ ከALX ጋር ያለው ግንኙነት',
      l_member3: 'አባል 3፣ ሙሉ ስም',
      l_member3_phone: 'አባል 3፣ ስልክ ቁጥር',
      l_member3_email: 'አባል 3፣ ኢሜይል አድራሻ',
      l_member3_aff: 'አባል 3፣ ከALX ጋር ያለው ግንኙነት',
      l_member4: 'አባል 4፣ ሙሉ ስም',
      l_member4_phone: 'አባል 4፣ ስልክ ቁጥር',
      l_member4_email: 'አባል 4፣ ኢሜይል አድራሻ',
      l_member4_aff: 'አባል 4፣ ከALX ጋር ያለው ግንኙነት',
      l_lead_aff: 'የቡድን መሪ፣ ከALX ጋር ያለው ግንኙነት',
      choose: 'አንዱን ይምረጡ',
      o_aff_graduate: 'የALX ተመራቂ',
      o_aff_learner: 'አሁን የALX ተማሪ',
      o_aff_started: 'የALX ፕሮግራም ጀምሮ ያላጠናቀቀ',
      o_aff_neither: 'ከALX አይደለም',
      send_note: '"ላክ" በመጫን፣ ALX እነዚህን መልሶች ሃካቶኑን ለማካሄድ ብቻ እንዲያስቀምጥ፣ ለአዘጋጅ ቡድኑ ብቻ እንዲያካፍል፣ እና ከዝግጅቱ በኋላ እንዲሰርዝ ይስማማሉ (የግል መረጃ ጥበቃ አዋጅ ቁጥር 1321/2024)።',
      cap_left: '{t} የቡድን ቦታዎች እና {i} የግለሰብ ቦታዎች ቀርተዋል።',
      cap_full: 'ሞልቷል። አዲስ ማመልከቻዎች በመጠባበቂያ ዝርዝር ላይ ይቀመጣሉ።',
      q_pitch: 'ምን ይገነባሉ?',
      l_code_link: 'የጻፉት ኮድ አገናኝ',
      h_code_link: 'GitHub፣ GitLab ወይም የቀጥታ ድረ ገጽ። የማንኛውም የቡድን አባል ሥራ ይቆጠራል።',
      l_pitch: 'በጥቂት ዓረፍተ ነገሮች፣ ሞጁልዎ ምን ያደርጋል፣ ለማን?',
      h_pitch: 'እስከ 1200 ፊደላት። ቀላል ቃላት ይሻላሉ።',
      l_sr_before: 'በቡድኑ ውስጥ ማንም እንደ NVDA ወይም TalkBack ያለ የስክሪን አንባቢ ተጠቅሞ ያውቃል?',
      o_sr_before_yes: 'አዎ',
      s_sr_before_yes: 'ቢያንስ አንዳችን ፈትነንበታል።',
      o_sr_before_learning: 'ገና አይደለም',
      s_sr_before_learning: 'በስልጠና ምሽቶች እንማራለን።',
      q_avail: 'መገኘት ይችላሉ?',
      l_can_train_team: 'ሙሉ ቡድንዎ በመስመር ላይ የስልጠና ምሽቶች፣ ከሰኞ ጥቅምት 30 እስከ አርብ ህዳር 4 (ኖቬምበር 9 እስከ 13)፣ ከምሽቱ 1:00 እስከ 2:30 (19:00 እስከ 20:30) መሳተፍ ይችላል? ግዴታ ናቸው።',
      l_can_train_cd: 'በመስመር ላይ የስልጠና ምሽቶች፣ ከሰኞ ጥቅምት 30 እስከ አርብ ህዳር 4 (ኖቬምበር 9 እስከ 13)፣ ከምሽቱ 1:00 እስከ 2:30 (19:00 እስከ 20:30) መሳተፍ ይችላሉ? ግዴታ ናቸው።',
      l_can_days_team: 'ሙሉ ቡድንዎ ቅዳሜ ህዳር 5 እና እሁድ ህዳር 6 (ኖቬምበር 14 እና 15)፣ ከጠዋቱ 3:00 እስከ ምሽቱ 11:00 (09:00 እስከ 17:00) በALX ቴክ ሀብ ልደታ መገኘት ይችላል?',
      l_can_days_cd: 'ቅዳሜ ህዳር 5 እና እሁድ ህዳር 6 (ኖቬምበር 14 እና 15)፣ ከጠዋቱ 3:00 እስከ ምሽቱ 11:00 (09:00 እስከ 17:00) በALX ቴክ ሀብ ልደታ መገኘት ይችላሉ?',
      q_access: 'ለመሳተፍ ምን ያስፈልግዎታል?',
      qh_access: 'የግል ነው። ማስረጃ አያስፈልግም። የሚመለከትዎትን ሁሉ ምልክት ያድርጉ።',
      l_access_needs: 'የሚያስፈልገኝ',
      o_access_needs_ethsl: 'የኢትዮጵያ ምልክት ቋንቋ አስተርጓሚ',
      o_access_needs_screenreader: 'በጋራ ኮምፒውተር ላይ የስክሪን አንባቢ',
      o_access_needs_stepfree: 'ደረጃ የሌለው መግቢያ እና ተደራሽ መጸዳጃ ቤት',
      o_access_needs_quiet: 'ለማረፍ ጸጥ ያለ ቦታ',
      o_access_needs_other: 'ሌላ ነገር',
      o_access_needs_none: 'ምንም ተጨማሪ አያስፈልግም',
      l_access_other: 'ሌላ ምን እንደሚረዳዎት ይንገሩን',
      q_consent_team: 'የሚስማሙባቸው ሁለት ነገሮች',
      q_consent_cd: 'የሚስማሙበት አንድ ነገር',
      l_consent_data: 'ALX እነዚህን መልሶች ሃካቶኑን ለማካሄድ ብቻ እንዲያስቀምጥ፣ ለአዘጋጅ ቡድኑ ብቻ እንዲያካፍል፣ እና ከዝግጅቱ በኋላ እንዲሰርዝ እስማማለሁ (አዋጅ ቁጥር 1321/2024)።',
      l_consent_licence: 'በሃካቶኑ የምንገነባው በክፍት ፈቃድ እንዲለቀቅ እንስማማለን፣ ሳቫና እና ሌሎች በኢትዮጵያ ያሉ መድረኮች እንዲጠቀሙበት።',

      q_name_cd: 'ስለ እርስዎ',
      qh_name_cd: 'ተባባሪ ዲዛይነሮች ለጊዜያቸው ይከፈላቸዋል። ቡድኑ የሚገነባውን ይፈትናሉ እና የሚሰራውን እና የማይሰራውን ይነግሯቸዋል።',
      l_full_name: 'ሙሉ ስም',
      l_city: 'የሚኖሩበት ከተማ',
      q_experience: 'ከእነዚህ ውስጥ የትኞቹ እርስዎን ይገልጻሉ?',
      qh_experience: 'የሚመለከትዎትን ሁሉ ምልክት ያድርጉ። ማስረጃ አያስፈልግም።',
      l_experience: 'እኔ',
      o_experience_blind: 'ዓይነ ስውር ነኝ ወይም የማየት ችግር አለብኝ',
      o_experience_deaf: 'መስማት የተሳነኝ ነኝ ወይም የመስማት ችግር አለብኝ',
      o_experience_physical: 'የአካል ጉዳት አለብኝ',
      o_experience_cognitive: 'የመማር ወይም የማስታወስ ችግር አለብኝ',
      o_experience_displaced: 'ስደተኛ፣ ተመላሽ ወይም በአገር ውስጥ የተፈናቀልኩ ነኝ',
      o_experience_inperson: 'ሌሎች አካል ጉዳተኞችን በአካል ረድቻለሁ',
      q_tools: 'የትኞቹን መሣሪያዎች ይጠቀማሉ?',
      qh_tools: 'የሚመለከትዎትን ሁሉ ምልክት ያድርጉ።',
      l_tools: 'የምጠቀመው',
      o_tools_nvda_jaws: 'NVDA ወይም JAWS በኮምፒውተር',
      o_tools_talkback: 'TalkBack ወይም VoiceOver በስልክ',
      o_tools_keyboard: 'የቁልፍ ሰሌዳ ብቻ፣ ያለ አይጥ',
      o_tools_zoom: 'ትልቅ ጽሑፍ ወይም ማጉላት',
      o_tools_ethsl: 'የኢትዮጵያ ምልክት ቋንቋ',
      o_tools_messaging: 'ቴሌግራም ወይም ዋትስአፕ',
      o_tools_none: 'ከእነዚህ አንዱንም',
      q_languages: 'የትኞቹን ቋንቋዎች ይጠቀማሉ?',
      qh_languages: 'የሚመለከትዎትን ሁሉ ምልክት ያድርጉ።',
      l_languages: 'የምጠቀመው',
      o_languages_am: 'አማርኛ',
      o_languages_en: 'እንግሊዝኛ',
      o_languages_ti: 'ትግርኛ',
      o_languages_om: 'አፋን ኦሮሞ',
      o_languages_so: 'ሶማልኛ',
      o_languages_ar: 'ዓረብኛ',
      o_languages_ethsl: 'የኢትዮጵያ ምልክት ቋንቋ',
      q_referred: 'ስለዚህ እንዴት ሰሙ?',
      l_referred: 'የሰማሁት በ',
      o_referred_aaapd: 'AAAPD',
      s_referred_aaapd: 'የአዲስ አበባ የአካል ጉዳተኞች ማህበር',
      o_referred_tib: 'Tomorrow is Better',
      o_referred_alx: 'ALX',
      o_referred_other: 'ሌላ ቦታ',
      l_also_codes: 'ኮድም ይጽፋሉ?',
      h_also_codes: 'አያስፈልግም። ከቡድን ጋር ለማጣመር ይረዳናል።'
    }
  };

  /* ---------- steps ---------- */
  function text(name, o) { return assign({ name: name, type: 'text', required: true, voice: true }, o); }
  function radio(name, values, o) { return assign({ name: name, type: 'radio', required: true, values: values }, o); }
  function checks(name, values, o) { return assign({ name: name, type: 'checks', required: true, values: values }, o); }
  function consent(name) { return { name: name, type: 'consent', required: true }; }
  function select(name, values, o) { return assign({ name: name, type: 'select', required: true, values: values, voice: false }, o); }
  function assign(a, b) { for (var k in b) if (Object.prototype.hasOwnProperty.call(b, k)) a[k] = b[k]; return a; }

  var YN = ['yes', 'no'];
  var AFF = ['graduate', 'learner', 'started', 'neither'];
  var LIMITS = { teams: 50, individuals: 40 };
  var ACCESS = ['ethsl', 'screenreader', 'stepfree', 'quiet', 'other', 'none'];
  var accessStep = { title: 'q_access', help: 'qh_access', fields: [
    checks('access_needs', ACCESS),
    text('access_other', { required: false })
  ] };
  function member(n) {
    return [
      text('member' + n, { required: false, autocomplete: 'off' }),
      text('member' + n + '_phone', { type: 'tel', required: false, requiredIf: 'member' + n }),
      text('member' + n + '_email', { type: 'email', required: false, requiredIf: 'member' + n }),
      select('member' + n + '_aff', AFF, { optKey: 'aff', required: false, requiredIf: 'member' + n })
    ];
  }

  /* Team form after Heaven's review (ALX, 5 Nov): four screens, no pitch, no availability, no access screen,
     no consent screen; consent is the line under the Send button. */
  var STEPS = {
    team: [
      { title: 'q_track', help: 'qh_track', fields: [radio('track', ['t1', 't2', 't3'], { label: 'q_track', bare: true })] },
      { title: 'q_names', fields: [text('team_name', { autocomplete: 'organization' }), text('lead_name', { autocomplete: 'name' }), select('lead_aff', AFF, { optKey: 'aff' })] },
      { title: 'q_contact_team', fields: [text('phone', { type: 'tel' }), text('email', { type: 'email' })] },
      { title: 'q_members', help: 'qh_members', fields: member(2).concat(member(3), member(4)) }
    ],
    codesigner: [
      { title: 'q_name_cd', help: 'qh_name_cd', fields: [text('full_name', { autocomplete: 'name' }), text('city', { autocomplete: 'address-level2' })] },
      { title: 'q_contact_cd', fields: [text('phone', { type: 'tel' }), text('email', { type: 'email', required: false })] },
      { title: 'q_experience', help: 'qh_experience', fields: [checks('experience', ['blind', 'deaf', 'physical', 'cognitive', 'displaced', 'inperson'])] },
      { title: 'q_tools', help: 'qh_tools', fields: [checks('tools', ['nvda_jaws', 'talkback', 'keyboard', 'zoom', 'ethsl', 'messaging', 'none'])] },
      { title: 'q_languages', help: 'qh_languages', fields: [checks('languages', ['am', 'en', 'ti', 'om', 'so', 'ar', 'ethsl'])] },
      { title: 'q_referred', fields: [radio('referred', ['aaapd', 'tib', 'alx', 'other']), radio('also_codes', YN)] },
      { title: 'q_avail', fields: [radio('can_train', YN, { label: 'l_can_train_cd' }), radio('can_days', YN, { label: 'l_can_days_cd' })] },
      accessStep
    ]
  };

  function allFields(role) {
    var out = [];
    (STEPS[role] || []).forEach(function (s) { out = out.concat(s.fields); });
    return out;
  }

  /* ---------- pure helpers ---------- */
  function isRequired(field, answers) {
    if (field.required) return true;
    /* member phone, email and affiliation are required once that member's name is given */
    return !!(field.requiredIf && answers && String(answers[field.requiredIf] == null ? '' : answers[field.requiredIf]).trim());
  }
  function validateField(field, value, lang, answers) {
    var S = T[lang] || T.en, required = isRequired(field, answers);
    if (field.type === 'consent') return value === true ? '' : S.err_consent;
    if (field.type === 'radio') return value ? '' : S.err_choose;
    if (field.type === 'select') return value || !required ? '' : S.err_choose;
    if (field.type === 'checks') return (Array.isArray(value) && value.length) || !required ? '' : S.err_choose_some;
    var v = String(value == null ? '' : value).trim();
    if (!v) return required ? S.err_required : '';
    if (field.type === 'tel' && v.replace(/\D/g, '').length < 9) return S.err_phone;
    if (field.type === 'email' && (v.indexOf('@') < 0 || v.indexOf('.') < 0)) return S.err_email;
    if (field.type === 'url' && !/^(https?:\/\/)?\S+\.\S+$/i.test(v)) return S.err_url;
    if (field.max && v.length > field.max) return S.err_long.replace('{n}', field.max);
    return '';
  }

  function buildPayload(role, lang, answers) {
    var a = answers || {}, out = {};
    allFields(role).forEach(function (f) {
      var v = a[f.name];
      if (f.type === 'checks') out[f.name] = Array.isArray(v) ? v.slice() : [];
      else if (f.type === 'consent') out[f.name] = v === true;
      else out[f.name] = String(v == null ? '' : v).trim();
    });
    out.consent_data = true;   /* given by pressing Send under the data-protection line */
    return { role: role, lang: lang, submittedAt: new Date().toISOString(), website: '', answers: out };
  }

  window.DBApply = { validateField: validateField, buildPayload: buildPayload, STEPS: STEPS, LIMITS: LIMITS };

  /* ---------- DOM ---------- */
  if (!document.getElementById('form')) return;

  var $ = function (id) { return document.getElementById(id); };
  var form = $('form'), stepEl = $('step'), nextBtn = $('next'), backBtn = $('back'),
      progress = $('progress'), progressText = $('progress-text'), progressFill = $('progress-fill'),
      savedEl = $('saved'), doneEl = $('done'), announceEl = $('announce');
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var params = new URLSearchParams(location.search);

  var state = {
    role: null, askedRole: false, lang: 'en', step: 0, answers: {}, sendError: false, busy: false, capacity: null
  };

  function t(key) { var S = T[state.lang] || T.en; return S[key] != null ? S[key] : (T.en[key] != null ? T.en[key] : ''); }
  function fmt(key, vars) { return t(key).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }); }
  function has(key) { return T.en[key] != null; }

  function store(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in attrs) {
      if (attrs[k] == null) continue;
      if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function announce(msg) { announceEl.textContent = ''; setTimeout(function () { announceEl.textContent = msg; }, 50); }

  /* language */
  function setLang(lang, rerender) {
    state.lang = lang === 'am' ? 'am' : 'en';
    store('db-lang', state.lang);
    document.documentElement.lang = state.lang;
    document.title = t('page_title');
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) if (has(nodes[i].dataset.i18n)) nodes[i].textContent = t(nodes[i].dataset.i18n);
    var btns = document.querySelectorAll('[data-lang]');
    for (var j = 0; j < btns.length; j++) btns[j].setAttribute('aria-pressed', btns[j].dataset.lang === state.lang ? 'true' : 'false');
    var names = [['.access', 'toolbar_label'], ['.lang-switch', 'lang_label'], ['nav.main', 'nav_label']];
    names.forEach(function (p) { var n = document.querySelector(p[0]); if (n) n.setAttribute('aria-label', t(p[1])); });
    if (window.DBSite) window.DBSite.sync();
    if (rerender) { render(false); announce(t('lang_set')); }
  }

  /* storage */
  function key() { return 'db-apply-' + state.role; }
  function save() {
    if (!state.role) return;
    store(key(), JSON.stringify({ answers: state.answers, step: state.step }));
    if (!savedEl.textContent) savedEl.textContent = t('saved');
  }
  function restore() {
    var raw = read(key()), data = null;
    try { data = raw && JSON.parse(raw); } catch (e) { data = null; }
    if (!data || !data.answers) return;
    var any = Object.keys(data.answers).some(function (k) { var v = data.answers[k]; return Array.isArray(v) ? v.length : !!v; });
    if (!any) return;
    state.answers = data.answers;
    state.step = Math.min(Math.max(0, data.step | 0), STEPS[state.role].length);
    savedEl.textContent = t('restored');
  }

  /* field rendering */
  function labelOf(f) { return t(f.label || ('l_' + f.name)); }
  function optionLabel(f, v) { return t('o_' + (f.optKey || f.name) + '_' + v) || t(v); }
  function optionSub(f, v) {
    var base = has('s_' + f.name + '_' + v) ? t('s_' + f.name + '_' + v) : '';
    if (f.name === 'track' && state.capacity && state.capacity[v]) {
      var c = state.capacity[v], tl = Math.max(0, LIMITS.teams - (c.teams | 0)), il = Math.max(0, LIMITS.individuals - (c.individuals | 0));
      base += (base ? ' ' : '') + (tl === 0 && il === 0 ? t('cap_full') : fmt('cap_left', { t: tl, i: il }));
    }
    return base;
  }
  function fieldId(name) { return 'f-' + name; }

  function renderSelect(f) {
    var id = fieldId(f.name), descr = ['err-' + f.name];
    var label = el('label', { 'for': id }, [labelOf(f), f.required || f.requiredIf ? null : ' ', f.required || f.requiredIf ? null : el('span', { 'class': 'hint', text: t('optional') })]);
    var sel = el('select', { id: id, name: f.name, 'aria-describedby': descr.join(' ') });
    sel.appendChild(el('option', { value: '', text: t('choose') }));
    f.values.forEach(function (v) { sel.appendChild(el('option', { value: v, text: optionLabel(f, v) })); });
    sel.value = state.answers[f.name] || '';
    sel.dataset.field = f.name;
    if (f.required) sel.setAttribute('aria-required', 'true');
    return el('div', { 'class': 'field' }, [label, sel, el('p', { 'class': 'err', id: 'err-' + f.name })]);
  }

  function renderText(f) {
    var id = fieldId(f.name), hintKey = 'h_' + f.name, descr = [];
    var label = el('label', { 'for': id }, [labelOf(f), f.required || f.requiredIf ? null : ' ', f.required || f.requiredIf ? null : el('span', { 'class': 'hint', text: t('optional') })]);
    var kids = [label];
    if (has(hintKey)) { kids.push(el('p', { 'class': 'hint', id: 'hint-' + f.name, text: t(hintKey) })); descr.push('hint-' + f.name); }
    descr.push('err-' + f.name);
    var ctl = f.type === 'textarea'
      ? el('textarea', { id: id, name: f.name, rows: '6', maxlength: f.max || null })
      : el('input', { id: id, name: f.name, type: f.type === 'text' ? 'text' : f.type,
          inputmode: f.type === 'tel' ? 'tel' : (f.type === 'url' ? 'url' : null),
          autocomplete: f.autocomplete || (f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : f.type === 'url' ? 'url' : 'off') });
    ctl.value = state.answers[f.name] || '';
    ctl.setAttribute('aria-describedby', descr.join(' '));
    ctl.dataset.field = f.name;
    if (f.required) ctl.setAttribute('aria-required', 'true');
    var row = el('div', { 'class': 'voice-row' }, [ctl]);
    if (SR) {
      var btn = el('button', { type: 'button', 'class': 'tool', 'aria-pressed': 'false', 'aria-controls': id, 'aria-label': fmt('speak_for', { q: labelOf(f) }), text: t('speak') });
      btn.addEventListener('click', function () { toggleVoice(btn, ctl); });
      row.appendChild(btn);
    }
    kids.push(row);
    kids.push(el('p', { 'class': 'err', id: 'err-' + f.name }));
    return el('div', { 'class': 'field' }, kids);
  }

  function renderGroup(f) {
    var isRadio = f.type === 'radio', legendId = 'legend-' + f.name, hintKey = 'h_' + f.name, descr = [];
    var kids = [el('legend', { id: legendId, text: labelOf(f) })];
    if (has(hintKey)) { kids.push(el('p', { 'class': 'hint', id: 'hint-' + f.name, text: t(hintKey) })); descr.push('hint-' + f.name); }
    descr.push('err-' + f.name);
    var cur = state.answers[f.name] || (isRadio ? '' : []);
    /* the fieldset and legend already give the group role and name; no nested role needed */
    var box = el('div', { 'class': 'choices' });
    f.values.forEach(function (v, i) {
      var id = fieldId(f.name) + '-' + v;
      var inp = el('input', { type: isRadio ? 'radio' : 'checkbox', name: f.name, value: v, id: id });
      inp.checked = isRadio ? cur === v : cur.indexOf(v) >= 0;
      inp.dataset.field = f.name;
      if (isRadio && f.required) inp.setAttribute('required', '');   /* form is novalidate, so no browser bubble */
      var sub = optionSub(f, v);
      box.appendChild(el('label', { 'class': 'choice', 'for': id }, [inp, el('span', {}, [el('b', { text: optionLabel(f, v) }), sub ? el('small', { text: sub }) : null])]));
    });
    kids.push(box);
    kids.push(el('p', { 'class': 'err', id: 'err-' + f.name }));
    var fs = el('fieldset', { 'class': 'field', 'aria-describedby': descr.join(' ') }, kids);
    if (f.bare) kids[0].className = 'sr-only';
    return fs;
  }

  function renderConsent(f) {
    var id = fieldId(f.name);
    var inp = el('input', { type: 'checkbox', name: f.name, value: 'true', id: id, 'aria-describedby': 'err-' + f.name, 'aria-required': 'true' });
    inp.checked = state.answers[f.name] === true;
    inp.dataset.field = f.name;
    return el('div', { 'class': 'field' }, [
      el('label', { 'class': 'choice', 'for': id }, [inp, el('span', {}, [el('b', { text: labelOf(f) })])]),
      el('p', { 'class': 'err', id: 'err-' + f.name })
    ]);
  }

  function renderField(f) {
    if (f.type === 'radio' || f.type === 'checks') return renderGroup(f);
    if (f.type === 'consent') return renderConsent(f);
    if (f.type === 'select') return renderSelect(f);
    return renderText(f);
  }

  /* screens */
  function steps() { return STEPS[state.role] || []; }
  /* prefix is read only by screen readers, so "Question 2 of 8" is heard when focus lands on the heading */
  function heading(text, prefix) {
    return el('h2', { id: 'q-title', tabindex: '-1' }, [prefix ? el('span', { 'class': 'sr-only', text: prefix + ': ' }) : null, text]);
  }

  function render(focus) {
    stopVoice();
    stepEl.textContent = '';
    state.sendError = state.sendError && state.step === steps().length;
    var focusTarget = null;
    if (!state.role) {
      progress.hidden = true;
      stepEl.appendChild(heading(t('q_role')));
      var rf = radio('role', ['team', 'codesigner'], { label: 'q_role', bare: true });
      stepEl.appendChild(renderGroup(rf));
      backBtn.hidden = true;
      nextBtn.textContent = t('next');
    } else if (state.step < steps().length) {
      var s = steps()[state.step], n = state.step + 1, m = steps().length;
      progress.hidden = false;
      progressText.textContent = fmt('progress', { n: n, m: m });
      progressFill.style.width = Math.round(n / m * 100) + '%';
      stepEl.appendChild(heading(t(s.title), progressText.textContent));
      if (s.help) stepEl.appendChild(el('p', { 'class': 'help', text: t(s.help) }));
      if (!SR && s.fields.some(function (f) { return f.voice; })) stepEl.appendChild(el('p', { 'class': 'hint', text: t('voice_unsupported') }));
      s.fields.forEach(function (f) { stepEl.appendChild(renderField(f)); });
      backBtn.hidden = state.step === 0 && !state.askedRole;
      nextBtn.textContent = t('next');
    } else {
      progress.hidden = false;
      progressText.textContent = t('review_title');
      progressFill.style.width = '100%';
      stepEl.appendChild(heading(t('review_title')));
      stepEl.appendChild(el('p', { 'class': 'help', text: t('review_help') }));
      stepEl.appendChild(renderReview());
      stepEl.appendChild(el('p', { 'class': 'hint', id: 'send-note', text: t('send_note') }));
      if (state.sendError) {
        var errP = el('p', { 'class': 'err', 'data-show': '1', id: 'send-err', tabindex: '-1', text: t('fail') });
        stepEl.appendChild(errP);
        focusTarget = errP;
      }
      backBtn.hidden = false;
      nextBtn.textContent = state.sendError ? t('retry') : t('send');
    }
    if (focus !== false) {
      window.scrollTo(0, 0);
      (focusTarget || $('q-title')).focus();
    }
  }

  function displayValue(f) {
    var v = state.answers[f.name];
    if (f.type === 'consent') return v === true ? t('yes') : '';
    if (f.type === 'radio' || f.type === 'select') return v ? optionLabel(f, v) : '';
    if (f.type === 'checks') return (v || []).map(function (x) { return optionLabel(f, x); }).join(', ');
    return String(v || '').trim();
  }

  function renderReview() {
    var dl = el('dl', { 'class': 'review' });
    steps().forEach(function (s, i) {
      s.fields.forEach(function (f) {
        var val = displayValue(f), label = labelOf(f);
        var btn = el('button', { type: 'button', 'aria-label': fmt('edit_label', { q: label }), text: t('edit') });
        btn.addEventListener('click', function () { goTo(i); });
        dl.appendChild(el('div', { 'class': 'row' }, [
          el('dt', { text: label }),
          el('dd', {}, [el('span', { 'class': 'val', text: val || t('not_given') }), btn])
        ]));
      });
    });
    return dl;
  }

  function goTo(i) {
    state.step = i;
    save();
    render(true);
  }

  /* reading answers from the DOM */
  function readField(f) {
    if (f.type === 'consent') return !!(form.elements[f.name] && form.elements[f.name].checked);
    if (f.type === 'radio') { var r = form.querySelector('input[name="' + f.name + '"]:checked'); return r ? r.value : ''; }
    if (f.type === 'checks') {
      var out = [], nodes = form.querySelectorAll('input[name="' + f.name + '"]:checked');
      for (var i = 0; i < nodes.length; i++) out.push(nodes[i].value);
      return out;
    }
    var c = $(fieldId(f.name));
    return c ? c.value : '';
  }
  function fieldByName(name) {
    var list = state.role ? allFields(state.role) : [];
    for (var i = 0; i < list.length; i++) if (list[i].name === name) return list[i];
    return null;
  }
  function clearError(f) {
    var e = $('err-' + f.name);
    if (e) { e.textContent = ''; e.removeAttribute('data-show'); }
    var nodes = form.querySelectorAll('[name="' + f.name + '"]');
    for (var i = 0; i < nodes.length; i++) nodes[i].removeAttribute('aria-invalid');
  }
  function showError(f, msg) {
    var e = $('err-' + f.name);
    if (e) { e.textContent = msg; e.setAttribute('data-show', '1'); }
    var nodes = form.querySelectorAll('[name="' + f.name + '"]');
    for (var i = 0; i < nodes.length; i++) nodes[i].setAttribute('aria-invalid', 'true');
  }
  function firstControl(f) { return form.querySelector('[name="' + f.name + '"]'); }

  function onChange(e) {
    var name = e.target && e.target.dataset && e.target.dataset.field;
    if (!name) return;
    if (name === 'role') { state.answers.role = e.target.value; return; }   /* survives a language switch */
    var f = fieldByName(name);
    if (!f) return;
    if (f.type === 'checks' && e.type === 'change' && e.target.checked && f.values.indexOf('none') >= 0) {
      var nodes = form.querySelectorAll('input[name="' + f.name + '"]');
      for (var i = 0; i < nodes.length; i++) {
        if (e.target.value === 'none' ? nodes[i].value !== 'none' : nodes[i].value === 'none') nodes[i].checked = false;
      }
    }
    state.answers[f.name] = readField(f);
    clearError(f);
    save();
  }
  stepEl.addEventListener('input', onChange);
  stepEl.addEventListener('change', onChange);

  /* validation of the current screen */
  function validateStep(i) {
    var bad = [], onScreen = i === state.step;
    steps()[i].fields.forEach(function (f) {
      if (onScreen) state.answers[f.name] = readField(f);
      var msg = validateField(f, state.answers[f.name], state.lang, state.answers);
      if (msg) bad.push({ f: f, msg: msg });
    });
    return bad;
  }
  function reportErrors(bad) {
    bad.forEach(function (b) { showError(b.f, b.msg); });
    announce(fmt('err_intro', { e: labelOf(bad[0].f) + '. ' + bad[0].msg }));
    var c = firstControl(bad[0].f);
    if (c) c.focus();
  }

  /* voice input */
  var rec = null;
  function stopVoice() { if (rec) { try { rec.stop(); } catch (e) {} } }
  function toggleVoice(btn, input) {
    if (rec) { stopVoice(); return; }
    var r, gotError = false, gotResult = false;
    try { r = new SR(); } catch (e) { announce(t('voice_err')); return; }
    r.lang = state.lang === 'am' ? 'am-ET' : 'en-US';
    r.interimResults = false;
    r.continuous = false;
    r.onresult = function (ev) {
      var s = '';
      for (var i = ev.resultIndex; i < ev.results.length; i++) if (ev.results[i].isFinal) s += ev.results[i][0].transcript;
      s = s.trim();
      if (!s) return;
      gotResult = true;
      input.value = (input.value.trim() ? input.value.replace(/\s+$/, '') + ' ' : '') + s;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      announce(t('heard'));
    };
    r.onerror = function () { gotError = true; announce(t('voice_err')); };
    r.onend = function () {
      rec = null;
      btn.setAttribute('aria-pressed', 'false');
      if (!gotError && !gotResult) announce(t('stopped'));
    };
    try { r.start(); } catch (e) { announce(t('voice_err')); return; }
    rec = r;
    btn.setAttribute('aria-pressed', 'true');
    announce(t('listening'));
  }

  /* submit */
  function setBusy(on) {
    state.busy = on;
    /* aria-disabled, not disabled: a disabled button drops keyboard focus to the page top */
    nextBtn.setAttribute('aria-disabled', on ? 'true' : 'false');
    backBtn.setAttribute('aria-disabled', on ? 'true' : 'false');
    if (on) nextBtn.textContent = t('sending');
  }

  function send() {
    var hp = $('website');
    if (hp && hp.value) { finish(false); return; }
    for (var i = 0; i < steps().length; i++) {
      var bad = validateStep(i);
      if (bad.length) { goTo(i); reportErrors(bad); return; }
    }
    var body = JSON.stringify(buildPayload(state.role, state.lang, state.answers));
    var endpoint = String((window.DB_CONFIG && window.DB_CONFIG.endpoint) || '').trim();
    if (!endpoint) { finish(true); return; }
    setBusy(true);
    announce(t('sending'));
    fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: body })
      .then(function () { finish(false); }, function () {
        setBusy(false);
        state.sendError = true;
        render(true);
      });
  }

  function finish(preview) {
    store(key(), null);
    form.hidden = true;
    progress.hidden = true;
    savedEl.textContent = '';
    var box = el('div', { 'class': 'done' });
    var h = el('h2', { tabindex: '-1', text: t('done_title') });
    box.appendChild(h);
    box.appendChild(el('p', { text: t('done_body') }));
    if (preview) box.appendChild(el('p', { 'class': 'hint', text: t('preview') }));
    if (state.lang === 'am') {
      box.appendChild(el('p', { lang: 'en', text: T.en.done_title + ' ' + T.en.done_body }));
      if (preview) box.appendChild(el('p', { 'class': 'hint', lang: 'en', text: T.en.preview }));
    }
    doneEl.textContent = '';
    doneEl.appendChild(box);
    doneEl.hidden = false;
    window.scrollTo(0, 0);
    h.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (state.busy) return;
    if (!state.role) {
      var r = form.querySelector('input[name="role"]:checked');
      if (!r) { reportErrors([{ f: { name: 'role', type: 'radio', label: 'q_role' }, msg: t('err_choose') }]); return; }
      startRole(r.value);
      return;
    }
    if (state.step < steps().length) {
      var bad = validateStep(state.step);
      if (bad.length) { reportErrors(bad); return; }
      goTo(state.step + 1);
      return;
    }
    send();
  });

  backBtn.addEventListener('click', function () {
    if (state.busy) return;
    if (state.step > 0) { goTo(state.step - 1); return; }
    if (state.askedRole) { state.role = null; state.answers = {}; render(true); }
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (b) setLang(b.dataset.lang, true);
  });

  function startRole(role) {
    state.role = STEPS[role] ? role : null;
    state.answers = {};
    state.step = 0;
    if (!state.role) { state.askedRole = true; render(true); return; }
    restore();
    render(state.askedRole);
  }

  /* places left per track, numbers only; the form works without it */
  function loadCapacity() {
    var endpoint = String((window.DB_CONFIG && window.DB_CONFIG.endpoint) || '').trim();
    if (!endpoint || !window.fetch) return;
    fetch(endpoint + '?view=capacity').then(function (r) { return r.json(); }).then(function (c) {
      if (!c || typeof c !== 'object') return;
      state.capacity = c;
      if (state.role === 'team' && state.step === 0) render(false);
    }).catch(function () {});
  }

  /* boot */
  setLang(params.get('lang') || read('db-lang') || 'en', false);
  var urlRole = params.get('role');
  if (!STEPS[urlRole]) state.askedRole = true;
  startRole(urlRole);
  loadCapacity();
})();
