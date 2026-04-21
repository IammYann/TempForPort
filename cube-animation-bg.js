/**
 * ==================== CUBE BACKGROUND ANIMATION ====================
 * Full-page Rubik's Cube scrolling background animation
 * The cube solves as the entire page is scrolled
 */

class CubeBackgroundAnimation {
    constructor(config = {}) {
        this.config = {
            canvasId: config.canvasId || 'sequenceCanvas',
            imageDirectory: config.imageDirectory || 'assets/cube-sequence/',
            imagePrefix: config.imagePrefix || 'ezgif-frame-',
            imageFormat: config.imageFormat || '.png',
            totalImages: config.totalImages || 240,
            ...config
        };

        this.canvas = null;
        this.ctx = null;
        this.images = [];
        this.isPreloaded = false;
        this.currentFrame = 0;
        this.scrollProgress = 0;
        this.documentHeight = 0;

        this.init();
    }

    init() {
        this.setupCanvas();
        this.calculateDocumentHeight();
        this.preloadImages();
        this.setupScrollListener();
        this.setupResizeListener();
        
        console.log('🎬 Cube Background Animation initialized');
    }

    setupCanvas() {
        this.canvas = document.getElementById(this.config.canvasId);
        if (!this.canvas) {
            console.error(`❌ Canvas with ID "${this.config.canvasId}" not found!`);
            return;
        }

        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.resizeCanvas();

        console.log(`✅ Canvas setup complete: ${this.canvas.width}x${this.canvas.height}`);
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;

        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';

        this.ctx.scale(dpr, dpr);

        // Redraw current frame after resize
        if (this.isPreloaded) {
            this.drawFrame(Math.round(this.currentFrame));
        }
    }

    calculateDocumentHeight() {
        // Use setImmediate to ensure DOM is ready
        setTimeout(() => {
            this.documentHeight = document.documentElement.scrollHeight;
            console.log(`📏 Document height: ${this.documentHeight}px`);
        }, 100);
    }

    preloadImages() {
        console.log('📦 Starting image preload...');
        
        let loadedCount = 0;
        const loadingStartTime = performance.now();

        this.images = new Array(this.config.totalImages);

        const imagePromises = Array.from(
            { length: this.config.totalImages },
            (_, index) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    const paddedIndex = String(index + 1).padStart(3, '0');
                    const imagePath = `${this.config.imageDirectory}${this.config.imagePrefix}${paddedIndex}${this.config.imageFormat}`;
                    
                    img.onload = () => {
                        this.images[index] = img;
                        loadedCount++;
                        
                        if (loadedCount % 30 === 0) {
                            console.log(`📸 Loaded ${loadedCount}/${this.config.totalImages} images`);
                        }
                        
                        resolve(img);
                    };
                    
                    img.onerror = () => {
                        console.warn(`⚠️ Failed to load image: ${imagePath}`);
                        this.images[index] = null;
                        reject(new Error(`Failed to load ${imagePath}`));
                    };
                    
                    img.src = imagePath;
                });
            }
        );

        Promise.allSettled(imagePromises)
            .then(() => {
                const loadingTime = (performance.now() - loadingStartTime).toFixed(2);
                console.log(`✨ All images preloaded in ${loadingTime}ms`);
                
                this.isPreloaded = true;
                this.drawFrame(0);
            })
            .catch(error => {
                console.error('❌ Error during image preloading:', error);
            });
    }

    drawFrame(frameIndex) {
        frameIndex = Math.max(0, Math.min(frameIndex, this.config.totalImages - 1));
        
        const image = this.images[frameIndex];
        
        if (!image) {
            // Draw dark background if image not loaded
            this.ctx.fillStyle = '#000000';
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            return;
        }

        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Calculate dimensions to cover viewport
        const imgAspect = image.width / image.height;
        const canvasAspect = window.innerWidth / window.innerHeight;
        
        let drawWidth, drawHeight, drawX, drawY;

        if (imgAspect > canvasAspect) {
            drawHeight = window.innerHeight;
            drawWidth = drawHeight * imgAspect;
            drawX = (window.innerWidth - drawWidth) / 2;
            drawY = 0;
        } else {
            drawWidth = window.innerWidth;
            drawHeight = drawWidth / imgAspect;
            drawX = 0;
            drawY = (window.innerHeight - drawHeight) / 2;
        }

        try {
            this.ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        } catch (error) {
            console.error('Error drawing frame:', error);
        }
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (!this.isPreloaded) return;

            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const totalScrollable = documentHeight - windowHeight;

            // Calculate scroll progress (0 to 1)
            this.scrollProgress = totalScrollable > 0 ? scrollTop / totalScrollable : 0;

            // Map scroll progress to frame number
            this.currentFrame = this.scrollProgress * (this.config.totalImages - 1);

            // Update canvas
            this.drawFrame(Math.round(this.currentFrame));
        });

        console.log('✅ Scroll listener setup complete');
    }

    setupResizeListener() {
        let resizeTimeout;

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                this.calculateDocumentHeight();
                
                console.log('🔄 Canvas resized and animation refreshed');
            }, 150);
        });

        console.log('✅ Window resize listener setup complete');
    }

    getState() {
        return {
            isPreloaded: this.isPreloaded,
            currentFrame: Math.round(this.currentFrame),
            scrollProgress: (this.scrollProgress * 100).toFixed(2) + '%',
            canvasResolution: `${this.canvas.width}x${this.canvas.height}`,
            imagesLoaded: this.images.filter(img => img !== null).length
        };
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCubeBackground);
} else {
    initializeCubeBackground();
}

let cubeBackground;

function initializeCubeBackground() {
    cubeBackground = new CubeBackgroundAnimation({
        canvasId: 'sequenceCanvas',
        imageDirectory: 'assets/cube-sequence/',
        imagePrefix: 'ezgif-frame-',
        imageFormat: '.png',
        totalImages: 240
    });

    window.cubeBackground = cubeBackground;

    // Debug info after load
    setTimeout(() => {
        console.log('📊 Background Animation State:', cubeBackground.getState());
    }, 2000);

    // Debug controls
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'd') {
            console.log('📊 Current State:', cubeBackground.getState());
        }
    });
}
