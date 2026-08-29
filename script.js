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
    footerText.textContent = `© ${1972} Amore Academy. All rights reserved.`;
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

console.log('Amore Academy Website Loaded Successfully! 🎓');

// NEWS ARTICLE DETAIL OVERLAY
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

// ===================================================================
// ACADEMICS — TRACK & STRAND DETAIL OVERLAY (news.html style)
// ===================================================================
(function () {

  // ── STRAND DATA ──────────────────────────────────────────────────
  const STRAND_DATA = {
    stem: {
      track: "Academic Track", color: "#0a2463", accent: "#fb8500",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/><path d="M12 28L18 16L24 24L28 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      label: "STEM", full: "Science, Technology, Engineering & Mathematics",
      tagline: "Where curiosity meets innovation — build the future through the power of science and math.",
      overview: "The STEM strand is designed for students with a passion for discovery, analysis, and problem-solving. It offers a rigorous curriculum that prepares graduates for college courses in Engineering, Medicine, Computer Science, Architecture, and the Natural Sciences.",
      subjects: ["General Mathematics","Pre-Calculus","Basic Calculus","General Biology 1 & 2","General Chemistry 1 & 2","General Physics 1 & 2","Research / Capstone Project","Empowerment Technologies"],
      careers: ["Engineer","Doctor / Physician","Computer Scientist","Data Analyst","Architect","Research Scientist","Nurse / Allied Health"],
      colleges: ["BS Engineering","BS Computer Science","BS Medicine / Nursing","BS Architecture","BS Biology / Chemistry"],
      highlight: "STEM graduates at Amore Academy consistently earn top placements in national entrance exams for top universities.",
    },
    abm: {
      track: "Academic Track", color: "#14532d", accent: "#22c55e",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="28" height="24" rx="3" stroke="currentColor" stroke-width="2"/><path d="M14 20h12M14 25h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      label: "ABM", full: "Accountancy, Business & Management",
      tagline: "Learn to lead, manage, and build — the foundations of every thriving enterprise.",
      overview: "The ABM strand equips students with a deep understanding of business operations, financial management, and entrepreneurial thinking. It is the ideal pathway for students aiming to enter courses related to business, finance, economics, and law.",
      subjects: ["Business Mathematics","Fundamentals of ABM","Applied Economics","Organization & Management","Business Finance","Business Ethics","Principles of Marketing","Work Immersion (Business)"],
      careers: ["Accountant / CPA","Business Manager","Entrepreneur","Financial Analyst","Marketing Officer","Economist","Lawyer (Pre-Law)"],
      colleges: ["BS Accountancy","BS Business Administration","BS Economics","BS Marketing","AB Political Science / Pre-Law"],
      highlight: "ABM students develop real-world business plans and present to industry mentors as part of their capstone immersion.",
    },
    humss: {
      track: "Academic Track", color: "#4c1d95", accent: "#a78bfa",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M10 32V14l10-6 10 6v18" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="20" r="4" stroke="currentColor" stroke-width="2"/></svg>`,
      label: "HUMSS", full: "Humanities & Social Sciences",
      tagline: "Understand people, societies, and cultures — and use that knowledge to change the world.",
      overview: "HUMSS is crafted for students drawn to literature, philosophy, sociology, political science, and communication. This strand develops critical thinking, writing mastery, and empathy — essential traits for leaders in public service, media, education, and the arts.",
      subjects: ["Creative Writing","Introduction to Philosophy","Understanding Culture & Society","Creative Nonfiction","Trends in Media & Information","Community Engagement & Leadership","Philippine Politics & Governance","Research in Social Sciences"],
      careers: ["Journalist / Writer","Educator / Professor","Psychologist","Social Worker","Lawyer / Politician","Diplomat / Foreign Affairs","Content Creator / Media"],
      colleges: ["AB Communication","BS Psychology","AB Political Science","BS Education","AB Sociology","AB Literature / Philosophy"],
      highlight: "HUMSS students at Amore regularly publish in the school journal and lead student government initiatives.",
    },
    gas: {
      track: "Academic Track", color: "#1e3a8a", accent: "#60a5fa",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="2"/><path d="M20 6v14l8 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
      label: "GAS", full: "General Academic Strand",
      tagline: "Explore broadly, decide confidently — the open pathway for the curious and undecided.",
      overview: "GAS offers students the widest academic exposure across multiple disciplines. Ideal for those still exploring their interests, it combines elements of STEM, ABM, and HUMSS while providing flexibility for diverse college and career paths.",
      subjects: ["Humanities 1 & 2","Social Science 1 & 2","Applied Mathematics in the Modern World","Organization & Management","Disaster Readiness & Risk Reduction","Elective Subjects (flexible)"],
      careers: ["Any college course is accessible","General Management","Public Administration","Teaching / Education","Media & Communication"],
      colleges: ["Open to all BS / AB programs","Education, Tourism, Hotel & Restaurant","Liberal Arts","Criminology","Public Administration"],
      highlight: "GAS is perfect for multi-talented students who want to experience a range of disciplines before specializing in college.",
    },
    ict: {
      track: "TVL Track", color: "#0c4a6e", accent: "#38bdf8",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="10" width="28" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M14 34h12M20 28v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 18l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      label: "ICT", full: "Information & Communications Technology",
      tagline: "Code, create, connect — become the tech talent the world needs.",
      overview: "The ICT strand immerses students in the world of programming, networking, multimedia production, and digital systems. Graduates are equipped for tech careers and higher education in IT, Computer Science, and Engineering right out of SHS.",
      subjects: ["Computer Programming (Python / Java)","Web Development","Networking Fundamentals","Digital Arts & Multimedia","Animation & Video Production","Database Management","Work Immersion (Tech Industry)","Capstone Project"],
      careers: ["Software Developer","Web Designer / Developer","Network Administrator","Graphic Designer","IT Support Specialist","Game Developer","Digital Content Creator"],
      colleges: ["BS Information System","BS Information Technology","BS Computer Science","BS Computer Engineering","BS Multimedia Arts","TESDA NC II / NC III Certification"],
      highlight: "ICT students undergo live industry immersion with partner tech companies and earn TESDA certifications before graduation.",
    },
    he: {
      track: "TVL Track", color: "#7c2d12", accent: "#fb923c",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 32V18l12-10 12 10v14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M15 32v-8h10v8" stroke="currentColor" stroke-width="2"/></svg>`,
      label: "Home Economics", full: "Home Economics",
      tagline: "Master the art and science of living — from culinary excellence to family entrepreneurship.",
      overview: "The Home Economics strand prepares students for careers in hospitality, food service, cosmetology, and household management. Grounded in practical skills and enterprise thinking, it opens paths both to higher education and immediate employment.",
      subjects: ["Bread & Pastry Production","Cookery (NC II)","Food & Beverage Services","Housekeeping (NC II)","Beauty Care / Nail Care","Entrepreneurship in HE","Nutrition & Dietetics Basics","Work Immersion (Hotel / Restaurant)"],
      careers: ["Chef / Pastry Chef","Restaurant / Hotel Manager","Catering Entrepreneur","Cosmetologist / Beautician","Nutritionist / Dietitian","Food Quality Specialist"],
      colleges: ["BS Hotel & Restaurant Management","BS Tourism Management","BS Nutrition & Dietetics","BS Culinary Arts","TESDA NC II (Cookery, Housekeeping, Beauty Care)"],
      highlight: "HE students operate the school's student-run café during practical immersion, building real business acumen.",
    },
    ia: {
      track: "TVL Track", color: "#1c1917", accent: "#a8a29e",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M10 30L20 10l10 20" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 22h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      label: "Industrial Arts", full: "Industrial Arts",
      tagline: "Build, fabricate, create — train your hands for the trades that drive the economy.",
      overview: "Industrial Arts trains students in skilled trades such as electrical installation, welding, plumbing, and automotive servicing. Graduates are job-ready and eligible for TESDA certifications, giving them an immediate edge in the labor market.",
      subjects: ["Electrical Installation & Maintenance (NC II)","Welding (NC I / NC II)","Plumbing (NC I)","Automotive Servicing (NC II)","Carpentry / Furniture Making","Drafting Technology","Entrepreneurship in Industrial Arts","Work Immersion (Trade Industry)"],
      careers: ["Licensed Electrician","Welder / Fabricator","Plumber / Pipefitter","Automotive Technician","Construction Foreman","Industrial Entrepreneur"],
      colleges: ["BS Electrical Engineering","BS Mechanical Engineering","BS Civil Engineering","TESDA NC I–III Certifications","Technical / Vocational Programs"],
      highlight: "IA students complete supervised shop-floor immersions and graduate with industry-recognized TESDA competency certifications.",
    },
    "visual-arts": {
      track: "Arts & Design Track", color: "#701a75", accent: "#e879f9",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="2"/><path d="M13 27C15 22 18 17 20 15C22 17 25 22 27 27" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      label: "Visual Arts", full: "Visual Arts",
      tagline: "Express, imagine, and design — transform vision into art that moves the world.",
      overview: "The Visual Arts strand develops students into skilled artists and designers through intensive studio practice, art history, and creative theory. It is ideal for students aspiring to careers in fine arts, graphic design, architecture, and multimedia.",
      subjects: ["Drawing & Painting Studio","Graphic Design Fundamentals","Photography & Digital Imaging","Art History & Appreciation","Sculpture & Mixed Media","Layout & Typography","Portfolio Development","Capstone Exhibition"],
      careers: ["Graphic Designer","Illustrator / Fine Artist","UI / UX Designer","Art Director","Photographer","Animator / Motion Designer","Art Teacher / Curator"],
      colleges: ["BS Fine Arts","BS Graphic Technology","BS Architecture","BS Interior Design","BA Communication Arts","BS Multimedia Arts"],
      highlight: "Visual Arts students present a full-scale gallery exhibition in Grade 12, showcasing original works to industry professionals.",
    },
    "performing-arts": {
      track: "Arts & Design Track", color: "#831843", accent: "#f472b6",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M12 32V16l8-8 8 8v16" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="14" r="3" stroke="currentColor" stroke-width="2"/></svg>`,
      label: "Performing Arts", full: "Performing Arts",
      tagline: "Take the stage — dance, sing, act, and perform your way to a creative career.",
      overview: "The Performing Arts strand is a dynamic, performance-driven program that trains students in theater, dance, and music. Through rigorous rehearsals, workshops, and live productions, students build discipline, confidence, and artistry.",
      subjects: ["Theater Arts & Acting","Dance (Ballet / Contemporary / Folk)","Music Theory & Composition","Voice Training & Choral","Stage Management & Production","Script Writing & Dramaturgy","Production Design & Lighting","Capstone Performance"],
      careers: ["Actor / Stage Performer","Dancer / Choreographer","Singer / Musician","Theater Director","Dance / Drama Educator","Events & Production Manager","Performing Arts Therapist"],
      colleges: ["BFA Theater Arts","BFA Dance","BS Music / BS Music Education","BA Communication","PAFTE / Conservatory Programs"],
      highlight: "Performing Arts students headline the annual Amore Grand Showcase — a full production staged in partnership with local theater companies.",
    },
    "sports-science": {
      track: "Sports Track", color: "#1a2e05", accent: "#84cc16",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" stroke="currentColor" stroke-width="2"/><path d="M10 26c2-3 5-5 10-5s8 2 10 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      label: "Sports Science", full: "Sports Science",
      tagline: "Apply the science of human performance — train smarter, compete stronger.",
      overview: "The Sports Science strand blends kinesiology, anatomy, nutrition, and performance analytics with active athletic training. It prepares students for careers in sports medicine, coaching, physical education, and sports management.",
      subjects: ["Exercise & Sports Science","Anatomy & Physiology","Sports Nutrition","Sports Psychology","Biomechanics & Movement Analysis","First Aid & Sports Medicine","Athletic Training & Conditioning","Research in Sports (Capstone)"],
      careers: ["Sports Scientist / Analyst","Physical Therapist","Sports Nutritionist","Kinesiologist","PE Teacher","Athletic Trainer","Sports Medicine Doctor (pre-med)"],
      colleges: ["BS Sports Science","BS Physical Therapy","BS Kinesiology","BS Physical Education","BS Sports Management","BS Nutrition & Dietetics"],
      highlight: "Sports Science students partner with local sports clubs for practicum, collecting real performance data for their capstone research.",
    },
    coaching: {
      track: "Sports Track", color: "#052e16", accent: "#4ade80",
      icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 30l12-16 12 16" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="20" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>`,
      label: "Coaching", full: "Coaching",
      tagline: "Lead, inspire, and develop champions — on the field and in life.",
      overview: "The Coaching strand develops future sports leaders who understand game strategy, athlete psychology, and team management. Students are trained in officiating, program design, and the ethical responsibilities of a coach at all levels.",
      subjects: ["Principles of Coaching","Team Dynamics & Leadership","Sports Officiating & Rules","Game Strategy & Tactics","Athlete Psychology & Motivation","Sports Management & Administration","Event & Tournament Organizing","Practicum (On-Site Coaching)"],
      careers: ["Sports Coach","Athletic Director","Team Manager","Sports Official / Referee","Sports Event Organizer","Physical Education Teacher","Sports Broadcaster / Analyst"],
      colleges: ["BS Sports Management","BS Physical Education (major: coaching)","BS Sports Science","Certificate in Coaching (NSTP / PSC programs)"],
      highlight: "Coaching students earn officiating certifications and lead junior-level training camps as part of their hands-on practicum.",
    },
  };

  // ── TRACK DATA ───────────────────────────────────────────────────
  const TRACK_DATA = {
    academic: {
      number: "01",
      color: "#0a2463", accent: "#fb8500",
      icon: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none"><rect x="6" y="6" width="32" height="32" rx="3" stroke="currentColor" stroke-width="2.2"/><line x1="12" y1="15" x2="32" y2="15" stroke="currentColor" stroke-width="2.2"/><line x1="12" y1="22" x2="32" y2="22" stroke="currentColor" stroke-width="2.2"/><line x1="12" y1="29" x2="23" y2="29" stroke="currentColor" stroke-width="2.2"/></svg>`,
      label: "Academic Track",
      tagline: "Your gateway to the country's top universities and professional careers.",
      overview: "The Academic Track is designed for Grade 11 and 12 students who intend to pursue higher education after Senior High School. It provides rigorous preparation across four specialized strands, each aligned to distinct college and career pathways. Students develop strong analytical, communication, and research skills that are essential for university life and beyond.",
      strands: ["stem","abm","humss","gas"],
    },
    tvl: {
      number: "02",
      color: "#0c4a6e", accent: "#38bdf8",
      icon: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none"><path d="M8 36V18l14-10 14 10v18" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><rect x="14" y="24" width="16" height="12" rx="1.5" stroke="currentColor" stroke-width="2.2"/></svg>`,
      label: "Technical-Vocational-Livelihood Track",
      tagline: "Hands-on skills, industry certifications, and career-ready graduates.",
      overview: "The TVL Track prepares students for skilled trade careers, technical employment, and entrepreneurship. Each strand is aligned with TESDA qualifications, meaning graduates can earn nationally recognized certificates before leaving high school — giving them a direct advantage in the job market or as a foundation for further technical education.",
      strands: ["ict","he","ia"],
    },
    arts: {
      number: "03",
      color: "#701a75", accent: "#e879f9",
      icon: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="16" stroke="currentColor" stroke-width="2.2"/><circle cx="22" cy="22" r="4" fill="currentColor"/><path d="M22 6v8M22 30v8M6 22h8M30 22h8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
      label: "Arts & Design Track",
      tagline: "Cultivate your creative voice and launch a life in the arts.",
      overview: "The Arts & Design Track nurtures students with a passion for creative expression, visual storytelling, and performance. Through intensive studio practice, live productions, and portfolio development, students build both the technical skills and artistic identity needed to thrive in design, media, and the performing arts industries.",
      strands: ["visual-arts","performing-arts"],
    },
    sports: {
      number: "04",
      color: "#1a2e05", accent: "#84cc16",
      icon: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="16" stroke="currentColor" stroke-width="2.2"/><path d="M10 30c3-5 7-8 12-8s9 3 12 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M10 14c3 5 7 8 12 8s9-3 12-8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
      label: "Sports Track",
      tagline: "Where athletic passion meets academic purpose.",
      overview: "The Sports Track combines rigorous athletic training with academic study, preparing student-athletes for careers in sports science, coaching, physical education, and sports management. Students gain both the physical conditioning and the theoretical knowledge needed to compete at the highest levels — or to lead and develop athletes of tomorrow.",
      strands: ["sports-science","coaching"],
    },
  };

  // ── OVERLAY ELEMENTS ─────────────────────────────────────────────
  const overlay   = document.getElementById('strandDetailOverlay');
  const contentEl = document.getElementById('strandDetailContent');
  const backBtn   = document.getElementById('strandDetailBack');

  if (!overlay || !contentEl || !backBtn) return;

  // Track what level we're viewing so Back knows where to go
  let viewStack = []; // e.g. ['track:academic'] or ['track:academic','strand:stem']

  // ── BUILDERS ─────────────────────────────────────────────────────
  function buildTrackHTML(t) {
    const strandCards = t.strands.map(key => {
      const s = STRAND_DATA[key];
      if (!s) return '';
      const subjectPreview = s.subjects.slice(0, 3).map(sub => `<li>${sub}</li>`).join('');
      return `
        <button class="track-strand-card" data-strand="${key}" style="--ts-accent:${s.accent};">
          <div class="track-strand-card-icon" style="color:${s.accent};">${s.icon}</div>
          <div class="track-strand-card-body">
            <div class="track-strand-card-label">${s.label}</div>
            <p class="track-strand-card-full">${s.full}</p>
            <p class="track-strand-card-tagline">"${s.tagline}"</p>
            <ul class="track-strand-card-subjects">${subjectPreview}<li class="track-strand-more">+ ${s.subjects.length - 3} more subjects…</li></ul>
          </div>
          <div class="track-strand-card-cta">View Full Details <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        </button>`;
    }).join('');

    return `
      <div class="strand-article-hero" style="background:${t.color};">
        <div class="strand-article-hero-content">
          <div class="track-hero-number">${t.number}</div>
          <div class="sp-icon">${t.icon}</div>
          <h1 class="strand-article-title">${t.label}</h1>
          <p class="sp-tagline" style="border-left-color:${t.accent};">"${t.tagline}"</p>
        </div>
      </div>
      <div class="strand-article-body">
        <div class="strand-article-section">
          <h3 class="sp-section-title">About This Track</h3>
          <p>${t.overview}</p>
        </div>
        <div class="strand-article-section">
          <h3 class="sp-section-title">Available Strands — tap to explore</h3>
          <div class="track-strands-list">${strandCards}</div>
        </div>
        <div class="sp-cta">
          <a href="apply.html" class="btn btn-primary">Apply for This Track</a>
          <a href="admissions.html#requirements-shs" class="btn btn-outline" style="color:var(--color-primary);border-color:var(--color-primary);">See Requirements</a>
        </div>
      </div>`;
  }

  function buildStrandHTML(d) {
    const subjectItems = d.subjects.map(s => `<li>${s}</li>`).join('');
    const careerTags   = d.careers.map(c => `<span class="sp-career-tag">${c}</span>`).join('');
    const collegeItems = d.colleges.map(c => `<li>${c}</li>`).join('');
    return `
      <div class="strand-article-hero" style="background:${d.color};">
        <div class="strand-article-hero-content">
          <span class="sp-track-badge">${d.track}</span>
          <div class="sp-icon">${d.icon}</div>
          <h1 class="strand-article-title">${d.label}</h1>
          <p class="sp-full-name">${d.full}</p>
          <p class="sp-tagline" style="border-left-color:${d.accent};">"${d.tagline}"</p>
        </div>
      </div>
      <div class="strand-article-body">
        <div class="strand-article-section">
          <h3 class="sp-section-title">Overview</h3>
          <p>${d.overview}</p>
        </div>
        <div class="strand-article-section">
          <h3 class="sp-section-title">Core Subjects</h3>
          <ul class="sp-subject-list">${subjectItems}</ul>
        </div>
        <div class="strand-article-section">
          <h3 class="sp-section-title">Career Pathways</h3>
          <div class="sp-careers">${careerTags}</div>
        </div>
        <div class="strand-article-section">
          <h3 class="sp-section-title">College Courses to Pursue</h3>
          <ul class="sp-subject-list">${collegeItems}</ul>
        </div>
        <div class="sp-highlight">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${d.highlight}</span>
        </div>
        <div class="sp-cta">
          <a href="apply.html" class="btn btn-primary">Apply for This Strand</a>
          <a href="admissions.html#requirements-shs" class="btn btn-outline" style="color:var(--color-primary);border-color:var(--color-primary);">See Requirements</a>
        </div>
      </div>`;
  }

  // ── OPEN / CLOSE ─────────────────────────────────────────────────
  function render(html, backLabel) {
    contentEl.innerHTML = html;
    backBtn.childNodes[backBtn.childNodes.length - 1].textContent = ' ' + backLabel;
    overlay.scrollTop = 0;

    // Wire strand cards inside track view
    contentEl.querySelectorAll('.track-strand-card').forEach(card => {
      card.addEventListener('click', () => openStrand(card.dataset.strand, true));
    });
  }

  function openTrack(key) {
    const t = TRACK_DATA[key];
    if (!t) return;
    viewStack = [{ type: 'track', key }];
    render(buildTrackHTML(t), 'Back to Academics');
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    history.pushState({ academicsOverlay: true, type: 'track', key }, '', `#track-${key}`);
  }

  function openStrand(key, fromTrack) {
    const d = STRAND_DATA[key];
    if (!d) return;
    if (fromTrack) {
      viewStack.push({ type: 'strand', key });
    } else {
      viewStack = [{ type: 'strand', key }];
    }
    const backLabel = viewStack.length > 1 ? `Back to ${TRACK_DATA[viewStack[0].key]?.label || 'Track'}` : 'Back to Academics';
    render(buildStrandHTML(d), backLabel);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    history.pushState({ academicsOverlay: true, type: 'strand', key, fromTrack }, '', `#strand-${key}`);
  }

  function goBack() {
    viewStack.pop();
    if (viewStack.length > 0) {
      const prev = viewStack[viewStack.length - 1];
      if (prev.type === 'track') {
        const t = TRACK_DATA[prev.key];
        render(buildTrackHTML(t), 'Back to Academics');
        history.pushState({ academicsOverlay: true, type: 'track', key: prev.key }, '', `#track-${prev.key}`);
      }
    } else {
      closeOverlay();
    }
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    viewStack = [];
  }

  // ── EVENT LISTENERS ──────────────────────────────────────────────
  // Track cards
  document.querySelectorAll('.track-clickable').forEach(card => {
    card.addEventListener('click', () => openTrack(card.dataset.track));
  });

  // Back button
  backBtn.addEventListener('click', () => {
    if (viewStack.length > 1) {
      history.back();
    } else {
      closeOverlay();
      if (history.state && history.state.academicsOverlay) history.back();
    }
  });

  // Browser back
  window.addEventListener('popstate', () => {
    if (!overlay.classList.contains('is-open')) return;
    if (viewStack.length > 1) {
      goBack();
    } else {
      closeOverlay();
    }
  });

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      if (viewStack.length > 1) goBack();
      else {
        closeOverlay();
        if (history.state && history.state.academicsOverlay) history.back();
      }
    }
  });

})();