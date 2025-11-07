// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-web-apps",
          title: "web apps",
          description: "Simple web applications and interactive tools.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/webapps/";
          },
        },{id: "post-showcase-of-emnlp-sycophancy-paper",
        
          title: "Showcase of EMNLP Sycophancy Paper",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/EMNLP-sycophancy-papers/";
          
        },
      },{id: "post-old-nlp-paper-reviews",
        
          title: "Old NLP Paper Reviews",
        
        description: "A review of influential old papers in natural language processing.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/old-paper-reviews/";
          
        },
      },{id: "post-torch-mps-basic-speedup-test",
        
          title: "Torch MPS Basic Speedup Test",
        
        description: "A basic speedup test of PyTorch on MPS (Apple Silicon) vs CPU.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/torch-mps-speedup-test/";
          
        },
      },{id: "post-random-cosine-similarity-distribution",
        
          title: "Random Cosine Similarity Distribution",
        
        description: "What is the distribution of cosine similarities between random vectors in a unit hypersphere?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/random-cosine-similarity/";
          
        },
      },{id: "post-further-look-into-cancer-myth-does-the-llm-ignore-false-presupposition-due-to-lack-of-knowledge-or-is-it-sycophantic",
        
          title: "Further Look into Cancer-Myth. Does the LLM Ignore False Presupposition Due to Lack...",
        
        description: "Does the AI model know the incorrect answer or is it ignoring to answer the question?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/knowledge-or-sycophancy/";
          
        },
      },{id: "post-simple-attention-visualizer",
        
          title: "Simple Attention Visualizer",
        
        description: "Simple Attention Visualizer",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/attention-visualizer/";
          
        },
      },{id: "post-random-idea-exploration-01",
        
          title: "Random Idea Exploration 01",
        
        description: "How many phones can Pyramid of Giza charge? How much plot of land is required to feed?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/random-exploration-01/";
          
        },
      },{id: "post-llama-token-embedding-to-model-head-experiment",
        
          title: "Llama Token Embedding to Model Head Experiment",
        
        description: "Does Same Token Encoded by embeder and then decoded by LM Head Yield Same Result?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/token-encoding-decoding/";
          
        },
      },{id: "post-louvain-clustering",
        
          title: "Louvain Clustering",
        
        description: "Maximize Modularity!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/lovain-clustering/";
          
        },
      },{id: "post-induction-as-a-reduction",
        
          title: "Induction as a Reduction",
        
        description: "Generate or Reduce?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/induction-as-reduction-problem/";
          
        },
      },{id: "post-two-envelope-problem",
        
          title: "Two Envelope Problem",
        
        description: "Switch or not to switch, that is the question.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/envelope-problem/";
          
        },
      },{id: "post-translation-of-iu-39-s-dear-name",
        
          title: "Translation of IU&#39;s Dear Name",
        
        description: "Translation of IU&#39;s Dear Name",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/dear-name-translation/";
          
        },
      },{id: "post-gender-at-birth-ratio",
        
          title: "Gender at Birth Ratio",
        
        description: "Can people&#39;s preference affect gender at birth",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/gender-at-birth-ratio/";
          
        },
      },{id: "post-multinomial-pascal-39-s-triangle",
        
          title: "Multinomial Pascal&#39;s Triangle",
        
        description: "Pascal&#39;s triangle for multinomial coefficients",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/mutinomial-pascal's-triangle/";
          
        },
      },{id: "post-convergence-of-minimax-complete-binary-tree",
        
          title: "Convergence of Minimax complete Binary Tree",
        
        description: "Part 1, Zero-sum game on a complete binary tree",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/properties-of-some-randomized-minimax-game-trees/";
          
        },
      },{id: "post-ranking-pokemon-types",
        
          title: "Ranking Pokemon Types",
        
        description: "Pokemon type ranking based on type effectiveness alone.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/ranking-pokemon-types/";
          
        },
      },{id: "post-bounds-for-language-model-perplexity",
        
          title: "Bounds for Language Model Perplexity",
        
        description: "What is perplexity in language modelling and the sensible bounds for it?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/perplexity-and-bounds/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-graduated-with-bs-in-computer-science-and-applied-mathematics-and-statistics-from-jhu",
          title: 'Graduated with BS in Computer Science and Applied Mathematics and Statistics from JHU....',
          description: "",
          section: "News",},{id: "news-graduated-with-masters-in-computer-science-from-johns-hopkins-university",
          title: 'Graduated with Masters in Computer Science from Johns Hopkins University.',
          description: "",
          section: "News",},{id: "projects-is-procrustes-alignment-optimal",
          title: 'Is Procrustes Alignment Optimal?',
          description: "Is Procrustes Alignment Optimal?",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
