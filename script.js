// --- 1. FUNZIONI DI UTILITÀ ---
function formattaData(isoString) {
    const opzioni = { day: 'numeric', month: 'long', year: 'numeric' };
    const data = new Date(isoString);
    return data.toLocaleDateString('it-IT', opzioni);
}

let lastScrollY = window.scrollY;
let isExiting = false;

// --- 2. GESTIONE SCROLL (HEADER, PROGRESS BAR & PULSANTI) ---
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header'); 
    const controls = document.querySelector('.header-controls');
    const logo = document.querySelector('.main-header h1');
    const scrollY = window.scrollY;

    // --- A. LOGICA RIMPICCIOLIMENTO HEADER ---
    const maxH = 120;
    const minH = 70;
    
    // Se siamo in cima (scrollY < 10), forziamo l'altezza massima
    let newHeight = (scrollY < 10) ? maxH : Math.max(minH, maxH - scrollY);

    if (header) {
        header.style.height = newHeight + 'px';
        // Aggiungiamo 'shrink' solo dopo i primi 10px di scroll
        if (scrollY > 10) header.classList.add('shrink');
        else header.classList.remove('shrink');
    }

    if (controls) controls.style.height = newHeight + 'px';
    
    if (logo) {
        const maxFont = 2.5;
        const minFont = 1.8;
        // Riduce il font in base allo scroll
        let newFont = Math.max(minFont, maxFont - (scrollY * (maxFont - minFont) / 80));
        logo.style.fontSize = newFont + 'rem';
    }

    if (backToTop) {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

    handleStickyTitle();

// --- B. LOGICA NASCONDERE ELEMENTI ---
    const shareBtn = document.getElementById('shareMain');
    const readingBtn = document.getElementById('readingFloat');
    const backBtn = document.getElementById('backToTop');
    const trigger = document.querySelector(".trigger");
    const shareOptions = document.getElementById('shareOptions');

    // 1. LOGICA BACK TO TOP (Sempre attiva: PC e Mobile)
    // Questa parte deve stare FUORI dal controllo window.innerWidth
    if (backBtn) {
        if (scrollY > 400) {
            backBtn.style.setProperty('transform', 'translateX(0)', 'important');
            backBtn.style.setProperty('opacity', '1', 'important');
            backBtn.style.setProperty('pointer-events', 'auto', 'important');
        } else {
            backBtn.style.setProperty('transform', 'translateX(100px)', 'important');
            backBtn.style.setProperty('opacity', '0', 'important');
            backBtn.style.setProperty('pointer-events', 'none', 'important');
        }
    }

    // 2. LOGICA SOLO MOBILE (Header e altri pulsanti)
    if (window.innerWidth <= 768) {
        if (scrollY <= 10) {
            header.classList.remove('header-hidden');
            [shareBtn, readingBtn].forEach(el => {
                if (el) {
                    el.style.setProperty('transform', 'translateX(0)', 'important');
                    el.style.setProperty('opacity', '1', 'important');
                    el.style.setProperty('pointer-events', 'auto', 'important');
                }
            });
            if (trigger) {
                trigger.style.setProperty('transform', 'translateY(-50%) translateX(0)', 'important');
                trigger.style.setProperty('opacity', '1', 'important');
            }
        } else if (scrollY > lastScrollY && scrollY > 150) {
            // SCROLL DOWN: Nascondi tutto (tranne backBtn gestito sopra)
            header.classList.add('header-hidden');
            if (shareOptions) shareOptions.classList.remove('active');
            if (shareBtn) shareBtn.classList.remove('active');

            [shareBtn, readingBtn].forEach(btn => {
                if(btn) {
                    btn.style.setProperty('transform', 'translateX(100px)', 'important');
                    btn.style.setProperty('opacity', '0', 'important');
                    btn.style.setProperty('pointer-events', 'none', 'important');
                }
            });
            if(trigger) {
                trigger.style.setProperty('transform', 'translateY(-50%) translateX(35px)', 'important');
                trigger.style.setProperty('opacity', '0.6', 'important');
            }
        } else if (scrollY < lastScrollY) {
            // SCROLL UP: Mostra tutto
            header.classList.remove('header-hidden');
            [shareBtn, readingBtn].forEach(btn => {
                if(btn) {
                    btn.style.setProperty('transform', 'translateX(0)', 'important');
                    btn.style.setProperty('opacity', '1', 'important');
                    btn.style.setProperty('pointer-events', 'auto', 'important');
                }
            });
            if(trigger) {
                trigger.style.setProperty('transform', 'translateY(-50%) translateX(0)', 'important');
                trigger.style.setProperty('opacity', '1', 'important');
            }
        }
    }
    
    lastScrollY = scrollY;
    if (typeof moveProgressBar === "function") moveProgressBar();

 function handleStickyTitle() {
    // Solo per Desktop
    if (window.innerWidth > 768) {
        const mainTitle = document.getElementById('main-title');
        const stickyContainer = document.getElementById('header-sticky-title');
        const stickyText = document.querySelector('.sticky-title-text');

        if (!mainTitle || !stickyContainer || !stickyText) return;

        // Sincronizziamo il testo: se il titolo principale è stato caricato, 
        // lo copiamo nello span dell'header
        if (mainTitle.innerText !== "Caricamento..." && stickyText.innerText !== mainTitle.innerText) {
            stickyText.innerText = mainTitle.innerText;
        }

        // Calcoliamo la posizione del titolo originale rispetto alla cima della pagina
        const titleRect = mainTitle.getBoundingClientRect();
        
        // Se il titolo originale è uscito dalla vista (sopra l'header)
        if (titleRect.top < 20) { 
            stickyContainer.classList.add('visible');
        } else {
            stickyContainer.classList.remove('visible');
        }
    }
}
});

// --- 3. LOGICA PRINCIPALE (DOM CONTENT LOADED) ---
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add('loaded');
    document.body.style.opacity = "1";

    // --- FORZA VISIBILITÀ INIZIALE TRIGGER E PULSANTI SU MOBILE ---
    if (window.innerWidth <= 768) {
        const trigger = document.querySelector(".trigger");
        const shareBtn = document.getElementById('shareMain');
        const readingBtn = document.getElementById('readingFloat');

        if (trigger) {
            trigger.style.setProperty('transform', 'translateY(-50%) translateX(0)', 'important');
            trigger.style.setProperty('opacity', '1', 'important');
        }
        if (shareBtn) {
            shareBtn.style.setProperty('transform', 'translateX(0)', 'important');
            shareBtn.style.setProperty('opacity', '1', 'important');
        }
        if (readingBtn) {
            readingBtn.style.setProperty('transform', 'translateX(0)', 'important');
            readingBtn.style.setProperty('opacity', '1', 'important');
        }
    }

        const mainElements = document.querySelectorAll('.container, .full-article, .article-body-wrapper, #shareMain, #readingFloat');    setTimeout(() => {
        mainElements.forEach(el => el.classList.add('fade-in-visible'));
    }, 50);

    const sideMenu = document.getElementById("side-menu");
    const hamburger = document.getElementById("hamburger");
    const trigger = document.querySelector(".trigger");

    // Funzione universale per chiudere il menu share (Aggiunta per tua richiesta)
    const chiudiShare = () => {
        const shareOptions = document.getElementById('shareOptions');
        const shareMain = document.getElementById('shareMain');
        if (shareOptions) shareOptions.classList.remove('active');
        if (shareMain) {
            shareMain.classList.remove('active');
            const icon = shareMain.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-share-nodes';
        }
    };

    // A. GESTIONE MENU (PC & MOBILE)
    const toggleMenu = (e) => {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation(); 
        }
        if (!sideMenu) return;

        sideMenu.classList.toggle('active');
        if (hamburger) hamburger.classList.toggle('open');

        if (trigger) {
            const icon = trigger.querySelector('i');
            if (sideMenu.classList.contains('active')) {
                if (icon) icon.className = 'fa-solid fa-xmark';
                trigger.style.right = '280px';
            } else {
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
                trigger.style.right = '0';
            }
        }
    };

    if (hamburger) hamburger.onclick = toggleMenu;
    if (trigger) trigger.onclick = toggleMenu;

    document.addEventListener('click', (e) => {
        if (sideMenu?.classList.contains('active')) {
            if (!sideMenu.contains(e.target) && !hamburger?.contains(e.target) && !trigger?.contains(e.target)) {
                toggleMenu();
            }
        }
    });

    // B. LOGICA ACTIVE LINK
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.side-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.replace('../', '') === currentPath) link.classList.add('active');
    });

    // C. CHIAMATA ARTICOLI CORRELATI
    const currentSlug = currentPath.replace('.html', '');
    if (currentSlug && !['index', 'articoli', ''].includes(currentSlug)) {
        caricaArticoliCorrelati(currentSlug);
    }

    // D. ARCHIVIO E RICERCA
    const gridHome = document.querySelector(".posts-grid");
    const listArchivio = document.querySelector(".posts-list");
    const searchInput = document.getElementById("search-input");
    
    if (typeof ARCHIVIO_ARTICOLI !== 'undefined') {
        const articoliOrdinati = [...ARCHIVIO_ARTICOLI].sort((a, b) => new Date(b.dataISO) - new Date(a.dataISO));
        if (gridHome) renderArticoli(articoliOrdinati.slice(0, 3), gridHome, "home");
        if (listArchivio) {
            const urlParams = new URLSearchParams(window.location.search);
            const tagFiltro = urlParams.get('tag');
            if (tagFiltro) {
                renderArticoli(articoliOrdinati.filter(art => art.tags.map(t => t.toLowerCase()).includes(tagFiltro.toLowerCase())), listArchivio, "archivio", tagFiltro);
            } else {
                renderArticoli(articoliOrdinati, listArchivio, "archivio");
            }
            if (searchInput) {
                searchInput.addEventListener("input", (e) => {
                    const term = e.target.value.toLowerCase().trim();
                    const filtrati = articoliOrdinati.filter(art => 
                        art.titolo.toLowerCase().includes(term) || 
                        art.anteprima.toLowerCase().includes(term) || 
                        art.tags.some(t => t.toLowerCase().includes(term))
                    );
                    renderArticoli(filtrati, listArchivio, "archivio");
                });
            }
        }
    }

    // --- E. TRANSIZIONE USCITA (PULITA E COMPLETA) ---
    document.addEventListener('click', function(e) {
        const target = e.target;

        // 1. Escludiamo i click che non devono far cambiare pagina
        if (
            target.closest('.trigger') || 
            target.closest('#hamburger') || 
            target.closest('#shareMain') || 
            target.closest('#shareOptions') || 
            target.closest('.share-options') ||
            target.closest('#shareIG')
        ) {
            return; 
        }
        
        if (target.closest('#side-menu') && !target.closest('a')) return;

        const isTag = target.classList.contains('tag');
        const link = target.closest('a');

        if (!link && !isTag) return;

        if (link) {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || link.target === '_blank' || href.includes('api.whatsapp') || href.includes('t.me')) return;
        }

        e.preventDefault();

        // 2. Chiudiamo il menu se è aperto
        if (sideMenu && sideMenu.classList.contains('active')) {
            sideMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('open');
            if (trigger) {
                const icon = trigger.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
                trigger.style.right = '0';
            }
        }

        // 3. Calcoliamo la destinazione
        const isInsideArticoli = window.location.pathname.includes('/articoli/');
        let destinazione;
        if (isTag) {
            const percorsoBase = isInsideArticoli ? '../articoli.html' : 'articoli.html';
            destinazione = `${percorsoBase}?tag=${encodeURIComponent(target.innerText.trim())}`;
        } else {
            destinazione = link.getAttribute('href');
        }
        

        // 4. ANIMAZIONE DI USCITA (Qui aggiungiamo i pulsanti!)
        const header = document.querySelector('.main-header');
        if (header) {
            header.style.height = ''; 
            header.classList.remove('shrink');
            header.classList.add('exit-active');
        }

        const pulsanti = document.querySelectorAll('#shareMain, #readingFloat, #backToTop, .trigger');

        pulsanti.forEach(btn => {
            if (btn) {
                // PRIMA: Resettiamo gli stili inline messi dallo scroll/click precedente
                // Questo permette alla classe CSS "exit-active-float" di funzionare SEMPRE
                btn.style.cssText = ""; 
                
                // POI: Aggiungiamo la classe di uscita
                btn.classList.add('exit-active-float');
            }
        });

        // Nascondiamo il resto dei contenuti
        document.querySelectorAll('.container, .full-article, footer, .archive, .related-title, #related-posts-container')
            .forEach(el => el.classList.add('exit-active'));

        if (document.body.classList.contains('reading-dark-mode')) {
            document.body.classList.remove('reading-dark-mode');
        }

        // Cambio pagina dopo 500ms
        setTimeout(() => { window.location.href = destinazione; }, 500);
    });

    // F. PULSANTI (BACK TO TOP, LETTURA, SHARE)
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.style.display = "flex";
                setTimeout(() => backToTop.classList.add("visible"), 10);
                if (window.innerWidth <= 768) {
            backToTop.style.setProperty('transform', 'translateX(0)', 'important');
            backToTop.style.setProperty('opacity', '1', 'important');
        }
            } else {
        // SOTTO I 400px: Pulizia totale
        backToTop.classList.remove("visible");
        if (window.innerWidth <= 768) {
            backToTop.style.setProperty('transform', 'translateX(100px)', 'important');
            backToTop.style.setProperty('opacity', '0', 'important');
        }
        // Nascondiamo il display dopo la transizione (0.3s)
        setTimeout(() => {
            if (window.scrollY <= 400) backToTop.style.display = "none";
        }, 300);

        
    }
});
backToTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // FORZA SCOMPARSA IMMEDIATA SU MOBILE
    backToTop.classList.remove("visible");
    setTimeout(() => {
        backToTop.style.setProperty('display', 'none', 'important');
        backToTop.style.setProperty('opacity', '0', 'important');
        backToTop.style.setProperty('transform', 'translateX(100px)', 'important');
    }, 100); 
};    }

    const floatMoon = document.getElementById("readingFloat");
    if (floatMoon) {
        floatMoon.onclick = function(e) {
            if (e) e.stopPropagation();
            const isDark = document.body.classList.toggle("reading-dark-mode");
            floatMoon.innerHTML = isDark ? '<i class="fa-solid fa-newspaper"></i>' : '<i class="fa-solid fa-eye"></i>';
        };
    }

    const shareMain = document.getElementById('shareMain');
    const shareOptions = document.getElementById('shareOptions');
    if (shareMain && shareOptions) {
        shareMain.onclick = (e) => {
            e.preventDefault(); e.stopPropagation();
            shareOptions.classList.toggle('active');
            shareMain.classList.toggle('active');
            const icon = shareMain.querySelector('i');
            if (icon) icon.className = shareOptions.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-share-nodes';
        };
        document.addEventListener('click', (e) => {
            if (!shareMain.contains(e.target) && !shareOptions.contains(e.target)) {
                chiudiShare();
            }
        });
    }

    const copyLinkBtn = document.getElementById('copyLink');
    if (copyLinkBtn) {
        copyLinkBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation(); 

            const textToCopy = window.location.href;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    mostraNotificaCopia();
                    chiudiShare(); // <--- CHIUSURA AUTOMATICA
                }).catch(err => {
                    metodoFallbackCopia(textToCopy);
                });
            } else {
                metodoFallbackCopia(textToCopy);
            }
        };
    }

    function metodoFallbackCopia(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; 
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            mostraNotificaCopia();
            chiudiShare(); // <--- CHIUSURA AUTOMATICA
        } catch (err) {
            console.error('Impossibile copiare', err);
        }
        document.body.removeChild(textArea);
    }

    function mostraNotificaCopia() {
    const nav = document.getElementById('copy-notification');
    if (nav) {
        nav.innerText = "Link copiato negli appunti! 🔗"; // Testo originale
        nav.classList.add('show');
        setTimeout(() => nav.classList.remove('show'), 2000);
    }
}
    const wa = document.getElementById('shareWA');
    const tg = document.getElementById('shareTG');
    const fb = document.getElementById('shareFB');
    const ig = document.getElementById('shareIG');
    const shareX = document.getElementById('shareX');

    
    if (wa) {
        wa.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + " " + window.location.href)}`;
        wa.target = "_blank";
        wa.onclick = () => setTimeout(chiudiShare, 500); // <--- CHIUSURA AUTOMATICA
    }
    if (tg) {
        tg.href = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`;
        tg.target = "_blank";
        tg.onclick = () => setTimeout(chiudiShare, 500); // <--- CHIUSURA AUTOMATICA
    }
    if (fb) {
        fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        fb.target = "_blank";
        fb.onclick = () => setTimeout(chiudiShare, 500); // <--- CHIUSURA AUTOMATICA
    }
    if (shareX) {
    shareX.addEventListener('click', function(e) {
        e.preventDefault();
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    });
}
    // --- GESTIONE INSTAGRAM (COPIA + APRI) ---
    if (ig) {
        ig.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            const linkDaCopiare = window.location.href;

            // Funzione per aprire Instagram dopo la copia
            const apriInstagram = () => {
                setTimeout(() => {
                   
                    // Fallback: se dopo mezzo secondo non si è aperta l'app, apre il sito
                    setTimeout(() => {
                        window.open('https://www.instagram.com/', '_blank');
                    }, 500);
                    
                    chiudiShare();
                }, 1200); // Tempo per leggere la notifica
            };

            // 1. Esegui la Copia
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(linkDaCopiare).then(() => {
                    mostraNotificaIG();
                    apriInstagram();
                });
            } else {
                // Fallback per browser datati
                const textArea = document.createElement("textarea");
                textArea.value = linkDaCopiare;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                mostraNotificaIG();
                apriInstagram();
            }
        };
    }

    // Funzione per il messaggio specifico di Instagram
    function mostraNotificaIG() {
    const nav = document.getElementById('copy-notification');
    if (nav) {
        nav.innerText = "Link copiato! Incollalo nelle tue Storie 📸"; // Testo Instagram
        nav.classList.add('show');
        setTimeout(() => nav.classList.remove('show'), 2500);
    }
}

    // --- GESTIONE MOSTRA/NASCONDI AL CLICK (MOBILE) ---
    if (window.innerWidth <= 768) {
        document.addEventListener('click', (e) => {
            // 1. PROTEZIONE: Se clicchi sui pulsanti o sulle opzioni share, ESCI dalla funzione.
            // Non deve nascondere nulla se l'utente sta interagendo con i comandi.
            if (
                e.target.closest('#readingFloat') || 
                e.target.closest('#shareMain') || 
                e.target.closest('.share-options') || 
                e.target.closest('.trigger') ||
                e.target.closest('button') ||
                e.target.closest('a')
            ) {
                return; 
            }

            const header = document.querySelector('.main-header');
            const shareBtn = document.getElementById('shareMain');
            const readingBtn = document.getElementById('readingFloat');
            const backBtn = document.getElementById('backToTop');
            const trigger = document.querySelector(".trigger");

            if (!header) return;
            const isHidden = header.classList.contains('header-hidden');

            if (isHidden) {
                // --- MOSTRA TUTTO ---
                header.classList.remove('header-hidden');
                
                if(shareBtn) {
                    shareBtn.style.setProperty('transform', 'translateX(0)', 'important');
                    shareBtn.style.setProperty('opacity', '1', 'important');
                    shareBtn.style.setProperty('pointer-events', 'auto', 'important');
                }
                if(readingBtn) {
                    readingBtn.style.setProperty('transform', 'translateX(0)', 'important');
                    readingBtn.style.setProperty('opacity', '1', 'important');
                    readingBtn.style.setProperty('pointer-events', 'auto', 'important');
                }
                if(backBtn && window.scrollY > 400) {
                    backBtn.style.setProperty('transform', 'translateX(0)', 'important');
                    backBtn.style.setProperty('opacity', '1', 'important');
                }
                if(trigger) {
                    trigger.style.setProperty('transform', 'translateY(-50%) translateX(0)', 'important');
                    trigger.style.setProperty('opacity', '1', 'important');
                }
            } else {
                // --- NASCONDI TUTTO ---
                header.classList.add('header-hidden');
                
                [shareBtn, readingBtn, backBtn].forEach(btn => {
                    if(btn) {
                        btn.style.setProperty('transform', 'translateX(100px)', 'important');
                        btn.style.setProperty('opacity', '0', 'important');
                        btn.style.setProperty('pointer-events', 'none', 'important');
                    }
                });
                
                if(trigger) {
                    trigger.style.setProperty('transform', 'translateY(-50%) translateX(35px)', 'important');
                    trigger.style.setProperty('opacity', '0.6', 'important');
                }
            }
        });
    }
    // --- SPOSTAMENTO DATA IN FONDO (SOLO MOBILE) ---
    if (window.innerWidth <= 768) {
        // Cerchiamo la data nell'header (quella sotto il sottotitolo)
        const dateElement = document.querySelector('.brand .date');
        // Cerchiamo la fine del testo dell'articolo
        const articleBody = document.querySelector('.article-body');
        
        if (dateElement && articleBody) {
            // La spostiamo fisicamente dopo il corpo del testo
            articleBody.after(dateElement);
            // Le diamo una classe per lo stile CSS
            dateElement.classList.add('date-bottom');
        }
    }
});

// --- 4. FUNZIONI DI RENDER E CORRELATI ---
function renderArticoli(lista, contenitore, tipo, tagAttivo = null) {
    if (!contenitore) return;
    contenitore.innerHTML = ''; 
    
    const archiveTitle = document.querySelector('.archive h2');
    if (archiveTitle && tipo === "archivio") {
        archiveTitle.classList.add('reveal'); 
        archiveTitle.innerHTML = tagAttivo 
            ? `Articoli su: <span style="color: #af9168;">${tagAttivo}</span> <a href="articoli.html" style="font-size: 0.8rem; margin-left: 15px; text-decoration: underline; color: #888; font-weight: normal; cursor: pointer;">Mostra tutti</a>` 
            : 'Archivio Articoli';
    }

    if (lista.length === 0) {
        contenitore.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">Nessun articolo trovato.</p>`;
        return;
    }

    contenitore.innerHTML = lista.map((art) => {
        const isInsideArticoli = window.location.pathname.includes('/articoli/');
        const linkFinale = isInsideArticoli ? `${art.slug}.html` : `articoli/${art.slug}.html`;
        const imgPath = isInsideArticoli ? `../immagini/${art.immagine}` : `immagini/${art.immagine}`;
        
        // CORREZIONE 1: Definiamo la classe del wrapper immagine
        const imgWrapperClass = tipo === 'home' ? 'post-image-home' : 'post-image-archive';
        
        // I tag rimangono nel loro container
const tagsHTML = `<div class="tags-container">${art.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`;
        return `
            <div class="${tipo === 'home' ? 'card-container' : 'post-item-wrapper'} reveal">
                <article class="${tipo === 'home' ? 'post-card' : 'post-item'}">
                    
                    <div class="post-image ${imgWrapperClass} skeleton">
                        <img src="${imgPath}" alt="${art.titolo}" onload="this.parentElement.classList.remove('skeleton'); this.style.opacity='1';">
                    </div>

                    <div class="${tipo === 'home' ? 'post-content' : 'item-content'}">
                        <p class="date">${formattaData(art.dataISO)}</p>
                        <h3>${art.titolo}</h3>
                        <p class="preview">${art.anteprima}</p>
                        ${tagsHTML}
                        <a href="${linkFinale}" class="read-more"></a>
                    </div>
                </article>
            </div>`;
    }).join('');

    inizializzaReveal();
}
function inizializzaReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.03 });
    reveals.forEach(el => observer.observe(el));
}

function caricaArticoliCorrelati(slugCorrente) {
    const container = document.getElementById('related-posts-container');
    if (!container || typeof ARCHIVIO_ARTICOLI === 'undefined') return;
    const articoloAttuale = ARCHIVIO_ARTICOLI.find(a => a.slug === slugCorrente);
    if (!articoloAttuale) return;
    const isInsideArticoli = window.location.pathname.includes('/articoli/');
    const correlati = ARCHIVIO_ARTICOLI
        .filter(a => a.slug !== slugCorrente && a.tags.some(tag => articoloAttuale.tags.includes(tag)))
        .slice(0, 3);
    container.innerHTML = correlati.map(post => {
        const destinazione = isInsideArticoli ? post.slug + ".html" : "articoli/" + post.slug + ".html";
        const imgPath = (isInsideArticoli ? "../immagini/" : "immagini/") + post.immagine;
        return `
        <article class="post-card related-mini">
            <a href="${destinazione}" class="read-more"></a> 
            <div class="related-img-mini skeleton">
                <img src="${imgPath}" alt="${post.titolo}" onload="this.parentElement.classList.remove('skeleton'); this.style.opacity='1';">
            </div>
            <div class="related-info-mini"><h3 class="related-title-mini">${post.titolo}</h3></div>
        </article>`;
    }).join('');
}

function moveProgressBar() {
    const bar = document.getElementById("myBar");
    if (!bar) return; 
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (winScroll / height * 100) + "%";
}

// --- GESTIONE COOKIE ISTANTANEA ---
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    if (!banner || !acceptBtn) return;

    // Se l'utente NON ha mai accettato, mostriamo il banner immediatamente
    if (!localStorage.getItem("cookieConsenso")) {
        // Un millisecondo di ritardo solo per far scattare l'animazione fluida del CSS
        setTimeout(() => {
            banner.classList.add("show");
        }, 100);
    } else {
        // Se ha già accettato, lo rimuoviamo proprio per evitare che ingombri
        banner.style.display = "none";
    }

    // Salvataggio della scelta
    acceptBtn.addEventListener("click", function() {
        localStorage.setItem("cookieConsenso", "accettato");
        banner.classList.remove("show");
        // Dopo che è scivolato giù, lo nascondiamo del tutto
        setTimeout(() => {
            banner.style.display = "none";
        }, 500);
    });
});

// --- COORDINAZIONE FADE-OUT ---
// --- COORDINAZIONE FADE-OUT AGGIORNATA ---
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.logo-link, .side-menu a, .read-more, .btn-back-home, .btn-home-tiny, .next-btn');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && href !== '#' && !href.startsWith('http') && !this.hasAttribute('target')) {
                e.preventDefault();
                
                isExiting = true; 

                const header = document.querySelector('.main-header');
                const controls = document.querySelector('.header-controls');
                const stickyTitle = document.querySelector('.sticky-title-container');
                const banner = document.getElementById("cookie-banner");
                // AGGIUNTO: Selezioniamo il box del prossimo articolo
                const nextArticle = document.getElementById('next-article-smart');

                if (header && controls) {
                    const currentHeight = header.offsetHeight;
                    header.style.height = currentHeight + 'px';
                    controls.style.height = currentHeight + 'px';
                }

                if (stickyTitle) {
                    stickyTitle.style.opacity = '0';
                    stickyTitle.classList.remove('visible');
                }

                if (banner && banner.classList.contains('show')) {
                    banner.classList.remove('show'); 
                }

                // --- NUOVA LOGICA COORDINATA PER IL PROSSIMO ARTICOLO ---
                if (nextArticle && nextArticle.classList.contains('show')) {
                    // Rimuovendo 'show', il CSS farà scattare la transizione inversa
                    nextArticle.classList.remove('show');
                    // Aggiungiamo un'opacità per un effetto ancora più morbido
                    nextArticle.style.opacity = '0';
                    nextArticle.style.pointerEvents = 'none'; // Evita click accidentali durante l'uscita
                }

                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
});

// Creazione dinamica di un tooltip per le note
// Gestione Tooltip Note (PC & Mobile)
let bloccoNoteAttivo = false;

document.querySelectorAll('.nota-link a').forEach(link => {
    link.addEventListener('click', function(e) {
        bloccoNoteAttivo = true;
        setTimeout(() => {
            bloccoNoteAttivo = false;
        }, 2000);
        const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        
        if (isTouch) {
            // Se il tooltip non esiste già, blocca il salto e mostralo
            if (!document.querySelector('.nota-tooltip')) {
                e.preventDefault(); // Impedisce di saltare subito alla nota
                mostraTooltip(this);
            }
            // Se esiste già, il comportamento di default (il salto) avverrà al prossimo tocco
        }
    });

    // Per PC manteniamo l'hover classico
    link.addEventListener('mouseenter', function() {
        if (!('ontouchstart' in window)) mostraTooltip(this);
    });

    link.addEventListener('mouseleave', function() {
        if (!('ontouchstart' in window)) rimuoviTooltip();
    });
});

function mostraTooltip(elemento) {
    rimuoviTooltip(); // Pulizia preventiva
    
    const notaId = elemento.getAttribute('href');
    const notaTarget = document.querySelector(notaId);
    if (!notaTarget) return;

    // Prendiamo il testo della nota e puliamo la freccina di ritorno
    const testoNota = notaTarget.innerText.replace('↩', '');
    
    let tooltip = document.createElement('div');
    tooltip.className = 'nota-tooltip';
    
    // Inseriamo solo il testo, senza link secondari
    tooltip.innerText = testoNota;
    
    document.body.appendChild(tooltip);
    
    // Posizionamento
    const rect = elemento.getBoundingClientRect();
    tooltip.style.top = (rect.top + window.scrollY - (tooltip.offsetHeight + 15)) + 'px';
    tooltip.style.left = Math.max(10, Math.min(window.innerWidth - 290, rect.left)) + 'px';

    // 1. CHIUSURA SE TOCCHI FUORI
    setTimeout(() => {
        const chiudiTooltipFuori = (e) => {
            if (!tooltip.contains(e.target) && e.target !== elemento) {
                rimuoviTooltip();
                window.removeEventListener('click', chiudiTooltipFuori);
            }
        };
        window.addEventListener('click', chiudiTooltipFuori);
    }, 100);

    // 2. SALTO ALLA NOTA SE TOCCHI QUALSIASI PARTE DEL FUMETTO
    tooltip.style.cursor = 'pointer'; // Fa capire che è cliccabile anche su PC
    tooltip.addEventListener('click', () => {
        window.location.hash = notaId;
        rimuoviTooltip();
    });
}

function rimuoviTooltip() {
    const t = document.querySelector('.nota-tooltip');
    if (t) t.remove();
}

document.addEventListener('DOMContentLoaded', function() {
    const biblioToggle = document.getElementById('biblioToggle');
    const biblioContent = document.getElementById('biblioContent');

    if (biblioToggle && biblioContent) {
        biblioToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (biblioContent.classList.contains('show')) {
                // CHIUSURA FLUIDA:
                // Prima impostiamo l'altezza attuale (per dare un punto di partenza)
                biblioContent.style.maxHeight = biblioContent.scrollHeight + "px";
                
                // Usiamo un piccolo timeout per permettere al browser di registrare il cambio
                // e poi portiamo a 0
                setTimeout(() => {
                    biblioContent.style.maxHeight = "0px";
                    biblioContent.classList.remove('show');
                }, 10);
            } else {
                // APERTURA FLUIDA:
                biblioContent.classList.add('show');
                biblioContent.style.maxHeight = biblioContent.scrollHeight + "px";
            }
        });
    }
});

// Rende il titolo dell'header cliccabile per tornare su
// ==========================================
// FUNZIONI EXTRA: CITAZIONI, SCROLL E GLOSSARIO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CLICK SUL TITOLO STICKY (Torna su)
    const stickyTitle = document.getElementById('header-sticky-title');
    if (stickyTitle) {
        stickyTitle.style.cursor = 'pointer';
        stickyTitle.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (!document.querySelector('.full-article')) {
        return;
    }

    // 2. CREAZIONE ELEMENTI (Citazione e Glossario)
    const sharer = document.createElement('button');
    sharer.id = 'quote-sharer';
    sharer.innerHTML = '<span class="sharer-text"><i class="fa-solid fa-copy"></i> Copia citazione</span>';
    document.body.appendChild(sharer);

    const tooltip = document.createElement('div');
    tooltip.id = 'glossary-tooltip';
    document.body.appendChild(tooltip);

    // 3. DATABASE DEL GLOSSARIO
    const GLOSSARIO = {
        "neoconfucianesimo": "Revival culturale del Confucinesimo, fondamentale per la filosofia cinese dal XII-XIII secolo fino praticamente alla caduta dell'Impero cinese. Propone una visione razionale del mondo basata su principi morali e cosmologici che influenzano profondamente la società, la politica e la cultura. L'ordine, la gerarchia e la burocrazia sono alcuni degli accenti fondamentali del neoconfucianesimo.",
        "escatologia": "Dal greco 'éskhatos', 'ultimo': pensiero orientato alla fine dei tempi, alla destinazione ultima dell'uomo o del mondo, e, di conseguenza, alla sua possibilità di salvezza.",
        "shogunato": "Sistema politico con a capo un signore militare (<i>shōgun</i> 将軍) che detiene il potere effettivo, mentre l'imperatore rimane come figura simbolica.",
        "essoterico": "Dottrina o insegnameto accessibile, destinato a un pubblico ampio, di facile comprensione e interpretazione.",
        "esoterico": "Dottrina o insegnamento riservato a pochi iniziati, spesso caratterizzato da simbolismo complesso e significati nascosti, accessibile solo attraverso un percorso di apprendimento specifico.",
        "sincretismo": "Fusione di diversi insegnamenti religiosi, convivenza di più elementi differenti provenienti da diverse tradizioni di pensiero.",
        "mandala": "Cosmogramma, diagramma cosmico che rappresenta una geografia o una cartografia sacra. Raffigura divinità di diversa natura e ordini di importanza. In diverse tradizioni buddhiste, i mandala vengono usati come strumento di supporto alla meditazione dei monaci.",
        "sei regni": "Sei realtà in cui può avvenire la rinascita: tre positivi (degli dèi, dei sem-dèi, degli esseri umani) e tre negativi (degli animali, dei fantasmi, o un inferno). Più è positivo il regno, più è facile intraprendere un percorso di illuminazione e liberarsi dal ciclo samsarico.",
    };

    // 4. LOGICA CITAZIONE (Mouse Up)
    const handleSelection = function() {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText.length > 10) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            sharer.style.display = 'flex';
            setTimeout(() => {
                sharer.style.left = `${rect.left + (rect.width / 2) - (sharer.offsetWidth / 2)}px`;
                sharer.style.top = `${window.scrollY + rect.top - 60}px`;
                sharer.classList.add('visible');
            }, 10);
        } else {
            sharer.classList.remove('visible');
            setTimeout(() => { if(!sharer.classList.contains('visible')) sharer.style.display = 'none'; }, 300);
        }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    // 5. AZIONE DI COPIA (Formato Accademico)
    sharer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        sharer.style.width = sharer.offsetWidth + 'px'; // Anti-saltino

        const textToCopy = window.getSelection().toString().trim();
        const h1Element = document.getElementById('main-title');
        let articleTitle = (h1Element && h1Element.innerText !== "Caricamento...") ? h1Element.innerText : document.title.replace(' - Davide Tomio', '');

        const citation = `"${textToCopy}" — Davide Tomio, "${articleTitle}"`;

        navigator.clipboard.writeText(citation).then(() => {
            const textSpan = sharer.querySelector('.sharer-text');
            textSpan.style.opacity = '0';
            setTimeout(() => {
                sharer.classList.add('success');
                textSpan.innerHTML = '<i class="fa-solid fa-check"></i> Copiato!';
                textSpan.style.opacity = '1';
                setTimeout(() => {
                    sharer.classList.remove('visible');
                    setTimeout(() => {
                        sharer.style.display = 'none';
                        sharer.classList.remove('success');
                        sharer.style.width = '';
                        textSpan.innerHTML = '<i class="fa-solid fa-copy"></i> Copia citazione';
                    }, 300);
                }, 1000);
            }, 200);
        });
    });

    // 6. LOGICA GLOSSARIO (Hover sui termini)
    document.querySelectorAll('.term').forEach(termEl => {
        termEl.addEventListener('mouseenter', function() {
            const termine = this.getAttribute('data-term').toLowerCase();
            const definizione = GLOSSARIO[termine];
            if (definizione) {
                tooltip.innerHTML = `<strong>${termine}</strong>${definizione}`;
                tooltip.style.display = 'block';
                const rect = this.getBoundingClientRect();
                tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                tooltip.style.top = `${window.scrollY + rect.top - tooltip.offsetHeight - 15}px`;
                setTimeout(() => tooltip.style.opacity = '1', 10);
            }
        });

        termEl.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.style.display = 'none', 300);
        });
    });
});

// Sostituisci il vecchio riferimento con questo
const marker = document.getElementById('end-of-content-marker');
const nextBox = document.getElementById('next-article-smart');

if (nextBox && marker) {
    const observerOptions = {
        root: null,
        // Il 'rootMargin' con valore positivo in basso (es. 50px) 
        // fa scattare l'evento poco prima che il marker entri nel viewport
        rootMargin: '0px 0px 50px 0px', 
        threshold: 0 // 0 significa "appena un pixel del marker è visibile"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (bloccoNoteAttivo) {
                nextBox.classList.remove('show');
                return;
            }

            // Cambiamo la condizione: entry.isIntersecting significa che 
            // il marker è entrato nello schermo (o nella zona di margine)
            if (entry.isIntersecting) {
                if (!isExiting) {
                    nextBox.classList.add('show');
                }
            } else {
                // Se il marker esce (perché l'utente torna su), nascondiamo
                // ma solo se l'utente è effettivamente sopra il marker
                if (entry.boundingClientRect.top > 0) {
                    nextBox.classList.remove('show');
                }
            }
        });
    }, observerOptions);

    observer.observe(marker);
}

let touchStartX = 0;
let touchEndX = 0;

if (nextBox) {
    nextBox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    nextBox.addEventListener('touchmove', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;

        // Muoviamo il banner solo se il trascinamento è verso destra (> 0)
        if (diffX > 0) {
            nextBox.style.transform = `translateX(${diffX}px)`;
            nextBox.style.opacity = 1 - (diffX / 400); // Sfuma gradualmente
        }
    }, {passive: true});

    nextBox.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;

        if (diffX > 100) {
            // Se lo swipe è lungo più di 100px, chiudi definitivamente
            closeNextArticleSmart(); 
        } else {
            // Altrimenti resetta la posizione originale
            nextBox.style.transform = '';
            nextBox.style.opacity = '';
        }
    });
}

// Funzione centralizzata per chiudere il banner
function closeNextArticleSmart() {
    const nextBox = document.getElementById('next-article-smart');
    if (nextBox) {
        nextBox.classList.remove('show');
        // Rimosso: nextBox.classList.add('closed-by-user'); 
        
        // Pulizia stili per lo swipe
        setTimeout(() => {
            nextBox.style.transform = '';
            nextBox.style.opacity = '';
        }, 600);
    }
}

// Aggiorna il listener del pulsante close
if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita che scatti il click sul container
        closeNextArticleSmart();
    });
}

// Logica per chiudere il box manualmente
const closeBtn = document.getElementById('close-next');
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        const nextBox = document.getElementById('next-article-smart');
        nextBox.classList.remove('show');
        nextBox.classList.add('closed-by-user'); 
    });
}

// Funzione per caricare i dati dell'articolo precedente per data
function popolaNextArticle(currentSlug) {
    // 1. Ordiniamo l'archivio dal più recente al più vecchio
    const articoliOrdinati = [...ARCHIVIO_ARTICOLI].sort((a, b) => new Date(b.dataISO) - new Date(a.dataISO));
    
    // 2. Troviamo l'indice dell'articolo che stiamo leggendo usando lo slug
    const currentIndex = articoliOrdinati.findIndex(a => a.slug === currentSlug);
    
    // 3. L'articolo "precedente" per data è quello all'indice successivo nell'array ordinato
    // Se siamo all'ultimo (il più vecchio), ricominciamo dal primo (il più recente)
    const nextArt = articoliOrdinati[currentIndex + 1] || articoliOrdinati[0];
    
    const nextTitle = document.getElementById('next-article-title');
    const nextExcerpt = document.getElementById('next-article-excerpt');
    const nextLink = document.getElementById('next-article-link');

    if (nextArt && nextTitle && nextExcerpt && nextLink) {
    nextTitle.innerText = nextArt.titolo;
    nextExcerpt.innerText = nextArt.anteprima;
    
    const isInsideArticoli = window.location.pathname.includes('/articoli/');
    const hrefFinale = isInsideArticoli ? `${nextArt.slug}.html` : `articoli/${nextArt.slug}.html`;

    // AGGIUNTA: Rendiamo cliccabile tutto il container
    const container = document.getElementById('next-article-smart');
    if (container) {
        // Rimuoviamo eventuali link precedenti per non duplicarli
        container.style.cursor = 'pointer';
        container.onclick = (e) => {
            // Se clicca sulla X, non deve partire il link
            if (e.target.id === 'close-next' || e.target.closest('#close-next')) return;
            window.location.href = hrefFinale;
        };
    }
}
}
