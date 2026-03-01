// ── Auto-highlight the correct mobile tab based on current page ──
(function () {
  const tabLinks = document.querySelectorAll('.mobile-tab-bar a');
  if (!tabLinks.length) return;

  // Get just the filename (e.g. "Home.HTML", "about.html") — case-insensitive compare
  const currentFile = window.location.pathname.split('/').pop().toLowerCase() || 'home.html';

  tabLinks.forEach(link => {
    link.classList.remove('active');
    const linkFile = link.getAttribute('href').split('/').pop().toLowerCase();
    if (linkFile === currentFile) {
      link.classList.add('active');
    }
  });
})();

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            dropdown.classList.toggle('active');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#about' || href === '#academics' || href === '#news' || 
            href === '#alumni' || href === '#elibrary' || href === '#admissions' || 
            href === '#contact') {
            if (window.innerWidth > 1024) {
                return;
            }
        }
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.quick-link-card, .stat-card, .program-card, .news-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlusSign = target.includes('+');
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(counter);
        }
        
        let displayValue = Math.floor(current).toLocaleString();
        if (isPercentage) displayValue += '%';
        if (isPlusSign) displayValue += '+';
        
        element.textContent = displayValue;
    }, stepTime);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

const sectionHeaders = document.querySelectorAll('.section-header');

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

sectionHeaders.forEach(header => {
    headerObserver.observe(header);
});

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

const lazyBackgrounds = document.querySelectorAll('[data-bg]');

const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            bgObserver.unobserve(element);
        }
    });
});

lazyBackgrounds.forEach(bg => {
    bgObserver.observe(bg);
});

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} University of Excellence. All rights reserved.`;
}

if (window.innerWidth > 1024) {
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        let timeout;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            }, 200);
        });
    });
}

dropdowns.forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

const quickLinks = document.querySelectorAll('.quick-link-card');
quickLinks.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

console.log('University of Excellence Website Loaded Successfully! 🎓');
// ===================================================================
// NEWS ARTICLE DETAIL OVERLAY
// ===================================================================
const articleData = {
  'school-fair': {
    tag: 'Events', tagClass: 'news-page-tag--events',
    date: 'March 7, 2026', image: 'image/schoolfair.png', imageAlt: 'Amorean School Fair 2026',
    title: 'Amorean School Fair 2026: Fun for the Whole Family',
    byline: 'By the Amore Academy Events Committee · February 20, 2026',
    body: `
      <p>Get ready for the most anticipated community event of the year! The <strong>Amorean School Fair 2026</strong> is happening on <strong>Saturday, March 7, from 1:00 PM to 9:00 PM</strong> right here at the Amore Academy grounds. This is a FREE event open to all students, families, alumni, and the wider community.</p>
      <h3>What to Expect</h3>
      <p>This year's fair is bigger and better than ever, featuring an incredible lineup of activities and attractions for all ages:</p>
      <ul>
        <li><strong>Giant Slide</strong> — The crowd favorite returns, towering above the main field</li>
        <li><strong>Bouncy Castle</strong> — Perfect for the little ones in the family</li>
        <li><strong>Carousel Rides</strong> — A classic fairground experience for all ages</li>
        <li><strong>Live Entertainment</strong> — Performances by the Amore Academy Choir, Cultural Dance Troupe, and special guest performers</li>
        <li><strong>Hot Food Stalls</strong> — From classic Filipino street food to international snacks and desserts</li>
        <li><strong>Market Stalls</strong> — Shop handcrafted goods, school merchandise, and more from over 40 vendors</li>
        <li><strong>Side Show Alley</strong> — Test your luck and skills at our carnival games and win exciting prizes</li>
      </ul>
      <h3>Grand Finale: Fireworks Display</h3>
      <p>Cap off the evening with a spectacular <strong>fireworks display beginning at 8:30 PM</strong>. This is an event you won't want to miss!</p>
      <div class="article-detail-event-card">
        <div class="article-detail-event-date"><span class="month">Mar</span><span class="day">07</span><span class="year">2026</span></div>
        <div class="article-detail-event-info"><h4>Event Details</h4><p>📍 Amore Academy Grounds &nbsp;|&nbsp; 🕐 1:00 PM – 9:00 PM &nbsp;|&nbsp; 🎆 Fireworks at 8:30 PM &nbsp;|&nbsp; 🎟️ FREE Admission</p></div>
      </div>
      <p>All students are encouraged to bring their families along. See you there, Amoreans!</p>`
  },
  'stem-lab': {
    tag: 'Academics', tagClass: 'news-page-tag--academics',
    date: 'February 8, 2026', image: 'image/stemlab.png', imageAlt: 'New STEM Laboratory',
    title: 'New STEM Laboratory Opens for Junior and Senior High Students',
    byline: 'By the Amore Academy Academic Affairs Office · February 8, 2026',
    body: `
      <p>Amore Academy is proud to announce the official opening of its brand-new <strong>STEM Laboratory</strong>, now fully operational and available to all Junior High and Senior High School students.</p>
      <h3>What's Inside the New Lab</h3>
      <ul>
        <li><strong>10 Professional 3D Printers</strong> — Design and manufacture physical models for engineering projects</li>
        <li><strong>Advanced Microscopy Stations</strong> — High-resolution digital microscopes with live-view projection</li>
        <li><strong>Coding Workbenches</strong> — 30 dedicated programming stations with Python, Scratch, Arduino IDE, and more</li>
        <li><strong>Robotics Kit Sets</strong> — LEGO Mindstorms and Arduino robotics kits</li>
        <li><strong>Electronic Component Library</strong> — Sensors, circuit boards, and electronics for student projects</li>
      </ul>
      <h3>Access and Scheduling</h3>
      <p>The STEM Lab will be integrated into the Science, Technology, and Computer curriculum this semester. Free-use periods are every Tuesday and Thursday afternoon from 3:00 PM to 5:00 PM.</p>
      <h3>A Message from the Principal</h3>
      <p>"This laboratory is more than equipment — it is a space where curiosity becomes creation. We want our students to not just learn about science and technology, but to experience it firsthand."</p>`
  },
  'enrollment-extended': {
    tag: 'Admissions', tagClass: 'news-page-tag--announcements',
    date: 'February 5, 2026', image: 'image/enroll.jfif', imageAlt: 'Enrollment Period Extended',
    title: 'Enrollment Period Extended — New Deadline: March 15, 2026',
    byline: "By the Registrar's Office · February 5, 2026",
    body: `
      <p>Due to overwhelming interest, the Amore Academy Registrar's Office has officially extended the enrollment deadline for S.Y. 2026–2027.</p>
      <div class="article-detail-event-card">
        <div class="article-detail-event-date"><span class="month">Mar</span><span class="day">15</span><span class="year">2026</span></div>
        <div class="article-detail-event-info"><h4>New Enrollment Deadline</h4><p>All requirements must be submitted to the Registrar's Office by 5:00 PM on March 15, 2026. No extensions beyond this date.</p></div>
      </div>
      <h3>Requirements Checklist</h3>
      <ul>
        <li>Completed Application Form</li>
        <li>Original Report Card / Form 138</li>
        <li>Certificate of Good Moral Character</li>
        <li>PSA Birth Certificate (original and photocopy)</li>
        <li>2x2 ID photos (4 pieces, white background)</li>
        <li>Medical certificate from a licensed physician (within 6 months)</li>
      </ul>
      <p><strong>Important:</strong> Slots are limited and allocated first-come, first-served. For inquiries, visit the Registrar's Office Monday–Friday, 8:00 AM–4:00 PM or call (02) 8123-4567.</p>`
  },
  'outreach': {
    tag: 'Community', tagClass: 'news-page-tag--community',
    date: 'February 3, 2026', image: 'image/outreach.jfif', imageAlt: 'Amore Academy Outreach Program',
    title: 'Amore Academy Outreach Program Reaches Over 300 Families',
    byline: 'By the Community Involvement Program Office · February 3, 2026',
    body: `
      <p>Amore Academy's annual community outreach program, <strong>Lingap sa Pamayanan</strong>, concluded last January reaching over <strong>300 underprivileged families</strong> across three barangays in Metro Manila.</p>
      <h3>What Was Distributed</h3>
      <ul>
        <li><strong>School Supply Kits</strong> — Over 400 packs for school-age children</li>
        <li><strong>Hygiene Kits</strong> — Soap, shampoo, toothbrush, toothpaste, and sanitary items</li>
        <li><strong>Food Packages</strong> — Rice, canned goods, cooking oil, noodles, and other essentials</li>
        <li><strong>Free Medical Consultation</strong> — Volunteer doctors provided free check-ups and basic medicines</li>
      </ul>
      <h3>Student Volunteers</h3>
      <p>More than 80 Grade 11 and Grade 12 students volunteered their time. "It reminded me that the best way to use what we've been given is to give back," said one Grade 12 HUMSS student.</p>
      <p>Planning for the 2027 edition is already underway.</p>`
  },
  'basketball-champs': {
    tag: 'Sports', tagClass: 'news-page-tag--sports',
    date: 'January 28, 2026', image: 'image/bball.jfif', imageAlt: 'Amoreans Basketball Champions',
    title: 'Amoreans Win Regional Basketball Championship for Second Year Running',
    byline: 'By the Amore Academy Sports Desk · January 28, 2026',
    body: `
      <p>The <strong>Amore Academy Falcons</strong> secured the Regional Secondary Basketball Championship with a decisive <strong>72–68 victory</strong> over the Southview Academy Eagles — their second consecutive regional crown.</p>
      <h3>Game Highlights</h3>
      <p>Team captain <strong>Marco dela Cruz (Grade 12–STEM)</strong> delivered when it mattered most, sinking back-to-back three-pointers in the final three minutes. He finished with a game-high 24 points, 7 assists, and 4 steals.</p>
      <h3>Road to Nationals</h3>
      <p>The Falcons will represent the NCR region at the <strong>National Secondary Schools Basketball Championship</strong> on April 10 at the Rizal Memorial Sports Complex. Details on attending or watching the livestream will be announced soon.</p>`
  },
  'academic-awards': {
    tag: 'Academics', tagClass: 'news-page-tag--academics',
    date: 'January 20, 2026', image: 'image/excellence.png!bw700', imageAlt: 'Academic Excellence Awardees',
    title: 'Five Amoreans Named Regional Academic Excellence Awardees',
    byline: 'By the Amore Academy Academic Affairs Office · January 20, 2026',
    body: `
      <p>Amore Academy proudly announces that <strong>five students</strong> were named Regional Academic Excellence Awardees at the DepEd Schools Division ceremony held January 18.</p>
      <h3>Meet the Awardees</h3>
      <ul>
        <li><strong>Angela Reyes (Grade 12 – STEM)</strong> — Gold Award, Physical Sciences</li>
        <li><strong>Juan Miguel Santos (Grade 12 – STEM)</strong> — Gold Award, Mathematics</li>
        <li><strong>Camille Bautista (Grade 11 – STEM)</strong> — Silver Award, Biology</li>
        <li><strong>Paolo Aquino (Grade 10)</strong> — Silver Award, Junior High Science</li>
        <li><strong>Sophia Lim (Grade 9)</strong> — Bronze Award, Junior High Mathematics</li>
      </ul>
      <h3>National Science and Technology Fair</h3>
      <p>Angela Reyes, Juan Miguel Santos, and Camille Bautista have been selected as finalists for the <strong>National Science and Technology Fair</strong> in April at the Philippine Science High School – Main Campus. A school-level recognition ceremony is being planned — watch for announcements.</p>`
  },
  'school-calendar': {
    tag: 'Admissions', tagClass: 'news-page-tag--announcements',
    date: 'January 15, 2026', image: 'image/calendar.jfif', imageAlt: 'School Calendar 2026-2027',
    title: 'School Calendar for S.Y. 2026–2027 Now Available',
    byline: "By the Registrar's Office · January 15, 2026",
    body: `
      <p>The official <strong>Academic Calendar for School Year 2026–2027</strong> has been finalized. The full calendar is available at the Registrar's Office and will be distributed to enrolled students at the start of the school year.</p>
      <h3>Key Dates at a Glance</h3>
      <ul>
        <li><strong>June 8, 2026</strong> — First Day of Classes</li>
        <li><strong>October 17–25, 2026</strong> — Semestral Break</li>
        <li><strong>December 20, 2026 – January 3, 2027</strong> — Christmas Break</li>
        <li><strong>March 20, 2027</strong> — Graduation Ceremony (Senior High School)</li>
        <li><strong>March 27, 2027</strong> — Moving Up Ceremony (Junior High School)</li>
        <li><strong>April 2, 2027</strong> — Last Day of Classes</li>
      </ul>
      <p>The calendar is subject to change based on official DepEd orders. Check the school website and social media for updates.</p>`
  },
  'science-fair-event': {
    tag: 'Events', tagClass: 'news-page-tag--events',
    date: 'February 20, 2026', image: 'image/stemlab.png', imageAlt: 'Annual Science Fair 2026',
    title: 'Annual Science Fair 2026',
    byline: 'By the Amore Academy Science Department · February 1, 2026',
    body: `
      <div class="article-detail-event-card">
        <div class="article-detail-event-date"><span class="month">Feb</span><span class="day">20</span><span class="year">2026</span></div>
        <div class="article-detail-event-info"><h4>Event Details</h4><p>📍 Amore Academy Gymnasium &nbsp;|&nbsp; 🕗 8:00 AM – 5:00 PM &nbsp;|&nbsp; Open to all students, parents, and guests</p></div>
      </div>
      <p>The <strong>Annual Science Fair 2026</strong> features over 60 student research projects spanning Biology, Chemistry, Physics, Earth Science, Computer Science, and Environmental Studies.</p>
      <h3>Competition Categories</h3>
      <ul>
        <li>Junior Division (Grades 7–10): Individual and group projects</li>
        <li>Senior Division (Grades 11–12): Individual and group projects</li>
        <li>Special Category: Technology Innovation &amp; AI Applications</li>
        <li>Special Category: Environmental Sustainability</li>
      </ul>
      <p>Winners are recognized at the Closing Ceremony at 4:00 PM. Top Senior Division projects will be endorsed for the Regional Science Fair.</p>`
  },
  'natl-basketball-event': {
    tag: 'Sports', tagClass: 'news-page-tag--sports',
    date: 'April 10, 2026', image: 'image/bball.jfif', imageAlt: 'National Basketball Championship',
    title: 'National Basketball Championship — Amore Academy Falcons',
    byline: 'By the Amore Academy Athletics Office · February 15, 2026',
    body: `
      <div class="article-detail-event-card">
        <div class="article-detail-event-date"><span class="month">Apr</span><span class="day">10</span><span class="year">2026</span></div>
        <div class="article-detail-event-info"><h4>Event Details</h4><p>📍 Rizal Memorial Sports Complex, Manila &nbsp;|&nbsp; 🏀 1:00 PM Tip-Off &nbsp;|&nbsp; Tickets available at the gate</p></div>
      </div>
      <p>The <strong>Amore Academy Falcons</strong> head to the National Secondary Schools Basketball Championship after their historic back-to-back Regional title.</p>
      <h3>Key Players to Watch</h3>
      <ul>
        <li><strong>Marco dela Cruz (#7, PG)</strong> — Regional MVP, 22 pts and 6 assists per game</li>
        <li><strong>Andrei Mercado (#14, C)</strong> — 14 rebounds per game</li>
        <li><strong>Luis Fernandez (#3, SG)</strong> — 44% three-point percentage this season</li>
      </ul>
      <p>Supporters who cannot attend in person can watch via a DepEd-organized live stream. Details on the school's official social media pages. Let's go, Falcons! 🦅</p>`
  },
  'graduation-event': {
    tag: 'Events', tagClass: 'news-page-tag--events',
    date: 'May 2, 2026', image: 'image/grad.jfif', imageAlt: 'Graduation Ceremony',
    title: 'Graduation Ceremony — Senior High School Batch 2026',
    byline: 'By the Amore Academy Academic Affairs Office · February 10, 2026',
    body: `
      <div class="article-detail-event-card">
        <div class="article-detail-event-date"><span class="month">May</span><span class="day">02</span><span class="year">2026</span></div>
        <div class="article-detail-event-info"><h4>Event Details</h4><p>📍 Main Gymnasium, Amore Academy &nbsp;|&nbsp; 🕘 9:00 AM – 12:00 NN &nbsp;|&nbsp; Graduation attire required</p></div>
      </div>
      <h3>Program Overview</h3>
      <ul>
        <li>8:00 AM — Assembly and photo opportunities</li>
        <li>9:00 AM — Processional March</li>
        <li>9:50 AM — Valedictorian Address</li>
        <li>10:00 AM — Conferment of Diplomas and Academic Awards</li>
        <li>11:30 AM — Recessional March</li>
      </ul>
      <h3>For Graduating Students</h3>
      <p>Claim your graduation gown and cap from the Registrar's Office by April 28. Rehearsal is April 30 at 2:00 PM — attendance is mandatory. Each graduate receives <strong>four (4) guest tickets</strong>. Additional ticket requests due April 20. Congratulations, Batch 2026! 🎓</p>`
  },
  'movingup-event': {
    tag: 'Events', tagClass: 'news-page-tag--events',
    date: 'May 15, 2026', image: 'image/grad.jfif', imageAlt: 'Moving Up Ceremony',
    title: 'Junior High School Moving Up Ceremony',
    byline: 'By the Amore Academy Junior High Academic Office · February 10, 2026',
    body: `
      <div class="article-detail-event-card">
        <div class="article-detail-event-date"><span class="month">May</span><span class="day">15</span><span class="year">2026</span></div>
        <div class="article-detail-event-info"><h4>Event Details</h4><p>📍 Main Gymnasium, Amore Academy &nbsp;|&nbsp; 🕗 8:00 AM – 11:00 AM &nbsp;|&nbsp; Smart casual attire</p></div>
      </div>
      <h3>Program Highlights</h3>
      <ul>
        <li>Academic Excellence Awards (With Highest Honors, With High Honors, With Honors)</li>
        <li>Special Recognition Awards (Leadership, Arts, Service)</li>
        <li>Moving Up of Grade 10 to Senior High School</li>
        <li>Grade-level Promotion for Grades 7–9</li>
        <li>Cultural Presentation by JHS Students</li>
      </ul>
      <p>Each student receives <strong>three (3) guest passes</strong>. Doors open at 7:30 AM; guests seated by 7:50 AM. Grade 10 students must confirm SHS strand enrollment by May 10 at the Registrar's Office.</p>`
  },
  'firstday-event': {
    tag: 'Academics', tagClass: 'news-page-tag--academics',
    date: 'June 8, 2026', image: 'image/stemlab.png', imageAlt: 'First Day of Classes',
    title: 'First Day of Classes — S.Y. 2026–2027',
    byline: 'By the Amore Academy Administration · February 5, 2026',
    body: `
      <div class="article-detail-event-card">
        <div class="article-detail-event-date"><span class="month">Jun</span><span class="day">08</span><span class="year">2026</span></div>
        <div class="article-detail-event-info"><h4>Event Details</h4><p>📍 All Classrooms, Amore Academy &nbsp;|&nbsp; 🕖 7:00 AM – Class begins &nbsp;|&nbsp; Complete uniform required</p></div>
      </div>
      <h3>Preparation Reminders</h3>
      <ul>
        <li>All students must come in <strong>complete school uniform</strong> on the first day</li>
        <li>Class schedules will be distributed during homeroom period</li>
        <li>Textbooks and materials will be announced by subject teachers</li>
        <li>Student IDs will be issued during the first week — photos taken on-site</li>
        <li>The school canteen and library will be fully operational from Day 1</li>
      </ul>
      <h3>For New Students</h3>
      <p>New Grade 7 and Grade 11 students should arrive by <strong>6:45 AM</strong> for an orientation session at the gymnasium. Faculty advisers and upperclassmen ambassadors will be present to help. Here's to a wonderful school year! 📚</p>`
  }
};

(function () {
  const overlay   = document.getElementById('articleDetailOverlay');
  const contentEl = document.getElementById('articleDetailContent');
  const backBtn   = document.getElementById('articleDetailBack');

  if (!overlay || !contentEl || !backBtn) return; // only runs on news.html

  function openArticle(id) {
    const article = articleData[id];
    if (!article) return;

    const imgHtml = article.image
      ? `<img src="${article.image}" alt="${article.imageAlt}" class="article-detail-hero-img" loading="eager" decoding="async" width="800" height="450">`
      : '';

    contentEl.innerHTML = `
      ${imgHtml}
      <div class="article-detail-meta">
        <span class="news-page-tag ${article.tagClass}">${article.tag}</span>
        <span class="news-page-date">${article.date}</span>
      </div>
      <h1 class="article-detail-title">${article.title}</h1>
      <p class="article-detail-byline">${article.byline}</p>
      <div class="article-detail-body">${article.body}</div>
    `;

    overlay.scrollTop = 0;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    history.pushState({ articleOpen: true, articleId: id }, '', `#article-${id}`);
  }

  function closeArticle() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Wire up all "Read more" links
  document.querySelectorAll('.read-more-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.dataset.article;
      if (id) openArticle(id);
    });
  });

  // Filter buttons
  document.querySelectorAll('.news-page-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.news-page-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Back button
  backBtn.addEventListener('click', () => {
    closeArticle();
    if (history.state && history.state.articleOpen) history.back();
  });

  // Browser back gesture
  window.addEventListener('popstate', () => {
    if (overlay.classList.contains('is-open')) closeArticle();
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeArticle();
      if (history.state && history.state.articleOpen) history.back();
    }
  });
})();
/* ===================================================================
   APPLY NOW PAGE — apply.html
   =================================================================== */
(function () {
  // Only run on the apply page
  if (!document.querySelector('.apply-steps-bar')) return;

  // ---- Step bar highlight on scroll ----
  const applySections = [
    { id: 'sec-personal',  step: 1 },
    { id: 'sec-program',   step: 2 },
    { id: 'sec-academic',  step: 3 },
    { id: 'sec-documents', step: 4 },
    { id: 'sec-review',    step: 5 },
  ];

  function updateActiveStep() {
    const scrollY = window.scrollY + 160;
    let current = 1;
    applySections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop <= scrollY) current = s.step;
    });
    document.querySelectorAll('.apply-step-item').forEach(item => {
      const step = parseInt(item.dataset.step);
      item.classList.toggle('active',    step === current);
      item.classList.toggle('completed', step < current);
    });
  }
  window.addEventListener('scroll', updateActiveStep, { passive: true });
  updateActiveStep();

  // ---- Scroll to section helper ----
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' });
  };

  // ---- SHS strand section reveal ----
  document.querySelectorAll('input[name="level"]').forEach(r => {
    r.addEventListener('change', () => {
      const section = document.getElementById('shs-strand-section');
      if (section) section.style.display = (r.value === 'SHS' && r.checked) ? 'block' : 'none';
    });
  });

  // ---- File upload feedback ----
  window.triggerUpload = function (id) {
    const el = document.getElementById(id);
    if (el) el.click();
  };
  window.updateUpload = function (input, labelId) {
    const lbl = document.getElementById(labelId);
    if (lbl && input.files.length > 0) {
      lbl.textContent = '✓ ' + input.files[0].name;
      lbl.style.color = 'var(--color-success)';
    }
  };

  // ---- Live review summary ----
  function updateReview() {
    const fn = (document.getElementById('firstName') || {}).value || '';
    const ln = (document.getElementById('lastName')  || {}).value || '';
    const name = [fn.trim(), ln.trim()].filter(Boolean).join(' ');

    const nameEl  = document.getElementById('review-name');
    const emailEl = document.getElementById('review-email');
    const levelEl = document.getElementById('review-level');
    const typeEl  = document.getElementById('review-apptype');

    if (nameEl)  nameEl.textContent  = name || '— not yet filled —';
    if (emailEl) emailEl.textContent = (document.getElementById('email') || {}).value?.trim() || '—';

    const levelRadio = document.querySelector('input[name="level"]:checked');
    if (levelEl) levelEl.textContent = levelRadio
      ? (levelRadio.value === 'JHS' ? 'Junior High School' : 'Senior High School')
      : '—';

    const typeRadio = document.querySelector('input[name="apptype"]:checked');
    const typeMap   = { new: 'New Student', transfer: 'Transferee', returning: 'Returning Student' };
    if (typeEl) typeEl.textContent = typeRadio ? (typeMap[typeRadio.value] || '—') : '—';
  }

  ['firstName', 'lastName', 'email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateReview);
  });
  document.querySelectorAll('input[name="level"], input[name="apptype"]')
    .forEach(r => r.addEventListener('change', updateReview));

  // ---- Submit application ----
  window.submitApplication = function () {
    const allAgreed = ['agree1', 'agree2', 'agree3']
      .every(id => document.getElementById(id)?.checked);

    if (!allAgreed) {
      alert('Please read and agree to all statements before submitting your application.');
      return;
    }

    const ref = 'AA-2026-' + String(Math.floor(10000 + Math.random() * 90000));
    const refEl = document.getElementById('refNumber');
    if (refEl) refEl.textContent = ref;

    const overlay = document.getElementById('successOverlay');
    if (overlay) {
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeSuccess = function () {
    const overlay = document.getElementById('successOverlay');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
    window.location.href = 'Home.html';
  };

  // Close modal when clicking backdrop
  const successOverlay = document.getElementById('successOverlay');
  if (successOverlay) {
    successOverlay.addEventListener('click', function (e) {
      if (e.target === this) window.closeSuccess();
    });
  }

  // ---- Save draft toast ----
  window.showSaveToast = function () {
    const toast = document.getElementById('saveToast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  };
})();