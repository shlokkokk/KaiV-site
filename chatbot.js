(function () {
  'use strict';

  if (window.KaiVidhyaChatbotInitialized) return;
  window.KaiVidhyaChatbotInitialized = true;

  var STORAGE_KEY = 'kaiv-chatbot-history-v3';
  var OPEN_KEY = 'kaiv-chatbot-open-v1';
  var MAX_HISTORY = 34;
  var lastReplyText = '';

  var quickReplies = {
    greeting: [
      'Hi. I am your Kai-V Assistant. Ask me about inception, founders, faculty, courses, admissions, results, or contact details.',
      'Welcome to Kai-V. I can answer institute history, team member details, and program guidance.'
    ],
    admissions: [
      'For admissions, share your class and board on the Contact page. The team will guide you with the right program flow.',
      'Admissions are handled directly by the institute team. Use Contact for counselling, stream selection, and onboarding support.'
    ],
    courses: [
      'Kai-V offers integrated coaching for XI and XII Commerce, B.Com., and CA/CMA pathways under one ecosystem.',
      'Programs are structured to connect school commerce to professional readiness through concept and application.'
    ],
    results: [
      'Please open the Results page for year-wise performance, achievers, and high-scorer highlights.',
      'Results and score highlights are available in the Results section with batch/year breakdowns.'
    ],
    fees: [
      'Fee depends on class, stream, and batch plan. Share your requirement on Contact to get exact details.',
      'For accurate fees, submit class + board details through Contact and the team will respond.'
    ],
    timings: [
      'Batch schedules vary by course and board. Please use Contact for current slot availability.',
      'Timings are finalized per batch. The Contact team can share the latest schedule.'
    ],
    contact: [
      'Contact channels: phone +91 9537 337 337, email info@kaividhya.com, Instagram @kai__vidhya.',
      'Use Contact page for phone, email, map, and enquiry form support.'
    ],
    gallery: [
      'Open Gallery for workshops, events, and student activity highlights.',
      'Gallery showcases academic and cultural snapshots from Kai-V programs.'
    ],
    thanks: ['Happy to help.', 'Anytime. Ask me anything else about Kai-V.']
  };

  var teamProfiles = [
    {
      name: 'Swapnil Shah',
      role: 'Director and Founder',
      summary: 'Founder of SSIC with 27+ years in commerce education and mentorship to 7,000+ students.',
      details: 'Specialization: Accounting, Cost Accounting, Finance, Management Accounting, Taxation. Built a faculty ecosystem of CAs, CMAs, and PhDs.',
      aliases: ['swapnil', 'swapnil shah', 'shah sir', 'director swapnil']
    },
    {
      name: 'Pratik Desai',
      role: 'Director and Founder',
      summary: '20+ years of experience in Accountancy, Finance, and Business Studies with application-driven teaching.',
      details: 'PGT and coordinator experience. Diploma in Taxation (4th rank, M.S. University). Led curriculum and exam systems.',
      aliases: ['pratik', 'pratik desai', 'desai sir', 'director pratik']
    },
    { name: 'Sweta Shah', role: 'Core Faculty', summary: 'C.A. Inter, M.Com., Dip. in Taxation Practice.', aliases: ['sweta', 'sweta shah'] },
    { name: 'Deepa Mane', role: 'Core Faculty', summary: 'M.Sc. (Applied Mathematics), B.Ed.', aliases: ['deepa', 'deepa mane'] },
    { name: 'Pooja Maroo', role: 'Core Faculty', summary: 'PGDCABM, JCP.', aliases: ['pooja', 'pooja maroo'] },
    { name: 'Lovely Kandpal', role: 'Core Faculty', summary: 'M.Com.', aliases: ['lovely', 'kandpal', 'lovely kandpal'] },
    { name: 'Chandni Lalwani', role: 'Core Faculty', summary: 'M.Com. (BADM, ABST), M.A., B.Ed. (Economics).', aliases: ['chandni', 'lalwani', 'chandni lalwani'] },
    { name: 'Maitry Acharya', role: 'Core Faculty', summary: 'M.A. (English Literature).', aliases: ['maitry', 'acharya', 'maitry acharya'] },
    { name: 'Dr. Vinod K. Padaria', role: 'Core Faculty', summary: 'M.A., Ph.D. (Economics), M.Com. (Business Economics).', aliases: ['vinod', 'padaria', 'dr vinod', 'vinod padaria'] },
    { name: 'Ronak Shah', role: 'Core Faculty', summary: 'M.Sc. (Maths), B.Ed.', aliases: ['ronak', 'ronak shah'] },
    { name: 'Sonali Nandedkar', role: 'Core Faculty', summary: 'MBA (HR), M.Com., PGD HRD, B.Ed. (Gold Medal).', aliases: ['sonali', 'nandedkar', 'sonali nandedkar'] },
    { name: 'Harnish Mahera', role: 'Visiting Faculty', summary: 'M.Com., B.Ed., M.Phil.', aliases: ['harnish', 'mahera', 'harnish mahera'] },
    { name: 'Piyush Rohit', role: 'Core Faculty', summary: 'MCA, B.Ed.', aliases: ['piyush', 'rohit', 'piyush rohit'] },
    { name: 'CA Brijesh Gandhi', role: 'Visiting Faculty', summary: 'Expert Visiting Faculty.', aliases: ['brijesh', 'gandhi', 'ca brijesh', 'brijesh gandhi'] },
    { name: 'CA Kashyap Modi', role: 'Visiting Faculty', summary: 'Expert Visiting Faculty.', aliases: ['kashyap', 'modi', 'ca kashyap', 'kashyap modi'] },
    { name: 'Tridal Upadhyay', role: 'Visiting Faculty', summary: 'MBA (Gold Medalist, IIM), IMS.', aliases: ['tridal', 'upadhyay', 'tridal upadhyay'] },
    { name: 'CA Parth Shah', role: 'Visiting Faculty', summary: 'Expert Visiting Faculty.', aliases: ['parth', 'parth shah', 'ca parth'] },
    { name: 'Bijal Shah', role: 'Visiting Faculty', summary: 'B.Com. (Hons.), TTC.', aliases: ['bijal', 'bijal shah'] },
    { name: 'Mittal Darji', role: 'Administration', summary: 'Admin team member.', aliases: ['mittal', 'darji', 'mittal darji'] },
    { name: 'Hetavi Sanghvi', role: 'Administration', summary: 'Admin team member.', aliases: ['hetavi', 'sanghvi', 'hetavi sanghvi'] }
  ];

  var knowledgeBase = [
    {
      keywords: ['why kai-v', 'why kaiv', 'name kai-v', 'meaning of kai-v', 'what is kai-v', 'kai-vidhya meaning'],
      message: [
        'Kai-V stands for Knowledge, Application, Integration, Vocational.',
        '',
        'The identity combines two ideas:',
        '- Kai: depth, strength, restoration, protection, and ocean-like vastness',
        '- Vidhya: Sanskrit for knowledge, learning, and wisdom',
        '',
        'So the core idea becomes: Ocean of Knowledge.'
      ].join('\n'),
      action: { label: 'Read Inception', href: 'about.html' }
    },
    {
      keywords: ['inception', 'history', 'journey', 'how started', 'when started', 'timeline', 'ssic', 'shared vision'],
      message: [
        'Kai-V journey:',
        '- 1999: SSIC founded by Swapnil Shah with focus on conceptual clarity',
        '- 2000s: Pratik Desai drove concept and application-based commerce teaching',
        '- 2021: shared mission aligned',
        '- 2024: Kai-V launched as integrated institute for XI/XII Commerce, B.Com., and CA/CMA',
        '- Present: KAI-Vidhya Services Pvt. Ltd. as a unified academic ecosystem'
      ].join('\n'),
      action: { label: 'Open About', href: 'about.html' }
    },
    {
      keywords: ['founder', 'founders', 'director', 'directors', 'who started', 'who runs kai-v', 'leadership'],
      message: [
        'Kai-V is led by two founders:',
        '- Swapnil Shah: Director and Founder, 27+ years, SSIC foundation',
        '- Pratik Desai: Director and Founder, 20+ years, application-driven academic leadership',
        '',
        'Both founders combined their strengths to build one integrated commerce journey.'
      ].join('\n'),
      action: { label: 'View Team', href: 'team.html' }
    },
    {
      keywords: ['logo', 'logo meaning', 'symbol', 'representation', 'shell', 'ocean of knowledge', 'identity'],
      message: [
        'Kai-V identity represents:',
        '- conceptual shelter and restoration',
        '- strength to withstand challenges',
        '- ocean-like depth of learning',
        '- mentorship that protects and polishes student potential',
        '- wisdom-led growth and professional readiness'
      ].join('\n'),
      action: { label: 'Read About', href: 'about.html' }
    },
    {
      keywords: ['philosophy', 'knowledge application integration vocational', 'teaching approach', 'framework'],
      message: [
        'Kai-V academic framework is:',
        'Knowledge -> Application -> Integration -> Vocational Excellence',
        '',
        'Focus is on conceptual clarity, real-world application, cross-subject integration, and career readiness.'
      ].join('\n'),
      action: { label: 'Open About', href: 'about.html' }
    },
    {
      keywords: ['team', 'faculty', 'teachers', 'mentor', 'mentors', 'visiting faculty', 'core faculty', 'administration'],
      message: [
        'Kai-V team includes Directors, Core Faculty, Visiting Faculty, and Administration.',
        'Ask me any specific name and I will return profile details.'
      ].join('\n'),
      action: { label: 'Open Team', href: 'team.html' }
    },
    {
      keywords: ['contact', 'phone', 'email', 'instagram', 'social', 'reach', 'address', 'map'],
      message: [
        'Contact details:',
        '- Phone: +91 9537 337 337',
        '- Email: info@kaividhya.com',
        '- Instagram: @kai__vidhya',
        '',
        'Use the Contact page for enquiry form and center map.'
      ].join('\n'),
      action: { label: 'Open Contact', href: 'contact.html' }
    }
  ];

  var fallbackSuggestions = [
    'Tell me the inception of Kai-V',
    'Who are the founders?',
    'Who is Swapnil Shah?',
    'Who is CA Kashyap Modi?',
    'Explain Kai-V meaning',
    'Share contact details'
  ];

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function pickNonRepeating(items, previous) {
    if (!items || !items.length) return '';
    if (items.length === 1) return items[0];

    var candidate = randomItem(items);
    var guard = 0;
    while (candidate === previous && guard < 6) {
      candidate = randomItem(items);
      guard += 1;
    }
    return candidate;
  }

  function normalize(text) {
    return (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(text) {
    var n = normalize(text);
    return n ? n.split(' ') : [];
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a) return b.length;
    if (!b) return a.length;

    var matrix = [];
    var i;
    for (i = 0; i <= b.length; i++) matrix[i] = [i];
    for (i = 0; i <= a.length; i++) matrix[0][i] = i;

    for (var j = 1; j <= b.length; j++) {
      for (i = 1; i <= a.length; i++) {
        if (b.charAt(j - 1) === a.charAt(i - 1)) {
          matrix[j][i] = matrix[j - 1][i - 1];
        } else {
          matrix[j][i] = Math.min(
            matrix[j - 1][i - 1] + 1,
            matrix[j][i - 1] + 1,
            matrix[j - 1][i] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function loadHistory() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(history) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY)));
    } catch (e) {
      // ignore storage failures
    }
  }

  function loadOpenState() {
    return false;
  }

  function saveOpenState(open) {
    return open;
  }

  function scoreEntry(question, entry) {
    var q = normalize(question);
    var qTokens = tokenize(question);
    if (!q) return 0;

    var score = 0;
    for (var i = 0; i < entry.keywords.length; i++) {
      var keyword = normalize(entry.keywords[i]);
      if (!keyword) continue;

      if (q === keyword) {
        score += 14;
        continue;
      }

      if (q.indexOf(keyword) !== -1) {
        score += keyword.indexOf(' ') !== -1 ? 9 : 5;
        continue;
      }

      var kTokens = tokenize(keyword);
      var matches = 0;
      for (var t = 0; t < kTokens.length; t++) {
        if (qTokens.indexOf(kTokens[t]) !== -1) matches += 1;
      }

      if (matches === kTokens.length && matches > 1) score += 7;
      else if (matches >= 2) score += 4;
      else if (matches === 1) score += 1;
    }

    return score;
  }

  function profileAliasList(profile) {
    var aliases = profile.aliases ? profile.aliases.slice() : [];
    aliases.push(profile.name);

    var simpleName = normalize(profile.name)
      .replace(/\b(ca|dr|prof)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (simpleName) aliases.push(simpleName);

    var tokens = tokenize(simpleName);
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].length >= 3) aliases.push(tokens[i]);
    }

    return aliases;
  }

  function buildFacultyReply(profile) {
    var lines = [profile.name, profile.role, profile.summary || ''];
    if (profile.details) lines.push(profile.details);

    return {
      message: lines.filter(Boolean).join('\n'),
      action: { label: 'Open Team', href: 'team.html' }
    };
  }

  function findTeamMatch(question) {
    var q = normalize(question);
    if (!q) return null;

    var qTokens = tokenize(q);
    var best = null;
    var bestScore = 0;

    for (var i = 0; i < teamProfiles.length; i++) {
      var p = teamProfiles[i];
      var aliases = profileAliasList(p);
      var score = 0;

      var normalizedName = normalize(p.name);
      if (q.indexOf(normalizedName) !== -1) score += 14;

      for (var a = 0; a < aliases.length; a++) {
        var alias = normalize(aliases[a]);
        if (!alias) continue;

        if (q.indexOf(alias) !== -1) score += alias.indexOf(' ') !== -1 ? 7 : 3;
      }

      var nameTokens = tokenize(normalizedName);
      for (var t = 0; t < nameTokens.length; t++) {
        var token = nameTokens[t];
        if (token.length < 3) continue;

        if (qTokens.indexOf(token) !== -1) {
          score += 2;
          continue;
        }

        for (var qt = 0; qt < qTokens.length; qt++) {
          if (qTokens[qt].length >= 4 && levenshtein(token, qTokens[qt]) <= 1) {
            score += 1;
            break;
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }

    if (best && bestScore >= 5) {
      return buildFacultyReply(best);
    }

    var asksFaculty = /\b(faculty|teacher|mentor|maam|mam|madam|sir|professor|admin|administration)\b/.test(q);
    if (asksFaculty) {
      return {
        message: [
          'I could not map that exact faculty name from current team data.',
          'Try full name format, for example:',
          '- Swapnil Shah',
          '- Pratik Desai',
          '- CA Kashyap Modi',
          '- Dr. Vinod K. Padaria',
          '- Sonali Nandedkar'
        ].join('\n'),
        action: { label: 'View Full Team', href: 'team.html' }
      };
    }

    return null;
  }

  function getKnowledgeReply(question) {
    var byName = findTeamMatch(question);
    if (byName) return byName;

    var best = null;
    var bestScore = 0;
    for (var i = 0; i < knowledgeBase.length; i++) {
      var score = scoreEntry(question, knowledgeBase[i]);
      if (score > bestScore) {
        bestScore = score;
        best = knowledgeBase[i];
      }
    }

    if (best && bestScore >= 3) {
      return { message: best.message, action: best.action || null };
    }

    return null;
  }

  function classifyIntent(text) {
    var q = normalize(text);
    if (/\b(hi|hello|hey|yo|namaste|good morning|good evening)\b/.test(q)) return 'greeting';
    if (/\b(admission|admissions|enroll|enrol|join|apply|counselling|counseling)\b/.test(q)) return 'admissions';
    if (/\b(course|courses|class|classes|commerce|cbse|gseb|bcom|ca|cma|xi|xii)\b/.test(q)) return 'courses';
    if (/\b(result|results|score|performance|rank|topper|achiever|high scorer)\b/.test(q)) return 'results';
    if (/\b(fee|fees|cost|price|charges)\b/.test(q)) return 'fees';
    if (/\b(timing|time|schedule|batch|slot)\b/.test(q)) return 'timings';
    if (/\b(contact|call|phone|email|whatsapp|reach|address|map|location|instagram)\b/.test(q)) return 'contact';
    if (/\b(gallery|event|workshop|seminar|photo)\b/.test(q)) return 'gallery';
    if (/\b(thank|thanks|thx)\b/.test(q)) return 'thanks';
    return 'fallback';
  }

  function resolveAction(intent) {
    if (intent === 'results') return { label: 'Open Results', href: 'results.html' };
    if (intent === 'gallery') return { label: 'Open Gallery', href: 'gallery.html' };
    if (intent === 'courses') return { label: 'Open About', href: 'about.html' };
    if (intent === 'contact' || intent === 'admissions' || intent === 'fees' || intent === 'timings') {
      return { label: 'Open Contact', href: 'contact.html' };
    }
    return null;
  }

  function buildFallbackReply() {
    var first = randomItem(fallbackSuggestions);
    var second = randomItem(fallbackSuggestions);
    var guard = 0;
    while (second === first && guard < 5) {
      second = randomItem(fallbackSuggestions);
      guard += 1;
    }

    return {
      message: [
        'I did not fully map that question yet, but I can answer precise Kai-V queries.',
        'Try one of these:',
        '- ' + first,
        '- ' + second
      ].join('\n'),
      action: { label: 'Open About', href: 'about.html' }
    };
  }

  function getAssistantReply(text) {
    var smart = getKnowledgeReply(text);
    if (smart) return smart;

    var intent = classifyIntent(text);
    if (intent === 'fallback') return buildFallbackReply();

    var message = pickNonRepeating(quickReplies[intent] || quickReplies.greeting, lastReplyText);
    lastReplyText = message;

    return {
      message: message,
      action: resolveAction(intent)
    };
  }

  function buildStyles() {
    var style = document.createElement('style');
    style.id = 'kaiv-chatbot-style';
    style.textContent = [
      ':root {',
      '  --kvbot-accent: #2563eb;',
      '  --kvbot-accent-deep: #1d4ed8;',
      '  --kvbot-surface: #ffffff;',
      '  --kvbot-soft: #eff6ff;',
      '  --kvbot-border: #bfdbfe;',
      '  --kvbot-text: #1f2937;',
      '  --kvbot-muted: #6b7280;',
      '  --kvbot-shadow: 0 20px 45px rgba(30, 58, 138, 0.24);',
      '}',
      'html.dark {',
      '  --kvbot-accent: #60a5fa;',
      '  --kvbot-accent-deep: #3b82f6;',
      '  --kvbot-surface: #111827;',
      '  --kvbot-soft: #172554;',
      '  --kvbot-border: #1d4ed8;',
      '  --kvbot-text: #f9fafb;',
      '  --kvbot-muted: #9ca3af;',
      '  --kvbot-shadow: 0 18px 42px rgba(0, 0, 0, 0.5);',
      '}',
      '#kvbot-root { position: fixed; right: 22px; bottom: 22px; width: 62px; height: 62px; z-index: 9999; font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; }',
      '.kvbot-fab { position: fixed; right: 22px; bottom: 22px; width: 62px; height: 62px; border: none; border-radius: 50%; color: #fff; font-size: 26px; cursor: pointer; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 25% 25%, #60a5fa 0%, var(--kvbot-accent) 58%, var(--kvbot-accent-deep) 100%); box-shadow: var(--kvbot-shadow); transition: transform .2s ease; animation: kvbot-pulse 2.4s infinite; }',
      '.kvbot-fab:hover { transform: translateY(-2px) scale(1.03); }',
      '.kvbot-panel { position: fixed; right: 22px; bottom: 94px; width: min(380px, calc(100vw - 22px)); height: min(560px, calc(100dvh - 180px)); max-height: calc(100dvh - 130px); border-radius: 20px; border: 1px solid var(--kvbot-border); background: linear-gradient(180deg, var(--kvbot-surface) 0%, var(--kvbot-soft) 100%); box-shadow: var(--kvbot-shadow); overflow: hidden; display: flex; flex-direction: column; transform-origin: bottom right; transform: translateY(8px) scale(.96); opacity: 0; pointer-events: none; transition: transform .22s ease, opacity .22s ease; }',
      '#kvbot-root.open .kvbot-panel { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }',
      '#kvbot-root.open .kvbot-fab { animation: none; transform: rotate(10deg); }',
      '.kvbot-nudge { position: fixed; right: 22px; bottom: 96px; width: clamp(230px, 26vw, 300px); max-width: calc(100vw - 22px); background: var(--kvbot-surface); color: var(--kvbot-text); border: 1px solid var(--kvbot-border); border-radius: 14px; padding: 11px 13px; box-shadow: var(--kvbot-shadow); font-size: 13px; line-height: 1.45; opacity: 0; transform: translateY(8px); pointer-events: none; transition: opacity .24s ease, transform .24s ease; }',
      '.kvbot-nudge::after { content: ""; position: absolute; right: 18px; bottom: -7px; width: 12px; height: 12px; transform: rotate(45deg); background: var(--kvbot-surface); border-right: 1px solid var(--kvbot-border); border-bottom: 1px solid var(--kvbot-border); }',
      '#kvbot-root.show-nudge .kvbot-nudge { opacity: 1; transform: translateY(0); pointer-events: auto; }',
      '.kvbot-header { padding: 13px 14px; background: linear-gradient(135deg, var(--kvbot-accent), var(--kvbot-accent-deep)); color: #fff; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }',
      '.kvbot-title { line-height: 1.25; }',
      '.kvbot-title strong { display: block; font-size: 14px; }',
      '.kvbot-title span { font-size: 12px; opacity: .92; }',
      '.kvbot-controls { display: flex; gap: 6px; align-items: center; }',
      '.kvbot-refresh, .kvbot-close { border: none; background: rgba(255,255,255,.2); color: #fff; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; }',
      '.kvbot-refresh:hover, .kvbot-close:hover { background: rgba(255,255,255,.3); }',
      '.kvbot-close { border: none; background: rgba(255,255,255,.2); color: #fff; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; font-size: 18px; }',
      '.kvbot-messages { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 16px 14px; display: flex; flex-direction: column; gap: 11px; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; }',
      '.kvbot-messages::-webkit-scrollbar { width: 8px; }',
      '.kvbot-messages::-webkit-scrollbar-thumb { background: rgba(37,99,235,.35); border-radius: 8px; }',
      '.kvbot-msg { max-width: 88%; border-radius: 14px; padding: 10px 12px; font-size: 14px; line-height: 1.42; color: var(--kvbot-text); white-space: pre-line; word-wrap: break-word; }',
      '.kvbot-msg.user { align-self: flex-end; background: linear-gradient(135deg, var(--kvbot-accent), var(--kvbot-accent-deep)); color: #fff; border-bottom-right-radius: 4px; }',
      '.kvbot-msg.bot { align-self: flex-start; background: rgba(255,255,255,.72); border: 1px solid var(--kvbot-border); border-bottom-left-radius: 4px; }',
      'html.dark .kvbot-msg.bot { background: rgba(17,24,39,.72); }',
      '.kvbot-action { margin-top: 7px; display: inline-block; color: var(--kvbot-accent-deep); text-decoration: none; font-weight: 600; font-size: 12px; }',
      '.kvbot-typing { display: inline-flex; gap: 4px; align-items: center; }',
      '.kvbot-typing i { width: 6px; height: 6px; border-radius: 999px; background: var(--kvbot-muted); animation: kvbot-bounce 1s infinite ease-in-out; }',
      '.kvbot-typing i:nth-child(2) { animation-delay: .12s; }',
      '.kvbot-typing i:nth-child(3) { animation-delay: .24s; }',
      '.kvbot-quick { flex-shrink: 0; padding: 2px 12px 10px; display: flex; gap: 7px; overflow-x: auto; overflow-y: hidden; }',
      '.kvbot-quick::-webkit-scrollbar { height: 5px; }',
      '.kvbot-quick::-webkit-scrollbar-thumb { background: rgba(37,99,235,.28); border-radius: 6px; }',
      '.kvbot-chip { border: 1px solid var(--kvbot-border); color: var(--kvbot-text); background: var(--kvbot-surface); border-radius: 999px; font-size: 12px; padding: 7px 10px; cursor: pointer; white-space: nowrap; }',
      '.kvbot-input-wrap { flex-shrink: 0; margin: 2px 10px 12px; padding: 10px; border: 1px solid var(--kvbot-border); border-radius: 14px; background: rgba(255,255,255,.62); display: flex; gap: 8px; }',
      'html.dark .kvbot-input-wrap { background: rgba(17,24,39,.6); }',
      '.kvbot-input { flex: 1; border: 1px solid var(--kvbot-border); border-radius: 10px; padding: 9px 10px; font-size: 14px; background: transparent; color: var(--kvbot-text); }',
      '.kvbot-send { border: none; background: linear-gradient(135deg, var(--kvbot-accent), var(--kvbot-accent-deep)); color: #fff; border-radius: 10px; padding: 0 13px; font-size: 13px; cursor: pointer; font-weight: 600; }',
      '@keyframes kvbot-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,.36), var(--kvbot-shadow); } 70% { box-shadow: 0 0 0 12px rgba(37,99,235,0), var(--kvbot-shadow); } }',
      '@keyframes kvbot-bounce { 0%,80%,100% { transform: translateY(0); opacity: .45; } 40% { transform: translateY(-4px); opacity: 1; } }',
      '@media (max-height: 720px) {',
      '  .kvbot-panel { height: min(500px, calc(100dvh - 160px)); }',
      '}',
      '@media (max-width: 640px) {',
      '  #kvbot-root { right: 10px; bottom: 10px; width: 58px; height: 58px; }',
      '  .kvbot-fab { right: 10px; bottom: 10px; width: 58px; height: 58px; }',
      '  .kvbot-panel { right: 10px; bottom: 78px; width: min(380px, calc(100vw - 12px)); height: min(74dvh, 540px); max-height: calc(100dvh - 96px); }',
      '  .kvbot-nudge { right: 10px; bottom: 80px; width: min(280px, calc(100vw - 14px)); }',
      '  .kvbot-input-wrap { margin: 2px 8px 10px; }',
      '}'
    ].join('');

    document.head.appendChild(style);
  }

  function smoothScrollToBottom(container) {
    if (!container) return;

    requestAnimationFrame(function () {
      try {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      } catch (e) {
        container.scrollTop = container.scrollHeight;
      }
    });
  }

  function makeMessageNode(text, role, action) {
    var node = document.createElement('div');
    node.className = 'kvbot-msg ' + role;
    node.innerHTML = '<span>' + escapeHtml(text) + '</span>';

    if (action && action.href && action.label) {
      var link = document.createElement('a');
      link.className = 'kvbot-action';
      link.href = action.href;
      link.textContent = action.label + ' ->';
      node.appendChild(document.createElement('br'));
      node.appendChild(link);
    }

    return node;
  }

  function buildWidget() {
    buildStyles();

    var root = document.createElement('div');
    root.id = 'kvbot-root';
    root.innerHTML = [
      '<button class="kvbot-fab" aria-label="Open chatbot" title="Chat with us">💬</button>',
      '<div class="kvbot-nudge" id="kvbot-nudge">Need help with admissions, faculty details, or results? Chat with Kai-V Assistant.</div>',
      '<section class="kvbot-panel" aria-live="polite">',
      '  <header class="kvbot-header">',
      '    <div class="kvbot-title">',
      '      <strong>Kai-V Assistant</strong>',
      '      <span>Smart replies for Kai-V queries</span>',
      '    </div>',
      '    <div class="kvbot-controls">',
      '      <button class="kvbot-refresh" aria-label="Refresh chat" title="Refresh chat">↻</button>',
      '      <button class="kvbot-close" aria-label="Close chat" title="Close chat">×</button>',
      '    </div>',
      '  </header>',
      '  <div class="kvbot-messages" id="kvbot-messages"></div>',
      '  <div class="kvbot-quick">',
      '    <button class="kvbot-chip" data-q="Tell me the inception of Kai-V">Inception</button>',
      '    <button class="kvbot-chip" data-q="Who are the founders?">Founders</button>',
      '    <button class="kvbot-chip" data-q="Who is Swapnil Shah?">Swapnil Shah</button>',
      '    <button class="kvbot-chip" data-q="Share contact details">Contact</button>',
      '  </div>',
      '  <form class="kvbot-input-wrap" id="kvbot-form">',
      '    <input class="kvbot-input" id="kvbot-input" type="text" placeholder="Ask anything about Kai-V..." autocomplete="off" />',
      '    <button class="kvbot-send" type="submit">Send</button>',
      '  </form>',
      '</section>'
    ].join('');

    document.body.appendChild(root);

    return {
      root: root,
      fab: root.querySelector('.kvbot-fab'),
      nudge: root.querySelector('#kvbot-nudge'),
      panel: root.querySelector('.kvbot-panel'),
      refresh: root.querySelector('.kvbot-refresh'),
      close: root.querySelector('.kvbot-close'),
      messages: root.querySelector('#kvbot-messages'),
      form: root.querySelector('#kvbot-form'),
      input: root.querySelector('#kvbot-input'),
      chips: root.querySelectorAll('.kvbot-chip')
    };
  }

  function appendTypingNode(messagesEl) {
    var node = document.createElement('div');
    node.className = 'kvbot-msg bot';
    node.innerHTML = '<span class="kvbot-typing"><i></i><i></i><i></i></span>';
    messagesEl.appendChild(node);
    smoothScrollToBottom(messagesEl);
    return node;
  }

  function initializeChatbot() {
    var ui = buildWidget();
    var history = loadHistory();

    function appendMessage(entry) {
      ui.messages.appendChild(makeMessageNode(entry.text, entry.role, entry.action));
      smoothScrollToBottom(ui.messages);
    }

    function pushHistory(entry) {
      history.push(entry);
      history = history.slice(-MAX_HISTORY);
      saveHistory(history);
    }

    function openChat() {
      ui.root.classList.add('open');
      ui.root.classList.remove('show-nudge');
      saveOpenState(true);
      setTimeout(function () { ui.input.focus(); }, 100);
    }

    function closeChat() {
      ui.root.classList.remove('open');
      saveOpenState(false);
    }

    function resetChat() {
      history = [];
      ui.messages.innerHTML = '';
      ui.input.value = '';

      var welcomeText = pickNonRepeating(quickReplies.greeting, lastReplyText);
      lastReplyText = welcomeText;

      var welcome = {
        role: 'bot',
        text: welcomeText
      };
      appendMessage(welcome);
      pushHistory(welcome);
      openChat();
    }

    function sendUserMessage(text) {
      var trimmed = (text || '').trim();
      if (!trimmed) return;

      var userEntry = { role: 'user', text: trimmed };
      appendMessage(userEntry);
      pushHistory(userEntry);
      ui.input.value = '';

      var typingNode = appendTypingNode(ui.messages);
      var reply = getAssistantReply(trimmed);

      setTimeout(function () {
        if (typingNode && typingNode.parentNode) typingNode.parentNode.removeChild(typingNode);
        var botEntry = { role: 'bot', text: reply.message, action: reply.action || null };
        appendMessage(botEntry);
        pushHistory(botEntry);
      }, 850 + Math.floor(Math.random() * 700));
    }

    ui.fab.addEventListener('click', function () {
      if (ui.root.classList.contains('open')) closeChat();
      else openChat();
    });

    ui.close.addEventListener('click', closeChat);

    if (ui.refresh) {
      ui.refresh.addEventListener('click', function () {
        resetChat();
      });
    }

    ui.form.addEventListener('submit', function (event) {
      event.preventDefault();
      sendUserMessage(ui.input.value);
    });

    ui.chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        sendUserMessage(chip.getAttribute('data-q') || 'Help');
      });
    });

    if (ui.nudge) {
      ui.nudge.addEventListener('click', openChat);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && ui.root.classList.contains('open')) closeChat();
    });

    if (history.length) {
      history.forEach(appendMessage);
    } else {
      var welcomeText = pickNonRepeating(quickReplies.greeting, lastReplyText);
      lastReplyText = welcomeText;

      var welcome = {
        role: 'bot',
        text: welcomeText
      };
      appendMessage(welcome);
      pushHistory(welcome);
    }

    if (loadOpenState()) {
      openChat();
    } else {
      ui.root.classList.add('show-nudge');
      setTimeout(function () {
        ui.root.classList.remove('show-nudge');
      }, 6500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
  } else {
    initializeChatbot();
  }
})();
