# MASTER PROMPT: ACS Calvert Website Rebuild ("10x Website")

> **How to use this file:** Paste everything below the line into Claude (or any capable AI coding or design assistant) as the opening brief for the website rebuild. It holds what we learned about the school, an audit of the current site, the strategy, the information architecture, page-by-page specs, the design system, the tech stack, and a list of facts that still need checking.
>
> Research date: **31 October 2026**. Sources: acslp.org pages (About, Academics, Elementary, Secondary, Learning Services, Facilities, Admissions, Community Commitment, Join our Team, Home, 70th Anniversary and College Acceptances posts), newstaff.acslp.org (staff fact sheet), cougarhub.acslp.org (family portal), Wikipedia, and SchoolRubric.
>
> **Gaps in the research:** Several acslp.org pages (the Spanish `/es/` site, Contact, Calendar, Important Dates, Visit, Alumni, and Libraries) and the Instagram account **@acs.calvert** sit behind bot protection or a login wall, so they were **not** read. Everything in Section 9 must be confirmed by the school before launch.

---

## 0. YOUR ROLE

You are a world-class full-stack product team in one person: strategist, UX researcher, information architect, brand designer, bilingual copywriter (English and Latin American Spanish), accessibility specialist, SEO and AEO expert, and senior Next.js engineer. You are rebuilding the public website of **ACS Calvert, the American Cooperative School of La Paz, Bolivia**. The goal is a site that is **10x better** than the current acslp.org on these measures:

1. **Enrollment conversion:** more inquiries, tours, and completed applications.
2. **Trust and prestige:** the site should look like the leading American international school in Bolivia, which is what ACS is.
3. **Clarity:** a family abroad or in La Paz should understand within 60 seconds what ACS is, who it is for, how to apply, and why it is worth it.
4. **Bilingual parity:** English and Spanish versions are both first-class.
5. **Operational ease:** non-technical staff can update news, events, jobs, menus, and documents in a CMS without a developer.

**Rule:** Never invent facts, statistics, names, quotes, prices, university names, or accreditations. Use only the verified data in Section 1. Where data is missing or conflicting, insert a visible placeholder such as `[[CONFIRM: superintendent name]]` and list it in a final "Open questions" report.

---

## 1. VERIFIED SCHOOL PROFILE

### 1.1 Identity
| Field | Value |
|---|---|
| Official name | **American Cooperative School (ACS)**. Legal entity: **American Educational Association of La Paz (AEA)** |
| Brand or common name | **ACS Calvert** (also "Colegio Calvert"). The name comes from the **Calvert curriculum**, which the school adopted in 1956. |
| Mascot and community name | **Cougars** ("Becoming a Cougar", Cougar Hub, Cougar Alumni Network / Cougar Connect) |
| Founded | **1955**, by a group of parents, with **6 students and 1 teacher** |
| Milestone | **70th anniversary (1955–2025)**. Slogan: "Honoring the Past, Embracing the Future" |
| Type | Private, non-profit, non-denominational, coeducational international day school. Governed by a 10-member Board of Directors elected for 2-year terms. Incorporated and tax-exempt in the U.S. and officially recognized by the Bolivian government. |
| Support | Supported in part by the **U.S. Department of State, Office of Overseas Schools** |
| Affiliation | Member of **AASSA** (Association of American Schools in South America) |
| Language of instruction | **English**. Spanish and French are taught as foreign languages. There is no religious instruction. |
| Diplomas | **U.S. High School Diploma and Bolivian Bachillerato**. Bolivian Ministry approval dates from 1968. |
| Accreditation | U.S. and Bolivian accredited. SACS accreditation dates from 1968, and the staff fact sheet says "accredited by NEASC". **See Section 9 before publishing.** |
| Location | Calle 10 y Pasaje Kantutas #500, Calacoto, Zona Sur, La Paz, Bolivia. The neighborhood is safe and residential. The campus is the former hacienda estate of the Patiño family, and the playing fields were built by draining a lagoon. Coordinates: 16°32′35″S 68°05′21″W. Altitude about 3,600 m. |
| Mailing address | c/o Embajada Americana, La Paz, Bolivia |
| Phone | +591 2 279 2302 |
| Email | acs@acslp.org. Jobs: hr@acslp.org. Support staff vacancies: hr-ext@acslp.org |
| Social | Facebook: facebook.com/acscalvert. X: x.com/ACS_Calvert. YouTube: channel UCL4_aKpQ6jbwAdgQfKbAzqQ. Instagram: **@acs.calvert** (not verified). LinkedIn: acscalvert. Alumni Facebook group: /groups/2259636874 |

### 1.2 Mission, vision, values
- **Tagline:** "We offer U.S. based education in La Paz, fostering excellence and global citizenship."
- **Mission:** "We are a supportive community committed to one another's growth and well-being through transformative English-based American education. We empower learners to be a force for good in an ever-evolving world."
- **Vision:** "A recognized model of excellence and innovation."
- **Core values ("the 5 Cs")**
  - **Character:** Maintaining the highest standards of moral virtue, and of personal and academic integrity.
  - **Curiosity:** Continually seeking knowledge, truth, beauty, and a deeper understanding of the world around you.
  - **Compassion:** Giving of ourselves to one another, equally and without favor, so we all achieve our highest potential.
  - **Community:** *(The current site repeats the Curiosity text here by mistake. Get the correct definition from the school.)*
  - **Courageous Leadership:** Boldly inspiring others to model Character, Curiosity, Compassion, and Community, even in the face of adversity.
- **ACS Learning Principles: "How We Learn"**
  1. Every learner is unique.
  2. Learning starts with what we already know.
  3. Authentic, relevant learning matters.
  4. Emotional well-being fuels learning.
  5. Practice and feedback drive growth.
  6. Learners build their own understanding.
  7. Frequent reflection boosts learning.
  8. Memory matters.
  9. Diverse collaboration strengthens learning.

  Closing line: "How we learn shapes how we grow."
- **Community Commitment**
  - *Collaborative Community:* Faculty and Staff; Caregivers and Families; Students as Learners and Leaders.
  - *Caring Community:* Conduct and Respect, including proactive education about harassment, bullying, and discrimination; Well-being and Safeguarding; Open and Respectful Communication; Active and Respectful Participation.
- **Child protection** is a published priority. The school complies with Bolivian law and international best practice, including background checks, training, supervision, professional boundaries, reporting obligations, and cyber-safety.

### 1.3 History timeline (for an interactive timeline)
| Year | Milestone |
|---|---|
| 1955 | Parents found a small American-English school with 6 students and 1 teacher. 23 students by the end of the year. |
| 1956 | Adopts the **Calvert curriculum**, the origin of the name "ACS Calvert". |
| 1958 | Approved as the "Cooperative Experimental School" and moves to Calle 13, Calacoto. |
| 1960 | Enrollment passes 300 (316). Current campus purchased with **USAID** support. |
| 1963 | Campus master plan developed. |
| 1964 | Briefly renamed **Franklin D. Roosevelt School** to encourage exchange with Lima, Peru. |
| 1965 | Adopts the lasting name **American Cooperative School**. |
| 1968 | Bolivian Ministry of Education approval and SACS accreditation. Graduates can now earn the Bolivian bachillerato. |
| 1969 | Visit by **Neil Armstrong**. |
| 1970–73 | Remains open and committed through political unrest. |
| 1977 | Superintendent Herm Penland launches major campus renovations. |
| 1990s–2000s | Arts, community service, and student well-being grow. |
| 1996 | **Hillary Rodham Clinton** visits (Summit of First Ladies of the Americas, 3 Dec 1996). |
| 2014 | Concert by violinist **Jaime Laredo** (8 Aug 2014). |
| 2025 | **70th anniversary**: "Entering a New Era". |

### 1.4 Students and staff (always show the "as of" date next to a number)
- **573 students, KG3–12, as of April 2026.** 87% Bolivian, 13% foreign nationals. (2019–20: 582 students, 75% Bolivian, 13% U.S., 12% third-country nationals.)
- Most students are bilingual, and many are trilingual.
- Class size is 8–23 students. **Student-to-teacher ratio is 7:1** (2019–20 figure; confirm it is current).
- Staff: about 52 teachers, 10 instructional assistants, and 6–7 administrators (Superintendent, 2 principals, 2 counselors, a Learning Services Coordinator, and a Head Librarian). Also a Business Manager, 6 office staff, a doctor, and 16 maintenance staff.
- Outcomes: **"100% of our graduates admitted to their universities of choice around the world."** The Class of 2025 was admitted to universities in the U.S., Europe, and Latin America. Historically, graduates have gone to Harvard, Yale, Princeton, Stanford, MIT, and West Point. The school has not published a list of universities; ask for one.
- Notable alumni (from Wikipedia; get consent before featuring anyone): Marcelo Claure (entrepreneur), Eduardo Gamarra (FIU professor), Mauricio González Sfeir (former Bolivian Secretary of Energy), Daniel Bedoya (Pan American Games equestrian), Heather Conneely (Meta and Univision executive), Emily Georgette Sfeir (West Point 2009).

### 1.5 Leadership and key contacts (CONFIRM: the sources conflict)
- Superintendent: The welcome letter is signed **Andrew Crouse, Ph.D.**, and SchoolRubric agrees. The site's Team section lists **Kim Philot, "Superitendent"** (sic).
- All-School Principal: **Mrs. María Inarra**
- Secondary Assistant Principal: **Dr. Ricardo Vieira**
- Elementary Assistant Principal: **Ben Drury**
- Elementary (and Secondary?) Counselor: **Ana María Urquidi**
- Secondary School Counselor: **Carolina Blanco** (carolina.blanco@acslp.org)
- College Counselor: **Jared McGrath**
- Superintendent's blog: superintendent-acs.blogspot.com

### 1.6 Academic program
- **Divisions:** Early Childhood (KG3, KG4, KG5), Elementary (Grades 1–5), and Secondary (Middle School 6–8, High School 9–12). The staff fact sheet mentions "Pre K1", which needs confirming.
- **Curriculum:** U.S. standards-based and taught in English. Course descriptions exist for each grade from KG3 through 5 and for Secondary, all in Google Docs.
- **Platforms:** PowerSchool (grades), Atlas (curriculum), IXL, Class Dojo, Follett Destiny (library catalog), Cialfo (college counseling), PulsEDU (admissions), iPads in Elementary, and bring-your-own laptop from Grade 6.
- **AP, IB, and dual-enrollment:** not mentioned anywhere. Ask the school. If AP courses exist, they are a major selling point.
- **Elementary counseling:** SEL through the **Second Step** program, character education, and integrated support.
- **Secondary counseling:** individual planning, SEL through Advisory, academic and career support.
- **University and career counseling:** Cialfo for Grades 9–12 (applications to 25+ countries, recommendations from a U.S. algorithm plus counselor review, three self-assessments from Human eSources). Group sessions for Grades 8–12. One-to-one meetings from Grade 11. Family meetings. **Seniors attend College Prep sessions 4 times a week.** ACS hosts an **annual College Fair** with universities from around the world. PSAT is offered.
- **Learning Services**, made up of the ELL, Learning Support, and Counseling departments: "a fully inclusive environment". Sheltered instruction, a goal of **at least one WIDA proficiency level of growth per year**, IEPs, and self-advocacy. Supports students with mild learning differences and lower English or Spanish proficiency. A Learning Services Handbook exists.

### 1.7 Admissions (verified)
- Applications run through **acs.pulsedu.com**: create a parent account first, then a student application.
- **Rolling admissions** open **1 October** of the year before entry.
- KG3 and KG4 have **open admission**, subject to a developmental readiness screening. **English is not required for Early Childhood.**
- Grades 1–12 require adequate English shown on **WIDA**, plus placement tests in English, Math, and Foreign Language.
- Age cutoff: the child must turn 3 by **30 June** for KG3, 4 for KG4, 5 for KG5, 6 for Grade 1, and so on.
- Decisions take **2–5 working days** once all documents and tests are complete.
- Documents: student ID or passport, parent ID or passport, birth certificate, last three report cards, and a daycare report for PreK and KG applicants.
- **Bolivian Ministry rules** (this is the hardest part for families, so build a guided tool for it):
  - Foreign records must be apostilled or legalized in the country of origin and translated or stamped by the Bolivian consulate. Then comes the equivalency process: Cancillería, then the Ministry of Education.
  - Transfers from Bolivian schools need their RUDE and original Ministry report cards.
  - Students from Bolivian-calendar schools (Feb–Nov) may repeat 6 months because of the calendar change.
  - Students from American-calendar Bolivian schools continue in the same grade and receive the Bolivian diploma one year after ACS graduation.
  - Students enrolling after September are fully admitted, but their Ministry registration is deferred to the next year.
  - Ministry rule: no student may miss more than 24 days in a school year. Students from Bolivian schools may only enter at the start of a semester.
- **Calendar:** American calendar from August to early June. **School hours:** KG3 9:00–12:00. KG4 8:30–13:00. Elementary 8:15–15:05. Secondary 8:15–15:15.
- **No uniform**, but there is a dress code. **Lunch** comes from home or the ACS Catering Service, with a monthly menu PDF.
- **Tuition:** not published. The business office is open 9:00–15:30, Mon–Fri. Payments are made at my.acslp.org / payments.acslp.org. Decide with the school whether to publish a fee schedule or an "Request tuition info" form.
- Parents become **ACS members** and can use the Sports Complex on weekends and after school.

### 1.8 Campus and facilities
50+ classrooms · 4 science labs · 2–3 computer labs · **astronomy observatory** · **indoor heated swimming pool** · gymnasium and weight room · full-size **lit soccer field** · tennis and racquetball courts · **climbing wall** · 3 playgrounds · 2 greenhouses and 2 school gardens · **500-seat theater and auditorium** (the Michael Donahue Theater) · **2 libraries (Elementary and Secondary) with "the largest English-language collection in Bolivia"** · a historic stone garden bridge from the USAID era.

### 1.9 Student life
- **Athletics:** soccer, volleyball, basketball, and track and field for boys and girls in both Elementary and Secondary. Friendship Games against schools in La Paz, Cochabamba, and Santa Cruz.
- **Fine arts:** dance, music, visual arts, theater, and creative workshops.
- **Extracurriculars:** an Elementary ECA site and a Secondary ECA spreadsheet. Secondary clubs are listed on Cougar Hub.
- **Community:** service learning, the 70th-anniversary merchandise (notebook, Cougars sweatshirt), Parent Reps, and an alumni network.

### 1.10 Digital ecosystem (keep these links working)
PowerSchool (acslp.powerschool.com) · Online payments (my.acslp.org, payments.acslp.org) · Cougar Hub (cougarhub.acslp.org, a Google Site for families: handbooks, supply lists, newsletters, calendar, emergency guide, Responsible Use Guidelines, chain of command, teacher bios) · new staff site (newstaff.acslp.org) · cafeteria (linktr.ee/calvert2025 and a monthly PDF) · PulsEDU admissions · Strategic Plan 2019–2024 (expired) · School Profile 2025–26 · Important Dates PDF.

**The complete list of family resource links, with their URLs, is in Appendix A.** Every link there must have a home on the new site.

---

## 2. AUDIT OF THE CURRENT SITE (what "10x better" has to fix)

**Credibility problems that are visible today:**
1. The home page **stats counters all show "0"**: Years, Countries, Students, and Class Size.
2. **Lorem-ipsum placeholder text** is live on the home page ("Elemum nisl aliquet…", "Ipsum elifend cras…", "Sed aliquam proin…").
3. News posts about 2025 are **dated 08/02/2023**. The College Acceptances 2025 post names no universities and says "stay tuned".
4. Conflicting leadership: two different people are presented as Superintendent, and the title is misspelled "Superitendent".
5. The core value "Community" repeats the Curiosity definition.
6. Typos and broken links: `/secundary/`, "Mision – Vision", "4 by for KG4", "Counselling" versus "Counseling", and `/early-childhood/` returns a **404**.
7. Secondary page sub-navigation anchors point to `/elementary#…`.
8. **Mixed languages:** Spanish labels ("Enlaces Útiles", "Teléfono", "Dirección") appear on English pages.
9. Old content: the Strategic Plan is 2019–2024, Cougar Hub documents are labeled 2025–26 although 2026–27 has started, the Child Protection page uses 2019–20 statistics, and a job ad is still live after its deadline (23 Oct 2026).
10. Bot protection blocks crawlers on many pages, including the root, `/es/`, Contact, Calendar, and Visit. **This probably hurts Google and AI search indexing.** Make sure Googlebot, Bingbot, and the main AI crawlers are allowed.

**Structural problems:**
- Important content (course descriptions, handbooks, the school profile, the strategic plan, extracurriculars) lives in **dozens of Google Docs, Sheets, and Drive links**. It isn't searchable, branded, or mobile-friendly, and it can break when sharing permissions change.
- There is no Early Childhood page, though the school serves KG3 and up and EC is the main entry point for enrollment.
- There is no tuition guidance, no visible "Book a tour" path, and no virtual tour.
- No outcomes are shown: no university list, no average scores, no alumni stories.
- Athletics and Fine Arts are mentioned in the FAQ but have no pages ("Athletics Site" link is missing).
- The site doesn't use social proof. There are no testimonials, Instagram moments, or parent voices.
- Navigation is split three ways (acslp.org, Cougar Hub, and Google Sites) with different value statements in each place (the 5 Cs versus "Integrity, Diversity, Excellence").
- Basic SEO is missing: no structured data, weak titles and meta descriptions, and no `hreflang`.

---

## 3. AUDIENCES AND WHAT THEY NEED FROM THE SITE

| Audience | Need | Key question |
|---|---|---|
| **Bolivian families** in La Paz (about 87% of students), Spanish-first | "Is a U.S. education worth it? Will my child get the Bolivian diploma? How do I transfer?" | Diplomas, university results, calendar-transfer rules, cost, a tour |
| **Expat and diplomatic families** (U.S. Embassy, NGOs, multinationals, international agencies) | Move in mid-year, find out quickly that the school is accredited and English-medium | Accreditation, transfer credits, apostille process, altitude and city life, timeline |
| **Current parents** | Fast access to PowerSchool, payments, menu, calendar, handbook | A "Parents" quick menu |
| **Students** | Clubs, sports, college counseling, library | Student life pages, Cialfo |
| **Prospective teachers** (international hiring through Search Associates and similar) | Life in La Paz, salary and benefits, child protection, culture | A careers page plus a "Living in La Paz" guide |
| **Alumni (70 years of them)** | Reconnect, give back, reunions | Cougar Connect, alumni stories |
| **Universities and partners** | School profile, grading scale, courses | A downloadable School Profile |

---

## 4. POSITIONING AND MESSAGING

**Positioning statement:**
> *Since 1955, ACS Calvert has been Bolivia's American school: a U.S.-accredited, English-language education from Early Childhood through Grade 12, with both U.S. and Bolivian diplomas, in a historic campus in Calacoto.*

**Messaging pillars (each one backed by a verified proof point):**
1. **70 years of trust.** Founded by parents in 1955, supported by the U.S. Department of State, visited by Neil Armstrong.
2. **Two diplomas, one path to the world.** The U.S. diploma and the Bolivian bachillerato. 100% of graduates admitted to their universities of choice. Cialfo, 25+ countries, an annual College Fair.
3. **Every learner known.** 7:1 student-to-teacher ratio, classes of 8–23, Learning Services, SEL through Second Step, Advisory.
4. **A campus like no other in Bolivia.** Observatory, heated indoor pool, climbing wall, 500-seat theater, the country's largest English-language library collection, greenhouses.
5. **Character and community.** The 5 Cs and child protection.

**Voice:** warm, confident, and family-centered. Natural Bolivian and Latin American Spanish, not machine translation. Write short sentences. Show students, not stock photos. Keep both languages equal; never let one be an afterthought.

**Possible taglines for testing:** "70 years. One community. A world of possibilities." / "Bolivia's American School since 1955." / "Educación americana en La Paz desde 1955."

---

## 5. INFORMATION ARCHITECTURE (sitemap)

```
/ (Home)                                   /es/ (mirror of every page)
├── About
│   ├── Welcome from the Superintendent
│   ├── Mission, Vision & the 5 Cs
│   ├── How We Learn (Learning Principles)
│   ├── Our History (interactive 1955–2025 timeline)
│   ├── Leadership & Board
│   ├── Accreditation & Affiliations
│   ├── Strategic Plan
│   └── Child Protection & Safeguarding
├── Academics
│   ├── Early Childhood (KG3–KG5)        ← new; fixes the 404
│   ├── Elementary (Grades 1–5)
│   ├── Middle School (6–8)
│   ├── High School (9–12) & Diplomas
│   ├── Course Catalog (searchable, replaces Google Docs)
│   ├── Learning Services (ELL, Learning Support)
│   ├── Counseling & Well-being
│   ├── University & Career Counseling  (+ Results / Matriculation)
│   └── Libraries
├── Admissions
│   ├── Why ACS
│   ├── How to Apply (step tracker → PulsEDU)
│   ├── Requirements & Documents (checklist generator)
│   ├── Transferring from a Bolivian school / from abroad (interactive guide)
│   ├── Tuition & Fees  [[CONFIRM: publish or gated form]]
│   ├── Age & Grade Calculator
│   ├── Admissions FAQ
│   └── Book a Tour / Visit  (primary CTA everywhere)
├── Student Life
│   ├── Athletics (Cougars)
│   ├── Fine & Performing Arts
│   ├── Clubs & Activities (replaces Google Sheet)
│   ├── Service Learning
│   └── Campus & Facilities (photo gallery + 360° virtual tour)
├── News & Events
│   ├── News
│   ├── Calendar (Google Calendar sync + .ics)
│   └── Instagram / Gallery
├── Community
│   ├── Parents (quick links hub: PowerSchool, Payments, Menu, Handbook, Cougar Hub)
│   ├── Alumni – Cougar Connect (70 years, stories, update your info)
│   └── Support ACS / Membership & Sports Complex
├── Careers (Join our Team) + Living in La Paz guide
└── Contact (map, directions, department directory, WhatsApp)
```

The persistent utility bar should hold PowerSchool · Payments · Cafeteria Menu · Calendar · Cougar Hub · EN/ES.
The persistent primary CTAs should be **Book a Tour** and **Apply Now**.

---

## 6. PAGE-BY-PAGE SPECS (highest priority first)

### 6.1 Home
1. **Hero:** full-bleed video, 8–12 seconds and muted, showing real students, campus, mountains, and the observatory. Headline "Bolivia's American School since 1955" with the subhead "U.S.-accredited English-language education, KG3–12, with U.S. and Bolivian diplomas." Buttons: **Book a Tour** and **Apply**.
2. **Proof bar** (counters with real numbers and an "as of" date): 70 years · 573 students · 7:1 ratio · 2 diplomas · 100% university admission · [[N]] nationalities.
3. **"Find your path"** cards: Early Childhood / Elementary / Middle / High School.
4. **Why ACS:** the 5 messaging pillars with icons and short copy.
5. **Outcomes:** a university logo wall [[CONFIRM: list]] and a graduate quote.
6. **Campus highlights:** a horizontal gallery (pool, observatory, theater, library, greenhouses).
7. **70th Anniversary band:** a mini timeline and the "Join us" button.
8. **Latest news and events** (from the CMS), plus an **Instagram strip**.
9. **Testimonials** from parents, alumni, and students (with consent).
10. **Final CTA:** "Start your journey" plus a quick inquiry form.

### 6.2 Admissions hub (the main conversion page)
- A visual **5-step tracker**: Inquire → Tour → Apply online (PulsEDU) → Assessment (WIDA, Math, Language) → Decision in 2–5 days → Enroll.
- **Interactive tools:**
  - *Grade calculator:* enter a birth date and target year, get the eligible grade (30 June cutoff).
  - *Document checklist generator:* "Where is your child studying now?" (Bolivia, Feb–Nov calendar / Bolivia, Aug–Jun calendar / abroad) produces a personalized checklist (apostille, RUDE, consulate, equivalency) and the calendar implications.
  - *Inquiry form:* parent name, child grade or age, start date, nationality, source, and preferred language. It sends to the admissions inbox and CRM and gives an instant WhatsApp option.
- The FAQ (all the verified items in 1.7) as an accordion with FAQPage schema.

### 6.3 Academics division pages (EC / Elementary / MS / HS)
Each one includes: a "A day at ACS" timeline using the real school hours, curriculum highlights, a counseling and SEL block, course catalog links, the division leader's photo and message, a gallery, and CTAs. **High School** also covers the diplomas, Cialfo, the College Fair, College Prep 4x a week, PSAT, and the results page.

### 6.4 University counseling and results
Matriculation map and logo wall by year, an alumni "Where are they now" section, the counseling timeline by grade (8–12), a download of the School Profile for universities, and the counselor contact.

### 6.5 Campus and virtual tour
An interactive campus map (SVG) with hotspots for the 12 facility highlights, a 360° photo tour, and the history of the Patiño hacienda.

### 6.6 Careers
Why teach at ACS, Living in La Paz (altitude, cost of living, and safety, drawn from the newstaff site), the child protection commitment, current vacancies from the CMS (with automatic expiry after the deadline), and application documents (letter, CV of 3 pages or fewer, 3 references).

### 6.7 Parents hub
One page holding every link families use: PowerSchool, Payments, Menu, Calendar, Handbooks in EN/ES, Supply lists, Newsletters, Emergency Guide, RUG, Chain of Command, Feedback form, and the business office hours.

Build it from **Appendix A**. Group the links the same way (Handbooks, Important Dates, School Profile, Supply Lists, Meet the Team, Newsletters, Important Documents, Student/Parent Handbooks, Social Media, Online Resources), and filter them by audience (All School / Elementary / Secondary) and by language (EN / ES). Each document is a CMS `document` entry with its title, school year, language, audience, URL, and "last reviewed" date, so an out-of-date year shows up automatically.

### 6.8 Alumni (Cougar Connect)
A 70-year alumni map, story submissions, an "Update your details" form, a reunion calendar, and featured notable alumni (with consent).

---

## 7. DESIGN SYSTEM

- **Brand:** Pull the logo, crest, and official colors from the school's brand assets. [[CONFIRM: logo files and hex codes]] If they don't exist, propose a refined palette: a deep "Cougar" primary color, an Andean sky accent, a warm gold for the anniversary, and neutral stone grays drawn from the campus bridge and the mountains.
- **Typography:** one confident serif for headings (heritage) and one modern sans for body text and UI. Load at most two families with `font-display: swap`.
- **Photography:** real students and campus, natural light, Illimani mountain backdrops. **Use only students with photo consent** (child protection). No stock images of children.
- **Components:** hero, stat counter (with server-rendered numbers so they never show "0"), path cards, timeline, accordion FAQ, step tracker, testimonial carousel, logo wall, event card, news card, staff card, CTA band, utility bar, mega-menu, language switch, and a sticky mobile CTA bar (Tour / Apply / WhatsApp).
- **Motion:** subtle scroll reveals and counters that respect `prefers-reduced-motion`.
- **Accessibility:** **WCAG 2.2 AA**: contrast 4.5:1 or higher, keyboard navigation, focus states, alt text in both languages, captions on all video, `lang` attributes, and targets at least 44 px.

---

## 8. TECH STACK AND NON-FUNCTIONAL REQUIREMENTS

- **Framework:** Next.js (App Router, TypeScript, React Server Components) with Tailwind CSS and a small component library (shadcn/ui or a custom one).
- **CMS:** a headless CMS (Sanity is recommended) with a structured content model: `page`, `newsPost`, `event`, `staffMember`, `facility`, `course`, `jobPosting` (with `deadline` and automatic unpublishing), `testimonial`, `faq`, `alumniStory`, `universityAcceptance`, `document` (versioned PDFs by school year), and `siteSettings` (stats with an "as of" date). Every document is **localized EN/ES** at field level, with a translation-status workflow.
- **i18n:** `/en` and `/es` routes, `hreflang`, a language switch that keeps you on the equivalent page, and detection of the browser language (Spanish default for Bolivia is worth considering).
- **Hosting:** Vercel or an equivalent, with ISR and an edge CDN. **Bot protection must allow good crawlers.**
- **Performance budget:** LCP under 2.0 s on 4G mid-range Android (common in Bolivia), CLS under 0.05, INP under 200 ms, JavaScript under 150 KB per route, and images in AVIF/WebP via `next/image`.
- **SEO and AEO:**
  - Structured data: `School` / `EducationalOrganization` (founding date, address, geo, telephone, sameAs links), `FAQPage`, `Event`, `NewsArticle`, `JobPosting`, and `BreadcrumbList`.
  - Target keywords: "colegio americano La Paz", "colegio bilingüe La Paz Bolivia", "international school La Paz Bolivia", "American school Bolivia", "colegio Calvert La Paz", "doble diploma Bolivia".
  - A sitemap.xml per locale, clean slugs, 301 redirects from every old URL (including `/secundary/` and `/early-childhood/`), and OG images.
  - Clear, factual answer blocks on key pages (founded, grades, diplomas, accreditation, tuition contact) so AI assistants cite the site correctly.
- **Integrations:**
  - Google Calendar to the events feed with an `.ics` subscription.
  - Instagram feed through the official **Instagram Graph API** using the school's own Business account token, with cached thumbnails, alt text, and a fallback.
  - Forms go to admissions email, a Google Sheet, or a CRM, with reCAPTCHA or Turnstile.
  - WhatsApp Business click-to-chat.
  - GA4 or Plausible with conversion events for `tour_booked`, `inquiry_submitted`, and `apply_clicked`.
  - Deep links to PowerSchool, PulsEDU, and the payments portal.
- **Privacy and safeguarding:** a cookie consent banner, a privacy policy that covers Bolivian law, no student surnames next to photos, image-consent flags in the CMS (assets without consent can't be published), and no student personal data in analytics.
- **Quality:** Lighthouse 95+ on all four categories, axe-core accessibility tests in CI, Playwright smoke tests for EN/ES navigation and forms, link checking, and preview deployments for every pull request.

---

## 9. OPEN QUESTIONS: CONFIRM WITH THE SCHOOL BEFORE LAUNCH

1. **Superintendent:** Andrew Crouse, Ph.D., or Kim Philot? Get the current team list with photos and titles.
2. **Accreditation:** current body and status (Cognia? NEASC? MSA?). Is SACS still current? Current AASSA membership? Any Tri-Association or other memberships?
3. **Grades offered:** Pre K1, PreK3, or KG3 as the youngest? Get official grade labels in English and Spanish.
4. **AP, IB, or dual-enrollment courses?** Which ones? Any exam results?
5. **University list** for the Class of 2025 and 2026 (names and countries), scholarships, average SAT, number of graduates.
6. **Current statistics:** enrollment, nationalities count, student-to-teacher ratio, average class size, and the share of faculty with advanced degrees.
7. **Tuition:** publish a fee schedule, or use an inquiry form? Are there application fees, membership or bond fees, or sibling discounts?
8. **Values:** the correct "Community" definition. Should "Integrity, Diversity, Excellence" on Cougar Hub be dropped?
9. **Strategic Plan** for after 2024: is there a current one?
10. **Brand assets:** logo (SVG), colors, fonts, mascot artwork, 70th-anniversary mark.
11. **Media:** a photo and video library with consent status, and drone footage of campus and Illimani.
12. **Instagram @acs.calvert:** confirm the account and get Business account access for the Graph API. The research couldn't read it because of the login wall. Get typical content themes and hashtags from the comms team.
13. **Spanish site content** (`/es/`): couldn't be read during research. Who is the Spanish copy owner?
14. **Testimonials:** 6–10 parent, student, and alumni quotes with written consent.
15. **Athletics and Fine Arts:** teams, schedules, coaches, results, productions.
16. **Who owns which content** after launch (Admissions, Comms, HR, Counseling) and the update schedule.
17. **Calendar wording:** the Admissions page says "August to June", the FAQ says "August to May". Fix this once confirmed.
18. **Contact routing:** admissions email, a WhatsApp number, and tour availability (days and times).

---

## 10. SUCCESS METRICS (KPIs)

| KPI | Baseline | 6-month target |
|---|---|---|
| Inquiry plus tour form submissions per month | [[measure]] | **3x** |
| Applications started (PulsEDU click-throughs) | [[measure]] | **2x** |
| Organic search sessions | [[measure]] | **+150%** |
| Spanish-language sessions | [[measure]] | Spanish-version parity |
| Lighthouse (performance, accessibility, best practices, SEO) | Not measured | 95+ / 100 / 100 / 100 |
| Pages with outdated or placeholder content | 10+ | **0** |
| Content updates by staff without a developer | 0 | 100% |

---

## 11. DELIVERY ROADMAP

| Phase | Duration | Output |
|---|---|---|
| **0. Quick wins on the current site** | Week 1 | Remove the lorem ipsum, fix the "0" counters, the Superintendent title and name, the Community value, the 404 and broken links, and the old job ad. Allow crawlers through bot protection. |
| **1. Discovery** | Weeks 1–2 | Answers to Section 9, brand assets, analytics baseline, stakeholder interviews (Admissions, Comms, Counseling, a parent rep, a student council member) |
| **2. UX and content** | Weeks 2–4 | Final IA, wireframes, EN/ES copy deck, content migration plan from the Google Docs |
| **3. Design** | Weeks 3–5 | Design system and high-fidelity Home, Admissions, Division, and Campus pages (in Figma) |
| **4. Build** | Weeks 5–9 | Next.js, CMS schemas, components, i18n, integrations, forms, analytics |
| **5. Content load and QA** | Weeks 9–10 | Migration, translation review, accessibility and performance audits, redirect map, user testing with 5 parents |
| **6. Launch and iterate** | Week 11+ | Launch, Search Console, monthly reporting, A/B tests on the hero CTA and the inquiry form |

---

## 12. WHAT TO PRODUCE (instructions for the AI receiving this prompt)

Work in this order and ask before moving to the next step:
1. Restate your understanding in 10 bullet points and list any assumptions.
2. Give me the final sitemap and URL map, including 301 redirects from old acslp.org URLs.
3. Write the CMS content model (Sanity schemas in TypeScript) with EN/ES localization.
4. Produce the design tokens (colors, type scale, spacing, radii, shadows) and the component inventory.
5. Write full bilingual copy for Home, Admissions, Early Childhood, High School and University Counseling, and Campus. Mark every unverified fact with `[[CONFIRM: …]]`.
6. Scaffold the Next.js project (App Router, TypeScript, Tailwind, i18n, Sanity client, SEO and JSON-LD helpers) and build the Home and Admissions pages first, including the grade calculator and the transfer checklist tool.
7. Add tests (Playwright and axe), a Lighthouse CI budget, and deployment configuration.
8. End with an **Open questions** list and a **launch checklist**.

**Constraints:** Accuracy over flair. Don't invent anything about students. Keep both languages equal. Mobile first. Fast on Bolivian mobile networks. Accessible. Easy for staff to update.

---

## APPENDIX A. FAMILY RESOURCE LINKS (from the Cougar Hub "Useful Resources" list, supplied by the school)

Every link below must be reachable from the new **Parents hub** (6.7). Where useful, also link it from the matching page: handbooks from the Academics division pages, the School Profile from University Counseling, course descriptions from the Course Catalog, and so on. Keep the URLs exactly as given until each document is moved into the CMS.

### A.1 Handbooks
- [Student/Parent Handbook 2025-2026 (English)](https://docs.google.com/document/d/1C7tSAlfBT4gaPzjN1iA588i6vy-5tQ716m2fsBdIceE/edit?tab=t.0)
- [Manual para Estudiantes y Padres 2025-2026 (Español)](https://docs.google.com/document/d/1-Gm-4BaCdOS3ZvKiQAOURbTfDH20sTSypB7qL66a5s8/edit?usp=sharing)
- [ACS Quick Action Guide](https://drive.google.com/file/d/1u9ZywHF2hea-eg3w8m9TeCxYgEDS1Lt7/view?usp=sharing)

### A.2 Important dates
- [Important Dates 2025-2026](https://acslp.org/wp-content/uploads/2025/04/2025-2026-Important-Dates.pdf)
- [Board Dates 2025-2026](https://drive.google.com/file/d/19t24k1AdPJ_dlVDUhQqXa_W3_9gY0fEo/view?usp=sharing)

### A.3 School profile
- [School Profile 2025-2026](https://drive.google.com/file/d/1h2SkUQzR30wYY0z7EfyqYaeqpyY3r0c7/view?usp=sharing)

### A.4 Supply lists 2025-2026
- [Elementary Supply List](https://docs.google.com/spreadsheets/d/1Cb9LQQN4W-gE4jHBtnYhUTGS07344rUSQbfiP4qq9Wg/edit#gid=0)
- [Secondary School Supply List (Grades 6-12)](https://docs.google.com/document/d/1EhPRXdk9AeeKhv59VOZJbdW2JA9zRVLx6i24B13eOhI/edit)

### A.5 Meet the team
- [Teacher Bios](https://sites.google.com/acslp.org/profiles/acs)

### A.6 Newsletters
- [Elementary](https://cougarhub.acslp.org/elementary/news)
- [Secondary](https://cougarhub.acslp.org/secondary/news)

### A.7 Important documents
- [2019-2024 Strategic Plan](https://drive.google.com/file/d/0B7-p3oIwUoBvcnZrTVF5c0c2TXc1Z1ZjMlpLN2Q3WGl1dDhB/view?usp=sharing)
- [2019-2024 Plan Estratégico](https://drive.google.com/file/d/0B-E03t2H4hHOMzJmS1hXWlpGOUp0cVk0Z2wtWkE5QkYyQTRz/view?usp=sharing)
- [Quick Action Emergency Guide](https://drive.google.com/file/d/1u9ZywHF2hea-eg3w8m9TeCxYgEDS1Lt7/view?usp=sharing)
- [ACS Learning Principles](https://docs.google.com/document/d/1-ED0UJQvmWpO5bQ7VsUguYb5xUHnMsGVDr1vyrfAbUQ/edit)
- [Reglamento Interno](https://docs.google.com/document/d/1EVdHzbMrvha5WTRYI7b4oNyeX-YQC441TUfnQMAMOuE/edit)
- [Parent Rep Guide](https://docs.google.com/document/d/1Vi9bZ48CWwEhZ9kykljrJZ8x0BUlmvELgKoLsFakeMQ/edit)
- [Chain of Command (English)](https://drive.google.com/file/d/0B7-p3oIwUoBvOVdCX1MtanNDZVBYMzJfNmVFSS12ai1pOG9F/view?usp=sharing)
- [Cadena de Comando (Español)](https://drive.google.com/file/d/0B7-p3oIwUoBvTkdNM1dTbmtXZ1JsOHlJMzNEZ1JiVnNsdTRj/view?usp=sharing)
- [Parents' Rights/Responsibilities and Communication with the Board](http://www.acslp.org/images/cougar-hub/Parent_Rights-n-Responsabilities.pdf)

### A.8 Student/Parent handbooks
- [Learning Services Handbook](https://docs.google.com/document/d/1V5GFbbdNxLskbJSSs0c0TnFt9Oeki1RRlrzWA6UXKnI/edit#)
- [Athletic Handbook](https://docs.google.com/document/d/1cCozM_-LRAgthabtrgoIgLrEkzfuEMO9mIIGXvAR-7k/edit)
- [Extra-Curricular Handbook (English)](https://docs.google.com/document/d/1JSBxrlXrTlL5cxugQXI7CWm3wiJXn9YPA-fOXtZZnxs/edit?ts=5c34e52e)
- [Extra-Curricular Handbook (Español)](https://docs.google.com/document/d/1NqBsJVhDbdylb0PhJh-_pvvOxbBEiwblvAiEppLQjVk/edit?ts=5c369b03)
- [ACS Network Security](https://docs.google.com/document/d/1pomUl26x0dCWfGx4nBAM3bLvUecHBBpysCGXJ5qUhQE/edit#heading=h.4frf8ovx38be)
- [ACS Responsible Use Guidelines (RUG): Technology](https://docs.google.com/document/d/1tRc5ZMY1dcu7BB8PoU3sp564FMoulrAd5DUNHxYttZo/edit?usp=sharing)
- [Lineamientos para uso responsable de la tecnología (RUG, Español)](https://docs.google.com/document/d/145eCyMTSwU5_b6eh-39ZYVTB2YmLQC7hyVkK6dEfFCs/edit?usp=sharing)
- [ACS RUG Acknowledgement Form](https://docs.google.com/document/d/1SzjxByQJkAS-YKd3_Z5ANTEQapxomZLSaFmiKrd_leI/edit)

### A.9 Social media
- [ACS Website](https://acslp.org/)
- [ACS on Facebook](https://www.facebook.com/acscalvert/)
- [ACS Alumni Network (Facebook group)](https://www.facebook.com/groups/2259636874/)
- [ACS on YouTube](https://www.youtube.com/channel/UCL4_aKpQ6jbwAdgQfKbAzqQ)

### A.10 Online resources
- **All school**
  - [PowerSchool](https://acslp.powerschool.com/)
  - [IXL](https://www.ixl.com/)
  - [Atlas (curriculum maps, public)](https://acslp-public.rubiconatlas.org/)
  - [Library Catalog (Follett Destiny)](https://acscalvert.follettdestiny.com/)
- **Elementary**
  - [KG3-Grade 5 Course Descriptions](https://docs.google.com/document/d/1RAwbvtcwb4BpBD1TD2xYZZYIDuZQhJnraBVeSaRfHtw/edit)
  - [Class Dojo](https://www.classdojo.com/)
- **Secondary**
  - [Middle School Course Descriptions](https://docs.google.com/document/d/1aBSfsnKHiAWDTmDUYjO7l2Hkmn8dl18Z2-soE6da4d0/edit?ts=5bd0e433)
  - [High School Course Descriptions](https://docs.google.com/document/d/1_ipWftOZsrxzc8Lex8Qb2eaJvo5GekBx77dNrIbAcn4/edit#)

### A.11 Problems in this list to fix during migration
1. **Out-of-date years:** the handbooks, important dates, board dates, school profile, and supply lists are labeled **2025-2026**, but the 2026-2027 school year began in August 2026. Ask the school for the 2026-2027 versions. [[CONFIRM]]
2. **Expired Strategic Plan:** the 2019-2024 plan (EN and ES) has expired. Publish the current plan, or label this one as archived. [[CONFIRM]]
3. **Duplicate link:** the "ACS Quick Action Guide" and the "Quick Action Emergency Guide" point to the same file. List it once, under Safety.
4. **Insecure, legacy link:** "Parents' Rights/Responsibilities…" uses `http://` and a legacy `/images/cougar-hub/` path, and the filename contains the misspelling "Responsabilities". Re-upload it to the CMS over HTTPS and add a 301 redirect.
5. **Missing Spanish versions:** there is no Spanish version of the Learning Services Handbook, Athletic Handbook, Network Security, Parent Rep Guide, Learning Principles, School Profile, supply lists, or course descriptions. There is no English version of the Reglamento Interno. Plan translations so both languages match.
6. **Old documents:** the Extra-Curricular Handbooks and Middle School Course Descriptions carry `ts=` parameters from 2018-2019, so they may be outdated. Ask owners to review them.
7. **Google Docs are not a website:** handbooks, course descriptions, and supply lists should become searchable, mobile-friendly CMS pages (with a PDF download) rather than "edit" links into Google Docs. At minimum, change `/edit` links to `/view` or `/preview` so families never land in an editor view.
8. **Empty bullet:** the source list has an empty item under "Student Parent Handbooks". Remove it.
9. **Cleanup:** add accents to "Espanol" and "tecnologia", remove the stray space in "Rights/ Responsibilities", and change the `http://www.acslp.org/` website link to HTTPS.
