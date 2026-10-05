/**
 * Site educativo — Corpo, Identidade e Sexualidade
 * Interatividade: menu mobile, acordeões, abas, mitos, quiz
 */

(function () {
  "use strict";

  // ----- Menu mobile -----
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Fecha o menu ao clicar em um link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // ----- Acordeões -----
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    accordion.querySelectorAll(".accordion-header").forEach((header) => {
      header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");
        const wasOpen = item.classList.contains("is-open");

        // Fecha os outros do mesmo grupo (opcional: acordeão exclusivo)
        accordion.querySelectorAll(".accordion-item").forEach((el) => {
          el.classList.remove("is-open");
          el.querySelector(".accordion-header")?.setAttribute("aria-expanded", "false");
        });

        if (!wasOpen) {
          item.classList.add("is-open");
          header.setAttribute("aria-expanded", "true");
        }
      });
    });
  });

  // ----- Abas (tabs) -----
  document.querySelectorAll("[data-tabs]").forEach((tabsRoot) => {
    const buttons = tabsRoot.querySelectorAll(".tab-btn");
    const panels = tabsRoot.querySelectorAll(".tab-panel");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab");

        buttons.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        panels.forEach((p) => p.classList.remove("active"));

        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        const panel = tabsRoot.querySelector("#" + targetId);
        if (panel) panel.classList.add("active");
      });
    });
  });

  // ----- Mitos × Fatos -----
  document.querySelectorAll("[data-myths] .myth-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".myth-item");
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // ----- Quiz -----
  document.querySelectorAll(".quiz-item").forEach((item) => {
    const checkBtn = item.querySelector(".quiz-check");
    const feedback = item.querySelector(".quiz-feedback");
    const correct = item.getAttribute("data-correct");

    if (!checkBtn || !feedback) return;

    checkBtn.addEventListener("click", () => {
      const selected = item.querySelector('input[type="radio"]:checked');

      if (!selected) {
        feedback.hidden = false;
        feedback.className = "quiz-feedback incorrect";
        feedback.textContent = "Selecione uma opção antes de verificar.";
        return;
      }

      feedback.hidden = false;
      if (selected.value === correct) {
        feedback.className = "quiz-feedback correct";
        feedback.textContent = "Correto! Bom domínio do conteúdo.";
      } else {
        feedback.className = "quiz-feedback incorrect";
        feedback.textContent =
          "Não é essa a resposta. Revise a seção correspondente e tente de novo.";
      }
    });
  });

  // ----- Destaque suave do link ativo na navegação (opcional) -----
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute("id") || "";
      }
    });

    navLinks.forEach((link) => {
      link.style.fontWeight = "";
      if (current && link.getAttribute("href") === "#" + current) {
        link.style.fontWeight = "700";
        link.style.color = "var(--accent)";
      } else {
        link.style.color = "";
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
})();