// Enhanced synth-click sound with better tone
const clickSound = new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YRAAAAB333cRERERERERERERERE=");
clickSound.volume = 0.3;

const textDisplay = document.getElementById('text-display');
const inputField = document.getElementById('keyboard-input');
const levelDisplay = document.getElementById('current-level-display');
// Modal elements
const levelModal = document.getElementById('level-modal');
const modalWpm = document.getElementById('modal-wpm');
const modalAvgWpm = document.getElementById('modal-avg-wpm');
const modalComboLevel = document.getElementById('modal-combo-level');
const modalComboBest = document.getElementById('modal-combo-best');
const modalGreens = document.getElementById('modal-greens');
const modalNextBtn = document.getElementById('modal-next');
const modalCloseBtn = document.getElementById('modal-close');

let currentLevel = 0;
let charIndex = 0;
let levelStartTime = null;
let wpmRecords = [];
let bestComboAllTime = 0;

// Level Setup
let levelData = [
    "f f f j j j",
    "d d d k k k",
    "s s s l l l",
    "a a a ; ; ;",
    "fjdksl; a",
    "jkl; asdf",
    "the star",
    "blue moon",
    "space ship",
    "galaxy way",
    "typing fast",
    "elixir typer",
    "rocket fuel",
    "orbit earth",
    "The stars above us represent the vastness of the universe. Every distant light is a sun of its own, perhaps warming planets we have yet to discover.\n\nTo explore the cosmos is to understand our own history. We are made of star-stuff, and looking up is simply looking back at where we came from.",
    "In the heart of winter, when the world turns silent under a blanket of white snow, there is a peculiar beauty that emerges. The trees stand bare and majestic, their branches laden with frost that catches the pale sunlight. The cold air fills your lungs with a crisp clarity that makes you feel alive.",
    "The ocean has always held mysteries that humans have yet to fully understand. Beneath the waves exist entire ecosystems teeming with life, creatures both magnificent and strange. The deep sea remains one of Earth's final frontiers, explored far less than the surface of the moon.",
    "Coffee shops serve as modern-day meeting places where ideas brew as readily as espresso. People gather with their laptops, notebooks, and conversations, creating a symphony of creativity and contemplation. The aroma of fresh coffee mingles with the sound of typing and quiet chatter.",
    "Travel changes a person in ways that are difficult to articulate until you experience it yourself. Walking through unfamiliar streets, tasting new foods, and meeting strangers who become friends—these moments shape your understanding of the world and your place within it.",
    "The art of programming is not merely about writing code that works, but writing code that others can understand and maintain. Clean code is like good writing; it tells a story that resonates with the reader and stands the test of time.",
    "Photography captures moments that would otherwise slip away into the depths of memory. A single frame can convey emotion, history, and truth in ways that words sometimes cannot. Every photograph is a choice to preserve something from the relentless march of time.",
    "Gardening teaches patience and respect for the rhythms of nature. You cannot rush growth; you can only provide the right conditions and trust in the process. The garden rewards those who tend to it with beauty, bounty, and a connection to the earth.",
    "Books are portals to other worlds, other times, and other minds. Reading is an intimate conversation between author and reader, a shared experience that happens silently but profoundly. Each book you read expands the boundaries of your understanding.",
    "The human brain is a marvel of evolution, capable of learning, creating, and imagining things that do not yet exist. Yet for all its power, it remains largely mysterious, with vast territories of cognition still unexplored by science.",
    "Music transcends language and culture, speaking directly to the soul through patterns of sound and rhythm. Whether classical symphony or folk melody, music has the power to uplift, comfort, and inspire across all boundaries.",
    "The sunrise marks a fresh beginning, a moment when the darkness yields to light and the world awakens anew. Each dawn carries the promise of possibility and the chance to start again, no matter what yesterday brought.",
    "Friendship is one of life's greatest treasures, a bond forged through shared experiences, laughter, and support through difficult times. True friends are rare and precious, worth cherishing and nurturing throughout life's journey.",
    "Mountain peaks inspire awe in those who behold them, their majesty reminding us of nature's grandeur and our own smallness. Yet climbing them teaches that seemingly impossible heights are achievable through persistence and determination.",
    "The rain brings renewal to the earth, nourishing plants and filling reservoirs while creating a symphony of sound on roofs and leaves. Many find peace in rainy days, when the world slows down and nature's rhythm becomes impossible to ignore.",
    "Language evolves constantly, shaped by technology, culture, and the creativity of its speakers. New words emerge to describe new phenomena, while old words fade as the concepts they represented become obsolete or transform meaning.",
    "The kitchen is where chemistry becomes culinary art, where simple ingredients transform through heat and technique into nourishment and joy. Cooking is both science and creativity, requiring precision and intuition in equal measure.",
    "Memories are not fixed records but living things that change and evolve with each recollection. What we remember shapes who we are, yet our memories are often unreliable, reconstructed anew each time we think of them.",
    "The night sky holds profound lessons for those who take time to gaze upward. Constellations guide us as they have for millennia, and contemplating our place among the stars naturally invokes humility and wonder.",
    "Architecture shapes how we live and interact with our environment. Buildings are frozen music, as they say, structures that balance function with aesthetics to create spaces where human life unfolds.",
    "Innovation requires both imagination and practical skill, the ability to envision something new and the technical prowess to bring it into being. History shows that the greatest innovations often come from unexpected places and combinations.",
    "The seasons remind us that change is constant and necessary. Winter gives way to spring, summer yields to fall, and in this cycle we find metaphors for our own lives and transformations.",
    "Silence is increasingly rare in the modern world, yet it is essential for reflection and peace. In quiet moments, we hear our own thoughts most clearly and find respite from the constant noise of daily life.",
    "The human spirit is resilient and adaptable, capable of overcoming obstacles that seem insurmountable. History is filled with stories of individuals who faced adversity and emerged stronger for having endured it.",
    "Art challenges us to see the world differently, to question assumptions and consider perspectives we might not naturally embrace. Great art disturbs comfortable certainties and opens new pathways of thought.",
    "Rivers flow toward the sea, carving canyons through rock and stone over millennia. Following a river's course is like reading the history of the earth written in stone and water.",
    "Learning is a lifelong pursuit that should continue from childhood through old age. The moment we stop learning is the moment we begin to stagnate, losing our capacity for growth and adaptation.",
    "The internet has fundamentally transformed human connection, making it possible to communicate instantly across vast distances. Yet this technology is neither inherently good nor bad; its impact depends on how we choose to use it.",
    "Sleep is not a luxury but a necessity, a time when the body repairs itself and the mind consolidates memories and processes emotions. Understanding sleep's importance is key to understanding health itself.",
    "Wilderness areas provide refuge and restoration for modern humans overwhelmed by city life. There is something deeply healing about being surrounded by unspoiled nature, far from human structures and noise.",
    "Children learn through play and exploration, absorbing lessons about the world through direct experience and curiosity. Protecting and encouraging this natural drive to learn shapes healthy development.",
    "The future belongs to those willing to learn new skills and adapt to changing circumstances. Flexibility and continuous improvement are now essential traits in a rapidly evolving world.",
    "Colors carry psychological weight and cultural significance, influencing mood and perception in ways both subtle and profound. Understanding color theory helps us appreciate the intentionality in design and nature.",
    "Sports teach valuable lessons about teamwork, discipline, and the satisfaction of pushing beyond perceived limits. The discipline required to excel athletically builds character that extends into all areas of life.",
    "The stars that died billions of years ago still shine in our sky, their light taking eons to reach us. This means we are always looking into the past when we gaze at the heavens.",
    "Storytelling is humanity's oldest art form, a way of making sense of experience and passing down wisdom through generations. Every culture has its stories, and these narratives shape identity and values.",
    "Technology advances exponentially, yet humans often struggle to foresee the consequences of new innovations. Wisdom lies in developing technology thoughtfully while considering long-term impacts.",
    "The workplace has evolved dramatically with remote work and flexible arrangements becoming more common. This shift challenges traditional notions of productivity while opening new possibilities for work-life balance.",
    "Mental health is just as important as physical health, yet it often receives less attention and support. Creating environments where people can openly discuss psychological struggles is essential for collective wellbeing.",
    "Writing is a discipline that requires clarity of thought and respect for language. To write well, one must first think clearly, which makes writing an excellent tool for developing better reasoning skills.",
    "Biodiversity is crucial for ecosystem health and human survival, yet species extinction accelerates at alarming rates. Protecting natural habitats is not merely an environmental concern but a survival imperative.",
    "Community is the antidote to loneliness and alienation, providing support, belonging, and shared purpose. Building and maintaining strong communities requires deliberate effort in an increasingly disconnected world.",
    "The human body is an intricate machine, an interconnected system where small changes can have far-reaching effects. Understanding physiology helps us make better choices about our health.",
    "Gratitude is a practice that transforms perspective and increases psychological resilience. Taking time to appreciate what we have, rather than focusing on what is lacking, fundamentally shifts how we experience life.",
    "The workplace culture of hustle and constant productivity is slowly being challenged by movements advocating for rest and balance. True innovation often comes not from pushing harder but from allowing space for reflection and recovery.",
    "History teaches us about human nature through examples of both tremendous achievement and terrible failures. By studying the past, we gain perspective on current events and hopefully learn to avoid repeating mistakes.",
    "The sense of smell is closely linked to memory, capable of instantly transporting us to times and places long forgotten. A single scent can unlock years of memories with surprising vividness.",
    "Urban gardens prove that even in concrete jungles, humans can create beauty and grow food. These small green spaces serve as reminders that we can restore and create even within human-built environments.",
    "Patience is a virtue increasingly undervalued in a world of instant gratification and rapid communication. Many worthwhile endeavors require time and sustained effort to come to fruition.",
    "The documentary filmmaker captures reality in ways that can be more powerful than fiction, revealing truths about the world through careful observation and storytelling.",
    "Purpose gives life meaning and direction, providing motivation even during difficult times. Many people find that their sense of purpose comes from helping others or contributing to something larger than themselves.",
    "The intersection of art and science produces innovation and understanding neither discipline could achieve alone. Cross-disciplinary thinking often leads to breakthrough insights and creative solutions.",
    "Climate change represents an unprecedented global challenge requiring cooperation and commitment from all nations. The decisions we make today will determine whether future generations inherit a habitable planet.",
    "Handwriting, in an age of keyboards and screens, has become almost obsolete, yet it remains uniquely connected to memory and cognitive processing. There may be something valuable we lose as we abandon this skill entirely.",
    "The film industry has transformed dramatically with streaming services and changed viewing habits. Yet despite technological disruption, the human desire for stories told through moving images remains constant.",
    "Forests are the lungs of our planet, producing oxygen and storing carbon while harboring incredible biodiversity. Deforestation represents not merely an environmental loss but a civilizational mistake.",
    "Philosophy offers tools for thinking clearly about complex problems and examining our assumptions. Philosophical training enhances critical thinking skills applicable to any field.",
    "The transition from childhood to adulthood is marked by increasing responsibility and the gradual realization that the world does not revolve around individual desires.",
    "Volunteerism strengthens communities while providing personal fulfillment and perspective to those who give their time. Many people find that helping others provides deeper satisfaction than any paid work.",
    "The ethics of artificial intelligence are becoming increasingly important as AI systems make decisions affecting human lives. Society must grapple with questions of fairness, transparency, and accountability.",
    "Traditional craftsmanship teaches values increasingly rare in mass production: attention to detail, quality materials, and the pride of creating something lasting.",
    "The human voice is a unique instrument, capable of expressing emotion with subtlety that few other mediums can match. Speech and song are fundamentally human ways of communicating meaning.",
    "Education systems must evolve to prepare students not just for existing jobs but for careers that do not yet exist. Adaptability and creative thinking may be more valuable than specific technical knowledge.",
    "The practice of meditation has been used for millennia to calm the mind and cultivate inner peace. Modern science increasingly validates what contemplatives have long known about meditation's benefits.",
    "Economic inequality has reached levels not seen since the Gilded Age, raising questions about fairness and social stability. Addressing inequality requires systemic changes in policy and economic structures.",
    "The beauty of mathematics lies partly in its universality, describing patterns that hold true across the universe whether on Earth or distant galaxies.",
    "Relationships require ongoing communication, compromise, and effort to flourish. The myth of effortless love has caused much disappointment; lasting love is built through deliberate choice and action.",
    "Fitness is not merely about appearance but about maintaining the physical capacity to live fully and independently throughout life. Exercise provides benefits both physical and mental.",
    "The dark matter that comprises most of the universe's mass remains largely mysterious, a reminder of how much we have yet to learn about reality.",
    "Indigenous cultures often possess knowledge about living sustainably that modern civilization desperately needs to relearn. Their traditional practices could provide solutions to contemporary environmental challenges.",
    "The pursuit of perfection can become a trap that prevents action and progress. Sometimes done is better than perfect, especially when learning and growth are the goal.",
    "Neuroscience reveals that brains remain plastic throughout life, capable of forming new neural connections and learning new skills. This plasticity means we need not be limited by our past.",
    "The industrial revolution transformed human civilization but at great cost to environment and social structures. Understanding this historical precedent helps us navigate contemporary technological disruption.",
    "Kindness is a force more powerful than most people recognize, capable of breaking cycles of negativity and inspiring reciprocal generosity. Small acts of kindness ripple outward in unexpected ways.",
    "Energy conservation is not merely an environmental issue but an economic one, as efficiency reduces costs and dependency on limited resources.",
    "The sense of humor is uniquely human and serves important social and psychological functions. Laughter reduces stress, builds bonds, and provides perspective on difficult situations.",
    "Museums preserve humanity's cultural heritage, offering windows into past civilizations and their values. These institutions play crucial roles in education and cultural continuity.",
    "The gig economy offers flexibility but at the cost of security and benefits previously provided by traditional employment. Society must develop new ways to support and protect workers in this new model.",
    "Astronomy expands our perspective, revealing that Earth is merely a speck in an incomprehensibly vast cosmos. This cosmic perspective can humble and inspire simultaneously.",
    "The practice of journaling provides clarity, processing emotions and experiences through written reflection. Writing can be therapeutic even without an intended audience.",
    "Corporate responsibility is not merely about profit but about impact on society and environment. Companies increasingly face pressure to consider stakeholders beyond shareholders.",
    "The microbiome, the ecosystem of bacteria and organisms living on and within our bodies, profoundly affects health in ways science is only beginning to understand.",
    "Performance anxiety affects people across all disciplines, from athletes to musicians to public speakers. Techniques for managing anxiety are learnable and can dramatically improve performance.",
    "The urban landscape is constantly changing as old buildings give way to new development. These changes reflect societal shifts and can either enhance or diminish community character.",
    "Ethical consumption is an individual practice, yet systemic change requires changes in production and distribution systems. Individual choices matter but are insufficient without structural reform.",
    "The capacity for self-improvement is one of humanity's greatest strengths, allowing people to overcome limitations and achieve growth. This potential should be cultivated and encouraged.",
    "Decentralization of power and information through technologies like blockchain raises both possibilities and concerns about security, equality, and control.",
    "The therapeutic benefits of nature exposure are well-documented, reducing stress and improving mental health. Regular time outdoors should be considered part of preventive health care.",
    "Language learning opens windows into different cultures and ways of thinking, making bilingualism or multilingualism increasingly valuable.",
    "The concept of work is being redefined as automation handles routine tasks and humans focus on creative and interpersonal work. This shift requires rethinking education and social support systems.",
    "Collaboration often produces better results than individual effort, yet traditional competitive structures often reward individual achievement. Balancing cooperation and competition is key.",
    "The future of transportation involves electric vehicles, autonomous driving, and potentially new technologies not yet conceived. These changes will reshape cities and society.",
    "Personal finance literacy is essential for making good decisions about money, yet it receives little formal education. Financial security often depends on learning these skills independently.",
    "The value of mentorship in personal and professional development cannot be overstated. Learning from those with experience accelerates growth and prevents costly mistakes.",
    "Renewable energy represents hope for a sustainable future, yet transitioning requires investment, political will, and technological innovation. The pace of adoption remains insufficient.",
    "The phenomenon of impostor syndrome affects high achievers across all fields, creating unnecessary doubt and stress. Understanding that these feelings are common can help alleviate them.",
    "Architecture that prioritizes human scale creates more livable cities where people interact and communities thrive. Designing for people rather than just vehicles or commerce produces better outcomes.",
    "The transformation of work into something meaningful and aligned with personal values is an aspiration of modern workers. Pursuing meaningful work often requires courage to pursue unconventional paths.",
    "Virtual reality technology is creating new possibilities for education, entertainment, and human connection, though questions about overuse and social impact remain.",
    "The concept of legacy extends beyond what is written in wills to the impact we have on people and the world. Many people find deep meaning in considering what legacy they wish to leave.",
    "Innovation in education, from online learning to personalized instruction, is expanding access while raising questions about equity and effectiveness.",
    "The human need for play persists from childhood into adulthood, though cultural pressures often discourage it. Maintaining playfulness and humor can enhance creativity and wellbeing.",
    "The slow movement advocates for slowing down in various areas of life from food production to work pace, challenging assumptions about progress and productivity.",
    "Disaster preparedness at individual and community levels can reduce suffering and save lives when emergencies occur. Preparation is not about fear but about responsible planning.",
    "The ethics of privacy in an age of ubiquitous surveillance is a crucial issue affecting freedom and human rights. Balancing security with privacy requires careful thought and policy.",
    "Sports psychology explores how mental factors affect athletic performance and how sports can develop psychological skills. Training the mind is as important as training the body.",
    "Sustainability must balance environmental protection with meeting human needs and development. This challenge requires innovation and difficult trade-offs that need not be left to politicians alone.",
    "The impact of artificial intelligence on employment and society requires proactive policy and education. Preparing for this transition now can help minimize negative consequences.",
    "Parenthood transforms perspective and priorities in ways that are difficult to anticipate before becoming a parent. The responsibility of raising the next generation carries both weight and profound meaning."
];


function initLevel() {
    charIndex = 0;
    textDisplay.innerHTML = '';
    const text = levelData[currentLevel];
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        if (char === '\n') {
            span.innerHTML = '<br>';
        } else {
            span.innerText = char;
        }
        span.classList.add('char');
        span.style.animation = `fadeInUp 0.4s ease-out ${index * 0.02}s both`;
        textDisplay.appendChild(span);
    });
    
    updateActiveChar();
    levelDisplay.innerText = currentLevel + 1;
}

function updateActiveChar() {
    const chars = textDisplay.querySelectorAll('.char');
    chars.forEach(c => c.classList.remove('current'));
    if (chars[charIndex]) {
        chars[charIndex].classList.add('current');
    }
}

inputField.addEventListener('keydown', (e) => {
    // 1. Shift + Enter to Restart
    if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        initLevel();
        return;
    }

    // Play Sound for any keypress
    clickSound.currentTime = 0;
    clickSound.play();

    // Start timer on first real keypress for the level
    if (!levelStartTime) {
        levelStartTime = Date.now();
    }

    const chars = textDisplay.querySelectorAll('.char');
    const expectedChar = levelData[currentLevel][charIndex];

    // 2. Handle Backspace
    if (e.key === 'Backspace') {
        if (charIndex > 0) {
            charIndex--;
            // If deleting an error, mark it as 'potentially corrected'
            if (chars[charIndex].classList.contains('incorrect')) {
                chars[charIndex].dataset.wasError = "true";
            }
            chars[charIndex].classList.remove('correct', 'incorrect', 'corrected');
        }
    } 
    // 3. Handle Enter (Correct for \n, Incorrect otherwise)
    else if (e.key === 'Enter') {
        if (expectedChar === '\n') {
            chars[charIndex].classList.add('correct');
            charIndex++;
        } else {
            chars[charIndex].classList.add('incorrect');
            charIndex++;
        }
    }
    // 4. Handle Character Keys
    else if (e.key.length === 1) { 
        if (charIndex < chars.length) {
            if (e.key === expectedChar) {
                // If it was an error before, make it yellow. Else green.
                if (chars[charIndex].dataset.wasError === "true") {
                    chars[charIndex].classList.add('corrected');
                } else {
                    chars[charIndex].classList.add('correct');
                }
            } else {
                chars[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
    }

    updateActiveChar();

    // Level completion check
    if (charIndex === chars.length) {
        setTimeout(() => {
            const levelEndTime = Date.now();
            const durationMs = levelStartTime ? (levelEndTime - levelStartTime) : 1;

            // Count greens (exact correct on first try) and correctTotal (including corrected)
            const allChars = Array.from(textDisplay.querySelectorAll('.char'));
            const greens = allChars.filter(c => c.classList.contains('correct')).length;
            const corrected = allChars.filter(c => c.classList.contains('corrected')).length;
            const correctTotal = greens + corrected;

            // WPM: correctTotal chars -> words (5 chars per word) over minutes
            const minutes = durationMs / 1000 / 60;
            const wpm = minutes > 0 ? (correctTotal / 5) / minutes : 0;
            wpmRecords.push(wpm);
            const avgWpm = wpmRecords.reduce((a,b) => a+b, 0) / wpmRecords.length;

            // Highest consecutive greens (combo) in this level
            let combo = 0;
            let maxCombo = 0;
            for (let i = 0; i < allChars.length; i++) {
                if (allChars[i].classList.contains('correct')) {
                    combo++;
                    if (combo > maxCombo) maxCombo = combo;
                } else {
                    combo = 0;
                }
            }
            if (maxCombo > bestComboAllTime) bestComboAllTime = maxCombo;

            const totalChars = allChars.length;

            // Populate and show modal instead of alert
            modalWpm.innerText = wpm.toFixed(1);
            modalAvgWpm.innerText = avgWpm.toFixed(1);
            modalComboLevel.innerText = maxCombo;
            modalComboBest.innerText = bestComboAllTime;
            modalGreens.innerText = `${greens} / ${totalChars}`;
            showLevelModal();
        }, 200);
    }
});

function showLevelModal() {
    if (!levelModal) return;
    levelModal.classList.remove('hidden');
    levelModal.setAttribute('aria-hidden', 'false');
    // Move focus to next button for easy keyboard advance
    if (modalNextBtn) modalNextBtn.focus();
}

function hideLevelModal() {
    if (!levelModal) return;
    levelModal.classList.add('hidden');
    levelModal.setAttribute('aria-hidden', 'true');
}

// Modal button handlers: advance level on Next, or close modal
if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
        hideLevelModal();
        currentLevel = (currentLevel + 1) % levelData.length;
        levelStartTime = null;
        initLevel();
        inputField.focus();
    });
}
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        hideLevelModal();
        inputField.focus();
    });
}

// When modal is visible, pressing Enter advances to next level; Escape closes modal
document.addEventListener('keydown', (e) => {
    if (!levelModal || levelModal.classList.contains('hidden')) return;

    if (e.key === 'Enter') {
        e.preventDefault();
        if (modalNextBtn) modalNextBtn.click();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        hideLevelModal();
        inputField.focus();
    }
});

function jumpToLevel(lvl) {
    currentLevel = lvl;
    initLevel();
    inputField.focus();
}

function randomizeLevel() {
    currentLevel = Math.floor(Math.random() * levelData.length);
    initLevel();
    inputField.focus();
}

function toggleEssayMode() {
    // Essays start at level 15 (index 14)
    const essayStart = 14;
    const randomEssayIndex = essayStart + Math.floor(Math.random() * (levelData.length - essayStart));
    jumpToLevel(randomEssayIndex); 
}

// Initial Launch
initLevel();
document.body.addEventListener('click', () => inputField.focus());
