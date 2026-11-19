document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-section');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const getStartedBtns = document.querySelectorAll('.btn-start-now');

    // Dynamic Image Transfer Pipeline State
    let enhancerPendingBlob = null;
    let audioCtx = null;

    // SPA Routing Logic
    function navigateTo(pageId) {
        // Update active states in sections
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Update active states in nav links
        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update URL hash
        window.location.hash = pageId;
        
        // Scroll back to top
        window.scrollTo(0, 0);
        
        // Close mobile menu if open
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Add event listeners to all navigation triggers
    document.querySelectorAll('[data-page]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const targetId = trigger.getAttribute('data-page');
            const toolId = trigger.getAttribute('data-tool');

            if (targetId) {
                e.preventDefault();
                navigateTo(targetId);

                // If navigating to dashboard with a specific tool requested
                if (targetId === 'dashboard' && toolId) {
                    const toolBtn = document.querySelector(`.tool-nav-btn[data-target="${toolId}"]`);
                    if (toolBtn) {
                        // Small delay to ensure dashboard is active before clicking tool
                        setTimeout(() => toolBtn.click(), 50);
                    }
                }
            }
        });
    });

    // Handle "Get Started" buttons pointing to Sign Up
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo('signup');
        });
    });

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // THEME TOGGLE LOGIC
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('maareeye-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        
        localStorage.setItem('maareeye-theme', isLight ? 'light' : 'dark');
        
        // Toggle icons
        if (isLight) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    });

    // TRANSLATIONS DICTIONARY
    const translations = {
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_pricing: "Pricing",
            nav_login: "Login",
            nav_signup: "Sign Up",
            hero_badge: "Meet your new AI Toolkit",
            hero_title: 'Smart File & <br><span class="gradient-text">AI Tools</span>',
            hero_subtitle: "Convert files, remove backgrounds, and scan documents with the power of AI — all in one fast platform.",
            btn_get_started: "Get Started Free",
            btn_learn_more: "Learn More",
            feat_converter_title: "File Converter",
            feat_converter_desc: "Instantly convert between formats with zero quality loss.",
            feat_remover_title: "AI Background Remover",
            feat_remover_desc: "Extract subjects from photos with pixel-perfect precision.",
            feat_ocr_title: "OCR Scanner",
            feat_ocr_desc: "Extract editable text from images and scanned documents.",
            feat_secure_title: "Fast & Secure",
            feat_secure_desc: "Your files are processed quickly and deleted immediately.",
            rmv_upload_text: "Select an Image to Proceed",
            btn_upload_image: "Upload Image",
            btn_remove_bg: "Remove BG",
            pricing_title: "Simple, Transparent Pricing",
            pricing_subtitle: "Choose the plan that's right for your creative workflow.",
            plan_starter_name: "Starter",
            plan_starter_desc: "Perfect for quick, casual edits.",
            plan_pro_name: "Pro Plan",
            plan_pro_desc: "Unlimited power for professionals.",
            p_feat_1: "5 AI tasks per day",
            p_feat_2: "Standard processing speed",
            p_feat_3: "Community support",
            p_feat_4: "Unlimited AI tasks",
            p_feat_5: "Priority AI processing",
            p_feat_6: "Bulk file conversion",
            p_feat_7: "Premium 24/7 support",
            btn_choose_starter: "Choose Starter",
            btn_choose_pro: "Get Pro Access",
            label_email: "Email Address",
            label_password: "Password",
            label_forgot: "Forgot password?",
            label_remember: "Remember me for 30 days",
            label_fullname: "Full Name",
            label_confirm: "Confirm Password",
            label_terms: "I agree to the Terms of Service.",
            msg_login_success: "Successfully signed in! Welcome back.",
            msg_signup_success: "Account created successfully! Welcome to MAAREEYE.",
            msg_pass_mismatch: "Passwords do not match. Please try again.",
            ocr_upload_text: "Import Scanned Document",
            btn_upload_doc: "Choose File",
            btn_scan_text: "Extract Text",
            ocr_success_badge: "Text Extracted",
            msg_copy_success: "Text copied to clipboard!",
            label_to: "To:",
            btn_convert: "Convert Now",
            conv_success_badge: "Conversion Complete",
            btn_download_file: "Download File",
            feat_writer_title: "AI Article Writer",
            feat_writer_desc: "Generate professional articles using Google AI.",
            label_article_topic: "Article Topic",
            btn_generate_article: "Generate Article",
            writer_success_badge: "Article Ready",
            feat_art_title: "AI Art Generator",
            feat_art_desc: "Turn imagination into stunning AI visuals.",
            label_art_prompt: "Image Description",
            btn_generate_art: "Generate Art",
            art_success_badge: "Artwork Ready",
            feat_qr_title: "QR Generator",
            feat_qr_desc: "Create custom QR codes for any link or text.",
            label_qr_text: "URL or Text",
            btn_generate_qr: "Generate QR",
            qr_success_badge: "QR Code Ready",
            feat_compress_title: "Image Compressor",
            feat_compress_desc: "Reduce image size without losing quality.",
            comp_upload_text: "Choose image to optimize",
            btn_compress: "Optimize Now",
            comp_success_badge: "Optimization Complete",
            feat_sum_title: "Web Summarizer",
            feat_sum_desc: "Get instant AI summaries for any website URL.",
            label_url: "Website URL",
            btn_summarize: "Summarize Now",
            sum_success_badge: "Summary Ready",
            feat_scanner_title: "Smart Scanner",
            feat_scanner_desc: "Enhance document photos into professional scans.",
            scanner_upload_text: "Upload photo of document",
            scanner_success_badge: "Scan Enhanced",
            feat_enhancer_title: "AI Image Enhancer",
            feat_enhancer_desc: "Transform low-resolution images into crystal-clear, high-definition quality instantly.",
            enh_upload_text: "Select an Image to Enhance"
        },
        so: {
            nav_home: "Hoyga",
            nav_about: "Nagu Saabsan",
            nav_pricing: "Lacagaha",
            nav_login: "Gali",
            nav_signup: "Isdiiwaangeli",
            hero_badge: "Baro Aaladahaaga Cusub ee AI",
            hero_title: 'Maareeye Faylasha & <br><span class="gradient-text">Aaladaha AI</span>',
            hero_subtitle: "U beddel faylasha, ka saar background-ka sawirada, oo ku scan-garee dukumentiyada awoodda AI — dhammaan hal meel.",
            btn_get_started: "Ku Bilow Bilaash",
            btn_learn_more: "Wax badan baro",
            feat_converter_title: "Beddelaha Faylasha",
            feat_converter_desc: "Si degdeg ah ugu beddel faylasha nuucyada aad rabto adoo tayada dhowraya.",
            feat_remover_title: "Ka Saaraha Background-ka",
            feat_remover_desc: "Si toos ah uga saar background-ka sawirada ilbiriqsiyo gudahood.",
            feat_ocr_title: "Scan-ka Dukumentiga",
            feat_ocr_desc: "Ka soo saar qoraal la edit-gareyn karo sawirada iyo dukumentiyada.",
            feat_scanner_title: "Scanner-ka Caqliga leh",
            feat_scanner_desc: "U beddel sawirada mobile-ka dukumentiyo scan dhab ah u eg.",
            feat_writer_title: "AI Qoraaga",
            feat_writer_desc: "U samee maqaallo xirfadaysan adoo isticmaalaya Google AI.",
            feat_art_title: "AI Farshaxan",
            feat_art_desc: "U beddel mala-awaalkaaga sawirro AI ah oo cajiib ah.",
            feat_qr_title: "QR Abuure",
            feat_qr_desc: "U samee QR Code kasta oo aad rabto si fudud.",
            feat_compress_title: "Cabbir Yareeyaha",
            feat_compress_desc: "Yaree cabbirka sawirka adigoon tayada lumin.",
            feat_sum_title: "Soo Koobaha Mareegta",
            feat_sum_desc: "Si degdeg ah u soo koob xogta ku jirta link kasta oo website ah.",
            feat_secure_title: "Degdeg & Ammaan",
            feat_secure_desc: "Xogtaada si ammaan ah ayaa loo habaynayaa, isla markaana waa la tirtirayaa.",
            rmv_upload_text: "Dooro sawir si aad u bilowdo",
            btn_upload_image: "Soo geli sawirka",
            btn_remove_bg: "Ka saar Background-ka",
            pricing_title: "Qiimo Fudud oo Cad",
            pricing_subtitle: "Dooro qorshaha kugu habboon shaqadaada.",
            plan_starter_name: "Starter",
            plan_starter_desc: "Ku habboon isticmaalka yar-yar.",
            plan_pro_name: "Pro Plan",
            plan_pro_desc: "Awood aan xadidnayn oo loogu talagalay xirfadlayaasha.",
            p_feat_1: "5 hawlo AI ah maalintii",
            p_feat_2: "Xawaare caadi ah",
            p_feat_3: "Taageerada bulshada",
            p_feat_4: "Hawlo AI oo aan xadidnayn",
            p_feat_5: "Mudnaanta habaynta AI",
            p_feat_6: "Beddelidda faylal badan halmar",
            p_feat_7: "Taageero premium ah 24/7",
            btn_choose_starter: "Dooro Starter",
            btn_choose_pro: "Hadda hel Pro",
            label_email: "Email-ka",
            label_password: "Password-ka",
            label_forgot: "Ma ilowday password-ka?",
            label_remember: "I xasuusnow 30 casho",
            label_fullname: "Magaca oo Buuxa",
            label_confirm: "Hubi Password-ka",
            label_terms: "Waxaan ogolahay shuruudaha adeegga.",
            msg_login_success: "Si guul leh ayaad u gashay! Kusoo dhawaaw mar kale.",
            msg_signup_success: "Akoon si guul leh ayaa loo abuuray! Kusoo dhawaaw MAAREEYE.",
            msg_pass_mismatch: "Password-yadu isma laha. Fadlan mar kale isku day.",
            ocr_upload_text: "Soo geli dukumentiga",
            btn_upload_doc: "Dooro faylka",
            btn_scan_text: "Soo saar qoraalka",
            ocr_success_badge: "Qoraalka waa la helay",
            msg_copy_success: "Qoraalka waa la koobiyey!",
            label_to: "U beddel:",
            btn_convert: "Hadda beddel",
            conv_success_badge: "Waa la beddelay",
            btn_download_file: "Soo dejiso faylka",
            label_article_topic: "Mowduuca Maqaalka",
            btn_generate_article: "Samee Maqaalka",
            writer_success_badge: "Maqaalku waa diyaar",
            label_art_prompt: "Faahfaahinta Sawirka",
            btn_generate_art: "Abuur Sawirka",
            art_success_badge: "Sawirku waa diyaar",
            label_qr_text: "URL ama Qoraal",
            btn_generate_qr: "Samee QR-ka",
            qr_success_badge: "QR-ka waa diyaar",
            comp_upload_text: "Dooro sawirka aad yareynayso",
            btn_compress: "Hadda yaree",
            comp_success_badge: "Waa la yareeyay",
            label_url: "Link-ga Website-ka",
            btn_summarize: "Hadda soo koob",
            sum_success_badge: "Koobitaankii waa diyaar",
            scanner_upload_text: "Soo geli sawirka warqadda",
            btn_enhance_scan: "Hadda hagaaji",
            scanner_success_badge: "Waa la hagaajiyay",
            feat_enhancer_title: "Saayidiyaha Sawirka",
            feat_enhancer_desc: "U beddel sawirrada tayadoodu hooseyso kuwa aad u fiiqan oo leh taya sareeya (HD).",
            enh_upload_text: "Dooro Sawir Aad Tayada U Kordhinayso"
        }
    };

    let currentLang = 'en';

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        document.querySelector('.lang-text').textContent = lang.toUpperCase();
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'so' : 'en';
            updateLanguage(currentLang);
        });
    }

    // Toast Notification Helper
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
            </svg>
            <span>${message}</span>
        `;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // Authentication Logic (Mock)
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-login');
            btn.classList.add('loading');
            btn.disabled = true;

            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast(translations[currentLang].msg_login_success);
                navigateTo('dashboard');
            }, 1500);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('reg-pass').value;
            const confirm = document.getElementById('reg-confirm').value;

            if (pass !== confirm) {
                showToast(translations[currentLang].msg_pass_mismatch, 'error');
                return;
            }

            const btn = document.getElementById('btn-signup');
            btn.classList.add('loading');
            btn.disabled = true;

            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast(translations[currentLang].msg_signup_success);
                navigateTo('dashboard');
            }, 2000);
        });
    }

    // Handle Hash on Initial Load
    function handleInitialHash() {
        const hash = window.location.hash.replace('#', '');
        const validPages = Array.from(pages).map(p => p.id);
        
        if (hash && validPages.includes(hash)) {
            navigateTo(hash);
        } else {
            navigateTo('home');
        }
    }

    // Listen for hash change back/forward
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
             const activePage = document.querySelector('.page-section.active');
             if (!activePage || activePage.id !== hash) {
                navigateTo(hash);
             }
        }
    });

    // Initialize
    handleInitialHash();

    // DASHBOARD LOGIC
    const toolNavBtns = document.querySelectorAll('.tool-nav-btn');
    const workspaceContents = document.querySelectorAll('.workspace-content');
    const fileInputs = {
        converter: document.getElementById('file-input-conv'),
        remover: document.getElementById('file-input-rmv'),
        ocr: document.getElementById('file-input-ocr'),
        enhancer: document.getElementById('file-input-enh')
    };

    // Tool Switching
    toolNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            
            // UI Update
            toolNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            workspaceContents.forEach(content => {
                if (content.id === `${target}-view`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // File Selection Feedback
    function setupFileInput(type, controlId, nameId) {
        const input = fileInputs[type];
        const controls = document.getElementById(controlId);
        const nameDisplay = document.getElementById(nameId);

        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                nameDisplay.textContent = e.target.files[0].name;
                controls.classList.remove('hidden');
            }
        });
    }

    setupFileInput('converter', 'conv-controls', 'conv-filename');
    setupFileInput('remover', 'rmv-controls', 'rmv-filename');
    setupFileInput('ocr', 'ocr-controls', 'ocr-filename');
    setupFileInput('enhancer', 'enh-controls', 'enh-filename');

    // AI Enhancer Specific Logic
    const enhInput = fileInputs.enhancer;
    const enhPreview = document.getElementById('enh-preview');
    const enhImgBefore = document.getElementById('enh-img-before');
    const enhImgAfter = document.getElementById('enh-img-after');
    const enhSkeleton = document.getElementById('enh-skeleton');
    const enhUploadZone = document.getElementById('enh-upload');

    enhInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            // Clear any cross-tool cached pending blob
            enhancerPendingBlob = null;
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                enhImgBefore.src = event.target.result;
                enhUploadZone.classList.add('hidden');
                enhPreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // BG Remover Specific Logic
    const rmvInput = fileInputs.remover;
    const rmvPreview = document.getElementById('rmv-preview');
    const rmvImgBefore = document.getElementById('rmv-img-before');
    const rmvImgAfter = document.getElementById('rmv-img-after');
    const rmvSkeleton = document.getElementById('rmv-skeleton');
    const rmvUploadZone = document.getElementById('rmv-upload');

    rmvInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                rmvImgBefore.src = event.target.result;
                rmvUploadZone.classList.add('hidden');
                rmvPreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // Processing Logic (Professional API)
    async function processImage() {
        const btn = document.getElementById('btn-process-rmv');
        const resultView = document.getElementById('result-view');
        const btnDownload = document.getElementById('btn-download');

        // UI Loading State
        btn.classList.add('loading');
        btn.disabled = true;
        rmvSkeleton.classList.remove('hidden');
        rmvImgAfter.classList.add('hidden');
        
        try {
            const fileInput = document.getElementById('file-input-rmv');
            const file = fileInput.files[0];

            if (!file) {
                throw new Error("Please select an image first.");
            }

            // --- API CONFIGURATION ---
            // Enter your remove.bg API key here
            const API_KEY = "s2XSTAoyryqhnYE8KLRLyswQ"; 
            
            if (API_KEY === "YOUR_REMOVE_BG_API_KEY_HERE") {
                // Fallback to local processing if no API key (for demo)
                const removeBG = window.imglyRemoveBackground;
                if (removeBG) {
                    console.log("Using local AI (Small Model) because no API key was provided.");
                    const blob = await removeBG(file, { model: 'small' });
                    handleResult(blob);
                } else {
                    throw new Error("Please add your remove.bg API Key in script.js to enable high-speed removal.");
                }
                return;
            }

            // HIGH-SPEED API CALL
            const formData = new FormData();
            formData.append('image_file', file);
            formData.append('size', 'auto');

            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: { 'X-Api-Key': API_KEY },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.errors[0].title || "API Error");
            }

            const blob = await response.blob();
            handleResult(blob);

        } catch (error) {
            console.error("AI Error:", error);
            showToast(error.message, "error");
            rmvSkeleton.classList.add('hidden');
            btn.classList.remove('loading');
            btn.disabled = false;
        }

        function handleResult(blob) {
            const url = URL.createObjectURL(blob);
            rmvImgAfter.src = url;
            rmvImgAfter.classList.remove('hidden');
            rmvSkeleton.classList.add('hidden');
            
            // Disable loading states on processing button
            btn.classList.remove('loading');
            btn.disabled = false;

            // Hide 'Remove BG' button, and show 'Download / Reset' button bar instead
            document.getElementById('rmv-controls').classList.add('hidden');
            const resultControls = document.getElementById('rmv-result-controls');
            resultControls.classList.remove('hidden');

            // Bind dynamic download action
            document.getElementById('btn-download-rmv').onclick = () => {
                const link = document.createElement('a');
                link.href = url;
                link.download = `maareeye_bg_removed_${Date.now()}.png`;
                link.click();
                showToast("Sawirkii waa lagu guulaystay inuu dego!", "success");
            };

            // Bind dynamic enhance pipeline transfer
            document.getElementById('btn-enhance-from-rmv').onclick = () => {
                // 1. Load into pipeline buffer
                enhancerPendingBlob = blob;
                
                // 2. Populate Enhancer Workspace State
                enhImgBefore.src = url;
                enhUploadZone.classList.add('hidden');
                enhPreview.classList.remove('hidden');
                document.getElementById('enh-filename').textContent = "bg_removed_image.png";
                document.getElementById('enh-controls').classList.remove('hidden');
                
                // Safely reset previous enhancer results state if present
                enhImgAfter.src = '';
                enhImgAfter.classList.add('hidden');
                enhSkeleton.classList.remove('hidden');
                document.getElementById('enh-result-controls').classList.add('hidden');

                // 3. Perform automated routing to Enhancer view
                const navTarget = document.querySelector('.tool-nav-btn[data-target="enhancer"]');
                if (navTarget) navTarget.click();

                showToast("Faylka waa loo soo gudbiyay Enhancer-ka! Guji 'Enhance Quality'!", "info");
            };

            // Bind dynamic reset action (Start New)
            document.getElementById('btn-reset-rmv').onclick = (e) => {
                e.preventDefault();
                resultControls.classList.add('hidden');
                rmvUploadZone.classList.remove('hidden');
                rmvPreview.classList.add('hidden');
                rmvImgBefore.src = '';
                rmvImgAfter.src = '';
                rmvImgAfter.classList.add('hidden');
                rmvSkeleton.classList.remove('hidden');
                document.getElementById('file-input-rmv').value = '';
            };

            showToast("Background-ka waa laga saaray!", "success");
        }
    }

    // --- HIGH-END AI IMAGE ENHANCER ENGINE ---
    // Pixel Dehaze & Face Anti-Glare Engine (Structure-Preserving Edition)
    function applyDehazeAndAntiGlare(ctx, width, height) {
        const srcData = ctx.getImageData(0, 0, width, height);
        const data = srcData.data;
        const len = data.length;
        
        for (let i = 0; i < len; i += 4) {
            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];
            
            let l = 0.299 * r + 0.587 * g + 0.114 * b;

            // ULTRA-SOFT ANTI-GLARE:
            // Focus ONLY on absolute hotspot reflections (>205) to preserve 100% natural facial architecture!
            if (l > 205) {
                let blend = (l - 205) / (255 - 205);
                let compress = 1.0 - (blend * 0.14); // Feather back hot spots by up to 14% max
                r *= compress;
                g *= compress;
                b *= compress;
            }

            data[i] = Math.min(255, Math.max(0, r));
            data[i+1] = Math.min(255, Math.max(0, g));
            data[i+2] = Math.min(255, Math.max(0, b));
        }
        ctx.putImageData(srcData, 0, 0);
    }

    // Pixel Convolution Matrix Sharpener
    function applyConvolveSharpen(ctx, width, height, amount) {
        const weights = [
             0, -1 * amount, 0,
            -1 * amount, 1 + 4 * amount, -1 * amount,
             0, -1 * amount, 0
        ];
        const side = 3;
        const halfSide = 1;
        const srcData = ctx.getImageData(0, 0, width, height);
        const sw = srcData.width;
        const sh = srcData.height;
        const src = srcData.data;
        const output = ctx.createImageData(sw, sh);
        const dst = output.data;

        for (let y = 0; y < sh; y++) {
            for (let x = 0; x < sw; x++) {
                const sy = y;
                const sx = x;
                const dstOff = (y * sw + x) * 4;
                let r = 0, g = 0, b = 0;
                for (let cy = 0; cy < side; cy++) {
                    for (let cx = 0; cx < side; cx++) {
                        const scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                        const scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                        const srcOff = (scy * sw + scx) * 4;
                        const wt = weights[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                    }
                }
                // ZERO-GLARE HALO LIMITER (Prevent heavy sharpening from creating white halos/rings under zoom)
                const origR = src[dstOff];
                const origG = src[dstOff + 1];
                const origB = src[dstOff + 2];
                
                let finalR = Math.min(255, Math.max(0, r));
                let finalG = Math.min(255, Math.max(0, g));
                let finalB = Math.min(255, Math.max(0, b));

                const origL = 0.299 * origR + 0.587 * origG + 0.114 * origB;
                // For already-bright pixel thresholds, cap positive boosts softly (15% max) to eradicate harsh halos
                if (origL > 180) {
                    const maxBoostFactor = 1.15;
                    finalR = Math.min(finalR, origR * maxBoostFactor);
                    finalG = Math.min(finalG, origG * maxBoostFactor);
                    finalB = Math.min(finalB, origB * maxBoostFactor);
                }

                dst[dstOff] = finalR;
                dst[dstOff + 1] = finalG;
                dst[dstOff + 2] = finalB;
                dst[dstOff + 3] = src[dstOff + 3];
            }
        }
        ctx.putImageData(output, 0, 0);
    }

    async function processEnhanceImage() {
        const btn = document.getElementById('btn-process-enh');
        const fileInput = document.getElementById('file-input-enh');
        
        let imageSrc = "";
        
        // Support dual input streams: local manual upload or cross-tool buffered transfer
        if (enhancerPendingBlob) {
            imageSrc = URL.createObjectURL(enhancerPendingBlob);
        } else if (fileInput.files && fileInput.files[0]) {
            imageSrc = URL.createObjectURL(fileInput.files[0]);
        } else {
            showToast("Fadlan dooro sawir marka hore!", "error");
            return;
        }

        btn.classList.add('loading');
        btn.disabled = true;
        enhSkeleton.classList.remove('hidden');
        enhImgAfter.classList.add('hidden');

        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            // Simulate processing time for authenticity, then sharpen
            setTimeout(() => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // 1. Extreme 12K Ultra HD Scaling (6.0x dimension = 36.0x total pixels!)
                    const scale = 6.0; 
                    const targetW = img.width * scale;
                    const targetH = img.height * scale;
                    canvas.width = targetW;
                    canvas.height = targetH;

                    ctx.imageSmoothingQuality = 'high';
                    
                    // 2. STRICTLY PRESERVE COLORS (No Saturation, Minimal Contrast tuning)
                    ctx.filter = 'contrast(1.02) brightness(1.01)';
                    ctx.drawImage(img, 0, 0, targetW, targetH);
                    ctx.filter = 'none';

                    // NEW: 3. Advanced Anti-Glare & Dehazing (Remove face glare and milky fogs)
                    applyDehazeAndAntiGlare(ctx, targetW, targetH);

                    // 4. Advanced Pixel-Level Matrix Sharpener (Intense 12K Details Boost)
                    applyConvolveSharpen(ctx, targetW, targetH, 0.58);

                    // 4. Convert back to High-Quality Lossless PNG Blob
                    canvas.toBlob((blob) => {
                        const enhancedUrl = URL.createObjectURL(blob);
                        
                        enhImgAfter.src = enhancedUrl;
                        enhImgAfter.classList.remove('hidden');
                        enhSkeleton.classList.add('hidden');
                        
                        btn.classList.remove('loading');
                        btn.disabled = false;

                        // Swapping controls
                        document.getElementById('enh-controls').classList.add('hidden');
                        const resultControls = document.getElementById('enh-result-controls');
                        resultControls.classList.remove('hidden');

                        // Bind Download Event
                        document.getElementById('btn-download-enh').onclick = () => {
                            const link = document.createElement('a');
                            link.href = enhancedUrl;
                            link.download = `maareeye_4k_enhanced_${Date.now()}.png`;
                            link.click();
                            showToast("Sawirkii HD-ga ahaa waa lagu guulaystay inuu dego!", "success");
                        };

                        // Bind Reset/Start New Event
                        document.getElementById('btn-reset-enh').onclick = (e) => {
                            e.preventDefault();
                            resultControls.classList.add('hidden');
                            enhUploadZone.classList.remove('hidden');
                            enhPreview.classList.add('hidden');
                            enhImgBefore.src = '';
                            enhImgAfter.src = '';
                            enhImgAfter.classList.add('hidden');
                            enhSkeleton.classList.remove('hidden');
                            fileInput.value = '';
                        };

                        showToast("Tayada sawirka waa la saayiday oo waa la hagaajiyay!", "success");
                    }, 'image/png', 1.0);

                } catch (err) {
                    console.error("Enhancer Error: ", err);
                    showToast("Waxaa dhacay khalad intii la shaqaynayay!", "error");
                    btn.classList.remove('loading');
                    btn.disabled = false;
                    enhSkeleton.classList.add('hidden');
                }
            }, 1800);
        };
        
        img.onerror = () => {
            showToast("Ma dhicin in sawirka la akhriyo!", "error");
            btn.classList.remove('loading');
            btn.disabled = false;
            enhSkeleton.classList.add('hidden');
        };
    }

    async function processOCR() {
        const btn = document.getElementById('btn-process-ocr');
        const fileInput = document.getElementById('file-input-ocr');
        const outputArea = document.getElementById('ocr-text-output');
        const resultContainer = document.getElementById('ocr-result-container');
        const uploadZone = document.getElementById('ocr-upload');

        if (!fileInput.files[0]) return;

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            if (typeof Tesseract === 'undefined') {
                throw new Error("OCR Library (Tesseract) not found. Please wait for the page to finish loading.");
            }

            const file = fileInput.files[0];
            let source = file;

            // Handle PDF conversion to image
            if (file.type === 'application/pdf') {
                showToast("Converting PDF to Image...", "success");
                const pdfData = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                const page = await pdf.getPage(1); // Process the first page
                
                const viewport = page.getViewport({ scale: 2.0 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;
                source = canvas.toDataURL('image/png');
            }

            // Create a worker for more reliable processing
            const worker = await Tesseract.createWorker('eng', 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
                    }
                }
            });

            const { data: { text } } = await worker.recognize(source);
            await worker.terminate();

            if (!text || text.trim() === "") {
                throw new Error("Could not find any readable text in this image.");
            }

            outputArea.value = text;
            uploadZone.classList.add('hidden');
            resultContainer.classList.remove('hidden');

        } catch (error) {
            console.error("OCR Error Detail:", error);
            showToast("OCR Error: " + (error.message || "Unknown error"), "error");
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // Copy to clipboard
    document.getElementById('btn-copy-ocr').addEventListener('click', () => {
        const text = document.getElementById('ocr-text-output').value;
        navigator.clipboard.writeText(text).then(() => {
            showToast(translations[currentLang].msg_copy_success);
        });
    });

    async function processConversion() {
        const btn = document.getElementById('btn-process-conv');
        const fileInput = document.getElementById('file-input-conv');
        const formatSelect = document.getElementById('conv-format');
        const resultContainer = document.getElementById('conv-result-container');
        const uploadZone = document.getElementById('conv-upload');
        const btnDownload = document.getElementById('btn-download-conv');

        if (!fileInput.files[0]) return;

        btn.classList.add('loading');
        btn.disabled = true;

        const file = fileInput.files[0];
        const targetFormat = formatSelect.value;
        const targetExt = targetFormat.split('/')[1];

        try {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                
                btnDownload.onclick = () => {
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `maareeye_converted_${Date.now()}.${targetExt}`;
                    link.click();
                };

                uploadZone.classList.add('hidden');
                resultContainer.classList.remove('hidden');
                btn.classList.remove('loading');
                btn.disabled = false;
                
            }, targetFormat, 0.9);

        } catch (error) {
            console.error("Conversion Error:", error);
            showToast("Failed to convert image.", "error");
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // Helper to wait for OpenCV
    function waitForOpenCV() {
        return new Promise((resolve) => {
            if (typeof cv !== 'undefined' && cv.getBuildInformation) {
                resolve();
            } else {
                document.addEventListener('opencv-ready', resolve, { once: true });
                // Fallback for async loading
                const check = setInterval(() => {
                    if (typeof cv !== 'undefined' && cv.getBuildInformation) {
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            }
        });
    }

    // High-Performance AI Retinex Shadow Eraser & Document Scanner Filter
    // High-Stability Local Contrast Normalization (Eliminates Blotches & Artifacts)
    function applyAIShadowDivisionScan(canvas) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Step 1: Create a heavily blurred background map (Local Illumination)
        const offCanvas = document.createElement('canvas');
        offCanvas.width = 64; // Increased resolution for smoother gradients
        offCanvas.height = 64;
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(canvas, 0, 0, 64, 64);

        const lightCanvas = document.createElement('canvas');
        lightCanvas.width = w;
        lightCanvas.height = h;
        const lightCtx = lightCanvas.getContext('2d');
        lightCtx.imageSmoothingEnabled = true;
        lightCtx.drawImage(offCanvas, 0, 0, w, h);
        const lightData = lightCtx.getImageData(0, 0, w, h).data;

        const padX = Math.floor(w * 0.08); // 8% Safety margin for fingers
        const padY = Math.floor(h * 0.08);

        for (let i = 0; i < data.length; i += 4) {
            const index = i / 4;
            const x = index % w;
            const y = Math.floor(index / w);

            // Source pixels
            let r = data[i], g = data[i+1], b = data[i+2];
            
            // Background estimate (Local White)
            let br = lightData[i], bg = lightData[i+1], bb = lightData[i+2];
            let avgBg = (br + bg + bb) / 3;

            // Color-Preserving Background Normalization
            // We use the local illumination map to level the white balance across the page
            let gain = 255 / Math.max(40, avgBg); 
            
            // Apply gain equally to all channels to preserve original ink colors (Blue/Red/Green pens)
            r = Math.min(255, r * gain);
            g = Math.min(255, g * gain);
            b = Math.min(255, b * gain);

            // Progressive Background Bleaching (Only affects light areas, preserves ink)
            let lum = 0.299 * r + 0.587 * g + 0.114 * b;
            
            if (lum > 185) {
                // If it's very light, it's background. Gently pull to pure white.
                let bleachFactor = (lum - 185) / (255 - 185);
                bleachFactor = Math.pow(bleachFactor, 0.5); // Fast curve to white
                r = r * (1 - bleachFactor) + 255 * bleachFactor;
                g = g * (1 - bleachFactor) + 255 * bleachFactor;
                b = b * (1 - bleachFactor) + 255 * bleachFactor;
            } else if (lum < 150) {
                // If it's dark (ink), slightly enhance contrast without losing color
                let contrastFactor = 0.94; 
                r *= contrastFactor; g *= contrastFactor; b *= contrastFactor;
            }

            // Finger & Boundary Noise Eraser (Color-Preserving)
            let distToEdgeX = Math.min(x, w - x);
            let distToEdgeY = Math.min(y, h - y);
            
            if (distToEdgeX < padX || distToEdgeY < padY) {
                let p = Math.min(distToEdgeX / padX, distToEdgeY / padY);
                // Detect non-white artifacts (fingers/shadows) at the very edges
                if (lum < 235) {
                    let edgeBleach = 1.0 - Math.pow(p, 1.6);
                    r = r * (1 - edgeBleach) + 255 * edgeBleach;
                    g = g * (1 - edgeBleach) + 255 * edgeBleach;
                    b = b * (1 - edgeBleach) + 255 * edgeBleach;
                }
            }

            data[i] = r;
            data[i+1] = g;
            data[i+2] = b;
        }
        ctx.putImageData(imgData, 0, 0);
    }

    // Futuristic AI Scan Line Animation & Progressive Reveal Engine
    function animateScannerReveal(canvas, originalImg, processedDataUrl, onComplete) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        
        // Buffer the final processed image payload
        const processedImg = new Image();
        processedImg.src = processedDataUrl;
        processedImg.onload = () => {
            const duration = 1800; // Dynamic 1.8 second sweep
            let startTime = null;

            function drawFrame(timestamp) {
                if (!startTime) startTime = timestamp;
                let elapsed = timestamp - startTime;
                let progress = Math.min(1.0, elapsed / duration);

                ctx.clearRect(0, 0, w, h);

                // Layer 1: Original 'dirty' frame as the underlying layer
                ctx.drawImage(originalImg, 0, 0, w, h);

                // Dynamic Y Coordinate split
                const scanY = h * progress;

                // Layer 2: Progressive render of the pristine cleaned scan above split
                if (scanY > 0) {
                    ctx.drawImage(processedImg, 0, 0, w, scanY, 0, 0, w, scanY);
                }

                // Layer 3: Neon Laser Glow Bar Effect
                if (progress < 1.0) {
                    // Laser beam glow envelope
                    const glowGrad = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
                    glowGrad.addColorStop(0, 'rgba(0, 242, 254, 0)');
                    glowGrad.addColorStop(0.5, 'rgba(0, 242, 254, 0.7)'); // Rich Cyan
                    glowGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');

                    ctx.fillStyle = glowGrad;
                    ctx.fillRect(0, scanY - 12, w, 24);

                    // Intense white laser core
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, scanY - 1, w, 2);

                    requestAnimationFrame(drawFrame);
                } else {
                    // Absolute Final Full-fidelity frame snap
                    ctx.drawImage(processedImg, 0, 0, w, h);
                    if (onComplete) onComplete();
                }
            }
            requestAnimationFrame(drawFrame);
        };
    }

    async function processScanner() {
        const btn = document.getElementById('btn-process-scanner');
        const fileInput = document.getElementById('file-input-scanner');
        const canvas = document.getElementById('scanner-canvas');
        const resultContainer = document.getElementById('scanner-result-container');
        const uploadZone = document.getElementById('scanner-upload');
        const btnDownload = document.getElementById('btn-download-scanner');
        const statusOverlay = document.getElementById('scanner-status');

        if (!fileInput.files[0]) return;

        btn.classList.add('loading');
        btn.disabled = true;
        statusOverlay.classList.remove('hidden');

        await waitForOpenCV();

        const file = fileInput.files[0];
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            try {
                let src = cv.imread(img);
                let dst = new cv.Mat();
                
                // 1. Resize if too large for performance
                let maxDim = 1200;
                let scale = Math.min(1, maxDim / Math.max(src.rows, src.cols));
                if (scale < 1) {
                    let dsize = new cv.Size(src.cols * scale, src.rows * scale);
                    cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
                }

                // 2. Adaptive Pre-processing (Noise Reduction + Edge Detection)
                cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
                cv.medianBlur(dst, dst, 5); // Kill salt-and-pepper noise
                cv.adaptiveThreshold(dst, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
                
                // 3. Find Contours
                let contours = new cv.MatVector();
                let hierarchy = new cv.Mat();
                cv.findContours(dst, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                let largestContour = null;
                let maxArea = 0;
                let totalImgArea = src.rows * src.cols;

                for (let i = 0; i < contours.size(); ++i) {
                    let cnt = contours.get(i);
                    let area = cv.contourArea(cnt);
                    if (area > maxArea && area > totalImgArea * 0.15) {
                        largestContour = cnt;
                        maxArea = area;
                    }
                }

                if (largestContour) {
                    let hull = new cv.Mat();
                    cv.convexHull(largestContour, hull, false, true);

                    let pts = [];
                    for (let i = 0; i < hull.rows; i++) {
                        pts.push({ x: hull.data32S[i * 2], y: hull.data32S[i * 2 + 1] });
                    }
                    hull.delete();

                    let sums = pts.map(p => p.x + p.y);
                    let diffs = pts.map(p => p.x - p.y);

                    let tl = pts[sums.indexOf(Math.min(...sums))];
                    let br = pts[sums.indexOf(Math.max(...sums))];
                    let tr = pts[diffs.indexOf(Math.max(...diffs))];
                    let bl = pts[diffs.indexOf(Math.min(...diffs))];

                    const centerX = (tl.x + tr.x + br.x + bl.x) / 4;
                    const centerY = (tl.y + tr.y + br.y + bl.y) / 4;

                    // REDUCED PADDING (1.05 instead of 1.42) to exclude fingers and background!
                    const paddingFactor = 1.05;
                    const safeExpand = (p) => ({
                        x: Math.min(src.cols, Math.max(0, centerX + (p.x - centerX) * paddingFactor)),
                        y: Math.min(src.rows, Math.max(0, centerY + (p.y - centerY) * paddingFactor))
                    });

                    const tl_exp = safeExpand(tl);
                    const tr_exp = safeExpand(tr);
                    const br_exp = safeExpand(br);
                    const bl_exp = safeExpand(bl);

                    // Mount expanded, non-destructive coordinates into source matrix
                    let srcPts = cv.matFromArray(4, 1, cv.CV_32FC2, [
                        tl_exp.x, tl_exp.y, tr_exp.x, tr_exp.y,
                        br_exp.x, br_exp.y, bl_exp.x, bl_exp.y
                    ]);

                    let width = Math.max(
                        Math.hypot(br_exp.x - bl_exp.x, br_exp.y - bl_exp.y),
                        Math.hypot(tr_exp.x - tl_exp.x, tr_exp.y - tl_exp.y)
                    );
                    let height = Math.max(
                        Math.hypot(tr_exp.y - br_exp.y, tr_exp.x - br_exp.x),
                        Math.hypot(tl_exp.y - bl_exp.y, tl_exp.x - bl_exp.x)
                    );

                    let dstPts = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, width, 0, width, height, 0, height]);
                    let M = cv.getPerspectiveTransform(srcPts, dstPts);
                    let warped = new cv.Mat();
                    cv.warpPerspective(src, warped, M, new cv.Size(width, height));

                    // 6. Final AI Scan Rendering (Removes all shadows & enhances contrast flawlessly)
                    cv.imshow(canvas, warped);
                    applyAIShadowDivisionScan(canvas);

                    warped.delete(); M.delete(); dstPts.delete(); srcPts.delete();
                } else {
                    // AI Smart Fallback (No hard edges detected, but scans and clears document seamlessly)
                    const ctx = canvas.getContext('2d');
                    canvas.width = src.cols;
                    canvas.height = src.rows;
                    ctx.drawImage(img, 0, 0);
                    
                    applyAIShadowDivisionScan(canvas);
                    showToast("Scannereeyaha AI: Waraaqda waa la nadiifiyay oo hooska waa laga saaray!", "success");
                }

                // A. Grab the final pristine, processed JPEG data
                const finalProcessedDataUrl = canvas.toDataURL('image/jpeg', 0.96);

                // B. Reconfigure layouts instantly to show Canvas container for animation
                uploadZone.classList.add('hidden');
                resultContainer.classList.remove('hidden');
                statusOverlay.classList.add('hidden');

                // C. Trigger Laser Progressive Reveal Sweep!
                animateScannerReveal(canvas, img, finalProcessedDataUrl, () => {
                    // Completed successfully: release state spinlocks
                    btn.classList.remove('loading');
                    btn.disabled = false;

                    // Bind Download Handler
                    btnDownload.onclick = () => {
                        const link = document.createElement('a');
                        link.href = finalProcessedDataUrl;
                        link.download = `maareeye_smart_scan_${Date.now()}.jpg`;
                        link.click();
                    };
                    showToast("Scannereeyaha AI: Warqada waa la nadiifiyay oo waa la toosiyay!", "success");
                });

                // D. Cleanup OpenCV structures
                src.delete(); dst.delete(); hierarchy.delete(); contours.delete();
                if (largestContour) largestContour.delete();

            } catch (err) {
                console.error(err);
                showToast("Scanning failed. Please try a clearer photo.", "error");
                btn.classList.remove('loading');
                btn.disabled = false;
                statusOverlay.classList.add('hidden');
            }
        };
    }

    async function processSummarizer() {
        const btn = document.getElementById('btn-process-sum');
        const urlInput = document.getElementById('sum-url');
        const outputArea = document.getElementById('sum-text-output');
        const resultContainer = document.getElementById('sum-result-container');
        
        const url = urlInput.value.trim();
        if (!url) {
            showToast("Please enter a URL first.", "error");
            return;
        }

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            const GEMINI_API_KEY = "AIzaSyBB2of85F6B7gBKLJ9szComdVmn-BcR_pA";
            
            // Summarization call
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Summarize the content of this URL: ${url}. 
                                   Provide a concise summary with bullet points. 
                                   Use HTML tags (h2, p, ul, li) for formatting.`
                        }]
                    }]
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error.message);
            if (!data.candidates) throw new Error("Could not summarize this page.");

            const summaryText = data.candidates[0].content.parts[0].text;
            outputArea.innerHTML = summaryText;
            resultContainer.classList.remove('hidden');
            showToast("Summary generated!", "success");

        } catch (error) {
            console.error("Summarizer Error:", error);
            showToast("Failed to summarize page. Ensure it's a public link.", "error");
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    async function processCompression() {
        const btn = document.getElementById('btn-process-comp');
        const fileInput = document.getElementById('file-input-comp');
        const resultContainer = document.getElementById('comp-result-container');
        const uploadZone = document.getElementById('comp-upload');
        const btnDownload = document.getElementById('btn-download-comp');
        const originalLabel = document.getElementById('comp-original-size');
        const newLabel = document.getElementById('comp-new-size');
        const savingsLabel = document.getElementById('comp-savings');

        if (!fileInput.files[0]) return;

        btn.classList.add('loading');
        btn.disabled = true;

        const file = fileInput.files[0];
        const originalSize = file.size;
        originalLabel.innerText = (originalSize / 1024).toFixed(1) + " KB";

        try {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Compress by 30-50% quality
            canvas.toBlob((blob) => {
                const newSize = blob.size;
                newLabel.innerText = (newSize / 1024).toFixed(1) + " KB";
                
                const savings = Math.round(((originalSize - newSize) / originalSize) * 100);
                savingsLabel.innerText = `-${savings}%`;
                
                const url = URL.createObjectURL(blob);
                btnDownload.onclick = () => {
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `maareeye_compressed_${Date.now()}.jpg`;
                    link.click();
                };

                uploadZone.classList.add('hidden');
                resultContainer.classList.remove('hidden');
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast("Image optimized!", "success");
            }, 'image/jpeg', 0.6);

        } catch (error) {
            console.error("Compression Error:", error);
            showToast("Failed to compress image.", "error");
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    function processQR() {
        const btn = document.getElementById('btn-process-qr');
        const textInput = document.getElementById('qr-text');
        const outputDiv = document.getElementById('qr-output');
        const resultContainer = document.getElementById('qr-result-container');
        const btnDownload = document.getElementById('btn-download-qr');

        const text = textInput.value.trim();
        if (!text) {
            showToast("Please enter some text or a URL.", "error");
            return;
        }

        btn.classList.add('loading');
        btn.disabled = true;

        // Clear previous QR
        outputDiv.innerHTML = '';

        try {
            const qrcode = new QRCode(outputDiv, {
                text: text,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Delay slightly to let the QR render
            setTimeout(() => {
                const img = outputDiv.querySelector('img');
                if (img) {
                    btnDownload.onclick = () => {
                        const link = document.createElement('a');
                        link.href = img.src;
                        link.download = `maareeye_qr_${Date.now()}.png`;
                        link.click();
                    };
                }
                resultContainer.classList.remove('hidden');
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast("QR Code generated!", "success");
            }, 500);

        } catch (error) {
            console.error("QR Error:", error);
            showToast("Failed to generate QR code.", "error");
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    async function processArt() {
        const btn = document.getElementById('btn-process-art');
        const promptInput = document.getElementById('art-prompt');
        const modelSelect = document.getElementById('art-model');
        const styleSelect = document.getElementById('art-style');
        const outputImg = document.getElementById('art-output-img');
        const resultContainer = document.getElementById('art-result-container');
        const btnDownload = document.getElementById('btn-download-art');

        let prompt = promptInput.value.trim();
        if (!prompt) {
            showToast("Please describe your image first.", "error");
            return;
        }

        const selectedStyle = styleSelect.value;
        const selectedModel = modelSelect.value;

        // Chat-style button loader transition
        btn.disabled = true;
        btn.querySelector('.send-svg').classList.add('hidden');
        btn.querySelector('.btn-loader').classList.remove('hidden');

        try {
            // User's New Gemini API Key Integrated!
            const GEMINI_API_KEY = "AIzaSyDhMEbMxJ9Vd0qRZvky2LCYQSSKNJeDmEo";
            
            // Step 1: Translate Somali to English (Pure Translation Mode)
            const translateResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a high-fidelity Somali-to-English translator for an AI Image Generator.
                                   TASK: Translate the following Somali text into a clear, descriptive English prompt.
                                                                   CRITICAL RULES:
                                   1. BE LOYAL & PRECISE: Do not add objects not in the text.
                                   2. NO EXPLANATIONS: Only output the final prompt.
                                   3. SEARCH GROUNDING: Use Google Search to verify any person, place, or object's visual look.
                                   4. HYPER-ACCURATE FLAGS (MANDATORY):
                                      - Somaliland Flag: "Somaliland flag, three equal horizontal stripes: top stripe is Forest Green with white Arabic calligraphy text, middle stripe is Pure White with a sharp Black five-pointed star in the absolute center, bottom stripe is Bright Red. The stripes must be straight and clearly separated."
                                      - Somalia Flag: "Somalia flag, solid Sky Blue background, with a single large, symmetrical White five-pointed star positioned in the exact center."
                                   5. LANGUAGE: If the input is in English, don't translate; instead, ENHANCE it technically for a masterpiece image while keeping the core meaning 100% identical.
                                   
                                   INPUT TEXT: "${prompt}"
                                   FINAL ENGLISH PROMPT:`
                        }]
                    }],
                    tools: [{
                        google_search_retrieval: {}
                    }]
                })
            });

            const transData = await translateResponse.json();
            let englishPrompt = prompt; // Fallback to raw if translation fails
            
            if (transData.candidates && transData.candidates[0].content.parts[0].text) {
                let rawOutput = transData.candidates[0].content.parts[0].text;
                rawOutput = rawOutput.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '');
                rawOutput = rawOutput.replace(/\*\*/g, '').replace(/\*/g, '');
                rawOutput = rawOutput.replace(/^(here is the translation:|translation:)\s*/i, '');
                englishPrompt = rawOutput.trim();
            }

            // Step 2: Apply Style Enrichment AFTER translation
            const stylePrompts = {
                realistic: "photorealistic, highly detailed, 8k, masterpiece, cinematic lighting, sharp focus",
                cinematic: "cinematic still, dramatic lighting, movie atmosphere, stunning color grading",
                "3d": "3d render, octane render, unreal engine 5 style, volumetric lighting, hyper-detailed",
                anime: "high quality anime, studio ghibli style, vibrant, detailed lineart",
                digital: "digital illustration, trending on artstation, vivid, professional art"
            };
            
            const finalPrompt = `${englishPrompt}, ${stylePrompts[selectedStyle]}`;
            console.log("AI ArtGen - Final Optimized Prompt:", finalPrompt);

            const seed = Math.floor(Math.random() * 1000000);
            
            let imageUrl = "";
            if (selectedModel === 'flux') {
                imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
            } else {
                imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=searchgpt`;
            }
            
            resultContainer.classList.remove('hidden');
            outputImg.classList.add('skeleton');
            outputImg.style.minHeight = "400px";
            outputImg.style.width = "100%";

            // Hide initial greeting bubble for a cleaner chat experience
            const greeting = document.getElementById('art-greeting-bubble');
            if (greeting) greeting.style.display = 'none';

            const timeout = setTimeout(() => {
                if (btn.disabled) {
                    btn.disabled = false;
                    btn.querySelector('.send-svg').classList.remove('hidden');
                    btn.querySelector('.btn-loader').classList.add('hidden');
                    outputImg.classList.remove('skeleton');
                    showToast("Server is busy. Please try again.", "error");
                }
            }, 45000); // 45 seconds for image gen

            outputImg.onload = () => {
                clearTimeout(timeout);
                outputImg.classList.remove('skeleton');
                outputImg.style.minHeight = "auto";
                btn.disabled = false;
                btn.querySelector('.send-svg').classList.remove('hidden');
                btn.querySelector('.btn-loader').classList.add('hidden');
                showToast("Artwork generated!", "success");
            };

            outputImg.onerror = () => {
                clearTimeout(timeout);
                outputImg.classList.remove('skeleton');
                btn.disabled = false;
                btn.querySelector('.send-svg').classList.remove('hidden');
                btn.querySelector('.btn-loader').classList.add('hidden');
                showToast("AI model busy or prompt rejected. Try a simpler prompt.", "error");
            };

            // Enable CORS support for pixel extraction
            outputImg.crossOrigin = "anonymous";
            outputImg.src = imageUrl;
            
            // Cross-tool dynamic enhancement pipeline
            const btnEnhance = document.getElementById('btn-enhance-from-art');
            btnEnhance.onclick = (e) => {
                e.preventDefault();
                try {
                    // Draw raw rendered image to canvas for safe, instant blob acquisition
                    const canvas = document.createElement('canvas');
                    canvas.width = outputImg.naturalWidth || 1024;
                    canvas.height = outputImg.naturalHeight || 1024;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(outputImg, 0, 0);
                    
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            showToast("Khalad ayaa dhacay intii la akhriyay sawirka!", "error");
                            return;
                        }
                        // 1. Inject into stream buffer
                        enhancerPendingBlob = blob;
                        
                        // 2. Mount onto Enhancer stage
                        enhImgBefore.src = URL.createObjectURL(blob);
                        enhUploadZone.classList.add('hidden');
                        enhPreview.classList.remove('hidden');
                        document.getElementById('enh-filename').textContent = "ai_generated_art.png";
                        document.getElementById('enh-controls').classList.remove('hidden');
                        
                        // Clear residual enhancer cached view from past iterations
                        enhImgAfter.src = '';
                        enhImgAfter.classList.add('hidden');
                        enhSkeleton.classList.remove('hidden');
                        document.getElementById('enh-result-controls').classList.add('hidden');

                        // 3. Smooth programmatic workspace navigation
                        const targetNav = document.querySelector('.tool-nav-btn[data-target="enhancer"]');
                        if (targetNav) targetNav.click();

                        showToast("Art-kii waa loo soo gudbiyay Enhancer-ka! Guji 'Enhance Quality'!", "success");
                    }, 'image/png');

                } catch (err) {
                    console.error("Canvas extraction failure: ", err);
                    showToast("Waqtigan ma dhici karto in sawirkan toos loo beddelo. Fadlan marka hore soo deji!", "error");
                }
            };

            btnDownload.onclick = (e) => {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = imageUrl;
                link.download = `maareeye_art_${Date.now()}.jpg`;
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

        } catch (error) {
            console.error("Art Gen Error:", error);
            showToast("Failed to generate art. Please try a simpler prompt.", "error");
            btn.disabled = false;
            btn.querySelector('.send-svg').classList.remove('hidden');
            btn.querySelector('.btn-loader').classList.add('hidden');
        }
    }

    // AI Writer Chat Box Utilities
    const chatBox = document.getElementById('writer-chat-box');
    const writerTextarea = document.getElementById('article-topic');

    // Auto-grow textarea as user types (Writer)
    if (writerTextarea) {
        writerTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Allow Enter key to send, Shift+Enter for new line
        writerTextarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('btn-process-writer').click();
            }
        });
    }

    // Auto-grow textarea as user types (Art Generator)
    const artTextarea = document.getElementById('art-prompt');
    if (artTextarea) {
        artTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Allow Enter key to send, Shift+Enter for new line
        artTextarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('btn-process-art').click();
            }
        });
    }


    function appendChatMessage(sender, content, isTyping = false) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}-bubble`;
        
        let avatarSvg = '';
        let senderDisplayName = '';
        
        if (sender === 'ai') {
            senderDisplayName = 'MAAREEYE AI';
            avatarSvg = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`;
        } else {
            senderDisplayName = 'ADIGA';
            avatarSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        }

        bubble.innerHTML = `
            <div class="chat-avatar">${avatarSvg}</div>
            <div class="chat-content-wrapper">
                <span class="sender-name">${senderDisplayName}</span>
                <div class="chat-message-text">
                    ${isTyping ? `
                        <div class="typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    ` : content}
                </div>
            </div>
        `;
        
        chatBox.appendChild(bubble);
        chatBox.scrollTop = chatBox.scrollHeight;
        return bubble;
    }

    // Bubble Export Helpers
    window.MAAREEYE_EXPORT = {
        copy: (elementId) => {
            const text = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(text).then(() => {
                showToast(translations[currentLang].msg_copy_success);
            });
        },
        pdf: (elementId, topic) => {
            const original = document.getElementById(elementId);
            if (!original) return;

            // Extract clean content HTML
            const contentHTML = original.innerHTML;

            // Construct an isolated, printable HTML string with its own dedicated high-contrast stylesheet
            const printableHTML = `
                <div style="
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    color: #1e293b;
                    background-color: #ffffff;
                    padding: 30px;
                    line-height: 1.6;
                    font-size: 14px;
                ">
                    <style>
                        /* Force first element to start exactly at the top */
                        :first-child { 
                            margin-top: 0 !important; 
                        }
                        h1, h2, h3, h4 { 
                            color: #0d9488 !important; 
                            border-bottom: 1px solid #e2e8f0 !important; 
                            padding-bottom: 8px !important; 
                            margin-top: 22px !important; 
                            margin-bottom: 12px !important;
                            font-weight: 700 !important;
                        }
                        p { 
                            margin-bottom: 14px !important; 
                            color: #334155 !important; 
                        }
                        ul, ol { 
                            margin-left: 20px !important; 
                            margin-bottom: 16px !important; 
                            padding-left: 10px !important;
                        }
                        li { 
                            margin-bottom: 8px !important; 
                            color: #334155 !important; 
                        }
                        strong { 
                            color: #0f172a !important; 
                            font-weight: 600 !important;
                        }
                    </style>
                    ${contentHTML}
                </div>
            `;

            const opt = {
                margin: 0.5,
                filename: `maareeye_${topic.replace(/\s+/g, '_')}_${Date.now()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true, 
                    backgroundColor: '#ffffff',
                    scrollX: 0, // FIX: Prevents offset shifted by horizontal window scroll
                    scrollY: 0  // FIX: Prevents blank vertical spaces caused by window scrollY offset
                },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            showToast("Downloading printable PDF...", "success");
            
            // Directly pass the self-contained HTML string to bypass all host DOM issues
            html2pdf().set(opt).from(printableHTML).save();
        },
        word: (elementId, topic) => {
            const content = document.getElementById(elementId).innerHTML;
            const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Maareeye Export</title></head><body>";
            const footer = "</body></html>";
            const sourceHTML = header + content + footer;
            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            const link = document.createElement("a");
            link.href = source;
            link.download = `maareeye_${topic.replace(/\s+/g, '_')}_${Date.now()}.doc`;
            link.click();
            showToast("Word document downloaded!", "success");
        }
    };

    // Safe ChatGPT-like HTML Typewriter Reveal
    function streamTextToContainer(container, fullHTML, callback) {
        container.innerHTML = fullHTML;
        
        const cursor = document.createElement('span');
        cursor.className = "chat-cursor";
        
        const textNodes = [];
        function traverse(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.nodeValue.trim().length > 0) {
                    textNodes.push({
                        node: node,
                        fullText: node.nodeValue,
                    });
                    node.nodeValue = ""; // Temporarily clear text
                }
            } else {
                for (let child of node.childNodes) {
                    traverse(child);
                }
            }
        }

        function playTypeSound() {
            try {
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                if (audioCtx.state === 'suspended') audioCtx.resume();

                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.type = 'sine';
                // Randomize pitch slightly for a more organic 'digital' feel
                osc.frequency.setValueAtTime(140 + Math.random() * 60, audioCtx.currentTime);
                
                gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start();
                osc.stop(audioCtx.currentTime + 0.04);
            } catch (e) {}
        }
        
        traverse(container);
        
        let nodeIndex = 0;
        let charIndex = 0;
        const chatBox = document.getElementById('writer-chat-box');

        // Re-insert cursor inside the first available element or container itself
        container.appendChild(cursor);
        
        function typeNext() {
            if (nodeIndex < textNodes.length) {
                const nodeObj = textNodes[nodeIndex];
                
                // Safely place cursor right after this text node's parent
                if (nodeObj.node.parentNode) {
                    nodeObj.node.parentNode.appendChild(cursor);
                }
                
                if (charIndex < nodeObj.fullText.length) {
                    // Take 3-5 characters at a time for that real token streaming speed!
                    const chunkSize = Math.floor(Math.random() * 3) + 2; 
                    const chunk = nodeObj.fullText.substr(charIndex, chunkSize);
                    
                    nodeObj.node.nodeValue += chunk;
                    charIndex += chunk.length;
                    
                    // Play the 'cod yar' (small sound) for every chunk typed
                    playTypeSound();
                    
                    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
                    
                    // Fast buttery stream delay
                    setTimeout(typeNext, Math.random() * 10 + 5); 
                } else {
                    nodeIndex++;
                    charIndex = 0;
                    setTimeout(typeNext, 10);
                }
            } else {
                cursor.remove();
                if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
                if (callback) callback();
            }
        }
        
        typeNext();
    }

    async function processWriter() {
        const btn = document.getElementById('btn-process-writer');
        const topicInput = document.getElementById('article-topic');

        const topic = topicInput.value.trim();
        if (!topic) {
            showToast("Fadlan mawduuca qor...", "error");
            return;
        }

        // Initialize/Resume Audio Context on user click to comply with browser policies
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();

        // Disable and show loading in chat input
        btn.disabled = true;
        btn.querySelector('.send-svg').classList.add('hidden');
        btn.querySelector('.btn-loader').classList.remove('hidden');

        // 1. Append User Bubble
        appendChatMessage('user', topic);

        // Clear input
        topicInput.value = '';
        topicInput.style.height = 'auto';

        // 2. Append AI Typing Indicator
        const typingBubble = appendChatMessage('ai', '', true);

        try {
            const GEMINI_API_KEY = "AIzaSyBB2of85F6B7gBKLJ9szComdVmn-BcR_pA";
            
            async function callGemini(modelName) {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Respond in the SAME language as the topic provided below. 
                                       - If the topic is in Somali, write the entire article in Somali. 
                                       - If the topic is in English, write the entire article in English.
                                       
                                       Write a highly professional, well-structured, and detailed article about: "${topic}".
                                       Create an engaging title and introduction.
                                       Break it down into distinct sections with HTML tags (<h2>, <p>, <ul>, <li>, <strong>). 
                                       Keep the response formatted in valid HTML markup. 
                                       CRITICAL: DO NOT use any inline styling (style="..." or classes) or background colors in the HTML. Keep elements clean and semantic.
                                       Add a brief "Sources/Summary" at the end.`
                            }]
                        }]
                    })
                });
                return await response.json();
            }

            let data = await callGemini('gemini-1.5-flash');

            if (data.error && (data.error.message.includes("not found") || data.error.message.includes("not supported"))) {
                const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
                const listData = await listResponse.json();
                if (listData.models && listData.models.length > 0) {
                    const fallbackModel = listData.models.find(m => m.supportedGenerationMethods.includes("generateContent"));
                    if (fallbackModel) {
                        const modelId = fallbackModel.name.split('/').pop();
                        data = await callGemini(modelId);
                    }
                }
            }

            if (data.error) throw new Error(data.error.message);
            if (!data.candidates || data.candidates.length === 0) throw new Error("AI couldn't process.");

            let articleHTML = data.candidates[0].content.parts[0].text;

            // PRE-PROCESSING SAFETY FILTERS:
            // Trim leading/trailing spaces to help anchor matchers
            articleHTML = articleHTML.trim();

            // 1. Bulletproof removal of ANY Markdown code fences (e.g., ```html or ```)
            articleHTML = articleHTML.replace(/```html/gi, '')
                                     .replace(/```/g, '')
                                     .trim();

            // 2. FORCE STRIP any inline styles or custom background attributes injected by AI to maintain dark theme!
            articleHTML = articleHTML.replace(/\sstyle\s*=\s*(["'])(.*?)\1/gi, '')
                                     .replace(/\sbgcolor\s*=\s*(["'])(.*?)\1/gi, '');

            const bubbleId = `article-out-${Date.now()}`;

            // 3. Set up containers and Start the typewriter stream!
            const contentContainer = typingBubble.querySelector('.chat-message-text');
            contentContainer.innerHTML = `<div id="${bubbleId}"></div>`;
            
            const renderBox = document.getElementById(bubbleId);
            
            // Call streaming text reveal!
            streamTextToContainer(renderBox, articleHTML, () => {
                // 4. Once streaming finishes, add Action toolbar nicely
                const actionsDiv = document.createElement('div');
                actionsDiv.className = "chat-bubble-actions";
                actionsDiv.style.animation = "slideUp 0.3s ease";
                actionsDiv.innerHTML = `
                    <button class="btn btn-secondary btn-sm" onclick="MAAREEYE_EXPORT.copy('${bubbleId}')" title="Copy Article">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="MAAREEYE_EXPORT.pdf('${bubbleId}', '${topic.substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}')">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        PDF
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="MAAREEYE_EXPORT.word('${bubbleId}', '${topic.substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}')">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Word
                    </button>
                `;
                contentContainer.appendChild(actionsDiv);
                
                showToast("Maqaalkii waa diyaar!", "success");
                chatBox.scrollTop = chatBox.scrollHeight;
            });

        } catch (error) {
            console.error("Writer Error:", error);
            typingBubble.querySelector('.chat-message-text').innerHTML = `<p style="color: #ef4444;">Cilad ayaa dhacday: Waan ku guuldareystay inaan maqaalka soo saaro. Fadlan mar kale isku day ama qor mawduuc kale.</p>`;
        } finally {
            // Re-enable chat inputs
            btn.disabled = false;
            btn.querySelector('.send-svg').classList.remove('hidden');
            btn.querySelector('.btn-loader').classList.add('hidden');
        }
    }

    // Copy Summarizer
    document.getElementById('btn-copy-sum').addEventListener('click', () => {
        const text = document.getElementById('sum-text-output').innerText;
        navigator.clipboard.writeText(text).then(() => {
            showToast(translations[currentLang].msg_copy_success);
        });
    });

    // Processing Logic (Generic)
    function simulateProcessing(type) {
        if (type === 'remover') {
            processImage();
            return;
        }
        if (type === 'ocr') {
            processOCR();
            return;
        }
        if (type === 'converter') {
            processConversion();
            return;
        }
        if (type === 'writer') {
            processWriter();
            return;
        }
        if (type === 'art') {
            processArt();
            return;
        }
        if (type === 'qr') {
            processQR();
            return;
        }
        if (type === 'compressor') {
            processCompression();
            return;
        }
        if (type === 'summarizer') {
            processSummarizer();
            return;
        }
        if (type === 'scanner') {
            processScanner();
            return;
        }
        if (type === 'enhancer') {
            processEnhanceImage();
            return;
        }

        const processingView = document.getElementById('processing-view');
        const resultView = document.getElementById('result-view');

        processingView.classList.remove('hidden');
        setTimeout(() => {
            processingView.classList.add('hidden');
            resultView.classList.remove('hidden');
        }, 2500);
    }

    document.getElementById('file-input-scanner').addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            document.getElementById('scanner-filename').innerText = this.files[0].name;
            document.getElementById('scanner-controls').classList.remove('hidden');
        }
    });

    document.getElementById('btn-process-conv').addEventListener('click', () => simulateProcessing('converter'));
    document.getElementById('btn-process-rmv').addEventListener('click', () => simulateProcessing('remover'));
    document.getElementById('btn-process-ocr').addEventListener('click', () => simulateProcessing('ocr'));
    document.getElementById('btn-process-writer').addEventListener('click', () => simulateProcessing('writer'));
    document.getElementById('btn-process-art').addEventListener('click', () => simulateProcessing('art'));
    document.getElementById('btn-process-qr').addEventListener('click', () => simulateProcessing('qr'));
    document.getElementById('btn-process-comp').addEventListener('click', () => simulateProcessing('compressor'));
    document.getElementById('btn-process-sum').addEventListener('click', () => simulateProcessing('summarizer'));
    document.getElementById('btn-process-scanner').addEventListener('click', () => simulateProcessing('scanner'));
    document.getElementById('btn-process-enh').addEventListener('click', () => simulateProcessing('enhancer'));

    // Reset Workspace
    document.getElementById('btn-reset-ws').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('result-view').classList.add('hidden');
        
        // Reset Remover Preview
        rmvUploadZone.classList.remove('hidden');
        rmvPreview.classList.add('hidden');
        rmvImgBefore.src = '';
        rmvImgAfter.src = '';
        rmvImgAfter.classList.add('hidden');
        rmvSkeleton.classList.remove('hidden');

        // Reset Enhancer Preview
        enhUploadZone.classList.remove('hidden');
        enhPreview.classList.add('hidden');
        enhImgBefore.src = '';
        enhImgAfter.src = '';
        enhImgAfter.classList.add('hidden');
        enhSkeleton.classList.remove('hidden');
        document.getElementById('enh-result-controls').classList.add('hidden');
        document.getElementById('enh-controls').classList.add('hidden');

        // Reset OCR
        document.getElementById('ocr-upload').classList.remove('hidden');
        document.getElementById('ocr-result-container').classList.add('hidden');
        document.getElementById('ocr-text-output').value = '';

        // Reset Converter
        document.getElementById('conv-upload').classList.remove('hidden');
        document.getElementById('conv-result-container').classList.add('hidden');

        // Reset Writer
        const chatBoxElement = document.getElementById('writer-chat-box');
        if (chatBoxElement) {
            chatBoxElement.innerHTML = `
                <div class="chat-bubble ai-bubble">
                    <div class="chat-avatar">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <div class="chat-content-wrapper">
                        <span class="sender-name">MAAREEYE AI</span>
                        <div class="chat-message-text">
                            <p>Maareeye AI Writer waa kuu diyaar! Fadlan hoos ku qor mawduuca ama faahfaahinta maqaalka aad doonayso inaan kuu diyaariyo.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('article-topic').value = '';

        // Reset Art Gen
        document.getElementById('art-result-container').classList.add('hidden');
        document.getElementById('art-prompt').value = '';

        // Reset QR Gen
        document.getElementById('qr-result-container').classList.add('hidden');
        document.getElementById('qr-text').value = '';

        // Reset Compressor
        document.getElementById('comp-upload').classList.remove('hidden');
        document.getElementById('comp-result-container').classList.add('hidden');

        // Reset Summarizer
        document.getElementById('sum-result-container').classList.add('hidden');
        document.getElementById('sum-url').value = '';

        // Reset Scanner
        document.getElementById('scanner-upload').classList.remove('hidden');
        document.getElementById('scanner-result-container').classList.add('hidden');

        // Hide controls and clear inputs
        document.getElementById('conv-controls').classList.add('hidden');
        document.getElementById('rmv-controls').classList.add('hidden');
        document.getElementById('ocr-controls').classList.add('hidden');
        
        Object.values(fileInputs).forEach(input => input.value = '');
    });

    // ==========================================================================
    // AI BUSINESS HUB LOGIC
    // ==========================================================================
    const btnConfigN8n = document.getElementById('btn-configure-n8n');
    const n8nConfigPanel = document.getElementById('n8n-config-panel');
    const n8nWebhookInput = document.getElementById('n8n-webhook-url');
    const btnSaveN8n = document.getElementById('btn-save-n8n');
    const btnTestN8n = document.getElementById('btn-test-n8n');

    // Load saved webhook from localStorage
    const savedWebhook = localStorage.getItem('maareeye_n8n_webhook');
    if (savedWebhook) {
        n8nWebhookInput.value = savedWebhook;
    }

    // Toggle Config Panel
    btnConfigN8n.addEventListener('click', () => {
        n8nConfigPanel.classList.toggle('hidden');
        btnConfigN8n.textContent = n8nConfigPanel.classList.contains('hidden') ? 'Configure Webhook' : 'Hide Settings';
    });

    // Save Webhook
    btnSaveN8n.addEventListener('click', () => {
        const url = n8nWebhookInput.value.trim();
        if (url) {
            localStorage.setItem('maareeye_n8n_webhook', url);
            showToast("Webhook-ga n8n waa la kaydiyay!", "success");
        } else {
            showToast("Fadlan geli URL sax ah.", "error");
        }
    });

    // Test Webhook
    btnTestN8n.addEventListener('click', async () => {
        const url = n8nWebhookInput.value.trim();
        if (!url) return showToast("Geli URL ka hor intaanad tijaabin.", "error");

        btnTestN8n.textContent = "Testing...";
        btnTestN8n.disabled = true;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    event: "test_connection", 
                    source: "Maareeye AI",
                    timestamp: new Date().toISOString() 
                })
            });

            if (response.ok) {
                showToast("Connection Successful! n8n ayaa helay xogta.", "success");
            } else {
                showToast(`Error: ${response.status} - Hubi URL-kaaga.`, "error");
            }
        } catch (err) {
            showToast("Connection Failed! Hubi in n8n Webhook uu 'Active' yahay.", "error");
        } finally {
            btnTestN8n.textContent = "Test Connection";
            btnTestN8n.disabled = false;
        }
    });

    // Launch Receipt Scanner (Points to Scanner tool for now)
    document.querySelector('#card-receipt-scanner button').addEventListener('click', () => {
        const scannerTab = document.querySelector('.tool-nav-btn[data-target="scanner"]');
        if (scannerTab) {
            scannerTab.click();
            showToast("Fadlan soo geli rasiidhka si AI-gu xogta ugala baxo.", "info");
        }
    });
});
