import { 
  users, 
  categories, 
  posts, 
  comments, 
  subscribers,
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Post,
  type InsertPost,
  type Comment,
  type InsertComment,
  type Subscriber,
  type InsertSubscriber
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Post methods
  getPosts(limit?: number, offset?: number): Promise<Post[]>;
  getFeaturedPosts(limit?: number): Promise<Post[]>;
  getSpotlightPost(): Promise<Post | undefined>;
  getPostsByCategory(categoryId: number, limit?: number, offset?: number): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Comment methods
  getCommentsByPost(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private subscribers: Map<number, Subscriber>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentPostId: number;
  private currentCommentId: number;
  private currentSubscriberId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.subscribers = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentPostId = 1;
    this.currentCommentId = 1;
    this.currentSubscriberId = 1;
    
    // Initialize with some data
    this.initializeData();
  }
  
  private initializeData() {
    // Create default categories
    const categories = [
      { name: 'Technology', slug: 'technology', description: 'Latest gadgets, breakthroughs, and cutting-edge tech innovations', iconName: 'microchip' },
      { name: 'AI & Robotics', slug: 'ai-robotics', description: 'Artificial intelligence, machine learning, and robotic systems', iconName: 'robot' },
      { name: 'Science', slug: 'science', description: 'Scientific discoveries, breakthroughs, and research developments', iconName: 'flask' },
      { name: 'Space', slug: 'space', description: 'Space exploration, astronomy, and cosmic phenomena', iconName: 'rocket' },
      { name: 'Cyber Security', slug: 'cyber-security', description: 'Digital security, privacy, and protection against cyber threats', iconName: 'shield-alt' }
    ];
    
    categories.forEach(category => this.createCategory(category));
    
    // Create a default author
    const author = this.createUser({
      username: 'admin',
      password: 'password',
      email: 'admin@cosmicblog.com',
      name: 'Admin User',
      avatarUrl: 'https://i.pravatar.cc/300',
      bio: 'Administrator of the Cosmic Blog platform.'
    });
    
    // Create some initial posts
    const samplePosts = [
      {
        title: 'The Rise of Quantum Machine Learning: What\'s Next?',
        slug: 'quantum-machine-learning',
        excerpt: 'Exploring how quantum computing is revolutionizing machine learning algorithms and what this means for the future of AI development and applications.',
        content: 'Quantum machine learning (QML) represents the intersection of quantum computing and machine learning, and it\'s poised to revolutionize how we process and analyze data. Traditional machine learning algorithms are already pushing the boundaries of what\'s possible with classical computing, but they\'re beginning to reach fundamental limits. Quantum computing offers a way to overcome these limitations by leveraging quantum mechanical phenomena like superposition and entanglement.\n\nResearch in this field is accelerating, with major tech companies and academic institutions investing heavily in QML. Recent breakthroughs have demonstrated quantum advantage for specific machine learning tasks, suggesting that we may be approaching a tipping point where quantum systems outperform classical ones for practical applications.\n\nAs quantum hardware continues to mature, we can expect to see QML applications in drug discovery, materials science, optimization problems, and financial modeling. The ability to process vast amounts of data and explore complex solution spaces simultaneously gives quantum machine learning a unique advantage in these domains.\n\nHowever, challenges remain. Quantum systems are still prone to noise and error, and building robust, fault-tolerant quantum computers at scale is an ongoing endeavor. Additionally, developing intuitive quantum algorithms requires a different mindset than classical programming.\n\nDespite these challenges, the future of quantum machine learning looks promising. As hardware improves and algorithms advance, we may witness a paradigm shift in computational capabilities that could unlock solutions to problems that were previously considered intractable.',
        featuredImage: 'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=80&w=600&auto=format&fit=crop',
        categoryId: 2,
        authorId: author.id,
        featured: true,
        spotlight: false,
        readTime: 5
      },
      {
        title: 'Mars Colonization: Challenges and Breakthroughs',
        slug: 'mars-colonization',
        excerpt: 'A comprehensive look at the latest advancements in Mars colonization technology and the obstacles scientists are working to overcome for sustainable habitation.',
        content: 'The dream of establishing a human colony on Mars has captured our imagination for decades, but recent technological breakthroughs are bringing this vision closer to reality. From advances in propulsion systems that could reduce travel time to the Red Planet, to innovations in life support systems that can recycle resources with unprecedented efficiency, the technical barriers to Mars colonization are gradually being overcome.\n\nOne of the most significant challenges is radiation exposure during the journey and on the Martian surface. Scientists are developing advanced shielding materials and even considering genetic modifications that could help humans better withstand the harsh radiation environment. Habitat design has also evolved, with plans for structures that utilize Martian regolith as building material, potentially through 3D printing technologies.\n\nWater, crucial for both consumption and as a component for producing fuel and oxygen, presents another obstacle. Recent discoveries of subsurface ice deposits have sparked optimism, as these could provide accessible water sources for future colonies. Additionally, experiments in growing crops in simulated Martian soil have shown promising results, suggesting that sustainable food production might be feasible.\n\nPsychological challenges can\'t be overlooked either. Extended isolation, confined living spaces, and communication delays with Earth will test the mental resilience of Mars colonists. Research on Earth, including long-duration isolation studies and experiences from Antarctic research stations, is informing strategies to maintain psychological well-being during extended Mars missions.\n\nWhile significant hurdles remain, the convergence of advances in multiple fields - from materials science to biotechnology to psychology - is creating a roadmap for establishing humanity\'s first extraterrestrial colony. The question is no longer if humans will set foot on Mars, but when we will call it home.',
        featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
        categoryId: 4,
        authorId: author.id,
        featured: true,
        spotlight: false,
        readTime: 7
      },
      {
        title: 'Quantum Encryption: The Future of Data Protection',
        slug: 'quantum-encryption',
        excerpt: 'How quantum computing is simultaneously threatening current encryption methods while offering unprecedented new security protocols that could be unbreakable.',
        content: 'As quantum computing advances, we\'re approaching a critical juncture in the world of cybersecurity. Traditional encryption methods that keep our digital lives secure - from online banking to private communications - rely on mathematical problems that are difficult for classical computers to solve. However, quantum computers promise to break these cryptographic systems with relative ease, threatening the foundation of digital security.\n\nThis looming "quantum apocalypse" has spurred the development of quantum-resistant cryptography, also known as post-quantum cryptography. These new encryption methods are designed to withstand attacks from both classical and quantum computers. Organizations like NIST (National Institute of Standards and Technology) are already evaluating and standardizing post-quantum cryptographic algorithms for widespread implementation.\n\nParadoxically, quantum mechanics also offers a solution to the very problem it creates. Quantum key distribution (QKD) leverages the principles of quantum physics to create theoretically unbreakable encryption. Unlike traditional methods that rely on computational complexity, QKD\'s security is guaranteed by the fundamental laws of physics - specifically, the observer effect in quantum mechanics, which makes it impossible to intercept quantum information without detection.\n\nCommercial QKD systems are already available, though currently limited by distance and infrastructure requirements. Research into satellite-based QKD networks and quantum repeaters promises to overcome these limitations, potentially enabling global quantum-secure communications.\n\nAs we transition to this new era of encryption, organizations face the challenge of becoming "crypto-agile" - able to quickly replace vulnerable cryptographic systems with quantum-resistant alternatives. This transition represents one of the most significant shifts in information security since the advent of public-key cryptography, requiring coordinated efforts across governments, industries, and research institutions to ensure our digital infrastructure remains secure in the quantum age.',
        featuredImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
        categoryId: 5,
        authorId: author.id,
        featured: true,
        spotlight: false,
        readTime: 6
      },
      {
        title: 'Advanced Prosthetics: Merging Human and Machine',
        slug: 'advanced-prosthetics',
        excerpt: 'The latest innovations in neural-connected prosthetics are blurring the line between biological and mechanical capabilities.',
        content: 'Neural-connected prosthetics represent one of the most remarkable convergences of neuroscience, engineering, and medicine. Unlike traditional prosthetics that offer limited functionality, these advanced devices interface directly with the user\'s nervous system, allowing for unprecedented control and sensory feedback.\n\nBrain-computer interfaces (BCIs) form the foundation of this technology, translating neural signals into commands for prosthetic limbs. Recent breakthroughs have enabled users to control multiple joint movements simultaneously, achieving near-natural dexterity. Equally important is the development of sensory feedback systems that transmit tactile information back to the user, creating a bidirectional flow of information between the biological and mechanical components.\n\nThe materials used in these prosthetics have evolved significantly as well. Lightweight, durable alloys and carbon fiber composites reduce weight while maintaining strength. Flexible electronics and soft robotics are enabling prosthetics that can adapt to different environments and tasks, mimicking the versatility of natural limbs.\n\nBeyond restoring lost function, some of these devices are beginning to enhance human capabilities. Prosthetic limbs with embedded sensors can detect information beyond human perception, such as electromagnetic fields or minute temperature variations. This raises fascinating questions about the future relationship between humans and technology.\n\nWhile challenges remain - including long-term biocompatibility, power requirements, and cost - the trajectory is clear. The distinction between human and machine is becoming increasingly blurred, not just conceptually but in the lived experience of those using these remarkable technologies. As neural interfaces become more sophisticated and prosthetics more capable, we\'re witnessing the early stages of a profound transformation in what it means to be human.',
        featuredImage: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=600&auto=format&fit=crop',
        categoryId: 2,
        authorId: author.id,
        featured: false,
        spotlight: false,
        readTime: 4
      },
      {
        title: 'Beyond Screens: The Rise of Holographic Interfaces',
        slug: 'holographic-interfaces',
        excerpt: 'How holographic technology is evolving from science fiction to practical applications in medicine, education, and entertainment.',
        content: 'Holographic interfaces, once confined to the realm of science fiction, are rapidly becoming a practical reality. Advances in light field technology, computational power, and optical materials are enabling truly three-dimensional displays that can be viewed from multiple angles without specialized glasses or headsets.\n\nIn medicine, these holographic systems are revolutionizing how surgeons plan and perform complex procedures. By projecting detailed 3D models of a patient\'s anatomy into physical space, surgeons can visualize critical structures with unprecedented clarity before making a single incision. During surgery, real-time holographic overlays can guide precision, potentially reducing complications and improving outcomes.\n\nEducation stands to be transformed as well. Abstract concepts in fields like chemistry, physics, and biology become tangible when students can manipulate holographic models. Historical events and distant locations can be brought to life, creating immersive learning experiences that engage multiple senses and learning styles.\n\nThe entertainment industry is perhaps the most visible adopter of holographic technology. From concerts featuring "resurrected" performers to interactive gaming environments that blur the line between physical and digital worlds, holographic displays are creating new forms of entertainment that transcend traditional media.\n\nAs this technology matures, we\'re moving toward environments where digital information seamlessly integrates with physical space. The flat screens that have dominated our interaction with digital content for decades may eventually be replaced by dynamic, three-dimensional interfaces that respond to gestures, voice, and even thought. This shift represents not just a change in display technology, but a fundamental reimagining of the human-computer interface.',
        featuredImage: 'https://images.unsplash.com/photo-1607723619497-cd43158f6f4d?q=80&w=600&auto=format&fit=crop',
        categoryId: 1,
        authorId: author.id,
        featured: false,
        spotlight: false,
        readTime: 5
      },
      {
        title: 'CRISPR 2.0: The Next Generation of Gene Editing',
        slug: 'crispr-next-generation',
        excerpt: 'Exploring the latest advancements in CRISPR technology and how they\'re revolutionizing medicine, agriculture, and beyond.',
        content: 'The original CRISPR-Cas9 system revolutionized genetic engineering with its precision and relative simplicity, but what\'s emerging now - often called CRISPR 2.0 - represents a quantum leap in capabilities. These advanced systems offer greater specificity, expanded targeting range, and reduced off-target effects, addressing many of the limitations of first-generation CRISPR technology.\n\nOne significant advancement is the development of base editors and prime editors, which can make precise changes to individual DNA letters without creating double-strand breaks. This approach dramatically reduces unwanted mutations and enables a wider range of genetic modifications. Another innovation is the discovery and engineering of alternative Cas enzymes beyond Cas9, each with unique properties suited for different applications.\n\nIn medicine, these refined tools are accelerating the development of treatments for genetic disorders once considered untreatable. Clinical trials using CRISPR to address sickle cell disease, beta-thalassemia, and certain forms of cancer are showing promising results. The technology\'s precision also opens possibilities for correcting complex genetic conditions involving multiple genes.\n\nAgriculture is benefiting from these advances as well. Rather than introducing foreign DNA, which defines traditional GMOs, CRISPR can make subtle edits to a plant\'s existing genome. This approach is creating crops with improved nutritional profiles, disease resistance, and climate resilience - crucial developments as we face global food security challenges.\n\nBeyond medicine and agriculture, next-generation CRISPR systems are finding applications in biomanufacturing, creating microorganisms that can produce valuable compounds or break down pollutants. They\'re also enabling new approaches to conservation, with discussions about using gene editing to help endangered species adapt to changing environments or even to revive extinct species.\n\nAs these technologies advance, society faces profound ethical questions about how, when, and why we should edit the code of life. The technical capabilities are evolving faster than the regulatory frameworks and ethical consensus, highlighting the need for inclusive, global conversations about responsible innovation in this transformative field.',
        featuredImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop',
        categoryId: 3,
        authorId: author.id,
        featured: false,
        spotlight: false,
        readTime: 8
      },
      {
        title: 'Deep Ocean Exploration Drones Map Underwater Landscapes',
        slug: 'deep-ocean-exploration',
        excerpt: 'Revolutionary autonomous underwater vehicles are creating detailed 3D maps of the ocean floor, revealing undiscovered species and geological formations.',
        content: 'The ocean depths, Earth\'s final frontier, are being systematically unveiled by a new generation of autonomous underwater vehicles (AUVs) equipped with advanced sensing and mapping technologies. These robotic explorers can descend to crushing depths beyond human reach, operating for months without human intervention while collecting terabytes of high-resolution data.\n\nUnlike their predecessors, modern deep-sea mapping drones utilize multiple sensing modalities simultaneously. Multibeam sonar provides detailed bathymetric maps, while side-scan sonar captures textures and objects on the seafloor. Magnetometers detect mineral deposits and shipwrecks, and high-definition cameras with powerful lighting systems capture visual data. Some advanced units even incorporate mass spectrometers for real-time chemical analysis of water samples.\n\nThe resulting 3D maps are revealing extraordinary geological features—underwater mountain ranges, canyons deeper than the Grand Canyon, hydrothermal vent fields, and previously unknown volcanic formations. These detailed surveys are transforming our understanding of plate tectonics, oceanic circulation patterns, and the dynamic processes that shape our planet.\n\nEqually significant are the biological discoveries. Nearly every deep-sea expedition documents species unknown to science, from bizarre translucent fish to extremophile microorganisms with unique biochemistry. These findings not only expand our understanding of evolution and adaptation but also hold promise for biotechnology applications, from novel pharmaceuticals to industrial enzymes that function in extreme conditions.\n\nBeyond scientific discovery, these mapping efforts have practical applications for climate science, as detailed seafloor topography improves models of ocean circulation and heat transport. They\'re also essential for identifying potential hazards like submarine landslides that could trigger tsunamis, and for guiding the responsible placement of undersea infrastructure like communication cables and renewable energy installations.\n\nAs this technology continues to advance, with improvements in power efficiency, artificial intelligence, and data processing capabilities, we stand at the threshold of comprehensively mapping Earth\'s last uncharted territory—a development that promises to transform our relationship with the oceans that cover more than two-thirds of our planet.',
        featuredImage: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=600&auto=format&fit=crop',
        categoryId: 3,
        authorId: author.id,
        featured: false,
        spotlight: true,
        readTime: 6
      }
    ];
    
    samplePosts.forEach(post => this.createPost(post));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Post methods
  async getPosts(limit: number = 10, offset: number = 0): Promise<Post[]> {
    return Array.from(this.posts.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(offset, offset + limit);
  }
  
  async getFeaturedPosts(limit: number = 3): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }
  
  async getSpotlightPost(): Promise<Post | undefined> {
    return Array.from(this.posts.values()).find(post => post.spotlight);
  }
  
  async getPostsByCategory(categoryId: number, limit: number = 10, offset: number = 0): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(offset, offset + limit);
  }
  
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }
  
  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return Array.from(this.posts.values()).find(
      (post) => post.slug === slug,
    );
  }
  
  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = { 
      ...insertPost, 
      id, 
      publishedAt: new Date().toISOString() 
    };
    this.posts.set(id, post);
    return post;
  }
  
  // Comment methods
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = { 
      ...insertComment, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.comments.set(id, comment);
    return comment;
  }
  
  // Subscriber methods
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: new Date().toISOString() 
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();
