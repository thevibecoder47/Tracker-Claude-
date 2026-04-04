import { Subject } from '@/types';

export const SYLLABUS: Subject[] = [
  {
    id: "prereq_math",
    name: "Prerequisites of Engineering Mathematics",
    totalLectures: 25,
    chapters: [
      { id: "pm_c1", name: "Polynomial & Quadratic Equation", lectures: 1, tests: [] },
      { id: "pm_c2", name: "Inequalities & Mode Function", lectures: 1, tests: [] },
      { id: "pm_c3", name: "Logarithms", lectures: 1, tests: [] },
      { id: "pm_c4", name: "Partial Function", lectures: 1, tests: [] },
      { id: "pm_c5", name: "Mensuration (Area & Volume)", lectures: 1, tests: [] },
      { id: "pm_c6", name: "Conic Section (Circle, Parabola, Hyperbola)", lectures: 1, tests: [] },
      { id: "pm_c7", name: "AP, GP, and AGP", lectures: 1, tests: [] },
      { id: "pm_c8", name: "Binomial Theorem", lectures: 1, tests: [] },
      { id: "pm_c9", name: "Vectors", lectures: 1, tests: [] },
      { id: "pm_c10", name: "Complex Numbers", lectures: 1, tests: [] },
      { id: "pm_c11", name: "Trigonometry", lectures: 1, tests: [] },
      { id: "pm_c12", name: "Matrix", lectures: 1, tests: [] },
      { id: "pm_c13", name: "Determinants", lectures: 1, tests: [] },
      { id: "pm_c14", name: "Basic of Limits", lectures: 1, tests: [] },
      { id: "pm_c15", name: "Differentiation", lectures: 1, tests: [] },
      { id: "pm_c16", name: "Maxima & Minima", lectures: 1, tests: [] },
      { id: "pm_c17", name: "Indefinite Integration", lectures: 1, tests: [] },
      { id: "pm_c18", name: "Definite Integration", lectures: 1, tests: [] },
      { id: "pm_c19", name: "Application of Laplace Transformation", lectures: 1, tests: [] },
      { id: "pm_c20", name: "Linear Interpolation", lectures: 1, tests: [] },
      { id: "pm_c21", name: "P & C / Probability", lectures: 1, tests: [] },
      { id: "pm_c22", name: "Percentage", lectures: 1, tests: [] },
      { id: "pm_c23", name: "Average & Weighted Average", lectures: 1, tests: [] },
      { id: "pm_c24", name: "Set Theory", lectures: 1, tests: [] },
      { id: "pm_c25", name: "Recursive Relation", lectures: 1, tests: [] },
    ]
  },
  {
    id: "discrete_math",
    name: "Discrete Mathematics",
    totalLectures: 47,
    chapters: [
      { id: "dm_c1", name: "Set Theory & Algebra", lectures: 24,
        tests: [
          { id: "dm_t1", number: 1, triggerLec: 10 },
          { id: "dm_t2", number: 2, triggerLec: 14 },
          { id: "dm_t3", number: 3, triggerLec: 18 },
          { id: "dm_t4", number: 4, triggerLec: 23 },
        ]},
      { id: "dm_c2", name: "Graph Theory", lectures: 12,
        tests: [{ id: "dm_t5", number: 5, triggerLec: 8 }]},
      { id: "dm_c3", name: "Mathematical Logics", lectures: 8,
        tests: [
          { id: "dm_t6", number: 6, triggerLec: 1 },
          { id: "dm_t7", number: 7, triggerLec: 6 },
        ]},
      { id: "dm_c4", name: "Combinatorics", lectures: 3, tests: [] },
    ]
  },
  {
    id: "prob_stats",
    name: "Probability & Statistics",
    totalLectures: 21,
    chapters: [
      { id: "ps_c1", name: "Permutations & Combinations", lectures: 5, tests: [] },
      { id: "ps_c2", name: "Probability", lectures: 6, tests: [] },
      { id: "ps_c3", name: "Statistics-1 (Discrete Random Variable)", lectures: 4,
        tests: [
          { id: "ps_t1", number: 1, triggerLec: 2 },
          { id: "ps_t2", number: 2, triggerLec: 5 },
        ]},
      { id: "ps_c4", name: "Statistics-1 (Continuous Random Variable)", lectures: 6, tests: [] },
    ]
  },
  {
    id: "linear_algebra",
    name: "Linear Algebra",
    totalLectures: 13,
    chapters: [
      { id: "la_c1", name: "Basic of Determinants & Matrices", lectures: 1, tests: [] },
      { id: "la_c2", name: "Linear Algebra - 1", lectures: 12,
        tests: [{ id: "la_t1", number: 1, triggerLec: 12 }]},
    ]
  },
  {
    id: "calculus",
    name: "Calculus & Optimization",
    totalLectures: 15,
    chapters: [
      { id: "co_c1", name: "Functions & Graph", lectures: 2, tests: [] },
      { id: "co_c2", name: "Limit, Continuity, & Differentiability", lectures: 3, tests: [] },
      { id: "co_c3", name: "Taylor & Maclaurin Series", lectures: 1, tests: [] },
      { id: "co_c4", name: "Mean Value Theorem", lectures: 1, tests: [] },
      { id: "co_c5", name: "Derivatives & Their Types", lectures: 3,
        tests: [{ id: "co_t1", number: 1, triggerLec: 2 }]},
      { id: "co_c6", name: "Maxima & Minima", lectures: 3, tests: [] },
      { id: "co_c7", name: "Integration", lectures: 2,
        tests: [{ id: "co_t2", number: 2, triggerLec: 2 }]},
    ]
  },
  {
    id: "basic_cs",
    name: "Basic of Computer System",
    totalLectures: 10,
    chapters: [
      { id: "bcs_c1", name: "Basic of Computer System", lectures: 10, tests: [] },
    ]
  },
  {
    id: "fund_c",
    name: "Fundamentals of C Language",
    totalLectures: 20,
    chapters: [
      { id: "fc_c1", name: "Introduction", lectures: 2, tests: [] },
      { id: "fc_c2", name: "Datatypes & Operators", lectures: 5, tests: [] },
      { id: "fc_c3", name: "Control Flow Statement", lectures: 3, tests: [] },
      { id: "fc_c4", name: "Function & Storage Class", lectures: 4, tests: [] },
      { id: "fc_c5", name: "Array & Pointer", lectures: 4, tests: [] },
      { id: "fc_c6", name: "String & Structure", lectures: 2, tests: [] },
    ]
  },
  {
    id: "c_prog",
    name: "C Programming",
    totalLectures: 18,
    chapters: [
      { id: "cp_c1", name: "Data Types & Operators", lectures: 4, tests: [] },
      { id: "cp_c2", name: "Control Flow Statements", lectures: 4,
        tests: [{ id: "cp_t1", number: 1, triggerLec: 4 }]},
      { id: "cp_c3", name: "Function & Storage Class", lectures: 3,
        tests: [
          { id: "cp_t2", number: 2, triggerLec: 3 },
          { id: "cp_t3", number: 3, triggerLec: 3 },
        ]},
      { id: "cp_c4", name: "Array & Pointer", lectures: 4, tests: [] },
      { id: "cp_c5", name: "String 01", lectures: 2, tests: [] },
      { id: "cp_c6", name: "Structure & Union", lectures: 1,
        tests: [
          { id: "cp_t4", number: 4, triggerLec: 1 },
          { id: "cp_t5", number: 5, triggerLec: 1 },
        ]},
    ]
  },
  {
    id: "data_structures",
    name: "Data Structures & Programming",
    totalLectures: 28,
    chapters: [
      { id: "ds_c1", name: "Array", lectures: 6,
        tests: [{ id: "ds_t1", number: 1, triggerLec: 5 }]},
      { id: "ds_c2", name: "Stack", lectures: 5,
        tests: [{ id: "ds_t2", number: 2, triggerLec: 4 }]},
      { id: "ds_c3", name: "Queue", lectures: 2, tests: [] },
      { id: "ds_c4", name: "Trees", lectures: 8,
        tests: [{ id: "ds_t3", number: 3, triggerLec: 7 }]},
      { id: "ds_c5", name: "Linked List", lectures: 4, tests: [] },
      { id: "ds_c6", name: "Graph & Hashing", lectures: 3,
        tests: [{ id: "ds_t4", number: 4, triggerLec: 2 }]},
    ]
  },
  {
    id: "algorithms",
    name: "Algorithms",
    totalLectures: 48,
    chapters: [
      { id: "al_c1", name: "Analysis of Algorithm", lectures: 12,
        tests: [{ id: "al_t1", number: 1, triggerLec: 11 }]},
      { id: "al_c2", name: "Sorting Algorithm", lectures: 3, tests: [] },
      { id: "al_c3", name: "Divide & Conquer", lectures: 8,
        tests: [
          { id: "al_t2", number: 2, triggerLec: 2 },
          { id: "al_t3", number: 3, triggerLec: 7 },
        ]},
      { id: "al_c4", name: "Greedy Method", lectures: 7,
        tests: [{ id: "al_t4", number: 4, triggerLec: 4 }]},
      { id: "al_c5", name: "Dynamic Programming (DP)", lectures: 8,
        tests: [{ id: "al_t5", number: 5, triggerLec: 3 }]},
      { id: "al_c6", name: "Graph Algorithm", lectures: 3,
        tests: [{ id: "al_t6", number: 6, triggerLec: 3 }]},
      { id: "al_c7", name: "Heap Algorithm", lectures: 3, tests: [] },
      { id: "al_c8", name: "Miscellaneous", lectures: 4,
        tests: [{ id: "al_t7", number: 7, triggerLec: 4 }]},
    ]
  },
  {
    id: "toc",
    name: "Theory of Computation",
    totalLectures: 29,
    chapters: [
      { id: "toc_c1", name: "Regular Language", lectures: 15,
        tests: [
          { id: "toc_t1", number: 1, triggerLec: 4 },
          { id: "toc_t2", number: 2, triggerLec: 9 },
          { id: "toc_t3", number: 3, triggerLec: 14 },
        ]},
      { id: "toc_c2", name: "Context Free Language", lectures: 10,
        tests: [{ id: "toc_t4", number: 4, triggerLec: 8 }]},
      { id: "toc_c3", name: "Turing Machine", lectures: 4,
        tests: [{ id: "toc_t5", number: 5, triggerLec: 4 }]},
    ]
  },
  {
    id: "digital_logic",
    name: "Digital Logic",
    totalLectures: 43,
    chapters: [
      { id: "dl_c1", name: "Boolean Theorem & Gates", lectures: 12, tests: [] },
      { id: "dl_c2", name: "Combinational Circuits", lectures: 14,
        tests: [
          { id: "dl_t1", number: 1, triggerLec: 2 },
          { id: "dl_t2", number: 2, triggerLec: 12 },
        ]},
      { id: "dl_c3", name: "Sequential Circuits", lectures: 9, tests: [] },
      { id: "dl_c4", name: "Miscellaneous", lectures: 8,
        tests: [{ id: "dl_t3", number: 3, triggerLec: 3 }]},
    ]
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture",
    totalLectures: 42,
    chapters: [
      { id: "coa_c1", name: "Basic of COA", lectures: 5,
        tests: [{ id: "coa_t1", number: 1, triggerLec: 5 }]},
      { id: "coa_c2", name: "Instructions & Addressing Mode", lectures: 6,
        tests: [{ id: "coa_t2", number: 2, triggerLec: 5 }]},
      { id: "coa_c3", name: "CPU & Control Unit", lectures: 3, tests: [] },
      { id: "coa_c4", name: "Floating Point Representation", lectures: 2,
        tests: [{ id: "coa_t3", number: 3, triggerLec: 1 }]},
      { id: "coa_c5", name: "IO Organization", lectures: 3, tests: [] },
      { id: "coa_c6", name: "Memory Organizations", lectures: 3,
        tests: [{ id: "coa_t4", number: 4, triggerLec: 1 }]},
      { id: "coa_c7", name: "Cache Organizations", lectures: 11,
        tests: [
          { id: "coa_t5", number: 5, triggerLec: 3 },
          { id: "coa_t6", number: 6, triggerLec: 8 },
        ]},
      { id: "coa_c8", name: "Disk", lectures: 2,
        tests: [{ id: "coa_t7", number: 7, triggerLec: 2 }]},
      { id: "coa_c9", name: "Pipelining Processing", lectures: 7,
        tests: [{ id: "coa_t8", number: 8, triggerLec: 5 }]},
    ]
  },
  {
    id: "cn",
    name: "Computer Networks",
    totalLectures: 43,
    chapters: [
      { id: "cn_c1", name: "IP Address Subnetting, Supernetting", lectures: 12,
        tests: [{ id: "cn_t1", number: 1, triggerLec: 9 }]},
      { id: "cn_c2", name: "Flow Control Methods", lectures: 5,
        tests: [{ id: "cn_t2", number: 2, triggerLec: 2 }]},
      { id: "cn_c3", name: "Error Control Methods", lectures: 1, tests: [] },
      { id: "cn_c4", name: "ISO-OSI Stack", lectures: 9,
        tests: [{ id: "cn_t3", number: 3, triggerLec: 4 }]},
      { id: "cn_c5", name: "Routing", lectures: 2,
        tests: [{ id: "cn_t4", number: 4, triggerLec: 1 }]},
      { id: "cn_c6", name: "TCP & UDP", lectures: 4,
        tests: [{ id: "cn_t5", number: 5, triggerLec: 3 }]},
      { id: "cn_c7", name: "Hardware & Various Devices Used in Networks", lectures: 3, tests: [] },
      { id: "cn_c8", name: "Application Layer Protocols", lectures: 4,
        tests: [{ id: "cn_t6", number: 6, triggerLec: 1 }]},
      { id: "cn_c9", name: "PYQ - CN", lectures: 3,
        tests: [{ id: "cn_t7", number: 7, triggerLec: 2 }]},
    ]
  },
  {
    id: "os",
    name: "Operating System",
    totalLectures: 27,
    chapters: [
      { id: "os_c1", name: "Basic of OS", lectures: 1, tests: [] },
      { id: "os_c2", name: "Process Management", lectures: 2, tests: [] },
      { id: "os_c3", name: "CPU Scheduling", lectures: 6,
        tests: [
          { id: "os_t1", number: 1, triggerLec: 1 },
          { id: "os_t2", number: 2, triggerLec: 6 },
        ]},
      { id: "os_c4", name: "Multithreading", lectures: 1, tests: [] },
      { id: "os_c5", name: "Process Synchronization", lectures: 7,
        tests: [
          { id: "os_t3", number: 3, triggerLec: 4 },
          { id: "os_t4", number: 4, triggerLec: 7 },
        ]},
      { id: "os_c6", name: "Deadlock", lectures: 3, tests: [] },
      { id: "os_c7", name: "Memory Management", lectures: 7,
        tests: [
          { id: "os_t5", number: 5, triggerLec: 2 },
          { id: "os_t6", number: 6, triggerLec: 7 },
        ]},
      { id: "os_c8", name: "File System", lectures: 2, tests: [] },
      { id: "os_c9", name: "Disk Scheduling Algorithm", lectures: 1,
        tests: [{ id: "os_t7", number: 7, triggerLec: 1 }]},
    ]
  },
  {
    id: "compiler",
    name: "Compiler Design",
    totalLectures: 19,
    chapters: [
      { id: "cd_c1", name: "Introduction", lectures: 2, tests: [] },
      { id: "cd_c2", name: "Parsers", lectures: 6,
        tests: [
          { id: "cd_t1", number: 1, triggerLec: 3 },
          { id: "cd_t2", number: 2, triggerLec: 6 },
        ]},
      { id: "cd_c3", name: "Syntax Directed Translation", lectures: 2,
        tests: [{ id: "cd_t3", number: 3, triggerLec: 1 }]},
      { id: "cd_c4", name: "Intermediate Code Generation", lectures: 3, tests: [] },
      { id: "cd_c5", name: "Runtime Environments", lectures: 2, tests: [] },
      { id: "cd_c6", name: "Code Optimisation", lectures: 4,
        tests: [{ id: "cd_t4", number: 4, triggerLec: 3 }]},
    ]
  },
  {
    id: "dbms",
    name: "Database Management System",
    totalLectures: 18,
    chapters: [
      { id: "db_c1", name: "DBMS", lectures: 18,
        tests: [
          { id: "db_t1", number: 1, triggerLec: 4 },
          { id: "db_t2", number: 2, triggerLec: 8 },
          { id: "db_t3", number: 3, triggerLec: 11 },
          { id: "db_t4", number: 4, triggerLec: 15 },
        ]},
    ]
  },
  {
    id: "gen_aptitude",
    name: "General Aptitude",
    totalLectures: 24,
    chapters: [
      { id: "ga_c1", name: "Quantitative Aptitude", lectures: 16,
        tests: [
          { id: "ga_t1", number: 1, triggerLec: 10 },
          { id: "ga_t2", number: 2, triggerLec: 15 },
        ]},
      { id: "ga_c2", name: "Analytical Aptitude", lectures: 6, tests: [] },
      { id: "ga_c3", name: "Spatial Aptitude", lectures: 2,
        tests: [{ id: "ga_t3", number: 3, triggerLec: 2 }]},
    ]
  },
  {
    id: "verbal",
    name: "Verbal Aptitude",
    totalLectures: 5,
    chapters: [
      { id: "va_c1", name: "Parts of Speech", lectures: 2, tests: [] },
      { id: "va_c2", name: "Vocabulary", lectures: 2, tests: [] },
      { id: "va_c3", name: "Reading Comprehension & Miscellaneous", lectures: 1, tests: [] },
    ]
  },
];
