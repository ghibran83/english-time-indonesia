/**
 * English Time Indonesia - Interactive Scripts
 * Handling mobile menu, class filter, FAQ accordion, modals, and WhatsApp auto-fill.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.remove('translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    setTimeout(() => {
      mobileBackdrop.classList.remove('opacity-0');
      mobileBackdrop.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.add('translate-x-full');
    mobileBackdrop.classList.remove('opacity-100');
    mobileBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      mobileBackdrop.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // 2. Sticky Navbar scroll elevation
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md', 'bg-white/95');
      navbar.classList.remove('bg-white/80');
    } else {
      navbar.classList.remove('shadow-md', 'bg-white/95');
      navbar.classList.add('bg-white/80');
    }
  });

  // 3. Class Filter Program Tabs
  const classFilterButtons = document.querySelectorAll('.class-filter-btn');
  const classCards = document.querySelectorAll('.class-card');

  classFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active state
      classFilterButtons.forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-slate-700', 'hover:bg-amber-50');
      });
      button.classList.remove('bg-white', 'text-slate-700', 'hover:bg-amber-50');
      button.classList.add('bg-amber-500', 'text-white', 'shadow-md');

      // Filter cards
      classCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerContent = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    questionBtn.addEventListener('click', () => {
      const isOpen = !answerContent.classList.contains('hidden');

      // Close all first
      faqItems.forEach(otherItem => {
        otherItem.querySelector('.faq-answer').classList.add('hidden');
        otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
        otherItem.classList.remove('border-amber-400', 'bg-amber-50/40');
      });

      // Toggle current
      if (!isOpen) {
        answerContent.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        item.classList.add('border-amber-400', 'bg-amber-50/40');
      }
    });
  });

  // 5. Free Trial & Consultation Modal
  const modal = document.getElementById('trialModal');
  const openModalBtns = document.querySelectorAll('.open-trial-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const trialForm = document.getElementById('trialForm');

  function openModal(defaultProgram = '') {
    if (defaultProgram) {
      const selectElem = document.getElementById('formProgram');
      if (selectElem) selectElem.value = defaultProgram;
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const program = btn.getAttribute('data-program') || '';
      openModal(program);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 6. Handle Form Submit -> WhatsApp Redirect
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('formParentName').value.trim();
      const childName = document.getElementById('formChildName').value.trim();
      const childAge = document.getElementById('formChildAge').value.trim();
      const program = document.getElementById('formProgram').value;
      const notes = document.getElementById('formNotes').value.trim();

      const phone = "628170000119"; // Official English Time CS number from desty store

      let message = `Halo English Time Indonesia! 👋\n\nSaya ingin mendaftarkan anak saya untuk Free Trial Class / Konsultasi:\n`;
      message += `• Nama Orang Tua: ${parentName}\n`;
      message += `• Nama Anak: ${childName}\n`;
      message += `• Usia Anak: ${childAge} Tahun\n`;
      message += `• Program Pilihan: ${program}\n`;
      if (notes) {
        message += `• Catatan / Harapan: ${notes}\n`;
      }
      message += `\nMohon info jadwal trial dan lokasinya ya. Terima kasih! 😊`;

      const encodedUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      
      // Close modal
      closeModal();

      // Open WhatsApp in new tab
      window.open(encodedUrl, '_blank');
    });
  }

  // 7. Video Modal / Play Handler
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoPlaceholder = document.getElementById('videoPlaceholder');
  const videoIframeContainer = document.getElementById('videoIframeContainer');

  if (videoPlayBtn && videoPlaceholder && videoIframeContainer) {
    videoPlayBtn.addEventListener('click', () => {
      videoPlaceholder.classList.add('hidden');
      videoIframeContainer.classList.remove('hidden');
      const iframe = videoIframeContainer.querySelector('iframe');
      if (iframe && !iframe.src.includes('autoplay=1')) {
        iframe.src = "https://www.youtube.com/embed/90VnBP4RvzA?autoplay=1&rel=0";
      }
    });
  }

  // 8. Cheerful Interactive Floating Activity Cards
  const activityCards = document.querySelectorAll('.activity-card');
  activityCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const badge = card.querySelector('.activity-badge');
      if (badge) badge.classList.add('scale-110');
    });
    card.addEventListener('mouseleave', () => {
      const badge = card.querySelector('.activity-badge');
      if (badge) badge.classList.remove('scale-110');
    });
  });
});
