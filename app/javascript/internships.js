(() => {
  const initialized = new WeakSet();
  const KEYS = ["design", "skills", "format", "city", "company", "salary"];
  const SEARCH_STORAGE_KEY = "growy.internships.savedSearch.v1";

  const normalize = (s) =>
    String(s || "")
      .normalize("NFKC")
      .toLocaleLowerCase("ru-RU")
      .trim();
  const readStorage = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (_) {
      return null;
    }
  };
  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  };
  const deleteStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (_) {
      /* private browsing */
    }
  };

  function initInternshipsPage() {
    const root = document.querySelector("[data-internships]");
    if (!root || initialized.has(root)) return;
    initialized.add(root);

    const applied = Object.fromEntries(KEYS.map((key) => [key, new Set()]));
    const draft = Object.fromEntries(KEYS.map((key) => [key, new Set()]));
    const dropdowns = Object.fromEntries(
      KEYS.map((key) => [key, root.querySelector(`[data-filter="${key}"]`)]),
    );
    const searchInput = root.querySelector("[data-search-input]");
    const jobs = Array.from(root.querySelectorAll("[data-vacancy]"));
    const empty = root.querySelector("[data-empty]");
    const resultsCount = root.querySelector("[data-results-count]");
    const mobileFilters = root.querySelector("[data-filters-panel]");
    const mobileBackdrop = root.querySelector("[data-mobile-backdrop]");
    const mobileTrigger = root.querySelector("[data-open-mobile-filters]");
    const mobileCount = root.querySelector("[data-mobile-filter-count]");
    const saveDialog = root.querySelector("[data-save-dialog]");
    let openedFilter = null;

    function activeFor(key) {
      return openedFilter === key ? draft[key] : applied[key];
    }

    function refreshBadges() {
      KEYS.forEach((key) => {
        const filter = dropdowns[key];
        const values = activeFor(key);
        const badge = filter.querySelector("[data-filter-extra]");
        const clear = filter.querySelector("[data-filter-clear]");
        const count = values.size;
        filter.classList.toggle("has-selection", count > 0);
        badge.hidden = count <= 1;
        // По макету две отметки = "+1" (одна дополнительная к первой).
        badge.textContent = count > 1 ? `+${count - 1}` : "";
        clear.hidden = count === 0;
      });

      root.querySelectorAll("[data-chip-filter]").forEach((chip) => {
        const selected = applied[chip.dataset.chipFilter].has(
          chip.dataset.chipValue,
        );
        chip.classList.toggle("is-selected", selected);
        chip.setAttribute("aria-pressed", String(selected));
      });

      const total = KEYS.reduce((sum, key) => sum + applied[key].size, 0);
      mobileCount.hidden = total === 0;
      mobileCount.textContent = String(total);
    }

    function matchesSalary(job, selection) {
      if (!selection.size) return true;
      const status = job.dataset.salaryStatus;
      const amount = Number(job.dataset.salaryAmount || 0);
      return Array.from(selection).some((value) => {
        if (value === "Только оплачиваемые") return status === "paid";
        if (value === "Зарплата не указана") return status === "not_specified";
        if (value === "Зарплата указана") return status === "paid";
        const threshold = value.match(/От\s*([\d\s]+)\s*₽/);
        return !!threshold && amount >= Number(threshold[1].replace(/\s/g, ""));
      });
    }

    function jobMatches(job) {
      const query = normalize(searchInput.value);
      const searchable = normalize(
        [
          job.dataset.title,
          job.dataset.company,
          job.dataset.design,
          job.dataset.city,
          job.dataset.format,
          job.dataset.skills,
        ].join(" "),
      );
      if (
        query &&
        !query.split(/\s+/).every((word) => searchable.includes(word))
      )
        return false;

      for (const key of KEYS) {
        const values = applied[key];
        if (!values.size) continue;
        if (key === "salary") {
          if (!matchesSalary(job, values)) return false;
        } else if (key === "skills") {
          const jobSkills = (job.dataset.skills || "")
            .split("|")
            .map(normalize);
          if (
            ![...values].some((value) => jobSkills.includes(normalize(value)))
          )
            return false;
        } else {
          const field = normalize(job.dataset[key]);
          if (
            ![...values].some(
              (value) =>
                normalize(value) === field ||
                (value === "Другие города" &&
                  key === "city" &&
                  ![
                    "москва",
                    "санкт-петербург",
                    "казань",
                    "екатеринбург",
                  ].includes(field)) ||
                (value === "Другие компании" &&
                  key === "company" &&
                  !["авито", "яндекс", "vk", "сбер", "т-банк", "ozon"].includes(
                    field,
                  )),
            )
          )
            return false;
        }
      }
      return true;
    }

    function writeUrl() {
      const params = new URLSearchParams(window.location.search);
      params.delete("q");
      KEYS.forEach((key) => params.delete(key));
      if (searchInput.value.trim()) params.set("q", searchInput.value.trim());
      KEYS.forEach((key) => {
        applied[key].forEach((value) => params.append(key, value));
      });
      const qs = params.toString();
      const path =
        window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
      history.replaceState(history.state, "", path);
    }

    function refreshResults(updateUrl = true) {
      let visible = 0;
      jobs.forEach((job) => {
        const show = jobMatches(job);
        job.hidden = !show;
        if (show) visible += 1;
      });
      empty.hidden = visible !== 0;
      const hasQuery =
        searchInput.value.trim() || KEYS.some((key) => applied[key].size > 0);
      resultsCount.textContent = hasQuery
        ? `${visible} ${visible === 1 ? "вакансия" : "вакансии"}`
        : "";
      refreshBadges();
      if (updateUrl) writeUrl();
    }

    function syncCheckboxes(key) {
      dropdowns[key]
        .querySelectorAll("[data-filter-checkbox]")
        .forEach((checkbox) => {
          checkbox.checked = draft[key].has(checkbox.value);
        });
      refreshBadges();
    }

    function closeFilter(commit = false) {
      if (!openedFilter) return;
      const key = openedFilter;
      const filter = dropdowns[key];
      if (commit) applied[key] = new Set(draft[key]);
      else draft[key] = new Set(applied[key]);
      filter.classList.remove("is-open", "is-flipped");
      filter.querySelector("[data-filter-popup]").hidden = true;
      filter
        .querySelector("[data-filter-toggle]")
        .setAttribute("aria-expanded", "false");
      openedFilter = null;
      if (commit) refreshResults();
      else refreshBadges();
    }

    function openFilter(key) {
      if (openedFilter === key) {
        closeFilter(false);
        return;
      }
      closeFilter(false);
      openedFilter = key;
      const filter = dropdowns[key];
      draft[key] = new Set(applied[key]);
      const menu = filter.querySelector("[data-filter-popup]");
      filter.classList.add("is-open");
      menu.hidden = false;
      filter
        .querySelector("[data-filter-toggle]")
        .setAttribute("aria-expanded", "true");
      const search = filter.querySelector("[data-filter-search]");
      search.value = "";
      filter.querySelectorAll("[data-filter-option]").forEach((el) => {
        el.hidden = false;
      });
      filter.querySelector("[data-no-options]").hidden = true;
      syncCheckboxes(key);

      // Если меню не умещается снизу, открываем его вверх.
      // На мобильных оно встроено в боковую панель, а не всплывает.
      if (window.matchMedia("(min-width: 761px)").matches) {
        const rect = filter.getBoundingClientRect();
        const required = Math.min(
          menu.scrollHeight,
          Math.round(window.innerHeight * 0.65),
          550,
        );
        const roomBelow = window.innerHeight - rect.bottom - 12;
        filter.classList.toggle(
          "is-flipped",
          roomBelow < required && rect.top > roomBelow,
        );
      }
      search.focus({ preventScroll: true });
    }

    function resetAll() {
      closeFilter(false);
      KEYS.forEach((key) => {
        applied[key].clear();
        draft[key].clear();
        syncCheckboxes(key);
      });
      searchInput.value = "";
      deleteStorage(SEARCH_STORAGE_KEY);
      refreshResults();
    }

    // ===== События: фильтры =====
    Object.entries(dropdowns).forEach(([key, filter]) => {
      filter
        .querySelector("[data-filter-toggle]")
        .addEventListener("click", () => openFilter(key));
      filter
        .querySelector("[data-filter-clear]")
        .addEventListener("click", () => {
          applied[key].clear();
          draft[key].clear();
          syncCheckboxes(key);
          refreshResults();
        });
      filter.querySelectorAll("[data-filter-checkbox]").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) draft[key].add(checkbox.value);
          else draft[key].delete(checkbox.value);
          refreshBadges();
        });
      });
      filter
        .querySelector("[data-filter-search]")
        .addEventListener("input", (event) => {
          const q = normalize(event.target.value);
          let count = 0;
          filter.querySelectorAll("[data-filter-option]").forEach((option) => {
            const show = normalize(option.textContent).includes(q);
            option.hidden = !show;
            if (show) count++;
          });
          filter.querySelector("[data-no-options]").hidden = count > 0;
        });
      filter
        .querySelector("[data-filter-reset]")
        .addEventListener("click", () => {
          draft[key].clear();
          syncCheckboxes(key);
        });
      filter
        .querySelector("[data-filter-apply]")
        .addEventListener("click", () => closeFilter(true));
    });

    document.addEventListener("pointerdown", (event) => {
      if (
        root.isConnected &&
        openedFilter &&
        !dropdowns[openedFilter].contains(event.target)
      )
        closeFilter(false);
    });
    document.addEventListener("keydown", (event) => {
      if (!root.isConnected) return;
      if (event.key === "Escape") {
        if (openedFilter) {
          closeFilter(false);
          event.preventDefault();
        } else if (mobileFilters.classList.contains("is-mobile-open"))
          closeMobileFilters();
      }
    });

    // ===== Быстрые теги =====
    root.querySelectorAll("[data-chip-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        closeFilter(false);
        const { chipFilter: key, chipValue: value } = chip.dataset;
        if (applied[key].has(value)) applied[key].delete(value);
        else applied[key].add(value);
        draft[key] = new Set(applied[key]);
        syncCheckboxes(key);
        refreshResults();
      });
    });
    root
      .querySelectorAll("[data-reset-all]")
      .forEach((button) => button.addEventListener("click", resetAll));

    // ===== Ввод остаётся нативным: браузер сам прокручивает длинный текст к курсору =====
    root
      .querySelector("[data-search-form]")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        closeFilter(false);
        refreshResults();
      });
    searchInput.addEventListener("input", () => refreshResults(false));
    searchInput.addEventListener("change", writeUrl);

    // ===== Мобильная выдвижная панель =====
    function openMobileFilters() {
      mobileFilters.classList.add("is-mobile-open");
      mobileBackdrop.hidden = false;
      mobileTrigger.setAttribute("aria-expanded", "true");
      document.body.classList.add("internships-mobile-lock");
      mobileFilters.querySelector("[data-close-mobile-filters]").focus();
    }
    function closeMobileFilters() {
      closeFilter(false);
      mobileFilters.classList.remove("is-mobile-open");
      mobileBackdrop.hidden = true;
      mobileTrigger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("internships-mobile-lock");
      if (window.matchMedia("(max-width: 760px)").matches)
        mobileTrigger.focus();
    }
    mobileTrigger.addEventListener("click", openMobileFilters);
    mobileBackdrop.addEventListener("click", closeMobileFilters);
    root
      .querySelectorAll("[data-close-mobile-filters]")
      .forEach((button) =>
        button.addEventListener("click", closeMobileFilters),
      );
    window.addEventListener("resize", () => {
      if (
        window.innerWidth > 760 &&
        mobileFilters.classList.contains("is-mobile-open")
      )
        closeMobileFilters();
    });
    document.addEventListener("turbo:before-cache", () => {
      if (root.isConnected) {
        closeFilter(false);
        mobileFilters.classList.remove("is-mobile-open");
        mobileBackdrop.hidden = true;
        document.body.classList.remove("internships-mobile-lock");
        if (saveDialog.open) saveDialog.close();
      }
    });

    // ===== Локальное сохранение параметров (НЕ серверная email-подписка) =====
    const saveSummary = root.querySelector("[data-search-summary]");
    const saveFeedback = root.querySelector("[data-save-feedback]");
    root
      .querySelector("[data-save-search-open]")
      .addEventListener("click", () => {
        if (mobileFilters.classList.contains("is-mobile-open"))
          closeMobileFilters();
        saveFeedback.textContent = "";
        const chosen = KEYS.flatMap((key) => [...applied[key]]);
        saveSummary.textContent =
          [searchInput.value.trim(), ...chosen].filter(Boolean).join(" • ") ||
          "Все вакансии";
        saveDialog.showModal();
      });
    root
      .querySelector("[data-save-dialog-close]")
      .addEventListener("click", () => saveDialog.close());
    saveDialog.addEventListener("click", (event) => {
      if (event.target === saveDialog) saveDialog.close();
    });
    root.querySelector("[data-save-confirm]").addEventListener("click", () => {
      const payload = {
        q: searchInput.value,
        filters: Object.fromEntries(
          KEYS.map((key) => [key, [...applied[key]]]),
        ),
      };
      saveFeedback.textContent = writeStorage(SEARCH_STORAGE_KEY, payload)
        ? "Поиск сохранён в этом браузере."
        : "Не получилось сохранить: хранилище браузера недоступно.";
    });

    function restoreFromData(data) {
      if (!data) return;
      searchInput.value = String(data.q || "");
      KEYS.forEach((key) => {
        const values = (data.filters && data.filters[key]) || [];
        const available = new Set(
          [...dropdowns[key].querySelectorAll("[data-filter-checkbox]")].map(
            (input) => input.value,
          ),
        );
        applied[key] = new Set(values.filter((value) => available.has(value)));
        draft[key] = new Set(applied[key]);
        syncCheckboxes(key);
      });
    }

    const params = new URLSearchParams(window.location.search);
    const hasUrlFilters =
      params.has("q") || KEYS.some((key) => params.has(key));
    if (hasUrlFilters) {
      restoreFromData({
        q: params.get("q") || "",
        filters: Object.fromEntries(
          KEYS.map((key) => [key, params.getAll(key)]),
        ),
      });
    } else {
      restoreFromData(readStorage(SEARCH_STORAGE_KEY));
    }
    refreshResults(false);
  }

  document.addEventListener("turbo:load", initInternshipsPage);
  document.addEventListener("DOMContentLoaded", initInternshipsPage);
  if (document.readyState !== "loading") initInternshipsPage();
})();
