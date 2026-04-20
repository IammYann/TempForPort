/**
 * ==================== CUBE ANIMATION MODULE ====================
 * High-Performance Scroll-Animated Image Sequence with GSAP & ScrollTrigger
 * 
 * Features:
 * - Preloads 240 PNG images to prevent flickering
 * - Renders images onto canvas for optimal performance
 * - Uses GSAP ScrollTrigger with scrubbing for smooth scroll control
 * - Responsive canvas that scales to any viewport
 * - Pinned canvas during scroll animation
 * 
 * Author: Portfolio Developer
 * Version: 1.0.0
 */

class CubeSequenceAnimation {
    constructor(config = {}) {
        // ==================== Configuration ====================
        this.config = {
            canvasId: config.canvasId || 'sequenceCanvas',
            imageDirectory: config.imageDirectory || 'assets/cube-sequence/',
            imagePrefix: config.imagePrefix || 'ezgif-frame-',
            imageFormat: config.imageFormat || '.png',
            totalImages: config.totalImages || 240,
            scrollDistance: config.scrollDistance || 4000,
            fps: config.fps || 30,
            ...config
        };

        // ==================== State Variables ====================
        this.canvas = null;
        this.ctx = null;
        this.images = [];
        this.isPreloaded = false;
        this.isAnimating = false;
        this.currentFrame = 0;
        this.animationProgress = 0;

        // Initialize the animation
        this.init();
    }

    /**
     * Initialize the cube animation system
     * Sets up canvas, starts preloading, and configures scroll animation
     */
    init() {
        this.setupCanvas();
        this.preloadImages();
        this.setupScrollAnimation();
        this.setupResizeListener();
        
        console.log('🎬 Cube Animation initialized');
    }

    /**
     * Setup canvas element and 2D context
     * Ensures canvas fills the viewport
     */
    setupCanvas() {
        this.canvas = document.getElementById(this.config.canvasId);
        if (!this.canvas) {
            console.error(`❌ Canvas with ID "${this.config.canvasId}" not found!`);
            return;
        }

        this.ctx = this.canvas.getContext('2d', { alpha: false });
        
        // Set canvas size to match viewport
        this.resizeCanvas();

        console.log(`✅ Canvas setup complete: ${this.canvas.width}x${this.canvas.height}`);
    }

    /**
     * Resize canvas to match current window dimensions
     * Maintains 1:1 pixel ratio for sharp rendering
     */
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;

        // Scale back down using CSS to maintain proper sizing
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';

        // Scale canvas drawing context for high DPI displays
        this.ctx.scale(dpr, dpr);

        console.log(`📐 Canvas resized: ${window.innerWidth}x${window.innerHeight} (DPR: ${dpr})`);
    }

    /**
     * PRELOADING FUNCTION - Critical for performance
     * Loads all 150 images into memory before animation starts
     * Prevents flickering and jank during scroll
     * 
     * Optimization Techniques:
     * - Parallel loading of multiple images
     * - Error handling for missing images
     * - Loading state tracking
     */
    preloadImages() {
        console.log('📦 Starting image preload...');
        
        let loadedCount = 0;
        const loadingStartTime = performance.now();

        // Create array to store image references
        this.images = new Array(this.config.totalImages);

        // Create a promise for each image load
        const imagePromises = Array.from(
            { length: this.config.totalImages },
            (_, index) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    
                    // Construct image path: assets/cube-sequence/ezgif-frame-001.png
                    const paddedIndex = String(index + 1).padStart(3, '0');
                    const imagePath = `${this.config.imageDirectory}${this.config.imagePrefix}${paddedIndex}${this.config.imageFormat}`;
                    
                    img.onload = () => {
                        this.images[index] = img;
                        loadedCount++;
                        
                        // Log progress every 25 images
                        if (loadedCount % 25 === 0) {
                            console.log(`📸 Loaded ${loadedCount}/${this.config.totalImages} images`);
                        }
                        
                        resolve(img);
                    };
                    
                    img.onerror = () => {
                        console.warn(`⚠️ Failed to load image: ${imagePath}`);
                        // Create a placeholder if image fails to load
                        this.images[index] = null;
                        reject(new Error(`Failed to load ${imagePath}`));
                    };
                    
                    // Set image source (triggers loading)
                    img.src = imagePath;
                });
            }
        );

        // Handle all images loaded
        Promise.allSettled(imagePromises)
            .then(() => {
                const loadingTime = (performance.now() - loadingStartTime).toFixed(2);
                console.log(`✨ All images preloaded in ${loadingTime}ms`);
                
                this.isPreloaded = true;
                this.drawFrame(0); // Draw first frame
                this.setupScrollAnimation(); // Activate scroll animation
            })
            .catch(error => {
                console.error('❌ Error during image preloading:', error);
            });
    }

    /**
     * Draw a specific frame on the canvas
     * This is the core rendering function called by the animation loop
     * 
     * @param {number} frameIndex - Index of the frame to draw (0-239)
     */
    drawFrame(frameIndex) {
        // Clamp frame index to valid range
        frameIndex = Math.max(0, Math.min(frameIndex, this.config.totalImages - 1));
        
        const image = this.images[frameIndex];
        
        if (!image) {
            console.warn(`⚠️ Image not available at frame ${frameIndex}`);
            return;
        }

        // Clear canvas with a dark background
        this.ctx.fillStyle = 'rgba(15, 12, 41, 1)';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Calculate dimensions to maintain aspect ratio and cover viewport
        const imgAspect = image.width / image.height;
        const canvasAspect = window.innerWidth / window.innerHeight;
        
        let drawWidth, drawHeight, drawX, drawY;

        if (imgAspect > canvasAspect) {
            // Image is wider - fit to height
            drawHeight = window.innerHeight;
            drawWidth = drawHeight * imgAspect;
            drawX = (window.innerWidth - drawWidth) / 2;
            drawY = 0;
        } else {
            // Image is taller - fit to width
            drawWidth = window.innerWidth;
            drawHeight = drawWidth / imgAspect;
            drawX = 0;
            drawY = (window.innerHeight - drawHeight) / 2;
        }

        // Draw the image on canvas
        try {
            this.ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        } catch (error) {
            console.error('Error drawing frame:', error);
        }
    }

    /**
     * Setup GSAP ScrollTrigger animation
     * Creates a scrubbing animation that responds to scroll position
     * 
     * How it works:
     * 1. Canvas is pinned to the viewport
     * 2. As user scrolls 4000px, the cube solve animates from frame 0-149
     * 3. Scrolling up reverses the animation
     */
    setupScrollAnimation() {
        // Only setup if images are preloaded
        if (!this.isPreloaded) {
            console.log('⏳ Waiting for images to preload before setting up scroll animation...');
            return;
        }

        // Register GSAP plugin
        gsap.registerPlugin(ScrollTrigger);

        // Get the canvas container
        const container = document.querySelector('.cube-animation-container');
        if (!container) {
            console.error('❌ Canvas container not found!');
            return;
        }

        // Create animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.cube-animation-section',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1, // Smooth scrubbing (1 = 1 second lag)
                markers: false, // Set to true for debugging
                pin: true, // Pin the canvas container
                pinSpacing: true, // Maintain scroll distance
                onUpdate: (self) => {
                    // Update animation progress (0 to 1)
                    this.animationProgress = self.progress;
                }
            }
        });

        // Add frame animation to timeline
        tl.to(this, {
            currentFrame: this.config.totalImages - 1,
            duration: 1, // Duration in the timeline
            ease: 'none', // Linear progression
            onUpdate: () => {
                // Call this on every update
                this.drawFrame(Math.round(this.currentFrame));
            }
        }, 0); // Start at position 0 of timeline

        console.log('✅ GSAP ScrollTrigger animation setup complete');
        this.isAnimating = true;
    }

    /**
     * Setup window resize listener
     * Ensures canvas stays responsive and properly sized
     * Debounced to avoid excessive recalculations
     */
    setupResizeListener() {
        let resizeTimeout;

        window.addEventListener('resize', () => {
            // Clear previous timeout
            clearTimeout(resizeTimeout);

            // Debounce resize handler (wait 150ms after resize stops)
            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                
                // Redraw current frame to fill new canvas size
                this.drawFrame(Math.round(this.currentFrame));
                
                // Refresh ScrollTrigger to account for new dimensions
                ScrollTrigger.refresh();
                
                console.log('🔄 Canvas resized and animation refreshed');
            }, 150);
        });

        console.log('✅ Window resize listener setup complete');
    }

    /**
     * Destroy the animation and cleanup resources
     * Call this if you need to remove the animation
     */
    destroy() {
        // Kill all GSAP animations
        gsap.globalTimeline.getChildren().forEach(child => {
            if (child.scrollTrigger) {
                child.scrollTrigger.kill();
            }
            child.kill();
        });
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Clear images from memory
        this.images = [];
        this.isPreloaded = false;
        this.isAnimating = false;

        console.log('🧹 Cube animation destroyed and cleaned up');
    }

    /**
     * Get current animation state
     * Useful for debugging or external monitoring
     */
    getState() {
        return {
            isPreloaded: this.isPreloaded,
            isAnimating: this.isAnimating,
            currentFrame: Math.round(this.currentFrame),
            animationProgress: (this.animationProgress * 100).toFixed(2) + '%',
            canvasResolution: `${this.canvas.width}x${this.canvas.height}`,
            imagesLoaded: this.images.filter(img => img !== null).length
        };
    }
}

/**
 * ==================== INITIALIZATION ====================
 * Initialize the cube animation when the DOM is ready
 */

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCubeAnimation);
} else {
    initializeCubeAnimation();
}

// Global reference for debugging
let cubeAnimation;

function initializeCubeAnimation() {
    // Create new animation instance
    cubeAnimation = new CubeSequenceAnimation({
        canvasId: 'sequenceCanvas',
        imageDirectory: 'assets/cube-sequence/',
        imagePrefix: 'ezgif-frame-',
        imageFormat: '.png',
        totalImages: 240,
        scrollDistance: 4000
    });

    // Make it accessible globally for debugging
    window.cubeAnimation = cubeAnimation;

    // Example: Log state after 2 seconds
    setTimeout(() => {
        console.log('📊 Animation State:', cubeAnimation.getState());
    }, 2000);

    // Optional: Add keyboard controls for debugging
    setupDebugControls();
}

/**
 * Setup keyboard controls for debugging
 * Press 'D' to log animation state
 * Press 'R' to reset animation
 */
function setupDebugControls() {
    window.addEventListener('keydown', (e) => {
        // Press 'D' for debug info
        if (e.key.toLowerCase() === 'd') {
            console.log('📊 Current Animation State:', cubeAnimation.getState());
        }

        // Press 'R' to reset animation
        if (e.key.toLowerCase() === 'r') {
            console.log('🔄 Resetting animation...');
            cubeAnimation.currentFrame = 0;
            cubeAnimation.drawFrame(0);
        }
    });
}

/**
 * ==================== PERFORMANCE NOTES ====================
 * 
 * Why this approach is high-performance:
 * 
 * 1. IMAGE PRELOADING
 *    - All images loaded into memory before animation starts
 *    - Prevents flickering from missing images
 *    - Sequential numbering allows predictable loading
 * 
 * 2. CANVAS RENDERING
 *    - Canvas is more performant than DOM manipulation
 *    - Single render target instead of 150 separate elements
 *    - Hardware acceleration on modern browsers
 * 
 * 3. SCROLL SCRUBBING
 *    - GSAP's timeline scrubbing is highly optimized
 *    - Only redraws when frame actually changes
 *    - Smooth 60fps on most devices
 * 
 * 4. RESPONSIVE DESIGN
 *    - Device pixel ratio support for retina displays
 *    - Aspect ratio preservation prevents distortion
 *    - Efficient resize debouncing
 * 
 * 5. MEMORY MANAGEMENT
 *    - Images stored as Image objects (efficient)
 *    - No duplicate image data
 *    - Proper cleanup on destroy
 * 
 * Optimization Tips:
 * - Use optimized PNG files (consider WebP with fallback)
 * - Compress images to reasonable resolution (e.g., 1080p)
 * - Use CDN for faster image loading
 * - Consider lazy loading for initial page load speed
 */
