export interface SkillLog {
    id: number;
    date: string;
    category: SkillCategory;
    num_problems: number | null;
    duration_minutes: number;
    topics: string;
    notes: string;
  }
  
  export type SkillCategory =
    | "leetcode"
    | "dsa"
    | "system_design"
    | "project"
    | "course"
    | "other";
  
  export type QuestionType =
    | "Array/String"
    | "Two Pointers"
    | "Sliding Window"
    | "Matrix"
    | "Hashmap"
    | "Intervals"
    | "Stack"
    | "Linked List"
    | "Binary Tree General"
    | "Binary Tree BFS"
    | "Binary Search Tree"
    | "Graph General"
    | "Graph BFS"
    | "Trie"
    | "Backtracking"
    | "Divide & Conquer"
    | "Kadane's Algorithm"
    | "Binary Search"
    | "Heap"
    | "Bit Manipulation"
    | "Math"
    | "1D DP"
    | "Multidimensional DP"
    | "SQL"
    | "Other";
  
  export type Difficulty = "Easy" | "Medium" | "Hard";
  