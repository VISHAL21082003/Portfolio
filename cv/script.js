// Vanta.js Background
VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    color: 0x0066ff,
    backgroundColor: 0x000000
});

document.addEventListener('DOMContentLoaded', () => {
    // Skill Card Toggle
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const toggleBtn = card.querySelector('.toggle-skills-btn');
        const toggleSection = card.querySelector('.toggle-section');
        toggleBtn.addEventListener('click', () => {
            card.classList.toggle('expanded');
            toggleSection.style.maxHeight = card.classList.contains('expanded') ? `${toggleSection.scrollHeight}px` : '0';
            toggleSection.style.opacity = card.classList.contains('expanded') ? '1' : '0';
        });
    });

    // Modal Functionality
    const modalTriggers = document.querySelectorAll('.toggle-skills-btn');
    const modalIds = [
        'languagesModal',
        'technologiesModal',
        'devToolsModal',
        'certificationsModal'
    ];

    modalTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            const modal = document.getElementById(modalIds[index]);
            openModal(modal);
        });
    });

    // Close Modal Functions
    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling on body
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close Modal Event Listeners
    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Optional: Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => closeModal(modal));
        }
    });
    createGlitchEffect();
    // Glitch Text Animation
    function createGlitchEffect() {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(el => {
            el.addEventListener('mouseover', () => {
                el.style.animation = 'glitch-anim 0.3s infinite';
            });
            el.addEventListener('mouseout', () => {
                el.style.animation = 'none';
            });
        });
    }

   // Toggle Project Details
   function setupProjectToggle() {
       const toggleButtons = document.querySelectorAll('.details-toggle');
       toggleButtons.forEach(button => {
           button.addEventListener('click', () => {
               const section = button.nextElementSibling;
               section.classList.toggle('active');
               button.textContent = section.classList.contains('active') ? 'Hide Details' : 'Show Details';
           });
       });
   }

   // Smooth Scrolling
   function setupSmoothScroll() {
       const navLinks = document.querySelectorAll('nav a');
       navLinks.forEach(link => {
           link.addEventListener('click', (e) => {
               e.preventDefault();
               const targetId = link.getAttribute('href').substring(1);
               const targetSection = document.getElementById(targetId);
               targetSection.scrollIntoView({ behavior: 'smooth' });
           });
       });
   }

   // Parallax Effect
   function setupParallaxEffect() {
       window.addEventListener('scroll', () => {
           const scrollPosition = window.pageYOffset;
           const parallaxBg = document.getElementById('vanta-bg');
           parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
       });
   }

   // 3D Hover Effects
   function setup3DHoverEffects() {
       const cards = document.querySelectorAll('.card-3d-hover');
       cards.forEach(card => {
           card.addEventListener('mousemove', (e) => {
               const rect = card.getBoundingClientRect();
               const x = e.clientX - rect.left;
               const y = e.clientY - rect.top;
               const centerX = rect.width / 2;
               const centerY = rect.height / 2;
               const rotateX = (y - centerY) / 20;
               const rotateY = -(x - centerX) / 20;
               card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
           });

           card.addEventListener('mouseleave', () => {
               card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
           });
       });
   }

   // Contact Form Submission
   function setupContactForm() {
       const contactForm = document.getElementById('contact-form');
       const formMessage = document.getElementById('form-message');

       contactForm.addEventListener('submit', async (e) => {
           e.preventDefault();
           formMessage.textContent = '';
           formMessage.classList.remove('text-green-500', 'text-red-500');

           // Get form data
           const formData = new FormData(contactForm);
           try {
               const response = await fetch('submit_contact.php', { method: 'POST', body: formData });
               const result = await response.json();

               if (result.success) { 
                   formMessage.textContent = result.message; 
                   formMessage.classList.add('text-green-500'); 
                   contactForm.reset(); 
               } else { 
                   formMessage.textContent = result.message; 
                   formMessage.classList.add('text-red-500'); 
               }
           } catch (error) { 
               console.error('Error:', error); 
               formMessage.textContent = 'An unexpected error occurred. Please try again.'; 
               formMessage.classList.add('text-red-500'); 
           }
       });
   }

   // Project and Achievements Logic
   const projects = [
       { 
           title: 'GameSync',
           subtitle: 'Sports Action Classification Engine',
           image: 'sports.jpg',
           descriptions: [
               '- Created a local website for sports action recognition. Combined convolutional and recurrent neural networks to recognize complex actions within the UCF 101 dataset, enhancing accuracy.',
               '- Contributed to video analytics by categorizing sports actions in real-world scenarios with an accuracy of 97.8 percent.'
           ],
           technologies: ['Python', 'CNN', 'RNN']
       },
       { 
           title: 'Wireless Sound Control',
           subtitle: 'OpenCV-based Gesture Sound Control',
           image: 'volume.jpg',
           descriptions: [
               '- Implemented a Wireless Sound Control system using OpenCV and Python, achieving a remarkable responsiveness with an impressive 98 percent accuracy in interpreting hand gestures for real-time audio parameter adjustments.',
               '- Spearheaded the implementation of a user-friendly interface, allowing individuals to seamlessly control sound elements remotely, resulting in a 30 percent increase in user satisfaction and engagement.'
           ],
           technologies: ['OpenCV', 'Python', 'Gesture Recognition']
       },
       { 
           title: 'EarthFinesse',
           subtitle: 'Military Terrain Classifier',
           image: 'militiar.jpg',
           descriptions: [
                '- EarthFinesse is a high-accuracy military terrain classifier powered by deep learning. It classifies terrain types such as Grassy, Marshy, Rocky, and Sandy with an accuracy of over 97.87%, setting a new benchmark in this domain.',
                '- The model uses the MobileNetV2 architecture, optimized for efficient and accurate terrain classification.'
            ],
            technologies: ['Deep Learning', 'MobileNetV2', 'Terrain Classification']
       }
   ];

   const projectsWrapper = document.querySelector('.projects-wrapper');
   const prevButton = document.getElementById('prev-project');
   const nextButton = document.getElementById('next-project');
   let currentProjectIndex = 0;

   function updateProject(index) {
       const project = projects[index];
       const slideContent =
       `<div class="project-card bg-gray-700 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 w-full max-w-3xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8 items-center">
              <div class="project-image">
                  <img src="${project.image}" alt="${project.title}" class="w-full h-96 object-cover rounded-lg transform transition-transform duration-500 hover:scale-105">
              </div>
              <div class="project-details text-white">
                  <h3 class="text-3xl font-bold mb-4 text-blue-300">${project.title}</h3>
                  <p class="text-lg mb-4">${project.subtitle}</p>
                  <div class="project-description space-y-4">
                      ${project.descriptions.map(desc => `<p>${desc}</p>`).join('')}
                  </div>
                  <div class="project-tech mt-6">
                      <h4 class="text-xl font-semibold mb-2 text-blue-400">Technologies Used</h4>
                      <div class="flex flex-wrap gap-2">
                          ${project.technologies.map(tech => `<span class="bg-blue-600/30 px-3 py-1 rounded-full text-sm">${tech}</span>`).join('')}
                      </div>
                  </div>
              </div>
          </div>
      </div>`;

       projectsWrapper.innerHTML =
       `<div class="projects-slide absolute w-full h-full transition-all duration-700 ease-in-out">
          ${slideContent}
      </div>`;

      // 3D Rotation Animation
      projectsWrapper.querySelector('.project-card').style.transform = 'rotateY(90deg) scale(0.8)';
      setTimeout(() => { projectsWrapper.querySelector('.project-card').style.transform = 'rotateY(0) scale(1)'; }, 50);
   }

   // Initial project load
   updateProject(currentProjectIndex);

   // Next Project Button Event Listener
   nextButton.addEventListener('click', () => {
       currentProjectIndex = (currentProjectIndex + 1) % projects.length;
       updateProject(currentProjectIndex);
   });

   // Previous Project Button Event Listener
   prevButton.addEventListener('click', () => {
       currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
       updateProject(currentProjectIndex);
   });

   // Achievements Logic
   const achievements = [
       { 
           title: 'Samsung Prism Project',
           description: 'Recognized for contributing to a 1000-video dataset spanning 20 human action classes.',
           date: 'Summer 2023',
           image: 'mta.jpg',
           details: [
               'Developed comprehensive video dataset',
               'Covered 20 diverse human action classes',
               'Contributed to advanced machine learning research'
           ]
       },
       { 
           title: 'HackerRank Credentials',
           description: 'Multiple Programming Badge Achievements',
           date: '2022-2023',
           image: 'hacky.png',
           details: [
               'Golden Badge (5 Stars) in Python',
               'Silver Badge (3 Stars) in C++',
               'Bronze Badge (2 Stars) in C'
           ]
       },
       { 
           title: 'Microsoft Test Association',
           description: 'Python Programming Certification',
           date: 'Winter 2022',
           image: 'coe.jpeg',
           details: [
               'Certification by excelling in Python exam',
               'Scored above 80 percent',
               'Demonstrated advanced programming skills'
          ]
      },
      { 
          title: 'Script Sonic Hackathon',
          description: '1st Position with Cash Prize',
          date: 'Spring 2023',
          image: 'hack.jpeg',
          details: [
              'Won 1st position in hackathon',
              'Awarded Rs. 3000 cash prize',
              'Showcased innovative problem-solving'
          ]
      },
      { 
          title: 'Academic Excellence',
          description: 'Perfect Score in Information Technology',
          date: 'School Years',
          image: 'cup.jpg',
          details: [
              'Secured 100/100 marks in IT Subject',
              'Trophy and Certificate of Merit',
              'Demonstrated exceptional academic performance'
          ]
      }
   ];

   const achievementsContent = document.getElementById('achievements-content');
   const achievementsImage = document.getElementById('achievements-image');

   // Render achievement items
   achievements.forEach((achievement, index) => {
       const achievementItem = document.createElement('div');
       achievementItem.classList.add('achievement-item');
       
       achievementItem.innerHTML =
       `<h3 class="achievement-title">${achievement.title}</h3>
        <p class="achievement-description">${achievement.description}</p>
        <div class="achievement-details">
            ${achievement.details.map(detail => `<p>• ${detail}</p>`).join('')}
        </div>`;
       
       achievementItem.addEventListener('mouseenter', () => {        
            // Reset all items
            document.querySelectorAll('.achievement-item').forEach(item => item.classList.remove('active'));
            
            // Activate current item
            achievementItem.classList.add('active');

            // Update image
            achievementsImage.src = achievement.image;
            achievementsImage.style.transform = `scale(1.1)`; 

            setTimeout(() => { achievementsImage.style.transform='scale(1)' },300);
        });

        achievementsContent.appendChild(achievementItem);
     });

     // Initial state for achievements display
     achievementsImage.src=achievements[0].image;

     // Particle Background Initialization using Three.js
     let scene, camera, renderer, particles;

     function initParticleBackground() {
         scene= new THREE.Scene();
         camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
         renderer= new THREE.WebGLRenderer({ alpha:true });
         renderer.setSize(window.innerWidth, window.innerHeight);
         canvasContainer.appendChild(renderer.domElement);

         const geometry= new THREE.BufferGeometry();
         const particlesCount=5000;
         const posArray= new Float32Array(particlesCount * 3);

         for(let i=0; i<particlesCount * 3; i++){
             posArray[i]= (Math.random()-0.5)*50;
         }
         
         geometry.setAttribute("position", new THREE.BufferAttribute(posArray,3));
         let material= new THREE.PointsMaterial({ color :0x4ecdc4,size :0.005,transparent:true,opacity :0.5});
         particles= new THREE.Points(geometry, material);
         scene.add(particles);
         camera.position.z=20;
     }

     function animateParticles(){
         requestAnimationFrame(animateParticles);
         particles.rotation.x+=0.0005;
         particles.rotation.y+=0.0005;
         renderer.render(scene,camera);
     }

     function handleResize(){
         camera.aspect= window.innerWidth/window.innerHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(window.innerWidth, window.innerHeight);
     }

     initParticleBackground();
     animateParticles();
     window.addEventListener("resize",handleResize);

     initializePortfolio();
});
