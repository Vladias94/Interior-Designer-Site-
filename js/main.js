// Swiper
const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function (currentClass, totalClass) {
            return ""; // Скрываем встроенную пагинацию
        },
    },

    // Эффект анимации
    effect: "slide", // Используем стандартный эффект слайда
    speed: 800, // Скорость анимации в миллисекундах (чем больше значение, тем медленнее переход)
});

// Обновляем внешнюю пагинацию
swiper.on("slideChange", function () {
    const currentSlide = swiper.realIndex + 1;
    const totalSlides = swiper.slides.length - 2;
    document.querySelector(".swiper-pagination-current").textContent =
        currentSlide;
    document.querySelector(".swiper-pagination-total").textContent =
        totalSlides;
});

const totalSlides = swiper.slides.length - 2;
document.querySelector(".swiper-pagination-total").textContent = totalSlides;

// Menu

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const menuClose = document.querySelector(".menu-close");
const menuLinks = document.querySelectorAll(".menu a");

// Открытие меню
menuToggle.addEventListener("click", () => {
    menu.classList.add("open");
    document.body.style.overflow = "hidden";
});

menuClose.addEventListener("click", () => {
    menu.classList.remove("open");
    document.body.style.overflow = "";
});

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove("open");
        document.body.style.overflow = "";
    }
});

menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        menu.classList.remove("open");
        document.body.style.overflow = "";
    });
});

// Accordeon

document.querySelectorAll(".project-details").forEach((project) => {
    // При наведении добавляем классы "hovered", "show-popup", "summary-describe"
    project.addEventListener("mouseenter", () => {
        project.classList.add("hovered");

        const popup = project.querySelector(".summary-popup");
        if (popup) {
            popup.classList.add("show-popup");
        }

        const summaryDescribe = project.querySelector(".summary-describe");
        if (summaryDescribe) {
            summaryDescribe.classList.add("show-popup"); // Добавляем класс summary-describe
        }
    });

    // При уходе с элемента убираем классы "hovered", "show-popup", "summary-describe"
    project.addEventListener("mouseleave", () => {
        project.classList.remove("hovered");

        const popup = project.querySelector(".summary-popup");
        if (popup) {
            popup.classList.remove("show-popup");
        }

        const summaryDescribe = project.querySelector(".summary-describe");
        if (summaryDescribe) {
            summaryDescribe.classList.remove("show-popup"); // Убираем класс summary-describe
        }
    });
});

// Modals

const openModalButtons = document.querySelectorAll(".btn-serv-modal");
const closeButtons = document.querySelectorAll(".close-btn");

let modalOverlay = document.createElement("div");
modalOverlay.classList.add("modal-overlay");
document.body.appendChild(modalOverlay);

let activeModal = null; // Переменная для хранения активного модального окна

openModalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        const target = event.target.closest("[data-modal]");
        if (target) {
            const modalClass = target.getAttribute("data-modal");
            activeModal = document.querySelector(`.${modalClass}`);
            if (activeModal) {
                activeModal.classList.add("active-modal");
                modalOverlay.style.display = "block";
            }
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        closeModal();
    });
});

// Закрытие при клике на затемненный фон
modalOverlay.addEventListener("click", function () {
    closeModal();
});

// Функция закрытия модального окна
function closeModal() {
    if (activeModal) {
        activeModal.classList.remove("active-modal");
        modalOverlay.style.display = "none";
        activeModal = null;
    }
}

// Slider 2

document.addEventListener("DOMContentLoaded", function () {
    const quotes = document.querySelectorAll(".quote-wrap > div");
    const prevBtn = document.getElementById("btn-testim-prev");
    const nextBtn = document.getElementById("btn-testim-next");
    let currentIndex = 0;

    function showQuote(index) {
        quotes.forEach((quote, i) => {
            quote.classList.remove("active");
        });

        quotes[index].classList.add("active");
    }

    function nextQuote() {
        currentIndex = (currentIndex + 1) % quotes.length;
        showQuote(currentIndex);
    }

    function prevQuote() {
        currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
        showQuote(currentIndex);
    }

    nextBtn.addEventListener("click", nextQuote);
    prevBtn.addEventListener("click", prevQuote);

    showQuote(currentIndex); // Показать первый отзыв при загрузке страницы
});

// Contact Form

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".feedback");
    const inputForm = document.querySelector("#email-input");
    const btnSubmit = document.querySelector("#btn-email");
    const modal = document.getElementById("successModal");
    const closeModal = document.getElementById("close-modal");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Фикс: теперь предотвращает отправку формы

        const TOKEN = "7929844692:AAGdlCCm4gYZFGUyhTRVe6q1wMlO-Wi8nYs";
        const CHAT_ID = "-1002659519455";
        const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        // Проверяем, чтобы поле не было пустым
        if (inputForm.value.trim() === "") {
            alert("Будь ласка, введіть текст!");
            return;
        }

        let message = `Нове повідомлення: \n\n${inputForm.value}`;

        try {
            let response = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                }),
            });

            if (response.ok) {
                modal.style.display = "block"; // Показываем модалку
                inputForm.value = ""; // Очищаем поле ввода
            } else {
                alert("Помилка відправки! Спробуйте ще раз.");
            }
        } catch (error) {
            console.error("Помилка:", error);
            alert("Не вдалося відправити повідомлення!");
        }
    });

    // Закрываем модальное окно по кнопке
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Закрываем модалку при клике вне нее
    window.addEventListener("click", function (event) {
        const modal = document.getElementById("successModal");
        const modalContent = modal.querySelector(".modal-content");

        if (!modalContent.contains(event.target)) {
            modal.style.display = "none";
        }
    });
});
// Top button

document.addEventListener("DOMContentLoaded", function () {
    const toTopButton = document.querySelector(".to-top");

    toTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Показать кнопку при скролле вниз
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            toTopButton.classList.add("visible");
        } else {
            toTopButton.classList.remove("visible");
        }
    });
});

// Scroll animations

let pageFadeIn = document.querySelectorAll(".animate__animated");
const header = document.querySelector("header.header-index");

// Убираем header из pageFadeIn
pageFadeIn = [...pageFadeIn].filter((el) => el !== header);

// Удаляем анимационные классы
pageFadeIn.forEach((el) => {
    el.classList.remove(
        "animate__fadeIn",
        "animate__fadeInLeft",
        "animate__fadeInRight",
        "animate__fadeInUp",
        "animate__fadeInDown"
    );
});

// Массив направлений
const directions = [
    { selector: ".animate__animated", className: "animate__fadeIn" },
    { selector: ".animate-top", className: "animate__fadeInUp" },
    { selector: ".animate-down", className: "animate__fadeInDown" },
    { selector: ".animate-right", className: "animate__fadeInRight" },
    { selector: ".animate-left", className: "animate__fadeInLeft" },
];

// Общая функция создания Observer'а
function createObserver(className) {
    return new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                const el = entry.target;

                if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                    // Убедимся, что элемент не был анимирован
                    if (!el.classList.contains("animated-once")) {
                        el.classList.add("animate__animated", className, "animated-once");
                    }
                }
            });
        },
        {
            threshold: [0, 0.25, 0.5, 0.7, 0.9, 1],
        }
    );
}

// Применение к каждому направлению
directions.forEach(({ selector, className }) => {
    const elements = [...document.querySelectorAll(selector)].filter(
        (el) => el !== header
    );
    const observer = createObserver(className);
    elements.forEach((el) => observer.observe(el));
});
