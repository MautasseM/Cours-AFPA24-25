<script>
        const PHI = 1.618033988749895;
        
        const colorPsychology = {
            corporate: {
                description: "ألوان تعكس المهنية والثقة",
                primary: ['#0047AB', '#00529B', '#003366'],
                secondary: ['#4A4A4A', '#2C3E50', '#34495E'],
                accent: ['#E74C3C', '#27AE60', '#F1C40F']
            },
            ecommerce: {
                description: "ألوان تحفز على الشراء وتخلق الثقة",
                primary: ['#27AE60', '#2ECC71', '#16A085'],
                secondary: ['#E67E22', '#F39C12', '#D35400'],
                accent: ['#E74C3C', '#C0392B', '#CD201F']
            },
            blog: {
                description: "ألوان مريحة للقراءة وسهلة على العين",
                primary: ['#3498DB', '#2980B9', '#1ABC9C'],
                secondary: ['#95A5A6', '#7F8C8D', '#BDC3C7'],
                accent: ['#E74C3C', '#9B59B6', '#F1C40F']
            },
            portfolio: {
                description: "ألوان تبرز المحتوى البصري",
                primary: ['#2C3E50', '#34495E', '#1ABC9C'],
                secondary: ['#ECF0F1', '#BDC3C7', '#95A5A6'],
                accent: ['#E74C3C', '#3498DB', '#F1C40F']
            }
        };

        // تحويل HEX إلى RGB
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        // تحويل RGB إلى HSL
        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return { h: h * 360, s: s * 100, l: l * 100 };
        }

        // توليد لون متناسق
        function generateComplementaryColor(hex) {
            const rgb = hexToRgb(hex);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            hsl.h = (hsl.h + 180) % 360;
            return hslToHex(hsl.h, hsl.s, hsl.l);
        }

        // توليد لون متناغم
        function generateAnalogousColor(hex) {
            const rgb = hexToRgb(hex);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            hsl.h = (hsl.h + 30) % 360;
            return hslToHex(hsl.h, hsl.s, hsl.l);
        }

        // حساب نسبة التباين
        function calculateContrast(color1, color2) {
            const rgb1 = hexToRgb(color1);
            const rgb2 = hexToRgb(color2);
            
            const l1 = calculateRelativeLuminance(rgb1);
            const l2 = calculateRelativeLuminance(rgb2);
            
            const brightest = Math.max(l1, l2);
            const darkest = Math.min(l1, l2);
            
            return (brightest + 0.05) / (darkest + 0.05);
        }

        // حساب السطوع النسبي
        function calculateRelativeLuminance(rgb) {
            const rsRGB = rgb.r / 255;
            const gsRGB = rgb.g / 255;
            const bsRGB = rgb.b / 255;

            const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
            const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
            const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        // تحويل HSL إلى HEX
        function hslToHex(h, s, l) {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        }

        // حساب النسبة الذهبية
        function calculateGoldenRatio(dimension) {
            return {
                primary: dimension / PHI,
                secondary: dimension - (dimension / PHI)
            };
        }

        // تحديث التصميم
        function updateDesign() {
            const websiteType = document.getElementById('websiteType').value;
            const primaryColor = document.getElementById('primaryColor').value;
            
            // توليد الألوان المتناسقة
            const secondaryColor = generateComplementaryColor(primaryColor);
            const accentColor = generateAnalogousColor(primaryColor);
            
            // تحديث عرض الألوان
            updateColorPreviews(primaryColor, secondaryColor, accentColor);
            
            // تحديث معلومات علم نفس الألوان
            updateColorPsychologyInfo(websiteType);
            
            // حساب وعرض التباين
            updateContrastInfo(primaryColor, secondaryColor);
            
            // تحديث تخطيط النسبة الذهبية
            updateGoldenRatioLayout();
            
            // تحديث المعاينة
            updatePreview(primaryColor, secondaryColor, accentColor);
        }

        function updateColorPreviews(primary, secondary, accent) {
            document.getElementById('primaryColorPreview').style.backgroundColor = primary;
            document.getElementById('secondaryColorPreview').style.backgroundColor = secondary;
            document.getElementById('accentColorPreview').style.backgroundColor = accent;
            
            document.getElementById('primaryColorPreview').textContent = primary;
            document.getElementById('secondaryColorPreview').textContent = secondary;
            document.getElementById('accentColorPreview').textContent = accent;
        }

        function updateColorPsychologyInfo(websiteType) {
            const info = colorPsychology[websiteType];
            document.getElementById('colorPsychologyInfo').innerHTML = `
                <h3>معلومات علم نفس الألوان</h3>
                <p>${info.description}</p>
            `;
        }

        function updateContrastInfo(color1, color2) {
            const contrast = calculateContrast(color1, color2);
            const contrastInfo = document.getElementById('contrastInfo');
            const passes = contrast >= 4.5;
            
            contrastInfo.innerHTML = `
                <div>نسبة التباين: ${contrast.toFixed(2)}</div>
                <div class="contrast-badge ${passes ? 'contrast-pass' : 'contrast-fail'}">
                    ${passes ? 'متوافق مع معايير WCAG' : 'غير متوافق مع معايير WCAG'}
                </div>
            `;
        }

        function updateGoldenRatioLayout() {
            const container = document.getElementById('goldenRatioLayout');
            const width = container.offsetWidth;
            const ratios = calculateGoldenRatio(width);
            
            container.innerHTML = `
                <div class="layout-section">
                    <h3>التقسيم الأفقي</h3>
                    <p>القسم الرئيسي: ${Math.round(ratios.primary)}px</p>
                    <p>القسم الثانوي: ${Math.round(ratios.secondary)}px</p>
                </div>
            `;
        }

        function updatePreview(primary, secondary, accent) {
            const preview = document.getElementById('designPreview');
            const width = preview.offsetWidth;
            const ratios = calculateGoldenRatio(width);
            
            preview.style.cssText = `
                background-color: ${secondary};
                padding: 20px;
                min-height: 300px;
                display: grid;
                grid-template-columns: ${ratios.primary}px ${ratios.secondary}px;
                gap: 20px;
            `;
            
            preview.innerHTML = `
                <div style="background-color: ${primary}; padding: 20px; color: white; border-radius: 8px;">
                    <h3>المحتوى الرئيسي</h3>
                    <p>عرض القسم: ${Math.round(ratios.primary)}px</p>
                </div>
                <div style="background-color: ${accent}; padding: 20px; color: white; border-radius: 8px;">
                    <h3>الشريط الجانبي</h3>
                    <p>عرض القسم: ${Math.round(ratios.secondary)}px</p>
                </div>
            `;
        }

        // تهيئة التطبيق
        document.addEventListener('DOMContentLoaded', () => {
            updateDesign();
            window.addEventListener('resize', updateDesign);
        });
    </script>